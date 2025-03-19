import React, { useEffect, useState } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategories } from './Redux/Action';
import { getAllCategories } from './api';
import { Outlet, useNavigate } from 'react-router';
import AddCategoryForm from './AddCategoryForm';

const Home = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [showAddCategory, setShowAddCategory] = useState(false); // מצב עבור הוספת קטגוריה
  const [showLogin, setShowLogin] = useState(false); // מצב עבור הוספת התחברות

  const categories = useSelector((state) => state.categories);
  const token = useSelector((state) => state.token);

  const show = () => {
    setShowLogin((prev) => !prev); 
    nav('login');

  }
  

  const loadCategories = async () => {
    try {
      const response = await getAllCategories();
      dispatch(updateCategories(response.data));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    loadCategories();
  }, [dispatch]);

  const handleAddCat = async () => {
    try {
      setShowAddCategory((prev) => !prev); 
      nav('/addcategory');
      
      // אם קטגוריה מתווספת בהצלחה, טוענים את הקטגוריות מחדש
      await loadCategories(); // טוען מחדש את הקטגוריות אחרי הוספה
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  
  

  const handleCategoryClick = (categoryId) => {
    nav(`/category/${categoryId}`);
  };

  const aparts = () => {
    nav('/apartments')
  }

  return (
    <div className="home-page-container">
      {/* הודעה מהמהמת במקום alert */}
      <div className="alert-msg ">
        🚨  ! 🚨 ברוך הבא לThemeStays שלנו!
      </div>

      <section className="main-header">
        <h1 className="headline" >ThemeStays -ברוכים הבאים לעולם שלנו </h1>
      </section>

      <section className="about">
        <p>
          אנחנו אתר המתמחה בפרסום דירות נופש נושאיות שתהפוך את החופשה שלכם לשונה ומרגשת. דירות בטעמים שונים
          כמו טירות קסומות, דירות מבודדות בטבע, דירות בסגנון של פעם ועוד.
        </p>
      </section>

      <div className="auth-buttons">
        <button className="login-btn" onClick={() => show()}>
          {showLogin ? 'הסתר  טופס התחברות' : 'התחברות למערכת '}</button>
          {showLogin && <div><Outlet/></div>}
      </div>

      {/* גלריית תמונות ראשית */}
      <section className="carousel">
        <div className="carousel-item">
          <img src="https://img.freepik.com/free-photo/historical-beautiful-castle_23-2151010523.jpg?ga=GA1.1.532933030.1733848083&semt=ais_hybrid" alt="דירת טירה" />
          <div className="caption">החופשה הבאה שלכם באווירה ייחודית!</div>
        </div>
        <div className="carousel-item">
          <img src="https://img.freepik.com/premium-photo/caravan-camping_1114017-2.jpg?ga=GA1.1.532933030.1733848083&semt=ais_hybrid" alt="דירת חלל" />
          <div className="caption">החופשה הבאה שלכם באווירה ייחודית!</div>
        </div>
        <div className="carousel-item">
          <img src="https://img.freepik.com/free-photo/comfortable-modern-living-room-with-wood-furniture-nature-view-generated-by-artificial-intelligence_188544-150185.jpg?ga=GA1.1.532933030.1733848083&semt=ais_hybrid" alt="דירת טבע" />
          <div className="caption">החופשה הבאה שלכם באווירה ייחודית!</div>
        </div>
        <div className="carousel-item">
          <img src="https://img.freepik.com/free-photo/landscape-with-colorful-rainbow-appearing-sky_23-2151521446.jpg?ga=GA1.1.532933030.1733848083&semt=ais_hybrid" alt="דירת טבע" />
          <div className="caption">החופשה הבאה שלכם באווירה ייחודית!</div>
        </div>
        <div className="carousel-item">
          <img src="https://img.freepik.com/free-photo/ai-image-eclectic-interior-design_23-2150674705.jpg?ga=GA1.1.532933030.1733848083&semt=ais_hybrid" alt="דירת אומנות" />
          <div className="caption">החופשה הבאה שלכם באווירה ייחודית!</div>
        </div>
      </section>

      {/* מלל שיווקי ארוך */}
      <section className="marketing-text">
        <h2>החוויה מתחילה כאן</h2>
        <p>
          אם תמיד חלמתם על חופשה ייחודית ומרגשת, הגעתם למקום הנכון. האתר שלנו מציע דירות נופש נושאיות שמביאות אתכם לעולם אחר, 
          לעיתים דמוי טירה קסומה, ולעיתים בנוף פתוח ונרחב שמזמין אתכם לשכוח את כל הדאגות. כל דירה באתר שלנו מציעה חווית אירוח 
          שונה ומיוחדת – בדיוק מה שאתם צריכים כדי להפוך את החופשה שלכם למיוחדת ובלתי נשכחת.
        </p>
        <p>
          אנו מאמינים כי כל אדם זקוק לחופשה שתתאים בדיוק לאופי ולסגנון החיים שלו. בחרו את הדירה שמתאימה לכם ביותר: האם אתם 
          אוהבים טבע ושקט, או אולי יותר סגנון של טירות ומפלטים רומנטיים? הדירות שלנו מציעות מגוון סגנונות אירוח, שמאפשרות 
          לכל אחד למצוא את המקום המושלם לו.
        </p>
        <p>
          ההזמנה שלנו פשוטה, נוחה ומהירה. כל מה שעליכם לעשות זה לבחור את הדירה שתואמת את הצרכים שלכם, ולקבל את ההזמנה 
          שלכם תוך זמן קצר. אל תשכחו – אתם לא רק מזמינים מקום לישון בו, אלא חוויה שלמה שתשאיר לכם זיכרונות לכל החיים.
        </p>
        <p>
          תהנו מחוויות מיוחדות ובלתי שגרתיות, עם נופים מדהימים, עיצוב פנים יוקרתי ושירות ברמה הגבוהה ביותר. אתם לא רק 
          מבקרים במתחם, אתם הופכים לחלק מחוויה ייחודית שמותאמת בדיוק לכם. זה הזמן לגלות את הפלאים שאנחנו מציעים!
        </p>
      </section>

      {/* כפתור הוספת קטגוריה */}
      {token ? (
        <div className="add-category-container">
<button type="button" onClick={handleAddCat} className="register-button">
{showAddCategory ? 'הסתר הוספת קטגוריה' : 'להוספת קטגוריה'}
          </button>
          {showAddCategory && <div className="add-category-form"><Outlet/></div>}
        </div>
      ) : (
        <div>
          <button className="login-prompt" onClick={show}>התחבר על מנת להוסיף קטגוריה</button>
        </div>
      )}

      <section className="categories">
        <h2>קטגוריות נושאיות</h2>
        <br></br>
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div 
              key={category._id} 
              className="category-card" 
              onClick={() => handleCategoryClick(category._id)}
            >
              <div className="category-icon">
                {category.iconUrl ? (
                  <img src={`http://localhost:4000${category.iconUrl}`} alt={category.categoryName} />
                ) : (
                  '🏰'
                )}
              </div>
              <div className="category-name">{category.categoryName}</div>
            </div>
          ))
        ) : (
          <p>  </p>
        )}
      </section>

      <section className="cta">
        <button className="cta-btn" onClick={aparts}>צפה בכל הדירות הנושאיות</button>
      </section>
    </div>
  );
};

export default Home;
