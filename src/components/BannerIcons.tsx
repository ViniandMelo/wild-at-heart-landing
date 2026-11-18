import React from 'react';

export const PrismGlobeIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer globe circle */}
    <circle cx="18" cy="19" r="12.5" fill="#FFFFFF" />
    {/* Continents / cutout negative space to match reference globe mark */}
    <path
      d="M12.5 11.5C14.2 10.3 16.5 10.6 17.5 12.1C18.3 13.3 17.2 14.8 15.8 15.3C14.4 15.8 13.8 17.2 14.4 18.4C15.1 19.7 13.9 21.4 12.2 21.1C10.5 20.8 9.2 19.1 9.5 17.1C9.8 15.1 10.9 12.6 12.5 11.5Z"
      fill="#000000"
    />
    <path
      d="M22.2 13.2C24.1 13.4 26.2 14.9 26.9 17.1C27.6 19.2 26.8 22.1 25.1 23.6C23.7 24.8 21.8 24.4 21.3 22.8C20.8 21.2 21.9 19.6 20.9 18.2C19.8 16.7 20.2 13.0 22.2 13.2Z"
      fill="#000000"
    />
    {/* Sweeping orbital airplane silhouette */}
    <path
      d="M5.2 27.6C8.6 24.4 13.8 20.6 19.8 16.8L17.9 12.2L20.1 11.3L23.5 14.8L27.9 12.3C29.1 11.6 30.4 12.0 30.8 12.8C31.2 13.6 30.7 14.8 29.4 15.6L25.0 18.1L25.6 22.9L23.4 24.0L21.3 19.6C16.2 22.7 10.8 26.2 6.8 29.2L5.2 27.6Z"
      fill="#FFFFFF"
      stroke="#000000"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    {/* Small pin dot top-right of globe */}
    <circle cx="24" cy="7.5" r="2.2" fill="#000000" stroke="#FFFFFF" strokeWidth="1.4" />
  </svg>
);

export const SpotCompassIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M12 3v4M12 17v4M4.2 7.5l3.5 2M16.3 14.5l3.5 2M4.2 16.5l3.5-2M16.3 9.5l3.5-2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const SpotUsersIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="3.5" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a3.5 3.5 0 0 1 0 6.74" />
  </svg>
);

export const SpotNodesIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <circle cx="18" cy="5" r="2.5" />
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="19" r="2.5" />
    <path d="M8.3 10.8l7.4-4.6M8.3 13.2l7.4 4.6" />
  </svg>
);

export const SpotPinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);
