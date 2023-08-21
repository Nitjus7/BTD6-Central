const text = document.getElementById("eventDataContainer");
const raceEventButton = document.getElementById("raceEventButton");
const bossEventButton = document.getElementById("bossEventButton");
const eventPickContainer = document.getElementById("eventPickContainer");
const eventListContainer = document.getElementById("eventListContainer");
const backButton = document.getElementById(
  "takeMeHomeCountryRoadsToThePlaceIBelongWestVirginia"
);
const statTitle = document.getElementById("statTitle");
const raceMetaAndLB = document.getElementById("raceMetaAndLB");
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

let raceContentLoaded = false;
let bossContentLoaded = false;
let raceData;
let urlParams = new URLSearchParams(window.location.search);
let urlEvent;
let urlID;
let urlType;
let id;

// fetches the data from the nk api
function getData(event) {
  urlParams.set("event", `${event}`);
  history.replaceState(null, null, "?" + urlParams.toString());
  if (event == "races" && raceData == null) {
    fetch(`https://data.ninjakiwi.com/btd6/races?`)
      .then((response) => response.json())
      .then((data) => {
        if (data["error"] == null) {
          raceData = data["body"];
          generateRaceTitles(raceData);

          raceContentLoaded = true;
        } else {
          alert(
            "There was an issue while getting data. Please try again later and report this issue in the BTD6 Central Discord server. Reload the page to continue."
          );
          document.getElementById("eventTitle").innerText = "An Error Occured";
        }
      })
      .catch((error) => {
        alert(
          "There was an issue while getting data. Please try again later and report this issue in the BTD6 Central Discord server. Reload the page to continue."
        );
        document.getElementById("eventTitle").innerText = "An Error Occured";
        console.log(error);
      });
  }
}

// generates the title cards with the event names as the text
// and adds event listeners to each element
function generateRaceTitles(data) {
  for (let i = 0; i < data.length; i++) {
    // adds a new div for every race event
    const status = determineStatus(data[i]["start"], data[i]["end"]);
    const docElem = document.createElement("div");
    docElem.classList.add("eventTitleContainer");
    eventListContainer.appendChild(docElem);
    generateRaceName(data[i], docElem, status);
    generateButtons(data[i], docElem, status);
    generateTotalPlayers(data[i], docElem);
    generateTimestamps(data[i], docElem);
  }
}

// determines whether an event has ended, not begun, or is LIVE
// returns a string value
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

function generateRaceName(data, parentElem, status) {
  const nameElem = document.createElement("p");
  const statusElem = document.createElement("p");
  nameElem.classList.add("eventName");
  statusElem.classList.add("eventStatus");
  nameElem.innerHTML = `<b>${data["name"]}</b>`;
  statusElem.innerHTML = `${status}`;
  if (status == "LIVE") {
    parentElem.classList.add("live");
  }
  parentElem.appendChild(nameElem);
  parentElem.appendChild(statusElem);
}
function generateButtons(data, parentElem, status) {
  const chooseTypeButtonContainer = document.createElement("div");
  const detailsButton = document.createElement("button");
  detailsButton.classList.add("chooseTypeButton");
  detailsButton.innerText = "Details";
  detailsButton.onclick = () => {
    eventListContainer.style.display = "none";
    id = data["id"];
    generateRaceMetadata(data);
  };
  chooseTypeButtonContainer.appendChild(detailsButton);
  if (!(status == "Not Begun")) {
    const lbButton = document.createElement("button");
    lbButton.classList.add("chooseTypeButton");
    lbButton.innerText = "Leaderboard";
    lbButton.onclick = () => {
      eventListContainer.style.display = "none";
      id = data["id"];
      generateLeaderboard("races", data);
    };
    chooseTypeButtonContainer.appendChild(lbButton);
  }
  parentElem.appendChild(chooseTypeButtonContainer);
}
function generateTimestamps(data, parentElem) {
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
  timestampElem.innerHTML += `${startDate.toLocaleDateString(
    [],
    dateFormatting
  )} to ${endDate.toLocaleDateString([], dateFormatting)}`;
  parentElem.appendChild(timestampElem);
}
function generateTotalPlayers(data, parentElem) {
  const totalPlayersElem = document.createElement("p");
  totalPlayersElem.innerHTML += `<b>${data["totalScores"]}</b> submissions`;
  parentElem.appendChild(totalPlayersElem);
}

// fetches for the metadata for the specific race based on raceNum
// calls displayRaceInfo with the relevant metadata
function generateRaceMetadata(data) {
  fetch(data["metadata"])
    .then((response) => response.json())
    .then((metadata) => {
      displayRaceInfo(metadata["body"]);
    })
    .catch((error) => {
      alert(
        "There was an issue while getting detailed race info. Please send a screenshot of this error in the BTD6 Central Discord Server. Reload the page to continue."
      );
      console.log(error);
    });
}

// uuuuugggggghhhhhh
// kill me please
function displayRaceInfo(metadata) {
  statTitle.innerText = `"${metadata["name"]}" Race Info`;
  statTitle.style.display = "flex";
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
  if (metadata["mode"] == "DoubleMoabHealth") {
    mode = "Double HP MOABs";
  } else {
    mode = metadata["mode"];
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
  document.getElementById("modifiersContainer").style.display = "flex";
  raceMetaAndLB.style.display = "flex";
  urlParams.set("id", `${id}`);
  history.replaceState(null, null, "?" + urlParams.toString());
  urlParams.set("type", "metadata");
  history.replaceState(null, null, "?" + urlParams.toString());
}

// shows a map
function showMap(metadata) {
  mapImage.src = metadata["mapURL"];
  mapImage.alt = `Map: ${metadata["map"].replace(/([A-Z])/g, " $1").trim()}`; // magic code by AI that adds spaces do NOT fucking touch this
  mapImage.style.display = "block";
  mapContainer.appendChild(mapImage);
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
      heroInfoDisplay.innerHTML = `<b>${hero["tower"]
        .replace(/([A-Z])/g, " $1")
        .trim()}</b>`; // magic code by AI that adds spaces do NOT fucking touch this
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
      `${metadata["abilityCooldownReductionMultiplier"]}x duration`
    );
  }
  if (metadata["removeableCostMultiplier"] !== 1) {
    appendElement(
      specialModsContainer,
      `Obstacle Removal`,
      `${metadata["removeableCostMultiplier"]}x cost`
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
      `${bloonMods["speedMultiplier"]}x`
    );
  }
  if (bloonMods["moabSpeedMultiplier"] !== 1) {
    appendElement(
      specialModsContainer,
      `MOAB Speed`,
      `${bloonMods["moabSpeedMultiplier"]}x`
    );
  }
  if (bloonMods["bossSpeedMultiplier"] !== 1) {
    appendElement(
      specialModsContainer,
      `Boss Speed`,
      `${bloonMods["bossSpeedMultiplier"]}x`
    );
  }
  if (bloonMods["regrowRateMultiplier"] !== 1) {
    appendElement(
      specialModsContainer,
      `Regrow Rate`,
      `${bloonMods["regrowRateMultiplier"]}x`
    );
  }
  const hpMods = bloonMods["healthMultipliers"];
  if (hpMods["bloons"] !== 1) {
    appendElement(specialModsContainer, `Ceramic HP`, `${hpMods["bloons"]}x`);
  }
  if (hpMods["moabs"] !== 1) {
    appendElement(specialModsContainer, `MOAB HP`, `${hpMods["moabs"]}x`);
  }
  if (hpMods["boss"] !== 1) {
    appendElement(specialModsContainer, `Boss HP`, `${hpMods["boss"]}x`);
  }
}

function generateLeaderboard(event, data) {
  console.log(event);
  urlParams.set("id", `${id}`);
  history.replaceState(null, null, "?" + urlParams.toString());
  urlParams.set("type", "leaderboard");
  history.replaceState(null, null, "?" + urlParams.toString());
}

function swapToEvent(event) {
  eventPickContainer.style.display = "none";
  backButton.style.display = "block";
  eventListContainer.style.display = "flex";
  if (event == "races")
    document.getElementById("eventTitle").innerText = "Latest Race Events";
  getData(event);
}

function main() {
  urlEvent = urlParams.get("event");
  urlID = urlParams.get("id");
  urlType = urlParams.get("type");
  // if the ID of the event is in the URL
  if (urlID != null) {
    // and the type is "metadata"
    if (urlType == "metadata") {
      fetch(`https://data.ninjakiwi.com/btd6/${urlEvent}/${urlID}/metadata?`)
        .then((response) => response.json())
        .then((metadata) => {
          swapToEvent(`${urlEvent}`);
          id = urlID;
          eventListContainer.style.display = "none";
          if (urlEvent == "races") displayRaceInfo(metadata["body"]);
        });
      // OR if the type is "leaderboard"
    } else if (urlType == "leaderboard") {
      fetch(`https://data.ninjakiwi.com/btd6/${urlEvent}/${urlID}/leaderboard?`)
        .then((response) => response.json())
        .then((leaderboard) => {
          console.log(leaderboard);
        });
    }
  } else if (urlEvent != null) {
    swapToEvent(urlEvent);
  }
  // event listener for race button. this needs to be cleaned up
  raceEventButton.onclick = () => {
    urlParams.delete("id");
    urlParams.delete("type");
    history.replaceState(null, null, "?" + urlParams.toString());
    swapToEvent("races");
  };
  // event listener for the back button. this REALLY needs to be fucking cleaned up
  backButton.onclick = () => {
    eventPickContainer.style.display = "flex";
    backButton.style.display = "none";
    eventListContainer.style.display = "none";
    raceMetaAndLB.style.display = "none";
    while (mapContainer.hasChildNodes()) {
      mapContainer.removeChild(mapContainer.firstChild);
    }
    while (specialModsContainer.hasChildNodes()) {
      specialModsContainer.removeChild(specialModsContainer.firstChild);
    }
    while (enabledPrimary.hasChildNodes()) {
      enabledPrimary.removeChild(enabledPrimary.firstChild);
    }
    while (enabledMilitary.hasChildNodes()) {
      enabledMilitary.removeChild(enabledMilitary.firstChild);
    }
    while (enabledMagic.hasChildNodes()) {
      enabledMagic.removeChild(enabledMagic.firstChild);
    }
    while (enabledSupport.hasChildNodes()) {
      enabledSupport.removeChild(enabledSupport.firstChild);
    }
    while (enabledHeroes.hasChildNodes()) {
      enabledHeroes.removeChild(enabledHeroes.firstChild);
    }
    window.history.replaceState(null, document.title, window.location.pathname);
  };
}

main();

/* Take Me Home, Country Roads by John Denver
Almost heaven, West Virginia
Blue Ridge Mountains, Shenandoah River
Life is old there, older than the trees
Younger than the mountains, growin' like a breeze
Country roads, take me home
To the place I belong
West Virginia, mountain mama
Take me home, country roads
All my memories gather 'round her
Miner's lady, stranger to blue water
Dark and dusty, painted on the sky
Misty taste of moonshine, teardrop in my eye
Country roads, take me home
To the place I belong
West Virginia, mountain mama
Take me home, country roads
I hear her voice in the mornin' hour, she calls me
The radio reminds me of my home far away
Drivin' down the road, I get a feelin'
That I should've been home yesterday, yesterday
Country roads, take me home
To the place I belong
West Virginia, mountain mama
Take me home, country roads
Country roads, take me home
To the place I belong
West Virginia, mountain mama
Take me home, country roads
Take me home, (down) country roads
Take me home, (down) country roads
*/
