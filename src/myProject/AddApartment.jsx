import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApartment, getAllCategories, getAllCities } from './api';
import { useSelector } from 'react-redux';
import './AddApartment.css';  // יש להוסיף קובץ CSS עם העיצוב

const AddApartment = () => {
  const currentAdd = useSelector((state) => state.currentAdvertiser);

  const [apartmentData, setApartmentData] = useState({
    apartmentName: '',
    description: '',
    categoryId: '',
    CityId: '',
    address: '',
    numBeds: '',
    additives: '',
    price: '',
    advertiserId: currentAdd._id,
  });

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = useSelector(a => a.token);

  useEffect(() => {
    const fetchCategoriesAndCities = async () => {
      try {
        const categoriesResponse = await getAllCategories();
        const citiesResponse = await getAllCities();
        setCategories(categoriesResponse.data);
        setCities(citiesResponse.data);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };
    fetchCategoriesAndCities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApartmentData({
      ...apartmentData,
      [name]: name === 'numBeds' || name === 'price' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!apartmentData.icon) {
      setError('נא להעלות אייקון');
      return;
    }

    const formData = new FormData();
    formData.append('apartmentName', apartmentData.apartmentName);
    formData.append('description', apartmentData.description);
    formData.append('categoryId', apartmentData.categoryId);
    formData.append('CityId', apartmentData.CityId);
    formData.append('address', apartmentData.address);
    formData.append('numBeds', apartmentData.numBeds);
    formData.append('additives', apartmentData.additives);
    formData.append('price', apartmentData.price);
    formData.append('advertiserId', apartmentData.advertiserId);
    formData.append('icon', apartmentData.icon);

    try {
      const response = await createApartment(formData, token);
      console.log('תשובה מהשרת:', response);
      navigate('/message', { state: { message: 'הדירה נוספה בהצלחה!' } });
    } catch (err) {
      setError('אירעה שגיאה בעת שליחת הנתונים');
      console.error('שגיאה:', err.response?.data || err.message);
    }
  };

  return (
    <div className="add-apartment-form">
      <h2>הוסף דירה</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>שם הדירה:</label>
          <input
            type="text"
            name="apartmentName"
            value={apartmentData.apartmentName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>תיאור:</label>
          <textarea
            name="description"
            value={apartmentData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>קטגוריה:</label>
          <select
            name="categoryId"
            value={apartmentData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">בחר קטגוריה</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>עיר:</label>
          <select
            name="CityId"
            value={apartmentData.CityId}
            onChange={handleChange}
            required
          >
            <option value="">בחר עיר</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.cityName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>כתובת:</label>
          <input
            type="text"
            name="address"
            value={apartmentData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>מספר מיטות:</label>
          <input
            type="number"
            name="numBeds"
            value={apartmentData.numBeds}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>תוספות:</label>
          <input
            type="text"
            name="additives"
            value={apartmentData.additives}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>מחיר:</label>
          <input
            type="number"
            name="price"
            value={apartmentData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>בחר אייקון:</label>
          <input
            type="file"
            name="icon"
            accept="image/*"
            onChange={(e) => setApartmentData({ ...apartmentData, icon: e.target.files[0] })}
          />
        </div>

        <button type="submit" className="submit-btn">הוסף דירה</button>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default AddApartment;