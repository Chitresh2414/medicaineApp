import {
  format,
  addDays,
  startOfToday,
  isSameDay,
} from "date-fns";

/**
 * Today se next 7 days show honge
 * Example:
 * Today = 24 April
 * Show = 24, 25, 26, 27, 28, 29, 30
 */

export const getDynamicWeek = (
  referenceDate = new Date()
) => {
  const days = [];
  const today = startOfToday();

  // Start exactly from today
  const startDate = startOfToday();

  for (let i = 0; i < 7; i++) {
    const dateObj = addDays(startDate, i);

    days.push({
      id: i.toString(),

      // UI display
      date: format(dateObj, "d"),
      day: format(dateObj, "EEE"),

      // Highlight today
      active: isSameDay(dateObj, today),

      // Redux filtering
      fullDate: format(dateObj, "yyyy-MM-dd"),

      // Raw JS Date object
      rawDate: dateObj,

      // Extra helpful flags
      isToday: isSameDay(dateObj, today),
      monthYear: format(dateObj, "MMMM yyyy"),
    });
  }

  return days;
};

/**
 * Current month + year header
 * Example: April 2026
 */

export const getCurrentMonthYear = () => {
  return format(new Date(), "MMMM yyyy");
};