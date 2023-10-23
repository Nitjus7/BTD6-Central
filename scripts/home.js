const newsContainer = document.querySelector(".newsContainer")
const newsCards = 
  [
    {
      "title": "Website v0.6.0: PLAYER AND CUSTOM MAP LOOKUP",
      "description": "This update adds the new Community page to the website with Map Lookup and User Lookup. Along with this, many more small changes have been made to various pages on the website. If you see an issue, report it to the BTD6 Central Discord Server linked below.",
      "imageSrc": null,
      "links": [
            {
              "link": "https://discord.com/invite/xNxjqXBp6B",
              "name": "Join the BTD6 Central Discord Server"
            },
            {
              "link": "https://nitjus7.github.io/BTD6-Central/community.html",
              "name": "Use the new features!"
            }
          ],
      "dateInMilliseconds": 1698033757452,
      "big": true
    },
    {
      "title": "Website v0.5.0: BLOON STATS",
      "description": "This update is finally out, giving you access to Bloon and Boss stats (excluding Vortex and Phayze which will be added in the near future). Page Themes have also been added, with plans to add more themes in the future. Several more changes have been made which can be found in the BTD6 Central Discord Server.",
      "imageSrc": null,
      "links": [
        {
          "link": "https://discord.com/invite/xNxjqXBp6B",
          "name": "Join the BTD6 Central Discord Server"
        }
      ],
      "dateInMilliseconds": 1695598020000,
      "big": true
    },
    {
      "title": "Bloons Card Storm is in Development!",
      "description": "Bloons Card Storm is a turn-based card strategy game based around Heroes, Bloons, Monkeys, and Powers. Its planned release date is mid-2024, with a beta starting earlier in the year. Check out more details below.",
      "imageSrc": "https://preview.redd.it/a7m7zzoeuapb1.png?width=2048&format=png&auto=webp&s=3acd4771d5d77072c76a4d82db6320fb0ebe1326",
      "links": [
        {
          "link": "https://www.reddit.com/r/bloonscardstorm/comments/16n6b53/game_announcement_bloons_card_storm/",
          "name": "Check out the official announcement"
        },
        {
          "link": "https://www.reddit.com/r/bloonscardstorm/",
          "name": "Join the new Bloons Card Storm subreddit"
        }
      ],
      "dateInMilliseconds": 1695167580000,
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
function main() {
  generateNewsCards()
  generateResourceLinks();
}

const navList = document.querySelector(".navList")
window.addEventListener('scroll', function() {
  if (window.scrollY <= 125) navList.classList.add("navBeforeScroll")
  else navList.classList.remove("navBeforeScroll")
})
main()