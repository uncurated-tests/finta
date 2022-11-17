import { disablePlaidItem } from "../disablePlaidItem";
import * as segment from "../segment";
import { PlaidItemModel, SegmentEventNames } from "../../../../../functions/_lib/types";

export const handleUserPermissionRevoked = async ({ item }: { item: PlaidItemModel; }) => {
  await disablePlaidItem(item)
  .then(() => {
    return segment.track({
      userId: item.user.id,
      event: SegmentEventNames.INSTITUTION_CONSENT_REVOKED,
      properties: { provider: 'plaid', institution: item.institution.name }
    })
  })
}