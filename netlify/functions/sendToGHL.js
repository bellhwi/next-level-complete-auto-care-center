// File: netlify/functions/sendToGHL.js

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    }
  }

  try {
    const data = JSON.parse(event.body)

    const GHL_WEBHOOK_URL =
      'https://services.leadconnectorhq.com/hooks/scOtpvRe79XQ8CmYGTul/webhook-trigger/5d9b7e92-0891-4e7b-bc60-75f012a2d3fc'

    // 동의 항목 처리 (체크되면 "on"으로 넘어오므로 true/false로 변환)
    const consentTransactional = data.consent_transactional === 'on'
    const consentMarketing = data.consent_marketing === 'on'

    // 메시지, 유입경로 등을 묶어서 Note 형식으로 보냄
    const note = `
Message: ${data.message || 'N/A'}
Referral Source: ${data.referral || 'N/A'}
Consent - Transactional: ${consentTransactional}
Consent - Marketing: ${consentMarketing}
    `.trim()

    const payload = {
      firstName: data.name,
      email: data.email,
      phone: data.phone,
      note: note,
    }

    const ghlResponse = await fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!ghlResponse.ok) {
      throw new Error(`GHL responded with status ${ghlResponse.status}`)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Contact sent to GoHighLevel successfully!',
      }),
    }
  } catch (error) {
    console.error('Error sending to GHL:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to send data to GHL',
        error: error.message,
      }),
    }
  }
}
