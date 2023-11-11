
if (/MSIE|Trident/.test(navigator.userAgent)) {
    alert("You are using an outdated search engine. Some features may not work as intended or at all. Consider switching to Chrome, Safari, Firefox, or Edge to avoid any issues.")
} 

const hamburgerButton = document.querySelector(".hamburgerButton")
const hamburgerMenu = document.querySelector(".hamburgerMenu")
const hamburgerContainer = document.querySelector(".hamburgerContainer")
const popupOverlay = document.querySelector(".popupOverlay")
const closeButton = document.querySelector(".closeButton")
const goToEvents = document.querySelector(".goToEvents")
const goToStats = document.querySelector(".goToStats")
const goToHome = document.querySelector(".goToHome")
const goToCommunity = document.querySelector(".goToCommunity")
const pageTheme = document.querySelector(".pageTheme")
const styles = document.documentElement

hamburgerButton.onclick = () => {
    hamburgerContainer.classList.add("openFaceBurger");
    popupOverlay.style.display = "block";
    document.body.classList.add("no-scroll")
}
closeButton.onclick = () => {
    hamburgerContainer.classList.remove("openFaceBurger")
    popupOverlay.style.display = "none";
    document.body.classList.remove("no-scroll")
}
goToEvents.onclick = () => {
    window.location.replace("events.html")
}
goToStats.onclick = () => {
    window.location.replace("stats.html")
}
goToHome.onclick = () => {
    window.location.replace("index.html")
}
goToCommunity.onclick = () => {
    window.location.replace("community.html")
}
pageTheme.addEventListener("change", () => {
    if (pageTheme.value == "light") meetGod()
    else swapToDark()
})

function checkPreferredTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        swapToDark()
    } else {
        meetGod()
    }
}
switch (localStorage.getItem("themeMode")) {
    case "light": meetGod(); break;
    case "dark": swapToDark(); break;
    case "spirit": swapToSpirit(); break;
    default: checkPreferredTheme(); break;
}
function swapToDark() {
    pageTheme.value = "dark"
    styles.style.setProperty("--pageBackground", "black");
    styles.style.setProperty("--contentBackground1", "#33373f");
    styles.style.setProperty("--contentBackground2", "#ff56286a");
    styles.style.setProperty("--contentBackground3", "#5a5a5a6a")
    styles.style.setProperty("--contentAccent", "rgba(75, 55, 90, 0.35)")
    styles.style.setProperty("--contentOutline2", "rgb(241, 77, 59)")
    styles.style.setProperty("--contentOutline3", "#d382e7")
    styles.style.setProperty("--itemSelectedBackground", "rgb(116, 109, 109)");
    styles.style.setProperty("--shadowColor", "rgb(32, 31, 31)");
    styles.style.setProperty("--wip", "0.5");
    styles.style.setProperty("--textColor", "#dce0e7");
    styles.style.setProperty("--textColor2", "rgb(243, 176, 110)")
    styles.style.setProperty("--textColor3", "rgb(195 168 232)")
    styles.style.setProperty("--buttonColor1", "#1d5cd1");
    styles.style.setProperty("--buttonColor2", "#5985e5");
    styles.style.setProperty("--buttonColor3", "#691e82")
    localStorage.setItem('themeMode', 'dark');
}
  
function meetGod() {
    pageTheme.value = "light"
    styles.style.setProperty("--pageBackground", "#e8e5e5");
    styles.style.setProperty("--contentBackground1", "white");
    styles.style.setProperty("--contentBackground2", "rgba(232, 119, 88, 0.39)");
    styles.style.setProperty("--contentBackground3", "rgba(163, 124, 231, 0.5)")
    styles.style.setProperty("--itemSelectedBackground", "lightgray");
    styles.style.setProperty("--contentOutline2", "rgb(241, 77, 59)")
    styles.style.setProperty("--contentOutline3", "#914ba2")
    styles.style.setProperty("--shadowColor", "gray");
    styles.style.setProperty("--wip", "0.33");
    styles.style.setProperty("--textColor", "#121212");
    styles.style.setProperty("--textColor2", "rgb(203 108 4)");
    styles.style.setProperty("--textColor3", "rgb(107 26 219)")
    styles.style.setProperty("--buttonColor2", "#8caeeb");
    styles.style.setProperty("--buttonColor1", "#5985e5");
    styles.style.setProperty("--buttonColor3", "#b873cf")
    localStorage.setItem('themeMode', 'light');
}
  
function swapToSpirit() {
    pageTheme.value = "spirit"
    styles.style.setProperty("--pageBackground", "")
}
