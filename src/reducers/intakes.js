// src/reducers/intakes.js

const initialState = {
    medicines: [
        {
            id: "1",
            name: "B12 Drops",
            dose: "5 Drops, 1200mg",
            time: "06:13 AM",
            iconName: "water",
            completed: false,
        },
        {
            id: "2",
            name: "Vitamin D",
            dose: "1 Capsule, 1000mg",
            time: "07:00 AM",
            iconName: "pill",
            completed: false,
        },
    ],
};

const intakesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_COMPLETION':
            return {
                ...state,
                medicines: state.medicines.map((med) =>
                    med.id === action.payload
                        ? { ...med, completed: !med.completed }
                        : med
                ),
            };

        case 'ADD_MEDICINE':
            return {
                ...state,
                medicines: [action.payload, ...state.medicines],
            };

        case 'DELETE_MEDICINE':
            return {
                ...state,
                medicines: state.medicines.filter(med => med.id !== action.payload),
            };

        default:
            return state;
    }
};

export default intakesReducer;