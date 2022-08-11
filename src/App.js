import React from "react";
import AppContextProvider from "./context/AppContextProvider";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Header from "./component/Header/Header";
import './App.css'
import TrangChu from "./pages/TrangChu/TrangChu";
import Footer from "./component/Footer/Footer";
import menus from "./component/MenuItems/menuItems";


function App() {
  return (
    <AppContextProvider>
      <div className={'app-container'}>
      <Header menus={menus}/>
      <Routes>
        <Route path="/_admin" element={<div>Login Page</div>} />
        <Route path="/" element={<TrangChu />} />

        <Route path="/baiviet" element={<h1>Bai Viet</h1>} />
        <Route path="/baiviet/:baivietId" element={<h1>Bai Viet</h1>} />

        <Route exact path="/sanpham" element={<h1>San Pham Page</h1>} />
        <Route path="/sanpham/:sanphamId" element={<h1>San Pham</h1>} />
        
        <Route exact path="/lienhe" element={<h1>Lien He</h1>} />
             
        {/* Them San Pham */}
        <Route path="/sanpham/add" element={<PrivateRoute />}>
          <Route exact path="/sanpham/add" element={<h1>San Pham Page</h1>} />
        </Route>
        
        {/* Edit San Pham */}
        <Route path="/sanpham/edit/:sanphamId" element={<PrivateRoute />}>
          <Route exact path="/sanpham/edit/:sanphamId" element={<h1>San Pham Page</h1>} />
        </Route>
        
        {/* Them Bai Viet */}
        <Route path="/baiviet/add" element={<PrivateRoute />}>
          <Route exact path="/baiviet/add" element={<h1>Bai Viet</h1>} />
        </Route>

        {/* Edit Bai Viet */}
        <Route path="/baiviet/edit/:baivietId" element={<PrivateRoute />}>
          <Route exact path="/baiviet/edit/:baivietId" element={<h1>Bai Viet</h1>} />
        </Route>
      </Routes>
      <Footer menus={menus}/>
      </div>
    </AppContextProvider>
  );
}

export default App;
