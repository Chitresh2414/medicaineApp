export const getNextSevenDays = () => {
  const days = [];
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    days.push({
      id: i.toString(),
      date: date.getDate(), // e.g., 23
      day: dayNames[date.getDay()], // e.g., "THU"
      fullDate: date.toISOString().split('T')[0], // e.g., "2026-04-23"
    });
  }
  return days;
};