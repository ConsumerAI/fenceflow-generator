import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

const RECAPTCHA_V3_SECRET = Deno.env.get('RECAPTCHA_V3_SECRET')
const RECAPTCHA_V2_SECRET = Deno.env.get('RECAPTCHA_V2_SECRET')

async function verifyEnterpriseToken(token: string, secret: string) {
  try {
    console.log('Starting enterprise token verification...');
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secret}&response=${token}`,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Enterprise API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Enterprise API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Enterprise verification raw result:', result);
    
    return {
      success: result.success === true,
      score: result.score || 0,
    };
  } catch (error) {
    console.error('Enterprise verification error:', error);
    return { success: false, score: 0 };
  }
}

async function verifyV2Token(token: string, secret: string) {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secret}&response=${token}`,
    });

    const result = await response.json();
    console.log('V2 verification result:', result);
    return result;
  } catch (error) {
    console.error('V2 verification error:', error);
    return { success: false };
  }
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (!RECAPTCHA_V3_SECRET) {
      throw new Error('reCAPTCHA v3 secret not configured');
    }

    const { v3Token, v2Token } = await req.json();
    console.log('Received tokens:', { hasV3: !!v3Token, hasV2: !!v2Token });

    // Verify v3 enterprise token first
    if (v3Token) {
      console.log('Verifying v3 enterprise token...');
      const v3Result = await verifyEnterpriseToken(v3Token, RECAPTCHA_V3_SECRET);
      console.log('V3 verification result:', v3Result);
      
      if (v3Result.success && v3Result.score >= 0.5) {
        return new Response(
          JSON.stringify({ success: true, score: v3Result.score }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      }
    }

    // If v3 failed or score was low, verify v2 token
    if (v2Token && RECAPTCHA_V2_SECRET) {
      console.log('Verifying v2 token...');
      const v2Result = await verifyV2Token(v2Token, RECAPTCHA_V2_SECRET);
      
      if (v2Result.success) {
        return new Response(
          JSON.stringify({ success: true, score: 1.0 }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        );
      }
    }

    // If we get here, verification failed
    throw new Error('reCAPTCHA verification failed');

  } catch (error) {
    console.error('Verification error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Verification failed',
        details: error.toString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
}); 