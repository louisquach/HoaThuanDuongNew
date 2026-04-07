import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "5rem 2rem", minHeight: "60vh" }}>
      <h1 style={{ fontSize: "3rem", color: "teal" }}>404</h1>
      <h2>Trang không tìm thấy</h2>
      <p>Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.</p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          marginTop: "2rem",
          padding: "1rem 2rem",
          backgroundColor: "teal",
          color: "white",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Về Trang Chủ
      </Link>
    </div>
  );
}
