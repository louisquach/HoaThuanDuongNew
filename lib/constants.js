export const SITE_NAME = "Hoà Thuận Đường";
export const SITE_DESCRIPTION =
  "Nhà thuốc đông y - Y học cổ truyền - Phòng Chẩn trị y học cổ truyền Hoà Thuận Đường. Chuyên chẩn đoán điều trị và bốc thuốc đông y gia truyền.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hoathuanduong.com";
export const PHONE = "0937271186";
export const EMAIL = "dongy.hoathuanduong@gmail.com";
export const ADDRESS = "70 K2 Ấp Tân Phong, Xã Xuân Tân, Long Khánh, Đồng Nai";
export const FACEBOOK_URL = "https://facebook.com/hoathuanduong";
export const ZALO_URL = "https://zalo.me/0937271186";
export const MESSENGER_URL = "https://m.me/hoathuanduong";

export const menus = [
  { path: "/", name: "Trang Chủ", isDropdown: false },
  { path: "/gioi-thieu", name: "Giới Thiệu", isDropdown: false },
  { path: "/san-pham", name: "Sản Phẩm", isDropdown: true },
  { path: "/tintuc-baiviet", name: "Bài Viết", isDropdown: false },
  { path: "/lien-he", name: "Liên Hệ", isDropdown: false },
];
