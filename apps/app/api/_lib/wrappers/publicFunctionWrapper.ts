import { Request, Response } from "express";
import { WrappedPublicFunction } from "../types";
import { Sentry } from "../sentry";

export const publicFunctionWrapper = (fn: WrappedPublicFunction) => async (req: Request, res: Response) => {
  const transaction = Sentry.startTransaction({ op: "wrapper", name: "public function"});

  const { status, message } = await fn(req)
  .catch(err => {
    Sentry.captureException(err);
    return { status: 500, message: "Internal Error" }
  })
  
  transaction.finish();
  await Sentry.flush(1000);
  return res.status(status).send(message);
}