const form = document.getElementById('cs-form-1105')

form.addEventListener('submit', async function (e) {
  e.preventDefault()

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
      alert('전송 성공! 곧 연락드릴게요 🙌')
      form.reset()
    } else {
      alert('전송 실패... 다시 시도해주세요 🙏')
    }
  } catch (err) {
    console.error('Error:', err)
    alert('에러 발생! 인터넷 연결을 확인해주세요 😥')
  }
})
