var CSbody=document.querySelector("body");const CSnavbarMenu=document.querySelector("#cs-navigation"),CShamburgerMenu=document.querySelector("#cs-navigation .cs-toggle");null!==CShamburgerMenu&&CShamburgerMenu.addEventListener("click",function(){CShamburgerMenu.classList.toggle("cs-active"),CSnavbarMenu.classList.toggle("cs-active"),CSbody.classList.toggle("cs-open"),ariaExpanded()});const faqItems=Array.from(document.querySelectorAll(".cs-faq-item"));for(const item of faqItems){let e=()=>{item.classList.toggle("active")};item.addEventListener("click",e)}function ariaExpanded(){let e=document.querySelector("#cs-expanded"),t=e.getAttribute("aria-expanded");"false"===t?e.setAttribute("aria-expanded","true"):e.setAttribute("aria-expanded","false")}document.addEventListener("scroll",e=>{let t=document.documentElement.scrollTop;t>=100?document.querySelector("body").classList.add("scroll"):document.querySelector("body").classList.remove("scroll")});const dropDowns=Array.from(document.querySelectorAll("#cs-navigation .cs-dropdown"));for(const item of dropDowns){let t=()=>{item.classList.toggle("cs-active")};item.addEventListener("click",t)}function enableDarkMode(){document.body.classList.add("dark-mode"),localStorage.setItem("theme","dark")}function disableDarkMode(){document.body.classList.remove("dark-mode"),localStorage.setItem("theme","light")}function detectColorScheme(){let e="light";localStorage.getItem("theme")?e=localStorage.getItem("theme"):window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches&&(e="dark"),"dark"===e?enableDarkMode():disableDarkMode()}detectColorScheme(),null!==document.getElementById("dark-mode-toggle")&&document.getElementById("dark-mode-toggle").addEventListener("click",()=>{"light"===localStorage.getItem("theme")?enableDarkMode():disableDarkMode()});const handleSubmit=e=>{e.preventDefault();let t=e.target,a=new FormData(t);fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(a).toString()}).then(e=>{if(e.ok)window.location.href="/thank-you.html";else throw Error("Form submission failed")}).catch(e=>alert(e))};null!==document.querySelector("form")&&document.querySelector("form").addEventListener("submit",handleSubmit),document.getElementById("current-year").textContent=new Date().getFullYear(),document.addEventListener("DOMContentLoaded",e=>{let t=new URLSearchParams(window.location.search);"true"===t.get("clearForm")&&document.getElementById("cs-form-1105").reset()});
