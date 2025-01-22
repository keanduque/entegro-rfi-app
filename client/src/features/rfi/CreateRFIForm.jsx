import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useRfiFormLogic from "./useRfiFormLogic";

import Input from "../../ui/Input";
import Form, { StyledColControl, StyledCols, StyledForm } from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateRFI } from "./useCreateRFI";
import { useEditRFI } from "./useEditRFI";
import { formateDateField, rfiNumberGenerator } from "../../utils/helpers";
import { StyledSelectForm } from "../../ui/Select";
import { ModalContent } from "../../ui/Modal";
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
  QCLead,
  ReasonForDelayOptions,
  ReturnPlanner,
} from "./RFIFilterOptions";

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
            creation_date: formateDateField(editValues.creation_date),
            sent_for_redesign_date: formateDateField(
              editValues.sent_for_redesign_date
            ),
            handover_date: formateDateField(editValues.handover_date),

            start_date: formateDateField(editValues.start_date),
            forecast_handover_week: formateDateField(
              editValues.forecast_handover_week
            ),
            current_forecast_date: formateDateField(
              editValues.current_forecast_date
            ),
            wayleave_requested_date: formateDateField(
              editValues.wayleave_requested_date
            ),
            survey_request_date: formateDateField(
              editValues.survey_request_date
            ),
            date_returned: formateDateField(editValues.date_returned),
            return_forecast_date: formateDateField(
              editValues.return_forecast_date
            ),
          }
        : {},
    }
  );
  const { errors } = formState;

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

  const {
    statusEntegroCode,
    currentStatusCode,
    status_entegro,
    forecast_stautus,
    reason_for_on_hold,
  } = statuses;

  useRfiFormLogic({
    watch,
    setValue,
    register,
    statusEntegroCode,
    currentStatusCode,
    status_entegro,
    forecast_stautus,
    reason_for_on_hold,
  });

  // const handleDateChange = (e) => {
  //   const date = e.target.value; // This value will already be in "yyyy-MM-dd"
  //   console.log(date);
  //   // setValue("handover_date", date); // Save directly in correct format
  // };

  // const FormTitle =
  //   statusEntegroCode === 11 && currentStatusCode !== 2
  //     ? "Assessment"
  //     : "Common";

  // Watch for changes in immco_time_sheet
  const immcoTimeSheet = watch("immco_time_sheet") || 0;

  const computeTotalHours = (updatedHours = null) => {
    const immcoVal = parseFloat(immcoTimeSheet) || 0;
    const hoursVal =
      updatedHours !== 0
        ? parseFloat(updatedHours) || 0
        : parseFloat(watch("number_of_hours")) || 0;

    const total = !hoursVal ? 0 : immcoVal + hoursVal;

    setValue("total_design_hours", total); // Update the form value
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <h3>{`RFI Common Form`}</h3>
      <ModalContent>
        <StyledForm type="common-form">
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
              label="NBI Forecast Status"
              error={errors?.nbi_forecast_status?.message}
              fieldColor="fleshCol"
            >
              <Textarea
                type="text"
                id="nbi_forecast_status"
                placeholder="Not set"
                disabled={isWorking}
                {...register("nbi_forecast_status")}
              />
            </FormRow>

            <FormRow
              label="Status ENTEGRO"
              error={errors?.status_entegro?.message}
              fieldColor="yellowCol"
            >
              <StyledSelectForm
                id="status_entegro"
                disabled={isWorking}
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
              label="Forecast Status"
              error={errors?.forecast_stautus?.message}
            >
              <StyledSelectForm
                id="forecast_stautus"
                disabled={isWorking}
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
              label="Forecast Handover Date"
              error={errors?.forecast_handover_week?.message}
            >
              <Input
                type="date"
                id="forecast_handover_week"
                disabled={isWorking}
                value={watch("forecast_handover_week") || ""}
                {...register("forecast_handover_week", {
                  setValueAs: (value) => (value === "" ? null : value), // Convert empty string to null
                  //onChange: handleDateChange,
                })}
              />
            </FormRow>

            <FormRow
              label="Current Forecast Date"
              error={errors?.current_forecast_date?.message}
            >
              <Input
                type="date"
                id="current_forecast_date"
                disabled={isWorking}
                value={watch("current_forecast_date") || ""}
                {...register("current_forecast_date", {
                  setValueAs: (value) => (value === "" ? null : value), // Convert empty string to null
                  //onChange: handleDateChange,
                })}
              />
            </FormRow>

            <FormRow label="Start Date" error={errors?.start_date?.message}>
              <Input
                type="date"
                id="start_date"
                disabled={isWorking}
                value={watch("start_date") || ""}
                {...register("start_date", {
                  setValueAs: (value) => (value === "" ? null : value), // Convert empty string to null
                  //onChange: handleDateChange,
                })}
              />
            </FormRow>

            <FormRow
              label="QC Lead"
              error={errors?.name_of_resource_2?.message}
              fieldColor="skyCol"
            >
              <>
                <StyledSelectForm
                  id="name_of_resource_2"
                  disabled={isWorking}
                  {...register("name_of_resource_2", {
                    required: !isWorking && "Please enter a value for QClead.", // Apply validation only if not disabled
                  })}
                >
                  <option value="">Select...</option>
                  {QCLead.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </StyledSelectForm>
              </>
            </FormRow>

            <FormRow
              label="Handover Date"
              error={errors?.handover_date?.message}
              fieldColor="skyCol"
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

            <FormRow
              label="Immco Time sheet"
              error={errors?.immco_time_sheet?.message}
              fieldColor="skyCol"
            >
              <Input
                type="text"
                id="immco_time_sheet"
                disabled={isEditSession || isWorking}
                {...register("immco_time_sheet", {
                  onChange: computeTotalHours, // Recompute when this field changes
                  setValueAs: (value) =>
                    value === "" || value === null ? "0" : value, // Default to 0 if empty or null
                })}
              />
            </FormRow>

            <FormRow
              label="Number of Hours"
              error={errors?.number_of_hours?.message}
              fieldColor="skyCol"
            >
              <Input
                type="text"
                id="number_of_hours"
                disabled={isWorking}
                {...register("number_of_hours", {
                  onChange: (e) => {
                    const value = e.target.value;
                    computeTotalHours(value); // Pass the latest value to computeTotalHours
                    setValue("number_of_hours", value === "" ? "0.0" : value); // Set to "0.0" if blank
                  },
                  setValueAs: (value) => (value === "" ? "0.0" : value), // Ensure blank saves as "0.0"
                })}
              />
            </FormRow>

            <FormRow
              label="Total Desgn Hours"
              error={errors?.total_design_hours?.message}
              fieldColor="skyCol"
            >
              <Input
                type="text"
                id="total_design_hours"
                disabled={isEditSession || isWorking}
                {...register("total_design_hours")}
                readOnly
              />
            </FormRow>

            {/* --------------------------------------------------------------------------------------- */}
          </StyledCols>

          {/* -----------------------------------RIGHT COLUMN----------------------------------------- */}
          <StyledCols>
            <FormRow
              label="RFI Assessor"
              error={errors?.name_of_resource_1?.message}
            >
              <>
                <StyledSelectForm
                  id="name_of_resource_1"
                  disabled={isEditSession || isWorking}
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
                disabled={isEditSession || isWorking}
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
                disabled={isEditSession || isWorking}
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

            {/* ----------------------------------------YES / NO -------------------------------------- */}
            <FormRow
              label="Survey Required"
              error={errors?.survey_required?.message}
            >
              <StyledSelectForm
                id="survey_required"
                disabled={isWorking}
                bgColor={watch("survey_required") === "Yes" ? "red" : undefined}
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
              label="Wayleave Required"
              error={errors?.survey_required?.message}
            >
              <StyledSelectForm
                id="wayleave_required"
                disabled={isWorking}
                bgColor={
                  watch("wayleave_required") === "Yes" ? "red" : undefined
                }
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
              label="T1 Application"
              error={errors?.survey_required?.message}
            >
              <StyledSelectForm
                id="t1_application"
                disabled={isWorking}
                bgColor={watch("t1_application") === "Yes" ? "red" : undefined}
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
            >
              <StyledSelectForm
                id="awaiting_nbi"
                disabled={isWorking}
                bgColor={watch("awaiting_nbi") === "Yes" ? "red" : undefined}
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
            {/* ----------------------------------END YES / NO -------------------------------------- */}

            <FormRow
              label="Reason for on hold"
              error={errors?.reason_for_on_hold?.message}
            >
              <StyledSelectForm
                id="reason_for_on_hold"
                disabled={isWorking}
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

            <FormRow
              label="Reason for Delay"
              error={errors?.reason_for_delay?.message}
              fieldColor="oranCol"
            >
              <StyledSelectForm
                id="reason_for_delay"
                disabled={isWorking}
                {...register("reason_for_delay")}
              >
                <option value="">Select...</option>
                {ReasonForDelayOptions.map((option) => (
                  <option key={option.value} value={option.value}>
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
              label="Wayleave Requested Date"
              error={errors?.wayleave_requested_date?.message}
            >
              <Input
                type="date"
                id="wayleave_requested_date"
                disabled={isWorking}
                value={watch("wayleave_requested_date") || ""}
                {...register("wayleave_requested_date", {
                  setValueAs: (value) => (value === "" ? null : value), // Convert empty string to null
                })}
              />
            </FormRow>

            <FormRow
              label="Survey Requested Date"
              error={errors?.survey_request_date?.message}
            >
              <Input
                type="date"
                id="survey_request_date"
                disabled={isWorking}
                value={watch("survey_request_date") || ""}
                {...register("survey_request_date", {
                  setValueAs: (value) => (value === "" ? null : value),
                })}
              />
            </FormRow>

            <FormRow
              label="Returned"
              error={errors?.returned?.message}
              fieldColor="darkBlCol"
            >
              <StyledSelectForm
                id="returned"
                disabled={isWorking}
                {...register("returned")}
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
              label="Return Planner"
              error={errors?.return_planner?.message}
              fieldColor="darkBlCol"
            >
              <StyledSelectForm
                id="return_planner"
                disabled={isWorking}
                {...register("return_planner")}
              >
                <option value="">Select...</option>
                {ReturnPlanner.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>

            <FormRow
              label="Date Returned"
              error={errors?.date_returned?.message}
            >
              <Input
                type="date"
                id="date_returned"
                disabled={isEditSession || isWorking}
                value={watch("date_returned") || ""}
                {...register("date_returned", {
                  setValueAs: (value) => (value === "" ? null : value),
                })}
              />
            </FormRow>

            <FormRow
              label="Returned Forecast Ddate"
              error={errors?.return_forecast_date?.message}
              fieldColor="darkBlCol"
            >
              <Input
                type="date"
                id="return_forecast_date"
                disabled={isWorking}
                value={watch("return_forecast_date") || ""}
                {...register("return_forecast_date", {
                  setValueAs: (value) => (value === "" ? null : value),
                })}
              />
            </FormRow>

            <FormRow
              label="Returend Handover"
              error={errors?.return_handover?.message}
              fieldColor="darkBlCol"
            >
              <Input
                type="date"
                id="return_handover"
                disabled={isWorking}
                value={watch("return_handover") || ""}
                {...register("return_handover", {
                  setValueAs: (value) => (value === "" ? null : value),
                })}
              />
            </FormRow>

            <FormRow
              label="Return Note"
              error={errors?.return_note?.message}
              fieldColor="darkBlCol"
            >
              <Input
                type="text"
                id="return_note"
                disabled={isWorking}
                {...register("return_note")}
              />
            </FormRow>

            <FormRow
              label="Return Hours"
              error={errors?.return_hours?.message}
              fieldColor="darkBlCol"
            >
              <Input
                type="text"
                id="return_hours"
                disabled={isWorking}
                {...register("return_hours")}
              />
            </FormRow>

            <FormRow
              label="Return Classification"
              error={errors?.return_clissification?.message}
              fieldColor="darkBlCol"
            >
              <Input
                type="text"
                id="return_clissification"
                disabled={isWorking}
                {...register("return_clissification")}
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

          {/* <Modal>
            <Modal.Open opens="survey">
              <button title="Survey Tracker">
                <RiSurveyLine />
              </button>
            </Modal.Open>
            <Modal.Window name="survey">
              <SurveyForm rfi_reference={rfi_reference} />
            </Modal.Window>
          </Modal> */}
        </FormRow>
      </StyledColControl>
    </Form>
  );
}

export default CreateRFIForm;
