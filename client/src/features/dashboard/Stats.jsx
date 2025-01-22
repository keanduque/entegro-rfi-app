import Stat from "./Stat";
import { TbFileInfo } from "react-icons/tb";
import { MdOutlineHandshake } from "react-icons/md";
import { RiSurveyLine } from "react-icons/ri";
import { MdOutlineAssessment } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { MdOutlineBackHand } from "react-icons/md";
import { RiProgress5Line } from "react-icons/ri";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { PiHandDepositLight } from "react-icons/pi";
import { MdOutlineManageAccounts } from "react-icons/md";

function Stats({
  rfis,
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
}) {
  const currentStatus = rfiCurrentStatus.length;
  const forAssessment = rfiForAssessment.length;
  const AwaitingForecast = rfiAwaitingForecast.length;
  const InProgress = rfiInProgress.length;

  const returns = rfiReturns.length;
  const onHold = rfiOnHold.length;
  const missedItDate = rfiMissedItDate.length;
  const rmo = rfiRMO.length;
  const handedOver = rfiHandedOver.length;
  const wayleave = rfiWayleave.length;
  const survey = rfiSurvey.length;
  //
  return (
    <>
      <Stat
        title="RFI Count"
        color="grey"
        icon={<TbFileInfo />}
        value={currentStatus}
      />
      <Stat
        title="For Assessment"
        color="silver"
        icon={<MdOutlineAssessment />}
        value={forAssessment}
      />
      <Stat
        title="Awaiting Forecast"
        color="indigo"
        icon={<IoTimerOutline />}
        value={AwaitingForecast}
      />
      <Stat
        title="In Progress"
        color="blue"
        icon={<RiProgress5Line />}
        value={InProgress}
      />
      <Stat
        title="Returns"
        color="orange"
        icon={<MdOutlineAssignmentReturn />}
        value={returns}
      />
      <Stat
        title="On Hold"
        color="red"
        icon={<MdOutlineBackHand />}
        value={onHold}
      />

      <Stat
        title="Missed It Date"
        color="red"
        icon={<FaRegCalendarXmark />}
        value={missedItDate}
      />
      <Stat
        title="RMO"
        color="red"
        icon={<MdOutlineManageAccounts />}
        value={rmo}
      />
      <Stat
        title="Handed Over"
        color="green"
        icon={<PiHandDepositLight />}
        value={handedOver}
      />
      <Stat
        title="Wayleave"
        color="yellow"
        icon={<MdOutlineHandshake />}
        value={wayleave}
      />
      <Stat
        title="Survey"
        color="yellow"
        icon={<RiSurveyLine />}
        value={survey}
      />
    </>
  );
}

export default Stats;
