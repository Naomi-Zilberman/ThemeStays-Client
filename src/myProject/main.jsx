// import Home from "./Home" 
// import { Provider } from "react-redux"
// import myStore from "./Redux/Store"
// import Login from "./Login"
// import Register from "./Register"
// import AddCategoryForm from "./AddCategoryForm"
// import AllApartments from "./AllApartments"
// import SelectButton from "./SelectButton"
// import ButtonsContainer from "./ButtonContainer"
// import { BrowserRouter } from "react-router"
// import { Routing } from "./Routing"
// import { Nav } from "./Nav"

// export const Main=()=>{
// return <>
//  {/* <Provider store={myStore} > */}
//     {/* <BrowserRouter> */}
//             {/* <Home></Home> */}
//             {/* <Login></Login> */}
//             {/* <Register></Register> */}
//             {/* <AddCategoryForm></AddCategoryForm> */}
//             {/* <ButtonsContainer></ButtonsContainer>

//             */}
//             {/* <SelectButton></SelectButton> */}
//             {/* <ButtonsContainer></ButtonsContainer> */}
//             {/* <AllApartments></AllApartments> */}
//             {/* <Routing></Routing> */}
//             {/* </BrowserRouter> */}
//         {/* </Provider></> */}


// {/* <Provider store={myStore} >
// <BrowserRouter>
//     <Nav></Nav>
//     <Routing></Routing>
   
// </BrowserRouter>

// </Provider> */}

//  <Provider store={myStore} >
//      <BrowserRouter>
//             <Home></Home>
//             <Routing></Routing>
//             {/* <Login></Login> */}
//             {/* <Register></Register> */}
//             {/* <AddCategoryForm></AddCategoryForm> */}
//             {/* {/* <ButtonsContainer></ButtonsContainer> */}

//         </BrowserRouter>   
// </Provider></>

// }
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import myStore from './Redux/Store';
import { Routing } from './Routing';
import Home from './Home';
import { Nav } from './Nav';
import UpdateApartment from './UpdateApartment';
import AllApartments from './AllApartments';
import ApartmentDetails from './ApartmentDetails';
import ByCategory from './ByCategory';
export const Main = () => {
  return (
    <Provider store={myStore}>
      <BrowserRouter>
      <Nav></Nav> 
      <Routing></Routing>  
      </BrowserRouter>
    </Provider>
  );
};
