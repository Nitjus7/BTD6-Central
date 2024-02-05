
if (/MSIE|Trident/.test(navigator.userAgent)) {
    alert("You are using an outdated search engine. Some features may not work as intended or at all. Consider switching to Chrome, Safari, Firefox, or Edge to avoid any issues.")
} 

const hamburgerButton = document.querySelector(".hamburgerButton")
const hamburgerMenu = document.querySelector(".hamburgerMenu")
const hamburgerContainer = document.querySelector(".hamburgerContainer")
const popupOverlay = document.querySelector(".popupOverlay")
const closeButton = document.querySelector(".closeButton")
const goToEvents = document.querySelectorAll(".goToEvents")
const goToStats = document.querySelectorAll(".goToStats")
const goToHome = document.querySelectorAll(".goToHome")
const goToCommunity = document.querySelectorAll(".goToCommunity")
const pageTheme = document.querySelector(".pageTheme")
const pageThemeButtonNoBurger = document.querySelector(".pageThemeButtonNoBurger")
const styles = document.documentElement

hamburgerButton.onclick = () => {
    hamburgerContainer.classList.add("openFaceBurger");
    popupOverlay.style.display = "block";
    document.body.classList.add("no-scroll")
}
closeButton.onclick = () => {
    hamburgerContainer.classList.remove("openFaceBurger")
    popupOverlay.style.display = "none"
    document.body.classList.remove("no-scroll")
}
for (const elem of goToEvents) {
    elem.onclick = () => {
        window.location.replace("events.html")
    }
}
for (const elem of goToHome) {
    elem.onclick = () => {
        window.location.replace("index.html")
    }
}
for (const elem of goToStats) {
    elem.onclick = () => {
        window.location.replace("stats.html")
    }
}
for (const elem of goToCommunity) {
    elem.onclick = () => {
        window.location.replace("community.html")
    }
}
pageThemeButtonNoBurger.onclick = () => {
    if (pageThemeButtonNoBurger.innerHTML == `<span class="material-symbols-outlined">dark_mode</span>`) {
        meetGod()
    } else if (pageThemeButtonNoBurger.innerHTML == `<span class="material-symbols-outlined">light_mode</span>`){
        swapToDark()
    }
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
    pageThemeButtonNoBurger.innerHTML = `<span class="material-symbols-outlined">dark_mode</span>`
    styles.style.setProperty("--pageBackground", "#212121")
    styles.style.setProperty("--contentBackground1", "#3c4048")
    styles.style.setProperty("--contentBackground2", "#ff56286a")
    styles.style.setProperty("--contentBackground3", "#6648906a")
    styles.style.setProperty("--contentBackground4", "#074059")
    styles.style.setProperty("--contentAccent", "rgba(75, 55, 90, 0.35)")
    styles.style.setProperty("--contentOutline1", "#8e8e8e")
    styles.style.setProperty("--contentOutline2", "rgb(241, 77, 59)")
    styles.style.setProperty("--contentOutline3", "#d382e7")
    styles.style.setProperty("--contentOutline4", "#4dbbe0")
    styles.style.setProperty("--itemSelectedBackground", "rgb(116, 109, 109)");
    styles.style.setProperty("--shadowColor", "rgb(0, 0, 0)");
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
    pageThemeButtonNoBurger.innerHTML = `<span class="material-symbols-outlined">light_mode</span>`
    styles.style.setProperty("--pageBackground", "#f3f3f3");
    styles.style.setProperty("--contentBackground1", "white");
    styles.style.setProperty("--contentBackground2", "rgba(232, 119, 88, 0.39)");
    styles.style.setProperty("--contentBackground3", "#b095e047")
    styles.style.setProperty("--contentBackground4", "#b0d6f3")
    styles.style.setProperty("--itemSelectedBackground", "lightgray")
    styles.style.setProperty("--contentOutline1", "#a69a9a")
    styles.style.setProperty("--contentOutline2", "rgb(241, 77, 59)")
    styles.style.setProperty("--contentOutline3", "#a46ab3")
    styles.style.setProperty("--contentOutline4", "#1e2f9d")
    styles.style.setProperty("--shadowColor", "gray");
    styles.style.setProperty("--wip", "0.33");
    styles.style.setProperty("--textColor", "#121212");
    styles.style.setProperty("--textColor2", "rgb(203 108 4)");
    styles.style.setProperty("--textColor3", "rgb(107 26 219)")
    styles.style.setProperty("--buttonColor1", "#819fe0");
    styles.style.setProperty("--buttonColor2", "#8caeeb");
    styles.style.setProperty("--buttonColor3", "#b873cf")
    localStorage.setItem('themeMode', 'light');
}
  
function swapToSpirit() {
    pageTheme.value = "spirit"
    styles.style.setProperty("--pageBackground", "")
}

/* if (document.getElementsByClassName("takeMeHomeContainer").length > 0) {
    let lastScrollPos = 0;
    window.addEventListener('scroll', function() {
        let currentScrollPos = document.documentElement.scrollTop || document.body.scrollTop;
        let takeMeHomeContainer = document.querySelector(".takeMeHomeContainer");
 
        // User is scrolling down
        if (currentScrollPos > lastScrollPos) {
            takeMeHomeContainer.classList.remove("showYourself");
        } 
        // User is scrolling up or at the top of the page
        else {
            takeMeHomeContainer.classList.add("showYourself");
        }
 
        lastScrollPos = currentScrollPos;
    }, { passive: true });
 } */
 