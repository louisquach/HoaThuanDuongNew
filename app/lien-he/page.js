import Separator from "@/components/Separator";
import LienHeSection from "@/components/TrangChu/LienHeSection";
import { SITE_NAME, PHONE, ADDRESS } from "@/lib/constants";

export const metadata = {
  title: "Liên Hệ",
  description: `Liên hệ Nhà thuốc đông y ${SITE_NAME}. Địa chỉ: ${ADDRESS}. Điện thoại: ${PHONE}. Gửi tin nhắn để được tư vấn miễn phí.`,
  openGraph: {
    title: `Liên Hệ | ${SITE_NAME}`,
    description: `Liên hệ tư vấn với ${SITE_NAME} - Điện thoại: ${PHONE}`,
  },
};

export default function LienHePage() {
  return (
    <div id="lienhe-page-container">
      <Separator title="Liên Hệ Tư Vấn" />
      <h3
        style={{
          textAlign: "center",
          paddingTop: "3rem",
          marginBottom: "-2rem",
          color: "teal",
        }}
      >
        Vui lòng gửi lại lời nhắn, chúng tôi sẽ liên hệ với bạn sớm nhất!
      </h3>
      <LienHeSection />
    </div>
  );
}
