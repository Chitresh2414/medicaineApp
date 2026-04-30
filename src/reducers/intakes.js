// Existing Types
export const ADD_MEDICINE = "ADD_MEDICINE";
export const EDIT_MEDICINE = "EDIT_MEDICINE";
export const TOGGLE_COMPLETION = "TOGGLE_COMPLETION";
export const DELETE_MEDICINE = "DELETE_MEDICINE";
export const RESET_MEDICINES = "RESET_MEDICINES";

// ✅ NEW API TYPES
export const SET_MEDICINES = "SET_MEDICINES";
export const UPDATE_TAKE_STATUS = "UPDATE_TAKE_STATUS";

const initialState = {
  medicines: [],
  pressedIntake: null,
};

const isValidMedicine = (med) => {
  return (
    med &&
    (typeof med.id !== "undefined" || typeof med._id !== "undefined") &&
    typeof med.name === "string" &&
    med.name.trim().length > 0
  );
};

const intakesReducer = (state = initialState, action) => {
  switch (action.type) {
    /* ================= SET ALL (API SYNC) ================= */
    // Jab HomeScreen load hota hai, ye database ka fresh data set karta hai
    case SET_MEDICINES: {
      return {
        ...state,
        medicines: action.payload || [],
      };
    }

    /* ================= UPDATE TAKE STATUS (API SYNC) ================= */
    // Jab user "Take" button click karta hai, ye local state update karta hai
    case UPDATE_TAKE_STATUS: {
      const { id, status } = action.payload;
      return {
        ...state,
        medicines: state.medicines.map((medicine) =>
          medicine.id === id 
            ? { ...medicine, is_taken_today: status, updatedAt: new Date().toISOString() } 
            : medicine
        ),
      };
    }

    /* ================= ADD ================= */
    case ADD_MEDICINE: {
      const med = action.payload;
      if (!isValidMedicine(med)) return state;

      const alreadyExists = state.medicines.some((item) => item.id === med.id);
      if (alreadyExists) return state;

      const newMedicine = {
        ...med,
        is_taken_today: false, // Backend consistency ke liye
        createdAt: new Date().toISOString(),
      };

      return {
        ...state,
        medicines: [newMedicine, ...state.medicines],
      };
    }

    /* ================= EDIT ================= */
    case EDIT_MEDICINE: {
      const updatedMedicine = action.payload;
      if (!updatedMedicine?.id) return state;

      return {
        ...state,
        medicines: state.medicines.map((medicine) =>
          medicine.id === updatedMedicine.id
            ? { ...medicine, ...updatedMedicine, updatedAt: new Date().toISOString() }
            : medicine
        ),
      };
    }

    /* ================= TOGGLE COMPLETE (LOCAL ONLY) ================= */
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
            updatedAt: new Date().toISOString(),
          };
        }),
      };
    }

    /* ================= DELETE ================= */
    case DELETE_MEDICINE: {
      return {
        ...state,
        medicines: state.medicines.filter((m) => m.id !== action.payload),
      };
    }

    case RESET_MEDICINES:
      return initialState;

    default:
      return state;
  }
};

export default intakesReducer;