/**
 * 遠距遊牧學院 - 設計規範 (Design Tokens)
 * Travel with Work Academy - Design Specification
 *
 * 此檔案定義整個網站的設計規範，確保視覺一致性
 * 應用到所有區塊時請參考此規範
 */

// ============================================
// 1. 色彩系統 (Color System)
// ============================================

export const colors = {
  // 主色 (Primary)
  primary: {
    deepTeal: "#17464F", // 深青色 - 主要背景、標題文字
    deepTealLight: "#1a525c", // 深青色淺 - hover 狀態
  },

  // 輔色 / 金色 (Accent / Gold)
  accent: {
    goldText: "#D4B483", // 柔和金 - 文字、副標題、Icons
    goldBright: "#E8C547", // 亮金色 - CTA 按鈕、裝飾框線
    goldFrame: "#D4AF37", // 框線金 - 圖片邊框、裝飾線條
  },

  // 背景色 (Background)
  background: {
    offWhite: "#F5F3ED", // 米白色 - 淺色區塊背景
    mistBlue: "#C9D7D4", // 霧藍色 - 卡片背景、裝飾
  },

  // 文字色 (Text)
  text: {
    dark: "#33393C", // 深灰 - 內文文字
    primary: "#17464F", // 深青 - 標題文字（淺色背景上）
    white: "#FFFFFF", // 白色 - 深色背景上的文字
    whiteSubtle: "rgba(255, 255, 255, 0.8)", // 白色80% - 副文字
    whiteMuted: "rgba(255, 255, 255, 0.6)", // 白色60% - 說明文字
  },

  // 點綴色 (Clay Accent)
  clay: {
    accent: "#A06E56", // 陶土色 - 小標籤、tag、icon 細節
  },
}

// ============================================
// 2. 字體系統 (Typography)
// ============================================

export const typography = {
  // 字體家族
  fontFamily: {
    sans: "Inter, ui-sans-serif, system-ui, sans-serif", // 中英文內文
    mono: "JetBrains Mono, ui-monospace, monospace", // 程式碼
  },

  // 字體大小 (響應式)
  fontSize: {
    // 主標題 H1
    h1: {
      mobile: "text-3xl", // 30px
      tablet: "sm:text-4xl", // 36px
      desktop: "lg:text-5xl", // 48px
    },
    // 區塊標題 H2
    h2: {
      mobile: "text-2xl", // 24px
      tablet: "sm:text-3xl", // 30px
      desktop: "lg:text-4xl", // 36px
    },
    // 卡片標題 H3
    h3: {
      mobile: "text-xl", // 20px
      desktop: "md:text-2xl", // 24px
    },
    // 副標題
    subtitle: {
      mobile: "text-sm", // 14px
      tablet: "sm:text-base", // 16px
    },
    // 內文
    body: {
      mobile: "text-base", // 16px
      tablet: "sm:text-lg", // 18px
    },
    // 小字
    small: "text-sm", // 14px
  },

  // 字重
  fontWeight: {
    normal: "font-normal", // 400
    medium: "font-medium", // 500
    semibold: "font-semibold", // 600
    bold: "font-bold", // 700
  },

  // 行高
  lineHeight: {
    tight: "leading-tight", // 1.25
    normal: "leading-normal", // 1.5
    relaxed: "leading-relaxed", // 1.625
  },

  // 字距
  letterSpacing: {
    wide: "tracking-wide", // 0.025em
  },
}

// ============================================
// 3. 間距系統 (Spacing)
// ============================================

export const spacing = {
  // Section 內距 (Padding)
  section: {
    py: "py-16 sm:py-24", // 垂直內距
    px: "px-4 sm:px-6 lg:px-8", // 水平內距
  },

  // 最大寬度
  maxWidth: {
    content: "max-w-5xl", // 內容區塊
    wide: "max-w-7xl", // 寬版區塊
  },

  // 元素間距
  gap: {
    xs: "gap-2", // 8px
    sm: "gap-3", // 12px
    md: "gap-4", // 16px
    lg: "gap-6", // 24px
    xl: "gap-8", // 32px
  },

  // 區塊間距
  margin: {
    sectionTitle: "mb-10 sm:mb-14", // 區塊標題下方
    cardGroup: "mb-8 sm:mb-12", // 卡片群組下方
  },
}

// ============================================
// 4. 元件樣式 (Component Styles)
// ============================================

export const components = {
  // 按鈕 (Buttons)
  button: {
    primary: {
      base: "bg-[#E8C547] hover:bg-[#D4B483] text-[#17464F] rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300",
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
      },
    },
    secondary: {
      base: "border border-white/40 text-white hover:bg-white/10 rounded-full font-medium transition-colors duration-200",
    },
    ghost: {
      base: "text-white/70 hover:text-[#D4B483] font-medium transition-colors duration-200",
    },
  },

  // 標籤 (Tags)
  tag: {
    outlined: "px-4 py-2 rounded-full border border-white/40 text-white text-sm font-medium",
    filled: "px-3 py-1 rounded-full bg-[#D4B483]/20 text-[#D4B483] text-sm font-medium",
  },

  // 卡片 (Cards)
  card: {
    light: "bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#C9D7D4]",
    dark: "bg-[#17464F] rounded-2xl p-6 sm:p-8",
    subtle: "bg-white/60 rounded-2xl p-6 sm:p-8 border border-[#C9D7D4]",
  },

  // Icons
  icon: {
    color: "text-[#D4B483]",
    size: {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    },
  },
}

// ============================================
// 5. 裝飾元素 (Decorative Elements)
// ============================================

export const decorations = {
  // 金色弧線 (背景裝飾)
  goldArcs: {
    large: "border border-[#E8C547]/30 rounded-full",
    medium: "border border-[#E8C547]/20 rounded-full",
    small: "border border-[#E8C547]/10 rounded-full",
  },

  // 圖片金框
  imageFrame: {
    outer: "border border-[#D4AF37]/25 rounded-2xl",
    inner: "border-2 border-[#D4AF37]/50 rounded-2xl",
    circle: "border-2 border-[#D4AF37]/40 rounded-full",
  },

  // 金色粒子 (底部裝飾)
  goldParticles: {
    base: "bg-[#E8C547] rounded-full animate-pulse",
    opacity: ["opacity-100", "opacity-80", "opacity-70", "opacity-60"],
    sizes: ["w-1 h-1", "w-1.5 h-1.5", "w-2 h-2"],
  },

  // 三點分隔符
  dotDivider: {
    pattern: `
      <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
      <span className="w-2 h-2 rounded-full bg-[#17464F]" />
      <span className="w-2 h-2 rounded-full bg-[#D4B483]" />
    `,
    className: "flex items-center justify-center gap-2",
  },

  // 左側強調線
  accentBorder: "border-l-4 border-[#D4B483] pl-5 sm:pl-6",
}

// ============================================
// 6. 動畫效果 (Animations)
// ============================================

export const animations = {
  // 基本過渡
  transition: {
    fast: "transition-all duration-200",
    normal: "transition-all duration-300",
    slow: "transition-all duration-500",
  },

  // Hover 效果
  hover: {
    lift: "hover:-translate-y-1 hover:shadow-lg",
    glow: "hover:shadow-xl",
    brighten: "hover:brightness-110",
  },

  // 脈動效果
  pulse: "animate-pulse",
}

// ============================================
// 7. 響應式斷點參考 (Breakpoints Reference)
// ============================================

export const breakpoints = {
  sm: "640px", // 平板直向
  md: "768px", // 平板橫向
  lg: "1024px", // 桌面
  xl: "1280px", // 大螢幕
  "2xl": "1536px", // 超大螢幕
}

// ============================================
// 8. 常用組合 (Utility Combinations)
// ============================================

export const utilities = {
  // 區塊標題組合
  sectionTitle: "text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17464F] mb-4 text-balance",

  // 深色區塊標題
  sectionTitleDark: "text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 text-balance",

  // 副標題組合
  subtitle: "text-sm sm:text-base text-[#D4B483] font-medium tracking-wide",

  // 內文組合
  bodyText: "text-base sm:text-lg text-[#33393C] leading-relaxed",

  // 深色背景內文
  bodyTextDark: "text-base sm:text-lg text-white/80 leading-relaxed",

  // 社會證明數字
  socialProofNumber: "text-[#D4B483] font-semibold",

  // 容器置中
  containerCenter: "mx-auto px-4 sm:px-6 lg:px-8",
}
