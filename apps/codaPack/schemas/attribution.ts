import * as coda from "@codahq/packs-sdk";

export const schemaAttribution = [
  {
    type: coda.AttributionNodeType.Text,
    text: "Provided by "
  },
  {
    type: coda.AttributionNodeType.Link,
    anchorText: "Finta",
    anchorUrl: "https://finta.io"
  },
  {
    type: coda.AttributionNodeType.Image,
    imageUrl: "https://app.finta.io/favicon.ico",
    anchorUrl: "https://finta.io"
  }
] as any;