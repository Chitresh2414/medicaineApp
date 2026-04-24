// src/reducers/intakes.js

export const ADD_MEDICINE = "ADD_MEDICINE";
export const EDIT_MEDICINE = "EDIT_MEDICINE";
export const TOGGLE_COMPLETION = "TOGGLE_COMPLETION";
export const DELETE_MEDICINE = "DELETE_MEDICINE";
export const RESET_MEDICINES = "RESET_MEDICINES";

const initialState = {
  medicines: [],
  pressedIntake: null,
};

const isValidMedicine = (med) => {
  return (
    med &&
    typeof med.id !== "undefined" &&
    typeof med.name === "string" &&
    med.name.trim().length > 0
  );
};

const intakesReducer = (state = initialState, action) => {
  switch (action.type) {
    /* ================= ADD ================= */
    case ADD_MEDICINE: {
      const med = action.payload;

      if (!isValidMedicine(med)) {
        console.warn("Invalid medicine payload:", med);
        return state;
      }

      // Prevent duplicate IDs
      const alreadyExists = state.medicines.some(
        (item) => item.id === med.id
      );

      if (alreadyExists) {
        console.warn("Medicine with same ID already exists");
        return state;
      }

      const newMedicine = {
        ...med,
        completed: false,
        completedAt: null,
        notificationIds: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        ...state,
        medicines: [newMedicine, ...state.medicines],
      };
    }

    /* ================= EDIT ================= */
    case EDIT_MEDICINE: {
      const updatedMedicine = action.payload;

      if (!updatedMedicine?.id) {
        console.warn("EDIT_MEDICINE requires medicine id");
        return state;
      }

      return {
        ...state,
        medicines: state.medicines.map((medicine) =>
          medicine.id === updatedMedicine.id
            ? {
                ...medicine,
                ...updatedMedicine,
                updatedAt: new Date().toISOString(),
              }
            : medicine
        ),
      };
    }

    /* ================= TOGGLE COMPLETE ================= */
    case TOGGLE_COMPLETION: {
      const medicineId = action.payload;

      return {
        ...state,
        medicines: state.medicines.map((medicine) => {
          if (medicine.id !== medicineId) return medicine;

          const nowCompleted = !medicine.completed;

          return {
            ...medicine,
            completed: nowCompleted,
            completedAt: nowCompleted
              ? new Date().toISOString()
              : null,
            updatedAt: new Date().toISOString(),
          };
        }),
      };
    }

    /* ================= DELETE ================= */
    case DELETE_MEDICINE: {
      const medicineId = action.payload;

      return {
        ...state,
        medicines: state.medicines.filter(
          (medicine) => medicine.id !== medicineId
        ),
      };
    }

    /* ================= RESET ================= */
    case RESET_MEDICINES:
      return initialState;

    /* ================= DEFAULT ================= */
    default:
      return state;
  }
};

export default intakesReducer;
