import { figureOutEndTime } from "./time";
import { figureOutStartTime } from "./time";

fetchMeSomeRaceDataAlmightyComputerOverlord = () => {
  fetch("https://data.ninjakiwi.com/btd6/races?")
    .then((response) => response.json())
    .then((data) => {
      const startTime = data.body.start;
      const startDate = figureOutStartTime(startTime);
      const endTime = data.body.end;
      const endDate = figureOutEndTime(endTime);
      return `The event starts at ${startTime}, and ends at ${endTime}`;
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
