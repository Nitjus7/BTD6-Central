const newsContainer = document.querySelector(".newsContainer")
const newsCards = 
  [
    {
      "title": "Website v0.4.4",
      "description": "Some more minor fixes/changes, including that Least Tiers Bosses will now display tiebreaker information. Up Next: Bloon & Boss Stats",
      "imageSrc": null,
      "links": null,
      "dateInMilliseconds": 1694145954627,
      "big": false
    },
    {
      "title": "Map Editor: First Look",
      "description": "The Map Editor is releasing in Version 39.0, along with a brand new Hero: Spirit Walker! While we haven't seen the new Hero, the Map Editor just got its first sneak peek.",
      "imageSrc": null,
      "links": [
        {
          "link": "https://www.tiktok.com/@ninja.kiwi/video/7276225750125120769",
          "name": "Check out the teaser!"
        }
      ],
      "dateInMilliseconds": 1694142436483,
      "big": true
    },
    {
      "title": "BTD6 for Xbox has released!",
      "description": "Important notes: BTD6 for Xbox is only updated to Version 32 without CT and does not support cross-play or the use of an NK account.",
      "imageSrc": "https://store-images.s-microsoft.com/image/apps.29629.14229635734755630.9b4f3e48-c3b4-4fee-884b-786bc5aa9bce.145640e0-b12a-4dd7-ba38-5ddd4475f66e?q=90&w=480&h=270",
      "links": [
        {
          "link": "https://www.xbox.com/en-US/games/store/bloons-td-6/9PHKZ9XT6F85",
          "name": "Buy BTD6 on Xbox"
        }
      ],
      "dateInMilliseconds": 1694008200868,
      "big": false
    },
    {
      "title": "Website v0.4.3",
      "description": "Fixed jittery scroll on mobile google and made the burger menu wider and bigger.",
      "imageSrc": "",
      "links": null,
      "dateInMilliseconds": 1693971028272,
      "big": false
    },
    {
      "title": "Website v0.4.2",
      "description": "Added a resources section at the bottom of the home page. Additionally, several minor formatting changes, and added images to the news section. A full list of changes can be found in the Discord server linked in the new Resources section.",
      "imageSrc": null,
      "links": null,
      "dateInMilliseconds": 1693956333401,
      "big": false
    },
    {
      "title": "Website v0.4.1",
      "description": "Fixed some issues with formatting, mostly with mobile. View full details in the Discord server.",
      "imageSrc": null,
      "links": [
        {
          "link": "https://discord.com/invite/xNxjqXBp6B",
          "name": "Join the BTD6 Central Discord Server"
        }
      ],
      "dateInMilliseconds": 1693886071939,
      "big": false
    },
    {
      "title": "BTD6 Central is in Beta! Version 0.4.0",
      "description": "After lots of development time, BTD6 Central is finally ready for 'beta.' Check out the event archive using the menu in the top right.\nChanges for 0.4.0: New home page, added a hamburger, and dark mode support based on system settings.",
      "imageSrc": "https://i.ibb.co/7rKMr1k/victory.webp",
      "links": null,
      "dateInMilliseconds": 1693868984692,
      "big": true
    }
  ]
/* formatting for news card
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
  descElem.innerText = newsCard["description"]
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


function generateResourceLinks() {
  document.querySelector(".jumpToResourcesButton").onclick = () => {
    document.querySelector(".resourcesContainer").scrollIntoView({ behavior: 'smooth' })
  }
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

async function main() {

  generateNewsCards()
  generateResourceLinks();
}


main()