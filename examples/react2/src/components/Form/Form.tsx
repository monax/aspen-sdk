import {
  Button,
  Card,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import type { SchemaOf } from "yup";
import { FormProvider, get, useForm } from "react-hook-form";
import { getNotificationsFormSchema } from "./schema";
import { EmailFormData } from "./types";
import { ErrorMessage } from "@hookform/error-message";
import FormInput from "../FormInput";

const Form = () => {
  const methods = useForm<EmailFormData>({
    resolver: yupResolver<SchemaOf<EmailFormData>>(
      getNotificationsFormSchema()
    ),
    defaultValues: {
      email: "",
      confirmEmail: "",
    },
    reValidateMode: "onSubmit",
  });
  const query = new URLSearchParams({
    email: `${"email"}`,
  });
  const onSubmit = (data: EmailFormData) => {
    console.log(data);
    localStorage.setItem("email", data.email);
    const query = new URLSearchParams({
      email: `${data.email}`,
    });
    axios.post(`/api/pay-with-fiat?${query.toString()}`);
    // methods.reset({
    //   email: "",
    //   confirmEmail: "",
    // });
  };

  return (
    <Card p={6} w={96}>
      <form
        id="mintToken"
        action={`/api/pay-with-fiat?${query.toString()}`}
        method="POST"
      >
        <FormProvider {...methods}>
          <FormInput name="email" />
          <FormInput name="confirmEmail" />
          <Button
            type="submit"
            size="lg"
            colorScheme="teal"
            variant="solid"
            textTransform="uppercase"
            w="100%"
          >
            submit
          </Button>
        </FormProvider>
      </form>
    </Card>
  );
};

export default Form;
