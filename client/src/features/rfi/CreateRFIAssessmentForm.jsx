import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useRfiFormLogic from "./useRfiFormLogic";

import Input from "../../ui/Input";
import Form, { StyledColControl, StyledCols, StyledForm } from "../../ui/Form";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { StyledSelectForm } from "../../ui/Select";
import Button from "../../ui/Button";

import { useCreateRFI } from "./useCreateRFI";
import { useEditRFI } from "./useEditRFI";
import { formateDateField, rfiNumberGenerator } from "../../utils/helpers";
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
} from "./RFIFilterOptions";

function CreateRFIAssessmentForm({
  rfiToEdit = {},
  statuses = {},
  onCloseModal,
}) {
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
          }
        : {},
    }
  );
  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    // AfterSubmit process
    // Ensure all Yes/No fields are set to "No" if not "Yes"
    [
      "awaiting_nbi",
      "t1_application",
      "survey_required",
      "wayleave_required",
    ].forEach((key) => {
      if (data[key] !== "Yes") data[key] = "No";
    });

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

  const { isDisabled } = useRfiFormLogic({
    watch,
    setValue,
    register,
    statusEntegroCode,
    currentStatusCode,
    status_entegro,
    forecast_stautus,
    reason_for_on_hold,
  });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <h3>{`RFI Assessment Form`}</h3>
      <ModalContent>
        <StyledForm type="assessment-form">
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

export default CreateRFIAssessmentForm;
