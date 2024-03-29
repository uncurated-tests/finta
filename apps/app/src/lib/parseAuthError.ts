import { ErrorPayload } from "@nhost/core";

export const parseAuthError = (error: ErrorPayload ) => {
  const { message } = error!;

  let response = { field: "", message: "", code: "" }

  switch (message) {
    case "Incorrect email or password":
      response = { field: "password", message: "Incorrect credentials", code: "incorrect_credentials"};
      break;
    case "Email already in use":
      response = { field: "email", message: "Account already exists", code: "email_conflict" };
      break;
    case 'Error validating request body. "email" must be a valid email.':
      response = { field: "email", message: "Invalid email", code: "invalid_email" };
      break;
    default:
      console.log(message);
  } 

  return response;
}