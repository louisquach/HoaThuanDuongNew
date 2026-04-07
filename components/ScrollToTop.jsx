"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { ZALO_URL, MESSENGER_URL } from "@/lib/constants";

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="floating-buttons">
      <a
        href={ZALO_URL}
        className="floating-btn floating-zalo"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Zalo"
        title="Chat Zalo"
      >
        <span className="floating-zalo-text">Zalo</span>
      </a>

      <a
        href={MESSENGER_URL}
        className="floating-btn floating-messenger"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat Messenger"
        title="Chat Messenger"
      >
        <FontAwesomeIcon icon={faCommentDots} />
      </a>

      {showScroll && (
        <button
          className="floating-btn floating-scroll-top"
          onClick={goTop}
          aria-label="Lên đầu trang"
          title="Lên đầu trang"
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
    </div>
  );
}
