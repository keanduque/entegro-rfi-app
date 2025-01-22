import styled from "styled-components";
import { media } from "../styles/MediaQueries";

const StyledSelect = styled.select`
  font-size: 1.2rem;
  padding: 0.6rem 1rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-300)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-50);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  width: 100%;

  @media screen and (min-width: ${media.lg}) {
    width: 250px;
  }
`;

export const StyledSelectForm = styled.select.withConfig({
  shouldForwardProp: (prop) => prop !== "bgColor", // Prevent 'bgColor' from being passed to the DOM element
})`
  font-size: 1rem;
  padding: 0.3rem 0.5rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-300)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: ${(props) => props.bgColor || "var(--color-grey-50)"};
  color: ${(props) =>
    props.bgColor === "red"
      ? "var(--color-grey-0) !important"
      : "var(--color-grey-700)"};
  font-weight: 500;
  box-shadow: var(--shadow-sm);

  ${(props) => (props.type === "yes-no-option" ? "width: 50%" : "width: 100%")}

  transition: background-color 0.3s ease;
`;

export const DivSelect = styled.div`
  position: relative;
  @media screen and (max-width: ${media.md}) {
    width: 100%;
  }
`;
export const Label = styled.label`
  color: var(--color-entegro-900);
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.4375em;
  display: block;
  transform-origin: left top;
  text-overflow: ellipsis;
  max-width: calc(133% - 32px);
  position: absolute;
  left: 0px;
  top: 0px;
  transform: translate(14px, -6px) scale(0.75);
  z-index: 1;
  background-color: var(--color-grey-50);
  &:focus {
    background-color: var(--color-grey-50);
  }
`;

function Select({ options, value, onChange, ...props }) {
  return (
    <StyledSelect value={value ?? ""} onChange={onChange} {...props}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
