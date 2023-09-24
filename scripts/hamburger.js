const hamburgerButton = document.querySelector(".hamburgerButton")
const hamburgerMenu = document.querySelector(".hamburgerMenu")
const hamburgerContainer = document.querySelector(".hamburgerContainer")
const popupOverlay = document.querySelector(".popupOverlay")
const closeButton = document.querySelector(".closeButton")
const goToEvents = document.querySelector(".goToEvents")
const goToStats = document.querySelector(".goToStats")
const goToHome = document.querySelector(".goToHome")
const pageTheme = document.querySelector(".pageTheme")
const styles = document.documentElement

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
goToStats.onclick = () => {
    window.location.replace("stats.html")
}
goToHome.onclick = () => {
    window.location.replace("index.html")
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
    styles.style.setProperty("--itemSelectedBackground", "rgb(116, 109, 109)");
    styles.style.setProperty("--shadowColor", "rgb(32, 31, 31)");
    styles.style.setProperty("--wip", "0.5");
    styles.style.setProperty("--textColor", "#dce0e7");
    styles.style.setProperty("--mainButton", "#1d5cd1");
    styles.style.setProperty("--secondaryButton", "#5985e5");
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
    styles.style.setProperty("--shadowColor", "gray");
    styles.style.setProperty("--wip", "0.33");
    styles.style.setProperty("--textColor", "#121212");
    styles.style.setProperty("--mainButton", "#8caeeb");
    styles.style.setProperty("--secondaryButton", "#5985e5");
    localStorage.setItem('themeMode', 'light');
}
  

