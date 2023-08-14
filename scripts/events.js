const text = document.getElementById("eventDataContainer");
const raceEventButton = document.getElementById("raceEventButton");
const eventPickContainer = document.getElementById("eventPickContainer");
const dataDisplayContainer = document.getElementById("dataDisplayContainer");
const backButton = document.getElementById(
  "takeMeHomeCountryRoadsToThePlaceIBelongWestVirginia"
);
const statTitle = document.getElementById("statTitle");
const raceMetaAndLB = document.getElementById("raceMetaAndLB");
const specialModsContainer = document.getElementById("specialModsContainer");
const enabledTowersContainer = document.getElementById(
  "enabledTowersContainer"
);
const enabledTowers = document.getElementById("enabledTowers");
const enabledHeroes = document.getElementById("enabledHeroes");
const eventDates = document.getElementById("eventDates");
const mapContainer = document.getElementById("mapContainer");
const mapImage = document.getElementById("mapImage");

let startDate;
let endDate;
let contentLoaded = false;

function showLB(URL) {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function figureOutStartTime(startTime) {
  const startDate = new Date(startTime);
  return startDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function figureOutEndTime(endTime) {
  const endDate = new Date(endTime);
  return endDate.toLocaleDateString();
}

getRaceData = () => {
  if (!contentLoaded) {
    fetch("https://data.ninjakiwi.com/btd6/races?")
      .then((response) => response.json())
      .then((data) => {
        generateRaceTitles(data["body"]);
        contentLoaded = true;
      })
      .catch((error) => {
        alert(
          "There was an issue while getting data. Please try again later and report this issue in the BTD6 Central Discord server. Reload the page to continue."
        );
        alert(error);
      });
  }
};

function generateRaceTitles(data) {
  for (let i = 0; i < data.length; i++) {
    // adds a new div for every race event
    let docElem = document.createElement("div");
    docElem.classList.add("eventTitle");
    docElem.innerHTML = `<b>${data[i]["name"]}</b>`;
    dataDisplayContainer.appendChild(docElem);

    // adds event listeners to each element
    docElem.onclick = () => {
      dataDisplayContainer.style.display = "none";
      generateRaceMetadata(i, data);
    };
  }
}

function generateRaceMetadata(raceNum, data) {
  fetch(data[raceNum]["metadata"])
    .then((response) => response.json())
    .then((metadata) => {
      statTitle.innerText = `"${data[raceNum]["name"]}" Race Info`;
      statTitle.style.display = "flex";
      displayInfo(metadata["body"]);
      raceMetaAndLB.style.display = "flex";
    })
    .catch((error) => {
      alert(
        "There was an issue while getting detailed race info. Please send a screenshot of this error in the BTD6 Central Discord Server. Reload the page to continue."
      );
      console.log(error);
    });
}

function displayInfo(metadata) {
  // this just sucks so much lmao
  enabledTowers.innerText = "";
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
  for (const tower of metadata["_towers"]) {
    if (!tower["isHero"]) {
      if (tower["max"] != 0) parseTowerUpgrades(tower);
    } else {
      if (tower["tower"] == "ChosenPrimaryHero" && tower["max"] != 0) {
        parseHeroes(tower, true);
      } else if (tower["max"] != 0) {
        parseHeroes(tower, false);
      }
    }
  }
  document.getElementById("modifiersContainer").style.display = "flex";
}

function showMap(metadata) {
  mapImage.src = metadata["mapURL"];
  mapImage.alt = metadata["map"].replace(/([A-Z])/g, " $1").trim(); // magic code by AI that adds spaces do NOT fucking touch this
  mapImage.style.display = "block";
  mapContainer.appendChild(mapImage);
}

// sorts out the tower upgrades
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
  enabledTowersContainer.appendChild(towerInfoDisplay);
  towerInfoDisplay.classList.add("towerInfoDisplay");
  if (tower["max"] > 0) {
    towerInfoDisplay.innerText = `${tower["max"]}x ${name}\n${enabledUpgrades}`;
  } else if (tower["max"] == -1) {
    towerInfoDisplay.innerText = `${name}\n${enabledUpgrades}`;
  }
}

function parseHeroes(hero, isSelectable) {}

function generateTimestamps(data) {
  const startDate = new Date(data["start"]);
  const endDate = new Date(data["end"]);
  dates = `<b>Start</b> ${startDate.toLocaleDateString()} | <b>End</b> ${endDate.toLocaleDateString()}`;
}

function isItLive(data) {
  for (let i = 0; i < data.length - 1; i++) {
    const startTimestamp = data[i]["start"];
    const endTimestamp = data[i]["end"];
    const currentTimestamp = Date.now();
    if (currentTimestamp > endTimestamp) {
      console.log(`${data[i]["name"]} has ended`);
      console.log(figureOutEndTime(endTimestamp));
    } else if (currentTimestamp < startTimestamp) {
      console.log(`${data[i]["name"]} has not begun`);
    } else {
      console.log(`${data[i]["name"]} is ongoing.`);
    }
  }
}

raceEventButton.onclick = () => {
  eventPickContainer.style.display = "none";
  backButton.style.display = "block";
  dataDisplayContainer.style.display = "flex";
  document.getElementById("eventTitle").innerText = "Latest Race Events";
  getRaceData();
};
backButton.onclick = () => {
  eventPickContainer.style.display = "flex";
  backButton.style.display = "none";
  dataDisplayContainer.style.display = "none";
  raceMetaAndLB.style.display = "none";
  while (mapContainer.hasChildNodes()) {
    mapContainer.removeChild(mapContainer.firstChild);
  }
  while (enabledTowersContainer.hasChildNodes()) {
    enabledTowersContainer.removeChild(enabledTowersContainer.firstChild);
  }
};
