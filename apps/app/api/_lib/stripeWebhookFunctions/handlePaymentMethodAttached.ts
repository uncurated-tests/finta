import Stripe from "stripe";

import * as stripe from "../../../../../functions/_lib/stripe";
import * as segment from "../segment";

export const handlePaymentMethodAttached = async ({ paymentMethod, timestamp }: { paymentMethod: Stripe.PaymentMethod, timestamp: Date }) => {
  const { customer: customerId } = paymentMethod
  if ( !customerId ) { return; };

  const userId = await stripe.getCustomerUserId({ customerId: customerId.toString() });
  if ( !userId ) { return; }

  await segment.identify({
    userId,
    traits: { has_payment_method: true },
    timestamp
  })
}