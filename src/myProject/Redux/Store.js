import { createStore } from "redux";
import { produce } from 'immer';

const initialState = {
    apartments: [],
    token: null,
    currentAdvertiser: {},
    currentApartments: [],
    expirationTime: null, // זמן תפוגת הטוקן
    categories: [],
    loading: false,
    error: null,
};

const reducer = produce((state, action) => {  
    switch (action.type) {
        case 'SET_CURRENT_USER':
            state.currentAdvertiser = action.payload;
            break;
        case 'SET_APARTMENTS':
            state.apartments = action.payload.map(apartment => ({
                ...apartment,
                image: apartment.image || '',  // אם יש תמונה לשים ב-apartment
            }));
            break;
        case "SET_TOKEN":
            state.token = action.payload.token;
            state.expirationTime = action.payload.expirationTime; // עדכון זמן תפוגת הטוקן
            break;
        case 'FETCH_CATEGORIES_REQUEST':
            state.loading = true;
            state.error = null;
            break;
        case 'SET_CATEGORIES':
            state.categories = action.payload;
            state.loading = false;
            break;
        case 'FETCH_CATEGORIES_FAILURE':
            state.loading = false;
            state.error = action.payload;
            break;
        case 'DELETE_APARTMENT':
            // הסרת הדירה מתוך ה-state על פי ה-apartmentId
            state.apartments = state.apartments.filter(apartment => apartment._id !== action.payload);
            break;
        case 'SET_CURRENT_APARTMENTS':
            console.log("Before update: ", state.currentApartments);
            state.currentApartments = action.payload;
            console.log(action.payload+"action");
            console.log(state.currentApartments);
            break;
        case 'UPDATE_APARTMENT':
            state.apartments[action.payload.index] = action.payload.apartment;
            break;
        default:
            break;
    }
}, initialState);

const myStore = createStore(reducer);
window.store = myStore;
export default myStore;