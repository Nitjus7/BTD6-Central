const paragonDegreeInput = document.querySelector(".paragonDegreeInput")
const paragonContainer = document.querySelector(".paragonContainer")
const selectDegreeCheck = document.querySelector("#pikachuIChooseYou")
const calculateDegreeCheck = document.querySelector("#charizardIChooseYou")
const calculateParagonDegreeButton = document.querySelector(".calculateParagonDegreeButton")

const dataContainers = [paragonContainer]
let monkeyList = document.querySelectorAll(".monkey")
let heroList = document.querySelectorAll(".hero")
let paragonList = document.querySelectorAll(".paragon")
let parentList = [monkeyList, heroList, paragonList]

let monkeyData;
let heroData;
let paragon;
let costs;

const backButton = document.querySelector(".takeMeHome")
let urlTower;
let urlParagon;
let urlLevel;
let urlParams = new URLSearchParams(window.location.search);

const filterSelect = document.querySelector(".filterSelect")
let appliedFilter = "noWIP" // placeholder
const powerDegreeRequirements = [
    2000,2324,2666,3027,3408,3808,4228,4669,5131,5615,6121,6650,7203,7779,8379,9004,9654,
    10330,11032,11761,12518,13302,14114,14955,15825,16725,17655,18616,19609,20633,21689,22778,
    23900,25056,26246,27471,28732,30028,31360,32729,34135,35579,37061,38582,40143,41743,43383,
    45064,46786,48550,50356,52205,54098,56034,58014,60039,62109,64225,66387,68596,70853,73157,
    75509,77910,80360,82860,85410,88011,90664,93368,96124,98933,101795,104711,107681,110706,113787,
    116923,120115,123364,126670,130034,133456,136937,140478,144078,147738,151459,155241,159085,162991,
    166960,170993,175089,179249,183474,187764,192120,200000
 ]

class Paragon {
    constructor(paragonData) {
        this.paragon = structuredClone(paragonData)
    }
    // x is for degree
    applyDegreeBonus(x) {
        let cp = structuredClone(this.paragon)
        if (cp.hasOwnProperty("abilities")) {
            for (const abilityModel of cp["abilities"]) {
                abilityModel["cooldown"] = formatNumber(abilityModel["cooldown"] / (1 + Math.sqrt((x-1) * 50) * 0.01))
                if (abilityModel.hasOwnProperty("emits")) {
                    for (const emissionModel of abilityModel["emits"]) applyDegreeBonusForSubEffects(emissionModel, x)
                }
            }
        }
        for (let i = 0; i < cp["attacks"].length; i++) {
            let attackModel = cp["attacks"][i]
            if (attackModel.hasOwnProperty("rate")) attackModel["rate"] = formatNumber(attackModel["rate"] / (1 + Math.sqrt((x-1) * 50) * 0.01))
            if (attackModel["type"] != "subtower") {
                if (attackModel["pierce"] != null) attackModel["pierce"] = x != 100 ? formatNumber(attackModel["pierce"] * (1 + 0.01 * (x - 1)) + (x - 1)) : attackModel["pierce"] * 2 + 100
                else attackModel["pierce"] = 1
                let dmgModel = attackModel["dmg"]
                dmgModel["base"] = x != 100 ? formatNumber(dmgModel["base"] * (1 + (x-1)*0.01) + Math.floor((x-1)/10)) : formatNumber(dmgModel["base"] * 2 + 10)
                if (dmgModel.hasOwnProperty("bonusCeram")) dmgModel["bonusCeram"] *= formatNumber(1 + (x-1)*0.01)
                if (dmgModel.hasOwnProperty("bonusMOAB")) dmgModel["bonusMOAB"] *= formatNumber(1 + (x-1)*0.01)
                if (dmgModel.hasOwnProperty("bonusCamo")) dmgModel["bonusCamo"] *= formatNumber(1 + (x-1)*0.01)
                if (dmgModel.hasOwnProperty("bonusBoss")) dmgModel["bonusBoss"] = formatNumber(dmgModel["bonusBoss"] * (1 + Math.floor(x/20)*0.25)) * (1 + (x-1)*0.01)
            }
            if (attackModel.hasOwnProperty("emits")) {
                for (const emissionModel of attackModel["emits"]) applyDegreeBonusForSubEffects(emissionModel, x)
            }
        }
        return cp
    }
    returnData() {
        return this.paragon
    }
}
// x is for degree
function applyDegreeBonusForSubEffects(attackModel, x) {
    if (attackModel["type"] == "attack" || attackModel["type"] == "projectile"){
        if (attackModel.hasOwnProperty("rate")) attackModel["rate"] = formatNumber(attackModel["rate"] / (1 + Math.sqrt((x-1) * 50) * 0.01))
        if (attackModel["type"] != "subtower") {
            if (attackModel["pierce"] != null) attackModel["pierce"] = x != 100 ? formatNumber(attackModel["pierce"] * (1 + 0.01 * (x - 1)) + (x - 1)) : attackModel["pierce"] * 2 + 100
            else attackModel["pierce"] = 1
            let dmgModel = attackModel["dmg"]
            dmgModel["base"] = x != 100 ? formatNumber(dmgModel["base"] * (1 + (x-1)*0.01) + Math.floor((x-1)/10)) : formatNumber(dmgModel["base"] * 2 + 10)
            if (dmgModel.hasOwnProperty("bonusCeram")) dmgModel["bonusCeram"] *= formatNumber(1 + (x-1)*0.01)
            if (dmgModel.hasOwnProperty("bonusMOAB")) dmgModel["bonusMOAB"] *= formatNumber(1 + (x-1)*0.01)
            if (dmgModel.hasOwnProperty("bonusCamo")) dmgModel["bonusCamo"] *= formatNumber(1 + (x-1)*0.01)
            if (dmgModel.hasOwnProperty("bonusBoss")) dmgModel["bonusBoss"] = formatNumber(dmgModel["bonusBoss"] * (1 + Math.floor(x/20)*0.25)) * (1 + (x-1)*0.01)
        }
    }
    if (attackModel.hasOwnProperty("emits")) {
        for (const emissionModel of attackModel["emits"]) applyDegreeBonusForSubEffects(emissionModel, x)
    } 
}


/**************************************************/




async function getData(category, tower) {
    enableLoading()
    try {
        costs = await(await fetch("https://raw.githubusercontent.com/Nitjus7/BTD6-Central-Data/main/stats/towers/costs.json")).json()
        paragon = new Paragon(await(await fetch(`https://raw.githubusercontent.com/Nitjus7/BTD6-Central-Data/main/stats/towers/${category}/${tower}.json`)).json())
    } catch(error) {
        alert("There was an error while getting tower data. Some features may not work.")
        console.log(error)
        return "oops"
    } finally {
        disableLoading()
    }
}

// type: "remove" means REMOVE elements with that class name
// type: "include" means only INCLUDE elements with that class name
function filter(name, type) {
    if (type == "remove") {
        for (const parent of parentList) {
            for (const child of parent) {
                if (child.classList.contains(name)) child.style.display = "none"
            }
        }
    } else {
        for (const parent of parentList) {
            for (const child of parent) {
                if (!child.classList.contains(name)) child.style.display = "none";
            }
        }
    }
}
function checkFilter() {
    for (const parent of parentList) {
        for (const child of parent) {
            child.style.display = "flex";
        }
    }
    appliedFilter = filterSelect.value
    switch (appliedFilter) {
        case "noWIP": filter("wip", "remove"); break;
        case "noFilter": 
            for (const parent of parentList) {
                for (const child of parent) {
                    child.style.display = "flex";
                }
            }
            break;
        default: filter(appliedFilter, "include"); break;
    }
}

async function swapToTower(category, tower, level) {
    if (await getData(category, tower) == "oops") return "CRITICAL ERROR DETECTED."
    if (level == undefined || level == null) level = 1
    level = Math.round(level)
    document.querySelector(".towerPickContainer").style.display = "none"
    document.querySelector(".optionsBar").style.display = "none"
    if (category == "paragons") {
        if (level < 1) level = 1
        if (level > 100) level = 100
        paragonContainer.style.display = "block"
        displayParagonData(level)
    }
    document.querySelector(".actuallyTakeMeHomeContainer").style.display = "none"
    document.querySelector(".takeMeHomeContainer").style.display = "block"
    backButton.style.display = "block"
}

function displayParagonData(degree) {
    let attackDivs = Array.from(document.querySelectorAll(".attackDiv"))
    let attackNames = Array.from(document.querySelectorAll(".attackName"))
    let attackTypes = Array.from(document.querySelectorAll(".attackType"))
    for (const e of attackDivs) {
        e.remove();
    }
    for (const e of attackNames) {
        e.remove();
    }
    for (const e of attackTypes) {
        e.remove();
    }
    let p = paragon.applyDegreeBonus(degree)
    document.querySelector(".paragonCost").innerText = `$${p["cost"].toLocaleString()}`
    document.querySelector(".paragonName").innerText = p["name"]
    document.querySelector(".paragonDegree").innerText = `Degree ${degree}`
    if (degree == 100) document.querySelector(".paragonDegree").innerText += ` (MAX)`
    if (p.hasOwnProperty("abilities")) createAbilityDivs(p)
    createAttackDivs(p, null)
    if (p.hasOwnProperty("support")) createSupportDivs(p)
    editURL("level", degree, false)
}

function createAbilityDivs(p) {
    for (const attackModel of p["abilities"]) {
        const attackDiv = document.createElement("div")
        attackDiv.classList.add("attackDiv")
        const attackName = document.createElement("h2")
        attackName.innerText = attackModel["name"]
        attackName.classList.add("attackName")
        paragonContainer.appendChild(attackName)
        if (attackModel.hasOwnProperty("type")){
            const attackType = document.createElement("h3")
            attackType.innerText = attackModel["type"]
            attackType.classList.add("attackType")
            paragonContainer.appendChild(attackType)
        }
        createElem(`${attackModel["cooldown"]} sec`, "Cooldown", attackDiv)
        createElem(attackModel["description"], "Description", attackDiv)
        paragonContainer.appendChild(attackDiv)
        if (attackModel.hasOwnProperty("special")) createElem(attackModel["special"], "Special", attackDiv)
        if (attackModel.hasOwnProperty("emits")) createAttackDivs(attackModel["emits"], attackModel["name"])
        else attackDiv.classList.add("finalEmission")
    }
}

function createAttackDivs(p, emitsFrom) {
    let iterateThrough = "";
    if (emitsFrom != null) iterateThrough = p
    else iterateThrough = p["attacks"]
    for (const attackModel of iterateThrough) {
        const attackDiv = document.createElement("div")
        attackDiv.classList.add("attackDiv")
        const attackName = document.createElement("h2")
        attackName.innerText = attackModel["name"]
        attackName.classList.add("attackName")
        paragonContainer.appendChild(attackName)
        const attackType = document.createElement("h3")
        attackType.innerText = attackModel["type"]
        attackType.classList.add("attackType")
        paragonContainer.appendChild(attackType)
        if (emitsFrom != null) {
            createElem(emitsFrom, "Emitted From", attackDiv)
            if (attackModel.hasOwnProperty("frequency")) createElem(attackModel["frequency"], "Frequency", attackDiv)
        }
        if (attackModel.hasOwnProperty("description")) createElem(attackModel["description"], "Description", attackDiv)
        if (attackModel.hasOwnProperty("type") && (attackModel["type"] == "projectile" || attackModel["type"] == "attack")) {
            let dmgModel = attackModel["dmg"]
            createElem(dmgModel["base"], "Damage", attackDiv)
            if (dmgModel.hasOwnProperty("bonusCeram")) createElem(`${formatNumber(Number(dmgModel["bonusCeram"]) + Number(dmgModel["base"]))} (+${formatNumber(dmgModel["bonusCeram"])})`, "Ceramic Damage", attackDiv)
            if (dmgModel.hasOwnProperty("bonusMOAB")) createElem(`${formatNumber(Number(dmgModel["bonusMOAB"]) + Number(dmgModel["base"]))} (+${formatNumber(dmgModel["bonusMOAB"])})`, "MOAB Damage", attackDiv)
            if (dmgModel.hasOwnProperty("bonusCamo")) createElem(`${formatNumber(Number(dmgModel["bonusCamo"]) + Number(dmgModel["base"]))} (+${formatNumber(dmgModel["bonusCamo"])})`, "Camo Damage", attackDiv)
            if (dmgModel.hasOwnProperty("bonusBoss")) {
                let totalBossDmg = 0
                if (!dmgModel.hasOwnProperty("bonusMOAB")) totalBossDmg = Number(dmgModel["bonusBoss"]) + Number(dmgModel["base"])
                else totalBossDmg =  Number(dmgModel["bonusBoss"]) + Number(dmgModel["bonusMOAB"]) + Number(dmgModel["base"])
                createElem(`${formatNumber(totalBossDmg)} (+${formatNumber(dmgModel["bonusBoss"])})`, "Boss Damage", attackDiv)
                createElem(`${formatNumber(totalBossDmg * 2)}`, "Elite Boss Damage", attackDiv)
            } else if (dmgModel.hasOwnProperty("bonusMOAB")){
                createElem(`${formatNumber((Number(dmgModel["base"]) + Number(dmgModel["bonusMOAB"])) * 2)}`, "Elite Boss Damage", attackDiv)
            } else {
                createElem(`${formatNumber(dmgModel["base"] * 2)}`, "Elite Boss Damage", attackDiv)
            }
            createElem(attackModel["pierce"], "Pierce", attackDiv)
            if (attackModel.hasOwnProperty("rate")) createElem(`${attackModel["rate"]}sec`, "Attack Rate", attackDiv)
            if (attackModel["projectiles"] > 1) createElem(attackModel["projectiles"], "Projectiles", attackDiv)
            if (attackModel.hasOwnProperty("range")) createElem(attackModel["range"], "Range", attackDiv)
        }
        if (attackModel.hasOwnProperty("special")) createElem(attackModel["special"], "Special", attackDiv)
        paragonContainer.appendChild(attackDiv)
        if (attackModel.hasOwnProperty("emits")) {
            createAttackDivs(attackModel["emits"], attackModel["name"])
        } else {
            attackDiv.classList.add("finalEmission")
        }
    }
}

function createSupportDivs(p) {
    for (const supportModel of p["support"]) {
        const attackDiv = document.createElement("div")
        attackDiv.classList.add("attackDiv")
        const attackName = document.createElement("h2")
        attackName.innerText = supportModel["name"]
        attackName.classList.add("attackName")
        paragonContainer.appendChild(attackName)
        createElem(supportModel["description"], "Description", attackDiv)
        paragonContainer.appendChild(attackDiv)
    }
}

function createElem(value, type, parent) {
    const elem = document.createElement("div")
    if (!type.includes(" ")) elem.classList.add(`${type.toString().toLowerCase()}`)
    else if (type == "Emitted From") elem.classList.add("emitsFrom")
    const title = document.createElement("h4")
    title.innerText = type
    elem.appendChild(title)
    const content = document.createElement("p")
    content.innerText = value
    elem.appendChild(content)
    parent.appendChild(elem)
}

function calculateParagonDegree() {
    let data = paragon.returnData()
    let power = 0
    let degree = 1
    const maxPops = 16200000
    let pops = Math.floor(document.querySelector("#paragonPops").value)
    if (pops == null || pops < 0) {pops = 0; document.querySelector("#paragonPops").value = 0}
    const maxTiers = 100
    let tiers = Math.floor(document.querySelector("#paragonTiersSacced").value)
    if (tiers == null || tiers < 0) {tiers = 0; document.querySelector("#paragonTiersSacced").value = 0}
    const maxCashSac = data["cost"] * 3
    let cashSac = Math.floor(document.querySelector("#paragonCashSacced").value)
    if (cashSac == null || cashSac < 0) {cashSac = 0; document.querySelector("#paragonCashSacced").value}
    const maxCashSlider = data["cost"] * 3 * 1.05
    let cashSlider = Math.floor(document.querySelector("#paragonCashSlider").value)
    if (cashSlider == null || cashSlider < 0) {cashSlider = 0; document.querySelector("#paragonCashSlider").value = 0}
    const maxT5 = 12
    let t5 = Math.floor(document.querySelector("#paragonT5Sacced").value)
    if (t5 > 9) {
        t5 = 9
        document.querySelector("#paragonT5Sacced").value = 9
    }
    let powerFromPops = pops / 180 > 90000 ? 90000 : Math.round(pops / 180)
    power += powerFromPops
    if (powerFromPops >= 90000) document.querySelector("#paragonPops").value = maxPops
    power += tiers * 100 > 10000 ? 10000 : Math.round(tiers * 100)
    if (tiers >= 100) document.querySelector("#paragonTiersSacced").value = maxTiers

    let powerFromCash
    let idk = cashSac / (data["cost"] / 20000) 
    let idk2 = cashSlider / (data["cost"] * 1.05 / 20000)
    powerFromCash = idk + idk2 > 60000 ? 60000 : idk + idk2
    if (powerFromCash >= 60000) {
        if (cashSac < cashSlider) document.querySelector("#paragonCashSlider").value = maxCashSlider
        else document.querySelector("#paragonCashSacced").value = maxCashSac
    }
    power += powerFromCash

    power += t5 * 6000 > 50000 ? 50000 : t5 * 6000
    let i = 0;
    while (power >= powerDegreeRequirements[i] && i <= 100) {
        i++
    }
    console.log(power)
    degree = i + 1
    document.querySelector(".result").innerText = `Degree ${degree}`
    displayParagonData(degree)
}

for (const element of document.querySelectorAll(".paragon")) {
    if (!element.classList.contains("wip")) {
      element.onclick = () => {
        swapToTower("paragons", element.id, 1)
        editURL("paragon", element.id, false)
      }
    }
}
filterSelect.addEventListener("change", checkFilter)

paragonDegreeInput.addEventListener("change", function() {
    if (!document.querySelector(".degreeSelectorContainer").classList.contains("unchecked")){
        paragonDegreeInput.value = Math.floor(paragonDegreeInput.value)
        if (paragonDegreeInput.value < 1) paragonDegreeInput.value = 1
        if (paragonDegreeInput.value > 100) paragonDegreeInput.value = 100
        let str = paragonDegreeInput.value.toString()
        let parsedStr = parseInt(str, 10).toString()
        let realDegree = +parsedStr
        displayParagonData(realDegree)
    }
})
document.querySelector(".calculateParagonDegreeButton").onclick = () => {
    if (!document.querySelector(".degreeCalculatorContainer").classList.contains("unchecked")){
        calculateParagonDegree()
    }
}

// thank god this only triggers when it's activated and not when it's deactivated
selectDegreeCheck.addEventListener("change", function() {
    calculateDegreeCheck.checked = false
    if (paragonDegreeInput.value < 1) paragonDegreeInput.value = 1
    if (paragonDegreeInput.value > 100) paragonDegreeInput.value = 100
    let str = paragonDegreeInput.value.toString()
    let parsedStr = parseInt(str, 10).toString()
    let realDegree = +parsedStr
    paragonDegreeInput.value = realDegree
    displayParagonData(realDegree)
    document.querySelector(".degreeSelectorContainer").classList.remove("unchecked")
    document.querySelector(".degreeCalculatorContainer").classList.add("unchecked")
})
calculateDegreeCheck.addEventListener("change", function() {
    selectDegreeCheck.checked = false
    calculateParagonDegree()
    document.querySelector(".degreeCalculatorContainer").classList.remove("unchecked")
    document.querySelector(".degreeSelectorContainer").classList.add("unchecked")
})
backButton.onclick = () => {
    for (const vrej of dataContainers) {
        vrej.style.display = "none"
    }
    document.querySelector(".actuallyTakeMeHomeContainer").style.display = "block"
    document.querySelector(".towerPickContainer").style.display = "flex"
    document.querySelector(".optionsBar").style.display = "flex"
    backButton.style.display = "none"
    editURL("paragon", null, false)
    editURL("level", null, false)
}

function editURL(name, value, push) {
    if (value != null) { 
      urlParams.set(name, value) 
      if (push) history.pushState(null, null, "?" + urlParams.toString())
      else history.replaceState(null, null, "?" + urlParams.toString())
    } else { 
      urlParams.delete(name) 
      window.history.pushState(null, document.title, window.location.pathname)
    }
}
function formatNumber(input) {
    let num = Number(input);
    let str = num.toFixed(3);
    str = parseFloat(str);
    str = String(str);
    return str;
 } 
function enableLoading() {
    document.querySelector(".popupOverlay").style.display = "block"
    document.body.classList.add("no-scroll")
}
function disableLoading() {
    document.querySelector(".popupOverlay").style.display = "none"
    document.body.classList.remove("no-scroll")
}
 

async function main() {
    checkFilter()
    for (const vrej of dataContainers) {
        vrej.style.display = "none"
    }
    urlParagon = urlParams.get("paragon")
    urlTower = urlParams.get("tower")
    urlLevel = urlParams.get("level")
    if (urlParagon != null) {
        swapToTower("paragons", urlParagon, urlLevel)
        paragonDegreeInput.value = urlLevel
    }
}
main()