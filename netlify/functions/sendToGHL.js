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

    const payload = {
      firstName: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message ? `Message: ${data.message}` : '',
      referral: data.referral ? `Referral: ${data.referral}` : '',
      consent_marketing: `Consent Marketing: ${
        data.consent_marketing ? 'Yes' : 'No'
      }`,
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
