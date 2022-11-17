import { Users, Plaid_Items, Plaid_Institutions, Destinations, Sync_Logs, UserProfiles } from "../graphql/sdk";

type GetDBColumns<T extends object> = {
  [K in keyof T]: T[K] extends string | boolean | number | object ? K : never
}[keyof T]

export type DBUser = Omit<Pick<Users, NonNullable<GetDBColumns<Users>>>, 'displayName' | 'createdAt'> & {
  display_name: string;
  created_at: any
}

export type DBPlaidItem = Pick<Plaid_Items, NonNullable<GetDBColumns<Plaid_Items>>>;

export type DBPlaidInstitution = Pick<Plaid_Institutions, NonNullable<GetDBColumns<Plaid_Institutions>>>

export type DBDestination = Pick<Destinations, NonNullable<GetDBColumns<Destinations>>>

export type DBSyncLog = Pick<Sync_Logs, NonNullable<GetDBColumns<Sync_Logs>>>;

export type DBUserProfile = Pick<UserProfiles, GetDBColumns<UserProfiles>>

type DBObjects = DBUser | DBPlaidItem | DBPlaidInstitution | DBDestination | DBSyncLog | DBUserProfile;

type AdminSessionVariables = {
  "x-hasura-role": "admin"
}

type UserSessionVariables = {
  "x-hasura-role": 'user';
  "x-hasura-user-is-anonymous": boolean;
  "x-hasura-user-id": string;
}

type SessionVariables = AdminSessionVariables | UserSessionVariables;

export interface DBEventPayload<O extends 'INSERT' | 'UPDATE' | 'DELETE' = any, T = any> {
  event: {
    session_variables: SessionVariables;
    op: O,
    data: {
      old: T extends DBObjects ? (O extends 'UPDATE' | 'DELETE' ? T : null) : any;
      new: T extends DBObjects ? (O extends 'INSERT' | 'UPDATE' ? T : null) : any;
    }
  };
  created_at: string;
  id: string;
  delivery_info: {
    max_retries: number;
    current_retry: number;
  };
  trigger: {
    name: 'on_update_user' | 
          'on_insert_plaid_item' | 'on_insert_plaid_institution' | 
          'on_insert_destination' | 'on_update_destination' | 
          'on_delete_plaid_item' | 'on_insert_user' | 'on_upsert_sync_log' | 'handleUpsertUserProfle' | 'handelDeleteUserProfile';
  }
  table: {
    schema: string;
    name: string;
  }
}