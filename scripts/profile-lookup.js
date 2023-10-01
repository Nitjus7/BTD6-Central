const userIDInput = document.querySelector('.userIDInput')
const confirmIDButton = document.querySelector('.confirmIDButton')

const popupContainer = document.querySelector(".popupContainer")
const popupTitle = document.querySelector(".popupTitle")
const popupContentContainer = document.querySelector(".popupContentContainer")
const statsPopupOverlay = document.querySelector(".popupOverlay")

let regex = /[^a-zA-Z0-9_]/g
let userID
let playerData

confirmIDButton.onclick = () => {
    stupidFunction()
}
async function stupidFunction() {
    const id = userIDInput.value
    userID = id.trim()
    userIDInput.value = ""
    if (await getUserID() != "oops") swapTo("player")
}
async function getUserID() {
    try {
        let player
        if (userID.length < 1) { 
            throw new Error("ID Input Empty")
        } else if (regex.test(userID)) {
            throw new Error("Invalid Character")
        } else {
            let playerResponse = await fetch(`https://data.ninjakiwi.com/btd6/users/${userID}`)
            if (!playerResponse.ok) { 
                throw new Error("Invalid OAK ID")
            } else {
                player = await playerResponse.json()
                if (player["error"] != null && player["error"].includes("Invalid user ID")) throw new Error("Invalid OAK ID") 
                else if (player["error"] != null) throw new Error(player["error"])
                else playerData = player["body"]; return playerData;
            }
        }
    } catch(error) {
        let popupHTML
        if (error == "Error: Invalid OAK ID") {
            popupHTML = `
            <p>The OAK ID you used was not valid. Please verify the following.</p>
            <ul>
                <li>Be sure you used an OAK ID, <b>not</b> a User ID. If you need help on how to find an OAK ID, follow the guide at the bottom of the page.</li>
                <li>Double check to make sure that the OAK ID is correct.</li>
            </ul>`
        } else if (error == "Error: Invalid Character") {
            popupHTML = `
            <p>Your response contains invalid characters. An ID can only contain letters, numbers, and underscores.</p>`
        } else {
            popupHTML = `
            <p>Please input an OAK ID</p>`
        }
        showPopup(error, popupHTML)
        return "oops"
    }
}

function swapTo(category) {
    if (category == "player") showPopup("VALID USER ID!!!!!", "yipeee!! hip hip hooray!!")
}

function showPopup(title, content) {
    popupTitle.innerText = title
    popupContentContainer.innerHTML = content
    popupContainer.style.display = "block"
    popupOverlay.style.display = "block"
}

document.querySelector(".closePopupButton").onclick = () => {
    popupContainer.style.display = "none"
    statsPopupOverlay.style.display = "none"
  }