// src/utils/calendarHelper.js
import { format, addDays, startOfToday, isSameDay } from 'date-fns';

/**
 * Generates a week of dates starting from a specific reference date (usually today).
 * @param {Date} referenceDate - The starting point for the week.
 * @returns {Array} List of date objects for the horizontal calendar.
 */
export const getDynamicWeek = (referenceDate = new Date()) => {
  const days = [];
  
  for (let i = 0; i < 7; i++) {
    const dateObj = addDays(referenceDate, i);
    
    days.push({
      id: i.toString(),
      // 'd' gives the day of the month (e.g., 23)
      date: format(dateObj, 'd'), 
      // 'EEE' gives the short day name (e.g., MON, TUE)
      day: format(dateObj, 'EEE'), 
      // check if this specific date is actually today
      active: isSameDay(dateObj, startOfToday()),
      // fullDate useful for keys or filtering Redux data
      fullDate: format(dateObj, 'yyyy-MM-dd'), 
    });
  }
  
  return days;
};

/**
 * Returns a formatted string for the Header (e.g., "April 2026")
 */
export const getCurrentMonthYear = () => {
  return format(new Date(), 'MMMM yyyy');
};