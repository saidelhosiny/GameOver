import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { createBrowserRouter, createHashRouter, Navigate, RouterProvider } from "react-router-dom";
import { All, AllGames } from "./components/All/AllGames";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';

import { Gamedetails } from "./components/Gamedetails/Gamedetails";

import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login"
import { Main } from "./components/Main/main";
import { Notfound } from "./components/Notfound/Notfound";

import { Register } from "./components/Register/Register";

import GamesType from "./components/GamesType/GamesType";






function App() {

let [loggedinUser,setLoggoedInUser]= useState(null)

  function getUserData(){
    
    let token = localStorage.getItem("token")
    let decoded = jwtDecode(token)
    setLoggoedInUser(decoded)


  }


  function remove(){

    setLoggoedInUser(null)
    localStorage.removeItem("token")
  }

function checkReload(){
  if (localStorage.getItem("token") != null && loggedinUser == null){
    getUserData()
  }
}

useEffect(function(){
  checkReload()
} , [])


function ProtectedRoute(props){

  if (localStorage.getItem("token")){
    return <>{props.children} </>
  }
  else{
    return <Navigate to={"/login"} />
  }

}




const router= createHashRouter([
  {path: "", element : <Main remove = {remove}  loggedinUser={loggedinUser} /> ,children:[
    {path:"login", element :  <Login  getUserData={getUserData}   />},
    {path:"Register", element : <Register/>},
    {path:"games/home", element : <ProtectedRoute> <Home/></ProtectedRoute> },
    {path:"/home", element : <ProtectedRoute> <Home/></ProtectedRoute>},
    {path:"", element : <ProtectedRoute> <Home/></ProtectedRoute>},
    {path: "all" ,element : <ProtectedRoute> <AllGames/></ProtectedRoute> },

    {path: "games/Gamedetails/:id" ,element : <ProtectedRoute><Gamedetails/></ProtectedRoute> },
    { path :'game-details' , element:<ProtectedRoute><GamesType/> </ProtectedRoute> ,children:[
      { path:':type',  children: [
        { path: ':specific'}
      ]}
    ] },


   
    // {path:"games/sort-by/release-date" ,element: <ProtectedRoute> <Release/></ProtectedRoute>},
    // {path:"games/sort-by/popularity" ,element:  <ProtectedRoute><Popularity/></ProtectedRoute>},
    // {path:"games/sort-by/alphabetical" ,element: <ProtectedRoute><Alphabetical/> </ProtectedRoute>},
    // {path:"games/sort-by/relevance" ,element: <ProtectedRoute> <Relevance/></ProtectedRoute>},
    // {path:"games/category/racing" ,element: <ProtectedRoute><Racing/> </ProtectedRoute>},
    // {path:"games/category/sports" ,element: <ProtectedRoute><Sports/></ProtectedRoute>},
    // {path:"games/category/shooter" ,element: <ProtectedRoute><Shooter/></ProtectedRoute>},
    // {path:"games/category/Social" ,element: <ProtectedRoute><Social/></ProtectedRoute>},
    // {path:"games/category/open-world" ,element: <ProtectedRoute><Openworld/></ProtectedRoute>},
    // {path:"games/category/zombie" ,element: <ProtectedRoute> <Zombie/></ProtectedRoute>},
    // {path:"games/category/fantasy" ,element: <ProtectedRoute> <Fantasy/></ProtectedRoute>},
    // {path:"games/category/action-rpg" ,element: <ProtectedRoute> <Actionrgb/></ProtectedRoute>},
    // {path:"games/category/action" ,element: <ProtectedRoute> <Action/></ProtectedRoute>},
    // {path:"games/category/flight" ,element: <ProtectedRoute> <Flight/></ProtectedRoute>},
    // {path:"games/category/battle-royale" ,element: <ProtectedRoute> <Battle/></ProtectedRoute>},
   
    {path:"*", element : <Notfound/>},
  ]}
])



  return <>

  <RouterProvider router={router} />

  <ToastContainer/>
  
  </>;
}

export default App;
