export const getSessionId = () => {
  return localStorage.getItem("sessionId");
};

export const isCorrect = (givenOption, correctOption) => {
  return givenOption === correctOption;
};

export const getTimeDifferenceInMinutes = (date1, date2) => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new Error("Both arguments must be Date objects");
  }

  let timeDifference = date2.getTime() - date1.getTime();

  let differenceInMinutes = timeDifference / (1000 * 60);

  return differenceInMinutes;
};
