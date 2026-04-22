import { addDays, format, startOfWeek, isSameDay } from "date-fns";
import uuid from 'react-native-uuid';

/**
 * Generates the current week (7 days) starting from Monday
 * @param {Date} referenceDate - The anchor date (defaults to today)
 * @returns {Array} - Array of date objects for the horizontal calendar
 */
export const getDynamicWeek = (referenceDate = new Date()) => {
  // Start the week on Monday (1)
  const start = startOfWeek(referenceDate, { weekStartsOn: 1 });

  return Array.from({ length: 7 }).map((_, i) => {
    const dayDate = addDays(start, i);
    
    return {
      id: uuid.v4(),
      date: format(dayDate, "d"),      // e.g., "22"
      day: format(dayDate, "EEE").toUpperCase(), // e.g., "WED"
      fullDate: dayDate,               // Original date object for comparison
      active: isSameDay(dayDate, referenceDate), // Auto-highlights today
    };
  });
};