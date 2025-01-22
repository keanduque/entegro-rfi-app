import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { FaCalendarAlt } from "react-icons/fa";

// Styled container to control parent dimensions
const StyledDatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensures it inherits parent height */
  max-height: 193px; /* Set a maximum height constraint */
  overflow: hidden; /* Prevent content overflow */
`;

// Updated DatePicker styling
const StyledDatePicker = styled(DatePicker)`
  .react-date-picker__wrapper {
    border: 1px solid var(--color-grey-300);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-sm);
    padding: 0.3rem 0.5rem;
    box-shadow: inset var(--shadow-sm);
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    height: 100%; /* Ensure it uses the full available height */
    max-height: 193px; /* Ensure calendar fits the constraint */
    overflow: auto; /* Enable scrolling if content overflows */
  }

  .react-date-picker__inputGroup {
    display: flex;
    gap: 0.2rem;
    height: 100%; /* Ensure input group respects height */
  }

  .react-date-picker__inputGroup__input {
    border: none;
    outline: none;
    font-size: 1.1rem;
    background: transparent;
    height: 100%; /* Ensure input respects height */
  }

  .react-date-picker__clear-button,
  .react-date-picker__calendar-button {
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    font-size: 1.2rem;
    color: inherit;
    height: 100%; /* Ensure buttons align with input height */
  }

  .react-date-picker__clear-button svg,
  .react-date-picker__calendar-button svg {
    height: 1rem;
    width: 1rem;
  }
`;

export default function StyledDatePickerComponent({
  value,
  onChange,
  disabled,
}) {
  return (
    <StyledDatePickerContainer>
      <StyledDatePicker
        value={value || ""}
        onChange={(date) => onChange(date || null)} // Ensure null on clear
        format="dd/MM/yyyy"
        calendarIcon={<FaCalendarAlt />}
        clearIcon={null}
        disabled={disabled}
      />
    </StyledDatePickerContainer>
  );
}
