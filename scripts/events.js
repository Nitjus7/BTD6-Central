const popupContainer = document.querySelector(".popupContainer")
const popupTitle = document.querySelector(".popupTitle")
const popupContentContainer = document.querySelector(".popupContentContainer")
const eventsPopupOverlay = document.querySelector(".popupOverlay")
const backButton = document.querySelector(".takeMeHomeContainer")

const primaryTowers = [
  "DartMonkey",
  "BoomerangMonkey",
  "BombShooter",
  "TackShooter",
  "IceMonkey",
  "GlueGunner",
];
const militaryTowers = [
  "SniperMonkey",
  "MonkeySub",
  "MonkeyBuccaneer",
  "MonkeyAce",
  "HeliPilot",
  "MortarMonkey",
  "DartlingGunner",
];
const magicTowers = [
  "WizardMonkey",
  "SuperMonkey",
  "NinjaMonkey",
  "Alchemist",
  "Druid",
];
const supportTowers = [
  "BananaFarm",
  "SpikeFactory",
  "MonkeyVillage",
  "EngineerMonkey",
  "BeastHandler",
];

const eventPickContainer = document.getElementById("eventPickContainer")
const raceEventButton = document.getElementById("raceEventButton")
const odysseyEventButton = document.getElementById("odysseyEventButton")
const bossEventButton = document.getElementById("bossEventButton")
const ctEventButton = document.getElementById("ctEventButton")
const raceArchiveContainer = document.getElementById("raceArchiveContainer")
const bossArchiveContainer = document.getElementById("bossArchiveContainer")
const ctArchiveContainer = document.getElementById("ctArchiveContainer")
const bossDifficultyButtonContainer = document.getElementById("bossDifficultyButtonContainer")


const eventDetailsContainers = [
  document.getElementById("bossesEventDetails"),
  document.getElementById("racesEventDetails")
]
const removeTheseDetailContainers = [
  Array.from(document.querySelectorAll(".enabledHeroes")),
  Array.from(document.querySelectorAll(".specialModsContainer")),
  Array.from(document.querySelectorAll(".enabledPrimary")),
  Array.from(document.querySelectorAll(".enabledMilitary")),
  Array.from(document.querySelectorAll(".enabledMagic")),
  Array.from(document.querySelectorAll(".enabledSupport"))
]
const leaderboardContainers = Array.from(document.querySelectorAll(".leaderboardContainer"))

let isRaceGenerated = false; 
let isBossGenerated = false;
let isCTGenerated = false;
let eventName;
let raceOverview;
let raceMetadata;
let raceLB;
let bossOverview;
let bossStandardMetadata;
let bossEliteMetadata;
let bossStandardLB1P;
let bossEliteLB1P;
let ctOverview;
let ctTeamLB;
let ctPlayerLB;
let urlParams = new URLSearchParams(window.location.search);
let urlEvent;
let urlID;
let urlType;
let urlDifficulty;
let urlName;
let id;

class Race {
  constructor(name, timestamp) {
    this.name = name
    this.timestamp = timestamp
  }
  setName(v) {
    this.name = v
  }
  getName() {
    return this.name
  }
}
class RaceMetadata extends Race {
  constructor(name, timestamp, metadata) {
    super(name, timestamp)
    this.metadata = metadata
  }
  getTimestamp() {
    return this.timestamp
  }
  getMetadata() {
    return this.metadata
  }
}
class RaceLeaderboard extends Race {
  constructor(name, timestamp, leaderboard) {
    super(name, timestamp)
    this.leaderboard = leaderboard
  }
  getTimestamp() {
    return this.timestamp
  }
  getLeaderboard() {
    return this.leaderboard
  }
}
class Boss {
  constructor(name, timestamp) {
    this.name = name
    this.timestamp = timestamp
  }
  setName(v) {
    this.name = v
  }
  getName() {
    return this.name
  }
}
class BossMetadata extends Boss {
  constructor(name, timestamp, metadata) {
    super(name, timestamp)
    this.metadata = metadata
  }
  getTimestamp() {
    return this.timestamp
  }
  getMetadata() {
    return this.metadata
  }
}
class BossLeaderboard extends Boss {
  constructor(name, timestamp, leaderboard) {
    super(name, timestamp)
    this.leaderboard = leaderboard
  }
  getTimestamp() {
    return this.timestamp
  }
  getLeaderboard() {
    return this.leaderboard
  }
}
class CT {
  constructor(timestamp) {
    this.timestamp = timestamp
  }
}
class CTLeaderboard extends CT {
  constructor(timestamp, leaderboard) {
    super(timestamp)
    this.leaderboard = leaderboard
  }
  getTimestamp() {
    return this.timestamp
  }
  getLeaderboard() {
    return this.leaderboard
  }
}

function catchError(error) {
  if (error === "Failed to fetch" || error === "Network request failed") {
    alert("Check your internet connection, then try again.");
  } else {
    alert(
      `An error has occured:\n${error.message}`
    );
  }
}

/*** LAYER 1: EVENT OVERVIEW ***/
async function getBossData() {
  if (bossOverview == null) {
    try {
      const bossResponse = await fetch("https://data.ninjakiwi.com/btd6/bosses")
      if (bossResponse.ok) {
        bossOverview = await bossResponse.json()
      } else {
        throw new Error("An error occured while gathering Boss data.")
      }
    } catch(error) {
      console.log(error.message)
    }
  }
}
async function getRaceData() {
  if (raceOverview == null) {
    try {
      const raceResponse = await fetch("https://data.ninjakiwi.com/btd6/races")
      if (raceResponse.ok) {
        raceOverview = await raceResponse.json()
      } else {
        throw new Error("An error occured while gathering Race data.")
      }
    } catch(error) {
      console.log(error.message)
    }
  }
}
async function getCTData() {
  if (ctOverview == null) {
    try {
      const ctResponse = await fetch("https://data.ninjakiwi.com/btd6/ct")
      if (ctResponse.ok) {
        ctOverview = await ctResponse.json()
      } else {
        throw new Error("An error occured while gathering Contested Territory data.")
      }
    } catch(error) {
      console.log(error.message)
    }
  }
}

function generateRaceList() {
  if (raceOverview != null && isRaceGenerated == false) {
    for (const race of raceOverview["body"]) {
      const status = determineStatus(race["start"], race["end"])
      const timestamp = generateTimestamp(race, status)
      const container = document.createElement("div")
      container.className = `eventOverviewContainer raceOverviewContainer ${status}`
      let raceHTML = `
        <h3 class="eventOverviewTitle">${race["name"]}</h3>
        <p class="status raceStatus">${status}</p>
      `
      if (race["totalScores"] > 0) {
        raceHTML += `
        <p class="totalScores raceTotalScores"><b>${race["totalScores"]}</b> submissions</p>
        <p class="overviewTimestamp">${timestamp}</p>
        <div class="overviewNavButtonContainer">
          <span class="material-symbols-outlined overviewNavButton goToRaceDetails">info</span>
          <span class="material-symbols-outlined overviewNavButton goToRaceLeaderboard">trophy</span>
        </div>
        `
      } else {
        raceHTML += `
        <p class="overviewTimestamp">${timestamp}</p>
        <div class="overviewNavButtonContainer">
          <span class="material-symbols-outlined overviewNavButton goToRaceDetails">info</span>
        </div>
        `
      }
      container.innerHTML = raceHTML
      container.querySelector(".goToRaceDetails").onclick = () => {
        swapToEventDetails(race["id"], "races", race["name"], timestamp, race["metadata"])
      }
      if (container.querySelector(".goToRaceLeaderboard")) {
        container.querySelector(".goToRaceLeaderboard").onclick = () => {
          swapToEventLeaderboard(race["id"], "races", race["name"], timestamp, race["leaderboard"])
        }
      }
      raceArchiveContainer.appendChild(container)
    }
    isRaceGenerated = true
  }
}
function generateBossList() {
  if (bossOverview != null && isBossGenerated == false) {
    for (const boss of bossOverview["body"]) {
      const status = determineStatus(boss["start"], boss["end"])
      const timestamp = generateTimestamp(boss, status)
      const name = boss["name"].replace(/([a-zA-Z])(\d)/g,"$1 $2")
      let scoringTypeReadable
      if (boss["scoringType"] == "GameTime") scoringTypeReadable = "Timed"
      else if (boss["scoringType"] == "LeastTiers") scoringTypeReadable = "Least Tiers"
      else scoringTypeReadable = "Least Cash"

      const container = document.createElement("div")
      container.className = `eventOverviewContainer bossOverviewContainer ${status}`
      let bossHTML = `
        <h3 class="eventOverviewTitle">${name}</h3>
        <p class="status bossStatus">${status}&nbsp;&nbsp;|&nbsp;&nbsp;${scoringTypeReadable}</p>
      ` // the crazy regex just adds a space before the number in the name, thx phind.com <3
      if (boss["totalScores_standard"] > 0) {
        bossHTML += `
        <div class="totalScoresContainer">
          <div class="eventScoresContainer">
            <h4 class="totalScoresHeader">Normal</h4>
            <p class="totalScores bossTotalScores"><b>${boss["totalScores_standard"]}</b> submissions</p>
          </div>
          <div class="eventScoresContainer">
            <h4 class="totalScoresHeader">Elite</h4>
            <p class="totalScores bossTotalScores"><b>${boss["totalScores_elite"]}</b> submissions</p>
          </div>
        </div>
        <p class="overviewTimestamp">${timestamp}</p>
        <div class="overviewNavButtonContainer">
          <span class="material-symbols-outlined overviewNavButton goToBossDetails">info</span>
          <span class="material-symbols-outlined overviewNavButton goToBossLeaderboard">trophy</span>
        </div>
        `
      } else {
        bossHTML += `
        <p class="overviewTimestamp">${timestamp}</p>
        <div class="overviewNavButtonContainer">
          <span class="material-symbols-outlined overviewNavButton goToBossDetails">info</span>
        </div>
        `
      }
      container.innerHTML = bossHTML
      container.querySelector(".goToBossDetails").onclick = () => {
        swapToEventDetails(boss["id"], "bosses", name, timestamp, boss["metadataStandard"], boss["metadataElite"])
      }
      if (container.querySelector(".goToBossLeaderboard")) {
        container.querySelector(".goToBossLeaderboard").onclick = () => {
          swapToEventLeaderboard(boss["id"], "bosses", name, timestamp, boss["leaderboard_standard_players_1"], boss["leaderboard_elite_players_1"])
        }
      }
      bossArchiveContainer.appendChild(container)
      
    }
    isBossGenerated = true
  }
}
function generateCTList() {
  if (ctOverview != null && isCTGenerated == false) {
    for (const ct of ctOverview["body"]) {
      const status = determineStatus(ct["start"], ct["end"])
      const timestamp = generateTimestamp(ct, status)
      const container = document.createElement("div")
      container.className = `eventOverviewContainer ctOverviewContainer ${status}`
      let ctHTML = `
        <h3 class="eventOverviewTitle">${timestamp}</h3>
        <p class="status ctStatus">${status}</p>
      `
      if (ct["totalScores_player"] > 0) {
        ctHTML += `
        <div class="totalScoresContainer">
          <div class="eventScoresContainer">
            <h4 class="totalScoresHeader">Players</h4>
            <p class="totalScores bossTotalScores"><b>${ct["totalScores_player"]}</b> submissions</p>
          </div>
          <div class="eventScoresContainer">
            <h4 class="totalScoresHeader">Teams</h4>
            <p class="totalScores bossTotalScores"><b>${ct["totalScores_team"]}</b> submissions</p>
          </div>
        </div>
        <div class="overviewNavButtonContainer">
          <span class="material-symbols-outlined overviewNavButton goToCTLeaderboard">trophy</span>
        </div>
        `
      } 
      container.innerHTML = ctHTML
      if (container.querySelector(".goToCTLeaderboard")) {
        container.querySelector(".goToCTLeaderboard").onclick = () => {
          swapToEventLeaderboard(ct["id"], "ct", null, timestamp, ct["leaderboard_team"], ct["leaderboard_player"])
        }
      }
      ctArchiveContainer.appendChild(container)
    }
    isCTGenerated = true
  }
}

/*** LAYER 2: METADATA AND LEADERBOARDS, THIS IS WHERE SHIT GETS REAL ***/

/** STEP 1: GETTERS */
// url2 and url3 are optional: url2 for elite boss or medium odyssey, url3 for hard odyssey
async function getMetadata(id, event, name, timestamp, url, url2 = null, url3 = null) {
  try {
    const response1 = await fetch(url)
    const response2 = url2 ? await fetch(url2) : null
    const response3 = url3 ? await fetch(url3) : null
    if (!response1.ok || (url2 && !response2.ok) || (url3 && !response3.ok)) {
      throw new Error(response1.status)
    }
    if (event == "bosses") {
      if (!response2) throw new Error("An unexpected error occured!")
      bossStandardMetadata = new BossMetadata(name, timestamp, await response1.json())
      bossEliteMetadata = new BossMetadata(name, timestamp, await response2.json())
    } else {
      raceMetadata = new RaceMetadata(name, timestamp, await response1.json())
    }
  } catch(error) {
    catchError(error)
  }
}
// url2 is optional: either elite boss leaderboard or global player leaderboard for CT
async function getLeaderboard(id, event, name, timestamp, url, url2 = null) {
  try {
    const response1 = await fetch(url)
    const response2 = url2 ? await fetch(url2) : null
    if (!response1.ok || (url2 && !response2.ok)) {
      throw new Error(response1.status)
    }
    if (event == "bosses") {
      if (!response2) throw new Error("An unexpected error occured!")
      bossStandardLB1P = new BossLeaderboard(name, timestamp, await response1.json())
      bossEliteLB1P = new BossLeaderboard(name, timestamp, await response2.json())
    } else if (event == "ct") {
      if (!response2) throw new Error("An unexpected error occured!")
      ctTeamLB = new CTLeaderboard(timestamp, await response1.json())
      ctPlayerLB = new CTLeaderboard(timestamp, await response2.json())
    } else {
      raceLB = new RaceLeaderboard(name, timestamp, await response1.json())
    };
  } catch(error) {
    catchError(error)
  }
}

/** STEP 2: SETTERS **/
// ughhhhh kill me again
// difficulty is optional: only applies to bosses and odysseys, and will always be null 
// except for calling itself within this function
function displayDetails(event, difficulty = "normal") {
  for (const please of removeTheseDetailContainers) {
    for (const bruh of please) {
      for (const thisIsSOSTUPID of Array.from(bruh.querySelectorAll("*"))) {
        thisIsSOSTUPID.remove()
      }
    }
  }
  const container = document.querySelector(`#${event}EventDetails`)
  let metadata
  let name
  let timestamp
  if (event == "bosses") {
    if (difficulty == "elite") metadata = bossEliteMetadata.getMetadata()["body"]
    else metadata = bossStandardMetadata.getMetadata()["body"]
    name = bossStandardMetadata.getName()
    timestamp = bossStandardMetadata.getTimestamp()
  } else {
    metadata = raceMetadata.getMetadata()["body"]
    name = raceMetadata.getName()
    timestamp = raceMetadata.getTimestamp()
  }
  if (event == "bosses") addDifficultyButtons("bosses", name, container.querySelector(".bossDifficultyButtonContainer"), "metadata", difficulty)
  container.querySelector(".detailsHeader").innerText = name
  container.querySelector(".mapImage").src = metadata["mapURL"]
  container.querySelector(".mapImage").alt = `Map: ${metadata["map"].replace(/([A-Z])/g, " $1").trim()}`
  container.querySelector(".startingCash").innerText = `${metadata["startingCash"]}`;
  container.querySelector(".lives").innerText = `${metadata["lives"]}`;
  container.querySelector(".rounds").innerText = `${metadata["startRound"]} to ${metadata["endRound"]}`;
  let mode;
  switch (metadata["mode"]) {
    case "DoubleMoabHealth": mode = "Double HP MOABs"; break;
    case "AlternateBloonsRounds": mode = "Alternate Bloons Rounds"; break;
    case "HalfCash": mode = "Half Cash"; break;
    default: mode = metadata["mode"];
  }
  container.querySelector(".modeHeader").innerText = metadata["difficulty"]
  container.querySelector(".mode").innerText = mode
  const enabledPrimary = container.querySelector(".enabledPrimary")
  const enabledMilitary = container.querySelector(".enabledMilitary")
  const enabledMagic = container.querySelector(".enabledMagic")
  const enabledSupport = container.querySelector('.enabledSupport')
  appendElement(enabledPrimary, "Primary", "")
  appendElement(enabledMilitary, "Military", "")
  appendElement(enabledMagic, "Magic", "")
  appendElement(enabledSupport, "Support", "")
  determineSpecialMods(metadata, container.querySelector(".specialModsContainer"))
  for (const tower of metadata["_towers"]) {
    if (tower["isHero"] && tower["max"] != 0) parseHeroes(tower, container.querySelector('.enabledHeroes'))
    else if (tower["max"] != 0) parseTowerUpgrades(tower, container.querySelector(".enabledTowersContainer"))
  }
  if (!container.querySelector(".enabledHeroes").hasChildNodes()) {
    container.querySelector(".enabledHeroes").innerHTML = `<h3 class="headerHeroDisplay noHeroDisplay">No Heroes</h3>`
  }
  if (enabledPrimary.childElementCount == 1) {
    appendElement(enabledPrimary, "None", "")
  }
  if (enabledMilitary.childElementCount == 1) {
    appendElement(enabledMilitary, "None", "")
  }
  if (enabledMagic.childElementCount == 1) {
    appendElement(enabledMagic, "None", "")
  }
  if (enabledSupport.childElementCount == 1) {
    appendElement(enabledSupport, "None", "")
  }
  editURL("difficulty", difficulty)
}
function parseTowerUpgrades(tower, container) {
  const enabledPrimary = container.querySelector(".enabledPrimary")
  const enabledMilitary = container.querySelector(".enabledMilitary")
  const enabledMagic = container.querySelector(".enabledMagic")
  const enabledSupport = container.querySelector(".enabledSupport")
  let enabledUpgrades;
  let badName = tower["tower"];
  let name = badName.replace(/([A-Z])/g, " $1").trim(); // magic code by AI that adds fairy dust and magic sprinkles
  let path1Tiers = 5;
  let path2Tiers = 5;
  let path3Tiers = 5;
  path1Tiers -= tower["path1NumBlockedTiers"];
  path2Tiers -= tower["path2NumBlockedTiers"];
  path3Tiers -= tower["path3NumBlockedTiers"];
  if (path1Tiers + path2Tiers + path3Tiers >= 15) {
    enabledUpgrades = ``;
  } else {
    enabledUpgrades = `(${path1Tiers}-${path2Tiers}-${path3Tiers})`;
  }
  const towerInfoDisplay = document.createElement("p");
  towerInfoDisplay.classList.add("towerInfoDisplay");
  if (tower["max"] > 0) {
    towerInfoDisplay.innerText = `${tower["max"]}x ${name}\n${enabledUpgrades}`;
  } else if (tower["max"] == -1) {
    towerInfoDisplay.innerText = `${name}\n${enabledUpgrades}`;
  }
  if (primaryTowers.includes(tower["tower"])) {
    enabledPrimary.appendChild(towerInfoDisplay);
  } else if (militaryTowers.includes(tower["tower"])) {
    enabledMilitary.appendChild(towerInfoDisplay);
  } else if (magicTowers.includes(tower["tower"])) {
    enabledMagic.appendChild(towerInfoDisplay);
  } else if (supportTowers.includes(tower["tower"])) {
    enabledSupport.appendChild(towerInfoDisplay);
  }
}
function parseHeroes(hero, container) {
  if (hero["tower"] != "ChosenPrimaryHero") {
    if (hero["max"] != 0) {
      const heroIcon = document.createElement("img");
      heroIcon.src = `assets/${hero["tower"]}.png`
      heroIcon.alt = hero["tower"]
      heroIcon.classList.add("heroIcon");
      container.appendChild(heroIcon);
    }
  } else {
    const heroInfoDisplay = document.createElement("h3");
    heroInfoDisplay.innerText = `Any Hero`;
    heroInfoDisplay.className = "headerHeroDisplay anyHeroDisplay"
    container.appendChild(heroInfoDisplay);
  }
}
function determineSpecialMods(metadata, specialModsContainer) {
  if (metadata["maxTowers"] != 9999 && metadata["maxTowers"] != 0) {
    appendElement(specialModsContainer, `Max Towers`, `${metadata["maxTowers"]}`);
  }
  if (metadata["maxParagons"] !== 10) {
      appendElement(specialModsContainer, `Max Paragons`, `${metadata["maxParagons"]}`);
  }
  if (metadata["abilityCooldownReductionMultiplier"] !== 1) {
      appendElement(specialModsContainer, `Ability Cooldowns`, `${(metadata["abilityCooldownReductionMultiplier"] * 100).toLocaleString()}% duration`);
  }
  if (metadata["removeableCostMultiplier"] !== 1) {
      appendElement(specialModsContainer, `Obstacle Removal`, `${(metadata["removeableCostMultiplier"] * 100).toLocaleString()}% cost`);
  }
  if (metadata["disableMK"] == true) {
    appendElement(specialModsContainer, `No Monkey Knowledge`, ``);
  }
  if (metadata["disableSelling"] == true) {
    appendElement(specialModsContainer, `No Selling`, ``);
  }
  const bloonMods = metadata["_bloonModifiers"];
  if (bloonMods["allCamo"] == true) {
    appendElement(specialModsContainer, `All Camo`, ``);
  }
  if (bloonMods["allRegen"] == true) {
    appendElement(specialModsContainer, `All Regrow`, ``);
  }
  if (bloonMods["speedMultiplier"] !== 1) {
    appendElement(
      specialModsContainer,
      `Bloon Speed`,
      `${(bloonMods["speedMultiplier"] * 100).toLocaleString()}%`
    );
  }
  if (bloonMods["moabSpeedMultiplier"] !== 1) {
    appendElement(specialModsContainer,`MOAB Speed`,`${(bloonMods["moabSpeedMultiplier"] * 100).toLocaleString()}%`);
  }
  if (bloonMods["bossSpeedMultiplier"] !== 1) {
    appendElement(specialModsContainer,`Boss Speed`,`${(bloonMods["bossSpeedMultiplier"] * 100).toLocaleString()}%`);
  }
  if (bloonMods["regrowRateMultiplier"] !== 1) {
    appendElement(specialModsContainer,`Regrow Rate`,`${(bloonMods["regrowRateMultiplier"] * 100).toLocaleString()}%`
    );
  }
  const hpMods = bloonMods["healthMultipliers"];
  if (hpMods["bloons"] !== 1) {
    appendElement(specialModsContainer, `Ceramic HP`, `${(hpMods["bloons"] * 100).toLocaleString()}%`);
  }
  if (hpMods["moabs"] !== 1) {
    appendElement(specialModsContainer, `MOAB HP`, `${(hpMods["moabs"] * 100).toLocaleString()}%`);
  }
  if (hpMods["boss"] !== 1) {
    appendElement(specialModsContainer, `Boss HP`, `${(hpMods["boss"] * 100).toLocaleString()}%`);
  }
  if (metadata["roundSets"].length > 1) {
    appendElement(specialModsContainer, `Custom Rounds`, ``);
  }
}
function appendElement(parent, title, value) {
  const element = document.createElement("p");
  element.innerHTML = `<b>${title}</b><br>${value}`;
  parent.appendChild(element);
}

// LEADERBOARD TIME
/* 
Hark! Behold, mine eyes hath glimpsed the beacon, the radiant luminescence amidst the harrowing labyrinthine 
travail! O, the heart swelleth with rapture, as though emerging from the stygian depths, to bask in the effulgent
embrace of triumphant respite, whence erstwhile darkness did reign supreme. Thus, with fervent elation, doth my 
spirit soar, reveling in the celestial aureole that heralds the cessation of yon relentless tribulation!
*/
// already said this but whoever wrote this code is a dumbass so that guy probably needs a refresher
// difficulty is optional: only applies to bosses and odysseys, and will always be null 
// unless coming from this function
function displayLeaderboard(event, difficulty = "normal") {
  window.scrollTo({top: 0})
  for (const ye of leaderboardContainers) {
    for (const thisIsSOSTUPID of Array.from(ye.querySelectorAll("*"))) {
      thisIsSOSTUPID.remove()
    }
  }
  let leaderboard
  let scoringType
  let name
  const container = document.querySelector(`.${event}LeaderboardContainer`)
  if (event == "bosses") {
    if (difficulty == "elite") {
      leaderboard = bossEliteLB1P.getLeaderboard()
      name = bossEliteLB1P.getName()
      timestamp = bossEliteLB1P.getTimestamp()
    } else {
      leaderboard = bossStandardLB1P.getLeaderboard()
      name = bossStandardLB1P.getName()
      timestamp = bossStandardLB1P.getTimestamp()
    }
    if (leaderboard["success"]) scoringType = leaderboard["body"][0]["scoreParts"][0]["name"]
    else scoringType = null
  } else { /* event is hopefully "races" */
    leaderboard = raceLB.getLeaderboard()
    scoringType = "Game Time"
    name = raceLB.getName()
    timestamp = raceLB.getTimestamp()
  }
  addDifficultyButtons("bosses", name, document.getElementById("bossDifficultyButtonContainerLB"), "leaderboard", difficulty)
  if (!leaderboard["success"]) {
    appendElement(container, "No Scores Available", "")
  } else {
    let formattedScoringType = formatScoringType(scoringType)
    if (event == "bosses") {
      document.getElementById("bossDifficultyButtonContainerLB").style.display = "flex"
    }
    for (let i = 0; i < leaderboard["body"].length; i++) {
      const player = leaderboard["body"][i]
      let score = formatLBScore(player["score"], scoringType)
      const playerDiv = document.createElement("div")
      playerDiv.classList.add("playerDiv")
      let playerHTML = `
      <div class="placementAndNameWrapper">
        <h2 class="placementNumber">${i + 1}</h2>
        <div class="playerTitleContainer">
          <span class="material-symbols-outlined goToProfile">person</span>
          <h3 class="playerName">${player["displayName"]}</h3>
        </div>
      </div>
      <div class="allPlayerScoresContainer">
        <div class="playerScoreContainer mainScore">
          <h4 class="scoringType">${formattedScoringType}</h4>
          <p class="playerScore">${score}</p>
        </div>`
      // i intentionally at 1 to skip the first score part which is already in the html
      for (let i = 1; i < player["scoreParts"].length; i++) {
        const scoreObj = player["scoreParts"][i]
        if (scoreObj["name"] == "Time after event start") break

        const formattedSubscore = formatLBScore(scoreObj["score"], scoreObj["name"])
        const formattedSubscoringType = formatScoringType(scoreObj["name"])
        playerHTML += `
        <div class="playerScoreContainer">
          <h4 class="scoringType">${formattedSubscoringType}</h4>
          <p class="playerScore">${formattedSubscore}</p>
        </div>
        `
      }
      playerHTML += `</div>`
      playerDiv.innerHTML = playerHTML
      playerDiv.querySelector(".goToProfile").onclick = () => {
        let urlParts = player["profile"].split("/")
        let userID = urlParts[urlParts.length - 1]
        window.open(`https://nitjus7.github.io/BTD6-Central/community.html?type=player&id=${userID}`, `_self`)
      }
      container.appendChild(playerDiv)
    }
  }
  editURL("difficulty", difficulty)
}
function formatLBScore(score, scoreType){
  if (scoreType == "Game Time") {
    let hours = Math.floor(score / (1000 * 60 * 60))
    let minutes = Math.floor((score % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((score % (1000 * 60)) / 1000)
    let remainingMilliseconds = score % 1000
    let formattedTime = ""
    if (hours > 0) {
      formattedTime += `${hours}:`
    }
    formattedTime += `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}.${remainingMilliseconds}`
    return formattedTime
  } else if (scoreType == "Tiers") {
      return `${score}`; 
  } else {
    return `$${score.toLocaleString()}`
  }
}
function padTo2Digits(num) {
  // magic function by AI that adds 3 magical wishes granted by a powerful genie to the parameter passed in
  return num.toString().padStart(2, "0");
}
function formatScoringType(type) {
  if (type == "Game Time") return "Time"
  else if (type == "Tiers") return "Tiers"
  else return "Cash"
}
 
/**************************************************/
/**************************************************/
/**************************************************/
/**************************************************/
/**************************************************/

function addDifficultyButtons(event, name, container, type, difficulty) {
  if (event == "bosses") {
    container.style.display = "block"
    const norm = container.querySelector(".difficultyImageStandard")
    const L = container.querySelector(".difficultyImageElite")
    if (name.includes("Bloonarius")) {
      norm.src = "https://i.ibb.co/2hzPr5t/bloonarius.png";
      L.src = "https://i.ibb.co/HnhcNz9/elite-Bloonarius.png";
    } else if (name.includes("Lych")) {
      norm.src = "https://i.ibb.co/w4t4dX8/lych.png";
      L.src = "https://i.ibb.co/2h93hcJ/elite-Lych.png";
    } else if (name.includes("Vortex")) {
      norm.src = "https://i.ibb.co/w4Ng4nd/vortex.png";
      L.src = "https://i.ibb.co/j44bYsB/elite-Vortex.png";
    } else if (name.includes("Dreadbloon")) {
      norm.src = "https://i.ibb.co/hVF5PnP/dreadbloon.webp";
      L.src = "https://i.ibb.co/BgLNDHg/elite-Dreadbloon.webp";
    } else if (name.includes("Phayze")) {
      norm.src = "https://i.ibb.co/3dGxcC2/phayze.png";
      L.src = "https://i.ibb.co/JnjzyLQ/elite-Phayze.png";
    }     
    if (difficulty == "normal") {
      norm.classList.remove("inactive")
      L.classList.add("inactive")
    } else {
      norm.classList.add("inactive")
      L.classList.remove("inactive")
    }
    if (norm.classList.contains("inactive")) {
      norm.onclick = () => {
        norm.classList.remove("inactive")
        L.classList.add("inactive")
        if (type == "leaderboard") displayLeaderboard(event, "normal")
        else displayDetails(event, "normal")
      }
    } else {
      L.onclick = () => {
        L.classList.remove("inactive")
        norm.classList.add("inactive")
        if (type == "leaderboard") displayLeaderboard(event, "elite")
        else displayDetails(event, "elite")
      }
    }
  }
}

function determineStatus(startDate, endDate) {
  let currentDate = Date.now();
  if (currentDate > endDate) {
    return "Ended";
  } else if (currentDate < startDate) {
    return "Not Started Yet";
  } else {
    return "Live";
  }
}
function generateTimestamp(data, status) {
  const dateFormatting = { month: "short", day: "numeric", year: "numeric" };
  const startDate = new Date(data["start"]);
  const endDate = new Date(data["end"]);
  if (status == "LIVE") {
    return calculateTimeRemaining(endDate)
  } else {
    return `${startDate.toLocaleDateString([], dateFormatting)} to ${endDate.toLocaleDateString([], dateFormatting)}`
  }
}
function calculateTimeRemaining(end) {
  // thx phind.com <3
  const currentDate = new Date();
  const timeDifference = end.getTime() - currentDate.getTime();
  let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  return `Remaining Time: ${days}d, ${hours}h, ${minutes}m`;
}


function editURL(name, value) {
  if (value != null) { 
    urlParams.set(name, value) 
    history.replaceState(null, null, "?" + urlParams.toString())
  } else { 
    urlParams.delete(name) 
    window.history.replaceState(null, document.title, window.location.pathname)
  }
}

function enableLoading() {
  eventsPopupOverlay.style.display = "block"
  document.body.classList.add("no-scroll")
}
function disableLoading() {
  eventsPopupOverlay.style.display = "none"
  document.body.classList.remove("no-scroll")
}
function showPopup(title, content) {
  popupTitle.innerText = title
  popupContentContainer.innerHTML = content
  popupContainer.showModal()
  popupContainer.classList.add("open")
  document.body.classList.add("no-scroll")
}
document.querySelector(".closePopupButton").onclick = () => {
  popupContainer.classList.remove("open")
  document.body.classList.remove("no-scroll")
  setTimeout(() => {
    popupContainer.close();
  }, 300);
}

async function swapToEventOverview(event) {
  enableLoading()
  if (event == "races") {
    if (raceOverview == null) await getRaceData()
    if (!isRaceGenerated) generateRaceList()
    eventTitle.innerText = "Races"
    raceArchiveContainer.style.display = "flex"
    editURL("event", "races")
  } else if (event == "bosses") {
    if (bossOverview == null) await getBossData()
    if (!isBossGenerated) generateBossList()
    eventTitle.innerText = "Bosses"
    bossArchiveContainer.style.display = "flex"
    editURL("event", "bosses")
  } else {
    if (ctOverview == null) await getCTData()
    if (!isCTGenerated) generateCTList()
    eventTitle.innerText = "Contested Territory"
    ctArchiveContainer.style.display = "flex"
    editURL("event", "ct")
  }
  eventPickContainer.style.display = "none"
  backButton.style.display = "block"
  disableLoading()
}
// url2 and url3 are optional: url2 for elite boss or medium odyssey, url3 for hard odyssey
async function swapToEventDetails(id, event, name, timestamp, url, url2 = null, url3 = null, difficulty = null) {
  enableLoading()
  eventTitle.innerText = ""
  await getMetadata(id, event, name, timestamp, url, url2, url3)
  raceArchiveContainer.style.display = "none"
  bossArchiveContainer.style.display = "none"
  ctArchiveContainer.style.display = "none"
  if (!difficulty) displayDetails(event)
  else displayDetails(event, difficulty)
  document.getElementById(`${event}EventDetails`).style.display = "block"
  editURL("type", "metadata")
  editURL("name", name)
  editURL("id", id)
  disableLoading()
}
// url2 is optional: either elite boss or player CT
async function swapToEventLeaderboard(id, event, name, timestamp, url, url2 = null, difficulty = null) {
  enableLoading()
  eventTitle.innerText = ""
  await getLeaderboard(id, event, name, timestamp, url, url2)
  document.querySelector(".leaderboardTitle").innerText = name
  raceArchiveContainer.style.display = "none"
  bossArchiveContainer.style.display = "none"
  ctArchiveContainer.style.display = "none"
  if (!difficulty) displayLeaderboard(event)
  else displayLeaderboard(event, difficulty)
  editURL("type", "leaderboard")
  editURL("id", id)
  editURL("name", name)
  disableLoading()
}


function thanosSnap() {
  eventTitle.innerText = ""
  document.querySelector(".leaderboardTitle").innerText = ""
  raceArchiveContainer.style.display = "none"
  bossArchiveContainer.style.display = "none"
  ctArchiveContainer.style.display = "none"
  eventPickContainer.style.display = "flex"
  backButton.style.display = "none"
  for (const why of eventDetailsContainers) {
    why.style.display = "none"
  }
  for (const please of removeTheseDetailContainers) {
    for (const bruh of please) {
      for (const thisIsSOSTUPID of Array.from(bruh.querySelectorAll("*"))) {
        thisIsSOSTUPID.remove()
      }
    }
  }
  for (const ye of leaderboardContainers) {
    for (const thisIsSOSTUPID of Array.from(ye.querySelectorAll("*"))) {
      thisIsSOSTUPID.remove()
    }
  }
  document.querySelector(".difficultyImageStandard").classList.remove("inactive")
  document.querySelector(".difficultyImageElite").classList.add("inactive")
  const scopeItDown = document.getElementById("bossDifficultyButtonContainerLB")
  scopeItDown.querySelector(".difficultyImageStandard").classList.remove("inactive")
  scopeItDown.querySelector(".difficultyImageElite").classList.add("inactive")
  document.getElementById("bossDifficultyButtonContainerLB").style.display = "none"
  editURL("event", null)
  editURL("type", null)
  editURL("id", null)
  editURL("difficulty", null)
  editURL("name", null)
}

raceEventButton.onclick = () => {
  swapToEventOverview("races")
}
bossEventButton.onclick = () => {
  swapToEventOverview("bosses")
}
/* ctEventButton.onclick = () => {
  swapToEventOverview("ct")
} */

backButton.onclick = () => {
  thanosSnap()
}
async function main() {
  window.addEventListener('offline', () => alert("NOTICE: You must be connected to the internet to browse BTD6 events.\nIt seems that your internet connection has been lost."))
  urlEvent = urlParams.get("event")
  urlName = urlParams.get("name")
  urlID = urlParams.get("id")
  urlType = urlParams.get("type")
  urlDifficulty = urlParams.get("difficulty")
  if (urlEvent) {
    backButton.style.display = "block"
    eventPickContainer.style.display = "none"
    if (!urlType) {
      swapToEventOverview(urlEvent)
    } else if (urlEvent == "bosses"){
      if (urlType == "metadata" && urlID && urlDifficulty && urlName) 
        swapToEventDetails(urlID, urlEvent, urlName, "", `https://data.ninjakiwi.com/btd6/bosses/${urlID}/metadata/standard`, `https://data.ninjakiwi.com/btd6/bosses/${urlID}/metadata/elite`, null, urlDifficulty)
      else if (urlType == "leaderboard" && urlID && urlDifficulty && urlName) 
        swapToEventLeaderboard(urlID, urlEvent, urlName, "", `https://data.ninjakiwi.com/btd6/bosses/${urlID}/leaderboard/standard/1`, `https://data.ninjakiwi.com/btd6/bosses/${urlID}/leaderboard/elite/1`, urlDifficulty)
    } else if (urlEvent == "races") {
      if (urlType == "metadata" && urlID && urlName) 
        swapToEventDetails(urlID, urlEvent, urlName, "", `https://data.ninjakiwi.com/btd6/races/${urlID}/metadata`)
      else if (urlType == "leaderboard" && urlID && urlName) 
        swapToEventLeaderboard(urlID, urlEvent, urlName, "", `https://data.ninjakiwi.com/btd6/races/${urlID}/leaderboard`)
    }
  } else {
    thanosSnap()
  }
}
main()