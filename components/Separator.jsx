import Image from "next/image";

export default function Separator({ title }) {
  return (
    <>
      <h2 className="section-header">{title}</h2>
      <div className="section-separator">
        <div style={{ padding: "0 1rem", backgroundColor: "white" }}>
          <Image src="/images/hoa-thuan-duong-logo.png" alt="Hoà Thuận Đường" width={40} height={40} />
        </div>
      </div>
    </>
  );
}
