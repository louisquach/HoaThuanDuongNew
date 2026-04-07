import Separator from "@/components/Separator";
import GioiThieuSection from "@/components/TrangChu/GioiThieuSection";
import SanPhamSection from "@/components/TrangChu/SanPhamSection";
import TinNoiBatSection from "@/components/TrangChu/TinNoiBatSection";
import BangKhen from "@/components/TrangChu/Carousel";
import LienHeSection from "@/components/TrangChu/LienHeSection";
export default function TrangChu() {
  return (
    <div id="trangchu-container">

      <Separator title="Giới Thiệu" />
      <GioiThieuSection />

      <Separator title="Tin Tức - Bài Viết" />
      <TinNoiBatSection />

      <Separator title="Sản Phẩm Nổi Bật" />
      <SanPhamSection />

      <Separator title="Chứng Nhận - Bằng Khen" />
      <BangKhen />

      <Separator title="Liên Hệ Tư Vấn" />
      <LienHeSection />
    </div>
  );
}
