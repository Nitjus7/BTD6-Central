const baseParagonStats = [
    {
        "tower": "dart",
        "name": "Apex Plasma Master",
        "img": null,
        "atk": {
            "name": "Plasma Ball",
            "dmg": {
                "base": 15,
                "bonusCeram": 75,
                "bonusBoss": 80
            },
            "pierce": 200,
            "atkCD": 0.4,
            "projectiles": 3,
            "special": "Ricochets off of walls. Can rehit bloons.",
            "emits": {
                "name": "Mini Ball",
                "frequency": "Once at half pierce remaining and another time when destroyed.",
                "dmg": {
                    "base": 15,
                    "bonusCeram": 75,
                    "bonusBoss": 80
                }, 
                "pierce": 200,
                "projectiles": 2,
                "special": "Ricochets off of walls. Can rehit bloons."
            }
        }
    },
    {
    }
]

const monkeyListContainer = document.querySelector(".monkeyListContainer")
const heroListContainer = document.querySelector(".heroListContainer")
const paragonListContainer = document.querySelector(".paragonListContainer")
let monkeyList = monkeyListContainer.children
let heroList = heroListContainer.children
let paragonList = paragonListContainer.children
let parentList = [monkeyList, heroList, paragonList]

const filterSelect = document.querySelector(".filterSelect")
let appliedFilter = "noWIP" // placeholder

// type: "remove" means REMOVE elements with that class name
// type: "include" means only INCLUDE elements with that class name
function filter(name, type) {
    let idk = 0;
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
filterSelect.addEventListener("change", checkFilter)