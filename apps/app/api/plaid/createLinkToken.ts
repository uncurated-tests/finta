import { functionWrapper, plaid, Sentry, logsnag } from "../_lib";
import { HttpStatusCodes, ErrorResponseMessages, GetPlaidLinkTokenRequest, GetPlaidLinkTokenResponse } from "../_lib/types";

export default functionWrapper.client(async (req: GetPlaidLinkTokenRequest, user) => {
  const transaction = Sentry.startTransaction({ op: "app function", name: "Create Link Token" });
  const scope = new Sentry.Scope();
  scope.setContext("Request Body", req.body);
  scope.setUser({ id: user.id });

  const { accessToken, products, redirectUri, plaidEnv } = req.body;
  const webhookURL = `${process.env.VERCEL_URL}/api/plaid/webhook`;

  return plaid.createLinkToken({
    userId: user.id,
    products,
    accessToken,
    webhookURL,
    redirectUri,
    env: plaidEnv as plaid.PlaidEnv
  })
  .then(response => ({ status: HttpStatusCodes.OK, message: response.data } as GetPlaidLinkTokenResponse))
  .catch(async error => {
    await logsnag.logError({ operation: 'create link token', error, scope, tags: { [logsnag.LogSnagTags.USER_ID]: user.id }})
    return { status: HttpStatusCodes.INERNAL_ERROR, message: ErrorResponseMessages.INERNAL_ERROR }
  })
  .finally(() => transaction.finish())
})
