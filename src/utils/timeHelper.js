/**
 * timeHelper.js
 * Utilities for time manipulation and Indian Standard Time (IST) 
 */

/**
 * Returns the fixed Indian Standard Time offset
 * @returns {string} 
 */
export const getIndiaOffset = () => "UTC+5:30";

/**
 * Formats a raw date or string into a 12-hour AM/PM format
 * Example: 2026-04-22T16:30:00 -> "04:30 PM"
 * @param {Date|string} date 
 * @returns {string}
 */
export const formatTo12Hour = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).toUpperCase();
};

/**
 * Returns a greeting based on the current time in Udaipur
 * @returns {string} - Good Morning, Afternoon, or Evening
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

/**
 * Checks if a specific time has already passed today
 * Useful for marking medicine as "Missed"
 * @param {string} timeString - Format "HH:mm" (e.g., "08:00")
 * @returns {boolean}
 */
export const isTimePassed = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(hours, minutes, 0);

  return now > target;
};

/**
 * Returns the name of the current month in uppercase
 * @returns {string} - e.g., "APRIL, 2026"
 */
export const getCurrentMonthYear = () => {
  const now = new Date();
  const month = now.toLocaleString("default", { month: "long" });
  return `${month.toUpperCase()}, ${now.getFullYear()}`;
};