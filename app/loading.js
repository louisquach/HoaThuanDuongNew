export default function Loading() {
  return (
    <div id="loader-container">
      <div className="loader-spinner" aria-label="Đang tải..." role="status">
        <div className="dot-pulse">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  );
}
