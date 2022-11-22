import * as coda from "@codahq/packs-sdk";
import { schemaAttribution } from "./attribution";
import { InstitutionReferenceSchema } from "./institutions";

export const AccountSchema = coda.makeObjectSchema({
  properties: {
    accountId: {
      description: "The ID of the account",
      type: coda.ValueType.String,
      required: true
    },
    name: {
      description: "The name of the account",
      type: coda.ValueType.String,
      required: true
    },
    mask: {
      description: "The last 2-4 alphanumeric characters of the account's official account number",
      type: coda.ValueType.String,
      required: false
    },
    type: {
      description: "The type of the account",
      type: coda.ValueType.String, // TODO: Make these select list column type when Coda makes functionality available
      required: true
    },
    subtype: {
      description: "The subtype of the account",
      type: coda.ValueType.String,
      required: false
    },
    availableBalance: {
      description: "The amount of available funds for the account including pending transactions",
      type: coda.ValueType.Number,
      precision: 2,
      useThousandsSeparator: true,
      required: false
    },
    currentBalance: {
      description: "The balance of the account not including pending transactions",
      type: coda.ValueType.Number,
      precision: 2,
      useThousandsSeparator: true,
      required: false
    },
    limit: {
      description: "The credit limit (for credit accounts)",
      type: coda.ValueType.Number,
      precision: 2,
      useThousandsSeparator: true,
      required: false
    },
    currency: {
      description: "The currency used by the account",
      type: coda.ValueType.String,
      required: false
    },
    interestRate: {
      description: "The account's interest rate (for debt accounts)",
      type: coda.ValueType.Number,
      codaType: coda.ValueHintType.Percent,
      precision: 2,
      required: false
    },
    lastPaymentAmount: {
      description: "The amount of the last payment. (for debt accounts)",
      type: coda.ValueType.Number,
      precision: 2,
      useThousandsSeparator: true,
      required: false
    },
    lastPaymentDate: {
      description: "The date of the last payment. (for debt accounts)",
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.Date,
      required: false
    },
    nextPaymentDueDate: {
      description: "The due date for the next payment.(for debt accounts)",
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.Date,
      required: false
    },
    lastStatementBalance: {
      description: "The total amount owed as of the last statement issued (for credit accounts)",
      type: coda.ValueType.Number,
      precision: 2,
      useThousandsSeparator: true,
      required: false
    },
    minimumPaymentAmount: {
      description: "The minimum payment due for the next billing cycle. (for debt accounts)",
      type: coda.ValueType.Number,
      precision: 2,
      useThousandsSeparator: true,
      required: false
    },
    nextMonthlyPayment: {
      description: "The amount of the next payment. (for mortgage accounts)",
      type: coda.ValueType.Number,
      precision: 2,
      useThousandsSeparator: true,
      required: false
    },
    originationDate: {
      description: "The date on which the loan was initially lent. (for loan accounts)",
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.Date,
      required: false
    },
    originationPrincipalAmount: {
      description: "The original principal balance of the (for loan accounts)",
      type: coda.ValueType.Number,
      precision: 2,
      useThousandsSeparator: true,
      required: false
    },
    institution: InstitutionReferenceSchema,
  },
  idProperty: "accountId",
  displayProperty: "name",
  attribution: schemaAttribution,
  identity: {
    name: "Account"
  },
  featuredProperties: ["type", "subtype", "availableBalance", "currentBalance", "currency", "limit", "interestRate", "institution"]
});

export const AccountReferenceSchema = coda.makeReferenceSchemaFromObjectSchema(AccountSchema)