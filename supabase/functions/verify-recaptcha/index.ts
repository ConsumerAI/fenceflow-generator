import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

const RECAPTCHA_V3_SECRET = Deno.env.get('RECAPTCHA_V3_SECRET')
const RECAPTCHA_V2_SECRET = Deno.env.get('RECAPTCHA_V2_SECRET')

async function verifyToken(token: string, secret: string, isEnterprise = true) {
  const verifyUrl = isEnterprise 
    ? 'https://www.google.com/recaptcha/enterprise/verify'
    : 'https://www.google.com/recaptcha/api/siteverify';

  const response = await fetch(verifyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secret}&response=${token}`,
  })

  const result = await response.json()
  console.log('reCAPTCHA verification result:', result);
  return result
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { v3Token, v2Token } = await req.json()
    console.log('Received tokens:', { hasV3: !!v3Token, hasV2: !!v2Token });
    
    // Verify v3 enterprise token first
    if (v3Token) {
      console.log('Verifying v3 enterprise token...');
      const v3Result = await verifyToken(v3Token, RECAPTCHA_V3_SECRET!, true)
      if (!v3Result.success) {
        console.error('V3 verification failed:', v3Result);
        throw new Error('Invalid v3 token')
      }

      // For enterprise, check the score in the assessment
      const score = v3Result.score || (v3Result.assessment?.score?.overall || 0);
      console.log('V3 enterprise score:', score);

      // If v3 score is good, we don't need v2
      if (score >= 0.5) {
        return new Response(
          JSON.stringify({ success: true, score }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }
    }

    // If v3 score was low or missing, verify v2 token
    if (v2Token) {
      console.log('Verifying v2 token...');
      const v2Result = await verifyToken(v2Token, RECAPTCHA_V2_SECRET!, false)
      if (!v2Result.success) {
        console.error('V2 verification failed:', v2Result);
        throw new Error('Invalid v2 token')
      }

      return new Response(
        JSON.stringify({ success: true, score: 1.0 }), // v2 success means human verified
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    throw new Error('No valid tokens provided')

  } catch (error) {
    console.error('Verification error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
}) 