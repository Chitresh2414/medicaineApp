/**
 * *****************************************************
 * **** Generates the timezone for a provided month ****
 * *****************************************************
 * @param {Number} monthIndex - Month index (0-11)
 * @returns {String} - "UTC+1" (Winter) or "UTC+2" (Summer)
 */
export const getGermanUTC = (monthIndex) => {
  // Use undefined/null check because 0 is a valid month index (January)
  if (monthIndex === undefined || monthIndex === null) {
    throw new Error("Must provide a valid month index (0-11)!");
  }

  // Germany switches to Summer Time (UTC+2) roughly from April to October.
  // Using ranges is cleaner and more performant than searching arrays.
  const isSummerTime = monthIndex >= 3 && monthIndex <= 9; // April (3) to Oct (9)

  return isSummerTime ? "UTC+2" : "UTC+1";
};