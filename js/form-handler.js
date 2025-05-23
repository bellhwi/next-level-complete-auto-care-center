document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('cs-form-1105')

  form.addEventListener('submit', async function (e) {
    e.preventDefault()

    const data = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value,
      referral: form.referral.value,
      consent_marketing: form.consent_marketing?.checked ? 'yes' : 'no',
    }

    // ✅ Step 1: GHL로 전송
    try {
      await fetch('/.netlify/functions/sendToGHL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch (err) {
      console.error('GHL 전송 오류:', err)
    }

    // ✅ Step 2: Netlify 폼 제출 처리
    const netlifyForm = document.createElement('form')
    netlifyForm.style.display = 'none'
    netlifyForm.method = 'POST'
    netlifyForm.action = '/thank-you.html'
    netlifyForm.setAttribute('data-netlify', 'true')

    const fields = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      referral: data.referral,
      consent_marketing: data.consent_marketing,
    }

    for (const key in fields) {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = key
      input.value = fields[key]
      netlifyForm.appendChild(input)
    }

    document.body.appendChild(netlifyForm)
    netlifyForm.submit()
  })
})
