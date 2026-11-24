import type { CSSProperties } from "react";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 52 52"
      fill="none"
    >
      <path
        d="M26 2C28 18 34 24 50 26C34 28 28 34 26 50C24 34 18 28 2 26C18 24 24 18 26 2Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M26 17 35 26 26 35 17 26Z" fill="currentColor" opacity=".55" />
    </svg>
  );
}
export function SmallIcon({ kind }: { kind: string }) {
  const paths: Record<string, React.ReactNode> = {
    shape: (
      <>
        <path d="M8 34V17a12 12 0 0 1 24 0v17Z" />
        <path d="M14 34V18a6 6 0 0 1 12 0v16" />
      </>
    ),
    scent: (
      <>
        <path d="M12 34h18V19H12Z M16 19v-5h10v5M21 9c-6-5 4-4 0-9" />
        <path d="M17 25h8M17 29h8" />
      </>
    ),
    color: (
      <>
        <path d="M21 4S9 18 9 25a12 12 0 0 0 24 0c0-7-12-21-12-21Z" />
        <path d="M15 26a6 6 0 0 0 6 6" />
      </>
    ),
    pour: (
      <>
        <path d="m10 7 20 3-4 24H13ZM12 15l17 2M29 12c11-1 11 13-1 12M18 7V3" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 42 42"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[kind] || paths.shape}
    </svg>
  );
}

/** Abstract editorial art: never an approved product photograph. */
export function PouringArt({ compact = false }: { compact?: boolean }) {
  const prefix = compact ? "detail" : "hero";
  return (
    <svg
      className="pouring-art"
      role="img"
      aria-label="Illustration einer Hand, die Wachs aus einem Gefäß in eine Kerzenform gießt."
      viewBox="0 0 620 680"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${prefix}-paper`} x2="1" y2="1">
          <stop stopColor="#eedbd4" />
          <stop offset="1" stopColor="#ca998e" />
        </linearGradient>
        <linearGradient id={`${prefix}-wax`} x2="1">
          <stop stopColor="#fbefe6" />
          <stop offset="1" stopColor="#d8b6a5" />
        </linearGradient>
        <pattern
          id={`${prefix}-grain`}
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r=".6" fill="#fff" opacity=".13" />
        </pattern>
      </defs>
      <path fill={`url(#${prefix}-paper)`} d="M0 0h620v680H0z" />
      <circle cx="309" cy="282" r="218" fill="#f8e6dc" opacity=".64" />
      <path d="M0 500 620 411v269H0Z" fill="#ab776a" />
      <path d="M0 506 620 420" stroke="#996357" />
      <ellipse
        cx="330"
        cy="568"
        rx="159"
        ry="36"
        fill="#915f4d"
        opacity=".22"
      />
      <g transform="translate(28 12) rotate(-13 345 490)">
        <path d="M230 455h170v97c0 21-170 21-170 0Z" fill="#c99b81" />
        <ellipse cx="315" cy="454" rx="85" ry="24" fill="#ead3bd" />
        <ellipse cx="315" cy="455" rx="66" ry="15" fill="#ede2c7" />
        <path d="M315 455v-63" stroke="#624c3d" strokeWidth="2" />
        <path
          d="m266 430 101 6"
          stroke="#eee3ce"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M249 476v67M269 480v67M289 482v68M309 483v68M329 482v69M349 479v68M369 476v67M388 470v68"
          stroke="#9b6d51"
          strokeWidth="2"
          opacity=".6"
        />
      </g>
      <g transform="rotate(25 324 245)">
        <path
          d="M269 185c-3-13 73-14 79 0l-6 130c-1 24-75 24-77 0Z"
          fill={`url(#${prefix}-wax)`}
        />
        <path
          d="M348 202h19c40 0 32 88-21 78"
          fill="none"
          stroke="#dbd6c1"
          strokeWidth="14"
        />
        <ellipse cx="309" cy="185" rx="40" ry="12" fill="#f1ecd9" />
        <path d="m270 186-21 12 19 6" fill="#dbd5bf" />
        <path
          d="M279 214h12m-13 20h12m-13 20h12m-12 20h12m-12 20h12"
          stroke="#9b9e89"
          strokeWidth="2"
        />
      </g>
      <path
        d="M263 172c-15 34 7 67 17 92 14 36 20 61 20 100v58"
        fill="none"
        stroke="#f4e8c9"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="m620 161-130 42-59 28-51 1c-18 1-23-11-9-19l30-13-46 9c-19 3-24-11-7-20l48-17-44 6c-17 2-21-12-7-20l47-16 49 6 58-40L620 46Z"
        fill="#d49f7e"
        stroke="#80533e"
        strokeWidth="1.2"
      />
      <path d="m620 163-91 29-44-93L620 34" fill="#f1e8d6" />
      <path d="m529 192-44-93M542 187l-41-99" fill="none" stroke="#b8a792" />
      <path
        d="m0 624 94-30 71-53 42-19c16-8 25 3 12 14l-18 17 51-14c19-5 26 10 9 19l-28 14 38-7c18-4 25 10 8 18l-45 21-55 5-48 42L0 680Z"
        fill="#d9ab8c"
        stroke="#80533e"
        strokeWidth="1.2"
      />
      <path d="m0 614 74-23 49 66-22 23H0" fill="#704b3b" />
      <path d="m75 592 49 64M64 596l49 68" stroke="#9ba18b" />
      <g transform="translate(449 461) rotate(14)">
        <path d="M0 0h32v70c0 10-32 10-32 0Z" fill="#9a5e3f" />
        <ellipse cx="16" cy="0" rx="16" ry="5" fill="#533e30" />
        <path d="M8-28h16V0H8Z" fill="#d7c2a0" />
        <path d="M5 26h22v25H5Z" fill="#f1e4cc" />
      </g>
      <path d="m93 458 28-4 18 61-28 8Z" fill="#ddd0b1" />
      <path
        d="m109 457-27-82"
        stroke="#765946"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M105 478 82 414M116 487l5-59" stroke="#765946" strokeWidth="3" />
      <path
        d="M78 411c-26-5-32-25-21-32 18-7 28 16 21 32M89 431c23-7 31-24 20-30-16-8-25 12-20 30M80 388c-21-10-24-26-13-30 14-3 20 15 13 30"
        fill="#626d50"
      />
      <path fill={`url(#${prefix}-grain)`} d="M0 0h620v680H0z" />
      <path
        d="m100 142 12-19m-31 2 20 7m13 26 18 3"
        stroke="#f6ebd4"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WorldArt({ kind }: { kind: string }) {
  const palette: Record<string, CSSProperties> = {
    modern: { color: "#8b523a", backgroundColor: "#e7c8b0" },
    botanical: { color: "#53624c", backgroundColor: "#d9decf" },
    playful: { color: "#9b563f", backgroundColor: "#e8b9a3" },
    love: { color: "#9b6859", backgroundColor: "#ead9cc" },
    seasonal: { color: "#767550", backgroundColor: "#e1dec4" },
    statement: { color: "#e9d7bd", backgroundColor: "#6a6b56" },
  };
  return (
    <div
      className="world-art"
      style={palette[kind] || palette.modern}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 280 210"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        {kind === "modern" ? (
          <>
            <path d="M75 167V96a65 65 0 0 1 130 0v71Z" />
            <path d="M92 167V97a48 48 0 0 1 96 0v70M109 167V97a31 31 0 0 1 62 0v70M126 167V97a14 14 0 0 1 28 0v70" />
          </>
        ) : null}
        {kind === "botanical" ? (
          <>
            <path d="M142 176V87M142 133c-55 0-70-25-72-48 44-4 73 18 72 48ZM142 152c53-5 68-29 67-52-43 1-67 24-67 52Z" />
            <ellipse cx="142" cy="65" rx="16" ry="36" />
            <ellipse
              cx="142"
              cy="65"
              rx="16"
              ry="36"
              transform="rotate(60 142 65)"
            />
            <ellipse
              cx="142"
              cy="65"
              rx="16"
              ry="36"
              transform="rotate(120 142 65)"
            />
          </>
        ) : null}
        {kind === "playful" ? (
          <>
            <path d="M57 68c17-35 42-35 59 0s42 35 59 0 42-35 59 0M57 105c17-35 42-35 59 0s42 35 59 0 42-35 59 0M57 142c17-35 42-35 59 0s42 35 59 0 42-35 59 0" />
            <circle cx="91" cy="46" r="7" />
            <circle cx="205" cy="167" r="7" />
          </>
        ) : null}
        {kind === "love" ? (
          <>
            <path d="M140 167C18 91 94 14 140 75c46-61 122 16 0 92Z" />
            <path d="M140 145C56 91 105 45 140 96c35-51 84-5 0 49Z" />
          </>
        ) : null}
        {kind === "seasonal" ? (
          <path d="M140 30v150M65 105h150M87 52l106 106M87 158 193 52M124 46l16 16 16-16M80 89l16 16-16 16M200 89l-16 16 16 16M124 164l16-16 16 16" />
        ) : null}
        {kind === "statement" ? (
          <>
            <path d="m140 28 19 48 50-11-29 40 29 40-50-11-19 48-19-48-50 11 29-40-29-40 50 11Z" />
            <circle cx="140" cy="105" r="23" />
          </>
        ) : null}
      </svg>
    </div>
  );
}

export function MaterialArt({ kind }: { kind: "materials" | "together" }) {
  return (
    <svg
      role="img"
      aria-label={
        kind === "materials"
          ? "Abstrakte Illustration von Materialien auf einem Ateliertisch."
          : "Abstrakte Illustration von zwei Händen an einem Workshoptisch."
      }
      viewBox="0 0 550 440"
      fill="none"
    >
      <path
        fill={kind === "materials" ? "#d6d8c6" : "#e7ccae"}
        d="M0 0h550v440H0z"
      />
      <circle
        cx="275"
        cy="220"
        r="165"
        fill={kind === "materials" ? "#e7e8da" : "#ead7bd"}
      />
      {kind === "materials" ? (
        <>
          <ellipse
            cx="270"
            cy="300"
            rx="130"
            ry="35"
            fill="#a77c5d"
            opacity=".2"
          />
          <path d="M159 181h112v103c0 25-112 25-112 0Z" fill="#c89a7f" />
          <ellipse cx="215" cy="181" rx="56" ry="18" fill="#f6e8d5" />
          <path d="M215 183v-37m-29 17h60" stroke="#645540" strokeWidth="3" />
          <path d="M313 175h56v117c0 16-56 16-56 0Z" fill="#a9754e" />
          <ellipse cx="341" cy="175" rx="28" ry="8" fill="#5e4935" />
          <path d="M327 145h28v31h-28Z" fill="#d7c19a" />
          <path d="M324 220h35v40h-35Z" fill="#f2e9d6" />
          <path
            d="m117 302 34-23M130 312l34-23M143 322l34-23"
            stroke="#a88f70"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M402 108c-50 32-34 59-71 76M369 144c-39-4-38-25-31-29 20-10 32 9 31 29M382 131c24-1 32-22 25-28-15-9-29 9-25 28"
            stroke="#62704e"
            strokeWidth="2"
          />
        </>
      ) : (
        <>
          <ellipse
            cx="275"
            cy="260"
            rx="96"
            ry="42"
            fill="#bc8c6b"
            opacity=".22"
          />
          <path d="M208 202h134v90c0 27-134 27-134 0Z" fill="#c19173" />
          <ellipse cx="275" cy="202" rx="67" ry="22" fill="#ede0bd" />
          <path d="M275 203v-48M240 184h74" stroke="#6b593f" strokeWidth="3" />
          <path
            d="m0 112 127 25 55 27 27 30c10 13-2 23-13 13l-23-19-21 2 31 23c16 11 6 24-7 17l-47-30-40-13L0 181"
            fill="#d6a584"
            stroke="#9a6f51"
          />
          <path
            d="m550 322-116-23-48-29-34-23c-17-11-26 2-10 14l19 18-46-15c-18-5-23 10-8 17l56 30 39 3 49 40 99 42"
            fill="#b97d5f"
            stroke="#85563f"
          />
          <path d="m0 102 80 16-16 81L0 184" fill="#82604a" />
          <path d="m550 318-81-17-28 61 109 41" fill="#efe5d0" />
        </>
      )}
      <path d="m440 58 4 24m-16-10 24-4" stroke="#f6eedb" strokeWidth="2" />
    </svg>
  );
}
