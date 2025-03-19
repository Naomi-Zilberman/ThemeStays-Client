import React, { useState, useEffect } from 'react';
import { getApartmentsByAdvertiserId } from './api';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card } from './Card';
import './AdvertiserApartments.css'; // נוסיף קובץ CSS לעיצוב

const AdvertiserApartments = () => {
  const { advertiserId } = useParams(); // קבלת מזהה המפרסם מה-URL
  const [apartments, setApartments] = useState([]); // מצב לאחסון רשימת הדירות
  const [loading, setLoading] = useState(true); // מצב לטעינת הנתונים
  const [error, setError] = useState(null); // מצב לאחסון שגיאות
  const currentAdvertiser = useSelector((state) => state.currentAdvertiser); // קבלת המפרסם הנוכחי מ-Redux

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const apartmentsData = await getApartmentsByAdvertiserId(currentAdvertiser._id); // קריאה ל-API לקבלת הדירות
        setApartments(apartmentsData); // עדכון מצב הדירות
        setLoading(false); // סיום טעינת הנתונים
      } catch (error) {
        setError(error.message); // עדכון מצב השגיאה
        setLoading(false); // סיום טעינת הנתונים
      }
    };

    fetchApartments();
  }, [currentAdvertiser._id]); // קריאה לפונקציה בכל פעם שהמפרסם הנוכחי משתנה

  if (loading) {
    return <div className="loading">Loading apartments...</div>; // הצגת הודעת טעינה
  }

  if (error) {
    return <div className="error">Error: {error}</div>; // הצגת הודעת שגיאה
  }

  return (
    <div className="advertiser-apartments">
      <h2 className="advertiser-title">Apartments for Advertiser: {currentAdvertiser._id}</h2>
      {apartments.length === 0 ? (
        <p className="no-apartments">No apartments found for this advertiser.</p> // הודעה אם אין דירות
      ) : (
        <div className="apartment-list">
          {apartments.map((apartment) => (
            <div key={apartment._id} className="apartment-item">
              <Card apartment={apartment} /> {/* הצגת כל דירה באמצעות רכיב Card */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvertiserApartments;