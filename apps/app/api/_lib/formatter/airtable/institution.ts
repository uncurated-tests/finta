import { InstitutionsTableFields, TableConfigFields } from "@finta/types";
import { PlaidItemModel } from "../../types";

export const institution = {
  new: ({ item, tableConfigFields }: { item: PlaidItemModel, tableConfigFields: Record<TableConfigFields, string> | {} }) => {
    const formattedItem = {
      [InstitutionsTableFields.ID]: item.id,
      [InstitutionsTableFields.NAME]: item.institution.name
    };
  
    return Object.entries(tableConfigFields).reduce((allFields, [ tableConfigField, userDefinedField ]) => ({
      ...allFields,
      // eslint-disable-next-line
      [userDefinedField]: formattedItem[tableConfigField]
    }), {} as Record<string, string>);
  },
  updated: ({ lastUpdate, tableConfigFields }: { lastUpdate: Date; tableConfigFields: Record<TableConfigFields, string> | {} }) => {
    const formattedItem = {
      [InstitutionsTableFields.LAST_UPDATE]: lastUpdate
    }

    return Object.entries(tableConfigFields).reduce((allFields, [ tableConfigField, userDefinedField ]) => ({
      ...allFields,
      // eslint-disable-next-line
      [userDefinedField]: formattedItem[tableConfigField]
    }), {} as Record<string, string>);
  }
}
