import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useForm } from "react-hook-form";
import { createRFI } from "../../services/apiRFIs";

function CreateRFIForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createRFI,
    onSuccess: () => {
      toast.success("New RFI successfully created!");
      queryClient.invalidateQueries({ queryKey: ["rfis"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
  }
  function onError(errors) {
    // console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="RFI reference" error={errors?.rfi_reference?.message}>
        <Input
          type="number"
          id="rfi_reference"
          disabled={isCreating}
          {...register("rfi_reference", {
            required: "This field is required",
            minLength: {
              value: 9,
              message: "RFI Reference should be at least 9",
              //validate: (value) => getValues().rfi_reference > 100 || 'should be less than the max char'
            },
          })}
        />
      </FormRow>

      <FormRow label="DA" error={errors?.da?.message}>
        <Input
          type="text"
          id="da"
          disabled={isCreating}
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
        disabled={isCreating}
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

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add RFI</Button>
      </FormRow>
    </Form>
  );
}

export default CreateRFIForm;
