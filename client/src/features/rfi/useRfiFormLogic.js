import { useEffect } from "react";

/***
 * Automation for RFI Assessment Form
 */

const useRfiFormLogic = ({
  watch,
  setValue,
  register,
  status_entegro,
  forecast_stautus,
  reason_for_on_hold,
}) => {
  const nameOfResource = watch("name_of_resource_1");
  const forecastStatus = watch("forecast_stautus");
  const reasonForOnHold = watch("reason_for_on_hold");
  const AwaitingNbi = watch("awaiting_nbi");
  const T1Application = watch("t1_application");
  const SurveyRequired = watch("survey_required");
  const WayleaveRequired = watch("wayleave_required");

  const FORECAST = {
    ON_HOLD: "On Hold",
    COMPLETE: "Complete",
  };

  const STATUS = {
    HANDED_OVER: "1. Handed over",
    ON_HOLD: "2. On Hold",
    AWAITING_FORECAST: "3. Awaiting Forecast",
    SURVEY_REQUIRED: "9. Survey Required",
    RMO_REQUIRED: "10. RMO Required",
    WAYLEAVE_REQUIRED: "8. Wayleave Required",
  };

  const REASON = {
    WAYLEAVE: "Wayleave",
    SURVEY: "Survey",
    T1: "T1 Application",
    NBI: "NBI Design Query",
  };

  const isDisabled = [
    WayleaveRequired,
    SurveyRequired,
    T1Application,
    AwaitingNbi,
  ].includes("Yes");

  useEffect(() => {
    // Update status_entegro when nameOfResource changes
    if (nameOfResource) {
      setValue("status_entegro", STATUS.AWAITING_FORECAST);
    } else {
      setValue("status_entegro", status_entegro || ""); // Use default value from the database or fallback
    }
  }, [setValue, status_entegro, nameOfResource, STATUS.AWAITING_FORECAST]);

  // UseEffect to implement Forecast_Stautus_AfterUpdate logic
  useEffect(() => {
    // Handle forecastStatus changes
    if (!forecastStatus) {
      // If forecastStatus is not selected or reset
      if (nameOfResource) {
        // If nameOfResource is not empty, status_entegro should be STATUS.AWAITING_FORECAST
        setValue("status_entegro", STATUS.AWAITING_FORECAST);
      } else {
        // Otherwise, fallback to database value or empty string
        setValue("status_entegro", status_entegro || "");

        // setValue("awaiting_nbi", "");
        // setValue("t1_application", "");
        // setValue("survey_required", "");
        // setValue("wayleave_required", "");
      }
    } else if (forecastStatus === FORECAST.COMPLETE) {
      // If forecastStatus is COMPLETE
      setValue("status_entegro", STATUS.HANDED_OVER);
      register("reason_for_on_hold", { required: false });
    } else if (forecastStatus) {
      if (WayleaveRequired === "Yes") {
        setValue("status_entegro", STATUS.WAYLEAVE_REQUIRED);
      } else if (SurveyRequired === "Yes") {
        setValue("status_entegro", STATUS.SURVEY_REQUIRED);
      } else if (T1Application === "Yes") {
        setValue("status_entegro", STATUS.RMO_REQUIRED);
      } else if (forecastStatus === FORECAST.ON_HOLD) {
        // If forecastStatus is ON_HOLD or If AwaitingNbi is selected too
        setValue("status_entegro", STATUS.ON_HOLD);

        // Ensure reason_for_on_hold is not blank
        if (!reasonForOnHold) {
          alert("Reason for Hold Must Not Be Left Blank!");
          register("reason_for_on_hold", {
            required: "Reason for Hold Must Not Be Left Blank!",
          });
          //setValue("forecast_stautus", ""); // Reset forecast status to avoid invalid state
        }
      } else {
        //setValue("status_entegro", status_entegro || "");
        setValue("status_entegro", STATUS.AWAITING_FORECAST);

        setValue("awaiting_nbi", "No");
        setValue("t1_application", "No");
        setValue("survey_required", "No");
        setValue("wayleave_required", "No");
      }
    } else {
      // For any other valid forecastStatus
      setValue("status_entegro", STATUS.AWAITING_FORECAST);
    }
  }, [
    setValue,
    register,
    AwaitingNbi,
    T1Application,
    SurveyRequired,
    WayleaveRequired,
    forecastStatus,
    nameOfResource,
    reasonForOnHold,
    status_entegro,
    FORECAST.COMPLETE,
    FORECAST.ON_HOLD,
    STATUS.ON_HOLD,
    STATUS.AWAITING_FORECAST,
    STATUS.HANDED_OVER,
    STATUS.RMO_REQUIRED,
    STATUS.SURVEY_REQUIRED,
    STATUS.WAYLEAVE_REQUIRED,
  ]);

  // UseEffect to implement survey_required_AfterUpdate logic
  useEffect(() => {
    // Handle AwaitingNbi first
    if (AwaitingNbi === "Yes") {
      setValue("forecast_stautus", FORECAST.ON_HOLD);
      setValue("reason_for_on_hold", REASON.NBI);
      setValue("status_entegro", STATUS.ON_HOLD);
    } else if (AwaitingNbi === "No" || AwaitingNbi === "") {
      // setValue("forecast_stautus", "");
      // setValue("reason_for_on_hold", "");

      if (forecastStatus === FORECAST.COMPLETE) {
        // If forecastStatus is COMPLETE
        setValue("status_entegro", STATUS.HANDED_OVER);
      } else if (forecastStatus === FORECAST.ON_HOLD) {
        // If forecastStatus is ON_HOLD
        setValue("status_entegro", STATUS.ON_HOLD);
      } else if (nameOfResource || forecastStatus) {
        // Set status_entegro based on nameOfResource or fallback from DB
        setValue("status_entegro", STATUS.AWAITING_FORECAST); // If resource name is set
      } else {
        setValue("status_entegro", status_entegro || ""); // Fallback to database value or empty string
        //setValue("status_entegro", STATUS.AWAITING_FORECAST);
      }
    }
  }, [
    setValue,
    forecast_stautus,
    reason_for_on_hold,
    AwaitingNbi,
    nameOfResource,
    forecastStatus,
    reasonForOnHold,
    status_entegro,
    FORECAST.ON_HOLD,
    FORECAST.COMPLETE,
    STATUS.ON_HOLD,
    STATUS.HANDED_OVER,
    STATUS.AWAITING_FORECAST,
    REASON.NBI,
  ]);

  useEffect(() => {
    if (T1Application === "Yes") {
      // Set values for T1_Application = "Yes"
      setValue("forecast_stautus", FORECAST.ON_HOLD);
      setValue("reason_for_on_hold", REASON.T1);
      setValue("status_entegro", STATUS.RMO_REQUIRED);
    } else if (T1Application === "No" || T1Application === "") {
      if (AwaitingNbi === "Yes") {
        // Handle AwaitingNbi only when WayleaveRequired is not selected or set to "No"
        setValue("forecast_stautus", FORECAST.ON_HOLD);
        setValue("reason_for_on_hold", REASON.NBI);
        setValue("status_entegro", STATUS.ON_HOLD);
      } else if (AwaitingNbi === "No" || AwaitingNbi === "") {
        if (forecastStatus === FORECAST.COMPLETE) {
          // If forecastStatus is COMPLETE
          setValue("status_entegro", STATUS.HANDED_OVER);
        } else if (forecastStatus === FORECAST.ON_HOLD) {
          // If forecastStatus is ON_HOLD
          setValue("status_entegro", STATUS.ON_HOLD);
        } else if (nameOfResource || forecastStatus) {
          // Set status_entegro based on nameOfResource or fallback from DB
          setValue("status_entegro", STATUS.AWAITING_FORECAST); // If resource name is set
        } else {
          setValue("status_entegro", status_entegro || ""); // Fallback to database value or empty string
        }
      } else {
        setValue("forecast_stautus", "");
        setValue("reason_for_on_hold", "");
      }
    }
  }, [
    setValue,
    T1Application,
    AwaitingNbi,
    nameOfResource,
    status_entegro,
    forecastStatus,
    reasonForOnHold,
    FORECAST.ON_HOLD,
    FORECAST.COMPLETE,
    REASON.T1,
    REASON.NBI,
    STATUS.RMO_REQUIRED,
    STATUS.HANDED_OVER,
    STATUS.ON_HOLD,
    STATUS.AWAITING_FORECAST,
  ]);

  useEffect(() => {
    if (SurveyRequired === "Yes") {
      // Set values for SurveyRequired = "Yes"
      setValue("forecast_stautus", FORECAST.ON_HOLD);
      setValue("reason_for_on_hold", REASON.SURVEY);
      setValue("status_entegro", STATUS.SURVEY_REQUIRED);
    } else if (SurveyRequired === "No" || SurveyRequired === "") {
      if (T1Application === "Yes") {
        // Handle T1Application only when SurveyRequired is not selected or set to "No"
        setValue("forecast_stautus", FORECAST.ON_HOLD);
        setValue("reason_for_on_hold", REASON.T1);
        setValue("status_entegro", STATUS.RMO_REQUIRED);
      } else if (AwaitingNbi === "Yes") {
        // Handle AwaitingNbi only when SurveyRequired is not selected or set to "No"
        setValue("forecast_stautus", FORECAST.ON_HOLD);
        setValue("reason_for_on_hold", REASON.NBI);
        setValue("status_entegro", STATUS.ON_HOLD);
      } else if (AwaitingNbi === "No" || AwaitingNbi === "") {
        if (forecastStatus === FORECAST.COMPLETE) {
          // If forecastStatus is COMPLETE
          setValue("status_entegro", STATUS.HANDED_OVER);
        } else if (forecastStatus === FORECAST.ON_HOLD) {
          // If forecastStatus is ON_HOLD
          setValue("status_entegro", STATUS.ON_HOLD);
        } else if (nameOfResource || forecastStatus) {
          // Set status_entegro based on nameOfResource or fallback from DB
          setValue("status_entegro", STATUS.AWAITING_FORECAST); // If resource name is set
        } else {
          setValue("status_entegro", status_entegro || ""); // Fallback to database value or empty string
        }
      } else {
        setValue("forecast_stautus", "");
        setValue("reason_for_on_hold", "");
      }
    }
  }, [
    setValue,
    SurveyRequired,
    T1Application,
    AwaitingNbi,
    nameOfResource,
    status_entegro,
    forecastStatus,
    reasonForOnHold,
    FORECAST.ON_HOLD,
    FORECAST.COMPLETE,
    STATUS.ON_HOLD,
    STATUS.SURVEY_REQUIRED,
    STATUS.RMO_REQUIRED,
    STATUS.AWAITING_FORECAST,
    STATUS.HANDED_OVER,
    STATUS.COMPLETE,
    REASON.SURVEY,
    REASON.T1,
    REASON.NBI,
  ]);

  useEffect(() => {
    if (WayleaveRequired === "Yes") {
      // Handle WayleaveRequired with highest priority
      setValue("forecast_stautus", FORECAST.ON_HOLD);
      setValue("reason_for_on_hold", REASON.WAYLEAVE);
      setValue("status_entegro", STATUS.WAYLEAVE_REQUIRED);
    } else if (WayleaveRequired === "No" || WayleaveRequired === "") {
      if (SurveyRequired === "Yes") {
        // Handle SurveyRequired only when WayleaveRequired is not selected or set to "No"
        setValue("forecast_stautus", FORECAST.ON_HOLD);
        setValue("reason_for_on_hold", REASON.SURVEY);
        setValue("status_entegro", STATUS.SURVEY_REQUIRED);
      } else if (T1Application === "Yes") {
        // Handle T1Application only when WayleaveRequired is not selected or set to "No"
        setValue("forecast_stautus", FORECAST.ON_HOLD);
        setValue("reason_for_on_hold", REASON.T1);
        setValue("status_entegro", STATUS.RMO_REQUIRED);
      } else if (AwaitingNbi === "Yes") {
        // Handle AwaitingNbi only when WayleaveRequired is not selected or set to "No"
        setValue("forecast_stautus", FORECAST.ON_HOLD);
        setValue("reason_for_on_hold", REASON.NBI);
        setValue("status_entegro", STATUS.ON_HOLD);
      } else if (
        SurveyRequired === "No" ||
        SurveyRequired === "" ||
        T1Application === "No" ||
        T1Application === "" ||
        AwaitingNbi === "No" ||
        AwaitingNbi === ""
      ) {
        if (forecastStatus === FORECAST.COMPLETE) {
          // If forecastStatus is COMPLETE
          setValue("status_entegro", STATUS.HANDED_OVER);
        } else if (forecastStatus === FORECAST.ON_HOLD) {
          // If forecastStatus is ON_HOLD
          setValue("status_entegro", STATUS.ON_HOLD);
        } else if (nameOfResource || forecastStatus) {
          // Set status_entegro based on nameOfResource or fallback from DB
          setValue("status_entegro", STATUS.AWAITING_FORECAST); // If resource name is set
        } else {
          setValue("status_entegro", status_entegro || ""); // Fallback to database value or empty string
        }
      } else {
        // Reset values when WayleaveRequired is set to "No"
        setValue("forecast_stautus", "");
        setValue("reason_for_on_hold", "");
      }
    }
  }, [
    setValue,
    WayleaveRequired,
    SurveyRequired,
    T1Application,
    AwaitingNbi,
    nameOfResource,
    status_entegro,
    forecastStatus,
    reasonForOnHold,
    FORECAST.ON_HOLD,
    FORECAST.COMPLETE,
    STATUS.WAYLEAVE_REQUIRED,
    STATUS.SURVEY_REQUIRED,
    STATUS.RMO_REQUIRED,
    STATUS.ON_HOLD,
    STATUS.AWAITING_FORECAST,
    STATUS.HANDED_OVER,
    STATUS.COMPLETE,
    REASON.WAYLEAVE,
    REASON.SURVEY,
    REASON.T1,
    REASON.NBI,
  ]);

  return { isDisabled };
};

export default useRfiFormLogic;
