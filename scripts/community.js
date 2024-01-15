const userIDInput = document.querySelector('.userIDInput')
const confirmUserIDButton = document.querySelector('.confirmUserIDButton')
const mapIDInput = document.querySelector(".mapIDInput")
const confirmMapIDButton = document.querySelector(".confirmMapIDButton")

const idHelperContainer = document.querySelector(".idHelperContainer");
const playerInfoContainer = document.querySelector(".playerInfoContainer");
const teamInfoContainer = document.querySelector(".teamInfoContainer");
const challengeInfoContainer = document.querySelector(".challengeInfoContainer");
const mapInfoContainer = document.querySelector(".mapInfoContainer");
const infoContainers = [idHelperContainer, playerInfoContainer, teamInfoContainer, challengeInfoContainer, mapInfoContainer]

const popupContainer = document.querySelector(".popupContainer")
const popupTitle = document.querySelector(".popupTitle")
const popupContentContainer = document.querySelector(".popupContentContainer")
const statsPopupOverlay = document.querySelector(".popupOverlay")

const regexAlphanumeric = /[^a-zA-Z0-9_]/   // check for any character that isn't a number, letter, or underscore
const regexLetter = /[^a-zA-Z]/ // check for any non-letter
let userID
let mapID
let mapData
let playerData

let urlParams = new URLSearchParams(window.location.search);
let urlType
let urlID

confirmUserIDButton.onclick = () => {
    stupidFunction1(null)
}
confirmMapIDButton.onclick = () => {
    stupidFunction3(null)
}
async function stupidFunction1(identification) {
    if (await getUser(identification) != "oops") swapTo("player")
}
async function stupidFunction3(identification) {
    if (await getMap(identification) != "oops") swapTo("map")
}
async function getUser(identification) {
    const id = identification == null ? userIDInput.value : identification
    userID = id.trim()
    userIDInput.value = ""
    enableLoading()
    try {
        let player
        if (userID.length < 7) { 
            throw new Error("User ID Input Too Short")
        } else if (regexAlphanumeric.test(userID)) {
            throw new Error("Invalid Character")
        } else {
            let playerResponse = await fetch(`https://data.ninjakiwi.com/btd6/users/${userID}`)
            if (!playerResponse.ok) { 
                throw new Error("Invalid OAK ID")
            } else {
                player = await playerResponse.json()
                if (player["error"] != null && player["error"].includes("Invalid user ID")) throw new Error("Invalid OAK ID") 
                else if (player["error"] != null) throw new Error(player["error"])
                else playerData = player["body"]; return playerData;
            }
        }
    } catch(error) {
        let popupHTML
        if (error == "Error: Invalid OAK ID" || error == "TypeError: Failed to fetch") {
            error = navigator.onLine ? "Error: Invalid OAK ID" : "Error: Poor Internet Connection"
            if (error == "Error: Invalid OAK ID") {
                popupHTML = `
                <p>The OAK ID you used (${userID}) was not valid. Please verify the following.</p>
                <ul>
                    <li>Be sure you used an OAK ID, <b>not</b> a User ID. If you need help on how to find an OAK ID, follow the guide at the bottom of the page.</li>
                    <li>Double check to make sure that the OAK ID is correct.</li>
                </ul>`
            } else {
                popupHTML = `
                <p>The OAK ID you used (${userID}) could not be checked because of poor internet connection. Please check your internet connection, then try again.</p>`
            }
        } else if (error == "Error: Invalid Character") {
            popupHTML = `
            <p>Your response has an invalid character. An OAK ID can only contain letters, numbers, and underscores.</p>`
        } else {
            popupHTML = `
            <p>An error occured. Please try again with a valid OAK ID.</p>`
        }
        showPopup(error, popupHTML)
        return "oops"
    } finally {
        disableLoading()
    }
}
async function getMap(identification) {
    const id = identification == null ? mapIDInput.value : identification
    mapID = id.trim().toUpperCase()
    mapIDInput.value = ""
    enableLoading()
    try {
        if (mapID.length < 7) throw new Error("Map ID Input Too Short")
        else if (regexLetter.test(mapID)) throw new Error("Invalid Character")
        else {
            let mapResponse = await fetch(`https://data.ninjakiwi.com/btd6/maps/map/${mapID}`)
            if (!mapResponse.ok) { 
                throw new Error("Invalid Map ID")
            } else {
                let map = await mapResponse.json()
                if (map["error"] != null && map["error"].includes("Invalid map ID")) throw new Error("Invalid Map ID") 
                else if (map["error"] != null) throw new Error(map["error"])
                else mapData = map["body"]; return mapData;
            }
        }
    } catch(error) {
        let popupHTML
        if (error == "Error: Invalid Character") {
            popupHTML = `
            <p>Your input has an invalid character. A Map ID can only contain letters.</p>`
        } else if (error == "Error: Invalid Map ID" || error == "TypeError: Failed to fetch") {
            error = navigator.onLine ? "Error: Invalid Map ID" : "Error: Poor Internet Connection"
            if (error == "Error: Invalid Map ID") {
                popupHTML = `
                <p>The Map ID you used (${mapID}) was not valid. Please double-check that you used a correct Map ID.</p>`
            } else {
                popupHTML = `
                <p>The Map ID you used (${mapID}) could not be checked because of poor internet connection. Please check your internet connection, then try again.`
            }
        } else {
            popupHTML = `
            <p>An error occured. Please try again with a valid Map ID.</p>`
        }
        showPopup(error, popupHTML)
        return "oops"
    } finally {
        disableLoading()
    }
}

function swapTo(category) {
    for (const ugh of infoContainers) {
        if (!ugh.classList.contains(`${category}InfoContainer`)) ugh.style.display = "none"
        else ugh.style.display = "flex"
    }
    if (category == "player") {
        parsePlayerData()
        editURL("type", "player", true)
        editURL("id", userID, false)
    } else if (category == "map") {
        parseMapData()
        editURL("type", "map", true)
        editURL("id", mapID, false)
    }
}

function parsePlayerData() {
    if (playerData == null) return "Does Not Exist"
    const playerName = document.querySelector(".playerName")
    const playerIcon = document.querySelector(".playerIcon")
    const normalBossContainer = document.querySelector(".normalBossContainer")
    const eliteBossContainer = document.querySelector(".eliteBossContainer")
    const raceContainer = document.querySelector('.raceContainer')
    const ctGlobalContainer = document.querySelector('.ctGlobalContainer')
    const ctLocalContainer = document.querySelector('.ctLocalContainer')
    const toggleRaceView = document.querySelector(".toggleRaceView")
    const toggleNormalBossView = document.querySelector(".toggleNormalBossView")
    const toggleEliteBossView = document.querySelector(".toggleEliteBossView")
    const toggleCTGlobalView = document.querySelector('.toggleCTGlobalView')
    const toggleCTLocalView = document.querySelector('.toggleCTLocalView')
    const viewAllHeroesButton = document.querySelector('.viewAllHeroesButton')
    const favoriteHeroContainer = document.querySelector(".favoriteHeroContainer")
    const containerList = [raceContainer, normalBossContainer, eliteBossContainer, ctLocalContainer, ctGlobalContainer]

    const medalsSinglePlayerContainer = document.querySelector('.medalsSinglePlayerContainer')
    const medalsMultiPlayerContainer = document.querySelector(".medalsMultiPlayerContainer")
    const singlePlayerKeys = Object.keys(playerData["_medalsSinglePlayer"])
    const singlePlayerValues = Object.values(playerData["_medalsSinglePlayer"])
    const multiPlayerKeys = Object.keys(playerData["_medalsSinglePlayer"])
    const multiPlayerValues = Object.values(playerData["_medalsMultiplayer"])
    viewAllHeroesButton.classList.remove("showing")
    for (const child of [...Array.from(raceContainer.children), ...Array.from(normalBossContainer.children), ...Array.from(eliteBossContainer.children), ...Array.from(favoriteHeroContainer.children)]) {
        child.remove()
    }
    for (const container of containerList) {
        container.innerText = ""
    }
    toggleRaceView.onclick = () => {
        raceContainer.classList.toggle("rankedContentHidden")
    }
    toggleNormalBossView.onclick = () => {
        normalBossContainer.classList.toggle("rankedContentHidden")
    }
    toggleEliteBossView.onclick = () => {
        eliteBossContainer.classList.toggle("rankedContentHidden")
    }
    toggleCTGlobalView.onclick = () => {
        ctGlobalContainer.classList.toggle("rankedContentHidden")
    }
    toggleCTLocalView.onclick = () => {
        ctLocalContainer.classList.toggle("rankedContentHidden")
    }
    // i = 1 intentionally to skip CHIMPS-BLACK
    for (let i = 1; i < singlePlayerKeys.length; i++) {
        let element = medalsSinglePlayerContainer.querySelector(`.${singlePlayerKeys[i]}`);
        if (element) {
            element.textContent = singlePlayerValues[i]
        }
    }
    // i = 1 intentionally to skip CHIMPS-BLACK
    for (let i = 1; i < multiPlayerKeys.length; i++) {
        let element = medalsMultiPlayerContainer.querySelector(`.${multiPlayerKeys[i]}`);
        if (element) {
            element.textContent = multiPlayerValues[i]
        }
    }
    let heroEntries = Object.entries(playerData["heroesPlaced"])
    heroEntries.sort((a, b) => b[1] - a[1])
    const sortedHeroEntries = Object.fromEntries(heroEntries)
    const heroKeys = Object.keys(sortedHeroEntries)
    const heroValues = Object.values(sortedHeroEntries)
    for (let i = 0; i < heroKeys.length; i++) {
        const key = heroKeys[i]
        const value = heroValues[i]
        const element = document.createElement("div")
        const heroImage = document.createElement("img")
        const heroValue = document.createElement("h3")
        element.classList.add("heroUsageElem")
        heroImage.classList.add("heroImage")
        heroImage.src = `assets/${key}.png`
        heroImage.alt = key
        heroValue.innerText = value
        element.appendChild(heroImage)
        element.appendChild(heroValue)
        favoriteHeroContainer.appendChild(element)
    }
    const heroElems = Array.from(favoriteHeroContainer.children)
    for (let i = 3; i < heroElems.length; i++) {
        heroElems[i].style.display = "none"
    }
    viewAllHeroesButton.onclick = () => {
        if (!viewAllHeroesButton.classList.contains("showing")) {
            for (const heroElem of heroElems) {
                heroElem.style.display = "block"
            }
            viewAllHeroesButton.classList.add("showing")
            viewAllHeroesButton.innerText = "Hide All Heroes"
        } else {
            for (let i = 3; i < heroElems.length; i++) {
                heroElems[i].style.display = "none"
            }
            viewAllHeroesButton.classList.remove("showing")
            viewAllHeroesButton.innerText = "Show All Heroes"
        }
    }    
    parseRankedMedals("race", raceContainer)
    parseRankedMedals("normalBoss", normalBossContainer)
    parseRankedMedals("eliteBoss", eliteBossContainer)
    parseRankedMedals("ctGlobal", ctGlobalContainer)
    parseRankedMedals("ctLocal", ctLocalContainer)
    
    playerName.innerText = playerData["displayName"]
    playerIcon.src = playerData["avatarURL"]
    const bannerURL = playerData["bannerURL"]
    if (bannerURL == "https://static-api.nkstatic.com/appdocs/4/assets/opendata/9dfe787e1eb1c79a1532bcd5e49cf0f1_.png")
        bannerURL = "assets/hero.png"

    document.documentElement.style.setProperty(`--player-banner-bg-image`, `url(${bannerURL})`)
    const whyDoPluralsHaveToExist = playerData["followers"] == 1 ? "follower" : "followers"
    document.querySelector(".followers").innerText = `${playerData["followers"]} ${whyDoPluralsHaveToExist}`
    document.querySelector(".regLevel").innerText = `Level ${playerData["rank"]}`
    if (playerData["rank"] >= 155) {
        document.querySelector(".vetLevelContainer").style.display = "flex"
        document.querySelector(".vetLevel").innerText = `Veteran Level ${playerData["veteranRank"]}`
        document.querySelector(".vetLevel").onclick = () => {
            // technically the amount for levels 1-155 is 180001000 but that looks ugly 
            // and the difference is effectively nothing
            const totalXP = 180000000 + (playerData["veteranRank"] * 20000000)
            let popupHTML = `
            <div class="popupImageContainer">
                <img src="assets/vetLevelIcon.png" class="vetLevelIcon popupImage"/>
                <p>Veteran Levels are levels that exist beyond the normal levels that you can get after reaching Level 155. 
                Veteran Levels are purely cosmetic and won't unlock anything new, but it takes <b>20 million XP</b> for each new Veteran Level. 
                At Veteran Level ${playerData["veteranRank"]}, this player has gotten a total of <b>over ${totalXP.toLocaleString()} XP</b>.</p>
            </div>`
            showPopup("Veteran Levels", popupHTML)
        }
    } else {
        document.querySelector(".vetLevelContainer").style.display = "none"
    }
    window.scrollTo(playerIcon, {behavior: "smooth"})
} 
function parseRankedMedals(event, containerToAppendTo) {
    let keyList
    let valueList
    if (event == "race") {
        keyList = Object.keys(playerData["_medalsRace"])
        valueList = Object.values(playerData["_medalsRace"])
    } else if (event == "normalBoss") {
        keyList = Object.keys(playerData["_medalsBoss"])
        valueList = Object.values(playerData["_medalsBoss"])
    } else if (event == "eliteBoss") {
        keyList = Object.keys(playerData["_medalsBossElite"])
        valueList = Object.values(playerData["_medalsBossElite"])
    } else if (event == "ctLocal") {
        keyList = Object.keys(playerData["_medalsCTLocal"])
        valueList = Object.values(playerData["_medalsCTLocal"])
    } else {
        keyList = Object.keys(playerData["_medalsCTGlobal"])
        valueList = Object.values(playerData["_medalsCTGlobal"])
    }
    let total = 0
    for (let i = 0; i < keyList.length; i++) {
        const key = keyList[i]
        const value = valueList[i]
        const element = document.createElement("div")
        const childHeader = document.createElement("h4")
        const childBody = document.createElement("p")
        total += Number(value)
        childHeader.innerText = decipherNKTerms(key, event)
        childBody.innerText = value
        element.classList.add("competitiveMedalElem")
        element.appendChild(childHeader)
        element.appendChild(childBody)
        containerToAppendTo.appendChild(element)
    }
    if (keyList.length > 0) {
        const element = document.createElement("div")
        element.classList.add("competitiveMedalElem")
        element.classList.add("totalMedalElem")
        const childHeader = document.createElement("h4")
        const childBody = document.createElement("p")
        childHeader.innerText = "Total"
        childBody.innerText = total
        element.appendChild(childHeader)
        element.appendChild(childBody)
        containerToAppendTo.appendChild(element)
    } else {
        containerToAppendTo.innerText = "None"
    }
}
function decipherNKTerms(whyDoesItHaveToBeThisHardNK, event) {
    if (event == "normalBoss" || event == "eliteBoss" || event == "race") {
        switch (whyDoesItHaveToBeThisHardNK) {
            case "BlackDiamond": return "1st Place"
            case "RedDiamond": return "2nd Place"
            case "Diamond": return "3rd Place"
            case "GoldDiamond": return "Top 50"
            case "DoubleGold": return "Top 1%"
            case "GoldSilver": return "Top 10%"
            case "DoubleSilver": return "Top 25%"
            case "Silver": return "Top 50%"
            case "Bronze": return "Top 75%"
            default: return "no idea what this medal is but this person has it"
        }
    } else if (event == "ctLocal") {
        switch (whyDoesItHaveToBeThisHardNK) {
            case "BlackDiamond": return "1st Place"
            case "RedDiamond": return "2nd Place"
            case "Diamond": return "3rd Place"
            case "GoldDiamond": return "Top 10"
            case "DoubleGold": return "Top 20"
            case "Silver": return "Top 40"
            case "Bronze": return "Top 60"
            default: return "no idea what this medal is but this person has it"
        }
    } else /* event is hopefully ct global */ {
        switch (whyDoesItHaveToBeThisHardNK) {
            case "Diamond": return "Top 25"
            case "GoldDiamond": return "Top 100"
            case "DoubleGold": return "Top 1%"
            case "GoldSilver": return "Top 10%"
            case "DoubleSilver": return "Top 25%"
            case "Silver": return "Top 50%"
            case "Bronze": return "Top 75%"
            default: return "no idea what this medal is but this person has it"
        }
    }
}


function parseMapData() {
    if (mapData == null) return "Does Not Exist"
    const mapName = document.querySelector(".mapName")
    const mapImage = document.querySelector(".mapImage")
    const mapCredit = document.querySelector(".mapCredit")
    const mapDetails = document.querySelector(".mapDetails");
    const playMap = document.querySelector(".playMap")
    const upvotes = mapDetails.querySelector(".upvotes");
    const upvoteRate = mapDetails.querySelector(".upvoteRate")
    const plays = mapDetails.querySelector(".plays");
    const playsUnique = mapDetails.querySelector(".playsUnique");
    const wins = mapDetails.querySelector(".wins");
    const winsUnique = mapDetails.querySelector(".winsUnique");
    const winRateRaw = mapDetails.querySelector(".winRateRaw");
    const winRateUnique = mapDetails.querySelector(".winRateUnique");
    const mapCode = document.querySelector(".mapCode")
    mapCredit.onclick = () => {
        stupidFunction1(userID)
    }
    playMap.onclick = () => {
        window.open(`https://join.btd6.com/Map/${mapID}`)
    }
    // rgb(255 238 67)
    mapName.innerText = mapData["name"]
    mapImage.src = mapData["mapURL"]
    let urlParts = mapData["creator"].split("/")
    userID = urlParts[urlParts.length - 1]
    mapCode.innerText = `Code: ${mapID}`;
    upvotes.innerText = mapData["upvotes"].toLocaleString();
    upvoteRate.innerText = mapData["playsUnique"] > 0 ? `${(mapData["upvotes"] / mapData["playsUnique"] * 100).toFixed(2).toLocaleString()}%` : "N/A"
    plays.innerText = mapData["plays"].toLocaleString();
    playsUnique.innerText = mapData["playsUnique"].toLocaleString();
    wins.innerText = mapData["wins"].toLocaleString();
    winsUnique.innerText = mapData["winsUnique"].toLocaleString();
    let wrr = mapData["plays"] > 0 ? (mapData["wins"] * 100 / mapData["plays"]).toFixed(2).toLocaleString() + "%" : "N/A"
    let wru = mapData["playsUnique"] > 0 ? (mapData["winsUnique"] * 100 / mapData["playsUnique"]).toFixed(2).toLocaleString() + "%" : "N/A"
    winRateRaw.innerText = wrr
    winRateUnique.innerText = wru
}

function showPopup(title, content) {
  popupTitle.innerText = title
  if (title == "Veteran Levels") popupTitle.classList.add("colorMePurple")
  popupContentContainer.innerHTML = content
  popupContainer.showModal()
  popupContainer.classList.add("open")
  document.body.classList.add("no-scroll")
}
async function closePopup() {
    popupContainer.classList.remove("open")
    document.body.classList.remove("no-scroll")
    setTimeout(() => {
      popupContainer.close();
    }, 300);
}

document.querySelector(".closePopupButton").onclick = () => {
    closePopup()
}

function enableLoading() {
    statsPopupOverlay.style.display = "block"
    document.body.classList.add("no-scroll")
}
function disableLoading() {
    statsPopupOverlay.style.display = "none"
    document.body.classList.remove("no-scroll")
}

function editURL(name, value, push) {
    if (value != null) { 
      urlParams.set(name, value) 
      if (push) history.pushState(null, null, "?" + urlParams.toString())
      else history.replaceState(null, null, "?" + urlParams.toString())
    } else { 
      urlParams.delete(name) 
      window.history.pushState(null, document.title, window.location.pathname)
    }
}

window.addEventListener('popstate', function(event) {
    window.location.reload()
});
window.addEventListener('online', (event) => {
    window.location.reload()
})

async function main() {
    for (const bruh of infoContainers) {
        bruh.style.display = "none"
    }
    idHelperContainer.style.display = "block"
    urlType = urlParams.get("type")
    urlID = urlParams.get("id")
    switch (urlType) {
        case "map":  stupidFunction3(urlID); break;
        case "player": stupidFunction1(urlID); break;
    }
}
main()