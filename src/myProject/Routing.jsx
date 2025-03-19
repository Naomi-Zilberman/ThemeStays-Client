
// // import { Home } from "./Home"
// // import RegistrationForm from "./RegistrationForm"
// // import LoginForm from "./LoginForm"
// import { Route, Routes } from "react-router"
// // import { Cars } from "./Cars"
// import ButtonContainer from "./ButtonContainer"
// import Home from "./Home"
// // import CarDetails from "./CarDetails"
// // import CarRental from "./CarRental"
// // import CarReturnForm from "./CarReturnForm"
// // import AdminDashboard from "./AdminDashboard"
// // import UpdateCarForm from "./UpdateCarForm"
// // import { AddCar } from "./AddCar"
// // import Login from "./myProject/Login"
// import Login from "./Login"

// import AllApartments from "./AllApartments"
// import ButtonsContainer from "./ButtonContainer"

// export const Routing = () => {
//     return <>

//         <Routes>
//             <Route path="home" element={<Home></Home>}>
//                 <Route path="login" element={<Login></Login>}></Route>
//             </Route>
//             {/* <Route path="apartments" element={<AllApartments></AllApartments>}> 
//                 <Route path="filter" element={<ButtonContainer></ButtonContainer>}></Route>
//             </Route> */}
//             {/* <Route path="return" element={<CarReturnForm></CarReturnForm>}></Route>
//             <Route path="form" element={<RegistrationForm></RegistrationForm>}></Route>
//             <Route path="admin" element={<AdminDashboard></AdminDashboard>}></Route>
//             <Route path="upcar/:carCode"element={<UpdateCarForm></UpdateCarForm>}></Route>
//             <Route path="addcar"element={<AddCar></AddCar>}></Route>
//             <Route path="rent/:license_plate" element={<CarRental></CarRental>}></Route>
//             <Route path="more_details/:code" element={<CarDetails></CarDetails>} ></Route>
//             <Route path="" element={<Home></Home>}>
//                 <Route path="login" element={<LoginForm></LoginForm>}></Route>
//             </Route> */}
//         </Routes>
//     </>
// }


// Routing.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import AddCategoryForm from './AddCategoryForm';
import AllApartments from './AllApartments';
import AddApartment from './AddApartment';
import ApartmentDetails from './ApartmentDetails';
import UpdateApartment from './UpdateApartment';
import ByCategory from './ByCategory';
import ButtonContainer from './ButtonContainer';
import AdvertiserApartments from './AdvertiserApartments';
import MessagePage from './MessagePage';

export const Routing = () => {
  return (
    <Routes>
     <Route path="/" element={<Home />}>
        <Route path="login" element={<Login />} />
        <Route path="addcategory" element={<AddCategoryForm />} />
      </Route>
      
      <Route path="/home" element={<Home />}>
        <Route path="login" element={<Login />} />
        <Route path="addcategory" element={<AddCategoryForm />} />
      </Route>
      
      <Route path="/apartments" element={<AllApartments />}>
      <Route path="filter" element={<ButtonContainer />} />
 </Route>
      <Route path="/addapartment" element={<AddApartment />} />
      <Route path="/more_details/:_id" element={<ApartmentDetails />} />
      <Route path="/filter" element={<ButtonContainer />} />

      <Route path="/update/:apartId" element={<UpdateApartment />} />
      <Route path="/register" element={<Register />} />
      <Route path="/category/:categoryId" element={<ByCategory />} />
      <Route path="/advertiserapart" element={<AdvertiserApartments />} />
      <Route path="/message" element={<MessagePage />} /> {/* הנתיב לדף ההודעה */}


      <Route path="*" element={<div>Page Not Found</div>} />
    </Routes>
  );
};
