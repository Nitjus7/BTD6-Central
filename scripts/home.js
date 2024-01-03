const link1Name = "goToParagons"
const link2Name = "goToMaps"
const link3Name = "goToBosses"
const link4Name = "goToRaces"

function generateResourceLinks() {
  /* document.querySelector(".jumpToResourcesButton").onclick = () => {
    document.querySelector(".resourcesHeader").scrollIntoView({ behavior: 'smooth', top: "0" })
  } */
  document.querySelector(".goToBTD6CentralDiscord").onclick = () => {
    window.open("https://discord.com/invite/xNxjqXBp6B")
  }
  document.querySelector(".goToBTD6Index").onclick = () => {
    window.open("https://btd6index.win/")
  }
  document.querySelector(".goToBTD6Popology").onclick = () => {
    window.open("https://www.reddit.com/r/btd6/comments/atomg3/advanced_popology_vol_1_primary_towers/")
  }
  document.querySelector(".goToCyberQuincy").onclick = () => {
    window.open("https://top.gg/bot/591922988832653313")
  }
  document.querySelector(".goToB2Popology").onclick = () => {
    window.open("https://b2popology.com/")
  }
}
function generateFeaturedPagesLinks() {
  const links1 = Array.from(document.querySelectorAll(".goToLink1"))
  const links2 = Array.from(document.querySelectorAll(".goToLink2"))
  const links3 = Array.from(document.querySelectorAll(".goToLink3"))
  const links4 = Array.from(document.querySelectorAll(".goToLink4"))
  for (const link of links1) {
    link.onclick = () => {
      window.open("https://nitjus7.github.io/BTD6-Central/towers.html")
    }
  }
  for (const link of links2) {
    link.onclick = () => {
      window.open("https://nitjus7.github.io/BTD6-Central/community.html")
    }
  }
  for (const link of links3) {
    link.onclick = () => {
      window.open("https://nitjus7.github.io/BTD6-Central/events.html?event=bosses")
    }
  }
  for (const link of links4) {
    link.onclick = () => {
      window.open("events.html?event=races") // testing this for when I push to github to see if it still works
    }
  }
}
const navList = document.querySelector(".navList")
window.addEventListener('scroll', function() {
  if (window.scrollY <= 45) navList.classList.add("navBeforeScroll")
  else navList.classList.remove("navBeforeScroll")
})
generateResourceLinks()
generateFeaturedPagesLinks()
// main() 
/* const newsContainer = document.querySelector(".newsContainer")
let newsCards
formatting for news card
{
  "title": "",
  "description": "",
  "imageSrc": "",
  "links": [
        {
          "link": "",
          "name": ""
        }
      ],
  "dateInMilliseconds": 0,
  "big": false
},
*/
/* async function getData() {
  try {
    newsData = await(await fetch("https://raw.githubusercontent.com/Nitjus7/BTD6-Central-Data/main/news.json")).json()
    newsCards = newsData["body"]
  } catch(error) {
    alert("There was an issue while loading the latest news.")
  }
}
function generateNewsCards() {
  for (let i = 0; i < newsCards.length; i++) {
    const newsElement = document.createElement("div")
    newsElement.classList.add("newsCard")
    let newsCard = newsCards[i]
    generateNumber(i + 1, newsCards.length, newsElement)
    if (newsCard["title"] != null) generateTitle(newsCard, newsElement)
    if (newsCard["description"] != null) generateDescription(newsCard, newsElement)
    if (newsCard["imageSrc"] != null) generateImage(newsCard, newsElement)
    if (newsCard["links"] != null) generateLinks(newsCard, newsElement)
    if (newsCard["dateInMilliseconds"] != null) generateTimestamp(newsCard, newsElement)
    if (newsCard["big"]) newsElement.classList.add("bigNews")
    newsContainer.appendChild(newsElement)
  }
}
function generateNumber(number, totalCards, newsElement) {
  const numberElem = document.createElement("p")
  numberElem.classList.add("newsCardNumber")
  numberElem.innerText = `${number} out of ${totalCards}`
  newsElement.appendChild(numberElem)
}
function generateTitle(newsCard, newsElement) {
  const titleElem = document.createElement("h2")
  titleElem.classList.add("newsTitle")
  titleElem.innerText = newsCard["title"]
  newsElement.appendChild(titleElem)
}
function generateDescription(newsCard, newsElement) {
  const descElem = document.createElement("p")
  descElem.classList.add("newsDescription")
  descElem.innerHTML = newsCard["description"]
  newsElement.appendChild(descElem)
}
function generateImage(newsCard, newsElement) {
  const imageElem = document.createElement("img")
  imageElem.classList.add("newsImage")
  imageElem.src = newsCard["imageSrc"]
  newsElement.appendChild(imageElem)
}
function generateLinks(newsCard, newsElement) {
  for (const button of newsCard["links"]) {
    const linkElem = document.createElement("button")
    linkElem.classList.add("newsButton")
    linkElem.innerText = button["name"]
    linkElem.onclick = () => {
      window.open(button["link"])
    }
    newsElement.appendChild(linkElem)
  }
}
function generateTimestamp(newsCard, newsElement) {
  const timestampElem = document.createElement("p")
  timestampElem.classList.add("newsTimestamp");
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };
  const date = new Date(newsCard["dateInMilliseconds"])
  const formattedDate = date.toLocaleString(undefined, options);
  timestampElem.innerText = formattedDate
  newsElement.appendChild(timestampElem)
}

async function main() {
  generateResourceLinks()
  if (await getData() != "oops") generateNewsCards()
}
*/