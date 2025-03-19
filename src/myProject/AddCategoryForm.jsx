import React, { useState } from 'react';
import { createCategory } from './api';
import { useDispatch, useSelector } from 'react-redux';
import './Register.css'; // כולל גם את האנימציות
import { updateCategories } from './Redux/Action';
import { useNavigate } from 'react-router';

const AddCategoryForm = () => {
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState('');
    const [icon, setIcon] = useState(null);
    const [successMessage, setSuccessMessage] = useState(''); // הודעת הצלחה
    const token = useSelector(a => a.token);
    const nav = useNavigate();

    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleIconChange = (e) => {
        setIcon(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('categoryName', categoryName);
        if (icon) {
            formData.append('icon', icon);
        }

        try {
            const response = await createCategory(formData, token); // קריאה ל-API
            dispatch(updateCategories(response)); // עדכון Redux

            // הצגת הודעת הצלחה
            setSuccessMessage(`קטגוריה "${categoryName}" נוספה בהצלחה!`);
            setTimeout(() => setSuccessMessage(''), 4000); // הסתרה לאחר 4 שניות
            setCategoryName(''); // איפוס שדה
            setIcon(null);
        } catch (error) {
            console.error('Error creating category:', error.message || error);
        }
    };

    return (
        <div className='registration-form'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>שם הקטגוריה:</label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={handleCategoryNameChange}
                        required
                    />
                </div>

                <div>
                    <label>בחר אייקון:</label>
                    <input type="file" onChange={handleIconChange} />
                </div>

                <button type="submit">הוסף קטגוריה</button>
            </form>

            {/* הודעת הצלחה עם אנימציות */}
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}
        </div>
    );
};

export default AddCategoryForm;