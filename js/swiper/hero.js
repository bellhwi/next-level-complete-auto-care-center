var swiper = new Swiper('.swiper-hero', {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  effect: 'coverflow',
  autoplay: {
    delay: 5000,
    pauseOnMouseEnter: false,
  },
  loop: true,
  modules: [Pagination, EffectCoverflow, Autoplay, Loop], // 필요한 모듈만 로드
})
