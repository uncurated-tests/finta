import { graphql } from "../graphql";
import { Request, Response } from "express";
import * as crypto from "../crypto";
import { WrappedOauthFunction } from "../types";
import { Sentry } from "../sentry";

export const oauthFunctionWrapper = (fn: WrappedOauthFunction) => async (req: Request, res: Response) => {
  if ( req.method === 'OPTIONS' ) {
    return res.set('Access-Control-Allow-Origin', '*').send('ok');
  }

  const transaction = Sentry.startTransaction({ op: "wrapper", name: "client function"});

  const auth = req.headers['authorization'];
  if ( !auth ) { return res.status(500).send("Missing authorization header"); }
  let token: string;
  let tokenHash: string;
  try {
    token = auth.split(' ')[1]
    tokenHash = crypto.hash(token);
  } catch ( error ) {
    return res.status(500).send("Invalid authorization header");
  }

  const destination = await graphql.GetDestinations({ where: { authentication: { _contains: { access_token_hash: tokenHash }}}}).then(response => response.destinations[0]);

  if ( !destination ) { return res.status(500).send("Invalid token")}
  if ( !destination.user.stripe_data.has_app_access ) { return res.status(402)}

  const asAdmin = req.body.asAdmin;
  const authentication = destination.authentication || {};
  const plaidEnv = authentication.is_demo ? "sandbox" : process.env.PLAID_ENV as string;
  const { status, message } = await fn(req, destination, plaidEnv, asAdmin)
  .catch(err => {
    Sentry.captureException(err);
    return { status: 500, message: "Internal Error" }
  })

  transaction.finish();
  await Sentry.flush(1000);
  return res.status(status).send(message)
};