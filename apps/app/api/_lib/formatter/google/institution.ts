import { PlaidItemModel } from "../../types"
import { TableConfigFields, InstitutionsTableFields } from "../../types/shared";

export const institution = ({ item, lastUpdate, headerValues, tableConfigFields }: { 
  item: PlaidItemModel;
  lastUpdate: string;
  headerValues: string[];
  tableConfigFields: Record<TableConfigFields, string> | {}
}) => {
  const formattedItem = {
    [InstitutionsTableFields.ID]: item.id,
    [InstitutionsTableFields.NAME]: item.institution.name,
    [InstitutionsTableFields.ERROR]: item.error || "",
    [InstitutionsTableFields.LAST_UPDATE]: lastUpdate
  };

  const userFieldMapping = Object.entries(tableConfigFields).reduce((allFields, [ tableConfigField, userDefinedField ]) => ({
    ...allFields,
    [userDefinedField]: formattedItem[tableConfigField]
  }), {} as Record<string, string>);

  return headerValues.map(headerValue => userFieldMapping[headerValue] || undefined)
}