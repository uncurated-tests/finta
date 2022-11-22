import * as coda from "@codahq/packs-sdk";
import { AccountReferenceSchema } from "./accounts";
import { schemaAttribution } from "./attribution";

export const InvestmentHoldingSchema = coda.makeObjectSchema({
  properties: {
    investmentHoldingId: {
      description: "An ID generated to identify this holding",
      type: coda.ValueType.String,
      required: true
    },
    name: {
      description: "The security symbol or name related to this holding (whichever one is available)",
      type: coda.ValueType.String,
      required: true
    },
    costBasis: {
      description: "The cost basis of the holding",
      type: coda.ValueType.Number,
      precision: 2,
      useThousandsSeparator: true,
      required: false
    },
    currency: {
      description: "The currency of the cost basis",
      type: coda.ValueType.String,
      required: false
    },
    quantity: {
      description: "The total quantity of the asset held",
      type: coda.ValueType.Number,
      precision: 4,
      useThousandsSeparator: true,
      required: true
    },
    closePrice: {
      description: "The latest close price for the security",
      type: coda.ValueType.Number,
      precision: 2,
      useThousandsSeparator: true,
      required: false
    },
    symbol: {
      description: "The security's trading symbol",
      type: coda.ValueType.String,
      required: false
    },
    securityName: {
      description: "The name of the security",
      type: coda.ValueType.String,
      required: false
    },
    securityType: {
      description: "The security type of the holding",
      type: coda.ValueType.String,
      required: false
    },
    account: AccountReferenceSchema,
  },
  idProperty: "investmentHoldingId",
  displayProperty: "name",
  attribution: schemaAttribution,
  identity: {
    name: "InvestmentHolding"
  },
  featuredProperties: ["costBasis", "currency", "quantity", "closePrice", "symbol", "securityName", "securityType", "account"]
});