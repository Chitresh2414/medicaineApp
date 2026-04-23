const initialState = {
  medicines: [],
  pressedIntake: null,
};

const intakesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MEDICINE':
      return {
        ...state,
        // Nayi medicine ko list ke shuru mein add karein
        medicines: [action.payload, ...state.medicines]
      };

    case 'EDIT_MEDICINE':
      return {
        ...state,
        medicines: state.medicines.map(med => 
          med.id === action.payload.id ? action.payload : med
        )
      };

    case 'TOGGLE_COMPLETION':
      return {
        ...state,
        medicines: state.medicines.map(med =>
          med.id === action.payload ? { ...med, completed: !med.completed } : med
        )
      };

    case 'DELETE_MEDICINE':
      return {
        ...state,
        medicines: state.medicines.filter(med => med.id !== action.payload)
      };

    default:
      return state;
  }
};

export default intakesReducer;