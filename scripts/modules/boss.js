function fetchMeSomeBossDataAlmightyComputerOverlord() {
  return "me";
}

function getBossThumbnail(boss) {
  if (boss == "Bloonarius")
    return "https://i.gyazo.com/be511c1e97575bd2c50943be77783a95.png";
  if (boss == "Lych")
    return "https://i.gyazo.com/eee6e911abfebde7aa2b4935f01e741a.png";
  if (boss == "Vortex")
    return "https://i.gyazo.com/d223e91b628adf7cb63cc42be7728180.png";
  if (boss == "Dreadbloon")
    return "https://static.wikia.nocookie.net/b__/images/6/63/DreadbloonPortrait.png/revision/latest?cb=20221207232857&path-prefix=bloons";
}
function getEliteBossThumbnail(boss) {
  if (boss == "Bloonarius")
    return "https://i.gyazo.com/5afc7acdcdd88d27aa8ef28ce074628d.png";
  if (boss == "Lych")
    return "https://i.gyazo.com/aabc3779adc0ef64f759a1eb216c7dac.png";
  if (boss == "Vortex")
    return "https://i.gyazo.com/88b3690036eccd70202cd4ba285120c9.png";
  if (boss == "Dreadbloon")
    return "https://static.wikia.nocookie.net/b__/images/f/f7/DreadbloonPortraitElite.png/revision/latest/scale-to-width-down/1000?cb=20221207235238&path-prefix=bloons";
}

export {
  fetchMeSomeBossDataAlmightyComputerOverlord,
  getBossThumbnail,
  getEliteBossThumbnail,
};
