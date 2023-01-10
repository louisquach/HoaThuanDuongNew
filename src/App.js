import React from "react";
import AppContextProvider from "./context/AppContextProvider";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Header from "./component/Header/Header";
import './App.css'
import TrangChu from "./pages/TrangChu/TrangChu";
import Footer from "./component/Footer/Footer";
import menus from "./component/MenuItems/menuItems";
import LienHePage from "./pages/LienHe/LienHePage";
import GioiThieuPage from "./pages/GioiThieu/GioiThieuPage";
import SanPhamPage from "./pages/SanPham/SanPhamPage";
import SanphamSingle from "./pages/SanPham/SanphamSingle/SanphamSingle";
import BaiVietPage from "./pages/BaiViet/BaiVietPage";
import BaivietSingle from "./pages/BaiViet/BaiVietSingle/BaivietSingle";
import LoginPage from "./component/Login/LoginPage";
import QuanlyPage from "./pages/Admin/Quanly/QuanlyPage.jsx";
import ThemBaiViet from "./pages/Admin/Action/BaiViet/Editor/ThemBaiViet";
import ThemSanPham from "./pages/Admin/Action/SanPham/Editor/ThemSanPham";
import DonHang from "./pages/Admin/Action/DonHang/DonHang";


function App() {
  return (
    <AppContextProvider>
      <div className={'app-container'}>
      <Header menus={menus}/>
      <Routes>
        <Route exact path="/_admin" element={<LoginPage />} />
        <Route path="/" element={<TrangChu />} />

        <Route path="/tintuc-baiviet" element={<BaiVietPage />} />
        <Route exact path="/tintuc-baiviet/:baivietId" element={<BaivietSingle />} />

        <Route exact path="/san-pham/thuoc" element={<SanPhamPage />} />
        <Route exact path="/san-pham/thuc-pham-chuc-nang" element={<SanPhamPage isThuoc={false}/>} />
        <Route exact path="/san-pham/:sanphamId" element={<SanphamSingle />} />
        
        <Route path="/lien-he" element={<LienHePage />} />
        <Route exact path="/gioi-thieu" element={<GioiThieuPage />} />
        

        {/*****************************  Admin Section *****************************/}

        <Route path="/quanly" element={<PrivateRoute />}>
          <Route exact path="/quanly" element={<QuanlyPage />} />
        </Route> 

        <Route path="/quanly/donhang" element={<PrivateRoute />}>
          <Route exact path="/quanly/donhang" element={<DonHang />} />
        </Route>

        {/* Them San Pham */}
        <Route path="/sanpham/them" element={<PrivateRoute />}>
          <Route exact path="/sanpham/them" element={<ThemSanPham />} />
        </Route>
        
        
        {/* Them Bai Viet */}
        <Route path="/baiviet/them" element={<PrivateRoute />}>
          <Route exact path="/baiviet/them" element={<ThemBaiViet />} />
        </Route>

        {/* Edit Bai Viet */}
        <Route path="/baiviet/sua/:baivietId" element={<PrivateRoute />}>
          <Route exact path="/baiviet/sua/:baivietId" element={<ThemBaiViet />} />
        </Route>

        {/* Edit San Pham */}
        <Route path="/sanpham/sua/:sanphamId" element={<PrivateRoute />}>
          <Route exact path="/sanpham/sua/:sanphamId" element={<ThemSanPham />} />
        </Route>
      </Routes>
      <Footer menus={menus}/>
      </div>
    </AppContextProvider>
  );
}

export default App;
