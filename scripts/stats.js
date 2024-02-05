let bloonData
let normalBossData
let eliteBossData

let bloonList
let blimpList

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
const towerButton = document.querySelector(".towerButton")

const backButtonContainer = document.querySelector(".takeMeHomeContainer")

let urlParams = new URLSearchParams(window.location.search);
let urlType;
let urlRound;
let urlBoss;

async function getData() {
  try {
    bloonData = await (await fetch("https://raw.githubusercontent.com/Nitjus7/BTD6-Central-Data/main/stats/bloons/bloons.json")).json()
    bloonList = bloonData["bloons"]
    blimpList = bloonData["blimps"]
    normalBossData = await (await fetch("https://raw.githubusercontent.com/Nitjus7/BTD6-Central-Data/main/stats/bloons/normalBosses.json")).json()
    eliteBossData = await (await fetch("https://raw.githubusercontent.com/Nitjus7/BTD6-Central-Data/main/stats/bloons/eliteBosses.json")).json()
  } catch (error) {
    alert("There was an error while getting bloon data. Some features may not work.")
    console.log(error)
  }
}
function showBloonStats(round) {
  roundInput.value = ""
  roundInputContainer.style.display = "flex"
  roundSelectionHeader.innerText = `Bloon Stats at Round ${round}`
  roundSelectionHeader.style.display = "flex"
  let i = 0
  for (const data of bloonList) {
    if (data["name"] == "Ceramic Bloon" && round > 80) data["name"] = "Super Ceramic"
    if (data["name"] == "Super Ceramic" && round < 80) data["name"] = "Ceramic Bloon"
    const container = document.createElement("div")
    container.className = "bloonCard"
    let html = `
      <div class="nameElem">
        <img src="${data["image"]}" alt="Image of a ${data["name"]}" class="bloonImage"></img>
        <h3 class="bloonName">${data["name"]}</h3>
      </div>`

    if (data["name"].includes("Ceramic")) {
      let health
      if (round > 80) health = 60
      else health = 10
      html += `
        <div class="healthElem">
          <p class="bloonHealth">${health} HP</p>
          <p class="bloonHealth fortified">Fortified: ${health * 2} HP</p>
          <span class="material-symbols-outlined infoButton superCeramicInfoButton">info</span>
        </div>`
    }

    const speedMult = calculateSpeedMult(round)
    html += `
    <div class="speedElem">
      <p class="bloonSpeed">${(data["speed"] * 25 * speedMult).toLocaleString()} units/sec</p>
      <span class="material-symbols-outlined infoButton speedInfoButton">info</span>
    </div>`

    if (data["immuneTo"]) {
      html += `
        <div class="vaccineElem">
          <p class="immuneTo">Immunities: ${data["immuneTo"]}</p>
        </div>`
    }

    if (data["spawns"]) {
      html += `
        <div class="childrenElem">
          <p class="children">${getChildren(data, round)}</p>
        </div>
      `
    }
    container.innerHTML = html
    container.querySelector(".speedInfoButton").onclick = () => {
      let popupHTML = `
        <p>A Red Bloon at round 1 moves at 25 units per second. A ${data["name"]} moves at 
        <b>${(data["speed"] * speedMult).toLocaleString()}x</b> that speed at round ${round}.</p> 
      `
      showPopup("About Speed", popupHTML)
    }
    if (container.querySelector(".superCeramicInfoButton")) {
      container.querySelector(".superCeramicInfoButton").onclick = () => {
        let popupHTML = `
        <p>After Round 80, Ceramics turn into Super Ceramics which have 60 HP, and all Bloons below a MOAB will
        only spawn one child each.</p> 
        `
        showPopup("About Super Ceramics", popupHTML)
      }
    }
    bloonStatsContainer.appendChild(container)
  }

  for (const data of blimpList) {
    const container = document.createElement("div")
    container.className = "blimpCard"
    let html = `
      <div class="nameElem">
        <img src="${data["image"]}" alt="Image of a ${data["name"]}" class="bloonImage"></img>
        <h3 class="bloonName">${data["name"]}</h3>
      </div>
      <div class="healthElem">
        <p class="bloonHealth">${data["health"].toLocaleString()} HP</p>
        <p class="bloonHealth fortified">Fortified: ${(data["health"] * 2).toLocaleString()} HP</p>
      </div>
      `
    const speedMult = calculateSpeedMult(round)
    html += `
    <div class="speedElem">
      <p class="bloonSpeed">${(data["speed"] * 25 * speedMult).toLocaleString()} units/sec</p>
      <span class="material-symbols-outlined infoButton speedInfoButton">info</span>
    </div>`

    if (data["immuneTo"]) {
      html += `
        <div class="vaccineElem">
          <p class="immuneTo">Immunities: ${data["immuneTo"]}</p>
        </div>`
    }

    if (data["spawns"]) {
      html += `
        <div class="childrenElem">
          <p class="children">${getChildren(data, round)}</p>
        </div>
      `
    }
    container.innerHTML = html
    container.querySelector(".speedInfoButton").onclick = () => {
      let popupHTML = `
        <p>A Red Bloon at round 1 moves at 25 units per second. A ${data["name"]} moves at 
        <b>${(data["speed"] * speedMult).toLocaleString()}x</b> that speed at round ${round}.</p> 
      `
      showPopup("About Speed", popupHTML)
    }
    blimpStatsContainer.appendChild(container)
  }

  bloonDataLoaded = true
  bloonStatsContainer.style.display = "grid"
  blimpStatsContainer.style.display = "flex"
  bloonTypeButtonContainer.style.display = "flex"
  editURL("boss", null)
  editURL("type", "bloons")
  editURL("round", round)
}
function generateStatsElem(bloon, parent) {
  const layersElem = document.createElement("p")
  layersElem.classList.add("layersElem")
  layersElem.innerHTML = `Layers: <b>${bloon["layers"]}</b>`
  parent.appendChild(layersElem)
}
function generateHealthElem(bloon, round, parent) {
  let health;
  const healthElem = document.createElement("p")
  healthElem.classList.add("layersElem")
  if (bloon["name"] == "Ceramic Bloon") {
    health = round > 80 ? 60 : 10
  } else {
    let healthMult = calculateHealthMult(round)
    health = Number(bloon["health"] * healthMult)
  }
  healthElem.innerHTML = `HP: <b>${health.toLocaleString()}`
  parent.appendChild(healthElem)
}
function generateSpeedElem(bloon, round, parent) {
  const speedElem = document.createElement("p")
  speedElem.classList.add("speedElem")
  speedElem.innerHTML = `<b>${(bloon["speed"] * 100).toLocaleString()}%</b> Red Bloon speed`
  let speedMult = calculateSpeedMult(round)
  let totalSpeed = Number((bloon["speed"] * 25 * speedMult).toFixed(2))
  parent.appendChild(speedElem)
}
function generateImmuneElem(bloon, parent) {
  const vaccineElem = document.createElement("p")
  vaccineElem.classList.add("immuneElem")
  vaccineElem.innerText = `Immunity: ${bloon["immuneTo"]}`
  parent.appendChild(vaccineElem)
}
function getChildren(bloon, round) {
  const childrenElem = document.createElement("p")
  childrenElem.classList.add("childrenElem")
  const spawns = bloon["spawns"]
  if (round <= 80) {
    return `Children: ${spawns}`
  } else {
    if (bloon["name"] == "Zebra Bloon") {
      return `Children: 1x Black`
    } else if (bloon["name"] == "BAD") {
      return `Children: ${spawns}`
    } else if (spawns.charAt(0) == "2") {
      return `Children: 1x ${spawns.slice(3)}`;
    } else {
      return `Children: ${bloon["spawns"]}`; 
    }
  }
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
  if (boss != "bloonarius" && boss != "lych" && boss != "vortex" && boss != "dreadbloon" && boss != "phayze") boss = "bloonarius"
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
  bossSelectionHeader.innerText = `Normal ${boss.charAt(0).toUpperCase() + boss.slice(1)}`
  eliteBossSelectionHeader.innerText = `Elite ${boss.charAt(0).toUpperCase() + boss.slice(1)}`
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
  showBoss(boss, tier)
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
  document.querySelector(`.overviewBossSpeedET${t}`).innerText = `${(eb["speed"] * 100).toFixed(2).toLocaleString()}% Red Bloon speed`
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
  document.querySelector(`.overviewBossSpeedNT${t}`).innerText = `${(nb["speed"] * 100).toFixed(2).toLocaleString()}% Red Bloon speed`
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
function showBoss(bossName, tier) {
  let normalBossPassiveHTML;
  let normalBossOnSkullHTML;
  let eliteBossPassiveHTML;
  let eliteBossOnSkullHTML;
  const boss = normalBossData[bossName][tier - 1]
  const eBoss = eliteBossData[bossName][tier - 1]
  const onSkull = boss["onSkull"]
  const eOnSkull = eBoss["onSkull"]
  if (bossName == "lych") {
    const stealRange = tier < 5 ? "100" : "infinite"
    normalBossPassiveHTML = `
    <p class="bossNumSkulls normalBossNumSkulls">Normal Lych has 5 skulls.</p>
    <h4 class="lychBuffSteal bossPassiveHeader"><b>Buff Life Leech</b></h4>
    <p class="bossPassiveDescription">Heals <b>2% max HP</b> for each buff stolen and stuns affected towers for <b>5 seconds</b>. At tier ${tier}, the life steal has <b>${stealRange} range.</b></p>
    <h4 class="lychBuffSteal bossPassiveHeader"><b>Sell Life Leech</b></h4>
    <p class="bossPassiveDescription">Lych heals <b>1% max HP</b> per highest tier on the tower. Crosspathing does not affect the sell steal.<br>
    For example, selling a 5-2-0 Dart Monkey heals Lych by 5%, and selling a 5-0-0 Dart Monkey will also heal Lych by 5%.</p>
    `
    normalBossOnSkullHTML = `
    <h4 class="bossPassiveHeader">Lych Soul - ${onSkull[0]["health"].toLocaleString()} HP</h4>
    <div class="bossSkullDescriptionContainer">
      <img src="https://i.ibb.co/WgFxgjW/lychSoul.png" class="bossOnSkullImage">
      <ul class="bossOnSkull bossPassiveDescriptionList">
        <li class="">Spawns a Lych Soul that moves at the same speed as a Red Bloon.</li>
        <li class="">It takes away <b>${onSkull[0]["lifeSteal"]}</b> live(s) every 4 seconds.</li>
        <li class="">While alive, Lych is completely invulnerable but moves slower.</li></ul>
    </div>
    <h4 class="bossPassiveHeader">Reanimated Blimps</h4>
    <p class="bossPassiveDescription">Resurrects all Blimps popped within the <b>last 20 seconds</b> with increased stats.<br>
    Reanimated Blimps at tier ${tier} Normal have <b>${onSkull[1]["healthMultiplier"]}x more HP</b> and are <b>${onSkull[1]["speedMultiplier"]}x faster</b> than normal.</p>
    `
    eliteBossPassiveHTML = `
    <p class="bossNumSkulls normalBossNumSkulls">Elite Lych has 7 skulls.</p>
    <h4 class="lychBuffSteal bossPassiveHeader"><b>Buff Life Leech</b></h4>
    <p class="bossPassiveDescription">Heals <b>4% max HP</b> for each buff stolen and stuns affected towers for <b>5 seconds</b>. At tier ${tier}, the life steal has <b>${stealRange} range.</b></p>
    <h4 class="lychBuffSteal bossPassiveHeader"><b>Sell Life Leech</b></h4>
    <p class="bossPassiveDescription">Lych heals <b>1% max HP</b> per highest tier on the tower. Crosspathing does not affect the sell steal.<br>
    For example, selling a 5-2-0 Dart Monkey heals Lych by 5%, and selling a 5-0-0 Dart Monkey will also heal Lych by 5%.</p>
    `
    eliteBossOnSkullHTML = `
    <h4 class="bossPassiveHeader">Lych Soul - ${eOnSkull[0]["health"].toLocaleString()} HP</h4>
    <div class="bossSkullDescriptionContainer">
      <img src="https://i.ibb.co/WgFxgjW/lychSoul.png" class="bossOnSkullImage">
      <ul class="bossOnSkull bossPassiveDescriptionList">
        <li class="">Spawns a Lych Soul that moves at the same speed as a Red Bloon.</li>
        <li class="">It takes away <b>${eOnSkull[0]["lifeSteal"]}</b> live(s) every 4 seconds.</li>
        <li class="">Lych is completely invulnerable but moves slower.</li></ul>
    </div>
  <h4 class="bossPassiveHeader">Reanimated Blimps</h4>
  <p class="bossPassiveDescription">Resurrects all Blimps popped within the <b>last 20 seconds</b> with increased stats.<br>
  Reanimated Blimps at tier ${tier} Elite have <b>${eOnSkull[1]["healthMultiplier"]}x more HP</b> and are <b>${eOnSkull[1]["speedMultiplier"]}x faster</b> than normal.</p>
  </div>
  `
  } else if (bossName == "dreadbloon") {
    document.querySelector(".normalBossSelectedTierHeader").innerHTML += `<h4 class="bossPassiveHeader">${(boss["health"] * 3).toLocaleString()} HP including Shield</h4>`
    document.querySelector(".eliteBossSelectedTierHeader").innerHTML += `<h4 class="bossPassiveHeader">${(eBoss["health"] * 3).toLocaleString()} HP including Shield</h4>`
    normalBossPassiveHTML = `
    <p class="bossPassiveDescription">Normal Dreadbloon has 3 skulls.</p>
    <h4 class="bossPassiveHeader">Immunities</h4>
    <p class="bossPassiveDescription"><b>Without Shield</b>: Has Lead properties.
    <p class="bossPassiveDescription"><b>Category Immunities</b>: Begins with an immunity to
    the Primary category. At each skull, the immunity cycles to Military, then Magic, then finally Support.</p>
    <h4 class="bossPassiveHeader">Dreadrock Bloons - ${boss["onSkull"]["health"].toLocaleString()} HP</h4>
    <div class="bossSkullDescriptionContainer">
      <img src="https://i.ibb.co/3TS4wVR/dread-Rock-Normal.webp" class="bossOnSkullImage">
      <ul class="bossOnSkull bossPassiveDescriptionList">
        <li class="">While the Rock Shield is active, Dreadrock Bloons spawn.</li>
        <li class="">Dreadrock Bloons spawn with the same category immunity Dreadbloon currently has.</li>
        <li class="">Dreadrock Bloons have Boss properties, so they'll take extra damage from Towers with a MOAB or Boss damage bonus.</li>
        <li class="">At tier ${tier}, Dreadrock Bloons take <b>${boss["onSkull"]["lifeLossOnLeak"]} lives</b> when they leak.</li>
      </ul>
    </div>
    </div>
    `
    normalBossOnSkullHTML = `
    <h4 class="bossPassiveHeader">Rock Shield - ${(boss["health"] / 2).toLocaleString()} HP</h4>
    <ul class="bossPassiveDescriptionList">
      <li class="">Summons a Rock Shield on spawn and at each skull which does <b>not</b> have Lead properties.</li>
      <li class="">Each shield has half the HP of the entire tier and has the same category immunity as Dreadbloon. This makes the total effective 
        health of tier ${tier} Normal Dreadbloon <b>${(boss["health"] * 3).toLocaleString()} HP</b>.</li>
      <li class=""><b>WHILE ACTIVE</b>: Dreadbloon moves at 35% normal speed (<b>${(boss["speed"] * 0.35 * 100).toFixed(2).toLocaleString()}%</b> Red Bloon speed)</li>
    </ul>
    `
    eliteBossPassiveHTML = `
    <p class="bossPassiveDescription">Elite Dreadbloon has 3 skulls.</p>
    <h4 class="bossPassiveHeader">Immunities</h4>
    <p class="bossPassiveDescription"><b>Without Shield</b>: Has Lead properties.
    <p class="bossPassiveDescription"><b>Category Immunities</b>: Begins with an immunity to
    the Primary category. At each skull, the immunity cycles to Military, then Magic, then finally Support.</p>
    <h4 class="bossPassiveHeader">Dreadrock Bloons - ${eBoss["onSkull"]["health"].toLocaleString()} HP</h4>
    <div class="bossSkullDescriptionContainer">
      <img src="https://i.ibb.co/hC473mC/dread-Rock-Elite.webp" class="bossOnSkullImage">
      <ul class="bossOnSkull bossPassiveDescriptionList">
        <li class="">While the Rock Shield is active, Dreadrock Bloons spawn.</li>
        <li class="">Dreadrock Bloons spawn with the same category immunity Dreadbloon currently has.</li>
        <li class="">Dreadrock Bloons have Boss properties, so they'll take extra damage from Towers with a MOAB or Boss damage bonus.</li>
        <li class="">At tier ${tier}, Dreadrock Bloons take <b>${eBoss["onSkull"]["lifeLossOnLeak"]} lives</b> when they leak.</li>
      </ul>
    </div>
    </div>
    `
    eliteBossOnSkullHTML = `
    <h4 class="bossPassiveHeader">Rock Shield - ${(eBoss["health"] / 2).toLocaleString()} HP</h4>
    <ul class="bossPassiveDescriptionList">
      <li class="">Summons a Rock Shield on spawn and at each skull which does <b>not</b> have Lead properties.</li>
      <li class="">Each shield has half the HP of the entire tier and has the same category immunity as Dreadbloon. This makes the total effective 
        health of tier ${tier} Elite Dreadbloon <b>${(eBoss["health"] * 3).toLocaleString()} HP</b>.</li>
      <li class=""><b>WHILE ACTIVE</b>: Dreadbloon moves at 35% normal speed (<b>${((boss["speed"] * 100 * 0.35).toFixed(2)).toLocaleString()}%</b> Red Bloon speed)</li>
    </ul>
    `
  } else if (bossName == "phayze") {
    document.querySelector(".normalBossSelectedTierHeader").innerHTML += `<h4 class="bossPassiveHeader">${(boss["health"] * 2).toLocaleString()} HP including Shield</h4>`
    document.querySelector(".eliteBossSelectedTierHeader").innerHTML += `<h4 class="bossPassiveHeader">${(eBoss["health"] * 2.5).toLocaleString()} HP including Shield</h4>`
    normalBossPassiveHTML = `
    <p class="bossNumSkulls">Normal Phayze has 3 skulls.</p>
    <p>Phayze spawns with the Camo property.</p>
    <h4 class="bossPassiveHeader">Radar Jam</h4>
    <ul class="bossPassiveDescriptionList">
      <li>Applies every <b>24 seconds</b> and the effects last for <b>12 seconds</b>.</li>
      <li>Disables all Camo-granting buffs on screen and becomes immune to Camo removal.</li>
      <li>Warps all Bloons behind Phayze directly below Phayze and gives them Camo (does not apply Camo to Blimps).</li>
      <li>Regains the Camo property if it was removed.</li>
    </ul>
    <h4 class="bossPassiveHeader">Tower Glitch</h4>
    <ul class="bossPassiveDescriptionList">
      <li>Slows the attack speed of all Towers on the entire screen based on the Skull.</li>
      <li>After 1st skull: <b>${onSkull[0]["strength"][0]}x</b> attack delay</li>
      <li>After 2nd skull: <b>${onSkull[0]["strength"][1]}x</b> attack delay</li>
      <li>After 3rd skull: <b>${onSkull[0]["strength"][2]}x</b> attack delay</li>
    </ul>
      `
    normalBossOnSkullHTML = `
    <h4 class="bossPassiveHeader">Hyper Warp</h4>
    <ul class="bossPassiveDescriptionList">
      <li>Phayze warps forward <b>8%</b> of the total track length.</li>
      <li>Phayze is immune to all damage during the warp.</li>
      <li>Opens a tear in reality where its dash started, causing all new Bloons to spawn at that location instead.</li>
    </ul>
    <h4 class="bossPassiveHeader">Reality Shield - ${(boss["health"] / 4).toLocaleString()} HP</h4>
    <ul class="bossPassiveDescriptionList">
      <li>Gains a Reality Shield once at spawn and at each Skull.</li>
      <li>The Reality Shield has 1/4 the HP of the entire Boss.</li>
      <li>At tier ${tier}, Phayze moves <b>${onSkull[1]["speedBonusPercent"]}% faster</b> (${(boss["speed"] * ((onSkull[1]["speedBonusPercent"] + 100)/100) * 100).toLocaleString()}% Red Bloon speed) while the Reality Shield is up.</li>
    </ul>`
    eliteBossPassiveHTML = `
    <p class="bossNumSkulls">Elite Phayze has 5 skulls.</p>
    <p>Phayze spawns with the Camo property.</p>
    <h4 class="bossPassiveHeader">Radar Jam</h4>
    <ul class="bossPassiveDescriptionList">
      <li>Applies every <b>24 seconds</b> and the effects last for <b>12 seconds</b>.</li>
      <li>Disables all Camo-granting buffs on screen and becomes immune to Camo removal.</li>
      <li>Warps all Bloons behind Phayze directly below Phayze and gives them Camo (does not apply Camo to Blimps).</li>
      <li>Regains the Camo property if it was removed.</li>
    </ul>
    <h4 class="bossPassiveHeader">Tower Glitch</h4>
    <ul class="bossPassiveDescriptionList">
      <li>Slows the attack speed of all Towers on the entire screen based on the Skull.</li>
      <li>After 1st skull: <b>${eOnSkull[0]["strength"][0]}x</b> attack delay</li>
      <li>After 2nd skull: <b>${eOnSkull[0]["strength"][1]}x</b> attack delay</li>
      <li>After 3rd skull: <b>${eOnSkull[0]["strength"][2]}x</b> attack delay</li>
      <li>After 4th skull: <b>${eOnSkull[0]["strength"][3]}x</b> attack delay</li>
      <li>After 5th skull: <b>${eOnSkull[0]["strength"][4]}x</b> attack delay</li>
    </ul>
      `
    eliteBossOnSkullHTML = `
    <h4 class="bossPassiveHeader">Hyper Warp</h4>
    <ul class="bossPassiveDescriptionList">
      <li>Phayze warps forward <b>8%</b> of the total track length.</li>
      <li>Phayze is immune to all damage during the warp.</li>
      <li>Opens a tear in reality where its dash started, causing all new Bloons to spawn at that location instead.</li>
    </ul>
    <h4 class="bossPassiveHeader">Reality Shield - ${(eBoss["health"] / 4).toLocaleString()} HP</h4>
    <ul class="bossPassiveDescriptionList">
      <li>Gains a Reality Shield once at spawn and at each Skull.</li>
      <li>The Reality Shield has 1/4 the HP of the entire Boss.</li>
      <li>At tier ${tier}, Phayze moves <b>${eOnSkull[1]["speedBonusPercent"]}% faster</b> (${(eBoss["speed"] * ((eOnSkull[1]["speedBonusPercent"] + 100)/100) * 100).toLocaleString()}% Red Bloon speed) while the Reality Shield is up.</li>
    </ul>`
  } else if (bossName == "vortex") {
    normalBossPassiveHTML = `
    <p class="bossNumSkulls normalBossNumSkulls">Normal Vortex has 3 skulls.</p>
    <h4 class="bossPassiveHeader">Projectile Destruction</h4>
    <p class="bossPassiveDescription">Every 5 seconds, all projectiles within <b>60 range</b> are immediately destroyed.</p>
    <h4 class="bossPassiveHeader">Slipstream</h4>
    <p class="bossPassiveDescription">All Bloons behind Vortex and in other lanes get a <b>2.5x</b> movement speed increase.</p>
    `
    normalBossOnSkullHTML = `
    <h4 class="bossPassiveHeader">Lightning Shock</h4>
    <p class="bossPassiveDescription">All Towers (including Paragons!) within ${onSkull["range"]} range are stunned for <b>${onSkull["duration"]} seconds</b></p>
    <h4 class="bossPassiveHeader">RETREAT!</h4>
    <p class="bossPassiveDescription">Vortex retreats a significant distance back on the track (by 100 units).</p>
    <h4 class="bossPassiveHeader">Storm Shield</h4>
    <ul class="bossPassiveDescriptionList">
      <li>Gains a Wind Shield on spawn and at each Skull which lasts for <b>6 seconds</b>.</li>
      <li>Reflects <b>all</b> projectiles except instant-hitters (like a Sniper Monkey or First Strike).</li>
    </ul>
    `
    eliteBossPassiveHTML = `
    <p class="bossNumSkulls normalBossNumSkulls">Elite Vortex has 7 skulls.</p>
    <h4 class="bossPassiveHeader">Projectile Destruction</h4>
    <p class="bossPassiveDescription">Every 5 seconds, all projectiles within <b>60 range</b> are immediately destroyed.</p>
    <h4 class="bossPassiveHeader">Slipstream</h4>
    <p class="bossPassiveDescription">All Bloons behind Vortex and in other lanes get a <b>2.5x</b> movement speed increase.</p>
    `
    eliteBossOnSkullHTML = `
    <h4 class="bossPassiveHeader">Lightning Shock</h4>
    <p class="bossPassiveDescription">All Towers (including Paragons!) within ${eOnSkull["range"]} range are stunned for <b>${eOnSkull["duration"]} seconds</b></p>
    <h4 class="bossPassiveHeader">RETREAT!</h4>
    <p class="bossPassiveDescription">Vortex retreats a significant distance back on the track (by 100 units).</p>
    <h4 class="bossPassiveHeader">Storm Shield</h4>
    <ul class="bossPassiveDescriptionList">
      <li>Gains a Wind Shield on spawn and at each Skull which lasts for <b>6 seconds</b>.</li>
      <li>Reflects <b>all</b> projectiles except instant-hitters (like a Sniper Monkey or First Strike).</li>
    </ul>
    `
  } else { // shows bloonarius
    normalBossPassiveHTML = `
    <p class="bossNumSkulls normalBossNumSkulls">Normal Bloonarius has 3 skulls.</p>
    <h4 class="bossPassiveHeader">Bloon Bleed</h4>
    <p class="bossPassiveDescription">Scatters <b>${boss["passive"]}</b> across the track every 1% HP lost.</p>
      `
    normalBossOnSkullHTML = `<p class="bossOnSkull bloonariusOnSkull">Spawns <b>${boss["skullSpawns"]}</b>`
    eliteBossPassiveHTML = `
    <p class="bossNumSkulls normalBossNumSkulls">Elite Bloonarius has 7 skulls.</p>
    <h4 class="bossPassiveHeader">Bloon Bleed</h4>
    <p class="bossPassiveDescription">Scatters <b>${eBoss["passive"]}</b> across the track every 1% HP lost.</p>`
    eliteBossOnSkullHTML = `<p class="bossOnSkull bloonariusOnSkull">Spawns <b>${eBoss["skullSpawns"]}</b>`
  }
  normalBossSpecialPropsContainer.innerHTML = normalBossPassiveHTML
  eliteBossSpecialPropsContainer.innerHTML = eliteBossPassiveHTML
  const nbsdc = document.createElement("div")
  nbsdc.classList.add("bossSkullDataContainer")
  nbsdc.innerHTML = normalBossOnSkullHTML
  const ebsdc = document.createElement("div")
  ebsdc.classList.add("bossSkullDataContainer")
  ebsdc.innerHTML = eliteBossOnSkullHTML
  normalBossSkullEffectsContainer.appendChild(nbsdc)
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
  popupContainer.showModal()
  popupContainer.classList.add("open")
  document.body.classList.add("no-scroll")
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
towerButton.onclick = () => {
  window.location.replace("towers.html")
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
  popupContainer.classList.remove("open")
  document.body.classList.remove("no-scroll")
  setTimeout(() => {
    popupContainer.close();
  }, 300);
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

async function main() {
  await getData()
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