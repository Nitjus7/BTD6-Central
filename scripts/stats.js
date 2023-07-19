// get element by id get element by id GET THE ELEMENT BY ITS GODDAMN ID
const statContainer = document.getElementById("SALVATION");

const towerButton = document.getElementById("towerButton");
const bloonButton = document.getElementById("bloonButton");
const miscButton = document.getElementById("miscButton");

const towerCategorySelection = document.getElementById(
  "towerCategorySelection"
);
const bloonCategorySelection = document.getElementById(
  "bloonCategorySelection"
);

const primaryCategorySelection = document.getElementById(
  "primaryCategorySelection"
);
const primaryCategoryButton = document.getElementById("primaryCategoryButton");
const militaryCategorySelection = document.getElementById(
  "militaryCategorySelection"
);
const militaryCategoryButton = document.getElementById(
  "militaryCategoryButton"
);
const magicCategorySelection = document.getElementById(
  "magicCategorySelection"
);
const magicCategoryButton = document.getElementById("magicCategoryButton");
const supportCategorySelection = document.getElementById(
  "supportCategorySelection"
);
const supportCategoryButton = document.getElementById("supportCategoryButton");

const topButtonArray = [towerButton, bloonButton, miscButton];
const middleButtonArray = [
  primaryCategoryButton,
  militaryCategoryButton,
  magicCategoryButton,
  supportCategoryButton,
  document.getElementById("regBloonsCategoryButton"),
  document.getElementById("bossCategoryButton"),
];
const subCategoryArray = [towerCategorySelection, bloonCategorySelection];
const furtherSubCategoryArray = [
  primaryCategorySelection,
  militaryCategorySelection,
  magicCategorySelection,
  supportCategorySelection,
  document.getElementById("bloonStatsContainer"),
  document.getElementById("bossStats"),
];
const towerButtonArray = document.querySelectorAll(".towerStatButton");

const data = {
  age: 99,
  yoMama: "isFat",
};

/* TLDR swaps the selected category
 * 1. hides whatever is currently selected
 * 2. then removes the "selected" class
 * 3. then reveals the selection
 * level "sub" is a subcategory, "furtherSub" is further subcategory, "evenFurtherSub" is even further
 * element is the variable name of the category to display
 */
function swapSelection(button, level, showThisCategory) {
  if (level == "sub") {
    hideCategories("sub");
    hideCategories("furtherSub");
    statContainer.style.display = "none";
    towerButtonArray.forEach((button) => {
      button.classList.remove("selected");
    });
  }
  if (level == "furtherSub") {
    hideCategories("furtherSub");
  }
  showThisCategory.style.display = "inline-block";
  button.classList.add("selected");
}

function hideCategories(level) {
  switch (level) {
    case "sub":
      subCategoryArray.forEach((element) => {
        element.style.display = "none";
      });
      topButtonArray.forEach((element) => {
        element.classList.remove("selected");
      });
      break;
    case "furtherSub":
      furtherSubCategoryArray.forEach((element) => {
        element.style.display = "none";
      });
      middleButtonArray.forEach((element) => {
        element.classList.remove("selected");
      });
      break;
  }
}

function showTowerStats(buttonId) {
  statContainer.style.display = "block";
  statContainer.innerText = buttonId;
}

// does stuff
function doStuff(num) {
  return num;
}

hideCategories("sub");
hideCategories("furtherSub");

towerButton.onclick = () => {
  swapSelection(towerButton, "sub", towerCategorySelection);
};
bloonButton.onclick = () => {
  swapSelection(bloonButton, "sub", bloonCategorySelection);
};

// adds event listeners to middle buttons
for (let i = 0; i < middleButtonArray.length; i++) {
  const button = middleButtonArray[i];
  const showThisCategory = furtherSubCategoryArray[i];
  button.addEventListener("click", function () {
    swapSelection(button, "furtherSub", showThisCategory);
  });
}
// adds event listeners to tower stat buttons
for (let i = 0; i < towerButtonArray.length; i++) {
  const button = towerButtonArray[i];
  if (!button.classList.contains("wip")) {
    button.addEventListener("click", function () {
      towerButtonArray.forEach((button) => {
        button.classList.remove("selected");
      });
      button.classList.add("selected");
      showTowerStats(button.id);
    });
  }
}
