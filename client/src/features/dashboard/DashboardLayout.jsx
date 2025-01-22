import styled from "styled-components";
import Stats from "./Stats";
import DAChart from "./DAChart";
import { useRFIStats } from "./useRFIStats";
import ForecastStatusChart from "./ForecastStatusChart";
import StatusChart from "./StatusChart";
import DashboardSkeleton from "./DashboardSkeleton";

const StyledDashboardLayout = styled.div`
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

const StyledDashboardSecondLayout = styled.div`
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

function DashboardLayout() {
  const { rfis, isLoading } = useRFIStats();

  // 1) For RFI Count
  const rfiCurrentStatus = rfis?.filter(
    (rfi) => rfi.current_status === "5. Sent for Redesign"
  );

  // 2) For Assessment
  const rfiForAssessment = rfis?.filter(
    (rfi) => rfi.status_entegro === "11. For Assessment"
  );

  // 3) Awaiting Forecast
  const rfiAwaitingForecast = rfis?.filter(
    (rfi) =>
      rfi.status_entegro === "3. Awaiting Forecast" &&
      rfi.current_status === "5. Sent for Redesign"
  );
  // 4) In Progress
  const rfiInProgress = rfis?.filter(
    (rfi) =>
      rfi.status_entegro === "5. In Progress" &&
      rfi.current_status === "5. Sent for Redesign"
  );
  // 5) Returns
  const rfiReturns = rfis?.filter(
    (rfi) =>
      rfi.status_entegro === "7. Returned RFI" &&
      rfi.current_status === "5. Sent for Redesign"
  );

  // 6) On Hold
  const rfiOnHold = rfis?.filter(
    (rfi) =>
      rfi.status_entegro === "2. On Hold" &&
      rfi.current_status === "5. Sent for Redesign"
  );

  // 7) Missed It Date
  const rfiMissedItDate = rfis?.filter(
    (rfi) =>
      rfi.status_entegro === "4. Missed it date" &&
      rfi.current_status === "5. Sent for Redesign"
  );

  // 8) RMO
  const rfiRMO = rfis?.filter(
    (rfi) =>
      rfi.status_entegro === "10. RMO Required" &&
      rfi.current_status === "5. Sent for Redesign"
  );

  // 9) Handed Over
  const rfiHandedOver = rfis?.filter(
    (rfi) =>
      rfi.status_entegro === "1. Handed over" &&
      rfi.current_status === "5. Sent for Redesign"
  );

  // 10) Wayleave
  const rfiWayleave = rfis?.filter(
    (rfi) =>
      rfi.status_entegro === "8. Wayleave Required" &&
      rfi.current_status === "5. Sent for Redesign"
  );
  // 11) Survey
  const rfiSurvey = rfis?.filter(
    (rfi) =>
      rfi.status_entegro === "9. Survey Required" &&
      rfi.current_status === "5. Sent for Redesign"
  );

  if (isLoading) return <DashboardSkeleton />;

  const rfiCounts = {
    rfiCurrentStatus,
    rfiForAssessment,
    rfiAwaitingForecast,
    rfiInProgress,
    rfiReturns,
    rfiOnHold,
    rfiMissedItDate,
    rfiRMO,
    rfiHandedOver,
    rfiWayleave,
    rfiSurvey,
  };

  return (
    <>
      <StyledDashboardLayout>
        <Stats rfis={rfis} {...rfiCounts} />
      </StyledDashboardLayout>
      <StyledDashboardSecondLayout>
        <StatusChart rfis={rfis} />
        <ForecastStatusChart rfis={rfis} />
      </StyledDashboardSecondLayout>
      <DAChart rfis={rfis} />
    </>
  );
}

export default DashboardLayout;
