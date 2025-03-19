import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from './Redux/Action'; // import the action
import { registerAdvertiser } from "./api"; // הפונקציה שהגדרנו
import './Register.css';
import { useNavigate } from "react-router";

const Register = () => {
    const dispatch = useDispatch(); // ייבוא ה-Dispatch אם תשתמש ב-Redux
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [anotherPhone, setAnotherPhone] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formErrors, setFormErrors] = useState({
        email: null,
        password: null,
        phone: null,
        anotherPhone: null,
    });
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    // פונקציה לבדיקת שדה
    const validateField = (field, value) => {
        switch (field) {
            case 'email':
                return value && value.includes('@') ? null : "הכנס אימייל תקני";
            case 'password':
                return value.length >= 6 ? null : "הסיסמה צריכה להכיל לפחות 6 תווים";
            case 'phone':
                return value.length >= 10 ? null : "המספר צריך להיות באורך מינימלי של 10 תווים";
            case 'anotherPhone':
                return value.length >= 10 || value === "" ? null : "המספר השני צריך להיות באורך מינימלי של 10 תווים";
            default:
                return null;
        }
    };

    // פונקציה שמופעלת כאשר יוצאים משדה
    const handleBlur = (field, value) => {
        setFormErrors({
            ...formErrors,
            [field]: validateField(field, value),
        });
    };

    // פונקציה לטיפול בהרשמה
    const handleRegister = async (e) => {
        e.preventDefault();

        // בדיקה אם כל השדות תקינים
        const newFormErrors = {
            email: validateField('email', email),
            password: validateField('password', password),
            phone: validateField('phone', phone),
            anotherPhone: validateField('anotherPhone', anotherPhone),
        };

        setFormErrors(newFormErrors);

        // אם יש שגיאות, לא שולחים את הטופס
        if (Object.values(newFormErrors).some((error) => error !== null)) {
            setError("אנא ודא שכל השדות תקינים.");
            return;
        }

        setLoading(true); // מתחילים טעינה

        try {
            const response = await registerAdvertiser(email, password, phone, anotherPhone);
            const { token, advertiser } = response.data;

            console.log("Registered successfully:", advertiser);
            setSuccess("ההרשמה הצליחה!");
            localStorage.setItem("token", token);  // ניתן לשמור כאן עדיין אם לא ב-Redux
            dispatch(setToken(token));  // שמירת הטוקן ב-Redux
            setError(null); // אם ההרשמה הצליחה, מנקה את השגיאות

        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                if (err.response.data.message.includes("email")) {
                    setError('הכתובת דוא"ל כבר קיימת במערכת.');
                } else if (err.response.data.message.includes("phone")) {
                    setError("המספר טלפון כבר בשימוש.");
                } else {
                    setError("הייתה שגיאה בהרשמה, אנא נסה שנית.");
                }
            } else {
                setError("הייתה שגיאה לא צפויה.");
            }
        } finally {
            setLoading(false); // מסיימים טעינה
        }
        nav('/home');
    };

    return (
        <div>
            <h2>הרשמה למערכת</h2>
            <form onSubmit={handleRegister} className="registration-form">
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="הכנס את כתובת האימייל שלך"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => handleBlur('email', email)}
                        required
                    />
                    {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="הכנס סיסמה (לפחות 6 תווים)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => handleBlur('password', password)}
                        required
                    />
                    {formErrors.password && <p style={{ color: "red" }}>{formErrors.password}</p>}
                </div>
                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        placeholder="הכנס מספר טלפון"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onBlur={() => handleBlur('phone', phone)}
                        required
                    />
                    {formErrors.phone && <p style={{ color: "red" }}>{formErrors.phone}</p>}
                </div>
                <div>
                    <label>Another Phone</label>
                    <input
                        type="text"
                        placeholder="הכנס מספר טלפון נוסף (אופציונלי)"
                        value={anotherPhone}
                        onChange={(e) => setAnotherPhone(e.target.value)}
                        onBlur={() => handleBlur('anotherPhone', anotherPhone)}
                    />
                    {formErrors.anotherPhone && <p style={{ color: "red" }}>{formErrors.anotherPhone}</p>}
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "טוען..." : "הירשם"}
                </button>
            </form>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {success && <div style={{ color: "green" }}>{success}</div>}
        </div>
    );
};

export default Register;