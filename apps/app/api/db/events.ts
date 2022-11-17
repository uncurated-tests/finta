import { dbEventFunctions, functionWrapper, Sentry } from "../_lib";
import { DBEventPayload, HttpStatusCodes, ErrorResponseMessages } from "../_lib/types";

export default functionWrapper.public(async (req) => {
  const body = req.body as DBEventPayload;

  const transaction = Sentry.startTransaction({ op: "database event", name: body.trigger.name });
  const scope = new Sentry.Scope();
  scope.setContext("Request Body", req.body);

  const response = await dbEventFunctions[body.trigger.name]({ body })
  .then(() => {
    return { status: HttpStatusCodes.OK, message: "OK" }
  })
  .catch(err => {
    Sentry.captureException(err, scope);
    return { status: HttpStatusCodes.INERNAL_ERROR, message: ErrorResponseMessages.INERNAL_ERROR }
  })

  transaction.finish();
  return response;
})