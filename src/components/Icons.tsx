import React from 'react';

export function BackArrowIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M19 12H5M5 12L11.5 5.5M5 12L11.5 18.5"
        stroke="#EE4D2D"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LocationPinIcon({ className = 'w-[17px] h-[17px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
        fill="#EE4D2D"
      />
    </svg>
  );
}

export function StoreIcon({ className = 'w-[17px] h-[17px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3.5 9.5V19.5C3.5 20.05 3.95 20.5 4.5 20.5H19.5C20.05 20.5 20.5 20.05 20.5 19.5V9.5"
        stroke="#222222"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 6.5L4.2 3.5H19.8L21.5 6.5V8.2C21.5 9.47 20.47 10.5 19.2 10.5C18.14 10.5 17.24 9.78 16.98 8.79C16.72 9.78 15.82 10.5 14.76 10.5C13.7 10.5 12.8 9.78 12.54 8.79C12.28 9.78 11.38 10.5 10.32 10.5C9.26 10.5 8.36 9.78 8.1 8.79C7.84 9.78 6.94 10.5 5.88 10.5C4.61 10.5 3.5 9.47 3.5 8.2V6.5H2.5Z"
        stroke="#222222"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 20.5V14.5H14.5V20.5"
        stroke="#222222"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckCornerRibbon({ className = 'w-[22px] h-[22px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M0 0H24L0 24V0Z" fill="#26AA99" />
      <path
        d="M3.5 7.5L5.7 9.7L10 5"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExpressTruckIcon({ className = 'w-[18px] h-[14px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 18" fill="none" className={className} aria-hidden="true">
      <path d="M1 5H6M2 8.5H5.5M1 12H4.5" stroke="#26AA99" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M7 3.5H15.5V12.5H7V3.5Z"
        fill="#26AA99"
        stroke="#26AA99"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M15.5 6.5H19.5L22 9.5V12.5H15.5V6.5Z"
        fill="#26AA99"
        stroke="#26AA99"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="14" r="2.1" fill="#FFFFFF" stroke="#26AA99" strokeWidth="1.4" />
      <circle cx="18.5" cy="14" r="2.1" fill="#FFFFFF" stroke="#26AA99" strokeWidth="1.4" />
    </svg>
  );
}

export function VoucherTicketIcon({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 7.5C3 6.67 3.67 6 4.5 6H19.5C20.33 6 21 6.67 21 7.5V10C19.9 10 19 10.9 19 12C19 13.1 19.9 14 21 14V16.5C21 17.33 20.33 18 19.5 18H4.5C3.67 18 3 17.33 3 16.5V14C4.1 14 5 13.1 5 12C5 10.9 4.1 10 3 10V7.5Z"
        stroke="#EE4D2D"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 9V15M13.5 10.2H16M13.5 13.8H16"
        stroke="#EE4D2D"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CoinShopeeIcon({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" stroke="#EDA519" strokeWidth="1.6" fill="#FFFDF6" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="#EDA519"
        fontSize="12.5"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        S
      </text>
    </svg>
  );
}

export function CodBadgeIcon({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="3" fill="#EE4D2D" />
      <text
        x="12"
        y="15"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="8.8"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        Rp
      </text>
    </svg>
  );
}

export function SPayLaterIcon({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect
        x="2.5"
        y="5.5"
        width="19"
        height="13.5"
        rx="2.5"
        stroke="#EE4D2D"
        strokeWidth="1.5"
      />
      <path
        d="M15.5 10.2H21.5V14.3H15.5C14.4 14.3 13.5 13.4 13.5 12.25C13.5 11.1 14.4 10.2 15.5 10.2Z"
        stroke="#EE4D2D"
        strokeWidth="1.4"
        fill="#FFF5F2"
      />
      <text
        x="8.2"
        y="14.5"
        textAnchor="middle"
        fill="#EE4D2D"
        fontSize="7.2"
        fontWeight="700"
        fontFamily="sans-serif"
      >
        Rp
      </text>
    </svg>
  );
}

export function HelpQuestionIcon({ className = 'w-[13px] h-[13px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <circle cx="10" cy="10" r="8.2" stroke="#999999" strokeWidth="1.3" />
      <path
        d="M8 7.8C8 6.8 8.9 6 10 6C11.1 6 12 6.8 12 7.8C12 8.6 11.4 9.1 10.7 9.5C10.2 9.8 10 10.2 10 10.8V11.2"
        stroke="#999999"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="10" cy="13.8" r="0.85" fill="#999999" />
    </svg>
  );
}
