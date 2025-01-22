import { css } from "styled-components";

export const getColorStatus = (status) => {
  switch (status) {
    case 1:
      return "#f4511e"; // Build Review
    case 2:
      return "#7e57c2"; // PSDP notified
    case 3:
      return "#ba57c3"; // PSDP Approved
    case 4:
      return "#ab47bc"; // Design Review
    case 5:
      return "#8e24aa"; // Sent for Redesign
    case 6:
      return "#7b1fa2"; // Design Complete
    case 7:
      return "#aa00ff"; // Design Approved
    case 8:
      return "#1976d2"; // Build Approved, Commercial Review
    case 9:
      return "#2962ff"; // Commercial Approved
    case 10:
      return "var(--color-red-pure)"; // Rejected
    case 11:
      return "var(--color-green-pure)"; // Complete
    default:
      return "var(--color-grey-700)"; // Default (grey)
  }
};
export const priorities = {
  primary: css`
    color: rgb(27, 27, 31);
    background-color: rgba(0, 0, 0, 0.08);
  `,
  Hi: css`
    color: var(--color-grey-0);
    background-color: var(--color-red-pure);
  `,
  Low: css`
    color: rgb(27, 27, 31);
    background-color: rgba(0, 0, 0, 0.08);
  `,
};

export const fieldColors = {
  normCol: css`
    background-color: transparent;
    border-radius: 10px;
  `,
  skyCol: css`
    background-color: var(--color-sky-100);
    color: var(--color-grey-0);
    border-radius: 10px;
  `,
  warmCol: css`
    background-color: var(--color-yellow-200);
    border-radius: 10px;
  `,
  yellowCol: css`
    background-color: var(--color-yellow-pure);
    border-radius: 10px;
  `,
  greyCol: css`
    background-color: var(--color-grey-200);
    border-radius: 10px;
  `,
  darkBlCol: css`
    background-color: var(--color-blue-900);
    color: var(--color-grey-0);
    border-radius: 10px;
  `,
  oranCol: css`
    background-color: var(--color-orange-700);
    color: var(--color-grey-0);
    border-radius: 10px;
  `,
  fleshCol: css`
    background-color: var(--color-flesh-100);
    color: var(--color-grey-0);
    border-radius: 10px;
  `,
};

export const wayleaveStatus = (status) => {
  switch (status) {
    case "Wayleave Required":
      return "var(--color-grey-500)";
    case "Refused":
      return "var(--color-red-pure)";
    case "Consented":
      return "var(--color-green-700)";
    case "Engaged":
      return "var(--color-orange-700)";
    case "Leaflet Drop":
      return "var(--color-yellow-pure)";
    default:
      return "var(--color-grey-700)"; // Default color
  }
};
