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

// fetches the race data from the nk api
function getRaceData() {
  if (!contentLoaded) {
    fetch("https://data.ninjakiwi.com/btd6/races?")
      .then((response) => response.json())
      .then((data) => {
        if (data["error"] == null) {
          generateRaceTitles(data["body"]);
          contentLoaded = true;
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
    let status = determineStatus(data[i]["start"], data[i]["end"]);
    // adds a new div for every race event
    let docElem = document.createElement("div");
    docElem.classList.add("eventTitle");
    docElem.innerHTML = `<b>${data[i]["name"]}</b>&nbsp;${status}`;
    dataDisplayContainer.appendChild(docElem);
    if (status == "[LIVE]") {
      docElem.classList.add("live");
    }
    generateTotalPlayers(data[i], dataDisplayContainer);
    generateTimestamps(data[i], dataDisplayContainer);

    // adds event listeners to each element
    docElem.onclick = () => {
      dataDisplayContainer.style.display = "none";
      generateRaceMetadata(i, data);
    };
  }
}

// determines whether an event has ended, not begun, or is LIVE
// returns a string value
function determineStatus(startDate, endDate) {
  let currentDate = Date.now();
  if (currentDate > endDate) {
    return "[ended]";
  } else if (currentDate < startDate) {
    return "[not begun]";
  } else {
    return "[LIVE]";
  }
}

function generateTimestamps(data, parentElem) {
  const dateFormatting = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };
  const startDate = new Date(data["start"]);
  const endDate = new Date(data["end"]);
  const timestampsElem = document.createElement("div");
  timestampsElem.innerHTML += `${startDate.toLocaleDateString(
    [],
    dateFormatting
  )} to ${endDate.toLocaleDateString([], dateFormatting)}`;
  timestampsElem.classList.add("timestamps");
  parentElem.appendChild(timestampsElem);
}
function generateTotalPlayers(data, parentElem) {
  const totalPlayersElem = document.createElement("div");
  totalPlayersElem.innerHTML += `<b>${data["totalScores"]}</b> submissions`;
  parentElem.appendChild(totalPlayersElem);
}

// fetches for the metadata for the specific race based on raceNum
// calls displayInfo with the relevant metadata
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

// uuuuugggggghhhhhh
// kill me please
function displayInfo(metadata) {
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
  enabledTowersContainer.appendChild(towerInfoDisplay);
  towerInfoDisplay.classList.add("towerInfoDisplay");
  if (tower["max"] > 0) {
    towerInfoDisplay.innerText = `${tower["max"]}x ${name}\n${enabledUpgrades}`;
  } else if (tower["max"] == -1) {
    towerInfoDisplay.innerText = `${name}\n${enabledUpgrades}`;
  }
}

// same thing as parseTowers but we don't need to worry about upgrades or max tower count
// (still sucks)
function parseHeroes(hero, isSelectable) {}

// event listener for race button. this needs to be cleaned up
raceEventButton.onclick = () => {
  eventPickContainer.style.display = "none";
  backButton.style.display = "block";
  dataDisplayContainer.style.display = "flex";
  document.getElementById("eventTitle").innerText = "Latest Race Events";
  getRaceData();
};
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
// event listener for the back button. this REALLY needs to be fucking cleaned up
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
