import styled from "styled-components";

const Textarea = styled.textarea`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 15rem;
  height: ${(props) =>
    props.$form_type === "wayleave_form" ? "13.7rem" : "15rem"};
`;
// Add defaultProps
Textarea.defaultProps = {
  $form_type: "default", // Default type if none is provided
};

export default Textarea;
