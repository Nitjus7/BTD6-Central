const eventTitle = document.getElementById("eventTitle");
const raceEventButton = document.getElementById("raceEventButton");
const bossEventButton = document.getElementById("bossEventButton");
const eventPickContainer = document.getElementById("eventPickContainer");
const raceArchiveContainer = document.getElementById("raceArchiveContainer");
const bossArchiveContainer = document.getElementById("bossArchiveContainer");
const difficultyButtonContainer = document.getElementById(
  "difficultyButtonContainer"
);
const backButton = document.querySelector(
  ".takeMeHomeContainer"
);
const raceTitle = document.getElementById("raceTitle");
const eventDetails = document.getElementById("eventDetails");
const specialModsContainer = document.getElementById("specialModsContainer");
const enabledTowersContainer = document.getElementById(
  "enabledTowersContainer"
);
const enabledPrimary = document.getElementById("enabledPrimary");
const enabledMilitary = document.getElementById("enabledMilitary");
const enabledMagic = document.getElementById("enabledMagic");
const enabledSupport = document.getElementById("enabledSupport");
const enabledHeroes = document.getElementById("enabledHeroes");
const eventDates = document.getElementById("eventDates");
const mapContainer = document.getElementById("mapContainer");
const mapImage = document.getElementById("mapImage");
const bossImage = document.getElementById("bossImage");
const bossImageContainer = document.getElementById("bossImageContainer");

const leaderboardContainer = document.getElementById("leaderboardContainer");
const swapLBButtonContainer = document.getElementById("swapLBButtonContainer");
const leaderboardTitle = document.getElementById("leaderboardTitle");

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
const eventElems = [
  eventTitle,
  eventDetails,
  leaderboardTitle,
  leaderboardContainer,
  swapLBButtonContainer,
];
const dataContainers = [
  mapContainer,
  bossImageContainer,
  enabledPrimary,
  enabledMilitary,
  enabledMagic,
  enabledSupport,
  enabledHeroes,
  specialModsContainer,
  leaderboardContainer,
  difficultyButtonContainer,
  swapLBButtonContainer,
];

const popupContainer = document.querySelector(".popupContainer")
const popupTitle = document.querySelector(".popupTitle")
const popupContentContainer = document.querySelector(".popupContentContainer")
const statsPopupOverlay = document.querySelector(".popupOverlay")

let eventName;
let raceData;
let raceMetadata;
let raceLB;
let bossData;
let bossStandardMetadata;
let bossEliteMetadata;
let bossStandardLB1P;
let bossEliteLB1P;
let urlParams = new URLSearchParams(window.location.search);
let urlEvent;
let urlID;
let urlType;
let urlDifficulty;
let id;

// pass in the error message
function catchError(error) {
  if (error == "TypeError: Failed to fetch") {
    alert("Check your internet connection, then try again.");
  } else {
    alert(
      `An Error Has Occured:\n${error}\nPlease report this to the BTD6 Central Discord Server.`
    );
  }
}

// fetches the data from the nk api
async function getRaceData() {
  if (raceData == null) {
    try {
      raceData = await (
        await fetch(`https://data.ninjakiwi.com/btd6/races`)
      ).json();
      raceData = raceData["body"];
      generateRaces();
    } catch (error) {
      catchError(error);
    }
  }
}

async function getBossData() {
  if (bossData == null) {
    try {
      bossData = await (await fetch(`https://data.ninjakiwi.com/btd6/bosses`)).json();
      bossData = bossData["body"];
      generateBosses();
    } catch (error) {
      catchError(error);
    }
  }
}

// generates the title cards with the event names as the text
// and adds event listeners to each element
function generateRaces() {
  for (let i = 0; i < raceData.length; i++) {
    // adds a new div for every race event
    const status = determineStatus(raceData[i]["start"], raceData[i]["end"]);
    const docElem = document.createElement("div");
    docElem.classList.add("eventTitleContainer");
    raceArchiveContainer.appendChild(docElem);
    generateEventName(raceData[i], docElem, status);
    generateButtons("races", raceData[i], docElem);
    if (status != "Not Begun") generateTotalPlayers(raceData[i], docElem);
    generateTimestamps(raceData[i], docElem, status);
  }
}

function generateBosses() {
  for (let i = 0; i < bossData.length; i++) {
    const status = determineStatus(bossData[i]["start"], bossData[i]["end"]);
    const docElem = document.createElement("div");
    docElem.classList.add("eventTitleContainer");
    bossArchiveContainer.appendChild(docElem);
    generateEventName(bossData[i], docElem, status);
    generateButtons("bosses", bossData[i], docElem, status);
    generateTimestamps(bossData[i], docElem, status);
  }
}

// determines whether an event has ended, not begun, or is LIVE
// returns a string value

function generateEventName(data, parentElem, status) {
  const nameElem = document.createElement("p");
  const statusElem = document.createElement("p");
  nameElem.classList.add("eventName");
  statusElem.classList.add("eventStatus");
  if (data.hasOwnProperty("bossType")) {
    nameElem.innerHTML = `<b>${data["name"].replace(/([a-zA-Z])(\d)/g,"$1 $2")}</b>`;
  } else {
    nameElem.innerHTML = `<b>${data["name"]}</b>`;
  }
  statusElem.innerHTML = `${status}`;
  if (status == "LIVE") {
    parentElem.classList.add("live");
  }
  parentElem.appendChild(nameElem);
  parentElem.appendChild(statusElem);
}
function generateButtons(event, data, parentElem) {
  const chooseTypeButtonContainer = document.createElement("div");
  const detailsButton = document.createElement("button");
  detailsButton.classList.add("chooseTypeButton");
  detailsButton.innerText = "Details";
  detailsButton.onclick = () => {
    displayLoading();
    id = data["id"];
    switch (event) {
      case "races":
        getRaceMetadata(data["metadata"]);
        break;
      case "bosses":
        getBossMetadata();
        break;
    }
  };
  chooseTypeButtonContainer.appendChild(detailsButton);
  if (event == "races" && data["totalScores"] != 0) {
    const lbButton = document.createElement("button");
    lbButton.classList.add("chooseTypeButton");
    lbButton.innerText = "Leaderboard";
    lbButton.onclick = () => {
      displayLoading();
      eventName = data["name"];
      id = data["id"];
      getRaceLeaderboard(data);
    };
    chooseTypeButtonContainer.appendChild(lbButton);
  } else if (event == "bosses" && data["totalScores_standard"] != 0) {
    const lbButton = document.createElement("button");
    lbButton.classList.add("chooseTypeButton");
    lbButton.innerText = "Leaderboards";
    lbButton.onclick = () => {
      displayLoading();
      eventName = data["name"].replace(/([a-zA-Z])(\d)/g, "$1 $2");
      id = data["id"];
      getBossLeaderboard(data);
    };
    chooseTypeButtonContainer.appendChild(lbButton);
  }
  parentElem.appendChild(chooseTypeButtonContainer);
}

function determineStatus(startDate, endDate) {
  let currentDate = Date.now();
  if (currentDate > endDate) {
    return "Ended";
  } else if (currentDate < startDate) {
    return "Not Begun";
  } else {
    return "LIVE";
  }
}
function generateTimestamps(data, parentElem, status) {
  const dateFormatting = {
    month: "short",
    day: "numeric",
    year: "numeric",
    /*hour: "numeric",
    minute: "2-digit",*/
  };
  const startDate = new Date(data["start"]);
  const endDate = new Date(data["end"]);
  const timestampElem = document.createElement("p");
  if (status == "LIVE") {
    timestampElem.innerHTML += `${calculateTimeRemaining(endDate)}`;
  } else {
    timestampElem.innerHTML += `${startDate.toLocaleDateString([], dateFormatting)} to ${endDate.toLocaleDateString([], dateFormatting)}`;
  }
  parentElem.appendChild(timestampElem);
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
function generateTotalPlayers(data, parentElem) {
  const totalPlayersElem = document.createElement("p");
  totalPlayersElem.innerHTML += `<b>${data["totalScores"]}</b> submissions`;
  parentElem.appendChild(totalPlayersElem);
}

// fetches for the metadata for the specific race based on raceNum
// calls displayDetails with the relevant metadata
async function getRaceMetadata(URL) {
  try {
    raceMetadata = await (await fetch(URL)).json();
    raceMetadata = raceMetadata["body"];
    disableLoading();
    displayDetails("races", raceMetadata, null);
  } catch (error) {
    catchError(error);
  }
}
async function getBossMetadata() {
  try {
    bossStandardMetadata = await (await fetch(`https://data.ninjakiwi.com/btd6/bosses/${id}/metadata/standard`)).json();
    bossStandardMetadata = bossStandardMetadata["body"];
    bossEliteMetadata = await (await fetch(`https://data.ninjakiwi.com/btd6/bosses/${id}/metadata/elite`)).json();
    bossEliteMetadata = bossEliteMetadata["body"];
    disableLoading();
    displayDetails("bosses", bossStandardMetadata, "standard");
  } catch (error) {
    catchError(error);
  }
}

// uuuuugggggghhhhhh
// kill me please
function displayDetails(event, metadata, difficulty) {
  while (difficultyButtonContainer.hasChildNodes()) {
    difficultyButtonContainer.removeChild(difficultyButtonContainer.firstChild);
  }
  eventTitle.style.display = "none";
  leaderboardTitle.style.display = "none";
  raceArchiveContainer.style.display = "none";
  bossArchiveContainer.style.display = "none";
  switch (event) {
    case "races":
      raceTitle.innerText = `"${metadata["name"]}" Race Info`;
      generateDifficultyButtons(event, null);
      break;
    case "bosses":
      raceTitle.innerText = `${metadata["name"].replace(/([a-zA-Z])(\d)/g,"$1 $2")} Boss Details (${difficulty.toUpperCase()})`;
      showBoss(metadata, difficulty);
      generateDifficultyButtons(event, difficulty);
      urlParams.set("difficulty", difficulty);
      history.replaceState(null, null, "?" + urlParams.toString());
      break;
  }
  raceTitle.style.display = "flex";
  showMap(metadata);
  document.getElementById(
    "startingCash"
  ).innerHTML = `<b>Cash</b><br>$${metadata["startingCash"]}`;
  document.getElementById(
    "lives"
  ).innerHTML = `<b>Lives</b><br>${metadata["lives"]}`;
  document.getElementById(
    "rounds"
  ).innerHTML = `<b>Rounds</b><br>${metadata["startRound"]} to ${metadata["endRound"]}`;
  let mode;
  switch (metadata["mode"]) {
    case "DoubleMoabHealth": mode = "Double HP MOABs"; break;
    case "AlternateBloonsRounds": mode = "Alternate Bloons Rounds"; break;
    default: mode = metadata["mode"];
  }
  document.getElementById(
    "mode"
  ).innerHTML = `<b>${metadata["difficulty"]}</b><br>${mode}`;
  determineSpecialMods(metadata);
  for (const tower of metadata["_towers"]) {
    if (tower["isHero"]) {
      if (tower["tower"] == "ChosenPrimaryHero" && tower["max"] != 0) {
        parseHeroes(tower, true);
      } else {
        parseHeroes(tower, false);
      }
    } else {
      if (tower["max"] != 0) parseTowerUpgrades(tower);
    }
  }
  if (enabledPrimary.hasChildNodes()) {
    prependElement(enabledPrimary, `Primary`);
  }
  if (enabledMilitary.hasChildNodes()) {
    prependElement(enabledMilitary, `Military`);
  }
  if (enabledMagic.hasChildNodes()) {
    prependElement(enabledMagic, `Magic`);
  }
  if (enabledSupport.hasChildNodes()) {
    prependElement(enabledSupport, `Support`);
  }
  if (!enabledHeroes.hasChildNodes()) {
    appendElement(enabledHeroes, `None`, ``);
  }
  document.getElementById("raceModifiersContainer").style.display = "flex";
  eventDetails.style.display = "flex";
  urlParams.set("id", `${id}`);
  urlParams.set("type", "metadata");
  history.replaceState(null, null, "?" + urlParams.toString());
}

function generateDifficultyButtons(event, selectedDifficulty) {
  if (event == "bosses") {
    const swapDifficultyButton = document.createElement("button");
    swapDifficultyButton.classList.add("swapDifficultyButton");
    if (selectedDifficulty == "standard") {
      swapDifficultyButton.innerText = `Swap to Elite`;
      swapDifficultyButton.onclick = () => {
        for (const element of dataContainers) {
          while (element.hasChildNodes()) {
            element.removeChild(element.firstChild);
          }
        }
        displayDetails(event, bossEliteMetadata, "elite");
      };
    } else {
      swapDifficultyButton.innerText = `Swap to Normal`;
      swapDifficultyButton.onclick = () => {
        for (const element of dataContainers) {
          while (element.hasChildNodes()) {
            element.removeChild(element.firstChild);
          }
        }
        displayDetails(event, bossStandardMetadata, "standard");
      };
    }
    difficultyButtonContainer.appendChild(swapDifficultyButton);
  }
}

// shows images
function showMap(metadata) {
  mapImage.src = metadata["mapURL"];
  mapImage.alt = `Map: ${metadata["map"].replace(/([A-Z])/g, " $1").trim()}`; // magic code by AI that adds spaces do NOT fucking touch this
  mapImage.style.display = "block";
  mapContainer.appendChild(mapImage);
}

function showBoss(metadata, difficulty) {
  bossImage.src = null;
  const name = metadata["name"];
  if (difficulty == "standard") {
    if (name.includes("Bloonarius")) {
      bossImage.src = "https://i.ibb.co/2hzPr5t/bloonarius.png";
    } else if (name.includes("Lych")) {
      bossImage.src = "https://i.ibb.co/w4t4dX8/lych.png";
    } else if (name.includes("Vortex")) {
      bossImage.src = "https://i.ibb.co/w4Ng4nd/vortex.png";
    } else if (name.includes("Dreadbloon")) {
      bossImage.src = "https://i.ibb.co/hVF5PnP/dreadbloon.webp";
    } else if (name.includes("Phayze")) {
      bossImage.src = "https://i.ibb.co/3dGxcC2/phayze.png";
    }
  } else if (difficulty == "elite") {
    if (name.includes("Bloonarius")) {
      bossImage.src = "https://i.ibb.co/HnhcNz9/elite-Bloonarius.png";
    } else if (name.includes("Lych")) {
      bossImage.src = "https://i.ibb.co/2h93hcJ/elite-Lych.png";
    } else if (name.includes("Vortex")) {
      bossImage.src = "https://i.ibb.co/j44bYsB/elite-Vortex.png";
    } else if (name.includes("Dreadbloon")) {
      bossImage.src = "https://i.ibb.co/BgLNDHg/elite-Dreadbloon.webp";
    } else if (name.includes("Phayze")) {
      bossImage.src = "https://i.ibb.co/JnjzyLQ/elite-Phayze.png";
    }
  }
  if (bossImage.src != null) {
    bossImage.style.display = "block";
    bossImageContainer.appendChild(bossImage);
  } else {
    while (bossImageContainer.hasChildNodes()) {
      bossImageContainer.removeChild(bossImageContainer.firstChild);
    }
  }
}

// sorts out the tower upgrades
// formats into something like "3x Monkey Sub [new line] (5-3-5)"
// adds spaces via magic code generated by phind.com
function parseTowerUpgrades(tower) {
  let enabledUpgrades;
  let badName = tower["tower"];
  let name = badName.replace(/([A-Z])/g, " $1").trim(); // magic code by AI that adds spaces do NOT fucking touch this
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

// same thing as parseTowers but we don't need to worry about upgrades or max tower count
// (still sucks)
function parseHeroes(hero, isSelectable) {
  if (!isSelectable) {
    if (hero["max"] != 0) {
      const heroInfoDisplay = document.createElement("p");
      heroInfoDisplay.innerHTML = `${hero["tower"].replace(/([A-Z])/g, " $1").trim()}`; // magic code by AI that adds spaces do NOT fucking touch this
      heroInfoDisplay.classList.add("heroInfoDisplay");
      enabledHeroes.appendChild(heroInfoDisplay);
    }
  } else {
    const heroInfoDisplay = document.createElement("p");
    heroInfoDisplay.innerHTML = `<b>Any Hero</b>`;
    heroInfoDisplay.classList.add("heroInfoDisplay");
    enabledHeroes.appendChild(heroInfoDisplay);
  }
}

/* 
if (mentalHealth < adequate) {
  die("now");
}
*/
function determineSpecialMods(metadata) {
  if (metadata["maxTowers"] != 9999 && metadata["maxTowers"] != 0) {
    appendElement(
      specialModsContainer,
      `Max Towers`,
      `${metadata["maxTowers"]}`
    );
  }
  if (metadata["maxParagons"] !== 10) {
    appendElement(
      specialModsContainer,
      `Max Paragons`,
      `${metadata["maxParagons"]}`
    );
  }
  if (metadata["abilityCooldownReductionMultiplier"] !== 1) {
    appendElement(
      specialModsContainer,
      `Ability Cooldowns`,
      `${(metadata["abilityCooldownReductionMultiplier"] * 100).toLocaleString()}% duration`
    );
  }
  if (metadata["removeableCostMultiplier"] !== 1) {
    appendElement(
      specialModsContainer,
      `Obstacle Removal`,
      `${(metadata["removeableCostMultiplier"] * 100).toLocaleString()}% cost`
    );
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
    appendElement(
      specialModsContainer,
      `MOAB Speed`,
      `${(bloonMods["moabSpeedMultiplier"] * 100).toLocaleString()}%`
    );
  }
  if (bloonMods["bossSpeedMultiplier"] !== 1) {
    appendElement(
      specialModsContainer,
      `Boss Speed`,
      `${(bloonMods["bossSpeedMultiplier"] * 100).toLocaleString()}%`
    );
  }
  if (bloonMods["regrowRateMultiplier"] !== 1) {
    appendElement(
      specialModsContainer,
      `Regrow Rate`,
      `${(bloonMods["regrowRateMultiplier"] * 100).toLocaleString()}%`
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

async function getRaceLeaderboard(data) {
  raceLB = await (await fetch(data["leaderboard"])).json();
  raceLB = raceLB["body"];
  disableLoading();
  displayLeaderboard(raceLB, null);
}
async function getBossLeaderboard(data) {
  bossStandardLB1P = await (
    await fetch(data["leaderboard_standard_players_1"])
  ).json();
  bossStandardLB1P = bossStandardLB1P["body"];
  bossEliteLB1P = await (
    await fetch(data["leaderboard_elite_players_1"])
  ).json();
  bossEliteLB1P = bossEliteLB1P["body"];
  disableLoading();
  displayLeaderboard(bossStandardLB1P, "standard");
}

function displayLeaderboard(lb, difficulty) {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  let scoreType;
  generateLBButtons(difficulty);
  eventPickContainer.style.display = "none";
  eventTitle.style.display = "none";
  raceArchiveContainer.style.display = "none";
  bossArchiveContainer.style.display = "none";
  if (lb[0]["scoreParts"][0]["name"] == "Game Time") {
    scoreType = "time";
  } else if (lb[0]["scoreParts"][0]["name"] == "Tiers") {
    scoreType = "tiers";
  } else {
    scoreType = "cash";
  }
  for (let i = 0; i < lb.length; i++) {
    const playerElem = document.createElement("div");
    createPlacementElem(i + 1, playerElem);
    createNameElem(lb[i], playerElem);
    createScoreElem(scoreType, lb[i], playerElem);
    playerElem.classList.add("playerElem");
    leaderboardContainer.appendChild(playerElem);
  }

  if (difficulty == null) {
    leaderboardTitle.innerHTML = `"${eventName}" Race: Top ${lb.length}`;
  } else {
    leaderboardTitle.innerHTML = `${eventName}: Top ${lb.length} (${difficulty.toUpperCase()})`;
  }

  leaderboardTitle.style.display = "flex";
  leaderboardContainer.style.display = "flex";

  urlParams.set("id", `${id}`);
  urlParams.set("type", "leaderboard");
  if (difficulty != null) urlParams.set("difficulty", difficulty);
  history.replaceState(null, null, "?" + urlParams.toString());
}

function generateLBButtons(selectedDifficulty) {
  const swapDifficultyButton = document.createElement("button");
  swapDifficultyButton.classList.add("swapDifficultyButton");
  if (selectedDifficulty == "standard") {
    swapDifficultyButton.innerText = `Swap to Elite`;
    swapDifficultyButton.onclick = () => {
      for (const element of dataContainers) {
        while (element.hasChildNodes()) {
          element.removeChild(element.firstChild);
        }
      }
      displayLeaderboard(bossEliteLB1P, "elite");
    };
    swapLBButtonContainer.style.display = "flex";
  } else if (selectedDifficulty == "elite") {
    swapDifficultyButton.innerText = `Swap to Normal`;
    swapDifficultyButton.onclick = () => {
      for (const element of dataContainers) {
        while (element.hasChildNodes()) {
          element.removeChild(element.firstChild);
        }
      }
      displayLeaderboard(bossStandardLB1P, "standard");
    };
    swapLBButtonContainer.style.display = "flex";
  }
  swapLBButtonContainer.appendChild(swapDifficultyButton);
}

function createPlacementElem(placement, parent) {
  const placementElem = document.createElement("p");
  placementElem.innerText = placement;
  parent.appendChild(placementElem);
}
function createNameElem(data, parent) {
  const playerNameElem = document.createElement("p");
  playerNameElem.classList.add("tiebreakerElem")
  playerNameElem.innerText = `${data["displayName"].toUpperCase().trim()}`;
  let urlParts = data["profile"].split("/");
  let userID = urlParts[urlParts.length - 1];
  playerNameElem.onclick = () => {
    window.open(`community.html?type=player&id=${userID}`)
  }
  parent.appendChild(playerNameElem);
}
function createScoreElem(scoreType, data, parent) {
  const scoreElem = document.createElement("p");
  switch (scoreType) {
    case "time": scoreElem.innerText = `${convertMS(data["score"])}`; break;
    case "tiers": 
      scoreElem.innerText = `${data["score"]} Tiers`; 
      scoreElem.onclick = () => {
        popupHTML = `
        <h3>Total Ranked Time: <b>${convertMS(data["scoreParts"][1]["score"])}</b></h3>
        <p><b>About least tiers tiebreakers</b>: When scores are tied, the best Ranked time is used as a tiebreaker.</p>`
        showPopup(`${data["displayName"].toUpperCase()}'s Tiebreaker`, popupHTML)
      }
      scoreElem.classList.add("tiebreakerElem")
      break
    case "cash": scoreElem.innerText = `$${data["score"].toLocaleString()}`; break;
  }
  scoreElem.classList.add("scoreElem")
  parent.appendChild(scoreElem);
}

function convertMS(milliseconds) {
  let hours = Math.floor(milliseconds / (1000 * 60 * 60));
  let minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  let remainingMilliseconds = milliseconds % 1000;

  let formattedTime = "";
  if (hours > 0) {
    formattedTime += `${hours}:`;
  }
  formattedTime += `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}.${remainingMilliseconds}`;
  return formattedTime;
}

function padTo2Digits(num) {
  // magic function by AI
  return num.toString().padStart(2, "0");
}


function appendElement(parent, title, value) {
  const element = document.createElement("p");
  element.innerHTML = `<b>${title}</b><br>${value}`;
  parent.appendChild(element);
}
function prependElement(parent, title) {
  const element = document.createElement("p");
  element.innerHTML = `<b>${title}</b>`;
  parent.prepend(element);
}

function swapToEvent(event) {
  eventPickContainer.style.display = "none";
  eventTitle.style.display = "flex";
  backButton.style.display = "flex";
  switch (event) {
    case "races":
      raceArchiveContainer.style.display = "flex";
      eventTitle.innerText = "Latest Race Events";
      break;
    case "bosses":
      bossArchiveContainer.style.display = "flex";
      eventTitle.innerText = "Latest Boss Events";
      break;
    default:
      catchError("That event does not exist.");
  }
  switch (event) {
    case "races":
      getRaceData();
      break;
    case "bosses":
      getBossData();
      break;
  }
  urlParams.set("event", `${event}`);
  history.replaceState(null, null, "?" + urlParams.toString());
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

function displayLoading() {
  eventTitle.style.display = "none";
  backButton.style.display = "none";
  raceArchiveContainer.style.display = "none";
  bossArchiveContainer.style.display = "none";
}
function disableLoading() {
  backButton.style.display = "flex";
}

raceEventButton.onclick = () => {
  swapToEvent("races");
};
bossEventButton.onclick = () => {
  swapToEvent("bosses");
};
// event listener for the back button.
backButton.onclick = () => {
  eventPickContainer.style.display = "flex";
  backButton.style.display = "none";
  raceArchiveContainer.style.display = "none";
  bossArchiveContainer.style.display = "none";
  for (const element of eventElems) {
    element.style.display = "none";
  }
  for (const element of dataContainers) {
    while (element.hasChildNodes()) {
      element.removeChild(element.firstChild);
    }
  }
  urlParams.delete("id");
  urlParams.delete("type");
  urlParams.delete("difficulty");
  window.history.replaceState(null, document.title, window.location.pathname);
};

async function main() {
  displayLoading()
  window.addEventListener('offline', () => alert("NOTICE: You must be connected to the internet to browse the event archive.\nIt seems that your internet connection has been lost. Please report this to the BTD6 Central Discord Server if this is a bug."))
  urlEvent = urlParams.get("event");
  urlID = urlParams.get("id");
  urlType = urlParams.get("type");
  urlDifficulty = urlParams.get("difficulty");
  // if the ID of the event is in the URL
  if (urlID != null) {
    id = urlID;
    displayLoading()
    // and the type is "metadata"
    if (urlType == "metadata") {
      if (urlEvent == "races") {
        const metadata = await (await fetch(`https://data.ninjakiwi.com/btd6/${urlEvent}/${urlID}/${urlType}`)).json();
        swapToEvent(urlEvent);
        displayDetails(urlEvent, metadata["body"], urlDifficulty);
      } else if (urlEvent == "bosses") {
        bossEliteMetadata = await (await fetch(`https://data.ninjakiwi.com/btd6/${urlEvent}/${urlID}/${urlType}/elite`)).json();
        bossStandardMetadata = await (await fetch(`https://data.ninjakiwi.com/btd6/${urlEvent}/${urlID}/${urlType}/standard`)).json();
        swapToEvent(`${urlEvent}`);
        bossEliteMetadata = bossEliteMetadata["body"];
        bossStandardMetadata = bossStandardMetadata["body"];
        if (urlDifficulty == "standard")
          displayDetails(urlEvent, bossStandardMetadata, urlDifficulty);
        if (urlDifficulty == "elite")
          displayDetails(urlEvent, bossEliteMetadata, urlDifficulty);
      }
      // OR if the type is "leaderboard"
    } else if (urlType == "leaderboard") {
      let lb;
      if (urlEvent == "races") {
        const metadata = await (await fetch(`https://data.ninjakiwi.com/btd6/${urlEvent}/${urlID}/metadata`)).json();
        const tempLB = await (await fetch(`https://data.ninjakiwi.com/btd6/${urlEvent}/${urlID}/leaderboard?`)).json();
        lb = tempLB["body"];
        eventName = metadata["body"]["name"];
      } else if (urlEvent == "bosses") {
        const metadata = await (await fetch(`https://data.ninjakiwi.com/btd6/${urlEvent}/${urlID}/metadata/${urlDifficulty}`)).json();
        bossStandardLB1P = await (await fetch(`https://data.ninjakiwi.com/btd6/${urlEvent}/${urlID}/leaderboard/standard/1?`)).json();
        bossEliteLB1P = await (await fetch(`https://data.ninjakiwi.com/btd6/${urlEvent}/${urlID}/leaderboard/elite/1?`)).json();
        bossStandardLB1P = bossStandardLB1P["body"];
        bossEliteLB1P = bossEliteLB1P["body"];
        eventName = metadata["body"]["name"].replace(/([a-zA-Z])(\d)/g,"$1 $2")
        if (urlDifficulty == "standard") {
          lb = bossStandardLB1P;
        } else {
          lb = bossEliteLB1P;
        }
      }
      swapToEvent(urlEvent);
      displayLeaderboard(lb, urlDifficulty);
    }
    disableLoading()
  } else if (urlEvent != null) {
    swapToEvent(urlEvent);
  } else {
    urlParams.delete("id");
    urlParams.delete("type");
    urlParams.delete("difficulty");
    history.replaceState(null, null, "?" + urlParams.toString());
  }
  disableLoading()
  backButton.style.display = "none"
}
// event listener for race button.

main();
