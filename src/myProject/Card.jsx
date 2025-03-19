import { useNavigate } from 'react-router';
import './Card.css';

export const Card = ({ apartment }) => {
  const nav = useNavigate(); // שימוש ב-useNavigate לניווט

  const moreDet = () => {
    alert(apartment._id); // הצגת מזהה הדירה באלרט
    nav(`/more_details/${apartment._id}`); // ניווט לעמוד פרטי הדירה
  };

  return (
    <div className="card">
      <h3 className="card-title">{apartment.apartmentName}</h3> {/* הצגת שם הדירה */}
      <p className="card-category">{apartment.categoryId && apartment.categoryId.categoryName}</p> {/* הצגת קטגוריית הדירה */}
      <p className="card-price">מחיר: {apartment.price}</p> {/* הצגת מחיר הדירה */}
      <p className="card-additives">{apartment.additives}</p> {/* הצגת תוספות הדירה */}
      <p className="card-beds">מס' מיטות: {apartment.numBeds}</p> {/* הצגת מספר מיטות */}
      <button className="card-button" onClick={moreDet}>פרטים נוספים</button> {/* כפתור לפרטים נוספים */}
    </div>
  );
};