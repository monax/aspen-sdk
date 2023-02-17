import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { EmailFormData } from "./Form/types";

type Props<EmailFormData extends FieldValues> = {
  name: Path<EmailFormData>;
};

const FormInput = ({ name }: Props<EmailFormData>) => {
  const {
    getFieldState,
    register,
    formState: { errors },
  } = useFormContext<EmailFormData>();
  return (
    <FormControl isInvalid={getFieldState(name).invalid} h={28}>
      <FormLabel>{name}</FormLabel>
      <Input {...register(name)} />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <FormErrorMessage>{message}</FormErrorMessage>}
      />
    </FormControl>
  );
};

export default FormInput;
