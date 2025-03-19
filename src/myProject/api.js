import axios from "axios";

const baseUrl = `http://localhost:4000`;

// פונקציה לקבלת כל הדירות
export const getApartments = () => {
    return axios.get(`${baseUrl}/apartment`);
};

// פונקציה לרישום מפרסם חדש
export const registerAdvertiser = (email, password, phone, anotherPhone, apartmentsArr) => {
    return axios.post(`${baseUrl}/advertiser/register`, { email, password, phone, anotherPhone, /*apartmentsArr*/ });
};

// פונקציה להתחברות מפרסם
export const loginAdvertiser = (email, password) => {
    return axios.post(`${baseUrl}/advertiser/login`, { email, password });
};

// פונקציה לקבלת כל הקטגוריות
export const getAllCategories = () => {
    return axios.get(`${baseUrl}/category/getAll`);
};

// פונקציה ליצירת קטגוריה חדשה
export const createCategory = async (formData, token) => {
  try {
    const response = await axios.post(`${baseUrl}/category/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // הגדרת סוג התוכן
        'Authorization': `Bearer ${token}`, // הוספת טוקן לאימות
      },
    });
    return response.data; // החזרת נתוני התגובה
  } catch (error) {
    if (error.response) {
      // טיפול בשגיאה מהשרת
      throw error.response.data;
    }
    throw new Error('Unknown error occurred while creating category');
  }
};

// פונקציה לקבלת כל הדירות
export const getAllApartments = () => {
    return axios.get(`${baseUrl}/apartment`);
};

// פונקציה לקבלת כל הערים
export const getAllCities = () => {
    return axios.get(`${baseUrl}/city/getAll`);
};

// פונקציה ליצירת דירה חדשה
export const createApartment = async (formData, token) => {
  try {
    console.log("שליחת נתונים לשרת:", formData);
    
    const response = await axios.post(
      `${baseUrl}/apartment/create`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // הוספת טוקן לאימות
        },
      }
    );

    console.log("תשובה מהשרת:", response.data); // הצגת תשובת השרת
    return response.data; // החזרת נתוני התגובה
  } catch (error) {
    if (error.response) {
      // שגיאה מהשרת
      console.error("שגיאה מהשרת:", error.response.data); 
      throw error.response.data;
    } else if (error.request) {
      console.error("לא התקבלה תשובה מהשרת:", error.request); 
      throw new Error('No response received from server');
    } else {
      console.error("שגיאה כללית:", error.message); 
      throw new Error('Unknown error occurred while creating apartment');
    }
  }
};

// פונקציה לעדכון דירה קיימת
export const updateApartment = async (apartmentId, updatedFields, advertiserId, token) => {
  try {
      console.log("שליחת עדכון דירה לשרת:", updatedFields);

      const response = await axios.patch(`${baseUrl}/apartment/${apartmentId}/${advertiserId}`, updatedFields, {
          headers: {
              Authorization: `Bearer ${token}`, // הוספת טוקן לאימות
          },
      });
      console.log("תשובה מהשרת לאחר עדכון:", response.data);
      return response.data;
  } catch (error) {
      if (error.response) {
          console.error("שגיאה מהשרת בעת עדכון הדירה:", error.response.data);
          throw error.response.data;
      } else if (error.request) {
          console.error("לא התקבלה תשובה מהשרת בעת עדכון הדירה:", error.request);
          throw new Error('No response received from server while updating apartment');
      } else {
          console.error("שגיאה כללית בעת עדכון הדירה:", error.message);
          throw new Error('Unknown error occurred while updating apartment');
      }
  }
};

// פונקציה למחיקת דירה
export const DeleteApartment = async (apartmentId, advertiserId, token) => {
  try {
    if (!token) {
      console.log('Token is missing!');
    }
  
      const response = await axios.delete(`${baseUrl}/apartment/${apartmentId}/${advertiserId}`, {
          headers: {
              Authorization: `Bearer ${token}`, // הוספת טוקן לאימות
          },
      });
      return response.data;
  } catch (error) {
      throw error.response ? error.response.data : new Error('Unknown error');
  }
};

// פונקציה לקבלת דירות לפי קטגוריה
export const getApartmentsByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${baseUrl}/category/getapartmentsbyid/${categoryId}`);
        return response.data.apartmentsArr;
    } catch (error) {
        console.error('Error fetching apartments:', error);
        throw error;
    }
};

// פונקציה לקבלת דירות מסוננות
export const getFilteredApartments = async (filterType, numBeds, price) => {
  let url;

  if (numBeds != null && numBeds !== undefined && numBeds !== '') {
    url = `${baseUrl}/apartment/filter/${filterType}/${numBeds}`;
  } else if (price != null && price !== undefined && price !== '' && !isNaN(price)) {
    url = `${baseUrl}/apartment/filter2/${filterType}/${price}`;
  } else {
    console.warn("Both numBeds and price are missing or invalid.");
    return;
  }

  console.log("Requesting URL:", url);

  try {
    const response = await axios.get(url);
    console.log("Full response:", response); 
    console.log("Response data:", response.data); 
    return response.data; 
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

// פונקציה לקבלת דירות לפי מזהה עיר
export const getApartmentsByCityId = async (cityId) => {
  try {
      const response = await axios.get(`${baseUrl}/city/getapartmentsbycityid/${cityId}`);
      return response.data.apartmentsArr;
  } catch (error) {
      console.error("Error fetching apartments by city ID:", error.message);
      throw new Error(error.response?.data?.error || "An error occurred while fetching apartments.");
  }
};

// פונקציה לקבלת דירה לפי מזהה
export const fetchApartmentById = async (id) => {
  try {
      const response = await axios.get(`/api/apartments/${id}`);
      return response.data;  
  } catch (error) {
      throw new Error('Error fetching apartment: ' + error.message); // טיפול בשגיאות
  }
};

// קריאה לשרת כדי לשלוף דירות לפי מזהה המפרסם
export const getApartmentsByAdvertiserId = async (advertiserId) => {
  try {
      console.log(advertiserId);
      console.log("URL:"+`${baseUrl}/advertiser/getapartmentsbyadvertiserid/${advertiserId}`);
  
      const response = await axios.get(`${baseUrl}/advertiser/getapartmentsbyadvertiserid/${advertiserId}`);
      return response.data.apartmentsArr; // מחזירים את מערך הדירות
  } catch (error) {
      throw new Error('Error fetching apartments: ' + error.message); // טיפול בשגיאות
  }
};