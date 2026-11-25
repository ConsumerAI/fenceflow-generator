// Build-time content generator for Wave 2 pages.
//
// Parses the v5-format markdown drafts in
// ~/workspace/fence-rebuild/wave2-content/ into a typed TypeScript data
// module the site imports: src/data/wave2Content.ts. Same pipeline pattern
// as scripts/build-wave1-content.mjs; the markdown stays the canonical
// draft. Re-run whenever a draft changes:
//
//   node scripts/build-wave2-content.mjs
//
// The [ESTIMATE RESULTS SCREEN COPY] blocks are NOT page body copy: they
// are captured separately as `screenBlock` and never rendered as page
// sections (the fence bridge ships inside FenceCalculator).
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const rebuildRoot = path.join(os.homedir(), 'workspace/fence-rebuild');

const CITY_NAMES = {
  allen: 'Allen',
  anna: 'Anna',
  bedford: 'Bedford',
  burleson: 'Burleson',
  'cedar-hill': 'Cedar Hill',
  celina: 'Celina',
  cleburne: 'Cleburne',
  colleyville: 'Colleyville',
  coppell: 'Coppell',
  desoto: 'DeSoto',
  duncanville: 'Duncanville',
  euless: 'Euless',
  'farmers-branch': 'Farmers Branch',
  'flower-mound': 'Flower Mound',
  forney: 'Forney',
  'haltom-city': 'Haltom City',
  hurst: 'Hurst',
  keller: 'Keller',
  lancaster: 'Lancaster',
  'little-elm': 'Little Elm',
  mansfield: 'Mansfield',
  mesquite: 'Mesquite',
  midlothian: 'Midlothian',
  murphy: 'Murphy',
  'north-richland-hills': 'North Richland Hills',
  prosper: 'Prosper',
  rockwall: 'Rockwall',
  rowlett: 'Rowlett',
  sachse: 'Sachse',
  southlake: 'Southlake',
  terrell: 'Terrell',
  'the-colony': 'The Colony',
  watauga: 'Watauga',
  waxahachie: 'Waxahachie',
  wylie: 'Wylie',
};

const RESIDENTIAL_SLUGS = Object.keys(CITY_NAMES);

function collapse(text) {
  return text.replace(/\s*\n\s*/g, ' ').trim();
}

function parseChunks(lines) {
  const chunks = [];
  let current = [];
  for (const line of lines) {
    if (line.trim() === '') {
      if (current.length) chunks.push(current);
      current = [];
    } else {
      current.push(line);
    }
  }
  if (current.length) chunks.push(current);
  return chunks.map((c) => c.join('\n'));
}

function parseSection(heading, lines, page) {
  const blocks = [];
  const chunks = parseChunks(lines);
  const isFaq = /question/i.test(heading);
  let pendingFaq = null;

  const flushFaq = () => {
    if (pendingFaq) {
      blocks.push({ type: 'faqs', items: [pendingFaq] });
      pendingFaq = null;
    }
  };

  for (const chunk of chunks) {
    const text = collapse(chunk);

    if (text.startsWith('> [PROOF SLOT')) {
      page.hasProofSlot = true;
      continue;
    }

    // CTA line: **[Label]** *microcopy*  (microcopy optional)
    const cta = text.match(/^\*\*\[(.+?)\]\*\*(?:\s*\*(.+?)\*)?$/);
    if (cta) {
      flushFaq();
      blocks.push({ type: 'cta', label: cta[1], micro: cta[2] ?? '' });
      continue;
    }

    // Numbered steps chunk (every line starts with "N. ")
    const rawLines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
    if (rawLines.length > 0 && rawLines.every((l) => /^\d+\.\s/.test(l))) {
      flushFaq();
      const items = rawLines.map((l) => {
        const m = l.replace(/^\d+\.\s*/, '').match(/^\*\*(.+?)\*\*\s*(.*)$/);
        if (m) return { title: m[1], text: m[2] };
        return { title: '', text: l.replace(/^\d+\.\s*/, '') };
      });
      blocks.push({ type: 'steps', items });
      continue;
    }

    if (isFaq) {
      // v5 format: question line and answer share one block
      // ("**Question?**\nAnswer..."), or the question stands alone and the
      // answer follows in the next block.
      const inline = text.match(/^\*\*(.+\?)\*\*\s+(.+)$/);
      if (inline) {
        flushFaq();
        blocks.push({ type: 'faqs', items: [{ q: inline[1], a: inline[2] }] });
        continue;
      }
      const q = text.match(/^\*\*(.+\?)\*\*$/);
      if (q) {
        flushFaq();
        pendingFaq = { q: q[1], a: '' };
        continue;
      }
      if (pendingFaq) {
        pendingFaq.a = pendingFaq.a ? `${pendingFaq.a} ${text}` : text;
        continue;
      }
    }

    // Standalone bold line = pull line
    const pull = text.match(/^\*\*(.+)\*\*$/);
    if (pull && !pull[1].includes('**')) {
      flushFaq();
      blocks.push({ type: 'pull', text: pull[1] });
      continue;
    }

    flushFaq();
    blocks.push({ type: 'p', text });
  }
  flushFaq();

  // Merge adjacent single-item faq blocks into one list
  const merged = [];
  for (const b of blocks) {
    const last = merged[merged.length - 1];
    if (b.type === 'faqs' && last && last.type === 'faqs') {
      last.items.push(...b.items);
    } else {
      merged.push(b);
    }
  }
  return { heading, blocks: merged };
}

function parsePage(filePath, slug, kind) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const lines = raw.split('\n');

  const page = {
    slug,
    cityName: CITY_NAMES[slug.split('/')[0]] ?? slug,
    kind,
    metaTitle: '',
    metaDescription: '',
    hasProofSlot: false,
    sections: [],
    screenBlock: null,
  };

  for (const line of lines) {
    const t = line.match(/^\*\*Meta title:\*\*\s*(.+)$/);
    if (t) page.metaTitle = t[1].trim();
    const d = line.match(/^\*\*Meta description:\*\*\s*(.+)$/);
    if (d) page.metaDescription = d[1].trim();
  }

  // Split body into sections on "## " headings (ignore everything before the first)
  let currentHeading = null;
  let currentLines = [];
  let inScreenBlock = false;
  let screenLines = [];
  let screenHeading = '';

  const flushSection = () => {
    if (currentHeading !== null) {
      page.sections.push(parseSection(currentHeading, currentLines, page));
    }
    currentHeading = null;
    currentLines = [];
  };

  for (const line of lines) {
    if (line.startsWith('## [')) {
      // Screen-copy block section: capture, do not treat as a page section
      flushSection();
      inScreenBlock = true;
      screenHeading = line.replace(/^##\s*/, '').replace(/:.*$/, '').replace(/[\[\]]/g, '').trim();
      screenLines = [];
      continue;
    }
    if (inScreenBlock) {
      if (line.startsWith('[END')) {
        inScreenBlock = false;
        const paras = parseChunks(screenLines).map(collapse).filter(Boolean);
        page.screenBlock = { heading: screenHeading, paras };
      } else {
        screenLines.push(line);
      }
      continue;
    }
    if (line.startsWith('## ')) {
      flushSection();
      currentHeading = line.replace(/^##\s*/, '').trim();
      currentLines = [];
      continue;
    }
    if (currentHeading !== null) currentLines.push(line);
  }
  flushSection();

  if (!page.metaTitle || !page.metaDescription) {
    throw new Error(`${filePath}: missing meta title or description`);
  }
  if (page.sections.length < 5) {
    throw new Error(`${filePath}: only ${page.sections.length} sections parsed`);
  }
  return page;
}

const pages = [];
for (const slug of RESIDENTIAL_SLUGS) {
  const file = path.join(rebuildRoot, 'wave2-content', `${slug}-residential.md`);
  if (!fs.existsSync(file)) throw new Error(`missing wave 2 draft: ${file}`);
  pages.push(parsePage(file, slug, 'residential'));
}

const out = `// GENERATED by scripts/build-wave2-content.mjs from the v5 markdown
// drafts in ~/workspace/fence-rebuild/wave2-content/. Do not edit by hand;
// edit the drafts and re-run the generator.

import type { Wave1Page } from './wave1Content';

export const wave2Pages: Record<string, Wave1Page> = ${JSON.stringify(
  Object.fromEntries(pages.map((p) => [p.slug, p])),
  null,
  2
)};

export function getWave2Page(slug: string): Wave1Page | undefined {
  return wave2Pages[slug.toLowerCase()];
}
`;

const outPath = path.join(repoRoot, 'src/data/wave2Content.ts');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, out);
console.log(`wave2 content: wrote ${outPath} with ${pages.length} pages`);
for (const p of pages) {
  console.log(`  ${p.slug}: ${p.sections.length} sections, proof=${p.hasProofSlot}, screen=${p.screenBlock ? 'yes' : 'no'}`);
}
