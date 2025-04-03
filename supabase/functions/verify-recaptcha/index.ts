import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

const RECAPTCHA_V3_SECRET = Deno.env.get('RECAPTCHA_V3_SECRET')
const RECAPTCHA_V2_SECRET = Deno.env.get('RECAPTCHA_V2_SECRET')

async function verifyToken(token: string, secret: string) {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secret}&response=${token}`,
  })

  const result = await response.json()
  return result
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { v3Token, v2Token } = await req.json()
    
    // Verify v3 token first
    if (v3Token) {
      const v3Result = await verifyToken(v3Token, RECAPTCHA_V3_SECRET!)
      if (!v3Result.success) {
        throw new Error('Invalid v3 token')
      }

      // If v3 score is good, we don't need v2
      if (v3Result.score >= 0.5) {
        return new Response(
          JSON.stringify({ success: true, score: v3Result.score }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }
    }

    // If v3 score was low or missing, verify v2 token
    if (v2Token) {
      const v2Result = await verifyToken(v2Token, RECAPTCHA_V2_SECRET!)
      if (!v2Result.success) {
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
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
}) 