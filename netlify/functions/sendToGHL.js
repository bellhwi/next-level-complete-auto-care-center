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

    // GoHighLevel Webhook URL (당신의 워크플로에서 받은 URL로 교체)
    const GHL_WEBHOOK_URL =
      'https://services.leadconnectorhq.com/hooks/여기_GHL_webhook_URL'

    const ghlResponse = await fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: data.firstName,
        email: data.email,
        phone: data.phone,
      }),
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
