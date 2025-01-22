import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form, { StyledColControl, StyledCols, StyledForm } from "../../ui/Form";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { StyledSelectForm } from "../../ui/Select";
import Button from "../../ui/Button";

import { useParams } from "react-router-dom";
import { useCreateWayleave } from "./useCreateWayleave";
import { useEditWayleave } from "./useEditWayleave";
import { ModalContent } from "../../ui/Modal";
import { LayerOptions } from "../rfi/RFIFilterOptions";
import { format } from "date-fns";
import { formateDateField } from "../../utils/helpers";

function CreateRFIWayleaveForm({ wayleaveToEdit = {}, onCloseModal, rfi }) {
  const { rfi_reference } = useParams();

  const { isCreating, addWayleave } = useCreateWayleave();
  const { isEditing, editWayleave } = useEditWayleave();

  const { id: editId, ...editValues } = wayleaveToEdit;
  const isEditSession = Boolean(editId);
  const isCreatingSession = !Boolean(editId);

  const [rfiReference, setRFIReference] = useState(
    isEditSession ? editValues.rfi_reference : rfi_reference
  );

  // splitting the DA into DA and OLT
  const parts = rfi?.da?.split("-");
  const daVal = parts?.[0] || "";
  const olVal = parts?.[1] || "";

  const { register, handleSubmit, reset, setValue, formState, watch } = useForm(
    {
      defaultValues: isEditSession
        ? {
            ...editValues,
            date_submitted: formateDateField(editValues.date_submitted),
          }
        : {},
    }
  );
  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) {
      editWayleave(
        { id: editId, updates: data },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      addWayleave(data, {
        onSuccess: () => {
          setRFIReference(rfi_reference);
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

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <h3>{`RFI Wayleave Form`}</h3>
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
                disabled={isCreatingSession || isEditSession || isWorking}
                onChange={(e) => setRFIReference(e.target.value)}
                {...register("rfi_reference", {
                  value: rfiReference,
                  valueAsNumber: true, // Automatically treat input as a number
                })}
              />
            </FormRow>

            <FormRow label="DA" error={errors?.da?.message}>
              <Input
                type="text"
                id="da"
                disabled={isCreatingSession || isEditSession || isWorking}
                {...register("da", {
                  value: daVal,
                })}
              />
            </FormRow>

            <FormRow label="OLT" error={errors?.olt?.message}>
              <Input
                type="text"
                id="olt"
                disabled={isCreatingSession || isEditSession || isWorking}
                {...register("olt", {
                  value: olVal,
                })}
              />
            </FormRow>

            <FormRow
              label="Date Submitted"
              error={errors?.date_submitted?.message}
            >
              <Input
                type="date"
                id="date_submitted"
                disabled={isCreatingSession || isEditSession || isWorking}
                {...register("date_submitted", {
                  value:
                    watch("date_submitted") || format(new Date(), "yyyy-MM-dd"),
                  setValueAs: (value) => (value === "" ? null : value), // Convert empty string to null
                })}
              />
            </FormRow>

            <FormRow
              label="Wayleave Status"
              error={errors?.wayleave_status?.message}
            >
              <Input
                type="text"
                id="wayleave_status"
                disabled={isCreatingSession || isEditSession || isWorking}
                {...register("wayleave_status", {
                  value: "Wayleave Required",
                })}
              />
            </FormRow>

            <FormRow label="Layer" error={errors?.layer?.message}>
              <StyledSelectForm
                id="layer"
                disabled={isWorking}
                {...register("layer", {
                  required: !isWorking && "Layer Must Not Be Left Blank!",
                })}
              >
                <option value="">Select...</option>
                {LayerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </StyledSelectForm>
            </FormRow>
          </StyledCols>

          {/* -----------------------------------RIGHT COLUMN----------------------------------------- */}
          <StyledCols>
            <FormRow label="Label" error={errors?.label?.message}>
              <Input
                type="text"
                id="label"
                disabled={isWorking}
                {...register("label", {
                  required: !isWorking && "Label Must Not Be Left Blank!",
                })}
              />
            </FormRow>
            <FormRow label="Remarks" error={errors?.remarks?.message}>
              <Textarea
                $form_type="wayleave_form"
                type="text"
                id="remarks"
                disabled={isWorking}
                placeholder="Not set"
                {...register("remarks")}
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
            {isEditSession ? "Save Wayleave" : "Add Wayleave"}
          </Button>
        </FormRow>
      </StyledColControl>
    </Form>
  );
}

export default CreateRFIWayleaveForm;
