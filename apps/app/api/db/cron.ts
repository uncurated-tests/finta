import { functionWrapper, cronFunctions, logsnag, Sentry } from "../_lib";
import { HttpStatusCodes, ErrorResponseMessages } from "../_lib/types";

type CronEvent = 'insights';

export default functionWrapper.public(async (req) => {
  const transaction = Sentry.startTransaction({ op: "cron function", name: "Database Cron Event" });
  const scope = new Sentry.Scope();
  scope.setContext("Request Body", req.body);
  const { name } = req.body as { name: CronEvent };

  try {
    switch ( name ) {
      case 'insights': {
        await cronFunctions.insights();
        break;
      }
      default:
        throw new Error(`Unhandled cron event ${name}.`)
    }

    return { status: HttpStatusCodes.OK, message: 'OK' }
  } catch (error) {
    await logsnag.logError({ error, operation: "Database Cron Event", scope })
    return { status: HttpStatusCodes.INERNAL_ERROR, message: ErrorResponseMessages.INERNAL_ERROR }
  } finally { transaction.finish(); }
})