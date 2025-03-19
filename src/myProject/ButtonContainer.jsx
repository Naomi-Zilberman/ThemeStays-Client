import React, { useEffect } from 'react';
import SelectButton from './SelectButton';
import { getAllApartments } from './api';
import { setApartments } from './Redux/Action';
import { useDispatch, useSelector } from 'react-redux';
import './ButtonContainer.css';

const ButtonsContainer = () => {
    const dispatch = useDispatch();
    const apartments = useSelector((state) => state.apartments); // קבלת רשימת הדירות מ-Redux

    useEffect(() => {
        const loadApartments = async () => {
            try {
                const response = await getAllApartments(); // קריאה ל-API לקבלת כל הדירות
                console.log("Apartments data:", response.data);

                dispatch(setApartments(response.data)); // עדכון מצב הדירות ב-Redux
            } catch (error) {
                console.error("Error fetching apartments:", error); // טיפול בשגיאה
            }
        };

        loadApartments();
    }, [dispatch]); // קריאה לפונקציה בכל פעם שה-Dispatch משתנה

    // יצירת מערך ייחודי של מספרי מיטות
    const arr_apartmentsBeds = [...new Set(apartments.map((x) => x.numBeds))].sort((a, b) => a - b);
    console.log("מערך מס מיטות"+arr_apartmentsBeds);
    
    // יצירת מערך ייחודי של מחירים
    const arr_apartmentsPrice = [...new Set(apartments.map((x) => x.price))].sort((a, b) => a - b);
    console.log("מערך  מחיר"+arr_apartmentsPrice);

    // יצירת מערך ייחודי של ערים
    const arr_apartmentsCity = [
        ...new Map(apartments
            .filter((x) => x.CityId && x.CityId.cityName) // מסנן דירות עם ערים תקינות
            .map((x) => [x.CityId._id, { _id: x.CityId._id, cityName: x.CityId.cityName }])
        ).values()
    ].sort((a, b) => a.cityName.localeCompare(b.cityName));

    console.log("Sorted cities:", arr_apartmentsCity);

    // נתוני הכפתורים לסינון
    const buttonData = [
        { id: 'numBeds', label: 'סינון לפי מספר מיטות', options: arr_apartmentsBeds, type: 'numBeds' },
        { id: 'price', label: 'סינון לפי מחיר', options: arr_apartmentsPrice, type: 'price' },
        { id: 'city', label: 'סינון לפי עיר', options: arr_apartmentsCity, type: 'city' },
    ];

    return (
        <div className="buttons-container">
            {buttonData.map((button) => (
                <SelectButton
                    key={button.id}
                    id={button.id}
                    label={button.label}
                    options={button.options}
                    type={button.type} 
                />
            ))}
        </div>
    );
};

export default ButtonsContainer;