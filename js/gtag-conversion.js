// gtag-conversion.js

// 1. gtag 초기화
window.dataLayer = window.dataLayer || []
function gtag() {
  dataLayer.push(arguments)
}
gtag('js', new Date())
gtag('config', 'AW-11193323869')

// 2. 전화 콜 컨버전 설정
gtag('config', 'AW-11193323869/EC_oCMb0wcgZEN2istkp', {
  phone_conversion_number: '+1(865) 350-2700',
})

// 3. Book Now 전환 이벤트 함수
function gtag_report_conversion() {
  gtag('event', 'conversion', {
    send_to: 'AW-11193323869/k686CIqy57saEN2istkp',
  })
}

// 4. Book Now 링크 자동 탐지 후 onclick 속성 주입
document.addEventListener('DOMContentLoaded', function () {
  const targetURL =
    'https://api.leadconnectorhq.com/widget/booking/5yfcmknYsc08pgjS8xPt'

  const links = document.querySelectorAll('a[href="' + targetURL + '"]')

  links.forEach((link) => {
    link.addEventListener('click', function () {
      gtag_report_conversion()
    })
  })
})
