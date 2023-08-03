const text = document.getElementById("eventDataContainer");
const raceEventButton = document.getElementById("raceEventButton");
const eventPickContainer = document.getElementById("eventPickContainer");
const dataDisplayContainer = document.getElementById("dataDisplayContainer");
const backButton = document.getElementById(
  "takeMeHomeCountryRoadsToThePlaceIBelongWestVirginia"
);

let raceID = "";
let bossID = "";
let odysseyID = "";
let ctID = "";

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

function parseMetadata(URL) {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      alert(error);
    });
}

function fetchMeSomeRaceDataAlmightyComputerOverlord() {
  fetch("https://data.ninjakiwi.com/btd6/races?")
    .then((response) => response.json())
    .then((data) => {
      const startTime = data.body.start;
      const startDate = figureOutStartTime(startTime);
      const endTime = data.body.end;
      const endDate = figureOutEndTime(endTime);
      return `The event starts at ${startTime}, and ends at ${endTime}`;
    })
    .catch((error) => {
      // Handle any errors
      alert(
        "There was an issue while getting data. Please try again later and report this issue in the BTD6 Central server."
      );
      eventPickContainer.style.display = "flex";
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
  return endDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

raceEventButton.onclick = () => {
  eventPickContainer.style.display = "none";
  backButton.style.display = "block";
  dataDisplayContainer.style.display = "block";
  document.getElementById("statTitle").innerText = "Latest Race Events";
  getRaceData();
};
backButton.onclick = () => {
  eventPickContainer.style.display = "flex";
  backButton.style.display = "none";
  dataDisplayContainer.style.display = "none";
};

getRaceData = () => {
  fetch("https://data.ninjakiwi.com/btd6/races?")
    .then((response) => response.json())
    .then((data) => {
      formatRaceData(data["body"]);
    })
    .catch((error) => {
      alert(
        "There was an issue while getting data. Please try again later and report this issue in the BTD6 Central Discord server. Reload the page to continue."
      );
    });
};

function formatRaceData(data) {
  timeInfo(data);
}

function timeInfo(data) {
  for (let i = 0; i < data.length - 1; i++) {
    const startTimestamp = data[i]["start"];
    const endTimestamp = data[i]["end"];
    const currentTimestamp = Date.now();
    if (currentTimestamp > endTimestamp) {
      console.log(`${data[i]["name"]} has ended`);
    } else if (currentTimestamp < startTimestamp) {
      console.log(`${data[i]["name"]} has not begun`);
    } else {
      console.log(`${data[i]["name"]} is ongoing.`);
    }
  }
}
