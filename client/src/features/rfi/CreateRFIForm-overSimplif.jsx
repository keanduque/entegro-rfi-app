import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useRfiFormLogic from "./useRfiFormLogic";

import Form, { StyledColControl } from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";

import { useCreateRFI } from "./useCreateRFI";
import { useEditRFI } from "./useEditRFI";
import { formateDateField, rfiNumberGenerator } from "../../utils/helpers";

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
import AssessmentForm from "./AssessmentForm";
import CommonForm from "./CommonForm";

function CreateRFIForm({ rfiToEdit = {}, statuses = {}, onCloseModal }) {
  const { isCreating, addRFI } = useCreateRFI();
  const { isEditing, editRFI } = useEditRFI();

  const { id: editId, ...editValues } = rfiToEdit;
  const isEditSession = Boolean(editId);

  const [rfiReference, setRFIReference] = useState(
    isEditSession ? editValues.rfi_reference : rfiNumberGenerator
  );

  const { register, handleSubmit, reset, setValue, formState, watch, control } =
    useForm({
      defaultValues: isEditSession
        ? {
            ...editValues,
            creation_date: formateDateField(editValues.creation_date),
            sent_for_redesign_date: formateDateField(
              editValues.sent_for_redesign_date
            ),
            handover_date: formateDateField(editValues.handover_date),

            forecast_handover_week: formateDateField(
              editValues.forecast_handover_week
            ),
            current_forecast_date: formateDateField(
              editValues.current_forecast_date
            ),
            start_date: formateDateField(editValues.start_date),
          }
        : {},
    });
  const { errors } = formState;

  const {
    statusEntegroCode,
    currentStatusCode,
    status_entegro,
    forecast_stautus,
    reason_for_on_hold,
  } = statuses;

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

  const propForm = {
    errors,
    isEditSession,
    isWorking,
    rfiReference,
    setRFIReference,
    currentStatusOptions,
    RfiTypeOptions,
    RfiAssessor,
    PriorityOptions,
    DifficultyOptions,
    BillingOptions,
    RfiRootCauseOptions,
    YesNoOptions,
    ForecastStatusOptions,
    ReasonForOnHoldOptions,
    statusEntegroOptions,
    register,
    watch,
    isDisabled,
    setValue,
    Controller,
    control,
  };

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
        {statusEntegroCode === 11 && currentStatusCode !== 2 ? (
          <AssessmentForm {...propForm} />
        ) : (
          <CommonForm {...propForm} />
        )}
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
