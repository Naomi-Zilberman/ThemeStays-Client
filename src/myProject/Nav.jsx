import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUser } from 'react-icons/fa';
import './Nav.css'; // הכנס כאן את קובץ ה-CSS שלך

export const Nav = () => {
    const token = useSelector(x => x.token);

    return (
        <div className="nav">
            {/* לוגו בצד שמאל */}
            <div className="logo">
                <p  className="site-logo" />
            </div>

            {/* ניווט */}
            <div className="nav-links">
                <NavLink to="/apartments" activeClassName="active" className="nav-item">
                    דירות נושאיות
                </NavLink>
                <NavLink to="/home" activeClassName="active" className="nav-item">
                    בית
                </NavLink>
                {token && (
                    <>
                        <NavLink to="/addapartment" className="nav-item" activeClassName="active">
                            הוספת דירה
                        </NavLink>
                        <NavLink to="/advertiserapart" className="nav-item" activeClassName="active">
                            אזור אישי
                        </NavLink>
                    </>
                )}
            </div>

            {/* אייקון משתמש */}
            {token && (
                <div className="user-info">
                    <FaUser className="user-icon" />
                    <span className="username">שלום, אנ"ש</span>
                </div>
            )}
        </div>
    );
};
