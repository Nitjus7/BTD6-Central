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

raceEventButton.onclick = () => {
  eventPickContainer.style.display = "none";
  backButton.style.display = "block";
};
backButton.onclick = () => {
  eventPickContainer.style.display = "flex";
  backButton.style.display = "none";
};
