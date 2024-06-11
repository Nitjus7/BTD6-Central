const paragonDegreeInput = document.querySelector(".paragonDegreeInput")
const paragonContainer = document.querySelector(".paragonContainer")
const heroContainer = document.querySelector(".heroContainer")
const selectDegreeCheck = document.querySelector("#pikachuIChooseYou")
const calculateDegreeCheck = document.querySelector("#charizardIChooseYou")
const calculateParagonDegreeButton = document.querySelector(".calculateParagonDegreeButton")

const dataContainers = [paragonContainer, heroContainer, document.querySelector(".disclaimerContainer")]
const monkeyList = document.querySelectorAll(".monkey")
const heroList = document.querySelectorAll(".hero")
const paragonList = document.querySelectorAll(".paragon")
const primaryContainer = document.querySelector(".primaryContainer")
const militaryContainer = document.querySelector(".militaryContainer")
const magicContainer = document.querySelector(".magicContainer")
const supportContainer = document.querySelector(".supportContainer")
const heroesContainer = document.querySelector(".heroesContainer")
const towerPickContainer = document.querySelector(".towerPickContainer")
const heroStatsContainer = document.querySelector(".heroStatsContainer")

const parentList = [monkeyList, heroList, paragonList]
const subParentList = []

let monkeyData;
let heroData;
let paragon;
let hero;
let baseHero;
let costs;

const backButton = document.querySelector(".takeMeHome")
let urlTower;
let urlParagon;
let urlLevel;
let urlParams = new URLSearchParams(window.location.search);

// const filterSelect = document.querySelector(".filterSelect")
let appliedFilter = "noFilter" // placeholder
const POWER_DEGREE_REQUIREMENTS = [
    2000,2324,2666,3027,3408,3808,4228,4669,5131,5615,6121,6650,7203,7779,8379,9004,9654,
    10330,11032,11761,12518,13302,14114,14955,15825,16725,17655,18616,19609,20633,21689,22778,
    23900,25056,26246,27471,28732,30028,31360,32729,34135,35579,37061,38582,40143,41743,43383,
    45064,46786,48550,50356,52205,54098,56034,58014,60039,62109,64225,66387,68596,70853,73157,
    75509,77910,80360,82860,85410,88011,90664,93368,96124,98933,101795,104711,107681,110706,113787,
    116923,120115,123364,126670,130034,133456,136937,140478,144078,147738,151459,155241,159085,162991,
    166960,170993,175089,179249,183474,187764,192120,200000
]
const BASE_XP_REQUIREMENTS = [0,180,460,1000,1860,3280,5180,8320,9380,13620,16380,14400,16650,
    14940,16380,17820,19260,20700,16470,17280
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
                if (dmgModel.hasOwnProperty("bonusStunned")) dmgModel["bonusStunned"] *= formatNumber(1 + (x-1)*0.01)
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
            if (dmgModel.hasOwnProperty("bonusStunned")) dmgModel["bonusStunned"] *= formatNumber(1 + (x-1)*0.01)
        }
    }
    if (attackModel.hasOwnProperty("emits")) {
        for (const emissionModel of attackModel["emits"]) applyDegreeBonusForSubEffects(emissionModel, x)
    } 
}



class Hero {
    constructor(fullData) {
        this.fullData = fullData
        this.baseHero = fullData
        this.name = fullData["hero"]
        this.projectiles = fullData["projectiles"]
        if (fullData.hasOwnProperty("abilities")) this.abilities = fullData["abilities"]
        if (fullData.hasOwnProperty("supports")) this.support = fullData["supports"]
        if (fullData.hasOwnProperty("statuses")) this.statuses = fullData["statuses"]
    }

    resetData() {
        this.fullData = structuredClone(this.baseHero)
    }

    addRange(value) {
        this.fullData["range"] += value
    }

    editDescription(str) {
        this.fullData["description"] = str
    }

    editFootprint(value) {
        this.fullData["footprintRadius"] = value
    }

    editItem(data) {
        this.abilities = this.fullData["abilities"]
        this.projectiles = this.fullData["projectiles"]
        const abil = this.abilities
        const proj = this.projectiles
        const supp = this.support
        const stat = this.statuses
        const target = data["target"]
        const item = data["item"]
        const type = data["type"]
        const value = data["value"]
        if (proj.hasOwnProperty(target) && proj[target].hasOwnProperty(item)) {
            if (type == "subtract") {
                this.fullData["projectiles"][target][item] -= value
            } else if (type == "multiply") {
                this.fullData["projectiles"][target][item] *= value
            } else if (type == "divide") {
                this.fullData["projectiles"][target][item] /= value
            } else if (type == "add") {
                this.fullData["projectiles"][target][item] += value
            } else {
                this.fullData["projectiles"][target][item] = value
            }
        } else if (abil && abil.hasOwnProperty(target) && abil[target].hasOwnProperty(item)) {
            if (type == "subtract") {
                this.fullData["abilities"][target][item] -= value
            } else if (type == "multiply") {
                this.fullData["abilities"][target][item] *= value
            } else if (type == "divide") {
                this.fullData["abilities"][target][item] /= value
            } else if (type == "add") {
                this.fullData["abilities"][target][item] += value
            } else {
                this.fullData["abilities"][target][item] = value
            }
        } else if (supp && supp.hasOwnProperty(target) && supp[target].hasOwnProperty(item)) {
            if (type == "subtract") {
                this.fullData["supports"][target][item] -= value
            } else if (type == "multiply") {
                this.fullData["supports"][target][item] *= value
            } else if (type == "divide") {
                this.fullData["supports"][target][item] /= value
            } else if (type == "add") {
                this.fullData["supports"][target][item] += value
            } else {
                this.fullData["supports"][target][item] = value
            }
        } else if (stat && stat.hasOwnProperty(target) && stat[target].hasOwnProperty(item)) {
            if (type == "subtract") {
                this.fullData["statuses"][target][item] -= value
            } else if (type == "multiply") {
                this.fullData["statuses"][target][item] *= value
            } else if (type == "divide") {
                this.fullData["statuses"][target][item] /= value
            } else if (type == "add") {
                this.fullData["statuses"][target][item] += value
            } else {
                this.fullData["statuses"][target][item] = value
            }
        }
    }

    editStore(data) {
        const store = this.fullData["store"]
        const storeItem = data["store-item"]
        const target = data["target"]
        const type = data["type"]
        const value = data["value"]
        if (store.hasOwnProperty(storeItem) && store[storeItem].hasOwnProperty(target)) {
            if (type == "subtract") {
                this.fullData["store"][storeItem][target] -= value
            } else if (type == "multiply") {
                this.fullData["store"][storeItem][target] *= value
            } else if (type == "divide") {
                this.fullData["store"][storeItem][target] /= value
            } else if (type == "add") {
                this.fullData["store"][storeItem][target] += value
            } else {
                this.fullData["store"][storeItem][target] = value
            }
        }
    }

    addProperty(data) {
        const abil = this.abilities
        const proj = this.projectiles
        const supp = this.support
        const stat = this.statuses
        const target = data["target"]
        const key = data["key"]
        const value = data["value"]
        if (proj.hasOwnProperty(target)) {
            this.fullData["projectiles"][target][key] = value
        } else if (abil.hasOwnProperty(target)) {
            this.fullData["abilities"][target][key] = value
        } else if (supp && supp.hasOwnProperty(target)) {
            this.fullData["support"][target][key] = value
        } else if (stat && stat.hasOwnProperty(target)) {
            this.fullData["statuses"][target][key] = value
        }
    }

    addAttack(name) {
        this.fullData["enabledProjectiles"].push(name)
    }
    addAbility(name) {
        this.fullData["enabledAbilities"].push(name)
    }
    addSupport(name) {
        this.fullData["enabledSupports"].push(name)
    }

    getData() {
        return JSON.parse(JSON.stringify(this.fullData))
    }
}

/**************************************************/




async function getData(category, tower) {
    enableLoading(`Loading tower data...`)
    try {
        if (!costs)
            costs = await(await fetch("https://raw.githubusercontent.com/Nitjus7/BTD6-Central-Data/main/stats/towers/costs.json")).json()
        if (category == "paragons")
            paragon = new Paragon(await(await fetch(`https://raw.githubusercontent.com/Nitjus7/BTD6-Central-Data/main/stats/towers/${category}/${tower}.json`)).json())
        else if (category == "heroes") {
            const heroData = await(await fetch(`https://raw.githubusercontent.com/Nitjus7/BTD6-Central-Data/main/stats/towers/${category}/${tower}.json`)).json()
            hero = new Hero(heroData)
        }
    } catch(error) {
        alert("There was an error while getting tower data. Some features may not work.")
        console.log(error)
    } finally {
        disableLoading()
    }
}

// type: "remove" means REMOVE elements with that class name
// type: "include" means ONLY INCLUDE elements with that class name
function filter(name, type) {
    if (type == "remove") {
        for (const parent of parentList) {
            for (const child of parent) {
                if (child.classList.contains(name) || child.classList.contains("wip")) child.style.display = "none"
            }
        }
    } else {
        for (const parent of parentList) {
            for (const child of parent) {
                if (!child.classList.contains(name) || child.classList.contains("wip")) child.style.display = "none";
            }
        }
    }
}
function checkFilter(id) {
    for (const parent of parentList) {
        for (const child of parent) {
            child.style.display = "flex";
        }
    }
    if (id) appliedFilter = id
    switch (appliedFilter) {
        case "noFilter": 
            for (const parent of parentList) {
                for (const child of parent) {
                    if (!child.classList.contains("wip")) child.style.display = "flex";
                    else child.style.display = "none"
                }
            }
            break;
        default: filter(appliedFilter, "include"); break;
    }
    const pArray = Array.from(primaryContainer.children)
    if (pArray.every(child => child.style.display == "none")) {
        document.querySelector(".primaryHeader").style.display = "none"
    } else {
        document.querySelector(".primaryHeader").style.display = "flex"
    }
    const miArray = Array.from(militaryContainer.children)
    if (miArray.every(child => child.style.display == "none")) {
        document.querySelector(".militaryHeader").style.display = "none"
    } else {
        document.querySelector(".militaryHeader").style.display = "flex"
    }
    const maArray = Array.from(magicContainer.children)
    if (maArray.every(child => child.style.display == "none")) {
        document.querySelector(".magicHeader").style.display = "none"
    } else {
        document.querySelector(".magicHeader").style.display = "flex"
    }
    const sArray = Array.from(supportContainer.children)
    if (sArray.every(child => child.style.display == "none")) {
        document.querySelector(".supportHeader").style.display = "none"
    } else {
        document.querySelector(".supportHeader").style.display = "flex"
    }
    const hArray = Array.from(heroesContainer.children)
    if (hArray.every(child => child.style.display == "none")) {
        document.querySelector(".heroesHeader").style.display = "none"
    } else {
        document.querySelector(".heroesHeader").style.display = "flex"
    }
}

async function swapToTower(category, tower, level) {
    if (await getData(category, tower) == "oops") return "CRITICAL ERROR DETECTED."
    if (level == undefined || level == null) level = 1
    level = Math.round(level)
    document.querySelector(".towerPickContainer").style.display = "none"
    document.querySelector(".filterHeader").style.display = "none"
    document.querySelector(".optionsBar").style.display = "none"
    document.querySelector(".disclaimerContainer").style.display = "flex"
    document.querySelector(".toolsPickContainer").style.display = "none"
    document.querySelector(".heroLevelCalculatorContainer").style.display = "none"
    // document.querySelector(".paragonDegreeCalculatorContainer").style.display = "none"
    document.querySelector(".actuallyTakeMeHomeContainer").style.display = "none"
    document.querySelector(".takeMeHomeContainer").style.display = "block"
    backButton.style.display = "block"
    if (category == "paragons") {
        if (level < 1) level = 1
        if (level > 100) level = 100
        paragonContainer.style.display = "block"
        displayParagonData(level)
    } else if (category == "heroes") {
        level = Math.round(level)
        if (level < 1) level = 1
        if (level > 20) level = 20
        heroContainer.style.display = "block"
        displayHeroData(level)
    }
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
    createAttackDivs(p, null)
    if (p.hasOwnProperty("abilities")) createAbilityDivs(p)
    if (p.hasOwnProperty("support")) createSupportDivs(p)
    editURL("level", degree, false)
}

function createAbilityDivs(p) {
    for (const attackModel of p["abilities"]) {
        const attackDiv = document.createElement("div")
        attackDiv.classList.add("attackDiv")
        const attackName = document.createElement("h2")
        attackName.innerHTML = `${attackModel["name"]}`
        attackName.classList.add("attackName")
        paragonContainer.appendChild(attackName)
        if (attackModel.hasOwnProperty("type") && attackModel["type"] === "passive ability"){
            const attackType = document.createElement("h3")
            attackType.innerText = attackModel["type"]
            attackType.classList.add("attackType")
            paragonContainer.appendChild(attackType)
        } else {
            attackName.innerHTML = `<img src="assets/activatedAbilityIcon.png" class="attackCategoryIcon" alt="activated ability" draggable="false"/> ${attackModel["name"]}`
        }
        createElem(`${attackModel["cooldown"]} sec`, "Cooldown", attackDiv)
        createElem(attackModel["description"], "Description", attackDiv)
        paragonContainer.appendChild(attackDiv)
        if (attackModel.hasOwnProperty("special")) createElem(attackModel["special"], "Special", attackDiv)
        if (attackModel.hasOwnProperty("emits")) createAttackDivs(attackModel["emits"], attackModel["name"])
        
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
        attackName.innerHTML = `<img src="assets/projectileIcon.png" class="attackCategoryIcon" alt="projectile" draggable="false"/> ${attackModel["name"]}`
        attackName.classList.add("attackName")
        paragonContainer.appendChild(attackName)
        if (emitsFrom != null) {
            createElem(emitsFrom, "Emitted From", attackDiv)
            if (attackModel.hasOwnProperty("frequency")) createElem(attackModel["frequency"], "Frequency", attackDiv)
        }
        if (attackModel.hasOwnProperty("description")) createElem(attackModel["description"], "Description", attackDiv)
        if (attackModel.hasOwnProperty("dmg")) {
            const damageDiv = document.createElement("div")
            damageDiv.classList.add("damageDiv")
            let dmgModel = attackModel["dmg"]
            createElem(dmgModel["base"], "Base", damageDiv, "Total Damage")
            // (+${formatNumber(dmgModel["bonusCeram"])})
            // in case I wanna add back the bonus damage stat

            if (dmgModel.hasOwnProperty("bonusCeram")) createElem(`${formatNumber(Number(dmgModel["bonusCeram"]) + Number(dmgModel["base"]))}`, "Ceramic", damageDiv)
            if (dmgModel.hasOwnProperty("bonusMOAB")) createElem(`${formatNumber(Number(dmgModel["bonusMOAB"]) + Number(dmgModel["base"]))}`, "MOAB", damageDiv)
            if (dmgModel.hasOwnProperty("bonusCamo")) createElem(`${formatNumber(Number(dmgModel["bonusCamo"]) + Number(dmgModel["base"]))}`, "Camo", damageDiv)
            if (dmgModel.hasOwnProperty("bonusStunned")) createElem(`${formatNumber(Number(dmgModel["bonusStunned"]) + Number(dmgModel["base"]))}`, "Stunned", damageDiv)
            if (dmgModel.hasOwnProperty("bonusBoss")) {
                let totalBossDmg = 0
                if (!dmgModel.hasOwnProperty("bonusMOAB")) totalBossDmg = Number(dmgModel["bonusBoss"]) + Number(dmgModel["base"])
                else totalBossDmg =  Number(dmgModel["bonusBoss"]) + Number(dmgModel["bonusMOAB"]) + Number(dmgModel["base"])
                createElem(`${formatNumber(totalBossDmg)}`, "Boss", damageDiv)
                createElem(`${formatNumber(totalBossDmg * 2)}`, "Elite Boss", damageDiv)
            } else if (dmgModel.hasOwnProperty("bonusMOAB")){
                createElem(`${formatNumber((Number(dmgModel["base"]) + Number(dmgModel["bonusMOAB"])) * 2)}`, "Elite Boss", damageDiv)
            } else {
                createElem(`${formatNumber(dmgModel["base"] * 2)}`, "Elite Boss", damageDiv)
            }
            attackDiv.appendChild(damageDiv)
        }
        if (attackModel.hasOwnProperty("pierce")) createElem(attackModel["pierce"], "Pierce", attackDiv)
        if (attackModel.hasOwnProperty("rate")) createElem(`${attackModel["rate"]}sec`, "Attack Rate", attackDiv)
        if (attackModel.hasOwnProperty("projectiles")) createElem(attackModel["projectiles"], "Projectiles", attackDiv)
        if (attackModel.hasOwnProperty("range")) createElem(attackModel["range"], "Range", attackDiv)
        if (attackModel["type"] !== "status" && attackModel.hasOwnProperty("duration"))
            createElem(`${attackModel["duration"]}sec`, "Duration", attackDiv)
        if (attackModel.hasOwnProperty("tickRate")) createElem(`${attackModel["tickRate"]}sec`, "Tick Rate", attackDiv)
        if (attackModel.hasOwnProperty("lifespan")) {
            const lifespanDiv = document.createElement("div")
            lifespanDiv.classList.add("lifespanDiv")
            let lifespan
            if (attackModel["lifespan"] == 999) lifespan = "Infinite"
            else lifespan = `${attackModel["lifespan"]}sec`
            createElem(lifespan, "Time", lifespanDiv, "Lifespan")
            if (attackModel.hasOwnProperty("lifespanRounds")) 
                createElem(`${attackModel["lifespanRounds"]}`, "Rounds", lifespanDiv)
            attackDiv.appendChild(lifespanDiv)
        }
        if (attackModel["type"] == "status") {
            if (attackModel.hasOwnProperty("duration")) {
                const specialList = ["ceramic", "blimps", "moab", "bfb", "zomg", "ddt", "bad"]
                const durationModel = attackModel["duration"]
                const statusDurationDiv = document.createElement("div")
                statusDurationDiv.classList.add("damageDiv")
                createElem(`${durationModel["base"]}sec`, "BASE", statusDurationDiv, "Duration")
                for (const temp of specialList) {
                    if (durationModel.hasOwnProperty(temp)) 
                        createElem(`${durationModel[temp]}sec`, temp.toUpperCase(), statusDurationDiv)
                }
                attackDiv.appendChild(statusDurationDiv)
            }
        }
        if (attackModel.hasOwnProperty("special")) createElem(attackModel["special"], "Special", attackDiv)
        paragonContainer.appendChild(attackDiv)
        if (attackModel.hasOwnProperty("emits")) {
            createAttackDivs(attackModel["emits"], attackModel["name"])
        }
    }
}

function createSupportDivs(p) {
    for (const supportModel of p["support"]) {
        const attackDiv = document.createElement("div")
        attackDiv.classList.add("attackDiv")
        const attackName = document.createElement("h2")
        attackName.innerHTML = `<img src="assets/supportIcon.png" class="attackCategoryIcon" draggable="false"/> ${supportModel["name"]}`
        attackName.classList.add("attackName")
        paragonContainer.appendChild(attackName)
        createElem(supportModel["description"], "Description", attackDiv)
        paragonContainer.appendChild(attackDiv)
    }
}

function createElem(value, type, parent, st) {
    if (st) {
        const sectionTitle = document.createElement("div")
        sectionTitle.classList.add("attackElemLabel")
        sectionTitle.innerText = st
        parent.appendChild(sectionTitle)
    }
    const elem = document.createElement("div")
    if (type.includes("Damage")) elem.classList.add("damageElem")
    if (!type.includes(" ")) elem.classList.add(`${type.toString().toLowerCase()}`)
    else if (type == "Emitted From") elem.classList.add("emitsFrom")
    
    const title = document.createElement("h4")
    title.innerText = type
    title.className = "damageElemHeader"
    elem.appendChild(title)
    const content = document.createElement("p")
    content.innerHTML = value
    elem.appendChild(content)
    parent.appendChild(elem)
}

function calculateParagonDegree() {
    let data = paragon.returnData()
    let power = 0
    let degree = 1
    const maxPops = 16200000
    let paragonCost = data["cost"]
    switch (document.querySelector("#gamemodeDifficulty").value) {
        case "easy": paragonCost = Math.round(data["cost"] * 0.85); break;
        case "hard": paragonCost = Math.round(data["cost"] * 1.08); break;
        case "impoppable": paragonCost = Math.round(data["cost"] * 1.2); break;
        default: paragonCost = paragonCost
    }
    let pops = Math.floor(document.querySelector("#paragonPops").value)
    if (pops == null || pops < 0) {pops = 0; document.querySelector("#paragonPops").value = 0}
    const maxTiers = 100
    let tiers = Math.floor(document.querySelector("#paragonTiersSacced").value)
    if (tiers == null || tiers < 0) {tiers = 0; document.querySelector("#paragonTiersSacced").value = 0}
    const maxCashSac = paragonCost * 3
    let cashSac = Math.floor(document.querySelector("#paragonCashSacced").value)
    if (cashSac == null || cashSac < 0) {cashSac = 0; document.querySelector("#paragonCashSacced").value}
    const maxCashSlider = paragonCost * 3 * 1.05
    let cashSlider = Math.floor(document.querySelector("#paragonCashSlider").value)
    if (cashSlider == null || cashSlider < 0) {cashSlider = 0; document.querySelector("#paragonCashSlider").value = 0}
    const maxT5 = 9
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
    let idk = cashSac / (paragonCost / 20000) 
    let idk2 = cashSlider / (paragonCost * 1.05 / 20000)
    powerFromCash = idk + idk2 > 60000 ? 60000 : idk + idk2
    if (powerFromCash >= 60000) {
        if (cashSac < cashSlider) document.querySelector("#paragonCashSlider").value = maxCashSlider
        else document.querySelector("#paragonCashSacced").value = maxCashSac
    }
    power += powerFromCash

    power += t5 * 6000 > 50000 ? 50000 : t5 * 6000
    let i = 0;
    while (power >= POWER_DEGREE_REQUIREMENTS[i] && i <= 100) {
        i++
    }
    degree = i + 1
    document.querySelector(".result").innerText = `Degree ${degree}`
    displayParagonData(degree)
}



function displayHeroData(level) {
    const scrollPos = window.scrollY
    let attackDivs = Array.from(document.querySelectorAll(".attackDiv"))
    let attackNames = Array.from(document.querySelectorAll(".attackName"))
    let attackTypes = Array.from(document.querySelectorAll(".attackType"))
    const storeButton = document.querySelector(".heroStoreButton")
    const storeContainer = document.querySelector(".storeContainer")
    for (const e of attackDivs) {
        e.remove();
    }
    for (const e of attackNames) {
        e.remove();
    }
    for (const e of attackTypes) {
        e.remove();
    }
    for (const elem of Array.from(document.querySelectorAll(".chooseLevelButton:not(.selected)"))) {
        elem.onclick = () => {
            if (document.querySelector(".chooseLevelButton.selected")) document.querySelector(".chooseLevelButton.selected").classList.remove("selected")
            elem.classList.add("selected")
            displayHeroData(elem.id.slice(11))
        }
    }

    editHeroDataAtLevel(level)

    // the magic begins
    const h = hero.getData()
    document.querySelector(".heroName").innerText = h["hero"]



    if (h["hero"] === "Geraldo" || h["hero"] === "Corvus") {
        document.querySelector(".disclaimerContainer").style.margin = "50px 0 100px 20px"
        storeButton.style.display = "flex"
        const storeItems = Object.keys(h["store"])
        if (h["hero"] === "Geraldo") {
            for (let i = 0; i < storeItems.length; i++) {
                document.querySelector(`#storeItem${i + 1} > img`).src = `assets/geraldo${i + 1}.png`
            }
            document.querySelector(".openStoreIcon").src = "assets/geraldoShopIcon.png"
            document.querySelector(".storeHeader").innerHTML = `The Shop&nbsp;&nbsp;|&nbsp;&nbsp;Level ${level}`
        } else if (h["hero"] === "Corvus") {
            for (let i = 0; i < storeItems.length; i++) {
                document.querySelector(`#storeItem${i + 1} > img`).src = `assets/corvus${i + 1}.png`
            }
            // document.querySelectorAll(".openStoreIcon").style.backgroundColor = "#f9dbab"
            document.querySelector(".openStoreIcon").src = "assets/corvusSpellbookIcon.png"
            document.querySelector(".storeHeader").innerHTML = `The Spellbook&nbsp;&nbsp;|&nbsp;&nbsp;Level ${level}`
        }
        let storeItemsArray = Array.from(document.querySelector(".storeItemsContainer").children)
        for (let i = 0; i < storeItemsArray.length; i++) {
            const elem = storeItemsArray[i]
            const currItem = h["store"][storeItems[i]]
            const currItemUnlocksAt = currItem["unlockLevel"]
            for (const child of Array.from(elem.querySelectorAll(".levelUnlockOverlay"))) {
                child.remove()
            }
            if (currItemUnlocksAt > level) {
                elem.classList.add("inactive")
                elem.innerHTML += `<p class="levelUnlockOverlay">${currItemUnlocksAt}</p>`
            } else {
                elem.classList.remove("inactive")
            }
            elem.onclick = () => {
                if (!elem.classList.contains("selected") && !elem.classList.contains("inactive")) {
                    for (const child of storeItemsArray) {
                        if (child.classList.contains("selected")) child.classList.remove("selected")
                    }
                    elem.classList.add("selected")
                    displayStore(h, h["hero"], currItem)
                }
            }
        }
        const storeList = Object.keys(h["store"])
        displayStore(h, h["hero"], h["store"][storeList[0]])
        storeItemsArray[0].classList.add("selected")
        storeButton.onclick = () => {
            document.body.classList.add("no-scroll")
            displayStore[h, h["store"][storeList]]
            storeContainer.showModal()
        }
        document.querySelector(".closeStoreButton").onclick = () => {
            document.body.classList.remove("no-scroll")
            for (const child of storeItemsArray) {
                if (child.classList.contains("selected")) child.classList.remove("selected")
            }
            storeItemsArray[0].classList.add("selected")
            displayStore(h, h["hero"], h["store"][storeList[0]])
            storeContainer.close()
        }
    } else {
        document.querySelector(".disclaimerContainer").style.margin = "50px 0 20px 20px"
        storeButton.style.display = "none"
    }




    document.querySelector(".heroCost").innerHTML = `$${h["cost"]}&nbsp;&nbsp;|&nbsp;&nbsp;Level ${level}`
    document.querySelector(".heroImage").src = `assets/${h["hero"].replace(/ /g, "")}.png` // removes spaces from the hero name
    const baseStatsContainer = document.createElement("div")
    baseStatsContainer.className = "attackDiv notCentered"
    createElem(h["range"], "Range", baseStatsContainer)
    createElem(`${getFootprintInEnglish(h["footprintRadius"])} (${h["footprintRadius"]})`, "Tower Size", baseStatsContainer)
    createElem(`${h["xpCurve"]}x`, "XP Curve", baseStatsContainer)
    if (h.hasOwnProperty("description")) createElem(h["description"], "Description", baseStatsContainer)
    heroStatsContainer.appendChild(baseStatsContainer)
    if (h.hasOwnProperty("projectiles")) {
        const projectilesContainer = document.createElement("div")
        projectilesContainer.className = "abilitiesContainer projectilesContainer"
        for (const temp of h["enabledProjectiles"]) {
            const projectileDiv = document.createElement("div")
            projectileDiv.className = "attackDiv notCentered"
            const projectileModel = h["projectiles"][temp]
            const projectileName = document.createElement("h2")
            projectileName.innerHTML = `<img src="assets/projectileIcon.png" class="attackCategoryIcon" draggable="false"/> ${projectileModel["displayName"]}`
            projectileName.className = "attackName notCentered"
            projectilesContainer.appendChild(projectileName)
            generateHeroProjectile(projectileModel, projectileDiv)
            projectilesContainer.appendChild(projectileDiv)
            if (projectileModel.hasOwnProperty("emissions")) {
                const h = hero.getData()
                const emissionsContainer = document.createElement("div")
                for (const emissionName of projectileModel["emissions"]) {
                    for (const name in h["projectiles"]) {
                        if (emissionName == name) generateHeroEmission(h["projectiles"][emissionName], emissionsContainer, "projectile")
                    }
                    if (h.hasOwnProperty("statuses")) {
                        for (const name in h["statuses"]) {
                            if (emissionName == name) generateHeroEmission(h["statuses"][emissionName], emissionsContainer, "status")
                        }
                    }
                    if (h.hasOwnProperty("supports")) {
                        for (const name in h["supports"]) {
                            if (emissionName == name) generateHeroEmission(h["supports"][emissionName], emissionsContainer, "support")
                        }
                    }
                }
                projectilesContainer.appendChild(emissionsContainer)
            }
            heroStatsContainer.appendChild(projectilesContainer)
        }
    }
    if (h.hasOwnProperty("abilities")) {
        const abilitiesContainer = document.createElement("div")
        abilitiesContainer.className = "abilitiesContainer"
        for (const temp of h["enabledAbilities"]) {
            const abilityDiv = document.createElement("div")
            abilityDiv.className = "attackDiv notCentered"
            const abilityModel = h["abilities"][temp]
            const abilityName = document.createElement("h2")
            abilityName.innerHTML = `<img src="assets/activatedAbilityIcon.png" class="attackCategoryIcon" draggable="false"/> ${abilityModel["displayName"]}`
            abilityName.className = "attackName notCentered"
            abilitiesContainer.appendChild(abilityName)
            createElem(`${abilityModel["cooldown"]}s`, "Cooldown", abilityDiv)
            if (abilityModel.hasOwnProperty("duration")) createElem(`${abilityModel["duration"]}s`, "Duration", abilityDiv)
            if (abilityModel.hasOwnProperty("range")) createElem(abilityModel["range"], "Range", abilityDiv)
            if (abilityModel.hasOwnProperty("description")) createElem(`${abilityModel["description"]}`, "Description", abilityDiv)
            if (abilityModel.hasOwnProperty("special")) createElem(abilityModel["special"], "Special", abilityDiv)
            abilitiesContainer.appendChild(abilityDiv)
            if (abilityModel.hasOwnProperty("emissions")) {
                const emissionsContainer = document.createElement("div")
                for (const emissionName of abilityModel["emissions"]){
                    for (const name in h["projectiles"]) {
                        if (emissionName == name) generateHeroEmission(h["projectiles"][emissionName], emissionsContainer, "projectile")
                    }
                    if (h.hasOwnProperty("statuses")) {
                        for (const name in h["statuses"]) {
                            if (emissionName == name) generateHeroEmission(h["statuses"][emissionName], emissionsContainer, "status")
                        }
                    }
                    if (h.hasOwnProperty("supports")) {
                        for (const name in h["supports"]) {
                            if (emissionName == name) generateHeroEmission(h["supports"][emissionName], emissionsContainer, "support")
                        }
                    }
                }
                abilitiesContainer.appendChild(emissionsContainer)
            }
        }
        heroStatsContainer.appendChild(abilitiesContainer)
    }
    if (h.hasOwnProperty("supports")) {
        const supportsContainer = document.createElement("div")
        supportsContainer.className = "supportsContainer notCentered"
        for (const temp of h["enabledSupports"]) {
            const supportDiv = document.createElement("div")
            supportDiv.className = "attackDiv notCentered"
            const supportModel = h["supports"][temp]
            const supportName = document.createElement("h2")
            supportName.innerHTML = `<img src="assets/supportIcon.png" class="attackCategoryIcon" draggable="false"/> ${supportModel["displayName"]}`
            supportName.className = "attackName notCentered"
            supportsContainer.appendChild(supportName)
            if (supportModel.hasOwnProperty("target")) createElem(supportModel["target"], "Affects", supportDiv)
            if (supportModel.hasOwnProperty("buff")) createElem(supportModel["buff"], "Buff", supportDiv)
            if (supportModel.hasOwnProperty("duration")) createElem(`${supportModel["duration"]}s`, "Duration", supportDiv)
            if (supportModel.hasOwnProperty("description")) createElem(supportModel["description"], "Description", supportDiv)
            if (supportModel.hasOwnProperty("special")) createElem(supportModel["special"], "Special", supportDiv)
            supportsContainer.appendChild(supportDiv)
        }
        heroStatsContainer.appendChild(supportsContainer)
    }
    window.scrollTo({ top: scrollPos })
    editURL("level", level)
}

function displayStore(heroData, heroName, item) {
    const overviewStatsContainer = document.querySelector(".overviewStatsContainer")
    for (const child of Array.from(overviewStatsContainer.children)) child.remove()
    for (const child of Array.from(document.querySelector(".relatedStatsContainer").children)) child.remove()
    document.querySelector(".itemPortrait").src = item["icon"]
    document.querySelector(".itemName").innerText = item["displayName"]
    document.querySelector(".itemOverviewDescription").innerText = item["description"]
    if (heroName === "Geraldo") {
        overviewStatsContainer.innerHTML += `
        <div class="overviewStatsSectionContainer withImage">
            <div class="descriptionContainer">
              <h4 class="storeOverviewIconDescription">Cost</h4>
            </div>
            <div class="overviewImageAndValueContainer">
              <img src="assets/moneyIcon.png" alt="" class="overviewImage">
              <p class="storeItemCost">${item["cost"]}</p>
            </div>
            </div>
        </div>
        <div class="overviewStatsSectionContainer withImage">
        <div class="descriptionContainer">
            <h4 class="storeOverviewIconDescription">Refresh Time</h4>
        </div>
        <div class="overviewImageAndValueContainer">
            <span class="material-symbols-outlined reloadTimeIcon overviewIcon">refresh</span>
            <p class="storeItemReloadTime">${item["refreshRounds"]} round(s) per item</p>
        </div>
        </div>
        `
        let duration = item["durationRounds"]
        if (!duration) duration = "Infinite"
       overviewStatsContainer.innerHTML += `
       <div class="overviewStatsSectionContainer withImage">
            <div class="descriptionContainer">
            <h4 class="storeOverviewIconDescription">Duration</h4>
            </div>
            <div class="overviewImageAndValueContainer">
            <img src="assets/timer.png" alt="" class="overviewImage">
            <p class="storeItemDurationTime">${duration} rounds</p>
            </div>
        </div>
        <div class="overviewStatsSectionContainer geraldoExclusiveContainer">
            <h4 class="overviewHeader">Max Stock</h4>
            <p class="storeItemMaxStock">${item["maxStock"]} items</p>
        </div>`
        if (item.hasOwnProperty("footprintRadius")) overviewStatsContainer.innerHTML += `
        <div class="overviewStatsSectionContainer geraldoExclusiveContainer">
            <h4 class="overviewHeader">Tower Size</h4>
            <p class="storeItemRange">${getFootprintInEnglish(item["footprintRadius"])} (${item["footprintRadius"]})</p>
        </div>`
        if (item.hasOwnProperty("range")) overviewStatsContainer.innerHTML += `
        <div class="overviewStatsSectionContainer geraldoExclusiveContainer">
            <h4 class="overviewHeader">Range</h4>
            <p class="storeItemRange">${item["range"]}</p>
        </div>`
        if (item.hasOwnProperty("special")) overviewStatsContainer.innerHTML += `
        <div class="overviewStatsSectionContainer special">
            <h4 class="overviewHeader">Special</h4>
            <p class="storeItemRange">${item["special"]}</p>
        </div>`
    } else if (heroName === "Corvus") {
        overviewStatsContainer.innerHTML += `
        <div class="overviewStatsSectionContainer">
            <h4 class="overviewHeader">Mana Cost</h4>
            <p class="storeItemMaxStock">${item["cost"]}</p>
        </div>
        `
        if (item.hasOwnProperty("cooldown")) overviewStatsContainer.innerHTML += `
        <div class="overviewStatsSectionContainer withImage">
        <div class="descriptionContainer">
            <h4 class="storeOverviewIconDescription">Cooldown</h4>
        </div>
        <div class="overviewImageAndValueContainer">
            <span class="material-symbols-outlined reloadTimeIcon overviewIcon">refresh</span>
            <p class="storeItemReloadTime">${item["cooldown"]} seconds</p>
        </div>
        </div>
        `
        let duration
        if (item.hasOwnProperty("duration")) {
            duration = item["duration"]
            if (!duration) duration = "Infinite"
            overviewStatsContainer.innerHTML += `
            <div class="overviewStatsSectionContainer withImage">
                    <div class="descriptionContainer">
                    <h4 class="storeOverviewIconDescription">Duration</h4>
                    </div>
                    <div class="overviewImageAndValueContainer">
                    <img src="assets/timer.png" alt="" class="overviewImage">
                    <p class="storeItemDurationTime">${duration} seconds</p>
                    </div>
                </div>
                `
        }
        if (item.hasOwnProperty("special")) overviewStatsContainer.innerHTML += `
        <div class="overviewStatsSectionContainer special">
            <h4 class="overviewHeader">Special</h4>
            <p class="storeItemRange">${item["special"]}</p>
        </div>`
    }
    if (item.hasOwnProperty("hasAttacks")) {
        for (const attack of item["hasAttacks"]) {
            const attackDiv = document.createElement("div")
            attackDiv.className = "attackDiv notCentered"
            const currAttack = heroData["projectiles"][attack]
            generateHeroProjectile(currAttack, attackDiv)
            document.querySelector(".relatedStatsContainer").appendChild(attackDiv)
            if (currAttack.hasOwnProperty("emissions")) {
                const emissionsContainer = document.createElement("div")
                for (const emissionName of currAttack["emissions"]){
                    for (const name in heroData["projectiles"]) {
                        if (emissionName == name) generateHeroEmission(heroData["projectiles"][emissionName], emissionsContainer, "projectile")
                    }
                    if (heroData.hasOwnProperty("statuses")) {
                        for (const name in heroData["statuses"]) {
                            if (emissionName == name) generateHeroEmission(heroData["statuses"][emissionName], emissionsContainer, "status")
                        }
                    }
                    if (heroData.hasOwnProperty("supports")) {
                        for (const name in heroData["supports"]) {
                            if (emissionName == name) generateHeroEmission(heroData["supports"][emissionName], emissionsContainer, "support")
                        }
                    }
                }
                document.querySelector(".relatedStatsContainer").appendChild(emissionsContainer)
            }
        }
    }
    if (item.hasOwnProperty("hasStatuses")) {
        for (const attack of item["hasStatuses"]) {
            generateHeroEmission(heroData["statuses"][attack], document.querySelector(".relatedStatsContainer"), "status")
        }
    }
    if (item.hasOwnProperty("hasSupports")) {
        for (const attack of item["hasSupports"]) {
            generateHeroEmission(heroData["supports"][attack], document.querySelector(".relatedStatsContainer"), "support")
        }
    }
}

function generateHeroEmission(data, container, type) {
    const h = hero.getData()
    const emissionDiv = document.createElement("div")
    emissionDiv.className = "attackDiv notCentered"
    const emissionName = document.createElement("h3")
    let emissionImage = type == "support" ? "assets/supportIcon.png" : "assets/projectileIcon.png"
    emissionName.innerHTML = `<img src="${emissionImage}" class="attackCategoryIcon" draggable="false"/> ${data["displayName"]}`
    emissionName.className = "attackName notCentered emissionName"
    container.appendChild(emissionName)
    container.appendChild(emissionDiv)
    if (type != "support") { 
        generateHeroProjectile(data, emissionDiv) 
    } else {
        createElem(data["target"], "Affects", emissionDiv)
        createElem(data["buff"], "Buff", emissionDiv)
        if (data.hasOwnProperty("duration")) createElem(`${data["duration"]}s`, "Duration", emissionDiv)
        if (data.hasOwnProperty("description")) createElem(data["description"], "Description", emissionDiv)
        if (data.hasOwnProperty("special")) createElem(data["special"], "Special", emissionDiv)
    }
    if (data.hasOwnProperty("emissions")) {
        const h = hero.getData()
        const emissionsContainer = document.createElement("div")
        for (const emissionName of data["emissions"]) {
            for (const name in h["projectiles"]) {
                if (emissionName == name) generateHeroEmission(h["projectiles"][emissionName], emissionsContainer, "projectile")
            }
            if (h.hasOwnProperty("statuses")) {
                for (const name in h["statuses"]) {
                    if (emissionName == name) generateHeroEmission(h["statuses"][emissionName], emissionsContainer, "status")
                }
            }
            if (h.hasOwnProperty("supports")) {
                for (const name in h["supports"]) {
                    if (emissionName == name) generateHeroEmission(h["supports"][emissionName], emissionsContainer, "support")
                }
            }
        }
        container.appendChild(emissionsContainer)
    }
}

function generateHeroProjectile(data, container) {
    if (data.hasOwnProperty("damageType")) generateDamageTypeIcons(data, container)
    if (data.hasOwnProperty("dmgBase")) {
        const damageDiv = document.createElement("div")
        damageDiv.className = "damageDiv"
        if (data.hasOwnProperty("dmgBase")) createElem(data["dmgBase"], "Base", damageDiv, "Damage")
        if (data.hasOwnProperty("dmgBonusCeram")) createElem(`${data["dmgBase"] + data["dmgBonusCeram"]}`, "Ceramic", damageDiv)
        if (data.hasOwnProperty("dmgBonusMOAB")) createElem(`${data["dmgBase"] + data["dmgBonusMOAB"]}`, "MOAB", damageDiv)
        if (data.hasOwnProperty("dmgBonusFortified")) createElem(`+${data["dmgBonusFortified"]}`, "Bonus Fortified", damageDiv)
        if (data.hasOwnProperty("dmgBonusLead")) createElem(`+${data["dmgBonusLead"]}`, "Bonus Lead", damageDiv)
        if (data.hasOwnProperty("dmgBonusStunned")) createElem(`+${data["dmgBonusStunned"]}`, "Bonus Stunned", damageDiv)
        container.appendChild(damageDiv)
    }
    if (data.hasOwnProperty("pierce")) {
        if (!data["pierce"]) createElem("infinite", "Pierce", container)
        else createElem(data["pierce"], "Pierce", container)
    }
    if (data.hasOwnProperty("attackRate")) createElem(`${formatNumber(data["attackRate"])}s`, "Attack Rate", container)
    if (data.hasOwnProperty("projectiles")) createElem(data["projectiles"], "Projectiles", container)
    if (data.hasOwnProperty("frequency")) createElem(data["frequency"], "Frequency", container)
    if (data.hasOwnProperty("range")) createElem(data["range"], "Range", container)
    if (data.hasOwnProperty("lifespan")) {
        const lifespanDiv = document.createElement("div")
        lifespanDiv.className = "damageDiv lifespanDiv"
        createElem(`${data["lifespan"]}s`, "Time", lifespanDiv, "Lifespan")
        if (data.hasOwnProperty("lifespanRounds")) createElem(data["lifespanRounds"], "Rounds", lifespanDiv)
        container.appendChild(lifespanDiv)
    }
    if (data.hasOwnProperty("tickRate")) createElem(`${data["tickRate"]}s`, "Tick Rate", container)
    if (data.hasOwnProperty("duration")) createElem(`${data["duration"]}s`, "Duration", container) 
    if (data.hasOwnProperty("damageDebuff")) createElem(`+${data["damageDebuff"]} damage`, "Debuff", container)
    if (data.hasOwnProperty("description")) createElem(data["description"], "Description", container)
    if (data.hasOwnProperty("special")) createElem(data["special"], "Special", container)
}

function generateDamageTypeIcons(data, container) {
    const poppingPower = getParsedDamageType(data["damageType"])
    const canPopBlack = poppingPower[0] ? "assets/greenCheck.png" : "assets/redX.png"
    const canPopWhite = poppingPower[1] ? "assets/greenCheck.png" : "assets/redX.png"
    const canPopPurple = poppingPower[2] ? "assets/greenCheck.png" : "assets/redX.png"
    const canPopLead = poppingPower[3] ? "assets/greenCheck.png" : "assets/redX.png"
    const canPopFrozen = poppingPower[4] ? "assets/greenCheck.png" : "assets/redX.png"
    container.innerHTML += `
        <div class="damageTypeIconContainer">
            <div class="indivDamageTypeContainer">
                <img src="https://i.ibb.co/kDgsV06/black-Bloon.webp" alt="Can Pop Black" class="damageTypeImage">
                <img src=${canPopBlack} alt=${poppingPower[0]} class="damageTypeImage">
            </div>
            <div class="indivDamageTypeContainer">
                <img src="https://i.ibb.co/Q8F46kc/white-Bloon.webp" alt="Can Pop White" class="damageTypeImage">
                <img src=${canPopWhite} alt=${poppingPower[1]} class="damageTypeImage">
            </div>
            <div class="indivDamageTypeContainer">
                <img src="https://i.ibb.co/LtPry6q/purple-Bloon.webp" alt="Can Pop Purple" class="damageTypeImage">
                <img src=${canPopPurple} alt=${poppingPower[2]} class="damageTypeImage">
            </div>
            <div class="indivDamageTypeContainer">
                <img src="https://i.ibb.co/6mb6QPj/lead-Bloon.webp" alt="Can Pop Lead" class="damageTypeImage">
                <img src=${canPopLead} alt=${poppingPower[3]} class="damageTypeImage">
            </div>
            <div class="indivDamageTypeContainer">
                <img src="https://i.ibb.co/X8jqXsP/frozen-Bloon.png" alt="Can Pop Frozen" class="damageTypeImage">
                <img src=${canPopFrozen} alt=${poppingPower[4]} class="damageTypeImage">
            </div>
        </div>
    `
    if (data.hasOwnProperty("camo")) {
        const canPopCamo = data["camo"] ? "assets/greenCheck.png" : "assets/redX.png"
        container.querySelector(".damageTypeIconContainer").innerHTML += `
            <div class="indivDamageTypeContainer">
                <img src="https://i.ibb.co/zVDR6x5/camoRed.png" alt="Can Pop Camo" class="damageTypeImage">
                <img src=${canPopCamo} alt=${data["camo"]} class="damageTypeImage">
            </div>
        `
    }
}

function editHeroDataAtLevel(level) {
    hero.resetData()
    const data = hero.getData()
    const levels = data["levels"]
    const name = data["hero"]
    for (let i = 0; i < level; i++) {
        const currentLevel = levels[i]
        if (currentLevel.hasOwnProperty("editItems")) {
            for (const obj of currentLevel["editItems"]) {
                hero.editItem(obj)
            }
        }
        if (currentLevel.hasOwnProperty("addProperties")) {
            for (const obj of currentLevel["addProperties"]) {
                hero.addProperty(obj)
            }
        }
        if (currentLevel.hasOwnProperty("addAttacks")) {
            for (const name of currentLevel["addAttacks"]) {
                hero.addAttack(name)
            }
        }
        if (currentLevel.hasOwnProperty("addAbility")) {
            hero.addAbility(currentLevel["addAbility"])
        }
        if (currentLevel.hasOwnProperty("addSupports")) {
            for (const name of currentLevel["addSupports"]) {
                hero.addSupport(name)
            }
        }
        if (currentLevel.hasOwnProperty("addRange")) {
            hero.addRange(currentLevel["addRange"])
        }
        if (currentLevel.hasOwnProperty("editDescription")) {
            hero.editDescription(currentLevel["editDescription"])
        }
        if (currentLevel.hasOwnProperty("editFootprint")) {
            hero.editFootprint(currentLevel["editFootprint"])
        }
        if (name === "Geraldo" || name === "Corvus") {
            if (currentLevel.hasOwnProperty("editStore")) {
                for (const data of currentLevel["editStore"]) {
                    hero.editStore(data)
                }
            }
        }
    }
    const abilities = data["abilities"]
    if (abilities) {
        for (const key of Object.keys(abilities)) {
            if (abilities[key].hasOwnProperty("addDurationPerLevel")) {
                hero.editItem({
                    "target": key,
                    "item": "duration",
                    "type": "add",
                    "value": abilities[key]["addDurationPerLevel"] * level
                })
            }
            if (abilities[key].hasOwnProperty("reduceCooldownPerLevel")) {
                hero.editItem({
                    "target": key,
                    "item": "cooldown",
                    "type": "subtract",
                    "value": abilities[key]["reduceCooldownPerLevel"] * level
                })
            }
        }
    }
}

// this is kinda confusing but imma actually try to explain this one
// ORDER: black, white, purple, lead, frozen
// EX: "sharp" returns [true, true, true, false, false] because it CAN pop black, white, purple, but NOT lead or frozen
// check the table at the bottom of the btd6 popology on reddit and it will all make sense
function getParsedDamageType(str) {
    switch (str) {
        case "normal": return [true, true, true, true, true]
        case "acid": return [true, true, true, true, true]
        case "sharp": return [true, true, true, false, false]
        case "explosion": return [false, true, true, true, true]
        case "cold": return [true, false, true, false, false]
        case "glacier": return [true, false, true, false, true]
        case "shatter": return [true, true, true, false, true]
        case "energy": return [true, true, false, false, true]
        case "plasma": return [true, true, false, true, true]
        case "fire": return [true, true, false, true, true]
        default: return [true, true, true, true, true]
    }
}

function getFootprintInEnglish(num) {
    if (num == 0) return "None"
    else if (num < 6) return "Extra Small"
    else if (num == 6) return "Small"
    else if (num == 7) return "Medium"
    else if (num == 8) return "Large"
    else return "Extra Large"
}

function getHeroLevel(xpCurve, startRound, targetRound, difficultyBonus, energizerRound) {
    if (!startRound) {
        return "start round missing"
    } else if (!targetRound) {
        return "end round missing"
    } else if (startRound > targetRound) {
        return "Level 1"
    }
    let xp = 0
    for (let i = startRound; i < targetRound; i++) {
        let xpBonus = 0
        xpBonus += getXPAtRound(i)
        if (energizerRound && energizerRound <= i) xpBonus *= 1.5
        xp += xpBonus
    }
    xp *= difficultyBonus
    let xpAfterCurve = Array.from(BASE_XP_REQUIREMENTS)
    for (let i = 0; i < xpAfterCurve.length; i++) {
        xpAfterCurve[i] *= xpCurve
    }
    let xpRequirement = 0
    for (let i = 0; i < xpAfterCurve.length; i++) {
        xpRequirement += xpAfterCurve[i]
        if (xpRequirement > xp) {
            if (i <= 1) return "Level 1"
            else return `Level ${i}`
        } else if (i == 19) return "Level 20"
    }
}
function getHeroLevelBy(xpCurve, targetLevel, targetRound, difficultyBonus) {
    if (!targetLevel) return "target level missing"
    if (!targetRound) return "target round missing"
    let xpAfterCurve = Array.from(BASE_XP_REQUIREMENTS)
    for (let i = 0; i < xpAfterCurve.length; i++) {
        xpAfterCurve[i] *= xpCurve
    }
    let requiredXP = 0
    for (let i = 0; i < targetLevel; i++) {
        requiredXP += xpAfterCurve[i]
    }
    let xp = 0
    for (let i = targetRound; i > 0; i--) {
        xp += getXPAtRound(i) * difficultyBonus
        if (xp >= requiredXP) {
            return `Place your hero during or before round ${i}.`
        }
    }
    return `It's not possible to get your hero to level ${targetLevel} by round ${targetRound} without spending extra resources.`
 }
function getXPAtRound(round) {
    if (round < 20) {
        return (20 * round) + 20
    } else if (round < 50) {
        return (40 * (round - 20)) + 420
    } else {
        return (90 * (round - 50)) + 1620
    }
}
function swapToHeroCalculator() {
    document.querySelector(".towerPickContainer").style.display = "none"
    document.querySelector(".filterHeader").style.display = "none"
    document.querySelector(".optionsBar").style.display = "none"
    document.querySelector(".toolsPickContainer").style.display = "none"
    // document.querySelector(".paragonDegreeCalculatorContainer").style.display = "none"
    document.querySelector(".actuallyTakeMeHomeContainer").style.display = "none"
    document.querySelector(".takeMeHomeContainer").style.display = "block"
    backButton.style.display = "block"
    document.querySelector(".heroLevelCalculatorContainer").style.display = "block"
    editURL("menu", "heroLevelCalculator")
}



for (const element of document.querySelectorAll(".paragon")) {
    if (!element.classList.contains("wip")) {
      element.onclick = () => {
        swapToTower("paragons", element.id, 1)
        editURL("paragon", element.id)
      }
    }
}
for (const element of document.querySelectorAll(".hero")) {
    if (!element.classList.contains("wip")) {
        element.onclick = () => {
            swapToTower("heroes", element.id, 1)
            editURL("hero", element.id)
        }
    }
}
document.querySelector(".confirmHeroBasicCalcButton").onclick = () => {
    const energizerRound = document.querySelector("#energizerRoundCalcInput").value ? document.querySelector("#energizerRoundCalcInput").value : null

    const level = getHeroLevel(
        document.querySelector("#heroBasicCalcInput").value,
        Math.round(document.querySelector("#heroStartRoundCalcInput").value),
        Math.round(document.querySelector("#heroEndRoundCalcInput").value),
        document.querySelector("#mapDifficultyCalcInput").value,
        energizerRound
    )
    console.log(level)
    document.querySelector(".heroLevelBasicResult").innerText = level
}
document.querySelector(".confirmHeroLevelByButton").onclick = () => {
    let targetLevel = Math.round(document.querySelector("#heroLevelByTargetLevel").value)
    if (targetLevel > 20) targetLevel = 20
    else if (targetLevel && targetLevel < 1) targetLevel = 1
    const round = getHeroLevelBy(
        document.querySelector("#heroLevelByCalcInput").value,
        targetLevel,
        Math.round(document.querySelector(".heroGoalRoundInput").value),
        document.querySelector("#mapDifficultyLevelByInput").value
    )
    document.querySelector(".heroLevelByResult").innerText = round
}
document.querySelector(".heroLevelButton").onclick = () => {
    swapToHeroCalculator()
}
/* document.querySelector(".paragonDegreeButton").onclick = () => {
    document.querySelector(".towerPickContainer").style.display = "none"
    document.querySelector(".filterHeader").style.display = "none"
    document.querySelector(".optionsBar").style.display = "none"
    document.querySelector(".toolsPickContainer").style.display = "none"
    document.querySelector(".paragonDegreeCalculatorContainer").style.display = "none"
    document.querySelector(".actuallyTakeMeHomeContainer").style.display = "none"
    document.querySelector(".takeMeHomeContainer").style.display = "block"
    backButton.style.display = "block"
    document.querySelector(".paragonDegreeCalculatorContainer").style.display = "block"
    editURL("menu", "paragonDegreeCalculator")
} */
const optionsBarArray = Array.from(document.querySelector(".optionsBar").children)
for (const child of optionsBarArray) {
    child.onclick = () => {
        checkFilter(child.id)
        child.classList.add("selected")
        for (const elem of optionsBarArray) {
            if (child.id !== elem.id) elem.classList.remove("selected")
        }
    }
}

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
    towerPickContainer.style.display = "block"
    for (const elem of Array.from(towerPickContainer.children)) elem.style.display = "flex"
    document.querySelector(".filterHeader").style.display = "block"
    document.querySelector(".optionsBar").style.display = "flex"
    backButton.style.display = "none"
    // document.querySelector(".toolsPickContainer").style.display = "flex"
    // document.querySelector(".heroLevelCalculatorContainer").style.display = "none"
    // document.querySelector(".paragonDegreeCalculatorContainer").style.display = "none"
    document.querySelector(".disclaimerContainer").style.margin = "50px 0 20px 20px"
    document.querySelector(".chooseLevelButton.selected").classList.remove("selected")
    document.querySelector("#chooseLevel1").classList.add("selected")
    checkFilter()
    editURL("paragon", null)
    editURL("level", null)
    editURL("menu", null)
    editURL("hero", null)
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
function enableLoading(str) {
    const msgElem = document.querySelector(".loadingMessage")
    document.querySelector(".popupOverlay").style.display = "block"
    document.querySelector(".loading").style.display = "flex"
    if (str) {
        msgElem.innerHTML = str
    } else {
        msgElem.innerHTML = ""
    }
    document.body.classList.add("no-scroll")
}
function disableLoading() {
    document.querySelector(".popupOverlay").style.display = "none"
    document.querySelector(".loading").style.display = "none"
    document.body.classList.remove("no-scroll")
}
 

async function main() {
    checkFilter("noFilter")
    for (const vrej of dataContainers) {
        vrej.style.display = "none"
    }
    urlMenu = urlParams.get("menu")
    urlParagon = urlParams.get("paragon")
    urlHero = urlParams.get("hero")
    urlTower = urlParams.get("tower")
    urlLevel = urlParams.get("level")
    if (urlMenu != null) {
        if (urlMenu == "heroLevelCalculator") swapToHeroCalculator()
    } else if (urlParagon != null) {
        swapToTower("paragons", urlParagon, urlLevel)
        paragonDegreeInput.value = urlLevel
    } else if (urlHero != null) {
        urlLevel = Math.round(urlLevel)
        if (urlLevel < 1) urlLevel = 1
        else if (urlLevel > 20) urlLevel = 20
        swapToTower("heroes", urlHero, urlLevel)
        document.querySelector(`#chooseLevel${urlLevel}`).classList.add("selected")
        document.querySelector("#chooseLevel1").classList.remove("selected")
    }
}
main()