import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setApartments, setCurrentApartments } from './Redux/Action';
import { getAllApartments } from './api';
import { useNavigate, Outlet } from 'react-router';
import './AllApartments.css';

const AllApartments = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const apartments = useSelector((state) => state.apartments); // קבלת רשימת הדירות מ-Redux
    const currentApartments = useSelector((state) => state.currentApartments); // קבלת רשימת הדירות הנוכחיות מ-Redux
    const [selectedApartment, setSelectedApartment] = useState(null); // מצב לדירה שנבחרה

    useEffect(() => {
        const loadApartments = async () => {
            try {
                const response = await getAllApartments(); // קריאה ל-API לקבלת כל הדירות
                dispatch(setApartments(response.data)); // עדכון מצב הדירות ב-Redux
                dispatch(setCurrentApartments(response.data)); // עדכון מצב הדירות הנוכחיות ב-Redux
            } catch (error) {
                console.error('שגיאה בהבאת דירות:', error); // טיפול בשגיאה
            }
        };
        loadApartments();
    }, [dispatch]);

    const handleFilter = () => {
        nav('filter'); // ניווט לעמוד הפילטרים
    };

    const moreDet = (_id) => {
        console.log(_id);
        nav(`/more_details/${_id}`); // ניווט לעמוד פרטי הדירה
    };

    const cancelFilter = () => {
        dispatch(setCurrentApartments(apartments)); // ביטול הפילטר והצגת כל הדירות
    };

    return (
        <div className="apartments-page">
            <Outlet />
            <button onClick={cancelFilter} className="filter2">ביטול פילטר</button>
            <button onClick={handleFilter} className="filter1">אפשרויות פילטר</button>

            <div className="apartments-description">
                <h1>הנופש הבא שלך מתחיל כאן!</h1>
                <p>אם אתה מחפש את המקום המושלם להתחיל בו חופשה בלתי נשכחת, הגעת למקום הנכון. דירות נופש בסטנדרט הגבוה ביותר, באתרים המובילים ביותר – המקום המושלם להתרגע, להטעין את המצברים ולהרגיש בבית, רק בלי הדאגות.</p>
                <p>בין אם אתה מחפש נופש רומנטי, חופשה משפחתית או מקום להירגע ולשוב לשגרה, אנחנו כאן כדי להציע לך את הפתרון המושלם. כל דירה מציעה נוחות, פרטיות ומיקום שמאפשר לך ליהנות מכל היתרונות של האזור, מבלי לוותר על השקט והשלווה שכולנו זקוקים להם בחופשה.</p>
            </div>

            <div className="apartments-grid">
                {currentApartments && currentApartments.length > 0 ? (
                    currentApartments.map((apartment) => (
                        <div key={apartment._id} className="apartment-card">
                            <div className="card-content">
                                <button onClick={() => moreDet(apartment._id)} className='b'> לפרטים </button>
                                <h2 className="apartment-name">{apartment.apartmentName}</h2>
                                <h2 className="apartment-name">עיר: {apartment.CityId.cityName}</h2>
                                <p className="apartment-description">{apartment.description}</p>
                                <p className="apartment-price">מחיר: ₪{apartment.price}</p>
                                <p className="apartment-price">מספר מיטות: {apartment.numBeds}</p>

                                <div className="apartment-icon">
                                    {apartment.iconUrl ? (
                                        <img src={`http://localhost:4000${apartment.iconUrl}`} alt={apartment.apartmentName} className="apartment-image" />
                                    ) : (
                                        <span role="img" aria-label="default icon">🏰</span> // אייקון ברירת מחדל אם אין תמונה
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>הדירות שלנו בינתיים אזלו, חזור אלינו בהמשך.</p> // הודעה אם אין דירות זמינות
                )}
            </div>
        </div>
    );
};

export default AllApartments;