import { functionWrapper, plaid, Sentry } from "../_lib";
import { ErrorResponseMessages, HttpStatusCodes, GetPlaidAccountsRequest, GetPlaidAccountsResponse } from "../_lib/types";

export default functionWrapper.client(async (req: GetPlaidAccountsRequest, user) => {
  const transaction = Sentry.startTransaction({ op: "app function", name: "Get Plaid accounts" });
  const scope = new Sentry.Scope();
  scope.setContext("Request Body", req.body);
  scope.setUser({ id: user.id });
  const { accessToken } = req.body;
  const response = await plaid.getAccounts({ accessToken })
  .catch(err => {
    if ( err.response.data?.error_code === 'ITEM_LOGIN_REQUIRED' ) {
      // TODO: Send back to client
      return null;
    }
    scope.setContext("Plaid error response", err.response.data);
    Sentry.captureException(new Error("Get Plaid Item error"), scope);
  });

  transaction.finish();

  if ( !response ) {
    return { status: HttpStatusCodes.INERNAL_ERROR, message: ErrorResponseMessages.INERNAL_ERROR }
  }

  return { status: HttpStatusCodes.OK, message: { accounts: response.data.accounts }} as GetPlaidAccountsResponse
})