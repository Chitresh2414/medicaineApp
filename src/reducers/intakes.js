// src/reducers/intakes.js

export const ADD_MEDICINE = "ADD_MEDICINE";
export const EDIT_MEDICINE = "EDIT_MEDICINE";
export const TOGGLE_COMPLETION = "TOGGLE_COMPLETION";
export const DELETE_MEDICINE = "DELETE_MEDICINE";
export const RESET_MEDICINES = "RESET_MEDICINES";

const initialState = {
  medicines: [],
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
    case ADD_MEDICINE: {
      const med = action.payload;

      if (!isValidMedicine(med)) {
        console.warn("Invalid medicine payload", med);
        return state;
      }

      const exists = state.medicines.some((m) => m.id === med.id);
      if (exists) return state;

      return {
        ...state,
        medicines: [
          {
            ...med,
            completed: false,
            completedAt: null,
            notificationIds: [],
            createdAt: new Date().toISOString(), // Useful for History sorting
          },
          ...state.medicines,
        ],
      };
    }

    case EDIT_MEDICINE: {
      const med = action.payload;
      if (!med?.id) return state;
      return {
        ...state,
        medicines: state.medicines.map((m) =>
          m.id === med.id ? { ...m, ...med } : m,
        ),
      };
    }

    case TOGGLE_COMPLETION: {
      const id = action.payload;
      return {
        ...state,
        medicines: state.medicines.map((m) => {
          if (m.id !== id) return m;

          const isNowCompleted = !m.completed;

          return {
            ...m,
            completed: isNowCompleted,
            completedAt: isNowCompleted ? new Date().toISOString() : null,
          };
        }),
      };
    }

    case DELETE_MEDICINE:
      return {
        ...state,
        medicines: state.medicines.filter((m) => m.id !== action.payload),
      };

    case RESET_MEDICINES:
      return initialState;

    default:
      return state;
  }
};

export default intakesReducer;
