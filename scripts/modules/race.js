fetchMeSomeRaceDataAlmightyComputerOverlord = () => {
  fetch("https://data.ninjakiwi.com/btd6/races?")
    .then((response) => response.json())
    .then((data) => {
      // Use the data
    })
    .catch((error) => {
      // Handle any errors
      alert(
        "There was an issue while getting data. Please try again later and report this issue in the BTD6 Central server."
      );
      eventPickContainer.style.display = "flex";
    });
};

export { fetchMeSomeRaceDataAlmightyComputerOverlord };
