import { format, addDays, startOfToday, isSameDay } from 'date-fns';

/**
 * Generates a scrollable week of dates.
 * We use 21 days (3 weeks) to support horizontal scrolling month changes.
 */
export const getDynamicWeek = (referenceDate = new Date()) => {
  const days = [];
  const today = startOfToday();
  
  // Start from 2 days ago to allow retrospective view
  const startDate = addDays(referenceDate, -2); 
  
  for (let i = 0; i < 21; i++) {
    const dateObj = addDays(startDate, i);
    
    days.push({
      id: i.toString(),
      date: format(dateObj, 'd'), 
      day: format(dateObj, 'EEE'), 
      // active is for the visual highlight in the UI
      active: isSameDay(dateObj, today),
      // fullDate is the source of truth for Month headers and Redux filtering
      fullDate: format(dateObj, 'yyyy-MM-dd'), 
      // added rawDate in case you need to do more complex date math in components
      rawDate: dateObj, 
    });
  }
  
  return days;
};

/**
 * Returns formatted string (e.g., "April 2026") for initial UI state
 */
export const getCurrentMonthYear = () => {
  return format(new Date(), 'MMMM yyyy');
};