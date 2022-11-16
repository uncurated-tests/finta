interface PageProperties {

}

interface UserTraits {

}

interface EventProperties {

}

export enum EventNames {

}

export enum PageNames {
  SIGN_UP = 'Sign Up'
}

export interface AliasParams {
  userId: string;
}

export interface PageParams {
  name: PageNames;
  properties?: PageProperties
}

export interface TrackParams {
  event: EventNames;
  properties?: EventProperties;
}

export interface IdentifyParams {
  userId: string;
  traits?: UserTraits;
}