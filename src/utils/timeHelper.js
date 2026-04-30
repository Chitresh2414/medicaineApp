const IST_LOCALE = "en-IN";

const parseTimeString = (timeString) => {
  if (!timeString) return null;

  try {
    let hours, minutes;

    if (/AM|PM/i.test(timeString)) {
      // 12-hour format
      const [time, modifierRaw] = timeString.trim().split(" ");
      const modifier = modifierRaw?.toUpperCase();

      let [h, m] = time.split(":").map(Number);

      if (modifier === "PM" && h < 12) h += 12;
      if (modifier === "AM" && h === 12) h = 0;

      hours = h;
      minutes = m;
    } else {
      // 24-hour format
      const [h, m] = timeString.split(":").map(Number);
      hours = h;
      minutes = m;
    }

    if (isNaN(hours) || isNaN(minutes)) return null;

    return { hours, minutes };
  } catch {
    return null;
  }
};

export const formatTo12Hour = (date) => {
  if (!date) return "";

  // Already formatted
  if (typeof date === "string" && /\d{1,2}:\d{2}\s?(AM|PM)/i.test(date)) {
    return date.toUpperCase();
  }

  const d = new Date(date);
  if (isNaN(d)) return String(date);

  return d
    .toLocaleTimeString(IST_LOCALE, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toUpperCase();
};

export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
};

export const isTimePassed = (timeString) => {
  const parsed = parseTimeString(timeString);
  if (!parsed) return false;

  const now = new Date();
  const target = new Date();

  target.setHours(parsed.hours, parsed.minutes, 0, 0);

  return now.getTime() > target.getTime();
};


export const getCurrentMonthYear = () => {
  const now = new Date();

  return now
    .toLocaleString(IST_LOCALE, {
      month: "long",
      year: "numeric",
    })
    .toUpperCase();
};