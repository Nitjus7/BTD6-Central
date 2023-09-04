const hamburgerButton = document.querySelector(".hamburgerButton")
const hamburgerMenu = document.querySelector(".hamburgerMenu")
const hamburgerContainer = document.querySelector(".hamburgerContainer")
const popupOverlay = document.querySelector(".popupOverlay")
const closeButton = document.querySelector(".closeButton")
const goToEvents = document.querySelector(".goToEvents")
const goToHome = document.querySelector(".goToHome")

hamburgerButton.onclick = () => {
    hamburgerContainer.classList.add("openFaceBurger");
    popupOverlay.style.display = "block";
}
closeButton.onclick = () => {
    hamburgerContainer.classList.remove("openFaceBurger")
    popupOverlay.style.display = "none";
}
goToEvents.onclick = () => {
    window.location.replace("events.html")
}
goToHome.onclick = () => {
    window.location.replace("index.html")
}