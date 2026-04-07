"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume, faGlobe, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { useAppContext } from "./AppContextProvider";
import { googleSignOut } from "@/lib/firebase-client";
import Image from "next/image";

export default function Header({ menus }) {
  const [activeTab, setActiveTab] = useState("/");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const context = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) {
      setActiveTab(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignout = () => {
    router.push("/");
    googleSignOut();
    context.logout();
  };

  return (
    <header className="header-container">
      <div className="header">
        <div className="social-contact">
          <div className="header-phone-box">
            <FontAwesomeIcon
              className="header-icon"
              icon={faPhoneVolume}
              style={{ color: "#dd9933", fontSize: "1.3em", marginRight: ".5rem" }}
            />
            <span className="header-text">
              Liên hệ: <a href="tel:0937271186" style={{ color: "inherit" }}>0937271186</a>
            </span>
          </div>
          <div className="header-social-box">
            <FontAwesomeIcon
              className="header-globe-icon"
              icon={faGlobe}
              style={{ color: "teal", fontSize: "1.3em", marginRight: ".5rem" }}
            />
            <span className="header-globe-icon" style={{ marginRight: "1rem" }}>
              Mạng xã hội
            </span>
            <a href="https://facebook.com/hoathuanduong" aria-label="Facebook" rel="noopener noreferrer" target="_blank">
              <FontAwesomeIcon icon={faFacebookF} className="header-icon" />
            </a>
            <span className="vertical-divider"></span>
            <a href="https://zalo.me/0937271186" aria-label="Zalo" rel="noopener noreferrer" target="_blank">
              <Image src="/images/zalo.png" alt="Zalo" className="zalo" width={20} height={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="header-main">
        <Link href="/" className="header-main-intro">
          <Image
            className="header-logo"
            src="/images/hoa-thuan-duong-logo.png"
            alt="Logo Hoà Thuận Đường"
            width={88}
            height={88}
            priority
          />
          <div>
            <h2 className="header-h4">Nhà Thuốc - Phòng Chẩn Trị Đông Y</h2>
            <h1 className="header-h1">Hoà Thuận Đường</h1>
          </div>
        </Link>
        <nav className="header-main-nav" aria-label="Menu chính">
          {menus.map((item) => {
            if (item.isDropdown) {
              return (
                <div
                  key={item.name}
                  className={`header-dropdown ${activeTab.startsWith(item.path) ? "active" : ""}`}
                  ref={dropdownRef}
                >
                  <button
                    className={
                      activeTab.startsWith(item.path)
                        ? "header-menu-item active header-dropdown-trigger"
                        : "header-menu-item header-dropdown-trigger"
                    }
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    {item.name} <span className="dropdown-arrow">▾</span>
                  </button>
                  {dropdownOpen && (
                    <div className="header-dropdown-menu">
                      <Link
                        href="/san-pham/thuoc"
                        className="header-dropdown-menu-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Image
                          src="/images/hoa-thuan-duong-logo.png"
                          alt=""
                          className="sub-menu-icon"
                          width={28}
                          height={28}
                        />
                        Thuốc Lưu Hành Nội Bộ
                      </Link>
                      <Link
                        href="/san-pham/thuc-pham-chuc-nang"
                        className="header-dropdown-menu-item"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Image
                          src="/images/hoa-thuan-duong-logo.png"
                          alt=""
                          className="sub-menu-icon"
                          width={28}
                          height={28}
                        />
                        Thực Phẩm Chức Năng
                      </Link>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                href={item.path}
                className={activeTab === item.path ? "header-menu-item active" : "header-menu-item"}
                key={item.path}
              >
                {item.name}
              </Link>
            );
          })}
          {context.logged && (
            <>
              <Link
                href="/quanly"
                className={activeTab === "/quanly" ? "header-menu-item active" : "header-menu-item"}
              >
                Quản Lý
              </Link>
              <button className="sign-off-btn" onClick={handleSignout} aria-label="Đăng xuất">
                <FontAwesomeIcon icon={faPowerOff} />
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
