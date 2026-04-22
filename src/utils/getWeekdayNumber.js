/**
 * Maps short weekday strings to their corresponding numbers (Sun = 1)
 * @param {String} weekdayString - "Sun", "Mon", "Tue", etc.
 * @returns {Number|undefined} - 1-7 or undefined if not found
 * @throws {Error} - If input is falsy
 */
export const getWeekdayNumber = (weekdayString) => {
  if (!weekdayString) {
    throw new Error("Must provide a valid weekday String!");
  }

  const weekdayMap = {
    Sun: 1,
    Mon: 2,
    Tue: 3,
    Wed: 4,
    Thu: 5,
    Fri: 6,
    Sat: 7,
  };

  return weekdayMap[weekdayString];
};