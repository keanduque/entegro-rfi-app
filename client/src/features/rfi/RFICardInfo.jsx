import { IoWarning } from "react-icons/io5";

export function RFICardInfo({ label, rfi_field }) {
  return (
    <>
      <p>
        <strong>{label}</strong>
        {rfi_field !== null ? (
          rfi_field
        ) : (
          <>
            <IoWarning />
            <span>Not set</span>
          </>
        )}
      </p>
    </>
  );
}
