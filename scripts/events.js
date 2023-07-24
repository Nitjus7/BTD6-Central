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
  dataDisplayContainer.innerText =
    fetchMeSomeRaceDataAlmightyComputerOverlord();
};
backButton.onclick = () => {
  eventPickContainer.style.display = "flex";
  backButton.style.display = "none";
};
