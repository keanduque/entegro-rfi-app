import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useRFIForDetail } from "./useRFIForDetail";
import Spinner from "../../ui/Spinner";
import { TiArrowBackOutline } from "react-icons/ti";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function RFIDetail() {
  const { rfi, isLoading } = useRFIForDetail();

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">RFI Reference #{rfi.id}</Heading>
          <Tag>{rfi.current_status}</Tag>
        </HeadingGroup>
      </Row>
      <Row>
        <div>{rfi.description_of_works}</div>
      </Row>
      {/* 
      <BookingDataBox booking={booking} /> */}
      <Row>
        <ButtonGroup>
          <Button $size="medium" onClick={moveBack} title="Go Back to RFI List">
            <TiArrowBackOutline />
          </Button>
        </ButtonGroup>
      </Row>
    </>
  );
}

export default RFIDetail;
