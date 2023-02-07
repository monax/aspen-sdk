import * as yup from "yup";
import { EmailFormData } from "./types";

export const getNotificationsFormSchema = () => {
  const schema: yup.SchemaOf<EmailFormData> = yup.object().shape({
    email: yup.string().email().required(),
    confirmEmail: yup
      .string()
      .oneOf([yup.ref("email"), null], "Emails must match").required(),
  });
  return schema;
};
