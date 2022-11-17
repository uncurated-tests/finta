import { disableUser, Sentry, functionWrapper } from "./_lib";

export default functionWrapper.public(async (req) => {
  const transaction = Sentry.startTransaction({ op: "webhook function", name: "Handle canceled subscription" });
  const scope = new Sentry.Scope();

  scope.setContext("Request Body", req.body);
  const { user_id } = req.body;
  scope.setUser({ id: user_id });

  await disableUser(user_id)
  .catch(err => {
    Sentry.captureException(err, scope);
  })

  transaction.finish();
  return { status: 200, message: "OK"}
});