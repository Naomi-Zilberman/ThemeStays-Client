import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getApartmentsByCategory } from './api'; // קריאת השרת ששלפנו קודם
import { Card } from './Card'; // אם תרצה להשתמש בקומפוננטת ה-CARD
import './AdvertiserApartments.css'
const ByCategory = () => {
    const { categoryId } = useParams(); // שליפת מזהה הקטגוריה מה-URL
    const [apartments, setApartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const apartmentsList = await getApartmentsByCategory(categoryId); // שליפת הדירות לפי מזהה הקטגוריה
                setApartments(apartmentsList);
            } catch (err) {
                setError('Failed to fetch apartments');
            } finally {
                setLoading(false);
            }
        };

        fetchApartments();
    }, [categoryId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="advertiser-apartments">
            <h2 className="advertiser-title">   

רישומי דירות בקטגוריה</h2>
            <div className="apartment-list">
                {apartments.map((apartment) => (
                    <Card key={apartment._id} apartment={apartment} /> // הצגת כל דירה בעזרת קומפוננטת Card
                ))}
            </div>
        </div>
    );
};

export default ByCategory;
