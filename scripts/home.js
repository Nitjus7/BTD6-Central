const newsContainer = document.querySelector(".newsContainer")
const newsCards = 
  [
    {
      "title": "BTD6 Central is in Beta! Version 0.4.0",
      "description": "After lots of development time, BTD6 Central is finally ready for 'beta.' Check out the event archive using the menu in the top right.\nChanges for 0.4.0: New home page, added a hamburger, and dark mode support based on system settings.",
      "imageSrc": "../assets/victory.png",
      "links": null,
      "dateInMilliseconds": 1693868984692
    },
    {
      "title": "BTD6 is available for pre-order on Xbox",
      "description": "Xbox BTD6 adds couch co-op, a new UI and controls, and larger map size for longer track length and more placement areas for towers. However, it costs about twice as much as BTD6 on Steam.",
      "imageSrc": "https://store-images.s-microsoft.com/image/apps.29629.14229635734755630.9b4f3e48-c3b4-4fee-884b-786bc5aa9bce.145640e0-b12a-4dd7-ba38-5ddd4475f66e?q=90&w=480&h=270",
      "links": [
        {
          "link": "https://www.xbox.com/en-US/games/store/bloons-td-6/9PHKZ9XT6F85",
          "name": "Pre-order BTD6 on Xbox"
        }
      ],
      "dateInMilliseconds": null
    },
    {
      "title": "Website v0.3.3",
      "description": "Fixed several issues, including an issue where boss icons weren't loading. Full details can be found in the Discord server.",
      "imageSrc": null,
      "links": [
        {
          "link": "../events.html?event=bosses",
          "name": "Check out the Boss Archive"
        },
        {
          "link": "https://discord.com/invite/xNxjqXBp6B",
          "name": "BTD6 Central Discord Server Link"
        }
      ],
      "dateInMilliseconds": null
    }
  ]

console.log(newsCards);

function generateNewsCards() {
  for (let i = 0; i < newsCards.length; i++) {
    const newsElement = document.createElement("div")
    newsElement.classList.add("newsCard")
    let newsCard = newsCards[i]
    if (newsCard["title"] != null) generateTitle(newsCard, newsElement)
    if (newsCard["description"] != null) generateDescription(newsCard, newsElement)
    if (newsCard["imageSrc"] != null) generateImage(newsCard, newsElement)
    if (newsCard["links"] != null) generateLinks(newsCard, newsElement)
    if (newsCard["dateInMilliseconds"] != null) generateTimestamp(newsCard, newsElement)
    newsContainer.appendChild(newsElement)
  }
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
  console.log("news images coming later")
}
function generateLinks(newsCard, newsElement) {
  for (const button of newsCard["links"]) {
    const linkElem = document.createElement("button")
    linkElem.classList.add("newsButton")
    linkElem.innerText = (button["name"])
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

function main() {
  generateNewsCards();
}
main()