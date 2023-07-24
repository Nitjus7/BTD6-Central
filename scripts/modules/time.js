function figureOutStartTime(startTime) {
  const startDate = new Date(startTime);
  return startDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function figureOutEndTime(endTime) {
  const endDate = new Date(endTime);
  return endDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export { figureOutEndTime, figureOutStartTime };
