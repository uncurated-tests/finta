import * as coda from "@codahq/packs-sdk";
import { schemaAttribution } from "./attribution";

export const InstitutionSchema = coda.makeObjectSchema({
  properties: {
    institutionId: {
      description: "The ID of the institution",
      type: coda.ValueType.String,
      required: true
    },
    name: {
      description: "The name of the banking institution",
      type: coda.ValueType.String,
      required: true
    },
    lastUpdate: {
      description: "The last tiem Finta received new data for this institution",
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      required: false
    },
    createdAt: {
      description: "When the institution was created in Finta",
      type: coda.ValueType.String,
      codaType: coda.ValueHintType.DateTime,
      required: false,
    },
    error: {
      description: "Indicates if the institution has an error that needs to be resolved",
      type: coda.ValueType.String,
      required: false
    }
  },

  idProperty: "institutionId",
  displayProperty: "name",
  attribution: schemaAttribution,
  identity: {
    name: "Institution",
  },
  featuredProperties: [ "lastUpdate", "error" ],
});

export const InstitutionReferenceSchema = coda.makeReferenceSchemaFromObjectSchema(InstitutionSchema)