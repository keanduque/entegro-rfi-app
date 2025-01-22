import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;
const StyledDashboardSkeleton2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap: 1rem;
  margin-bottom: 1rem;

  /* Responsive adjustments */

  @media (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr); /* 2 columns for small screens */
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* 1 column for extra small screens */
  }
`;

const StyledDashboardSkeleton = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto auto;
  gap: 1rem;
  margin-bottom: 1rem;

  /* Responsive adjustments */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); /* 3 columns for medium screens */
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for small screens */
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* 1 column for extra small screens */
  }
`;

const SkeletonBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;
  height: 98px;
`;

const ChartSkeleton = styled.div`
  height: 300px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

function DashboardSkeleton() {
  return (
    <>
      <StyledDashboardSkeleton>
        {[...Array(10)].map((_, index) => (
          <SkeletonBox key={index} />
        ))}
      </StyledDashboardSkeleton>
      <StyledDashboardSkeleton2>
        <ChartSkeleton />
        <ChartSkeleton />
      </StyledDashboardSkeleton2>
      <SkeletonBox height="500px" />
    </>
  );
}

export default DashboardSkeleton;
