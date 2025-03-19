import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { deleteApartment } from './Redux/Action';
import { DeleteApartment } from './api';
import { toast } from 'react-toastify'; // הוספת ספריית ה-toast
import 'react-toastify/dist/ReactToastify.css'; // הוספת סגנונות של ה-toast
import './ApartmentDetails.css';

const ApartmentDetails = () => {
    const [isOpen, setIsOpen] = useState(false); // מצב לפתיחת וסגירת פרטי הדירה
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { _id } = useParams(); // קבלת מזהה הדירה מה-URL
    const token = useSelector(state => state.token); // קבלת הטוקן מ-Redux
    const currentAdvertiser = useSelector(state => state.currentAdvertiser); // קבלת המפרסם הנוכחי מ-Redux

    const apartments = useSelector(state => state.apartments); // קבלת רשימת הדירות מ-Redux

    if (!apartments || apartments.length === 0) {
        return <div>Loading apartments...</div>; // הצגת הודעת טעינה אם אין דירות
    }

    const apart = apartments.find(a => a._id === _id); // מציאת הדירה לפי מזהה

    if (!apart) {
        return <div>Apartment not found for code {_id}</div>; // הודעה אם הדירה לא נמצאה
    }

    const toggleDetails = () => {
        setIsOpen(!isOpen); // פתיחה וסגירה של פרטי הדירה
    };

    const update = (apart) => {
        nav(`/update/${apart._id}`); // ניווט לעמוד עדכון הדירה
    };

    const handleDeleteCar = async (apartId) => {
        console.log("Deleting apartment with ID:", apartId);
    
        const advertiserId = apart?.advertiserId;
    
        if (!apartId || !advertiserId) {
            toast.error('חסר מידע על הדירה או המפרסם.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
    
        if (advertiserId._id !== currentAdvertiser?._id) {
            toast.warn(`אין לך הרשאה למחוק את הדירה הזו, היא אינה בבעלותך!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }
    
        try {
            // מחיקת הדירה
            await DeleteApartment(apartId, advertiserId._id, token);
    
            // עדכון Redux
            dispatch(deleteApartment(apartId));
    
            // מעבר לדף הודעה עם ההודעה
            nav('/message', { state: { message: '🎉 הדירה נמחקה בהצלחה! 💥' } });
    
        } catch (err) {
            console.error("שגיאה במחיקת הדירה:", err);
            toast.error('שגיאה במחיקת הדירה 💥', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div className="full-screen-container">
            <div className="car-container" onClick={toggleDetails}>
                <div className="car-summary">
                    {/* סיכום הדירה */}
                </div>

                <div className="car-details">
                    <h3>More Details:</h3>
                    <p className="product-description">שם הדירה: {apart.apartmentName}</p>
                    <p className="product-price">{apart.description}</p>
                    <p className="product-price">קטגוריה: {apart.categoryId && apart.categoryId.categoryName}</p>
                    {apart.CityId && apart.CityId.cityName ? apart.CityId.cityName : 'לא זמין'}
                    <p className="product-price">{apart.address}</p>
                    <p className="product-description">Street: {apart.numBeds}</p>
                    <p className="product-description">City: {apart.additives}</p>
                    <p className="product-description">Transmission: {apart.price}</p>

                    <p className="product-description">
                        מפרסם: {apart.advertiserId._id === currentAdvertiser?._id ? 'זהו המפרסם המחובר' : 'מפרסם אחר'}
                    </p>

                    {token && <button onClick={() => update(apart)}>עדכן</button>}

                    {token && (
                        <button className="btn delete" onClick={() => handleDeleteCar(apart._id)}>
                            🗑️
                        </button>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ApartmentDetails;