import Stripe from "stripe";
import { graphql } from "./graphql";

export const getCustomerUserId = async ({ customerId }: { customerId: string }) => {
  const customer = await getCustomer({ customerId }).then(response => response as Stripe.Customer);
  const userId = customer.metadata.user_id;

  if (!userId) { throw new Error(`Customer ${customerId} does not have a user ID`)}
  return userId
}


// OLD



export const getSubscription = ({ subscriptionId }: { subscriptionId: string }) => client.subscriptions.retrieve(subscriptionId);

export const getCustomerSubscription = ({ customerId }: { customerId: string }) => client.subscriptions.list({
  status: 'all',
  customer: customerId,
  limit: 1
}).then(async response => {
  const subscription = response.data[0];
  return subscription
});

export const cancelSubscription = ({ subscriptionId }: { subscriptionId: string }) => client.subscriptions.update(subscriptionId, { cancel_at_period_end: true });

export const startSubscription = async ({ customerId }: { customerId: string }) => {
  const subscription = await client.subscriptions.create({
    customer: customerId,
    items: [{ price:process.env.STRIPE_DEFAULT_PRICE }],
    trial_period_days: 14
  });

  return subscription;
}

export const getProduct = async (productId: string) => client.products.retrieve(productId)

export const getInvoices = (props: Stripe.InvoiceListParams) =>
  client.invoices.list(props)

export const getLifetimeRevenue = (customerId: string) =>
  client.invoices.list({
    customer: customerId,
    status: 'paid'
  })
  .then(response => {
    const { data } = response;
    return data.reduce((total, invoice) => total + (invoice.amount_due / 100), 0)
  })

  export const getPrices = (productId?: string) =>
    client.prices.list({
      active: true,
      product: productId,
      type: 'recurring'
    })
    .then(response => response.data)