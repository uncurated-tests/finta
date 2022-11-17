import { DestinationModel } from "../../types";
import { OauthDestination } from "../../types/shared";

export const destination = ({ destination }: { destination: DestinationModel }): OauthDestination => ({
  id: destination.id,
  name: destination.name
})