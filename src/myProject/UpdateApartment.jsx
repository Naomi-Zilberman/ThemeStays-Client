import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { updateApartment } from './api';

const UpdateApartment = () => {
    const nav = useNavigate();
    const { apartId } = useParams(); // Get the apartment ID from URL
    const apartments = useSelector((state) => state.apartments); // Fetch from Redux store
    const currentAdvertiser = useSelector((state) => state.currentAdvertiser); // שליפת המפרסם הנוכחי
    const token = useSelector((state) => state.token); // שליפת הטוקן מ-Redux store

    const apartment = apartments.find((a) => a._id === apartId); // Find the apartment by ID

    const [formData, setFormData] = useState(apartment || {});
    const [originalData, setOriginalData] = useState(apartment || {});

    useEffect(() => {
        if (apartment) {
            setFormData(apartment);
            setOriginalData(apartment); // Save the original data for comparison
        }
    }, [apartment]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Identify only the fields that have changed
        const updatedFields = Object.keys(formData).reduce((changes, key) => {
            if (formData[key] !== originalData[key]) {
                changes[key] = formData[key];
            }
            return changes;
        }, {});

        if (Object.keys(updatedFields).length === 0) {
            alert('No changes to update.');
            nav('/apartments');
            return;
        }

        try {
            await updateApartment(apartment._id, updatedFields, currentAdvertiser._id, token); // שולח את ID המפרסם ואת הטוקן
            alert('הדירה עודכנה בהצלחה!');
            nav('/apartments')

        } catch (err) {
            alert(`שגיאה בעדכון הדירה: ${err.message || err}`);
        }
    };

    if (!apartment) {
        return <div>Apartment not found!</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Apartment</h2>
            <label>
                Name:
                <input
                    type="text"
                    name="apartmentName"
                    value={formData.apartmentName || ''}
                    onChange={handleChange}
                />
            </label>
            <label>
                Description:
                <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                ></textarea>
            </label>
            {/* Add more fields similarly */}
            <button type="submit">Update Apartment</button>
        </form>
    );
};

export default UpdateApartment;
