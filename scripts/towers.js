const paragonDegreeSlider = document.querySelector(".paragonDegreeSlider")
let monkeyList = document.querySelectorAll(".monkey")
let heroList = document.querySelectorAll(".hero")
let paragonList = document.querySelectorAll(".paragon")
let parentList = [monkeyList, heroList, paragonList]

let monkeyData;
let heroData;
let paragon;
let costs;

const filterSelect = document.querySelector(".filterSelect")
let appliedFilter = "noWIP" // placeholder

class Paragon {
    constructor(paragonData) {
        this.paragon = structuredClone(paragonData)
    }
    // x is for degree
    applyDegreeBonus(x) {
        let cp = structuredClone(this.paragon)
        if (cp.hasOwnProperty("abilities")) {
            for (const abilityModel of cp["abilities"]) {
                console.log("I hate everything about this.")
            }
        }
        for (let i = 0; i < cp["attacks"].length; i++) {
            let attackModel = cp["attacks"][i]
            attackModel["rate"] = attackModel["rate"] / (1 + Math.sqrt((x-1) * 50) * 0.01)
            // copy below
            if (attackModel["pierce"] != null) attackModel["pierce"] = attackModel["pierce"] * (1 + 0.01 * (x - 1)) + (x - 1)
            else attackModel["pierce"] = 1
            let dmgModel = attackModel["dmg"]
            dmgModel["base"] *= (1 + (x-1)*0.01) + Math.floor((x-1)/10)
            if (dmgModel.hasOwnProperty("bonusCeram")) dmgModel["bonusCeram"] *= (1 + (x-1)*0.01)
            if (dmgModel.hasOwnProperty("bonusMOAB")) dmgModel["bonusMOAB"] *= (1 + (x-1)*0.01)
            if (dmgModel.hasOwnProperty("bonusCamo")) dmgModel["bonusCamo"] *= (1 + (x-1)*0.01)
            if (dmgModel.hasOwnProperty("bonusBoss")) dmgModel["bonusBoss"] = (dmgModel["bonusBoss"] * (1 + Math.floor(x/20)*0.25)) + (dmgModel["bonusBoss"] * (1 + (x-1)*0.01))
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
    if (attackModel["type"] == "attack"){
        if (attackModel["pierce"] != null) attackModel["pierce"] = attackModel["pierce"] * (1 + 0.01 * (x - 1)) + (x - 1)
        else attackModel["pierce"] = 1

        let dmgModel = attackModel["dmg"]
        dmgModel["base"] *= (1 + (x-1)*0.01) + Math.floor((x-1)/10)
        if (dmgModel.hasOwnProperty("bonusCeram")) dmgModel["bonusCeram"] *= (1 + (x-1)*0.01)
        if (dmgModel.hasOwnProperty("bonusMOAB")) dmgModel["bonusMOAB"] *= (1 + (x-1)*0.01)
        if (dmgModel.hasOwnProperty("bonusBoss")) dmgModel["bonusBoss"] = (dmgModel["bonusBoss"] * (1 + Math.floor(x/20)*0.25)) + (dmgModel["bonusBoss"] * (1 + (x-1)*0.01))
        if (attackModel.hasOwnProperty("emits")) {
            for (const emissionModel of attackModel["emits"]) applyDegreeBonusForSubEffects(emissionModel, x)
        }
    }
}


/**************************************************/




async function getData(category, tower) {
    try {
        costs = await(await fetch("https://raw.githubusercontent.com/Nitjus7/BTD6-Central-Data/main/stats/towers/costs.json")).json()
        paragon = new Paragon(await(await fetch(`https://raw.githubusercontent.com/Nitjus7/BTD6-Central-Data/main/stats/towers/${category}/${tower}.json`)).json())
    } catch(error) {
        alert("There was an error while getting tower data. Some features may not work.")
        console.log(error)
        return "oops"
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
checkFilter()

async function swapToTower(category, tower) {
    if (await getData(category, tower) == "oops") return "CRITICAL ERROR DETECTED."
    document.querySelector(".towerPickContainer").style.display = "none"
    document.querySelector(".optionsBar").style.display = "none"
    console.log(paragon.returnData())
    console.log(paragon.applyDegreeBonus(100))
}

filterSelect.addEventListener("change", checkFilter)

for (const element of document.querySelectorAll(".paragon")) {
    if (!element.classList.contains("wip")) {
      element.onclick = () => {
        swapToTower("paragons", element.id)
      }
    }
}