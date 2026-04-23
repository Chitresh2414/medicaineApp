import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure how notifications behave
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Ask user permission
 */
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
};

/**
 * Schedule medicine reminder
 */
export const scheduleMedicineNotification = async (medicine) => {
  if (!medicine?.reminder || !medicine?.reminderDays?.length) return;

  const ids = [];

  const [time, modifier] = medicine.reminder.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  for (let day of medicine.reminderDays) {
    const weekdayMap = {
      Sun: 1,
      Mon: 2,
      Tue: 3,
      Wed: 4,
      Thu: 5,
      Fri: 6,
      Sat: 7,
    };

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "💊 Medicine Reminder",
        body: `${medicine.name} - ${medicine.dose}`,
        sound: true,
      },
      trigger: {
        weekday: weekdayMap[day],
        hour: hours,
        minute: minutes,
        repeats: true,
      },
    });

    ids.push(id);
  }

  return ids;
};

/**
 * Cancel notifications
 */
export const cancelNotifications = async (ids = []) => {
  for (let id of ids) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }
};