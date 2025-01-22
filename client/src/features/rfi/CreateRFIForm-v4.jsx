import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form, { StyledColControl, StyledCols, StyledForm } from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateRFI } from "./useCreateRFI";
import { useEditRFI } from "./useEditRFI";
import { formateDateField, rfiNumberGenerator } from "../../utils/helpers";
import { StyledSelectForm } from "../../ui/Select";
import {
  BillingOptions,
  currentStatusOptions,
  DifficultyOptions,
  ForecastStatusOptions,
  PriorityOptions,
  ReasonForOnHoldOptions,
  RfiAssessor,
  RfiRootCauseOptions,
  RfiTypeOptions,
  statusEntegroOptions,
  YesNoOptions,
} from "./RFIFilterOptions";
import { ModalContent } from "../../ui/Modal";

function CreateRFIForm({ rfiToEdit = {}, statuses = {}, onCloseModal }) {
  const { isCreating, addRFI } = useCreateRFI();
  const { isEditing, editRFI } = useEditRFI();

  const { id: editId, ...editValues } = rfiToEdit;
  const isEditSession = Boolean(editId);

  const [rfiReference, setRFIReference] = useState(
    isEditSession ? editValues.rfi_reference : rfiNumberGenerator
  );

  const { register, handleSubmit, reset, setValue, formState, watch } = useForm(
    {
      defaultValues: isEditSession
        ? {
            ...editValues,
            status_entegro: editValues.status_entegro,
            forecast_stautus: editValues.forecast_stautus,
            creation_date: formateDateField(editValues.creation_date),
            sent_for_redesign_date: formateDateField(
              editValues.sent_for_redesign_date
            ),
            handover_date: formateDateField(editValues.handover_date),
          }
        : {},
    }
  );
  const { errors } = formState;

  const { statusEntegroCode, currentStatusCode, status_entegro } = statuses;

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      editRFI(
        { id: editId, updates: data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      addRFI(data, {
        onSuccess: () => {
          setRFIReference(rfiNumberGenerator);
          reset();
          onCloseModal?.();
        },
      });
    }
  }

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
  }, [nameOfResource, STATUS.AWAITING_FORECAST, setValue, status_entegro]);

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
        setValue("status_entegro", status_entegro || "");
      }
    } else {
      // For any other valid forecastStatus
      setValue("status_entegro", STATUS.AWAITING_FORECAST);
    }
  }, [
    forecastStatus,
    nameOfResource,
    reasonForOnHold,
    setValue,
    register,
    status_entegro,
    FORECAST.COMPLETE,
    FORECAST.ON_HOLD,
    STATUS.HANDED_OVER,
    STATUS.ON_HOLD,
    STATUS.AWAITING_FORECAST,
    WayleaveRequired,
    STATUS.WAYLEAVE_REQUIRED,
    SurveyRequired,
    STATUS.SURVEY_REQUIRED,
    T1Application,
    STATUS.RMO_REQUIRED,
  ]);

  // UseEffect to implement survey_required_AfterUpdate logic
  useEffect(() => {
    // Handle AwaitingNbi first
    if (AwaitingNbi === "Yes") {
      setValue("forecast_stautus", FORECAST.ON_HOLD);
      setValue("reason_for_on_hold", REASON.NBI);
      setValue("status_entegro", STATUS.ON_HOLD);
    } else if (AwaitingNbi === "No" || AwaitingNbi === "") {
      // Use database values if they are not empty
      if (forecastStatus && reasonForOnHold) {
        setValue("forecast_stautus", forecastStatus);
        setValue("reason_for_on_hold", reasonForOnHold);
      } else {
        setValue("forecast_stautus", "");
        setValue("reason_for_on_hold", "");
      }

      if (forecastStatus === FORECAST.COMPLETE) {
        // If forecastStatus is COMPLETE
        setValue("status_entegro", STATUS.HANDED_OVER);
      } else if (forecastStatus === FORECAST.ON_HOLD) {
        // If forecastStatus is ON_HOLD
        setValue("status_entegro", STATUS.ON_HOLD);
      } else if (nameOfResource) {
        // Set status_entegro based on nameOfResource or fallback from DB
        setValue("status_entegro", STATUS.AWAITING_FORECAST); // If resource name is set
      } else {
        setValue("status_entegro", status_entegro || ""); // Fallback to database value or empty string
      }
    }
  }, [
    AwaitingNbi,
    nameOfResource,
    forecastStatus,
    reasonForOnHold,
    setValue,
    status_entegro,
    FORECAST.ON_HOLD,
    FORECAST.COMPLETE,
    REASON.NBI,
    STATUS.ON_HOLD,
    STATUS.HANDED_OVER,
    STATUS.AWAITING_FORECAST,
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
        // Reset values when AwaitingNbi is not "Yes"
        // Use database values if they are not empty
        if (forecastStatus && reasonForOnHold) {
          setValue("forecast_stautus", forecastStatus);
          setValue("reason_for_on_hold", reasonForOnHold);
        } else {
          setValue("forecast_stautus", "");
          setValue("reason_for_on_hold", "");
        }

        if (forecastStatus === FORECAST.COMPLETE) {
          // If forecastStatus is COMPLETE
          setValue("status_entegro", STATUS.HANDED_OVER);
        } else if (forecastStatus === FORECAST.ON_HOLD) {
          // If forecastStatus is ON_HOLD
          setValue("status_entegro", STATUS.ON_HOLD);
        } else if (nameOfResource) {
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
    T1Application,
    AwaitingNbi,
    nameOfResource,
    setValue,
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
        // Reset values when AwaitingNbi is not "Yes"
        // Use database values if they are not empty
        if (forecastStatus && reasonForOnHold) {
          setValue("forecast_stautus", forecastStatus);
          setValue("reason_for_on_hold", reasonForOnHold);
        } else {
          setValue("forecast_stautus", "");
          setValue("reason_for_on_hold", "");
        }

        if (forecastStatus === FORECAST.COMPLETE) {
          // If forecastStatus is COMPLETE
          setValue("status_entegro", STATUS.HANDED_OVER);
        } else if (forecastStatus === FORECAST.ON_HOLD) {
          // If forecastStatus is ON_HOLD
          setValue("status_entegro", STATUS.ON_HOLD);
        } else if (nameOfResource) {
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
    SurveyRequired,
    T1Application,
    AwaitingNbi,
    nameOfResource,
    setValue,
    status_entegro,
    forecastStatus,
    reasonForOnHold,
    FORECAST.ON_HOLD,
    FORECAST.COMPLETE,
    REASON.SURVEY,
    REASON.T1,
    REASON.NBI,
    STATUS.ON_HOLD,
    STATUS.SURVEY_REQUIRED,
    STATUS.RMO_REQUIRED,
    STATUS.AWAITING_FORECAST,
    STATUS.HANDED_OVER,
    STATUS.COMPLETE,
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
        // Reset values when SurveyRequired or T1Application or AwaitingNbi are set to "No"
        // Use database values if they are not empty
        if (forecastStatus && reasonForOnHold) {
          setValue("forecast_stautus", forecastStatus);
          setValue("reason_for_on_hold", reasonForOnHold);
        } else {
          setValue("forecast_stautus", "");
          setValue("reason_for_on_hold", "");
        }

        if (forecastStatus === FORECAST.COMPLETE) {
          // If forecastStatus is COMPLETE
          setValue("status_entegro", STATUS.HANDED_OVER);
        } else if (forecastStatus === FORECAST.ON_HOLD) {
          // If forecastStatus is ON_HOLD
          setValue("status_entegro", STATUS.ON_HOLD);
        } else if (nameOfResource) {
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
    WayleaveRequired,
    SurveyRequired,
    T1Application,
    AwaitingNbi,
    nameOfResource,
    setValue,
    status_entegro,
    forecastStatus,
    reasonForOnHold,
    FORECAST.ON_HOLD,
    REASON.WAYLEAVE,
    REASON.SURVEY,
    REASON.T1,
    REASON.NBI,
    STATUS.WAYLEAVE_REQUIRED,
    STATUS.SURVEY_REQUIRED,
    STATUS.RMO_REQUIRED,
    STATUS.ON_HOLD,
    STATUS.AWAITING_FORECAST,
    FORECAST.COMPLETE,
    STATUS.HANDED_OVER,
    STATUS.COMPLETE,
  ]);

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseModal?.();
      }
    }
    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [onCloseModal, setValue]);

  // const handleDateChange = (e) => {
  //   const date = e.target.value; // This value will already be in "yyyy-MM-dd"
  //   console.log(date);
  //   // setValue("handover_date", date); // Save directly in correct format
  // };

  const FormTitle =
    statusEntegroCode === 11 && currentStatusCode !== 2
      ? "Assessment"
      : "Common";

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <h3>{`RFI ${FormTitle} Form`}</h3>
      <ModalContent>
        <StyledForm>
          {/* -----------------------------------LEFT COLUMN----------------------------------------- */}
          <StyledCols>
            <FormRow
              label="RFI Reference"
              error={errors?.rfi_reference?.message}
            >
              <Input
                type="number"
                id="rfi_reference"
                disabled={isEditSession || isWorking}
                value={rfiReference}
                onChange={(e) => setRFIReference(e.target.value)}
                {...register("rfi_reference", {
                  required: "This field is required",
                  maxLength: {
                    value: 9,
                    message: "RFI Reference maximum number is 9 character",
                  },
                })}
              />
            </FormRow>
            <FormRow label="DA" error={errors?.da?.message}>
              <Input
                type="text"
                id="da"
                disabled={isEditSession || isWorking}
                {...register("da", {
                  required: "This field is required",
                  minLength: {
                    value: 1,
                    message: "DA should be at least 1",
                  },
                })}
              />
            </FormRow>

            <FormRow
              label="Current status"
              error={errors?.current_status?.message}
            >
              <StyledSelectForm
                id="current_status"
                disabled={isEditSession || isWorking}
                {...register("current_status", {
                  validate:
                    isEditSession || isWorking
                      ? undefined // Skip validation when field is disabled
                      : (value) =>
                          value !== "All" ||
                          "Please select a specific status, not All!",
                  required:
                    isEditSession || isWorking
                      ? false // Skip required validation when field is disabled
                      : "Current Status Must Not Be Left Blank!",
                })}
              >
                {currentStatusOptions.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>

            <FormRow label="RFI Type" error={errors?.rfi_type?.message}>
              <StyledSelectForm
                id="rfi_type"
                disabled={isEditSession || isWorking}
                {...register("rfi_type", {
                  required:
                    !isEditSession &&
                    !isWorking &&
                    "RFI Type Must Not Be Left Blank!",
                })}
              >
                <option value="">Select...</option>
                {RfiTypeOptions.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>

            <FormRow
              label="Creation Date"
              error={errors?.creation_date?.message}
            >
              <Input
                type="date"
                id="creation_date"
                disabled={isEditSession || isWorking}
                value={watch("creation_date") || ""}
                {...register("creation_date", {
                  setValueAs: (value) => (value === "" ? null : value), // Convert empty string to null
                })}
              />
            </FormRow>

            <FormRow
              label="Sent for Redesign Date"
              error={errors?.sent_for_redesign_date?.message}
            >
              <Input
                type="date"
                id="sent_for_redesign_date"
                disabled={isEditSession || isWorking}
                value={watch("sent_for_redesign_date") || ""}
                {...register("sent_for_redesign_date", {
                  setValueAs: (value) => (value === "" ? null : value), // Convert empty string to null
                })}
              />
            </FormRow>
            {/* --------------------------------------------------------------------------------------- */}

            <FormRow
              label="RFI Assessor"
              error={errors?.name_of_resource_1?.message}
            >
              <>
                <StyledSelectForm
                  id="name_of_resource_1"
                  disabled={isWorking}
                  {...register("name_of_resource_1", {
                    required:
                      !isWorking && "RFI Assesor Name Must Not Be Left Blank!", // Apply validation only if not disabled
                  })}
                >
                  <option value="">Select...</option>
                  {RfiAssessor.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </StyledSelectForm>
              </>
            </FormRow>

            <FormRow
              label="Priority/NBIQ"
              error={errors?.priority_nbiq?.message}
            >
              <StyledSelectForm
                id="priority_nbiq"
                disabled={isWorking}
                {...register("priority_nbiq", {
                  required:
                    !isWorking && "Priority_NBIQ Must Not Be Left Blank!", // Apply validation only if not disabled
                })}
              >
                <option value="">Select...</option>
                {PriorityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>
            <FormRow label="Difficulty" error={errors?.difficulty?.message}>
              <StyledSelectForm
                id="difficulty"
                disabled={isWorking}
                {...register("difficulty", {
                  required: !isWorking && "Difficulty Must Not Be Left Blank!",
                })}
              >
                <option value="">Select...</option>
                {DifficultyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>
            <FormRow label="Billing" error={errors?.billing?.message}>
              <StyledSelectForm
                id="billing"
                disabled={isWorking}
                {...register("billing", {
                  required: !isWorking && "Billing Must Not Be Left Blank!",
                })}
              >
                <option value="">Select...</option>
                {BillingOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>
            <FormRow
              label="RFI Root Cause"
              error={errors?.rfi_root_cause?.message}
            >
              <StyledSelectForm
                id="rfi_root_cause"
                disabled={isWorking}
                {...register("rfi_root_cause", {
                  required:
                    !isWorking && "RFI_Root_Cause Must Not Be Left Blank!",
                })}
              >
                <option value="">Select...</option>
                {RfiRootCauseOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>

            {/* ----------------------------------------YES / NO -------------------------------------- */}
            <FormRow
              label="Wayleave Required"
              error={errors?.survey_required?.message}
              fieldColor="skyCol"
            >
              <StyledSelectForm
                id="wayleave_required"
                disabled={isWorking}
                {...register("wayleave_required")}
              >
                <option value="">Select...</option>
                {YesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>
            <FormRow
              label="Survey Required"
              error={errors?.survey_required?.message}
              fieldColor="skyCol"
            >
              <StyledSelectForm
                id="survey_required"
                disabled={isWorking}
                {...register("survey_required")}
              >
                <option value="">Select...</option>
                {YesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>

            <FormRow
              label="T1 Application"
              error={errors?.survey_required?.message}
              fieldColor="skyCol"
            >
              <StyledSelectForm
                id="t1_application"
                disabled={isWorking}
                {...register("t1_application")}
              >
                <option value="">Select...</option>
                {YesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>
            <FormRow
              label="Awaiting NBI"
              error={errors?.survey_required?.message}
              fieldColor="skyCol"
            >
              <StyledSelectForm
                id="awaiting_nbi"
                disabled={isWorking}
                {...register("awaiting_nbi")}
              >
                <option value="">Select...</option>
                {YesNoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>

            {/* --------------------------------------------------------------------------------------- */}

            <FormRow
              label="Forecast Status"
              error={errors?.forecast_stautus?.message}
            >
              <StyledSelectForm
                id="forecast_stautus"
                disabled={isWorking || isDisabled}
                {...register("forecast_stautus", {
                  required:
                    !isWorking && "Forecast_Status Must Not Be Left Blank!",
                })}
              >
                <option value="">Select...</option>
                {ForecastStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>

            <FormRow
              label="Reason for on hold"
              error={errors?.reason_for_on_hold?.message}
            >
              <StyledSelectForm
                id="reason_for_on_hold"
                disabled={isWorking || isDisabled}
                {...register("reason_for_on_hold")}
              >
                <option value="">Select...</option>
                {ReasonForOnHoldOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>
          </StyledCols>

          {/* -----------------------------------RIGHT COLUMN----------------------------------------- */}
          <StyledCols>
            <FormRow
              label="Description of Works"
              error={errors?.description_of_works?.message}
            >
              <Textarea
                type="text"
                id="description_of_works"
                placeholder="Not set"
                disabled={isEditSession || isWorking}
                {...register("description_of_works", {
                  required:
                    !isEditSession &&
                    !isWorking &&
                    "Description of Works Must Not Be Left Blank!", // Conditional validation
                })}
              />
            </FormRow>

            <FormRow
              label="Status ENTEGRO"
              error={errors?.status_entegro?.message}
            >
              <StyledSelectForm
                id="status_entegro"
                disabled={isWorking || isDisabled}
                {...register("status_entegro")}
              >
                {statusEntegroOptions.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>

            <FormRow
              label="Forecast Notes"
              error={errors?.forecast_notes?.message}
            >
              <Textarea
                type="text"
                id="forecast_notes"
                disabled={isWorking}
                placeholder="Not set"
                {...register("forecast_notes")}
              />
            </FormRow>

            <FormRow
              label="Handover Date"
              error={errors?.handover_date?.message}
            >
              <Input
                type="date"
                id="handover_date"
                disabled={isWorking}
                value={watch("handover_date") || ""}
                {...register("handover_date", {
                  setValueAs: (value) => (value === "" ? null : value), // Convert empty string to null
                  //onChange: handleDateChange,
                })}
              />
            </FormRow>
          </StyledCols>
        </StyledForm>
      </ModalContent>

      <StyledColControl>
        <FormRow>
          <Button
            $variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? "Save RFI" : "Add RFI"}
          </Button>
        </FormRow>
      </StyledColControl>
    </Form>
  );
}

export default CreateRFIForm;
