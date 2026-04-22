import { addDays, format, getDate, startOfWeek, isSameDay } from "date-fns";
import uuid from 'react-native-uuid';

/**
 * Generates an array representing the current week (Mon-Sun).
 * Perfect for the Horizontal Calendar in the Medicine Reminder app.
 * * @param {Date} date - The reference date (usually today).
 * @returns {Array} - Array of objects containing date metadata.
 */
export const getWeekDays = (referenceDate = new Date()) => {
    // 1 indicates the week starts on Monday
    const start = startOfWeek(referenceDate, { weekStartsOn: 1 });

    return Array.from({ length: 7 }).map((_, i) => {
        const dayDate = addDays(start, i);
        
        return {
            // Using UUID for unique list keys in React Native FlatList
            id: uuid.v4(), 
            date: dayDate,
            dayNumber: getDate(dayDate),        // e.g., 22
            dayName: format(dayDate, "EEE"),    // e.g., "Wed"
            fullDate: format(dayDate, "yyyy-MM-dd"), 
            isActive: isSameDay(dayDate, referenceDate) // Helper for UI styling
        };
    });
}