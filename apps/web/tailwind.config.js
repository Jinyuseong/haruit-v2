// tailwind.config.js
import daisyui from "daisyui"

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        app: {
          "primary": "#5B8DEF",      // 메인 포인트
          "secondary": "#6EE7B7",
          "accent": "#FBBF24",
          "neutral": "#1F2937",
          "base-100": "#FFFFFF",
          "base-200": "#F6F7FB",
          "base-300": "#E5E7EB",
          "info": "#60A5FA",
          "success": "#34D399",
          "warning": "#F59E0B",
          "error": "#F87171",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.9rem",
          "--animation-btn": "0",     // 앱처럼 튐 없는 버튼
          "--btn-text-case": "none",  // 대문자 변환 끄기
        },
      },
      "light", // 백업 테마
    ],
  },
}