import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { EmailFormData } from './Form/types';
import React from 'react'

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
