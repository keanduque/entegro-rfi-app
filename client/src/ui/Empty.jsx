import styled from "styled-components";

const ParagEmpty = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

function Empty({ dataName }) {
  return <ParagEmpty>No {dataName} could be found.</ParagEmpty>;
}

export default Empty;
