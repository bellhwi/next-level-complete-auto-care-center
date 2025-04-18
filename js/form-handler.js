const form = document.getElementById('cs-form-1105')

form.addEventListener('submit', async function (e) {
  e.preventDefault() // Prevent browser's default form submission

  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    message: form.message.value,
    referral: form.referral.value,
    consent_transactional: form.consent_transactional?.checked || false,
    consent_marketing: form.consent_marketing?.checked || false,
  }

  try {
    const response = await fetch('/.netlify/functions/sendToGHL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      window.location.href = '/thank-you.html' // ✅ Redirect on success
    } else {
      alert(
        "We're sorry, something went wrong while submitting your request. Please try again later."
      )
    }
  } catch (err) {
    console.error('Submission Error:', err)
    alert(
      'A technical error occurred while processing your request. Please check your internet connection and try again.'
    )
  }

  return false // Extra safety to prevent default form action
})
