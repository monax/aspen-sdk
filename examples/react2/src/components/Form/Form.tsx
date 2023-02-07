import { Button, Card } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import type { SchemaOf } from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { getNotificationsFormSchema } from "./schema";
import { EmailFormData } from "./types";
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
  const emailValue = methods.watch("email");

  const query = new URLSearchParams({
    email: `${emailValue}`,
  });

  // const onSubmit = async (data: EmailFormData) => {
  //   console.log(data);
  //   const query = new URLSearchParams({
  //     email: `agnieszkaskrobo`,
  //   });
  //   await fetch(`/api/pay-with-fiat?${query.toString()}`, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   });
  // };

  return (
    <Card p={6} w={96}>
      <form
        id="mintToken"
        // onSubmit={methods.handleSubmit(onSubmit)}
        action={`/api/pay-with-fiat?${query.toString()}`}
        method="post"
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
