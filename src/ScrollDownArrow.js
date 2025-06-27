import React from "react";

const ScrollDownArrow = ({
  targetSection,
  color = "#111827",
  size = "medium",
}) => {
  const handleClick = () => {
    if (targetSection) {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // Scroll ke section berikutnya
      window.scrollBy({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  const sizes = {
    small: { width: 24, height: 24, strokeWidth: 2 },
    medium: { width: 32, height: 32, strokeWidth: 2.5 },
    large: { width: 40, height: 40, strokeWidth: 3 },
  };

  const currentSize = sizes[size] || sizes.medium;

  return (
    <div
      onClick={handleClick}
      style={{
        position: "absolute",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        cursor: "pointer",
        zIndex: 10,
        padding: "10px",
        borderRadius: "50%",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        animation: "float 3s ease-in-out infinite",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
        e.target.style.transform = "translateX(-50%) scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
        e.target.style.transform = "translateX(-50%) scale(1)";
      }}
    >
      {/* Modern Arrow Down Icon */}
      <svg
        width={currentSize.width}
        height={currentSize.height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={currentSize.strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          display: "block",
          animation: "bounce 2s ease-in-out infinite",
        }}
      >
        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
      </svg>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateX(-50%) translateY(0px);
          }
          50% {
            transform: translateX(-50%) translateY(-8px);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-4px);
          }
          60% {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollDownArrow;
