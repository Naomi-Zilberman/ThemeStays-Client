import React, { useState } from 'react';
import './SelectButton.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentApartments } from './Redux/Action';
import { getApartmentsByCityId, getFilteredApartments } from './api';

const SelectButton = ({ label, options, type }) => {
    console.log(type+"type");
    
    const [isOpen, setIsOpen] = useState(false);
    const [numBeds, setNumBeds] = useState('');
    const [price, setPrice] = useState('');
    const [city, setCity] = useState({});

    const [filterType, setFilterType] = useState('');
    const dispatch = useDispatch();
    const currentApartments = useSelector((state) => state.currentApartments);

    const toggleSelectMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleApplyFilter = async () => {
        console.log("Options passed to SelectButton:", options);
    console.log("type"+type);
    
        if (
            (
            (type === 'numBeds' && !numBeds) || 
            (type === 'price' && !price))
           

        ) {
            console.warn("Filter type, number of beds, or price is missing");
            return;
        }
    
        try {
            let response;
    
            // אם הסינון הוא לפי עיר וגם מחיר או מיטות, נסה לשלוח את כל המידע בבקשה אחת
            if (type === 'city') {
                console.log("Options passed to SelectButton:", options);
                console.log("קוד העיר", city._id);  // הדפסת קוד העיר לצורך debugging

                response = await getApartmentsByCityId(city._id); // עכשיו city מכיל את ה-ID של העיר
                console.log("data"+response.data);
                console.log("respon-", response);

            }

                
             else {
                response = await getFilteredApartments(filterType, numBeds, price);
                console.log("respon-", response);
                
                
            }
    
            if (response ) {
                console.log(response+"למה?..");
                const apartments = response.apartments || response.apartmentsArr || [];
                if(type=='price' || type=='numBeds')
                dispatch(setCurrentApartments(apartments)); // עדכון הדירות
            else if(type=='city')
                dispatch(setCurrentApartments(response)); // עדכון הדירות

                console.log(currentApartments);
                
            } else {
                console.error("Unexpected response structure:", response);
            }
        } catch (error) {
            console.error("Error applying filter:", error);
        }
        setIsOpen(false); 
    };
    
    return (
        <div className="select-button-container">
            <button onClick={toggleSelectMenu} className="select-button">
                {label}
            </button>
            {isOpen && (
                <div className="select-menu">
                    {(type === 'numBeds' || type === 'price') && (
                        <select
                            onChange={(e) => setFilterType(e.target.value)}
                            className="select-dropdown"
                            defaultValue=""
                        >
                            <option value="" disabled>בחר סוג סינון:</option>
                            <option value="gt">גדול מ</option>
                            <option value="lt">קטן מ</option>
                            <option value="eq">שווה ל</option>
                        </select>
                    )}
                    
                    {type === 'numBeds' && (
                        <select
                            onChange={(e) => setNumBeds(e.target.value)}
                            className="select-dropdown"
                            defaultValue=""
                        >
                            <option value="" disabled>בחר מספר מיטות:</option>
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                    
                    {type === 'price' && (
                        <select
                            onChange={(e) => setPrice(e.target.value)}
                            className="select-dropdown"
                            defaultValue=""
                        >
                            <option value="" disabled>בחר מחיר:</option>
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}

{type === 'city' && (
    <select
        onChange={(e) => {
            const selectedCity = options.find(option => option._id === e.target.value);
            setCity(selectedCity);
        }}
        className="select-dropdown"
        defaultValue=""
    >
        <option value="" disabled>בחר עיר:</option>
        {options.map((option) => (
            <option key={option._id} value={option._id}>
                {option.cityName}
            </option>
        ))}
    </select>
)}




                    <button onClick={handleApplyFilter} className="apply-button">
                        החל סינון
                    </button>
                </div>
            )}
        </div>
    );
};

export default SelectButton;
