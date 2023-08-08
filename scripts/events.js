const text = document.getElementById("eventDataContainer");
const raceEventButton = document.getElementById("raceEventButton");
const eventPickContainer = document.getElementById("eventPickContainer");
const dataDisplayContainer = document.getElementById("dataDisplayContainer");
const backButton = document.getElementById(
  "takeMeHomeCountryRoadsToThePlaceIBelongWestVirginia"
);
const statTitle = document.getElementById("statTitle");
const raceMetaAndLB = document.getElementById("raceMetaAndLB");
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
        contentLoaded = true;
        generateRaceTitles(data["body"]);
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
    let docElem = document.createElement("div");
    docElem.classList.add("eventTitle");
    docElem.innerHTML = `<b>${data[i]["name"]}</b>`;
    dataDisplayContainer.appendChild(docElem);
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
      let shit = metadata["body"];
      statTitle.innerText = `Starts at ${shit["startRound"]} and ends at ${shit["endRound"]}`;
      raceMetaAndLB.style.display = "flex";
    })
    .catch((error) => {
      console.log(error);
    });
}

function fetchStartTime(data) {
  data["start"].toLocaleDateString();
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
};
