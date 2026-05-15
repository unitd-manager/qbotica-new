// src/components/Icons.jsx
import React from "react";

/* ---------- Arrow Right ---------- */
export const ArrowRight = React.forwardRef(function ArrowRight(props, ref) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 17 17"
      width="1em"
      height="1em"
      fill="none"
      {...props}
    >
      <path
        d="M6.5 12.5333L10.5 8.53333L6.5 4.53332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export const ArrowLeft = React.forwardRef(function ArrowRight(props, ref) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15" fill="none">
  <path d="M5 4L1.5 7.5L5 11" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  );
});

export const ArrowLeftWhite = React.forwardRef(function ArrowRight(props, ref) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 15 15" fill="none">
  <path d="M5 4L1.5 7.5L5 11" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  );
});

export const ArrowNavRight = React.forwardRef(function ArrowRight(props, ref) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path d="M11.25 22.5L18.75 15L11.25 7.5" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});

export const ArrowNavLeft = React.forwardRef(function ArrowRight(props, ref) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path d="M18.75 7.5L11.25 15L18.75 22.5" stroke="white"  strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
});


export const ArrowDown = React.forwardRef(function ArrowRight(props, ref) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
  <path d="M1 1L6 6L11 1" stroke="black" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  );
});

export const ArrowUp = React.forwardRef(function ArrowUp(props, ref) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      ref={ref}
      {...props}
    >
      <path
        d="M1 6L6 1L11 6"
        stroke="black"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export const LiIcon = React.forwardRef(function ArrowUp(props, ref) {
  return (
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <circle cx="9" cy="9" r="5" fill="#FF7705"/>
  <circle cx="9" cy="9" r="7" stroke="#FF7705" strokeOpacity="0.3" strokeWidth="4"/>
</svg>
  );
});

/* ---------- Instagram ---------- */
export const Instagram = React.forwardRef(function Instagram(props, ref) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      {...props}
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="18" cy="6" r="1.5" fill="currentColor" />
    </svg>
  );
});

/* ---------- LinkedIn ---------- */
export const Linkedin = React.forwardRef(function Linkedin(props, ref) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      {...props}
    >
      <path
        d="M4.98 3.5A2.49 2.49 0 1 1 4.98 8.48 2.49 2.49 0 0 1 4.98 3.5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M2.5 9H7.5V21H2.5V9Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M10 9H14.5V11.8C15.4 10.3 17 9 19.5 9C23 9 24 11.3 24 15.2V21H19V15.7C19 14 18.5 13 17 13C15.5 13 14.5 14 14.5 15.7V21H10V9Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
});

/* ---------- X / Twitter ---------- */
export  const XLogo = React.forwardRef(function XLogo(props, ref) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      {...props}
    >
      <path
        d="M3 3L21 21M21 3L3 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export const VisionBolt = React.forwardRef(function VisionBolt(props, ref) {
  return (
    <svg ref={ref} viewBox="0 0 24 24" width="1em" height="1em" fill="none" {...props}>
      <path
        d="M13 2L4 14h7l-1 8 10-14h-7l0-6z"
        fill="currentColor"
      />
    </svg>
  );
});

export const VisionShield = React.forwardRef(function VisionShield(props, ref) {
  return (
    <svg ref={ref} viewBox="0 0 24 24" width="1em" height="1em" fill="none" {...props}>
      <path
        d="M12 2l8 4v6c0 5.25-3.438 9.813-8 10-4.563-.187-8-4.75-8-10V6l8-4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export const VisionBook = React.forwardRef(function VisionBook(props, ref) {
  return (
    <svg ref={ref} viewBox="0 0 24 24" width="1em" height="1em" fill="none" {...props}>
      <path
        d="M6 4h10a2 2 0 0 1 2 2v14a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2V6a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
});

export const VisionScale = React.forwardRef(function VisionScale(props, ref) {
  return (
    <svg ref={ref} viewBox="0 0 24 24" width="1em" height="1em" fill="none" {...props}>
      <path
        d="M12 3v18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 7h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 7l-3 6a4 4 0 0 0 8 0L9 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M17 7l-2 6a4 4 0 0 0 8 0l-3-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
});

export const VisionEye = React.forwardRef(function VisionEye(props, ref) {
  return (
    <svg ref={ref} viewBox="0 0 24 24" width="1em" height="1em" fill="none" {...props}>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
});

