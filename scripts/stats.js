const bloonData = {
  "bloons": [
      {
          "name": "Red Bloon",
          //"image": "https://i.ibb.co/Y3k4svr/redtemp.webp",
          "layers": 1,
          "rbe": 1,
          "speed": 1,
          "spawns": "none",
          "immuneTo": null
      },
      {
          "name": "Blue Bloon",
          //"image": "https://i.ibb.co/tQh2HHr/tempBlue.webp",
          "layers": 2,
          "rbe": 2,
          "speed": 1.4,
          "spawns": "1x Red",
          "immuneTo": null
      },
      {
          "name": "Green Bloon",
          "layers": 3,
          "rbe": 3,
          "speed": 1.8,
          "spawns": "1x Blue",
          "immuneTo": null
      },
      {
          "name": "Yellow Bloon",
          "layers": 4,
          "rbe": 4,
          "speed": 3.2,
          "spawns": "1x Green",
          "immuneTo": null
      },
      {
          "name": "Pink Bloon",
          "layers": 5,
          "rbe": 5,
          "speed": 3.5,
          "spawns": "1x Yellow",
          "immuneTo": null
      },
      {
          "name": "Black Bloon",
          "layers": 6,
          "rbe": 11,
          "speed": 1.8,
          "spawns": "2x Pink",
          "immuneTo": "Explosive projectiles"
      },
      {
          "name": "White Bloon",
          "layers": 6,
          "rbe": 11,
          "speed": 2,
          "spawns": "2x Pink",
          "immuneTo": "Freezing projectiles"
      },
      {
          "name": "Purple Bloon",
          "layers": 6,
          "rbe": 11,
          "speed": 3,
          "spawns": "2x Pink",
          "immuneTo": "Energy, fire, and plasma projectiles"
      },
      {
          "name": "Lead Bloon",
          "layers": 7,
          "rbe": 23,
          "speed": 1,
          "spawns": "2x Black",
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
          "spawns": "2x Zebra",
          "immuneTo": null
      },
      {
          "name": "Ceramic Bloon",
          "health": 10,
          "rbe": 104,
          "speed": 2.5,
          "spawns": "2x Rainbow",
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
          "spawns": "4x Ceramic",
          "immuneTo": null
      },
      {
          "name": "BFB",
          "fullName": "Brutal Floating Behemoth",
          "health": 700,
          "rbe": 3164,
          "speed": 0.25,
          "spawns": "4x MOAB",
          "immuneTo": null
      },
      {
          "name": "ZOMG",
          "fullName": "Zeppelin of Mighty Gargantuaness",
          "health": 4000,
          "rbe": 16656,
          "speed": 0.18,
          "spawns": "4x BFB",
          "immuneTo": null
      },
      {
          "name": "DDT",
          "fullName": "Dark Dirigible Titan",
          "health": 400,
          "rbe": 816,
          "speed": 2.64,
          "spawns": "4x Camo Regrow Ceramic",
          "immuneTo": "Explosive and sharp projectiles. Also has camo which can be removed."
      },
      {
          "name": "BAD",
          "fullName": "Big Airship of Doom",
          "health": 20000,
          "rbe": 55760,
          "speed": 0.18,
          "spawns": "2x ZOMG, 3x DDT",
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
      "passive": "8 Green Bloons",
      "skullSpawns": "30 Ceramic Bloons"
    },
    {
      "tier": 2,
      "health": 75000,
      "speed": 0.05,
      "passive": "15 Yellow Bloons",
      "skullSpawns": "60 Ceramic Bloons"
    },
    {
      "tier": 3,
      "health": 350000,
      "speed": 0.05,
      "passive": "25 Pink Bloons",
      "skullSpawns": "6 MOABs"
    },
    {
      "tier": 4,
      "health": 750000,
      "speed": 0.06,
      "passive": "15 Zebra Bloons",
      "skullSpawns": "10 MOABs"
    },
    {
      "tier": 5,
      "health": 3000000,
      "speed": 0.06,
      "passive": "100 Rainbow Bloons",
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
    }
  ],
  "dreadbloon": [
    {
      "tier": 1,
      "health": 7500,
      "speed": 0.05,
      "onSkull": {
        "name": "Dreadrock Bloons",
        "health": 300,
        "lifeLossOnLeak": 5
      }
    },
    {
      "tier": 2,
      "health": 25000,
      "speed": 0.05,
      "onSkull": {
        "name": "Dreadrock Bloons",
        "health": 600,
        "lifeLossOnLeak": 10
      }
    },
    {
      "tier": 3,
      "health": 120000,
      "speed": 0.05,
      "onSkull": {
        "name": "Dreadrock Bloons",
        "health": 900,
        "lifeLossOnLeak": 15
      }
    },
    {
      "tier": 4,
      "health": 280000,
      "speed": 0.06,
      "onSkull": {
        "name": "Dreadrock Bloons",
        "health": 5000,
        "lifeLossOnLeak": 20
      }
    },
    {
      "tier": 5,
      "health": 1000000,
      "speed": 0.06,
      "onSkull": {
        "name": "Dreadrock Bloons",
        "health": 12000,
        "lifeLossOnLeak": 25
      }
    }
  ]
}
const eliteBossData = {
  "bloonarius": [
    {
      "tier": 1,
      "health": 50000,
      "speed": 0.05,
      "passive": "10 Pink Bloons",
      "skullSpawns": "60 Ceramic Bloons"
    },
    {
      "tier": 2,
      "health": 300000,
      "speed": 0.05,
      "passive": "10 Rainbow Bloons",
      "skullSpawns": "16 BFBs"
    },
    {
      "tier": 3,
      "health": 2000000,
      "speed": 0.05,
      "passive": "13 Ceramic Bloons",
      "skullSpawns": "1 BAD, 9 DDTs"
    },
    {
      "tier": 4,
      "health": 8000000,
      "speed": 0.06,
      "passive": "12 MOABs",
      "skullSpawns": "2 fortified BADs, 20 fortified DDTs"
    },
    {
      "tier": 5,
      "health": 40000000,
      "speed": 0.06,
      "passive": "8 DDTs",
      "skullSpawns": "4 fortified BADs"
    }
  ],
  "lych": [
    {
      "tier": 1,
      "health": 30000,
      "speed": 0.1,
      "onSkull": [
        {
          "name": "Lych Soul",
          "health": 1600,
          "lifeSteal": 11
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
      "health": 180000,
      "speed": 0.108,
      "onSkull": [
        {
          "name": "Lych Soul",
          "health": 5600,
          "lifeSteal": 12
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
      "health": 1100000,
      "speed": 0.116,
      "onSkull": [
        {
          "name": "Lych Soul",
          "health": 25000,
          "lifeSteal": 15
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
      "health": 4800000,
      "speed": 0.12,
      "onSkull": [
        {
          "name": "Lych Soul",
          "health": 100000,
          "lifeSteal": 20
        },
        {
          "name": "Reanimated Blimps",
          "healthMultiplier": 10,
          "speedMultiplier": 2.1
        }
      ]
    },
    {
      "tier": 5,
      "health": 24000000,
      "speed": 0.124,
      "onSkull": [
        {
          "name": "Lych Soul",
          "health": 485000,
          "lifeSteal": 27
        },
        {
          "name": "Reanimated Blimps",
          "healthMultiplier": 12,
          "speedMultiplier": 2.2
        }
      ]
    }
  ],
  "dreadbloon": [
    {
      "tier": 1,
      "health": 15000,
      "speed": 0.05,
      "onSkull": {
        "name": "Dreadrock Bloons",
        "health": 600,
        "lifeLossOnLeak": 20
      }
    },
    {
      "tier": 2,
      "health": 90000,
      "speed": 0.05,
      "onSkull": {
        "name": "Dreadrock Bloons",
        "health": 2500,
        "lifeLossOnLeak": 30
      }
    },
    {
      "tier": 3,
      "health": 650000,
      "speed": 0.05,
      "onSkull": {
        "name": "Dreadrock Bloons",
        "health": 10000,
        "lifeLossOnLeak": 50
      }
    },
    {
      "tier": 4,
      "health": 2625000,
      "speed": 0.06,
      "onSkull": {
        "name": "Dreadrock Bloons",
        "health": 22000,
        "lifeLossOnLeak": 75
      }
    },
    {
      "tier": 5,
      "health": 12500000,
      "speed": 0.06,
      "onSkull": {
        "name": "Dreadrock Bloons",
        "health": 45000,
        "lifeLossOnLeak": 150
      }
    }
  ]
}

const bloonList = bloonData["bloons"]
const blimpList = bloonData["blimps"]

// document.querySelector document.querySelector document.querySelector DOCUMENT.MOTHERFUCKINGQUERYSELECTOR
const categorySelectButtonContainer = document.querySelector(".categorySelectButtonContainer")
const bloonButton = document.querySelector(".bloonButton")
const bloonStatsContainer = document.querySelector(".bloonStatsContainer")
const blimpStatsContainer = document.querySelector(".blimpStatsContainer")
const bloonTypeButtonContainer = document.querySelector(".bloonTypeButtonContainer")
const showBloonsButton = document.querySelector(".showBloonsButton")
const showBossesButton = document.querySelector(".showBossesButton")
const roundInputContainer = document.querySelector(".roundInputContainer")
const bossStatsContainer = document.querySelector(".bossStatsContainer")
const roundInput = document.querySelector(".roundInput")
const roundInputConfirm = document.querySelector(".roundInputConfirm")
const roundSelectionHeader = document.querySelector(".roundSelectionHeader")
const bossSelectionHeader = document.querySelector(".bossSelectionHeader")
const bossSelectedTierHeader = document.querySelector(".bossSelectedTierHeader")
const eliteBossSelectionHeader = document.querySelector(".eliteBossSelectionHeader")
const bossTypeDropdown = document.querySelector(".bossTypeDropdown")
const bossImage = document.querySelector(".bossImage")
const eliteBossImage = document.querySelector(".eliteBossImage")
const normalBossNumSkulls = document.querySelector(".normalBossNumSkulls")
const eliteBossNumSkulls = document.querySelector(".eliteBossNumSkulls")
const normalBossSpecialPropsContainer = document.querySelector(".normalBossSpecialPropsContainer")
const eliteBossSpecialPropsContainer = document.querySelector(".eliteBossSpecialPropsContainer")
const normalBossSkullEffectsContainer = document.querySelector(".normalBossSkullEffectsContainer")
const eliteBossSkullEffectsContainer = document.querySelector(".eliteBossSkullEffectsContainer")
const layer1Elems = [bloonTypeButtonContainer, categorySelectButtonContainer]
const layer2Elems = [bloonStatsContainer, bloonTypeButtonContainer, roundInputContainer, roundSelectionHeader, blimpStatsContainer, bossTypeDropdown, bossSelectionHeader, document.querySelector(".bossDataContainer"), eliteBossSelectionHeader]
const displayButtons = [showBloonsButton, showBossesButton]
let bloonDataLoaded = false

const popupContainer = document.querySelector(".popupContainer")
const popupTitle = document.querySelector(".popupTitle")
const popupContentContainer = document.querySelector(".popupContentContainer")
const statsPopupOverlay = document.querySelector(".popupOverlay")

const backButtonContainer = document.querySelector(".takeMeHomeContainer")

let urlParams = new URLSearchParams(window.location.search);
let urlType;
let urlRound;
let urlBoss;

function showBloonStats(round) {
  roundInput.value = ""
  roundInputContainer.style.display = "flex"
  roundSelectionHeader.innerText = `Bloon Stats at Round ${round}`
  roundSelectionHeader.style.display = "flex"
    for (const bloon of bloonList) {
      const bloonCard = document.createElement("div")
      bloonCard.classList.add("bloonCard")
      generateNameElem(bloon["name"], bloonCard)
      if (bloon.hasOwnProperty("image")) generateImageElem(bloon["image"], bloonCard)
      if (!bloon["name"].includes("Ceramic")) generateStatsElem(bloon, bloonCard) 
        else generateHealthElem(bloon, round, bloonCard) 
      generateSpeedElem(bloon, round, bloonCard)
      if (bloon["immuneTo"] != null) generateImmuneElem(bloon, bloonCard)
      generateChildrenElem(bloon, round, bloonCard)
      bloonStatsContainer.appendChild(bloonCard)
    }
    for (const blimp of blimpList) {
      const blimpCard = document.createElement("div")
      blimpCard.classList.add("blimpCard")
      generateNameElem(blimp["name"], blimpCard)
      generateFullNameElem(blimp["fullName"], blimpCard)
      generateHealthElem(blimp, round, blimpCard)
      generateSpeedElem(blimp, round, blimpCard)
      if (blimp["name"] == "DDT") generateImmuneElem(blimp, blimpCard)
      generateChildrenElem(blimp, round, blimpCard)
      blimpStatsContainer.appendChild(blimpCard)
    }
    bloonDataLoaded = true;
  bloonStatsContainer.style.display = "grid"
  blimpStatsContainer.style.display = "flex"
  bloonTypeButtonContainer.style.display = "flex"
  editURL("boss", null)
  editURL("type", "bloons")
  editURL("round", round)
}
function generateNameElem(name, parent) {
  const nameElem = document.createElement("h4")
  nameElem.classList.add("bloonName")
  nameElem.innerText = name;
  parent.appendChild(nameElem)
}
function generateFullNameElem(fullName, parent) {
  const fullNameElem = document.createElement("p")
  fullNameElem.classList.add("fullName")
  fullNameElem.innerText = fullName
  parent.appendChild(fullNameElem)
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
  layersElem.innerHTML = `Layers: <b>${bloon["layers"]}</b>`
  layersElem.onclick = () => {
    let layersHTML = `
    <p>The <b>layers</b> of a Bloon is how much damage you need to one-shot it. For example, a Black Bloon has <b>6 layers</b> because you need 6 damage to fully one-shot it.</p>
    `
    showPopup(`What are Layers?`,  layersHTML)
  }
  parent.appendChild(layersElem)
}
function generateHealthElem(bloon, round, parent) {
  let health;
  const healthElem = document.createElement("button")
  healthElem.classList.add("layersElem")
  if (bloon["name"] == "Ceramic Bloon") {
    health = round > 80 ? 60 : 10
    healthElem.onclick = () => {
      let healthHTML = `
      <p>After Round 80, Ceramics become Super Ceramics. Their HP increases from 10 to 60 (fortified from 20 to 120). In turn, everything below a MOAB will only spawn 1 child.</p>`
      showPopup(`About Super Ceramics`, healthHTML)
    }
  } else {
    let healthMult = calculateHealthMult(round)
    health = Number(bloon["health"] * healthMult)
    healthElem.onclick = () => {
      let healthHTML = `
      <p>Fortified Blimps always have double their normal HP.</p>`
      if (round > 80) {
        healthHTML += `
        <br><h2>Blimp HP Ramping Info</h2>
        <p>After Round 80, Blimps get extra HP each round on top of the extra speed that all Bloons get. The amount of HP they gain varies based on the Round.</p>
        <p>Blimps have <b>${healthMult.toLocaleString()}x</b> more HP than normal at Round ${round}.`
      }
      showPopup(`Fortified ${bloon["name"]}: ${(health * 2).toLocaleString()} HP`, healthHTML)
    }
  }
  healthElem.innerHTML = `HP: <b>${health.toLocaleString()}`
  parent.appendChild(healthElem)
}
function generateSpeedElem(bloon, round, parent) {
  const speedElem = document.createElement("button")
  speedElem.classList.add("speedElem")
  speedElem.innerHTML = `<b>${bloon["speed"]}x</b> Red Bloon speed`
  let speedMult = calculateSpeedMult(round)
  let totalSpeed = Number((bloon["speed"] * 25 * speedMult).toFixed(2))
  speedElem.onclick = () => {
    let speedHTML = `
    <h2>${totalSpeed.toLocaleString()} units per second</h2>
    <p>A Red Bloon at Round 1 moves at <b>25</b> units per second. A ${bloon["name"]} moves <b>${((totalSpeed / 25).toFixed(2)).toLocaleString()}x</b> faster than that at Round ${round}.</p>`
    if (round > 80) speedHTML += `<p>Bloons move <b>${speedMult.toLocaleString()}x faster</b> than their normal speed at Round ${round}.</p>`
    showPopup(`${bloon["name"]} Speed`, speedHTML)
  }
  parent.appendChild(speedElem)
}
function generateImmuneElem(bloon, parent) {
  const vaccineElem = document.createElement("p")
  vaccineElem.classList.add("immuneElem")
  vaccineElem.innerText = `Immunity: ${bloon["immuneTo"]}`
  parent.appendChild(vaccineElem)
}
function generateChildrenElem(bloon, round, parent) {
  const childrenElem = document.createElement("p")
  childrenElem.classList.add("childrenElem")
  const spawns = bloon["spawns"]
  if (round <= 80) {
    childrenElem.innerText = `Children: ${spawns}`
  } else {
    if (bloon["name"] == "Zebra Bloon") {
      childrenElem.innerText = `Children: 1x Black`
    } else if (bloon["name"] == "BAD") {
      childrenElem.innerText = `Children: ${spawns}`
    } else if (spawns.charAt(0) == "2") {
      childrenElem.innerText = `Children: 1x ${spawns.slice(3)}`;
    } else {
      childrenElem.innerText = `Children: ${bloon["spawns"]}`; 
    }
  }
  parent.appendChild(childrenElem)
}

function calculateHealthMult(r) {
  if (r <= 80) return 1
  else if (r <= 100) return (1 + (r - 80) * 0.02)
  else if (r <= 124) return (1.4 + (r - 100) * 0.05)
  else if (r <= 150) return (2.6 + (r - 124) * 0.15)
  else if (r <= 250) return (6.5 + (r - 150) * 0.35)
  else if (r <= 300) return (41.5 + (r - 250) * 1)
  else if (r <= 400) return (91.5 + (r - 300) * 1.5)
  else if (r <= 500) return (241.5 + (r - 400) * 2.5) 
  else return (491.5 + (r - 500) * 5)
}
function calculateSpeedMult(r) {
  if (r <= 80) return 1
  else if (r <= 100) return (1 + (r - 80) * 0.02)
  else if (r <= 150) return (1.6 + (r - 101) * 0.02)
  else if (r <= 200) return (3.0 + (r - 151) * 0.02)
  else if (r <= 250) return (4.5 + (r - 201) * 0.02)
  else return (6.0 + (r - 252) * 0.02)
}

function showBossStats(boss, tier) {
  if (boss != "bloonarius" && boss != "lych" && boss != "dreadbloon") boss = "bloonarius"
  for (const SOMEBODYONCETOLDME of document.querySelectorAll(".showMoreButton")) {
    SOMEBODYONCETOLDME.remove()
  }
  for (const THEWORLDWASGONNARULEME of document.querySelectorAll(".bossOverviewCard")) {
    THEWORLDWASGONNARULEME.classList.remove("selected")
  }
  for (const IAINTTHESHARPESTTOOLINTHESHED of document.querySelectorAll(".bossSkullDataContainer")) {
    while (IAINTTHESHARPESTTOOLINTHESHED.hasChildNodes()) IAINTTHESHARPESTTOOLINTHESHED.removeChild(IAINTTHESHARPESTTOOLINTHESHED.firstChild)
  }
  let shit = tier == null ? tier = 1 : tier
  bossSelectionHeader.innerText = `NORMAL ${boss.toUpperCase()}`
  eliteBossSelectionHeader.innerText = `ELITE ${boss.toUpperCase()}`
  bossSelectionHeader.style.display = "flex"
  eliteBossSelectionHeader.style.display = "flex"
  document.querySelector(`.bossOverviewCardET${shit}`).classList.add("selected")
  document.querySelector(`.bossOverviewCardNT${shit}`).classList.add("selected")
  getBossImage(boss)
  for (let i = 0; i < eliteBossData[boss].length; i++) {
    let currNormBoss = normalBossData[boss][i]
    let currEliteBoss = eliteBossData[boss][i]
    generateBossOverview(boss, currNormBoss, currEliteBoss, i + 1)
  }
  generateBossTierHeaders(tier, normalBossData[boss][tier - 1]["health"], eliteBossData[boss][tier - 1]["health"])
  switch (boss) {
    case "dreadbloon": showDreadbloon(tier); break;
    case "lych": showLych(tier); break;
    default: showBloonarius(tier); break;
  }
  document.querySelector(".bossDataContainer").style.display = "flex";
  bloonTypeButtonContainer.style.display = "flex"
  bossTypeDropdown.style.display = "flex"
  editURL("round", null)
  editURL("type", "bosses")
  editURL("boss", boss)
  editURL("tier", shit)
}
function getBossImage(name) {
  if (name == "bloonarius") {
    bossImage.src = "https://i.ibb.co/2hzPr5t/bloonarius.png";
    eliteBossImage.src = "https://i.ibb.co/HnhcNz9/elite-Bloonarius.png";
  } else if (name == "lych") {
    bossImage.src = "https://i.ibb.co/w4t4dX8/lych.png";
    eliteBossImage.src = "https://i.ibb.co/2h93hcJ/elite-Lych.png";
  } else if (name == "vortex") {
    bossImage.src = "https://i.ibb.co/w4Ng4nd/vortex.png";
    eliteBossImage.src = "https://i.ibb.co/j44bYsB/elite-Vortex.png";
  } else if (name == "dreadbloon") {
    bossImage.src = "https://i.ibb.co/hVF5PnP/dreadbloon.webp";
    eliteBossImage.src = "https://i.ibb.co/BgLNDHg/elite-Dreadbloon.webp";
  } else if (name == "phayze") {
    bossImage.src = "https://i.ibb.co/3dGxcC2/phayze.png";
    eliteBossImage.src = "https://i.ibb.co/JnjzyLQ/elite-Phayze.png";
  }
}
// bn is boss name, nb is normal boss, eb is elite boss, t is tier of the boss overview
// getting creative with variable names
function generateBossOverview(bn, nb, eb, t) {
  document.querySelector(`.overviewBossHPET${t}`).innerText = `${eb["health"].toLocaleString()} HP`
  document.querySelector(`.overviewBossSpeedET${t}`).innerText = `${eb["speed"]}x Red Bloon speed`
  if (!document.querySelector(`.bossOverviewCardET${t}`).classList.contains("selected")) {
    const showMoreButton = document.createElement("button")
    showMoreButton.classList.add("showMoreButton")
    showMoreButton.innerText = "Show More"
    showMoreButton.onclick = () => {
      showBossStats(bn, t)
    }
    document.querySelector(`.bossOverviewCardET${t}`).appendChild(showMoreButton)
  }
  document.querySelector(`.overviewBossHPNT${t}`).innerText = `${nb["health"].toLocaleString()} HP`
  document.querySelector(`.overviewBossSpeedNT${t}`).innerText = `${nb["speed"]}x Red Bloon speed`
  if (!document.querySelector(`.bossOverviewCardNT${t}`).classList.contains("selected")) {
    const showMoreButton = document.createElement("button")
    showMoreButton.classList.add("showMoreButton")
    showMoreButton.innerText = "Show More"
    showMoreButton.onclick = () => {

      showBossStats(bn, t)
    }
    document.querySelector(`.bossOverviewCardNT${t}`).appendChild(showMoreButton)
  }
}
function generateBossTierHeaders(tier, hp, eHP) {
  document.querySelector(".normalBossSelectedTierHeader").innerText = `Tier ${tier} - ${hp.toLocaleString()} HP`
  document.querySelector(".eliteBossSelectedTierHeader").innerText = `Tier ${tier} - ${eHP.toLocaleString()} HP`
}
function showBloonarius(tier) {
  const boss = normalBossData["bloonarius"][tier - 1]
  const eBoss = eliteBossData["bloonarius"][tier - 1]
  normalBossSpecialPropsContainer.innerHTML = `
  <p class="bossNumSkulls normalBossNumSkulls">Normal Bloonarius has 3 skulls.</p>
  <h4 class="bossPassiveHeader">Bloon Bleed</h4>
  <p class="bossPassiveDescription">Scatters <b>${eBoss["passive"]}</b> across the track every 1% HP lost.</p>
    `
  eliteBossSpecialPropsContainer.innerHTML = `
  <p class="bossNumSkulls normalBossNumSkulls">Elite Bloonarius has 7 skulls.</p>
  <h4 class="bossPassiveHeader">Bloon Bleed</h4>
  <p class="bossPassiveDescription">Scatters <b>${eBoss["passive"]}</b> across the track every 1% HP lost.</p>
  `
  const nbsdc = document.createElement("div")
  nbsdc.classList.add("bossSkullDataContainer")
  nbsdc.innerHTML = `
  <p class="bossOnSkull bloonariusOnSkull">Spawns <b>${boss["skullSpawns"]}</b>
  `
  normalBossSkullEffectsContainer.appendChild(nbsdc)
  const ebsdc = document.createElement("div")
  ebsdc.classList.add("bossSkullDataContainer")
  ebsdc.innerHTML = `
  <p class="bossOnSkull bloonariusOnSkull">Spawns <b>${eBoss["skullSpawns"]}</b>
  `
  eliteBossSkullEffectsContainer.appendChild(ebsdc)
}
function showLych(tier) {
  const boss = normalBossData["lych"][tier - 1]
  const eBoss = eliteBossData["lych"][tier - 1]
  const stealRange = tier < 5 ? "100" : "infinite"
  normalBossSpecialPropsContainer.innerHTML = `
  <p class="bossNumSkulls normalBossNumSkulls">Normal Lych has 5 skulls.</p>
  <h4 class="lychBuffSteal bossPassiveHeader"><b>Buff Life Leech</b></h4>
  <p class="bossPassiveDescription">Heals <b>2% max HP</b> for each buff stolen and stuns affected towers for <b>5 seconds</b>. At tier ${tier}, the life steal has <b>${stealRange} range.</b></p>
  <h4 class="lychBuffSteal bossPassiveHeader"><b>Sell Life Leech</b></h4>
  <p class="bossPassiveDescription">Lych heals <b>1% max HP</b> per highest tier on the tower. Crosspathing does not affect the sell steal.<br>
  For example, selling a 5-2-0 Dart Monkey heals Lych by 5%, and selling a 5-0-0 Dart Monkey will also heal Lych by 5%.</p>
  `
  eliteBossSpecialPropsContainer.innerHTML = `
  <p class="bossNumSkulls normalBossNumSkulls">Elite Lych has 7 skulls.</p>
  <h4 class="lychBuffSteal bossPassiveHeader"><b>Buff Life Leech</b></h4>
  <p class="bossPassiveDescription">Heals <b>4% max HP</b> for each buff stolen and stuns affected towers for <b>5 seconds</b>. At tier ${tier}, the life steal has <b>${stealRange} range.</b></p>
  <h4 class="lychBuffSteal bossPassiveHeader"><b>Sell Life Leech</b></h4>
  <p class="bossPassiveDescription">Lych heals <b>1% max HP</b> per highest tier on the tower. Crosspathing does not affect the sell steal.<br>
  For example, selling a 5-2-0 Dart Monkey heals Lych by 5%, and selling a 5-0-0 Dart Monkey will also heal Lych by 5%.</p>
  `
  const onSkull = boss["onSkull"]
  const eOnSkull = eBoss["onSkull"]
  const nbsdc = document.createElement("div")
  nbsdc.classList.add("bossSkullDataContainer")
  nbsdc.innerHTML = `
    <h4 class="bossPassiveHeader">Lych Soul - ${onSkull[0]["health"].toLocaleString()} HP</h4>
    <div class="bossSkullDescriptionContainer">
      <img src="https://i.ibb.co/WgFxgjW/lychSoul.png" class="bossOnSkullImage">
      <p class="bossOnSkull">Spawns a Lych Soul that moves at the same speed as a Red Bloon.<br>
      <b>While the Lych Soul is alive...</b><br><br>
      - Lych is completely invulnerable but moves slower.<br>
      - It takes away <b>${onSkull[0]["lifeSteal"]}</b> live(s) every 4 seconds.<br></p>
    </div>
    <h4 class="bossPassiveHeader">Reanimated Blimps</h4>
    <p class="bossPassiveDescription">Resurrects all Blimps popped within the <b>last 20 seconds</b> with increased stats.<br>
    Reanimated Blimps at tier ${tier} Normal have <b>${onSkull[1]["healthMultiplier"]}x more HP</b> and are <b>${onSkull[1]["speedMultiplier"]}x faster</b> than normal.</p>
  `
  normalBossSkullEffectsContainer.appendChild(nbsdc)
  const ebsdc = document.createElement("div")
  ebsdc.classList.add("bossSkullDataContainer")
  ebsdc.innerHTML = `
  <h4 class="bossPassiveHeader">Lych Soul - ${eOnSkull[0]["health"].toLocaleString()} HP</h4>
  <div class="bossSkullDescriptionContainer">
    <img src="https://i.ibb.co/WgFxgjW/lychSoul.png" class="bossOnSkullImage">
    <p class="bossOnSkull">Spawns a Lych Soul that moves at the same speed as a Red Bloon.<br>
    <b>While the Lych Soul is alive...</b><br><br>
    - It takes away <b>${eOnSkull[0]["lifeSteal"]}</b> live(s) every 4 seconds.<br>
    - Lych is completely invulnerable but moves slower.</p>
  </div>
  <h4 class="bossPassiveHeader">Reanimated Blimps</h4>
  <p class="bossPassiveDescription">Resurrects all Blimps popped within the <b>last 20 seconds</b> with increased stats.<br>
  Reanimated Blimps at tier ${tier} Elite have <b>${eOnSkull[1]["healthMultiplier"]}x more HP</b> and are <b>${eOnSkull[1]["speedMultiplier"]}x faster</b> than normal.</p>
  </div>
  `
  eliteBossSkullEffectsContainer.appendChild(ebsdc)
}
function showDreadbloon(tier) {
  const boss = normalBossData["dreadbloon"][tier - 1]
  const eBoss = eliteBossData["dreadbloon"][tier - 1]
  document.querySelector(".normalBossSelectedTierHeader").innerHTML += `<h4 class="bossPassiveHeader">${(boss["health"] * 3).toLocaleString()} HP including Shield</h4>`
  document.querySelector(".eliteBossSelectedTierHeader").innerHTML += `<h4 class="bossPassiveHeader">${(eBoss["health"] * 3).toLocaleString()} HP including Shield</h4>`
  normalBossSpecialPropsContainer.innerHTML = `
  <p class="bossPassiveDescription">Normal Dreadbloon has 3 skulls.</p>
  <h4 class="bossPassiveHeader">Immunities</h4>
  <p class="bossPassiveDescription"><b>Without Shield</b>: Has Lead properties.
  <p class="bossPassiveDescription"><b>Category Immunities</b>: Begins with an immunity to
  the Primary category. At each skull, the immunity cycles to Military, then Magic, then finally Support.</p>
  <h4 class="bossPassiveHeader">Dreadrock Bloons - ${boss["onSkull"]["health"].toLocaleString()} HP</h4>
  <div class="bossSkullDescriptionContainer">
    <img src="https://i.ibb.co/3TS4wVR/dread-Rock-Normal.webp" class="bossOnSkullImage">
    <p class="bossOnSkull">
      While the Rock Shield is active, Dreadrock Bloons spawn.
      Dreadrock Bloons spawn with the same category immunity Dreadbloon currently has.
      Dreadrock Bloons have Boss properties, so they'll take extra damage from Towers with a MOAB or Boss damage bonus.<br><br>
      At tier ${tier} Normal, Dreadrock Bloons take <b>${boss["onSkull"]["lifeLossOnLeak"]} lives</b> when they leak.
    </p>
  </div>
  </div>
  `
  eliteBossSpecialPropsContainer.innerHTML = `
  <p class=bossPassiveDescription>Elite Dreadbloon has 3 skulls.</p>
  <h4 class="bossPassiveHeader">Immunities</h4>
  <p class="bossPassiveDescription"><b>Without Shield</b>: Has Lead properties.
  <p class="bossPassiveDescription"><b>Category Immunities</b>: Begins with an immunity to
  the Primary category. At each skull, the immunity cycles to Military, then Magic, then finally Support.</p>
  <h4 class="bossPassiveHeader">Dreadrock Bloons - ${eBoss["onSkull"]["health"].toLocaleString()} HP</h4>
  <div class="bossSkullDescriptionContainer">
  <img src="https://i.ibb.co/hC473mC/dread-Rock-Elite.webp" class="bossOnSkullImage">
    <p class="bossOnSkull">
      While the Rock Shield is active, Dreadrock Bloons spawn.
      Dreadrock Bloons spawn with the same category immunity Dreadbloon currently has.
      Dreadrock Bloons have Boss properties, so they'll take extra damage from Towers with a MOAB or Boss damage bonus.<br><br>
      At tier ${tier} Elite, Dreadrock Bloons take <b>${eBoss["onSkull"]["lifeLossOnLeak"]} lives</b> when they leak.
    </p>
  </div>
  </div>
  `
  const nbsdc = document.createElement("div")
  nbsdc.classList.add("bossSkullDataContainer")
  nbsdc.innerHTML = `
  <h4 class="bossPassiveHeader">Rock Shield - ${(boss["health"] / 2).toLocaleString()} HP</h4>
  <p class="bossPassiveDescription">Summons a Rock Shield on spawn and at each skull which does <b>not</b> have Lead properties.
  Each shield has half the HP of the entire tier and has the same category immunity as Dreadbloon. This makes the total effective 
  health of tier ${tier} Normal Dreadbloon <b>${(boss["health"] * 3).toLocaleString()} HP</b>.<br><br>
  <b>WHILE ACTIVE</b>: Dreadbloon moves at 30% normal speed (<b>${((boss["speed"] * 0.3).toFixed(3)).toLocaleString()}x</b> Red Bloon speed)</p>
  `
  normalBossSkullEffectsContainer.appendChild(nbsdc)
  const ebsdc = document.createElement("div")
  ebsdc.classList.add("bossSkullDataContainer")
  ebsdc.innerHTML = `
  <h4 class="bossPassiveHeader">Rock Shield - ${(eBoss["health"] / 2).toLocaleString()} HP</h4>
  <p class="bossPassiveDescription">Summons a Rock Shield on spawn and at each skull which does <b>not</b> have Lead properties.
  Each shield has half the HP of the entire tier and has the same category immunity as Dreadbloon. This makes the total effective 
  health of tier ${tier} Elite Dreadbloon <b>${(eBoss["health"] * 3).toLocaleString()} HP</b>.<br><br>
  <b>WHILE ACTIVE</b>: Dreadbloon moves at 35% normal speed (<b>${((boss["speed"] * 0.35).toFixed(3)).toLocaleString()}x</b> Red Bloon speed)</p>
  `
  eliteBossSkullEffectsContainer.appendChild(ebsdc)
}

function swapSelection(selected, round, fromURL) {
  backButtonContainer.style.display = "flex"
  switch (selected) {
    case "bosses":
      hideLayers(2)
      let selectedBoss = fromURL ? urlBoss : bossTypeDropdown.value
      if (urlTier != null && (urlTier > 5 || urlTier < 1)) urlTier = 1
      if (selectedBoss == "") selectedBoss = "bloonarius"
      bossTypeDropdown.value = selectedBoss
      showBossStats(selectedBoss, urlTier)
      showBloonsButton.classList.remove("selected")
      showBossesButton.classList.add("selected")
      break;
    default: 
      hideLayers(2)
      if (round != null) showBloonStats(round) 
      else showBloonStats(1)
      showBossesButton.classList.remove("selected")
      showBloonsButton.classList.add("selected")
      break;
  }
}

function hideLayers(maxLayer) {
  for (const layer1Elem of layer1Elems) layer1Elem.style.display = "none"
  clearBloonStats()
  if (maxLayer == 2) {for (const layer2Elem of layer2Elems) layer2Elem.style.display = "none"}
}

function showPopup(title, content) {
  popupTitle.innerText = title
  popupContentContainer.innerHTML = content
  popupContainer.style.display = "block"
  popupOverlay.style.display = "block"
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
function clearBloonStats() {
  while (bloonStatsContainer.hasChildNodes()) bloonStatsContainer.removeChild(bloonStatsContainer.firstChild)
  while (blimpStatsContainer.hasChildNodes()) blimpStatsContainer.removeChild(blimpStatsContainer.firstChild)
}

bloonButton.onclick = () => {
  swapSelection(null, null, false)
}
showBloonsButton.onclick = () => {
  swapSelection("bloons", 1, false)
}
showBossesButton.onclick = () => {
  swapSelection("bosses", null, false)
}
bossTypeDropdown.addEventListener("change", () => {
  showBossStats(bossTypeDropdown.value, null)
})
document.querySelector(".jumpToEliteButton").onclick = () => {
  eliteBossImage.scrollIntoView({behavior: "smooth", block: "center"})
}

document.querySelector(".closePopupButton").onclick = () => {
  popupContainer.style.display = "none"
  statsPopupOverlay.style.display = "none"
}
backButtonContainer.onclick = () => {
  hideLayers(2)
  editURL("type", null)
  categorySelectButtonContainer.style.display = "flex"
  backButtonContainer.style.display = "none"
  const params = [...urlParams.entries()];
  params.forEach((entry) => {
    const [key, value] = entry;
    urlParams.delete(key);
  })
  window.history.replaceState(null, document.title, window.location.pathname)
}
roundInputConfirm.onclick = () => {
  hideLayers(2)
  let round;
  let input = Math.floor(Number(roundInput.value))
  if (input < 1) {
    round = 1
  } else if (input > 2147548) {
    alert("Round 2,147,548 is the highest round in Bloons TD 6.")
    round = 2147548
  } else {
    round = input
  }
  roundInput.innerText = "none"
  showBloonStats(round)
}

function main() {
  urlType = urlParams.get("type")
  urlRound = urlParams.get("round")
  urlBoss = urlParams.get("boss")
  urlTier = Number(urlParams.get("tier"))
  if (urlType == "bloons") {
    if (urlRound != null) swapSelection(urlType, urlRound, true)
    else swapSelection(urlType, 1, true)
  } else if (urlType == "bosses") {
    swapSelection(urlType, urlTier, true)
  } else {
    const params = [...urlParams.entries()];
    params.forEach((entry) => {
      const [key, value] = entry;
      urlParams.delete(key);
    })
    window.history.replaceState(null, document.title, window.location.pathname)
  }
}
main()