// פעולה להגדרת רשימת הדירות
export const setApartments = (apartments) => ({
    type: "SET_APARTMENTS",
    payload: apartments,
});

// פעולה להגדרת הטוקן וזמן התפוגה שלו
export const setToken = (token, expirationTime) => ({
    type: "SET_TOKEN",
    payload: { token, expirationTime },
});

// פעולה לניקוי הטוקן
export const clearToken = () => {
    return {
        type: "CLEAR_TOKEN",
    };
};

// פעולה להגדרת המשתמש הנוכחי
export const setCurrentUser = (user) => {
    return { type: 'SET_CURRENT_USER', payload: user }
}

// פעולה לעדכון הקטגוריות
export const updateCategories = (categories) => ({
    type: 'SET_CATEGORIES',
    payload: categories,
});

// פעולה להגדרת הדירות הנוכחיות
export const setCurrentApartments=(apartments) => {
    return { type: 'SET_CURRENT_APARTMENTS', payload: apartments }
}

// פעולה לעדכון דירה מסוימת
export const updateApartment = (apartment,index) => {
    return { type: 'UPDATE_APARTMENT', payload: {apartment,index} }
}

// פעולה למחיקת דירה
export const deleteApartment = (apartmentId) => {
    return {
        type: 'DELETE_APARTMENT',
        payload: apartmentId
    };
};