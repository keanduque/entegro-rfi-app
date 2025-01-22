import { useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateRFI } from "./useCreateRFI";
import { useEditRFI } from "./useEditRFI";
import { rfiNumberGenerator } from "../../utils/helpers";

function CreateRFIForm({ rfiToEdit = {}, statuses, onCloseModal }) {
  const { isCreating, addRFI } = useCreateRFI();
  const { isEditing, editRFI } = useEditRFI();

  const { id: editId, ...editValues } = rfiToEdit;
  const isEditSession = Boolean(editId);

  const [rfiReference, setRFIReference] = useState(
    isEditSession ? editValues.rfi_reference : rfiNumberGenerator
  );

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
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

  const { statusEntegroCode, currentStatusCode } = statuses;
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
      <FormRow label="RFI reference" error={errors?.rfi_reference?.message}>
        <Input
          type="number"
          id="rfi_reference"
          disabled={isWorking}
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
          disabled={isWorking}
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
        label="Description of works"
        disabled={isWorking}
        error={errors?.description_of_works?.message}
      >
        <Textarea
          type="text"
          id="description_of_works"
          defaultValue=""
          {...register("description_of_works", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="NBI Forecast Status"
        disabled={isWorking}
        error={errors?.nbi_forecast_status?.message}
      >
        <Textarea
          type="text"
          id="nbi_forecast_status"
          defaultValue=""
          {...register("nbi_forecast_status", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        label="QC Lead"
        disabled={isWorking}
        error={errors?.name_of_resource_2?.message}
      >
        <Input
          type="text"
          id="name_of_resource_2"
          defaultValue=""
          {...register("name_of_resource_2", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* <FormRow
        label="Handover Date"
        disabled={isWorking}
        error={errors?.handover_date?.message}
      >
        <Input
          type="text"
          id="handover_date"
          defaultValue=""
          {...register("handover_date")}
        />
      </FormRow> */}

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit RFI" : "Add RFI"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateRFIForm;
