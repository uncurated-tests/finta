import { functionWrapper, plaid, Sentry, logsnag } from "../_lib";
import { HttpStatusCodes, ErrorResponseMessages, ExchangePlaidPublicTokenRequest, ExchangePlaidPublicTokenResponse } from "../_lib/types";

export default functionWrapper.client(async (req: ExchangePlaidPublicTokenRequest, user) => {
  const transaction = Sentry.startTransaction({ op: "app function", name: "Exchange public token" });
  const scope = new Sentry.Scope();
  scope.setUser({ id: user.id });
  scope.setContext("Request Body", req.body);

  const { publicToken, plaidEnv } = req.body;

  return plaid.exchangePublicToken({ publicToken, env: plaidEnv as plaid.PlaidEnv })
  .then(response => ({ status: HttpStatusCodes.OK, message: response.data } as ExchangePlaidPublicTokenResponse ))
  .catch(async error => {
    await logsnag.logError({ operation: 'exchange public token', error, scope, tags: { [logsnag.LogSnagTags.USER_ID]: user.id }})
    return { status: HttpStatusCodes.INERNAL_ERROR, message: ErrorResponseMessages.INERNAL_ERROR }
  })
  .finally(() => transaction.finish())
})
