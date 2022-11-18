import { functionWrapper, plaid, Sentry, logsnag, types } from "../_lib";

export default functionWrapper.client(async (req: types. GetPlaidLinkTokenRequest, user): Promise<types.GetPlaidLinkTokenResponse> => {
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
  .then(response => ({ status: types.StatusCodes.OK, message: response.data }))
  .catch(async error => {
    await logsnag.logError({ operation: 'create link token', error, scope, tags: { [logsnag.LogSnagTags.USER_ID]: user.id }})
    return { status: types.StatusCodes.INTERNAL_SERVER_ERROR, message: types.ErrorResponseMessages.INERNAL_ERROR }
  })
  .finally(() => transaction.finish())
})
