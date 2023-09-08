const bloonData = {
  "bloons": [
      {
          "name": "Red Bloon",
          "image": "https://i.ibb.co/Y3k4svr/redtemp.webp",
          "layers": 1,
          "rbe": 1,
          "speed": 1,
          "spawns": null,
          "immuneTo": null
      },
      {
          "name": "Blue Bloon",
          "image": "https://i.ibb.co/tQh2HHr/tempBlue.webp",
          "layers": 2,
          "rbe": 2,
          "speed": 1.4,
          "spawns": "1x Red Bloon",
          "immuneTo": null
      },
      {
          "name": "Green Bloon",
          "layers": 3,
          "rbe": 3,
          "speed": 1.8,
          "spawns": "1x Blue Bloon",
          "immuneTo": null
      },
      {
          "name": "Yellow Bloon",
          "layers": 4,
          "rbe": 4,
          "speed": 3.2,
          "spawns": "1x Green Bloon",
          "immuneTo": null
      },
      {
          "name": "Pink Bloon",
          "layers": 5,
          "rbe": 5,
          "speed": 3.5,
          "spawns": "1x Yellow Bloon",
          "immuneTo": null
      },
      {
          "name": "Black Bloon",
          "layers": 6,
          "rbe": 11,
          "speed": 1.8,
          "spawns": "2x Pink Bloons",
          "immuneTo": "Explosive projectiles"
      },
      {
          "name": "White Bloon",
          "layers": 6,
          "rbe": 11,
          "speed": 2,
          "spawns": "2x Pink Bloons",
          "immuneTo": "Freezing projectiles"
      },
      {
          "name": "Purple Bloon",
          "layers": 6,
          "rbe": 11,
          "speed": 3,
          "spawns": "2x Pink Bloons",
          "immuneTo": "Energy, fire, and plasma projectiles"
      },
      {
          "name": "Lead Bloon",
          "layers": 7,
          "rbe": 23,
          "speed": 1,
          "spawns": "2x Black Bloons",
          "immuneTo": "Sharp projectiles"
      },
      {
          "name": "Zebra Bloon",
          "layers": 7,
          "rbe": 23,
          "speed": 1.8,
          "spawns": "1x Black, 1x White",
          "immuneTo": "Explosive and freezing projectiles"
      },
      {
          "name": "Rainbow Bloon",
          "layers": 8,
          "rbe": 47,
          "speed": 2.2,
          "spawns": "2x Zebra Bloons",
          "immuneTo": null
      },
      {
          "name": "Ceramic Bloon",
          "health": 10,
          "rbe": 104,
          "speed": 2.5,
          "spawns": "2x Rainbow Bloons",
          "immuneTo": null
      }
  ],
  "blimps": [
      {
          "name": "MOAB",
          "fullName": "Massive Ornary Air Blimp",
          "health": 200,
          "rbe": 616,
          "speed": 1,
          "spawns": "4x Ceramic Bloons",
          "immuneTo": null
      },
      {
          "name": "BFB",
          "fullName": "Big Fucking Blimp",
          "health": 700,
          "rbe": 3164,
          "speed": 0.25,
          "spawns": "4x MOABs",
          "immuneTo": null
      },
      {
          "name": "ZOMG",
          "fullName": "Zeppelin of Mighty Gargantuaness",
          "health": 4000,
          "rbe": 16656,
          "speed": 0.18,
          "spawns": "4x BFBs",
          "immuneTo": null
      },
      {
          "name": "DDT",
          "fullName": "Dichlorodiphenyltrichloroethane",
          "health": 400,
          "rbe": 816,
          "speed": 2.64,
          "spawns": "4x Camo Regrow Ceramic Bloons",
          "immuneTo": "Explosive and sharp projectiles. Also has camo which can be removed."
      },
      {
          "name": "BAD",
          "fullName": "Big Airship of Doom",
          "health": 20000,
          "rbe": 55760,
          "speed": 0.18,
          "spawns": "2x ZOMGs, 3x DDTs",
          "immuneTo": null
      }
  ]
}
const normalBossData = {
  "bloonarius": [
    {
      "tier": 1,
      "health": 20000,
      "speed": 0.05,
      "bloonBleed": "8 Green Bloons",
      "skullSpawns": "30 Ceramic Bloons"
    },
    {
      "tier": 2,
      "health": 75000,
      "speed": 0.05,
      "bloonBleed": "15 Yellow Bloons",
      "skullSpawns": "60 Ceramic Bloons"
    },
    {
      "tier": 3,
      "health": 350000,
      "speed": 0.06,
      "bloonBleed": "25 Pink Bloons",
      "skullSpawns": "6 MOABs"
    },
    {
      "tier": 4,
      "health": 750000,
      "speed": 0.06,
      "bloonBleed": "15 Zebra Bloons",
      "skullSpawns": "10 MOABs"
    },
    {
      "tier": 5,
      "health": 3000000,
      "speed": 0.06,
      "bloonBleed": "100 Rainbow Bloons",
      "skullSpawns": "1 BAD"
    }
  ],
  "lych": [
    {
      "tier": 1,
      "health": 14000,
      "speed": 0.092,
      "onSkull": [
        {
          "name": "Lych Soul",
          "health": 1280,
          "lifeSteal": 1
        },
        {
          "name": "Reanimated Blimps",
          "healthMultiplier": 4,
          "speedMultiplier": 1.6
        }
      ]
    },
    {
      "tier": 2,
      "health": 52500,
      "speed": 0.092,
      "onSkull": [
        {
          "name": "Lych Soul",
          "health": 3050,
          "lifeSteal": 2
        },
        {
          "name": "Reanimated Blimps",
          "healthMultiplier": 6,
          "speedMultiplier": 1.7
        }
      ]
    },
    {
      "tier": 3,
      "health": 220000,
      "speed": 0.1,
      "onSkull": [
        {
          "name": "Lych Soul",
          "health": 7000,
          "lifeSteal": 5
        },
        {
          "name": "Reanimated Blimps",
          "healthMultiplier": 7,
          "speedMultiplier": 1.8
        }
      ]
    },
    {
      "tier": 4,
      "health": 525000,
      "speed": 0.108,
      "onSkull": [
        {
          "name": "Lych Soul",
          "health": 14500,
          "lifeSteal": 10
        },
        {
          "name": "Reanimated Blimps",
          "healthMultiplier": 8,
          "speedMultiplier": 1.9
        }
      ]
    },
    {
      "tier": 5,
      "health": 2100000,
      "speed": 0.108,
      "onSkull": [
        {
          "name": "Lych Soul",
          "health": 14500,
          "lifeSteal": 17
        },
        {
          "name": "Reanimated Blimps",
          "healthMultiplier": 9,
          "speedMultiplier": 2
        }
      ]
    },
    {
      "tier": null
    }
  ]
}
const bloonList = bloonData["bloons"]
const blimpList = bloonData["blimps"]
const bloonButton = document.querySelector(".bloonButton")
const bloonStatsContainer = document.querySelector(".bloonStatsContainer")
let bloonDataLoaded = false;

const popupContainer = document.querySelector(".popupContainer")
const popupTitle = document.querySelector(".popupTitle")
const popupContentContainer = document.querySelector(".popupContentContainer")
const statsPopupOverlay = document.querySelector(".popupOverlay")

let urlParams = new URLSearchParams(window.location.search);
let urlType;

function showBloonStats() {
  if (!bloonDataLoaded) {
    for (const bloon of bloonList) {
      const bloonCard = document.createElement("div")
      bloonCard.classList.add("bloonCard")
      generateNameElem(bloon["name"], bloonCard)
      if (bloon.hasOwnProperty("image")) generateImageElem(bloon["image"], bloonCard)
      if (!bloon["name"].includes("Ceramic")) {
        generateStatsElem(bloon, bloonCard)
      } else {}
      generateSpeedElem(bloon["speed"], bloonCard)
      bloonStatsContainer.appendChild(bloonCard)
    }
    bloonDataLoaded = true;
  }
  bloonStatsContainer.style.display = "grid";
  urlParams.set("type", "bloons")
  history.replaceState(null, null, "?" + urlParams.toString());
}
function generateNameElem(name, parent) {
  const nameElem = document.createElement("h4")
  nameElem.classList.add("bloonName")
  nameElem.innerText = name;
  parent.appendChild(nameElem)
}
function generateImageElem(source, parent) {
  const imageElem = document.createElement("img")
  imageElem.classList.add("bloonImage")
  imageElem.src = source
  parent.appendChild(imageElem)
}
function generateStatsElem(bloon, parent) {
  const layersElem = document.createElement("button")
  layersElem.classList.add("layersElem")
  layersElem.innerText = `Layers: ${bloon["layers"]}`
  layersElem.onclick = () => {
    let rbeHTML = `
    <p>RBE is how many pops it takes to fully pop a Bloon (ex. a Black Bloon has <b>11 RBE</b>). The <b>layers</b> of a Bloon is how much damage you need to one-shot it (ex. a Black Bloon has <b>6 layers</b>).
    `
    showPopup(`RBE of a ${bloon["name"]}: ${bloon["rbe"]}`,  rbeHTML)
  }
  parent.appendChild(layersElem)
}
function generateSpeedElem(speed, parent) {
  const speedElem = document.createElement("p")
  speedElem.classList.add("speedElem")
  speedElem.innerText = `${speed}x Red Bloon speed`
  parent.appendChild(speedElem)
}


function showPopup(title, content) {
  popupTitle.innerText = title
  popupContentContainer.innerHTML = content
  popupContainer.style.display = "block"
  popupOverlay.style.display = "block"
}

bloonButton.onclick = () => {
  showBloonStats()
}
document.querySelector(".closePopupButton").onclick = () => {
  popupContainer.style.display = "none"
  statsPopupOverlay.style.display = "none"
}

function main() {
  urlType = urlParams.get("type")
  if (urlType == "bloons") {
    showBloonStats()
  } else {
    urlParams.delete("type")
    window.history.replaceState(null, document.title, window.location.pathname);
  }
}
main()