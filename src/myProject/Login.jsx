import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { loginAdvertiser } from './api'; 
import { setCurrentUser, setToken } from "./Redux/Action"; 
import './Register.css'; 
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';  // מייבא את הפונקציה
import 'react-toastify/dist/ReactToastify.css';  // מייבא את ה-CSS של React Toastify
import { ToastContainer } from 'react-toastify';  // ייבוא של ToastContainer

const Login = () => {
    const [email, setEmail] = useState(''); // מצב לאחסון האימייל
    const [password, setPassword] = useState(''); // מצב לאחסון הסיסמה
    const [loading, setLoading] = useState(false); // מצב לטעינת הנתונים
    const [error, setError] = useState(null); // מצב לאחסון שגיאות
    const [formErrors, setFormErrors] = useState({}); // מצב לאחסון שגיאות הטופס
    const dispatch = useDispatch();
    const nav = useNavigate();

    const validateField = (field, value) => {
        let error = null;
        switch (field) {
            case 'email':
                if (!value) error = 'שדה חובה';
                else if (!/\S+@\S+\.\S+/.test(value)) error = 'אימייל לא תקין';
                break;
            case 'password':
                if (!value) error = 'שדה חובה';
                else if (value.length < 6) error = 'הסיסמה חייבת לכלול לפחות 6 תווים';
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === 'email') setEmail(value);
        if (id === 'password') setPassword(value);
        setFormErrors((prev) => ({ ...prev, [id]: validateField(id, value) })); // עדכון שגיאות הטופס
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (validateField('email', email)) errors.email = validateField('email', email);
        if (validateField('password', password)) errors.password = validateField('password', password);
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return; // אם יש שגיאות, לא להמשיך

        setLoading(true);
        setError(null);

        try {
            const response = await loginAdvertiser(email, password); // קריאה ל-API להתחברות
            const { token, advertiser } = response.data;

            const expirationTime = Date.now() + 3600000; // זמן תפוגת הטוקן (שעה)
            dispatch(setToken(token, expirationTime)); // עדכון הטוקן ב-Redux
            dispatch(setCurrentUser(advertiser)); // עדכון המשתמש הנוכחי ב-Redux

            // הצגת הודעת הצלחה עם Toast
            toast.success(`ברוך הבא, ${advertiser.email}! דירה ממתינה לך! 🌟🎉`);

        } catch (err) {
            const message = err.response?.data?.error || 'שגיאה לא צפויה';
            setError(message); // עדכון מצב השגיאה
        } finally {
            setLoading(false); // סיום טעינת הנתונים
        }
    };

    const handleRegisterRedirect = () => {
        nav('/register'); // ניווט לעמוד ההרשמה
    };

    return (
        <div className="registration-form">
            <h2>התחברות למערכת</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="input-container">
                    <input
                        type="email"
                        id="email"
                        placeholder="אימייל"
                        value={email}
                        onChange={handleChange}
                    />
                    {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                </div>

                <div className="input-container">
                    <input
                        type="password"
                        id="password"
                        placeholder="סיסמה"
                        value={password}
                        onChange={handleChange}
                    />
                    {formErrors.password && <span className="error-text">{formErrors.password}</span>}
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'טוען...' : 'התחבר'}
                </button>
                {error && <p className="error-text">{error}</p>}
                <button type="button" onClick={handleRegisterRedirect} className="register-button">הרשם</button>
            </form>

            {/* מיקום ה-Toast */}
            <ToastContainer />
        </div>
    );
};

export default Login;