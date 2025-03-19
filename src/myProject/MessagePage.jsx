import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './MessagePage.css'; // קובץ CSS להודעות הזויות

const MessagePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const message = location.state?.message || 'הודעה לא קיימת';
    
    useEffect(() => {
        // לאחר 5 שניות, נבצע ניתוב לדף הדירות
        const timer = setTimeout(() => {
            navigate('/apartments');
        }, 5000); // 5 שניות
        
        // אם המשתמש עוזב את הדף, ננקה את ה־timeout
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="message-container">
            <div className="message-content">
                <h2>{message}</h2>
            </div>
        </div>
    );
};

export default MessagePage;
