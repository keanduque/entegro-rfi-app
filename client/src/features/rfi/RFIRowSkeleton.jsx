import React from "react";
import styled from "styled-components";
import { RFICard, RFICardStack, RFICardStackContent } from "./RFIRow";

const SkeletonBox = styled.div`
  background-color: var(--color-grey-100);
  border-radius: 4px;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "20px"};
`;

const RFIRowSkeleton = () => (
  <RFICard>
    <RFICardStack type="card-container-left">
      <RFICardStackContent>
        {/* Placeholder for status */}
        <SkeletonBox width="120px" height="25px" />
        {/* Placeholder for DA */}
        <SkeletonBox width="150px" height="20px" />
        <hr />
        {/* Placeholder for Ribbon */}
        <SkeletonBox width="30px" height="20px" />
      </RFICardStackContent>
      <RFICardStackContent>
        <SkeletonBox width="80px" height="20px" />
        <SkeletonBox width="80px" height="20px" />
        <SkeletonBox width="80px" height="20px" />
      </RFICardStackContent>
      <RFICardStackContent type="card-stack-full">
        <div>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonBox
              key={index}
              width="100%"
              height="20px"
              style={{ marginBottom: "10px" }}
            />
          ))}
        </div>
      </RFICardStackContent>
      <RFICardStackContent>
        <SkeletonBox width="100%" height="50px" />
        {/* Placeholder for description */}
      </RFICardStackContent>
    </RFICardStack>

    <RFICardStack type="card-container-right">
      <SkeletonBox width="100px" height="20px" />
      {/* Placeholder for RFI Ref */}
      <SkeletonBox width="80px" height="25px" />
      {/* Placeholder for priority */}
      <SkeletonBox width="60px" height="25px" />
    </RFICardStack>
  </RFICard>
);

export default RFIRowSkeleton;
