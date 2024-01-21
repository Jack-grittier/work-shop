import Play from "./Play";
import Role from "./Role";
import Level from "./Level";
import Experience from "./Experience";

export default class Player {
  [key: string]: any;

  constructor(playerObj: {
    id?: any,
    name?: string,
    level?: Level,
    plays?: Play[],
    properties?: number,
    expanded?: boolean,
    experience?: Experience,
    xpModifier?: number,
    ID?: any,
    uid?: any,
    uuid?: any,
    type?: any,
    label?: string,
    bio?: string,
    wins?: Play[],
    created?: any,
    updated?: any,
    roles?: Role[],
    disabled?: any,
    source?: any,
    active?: any,
    email?: string,
    kills?: number,
    image?: string,
    losses?: Play[],
    deaths?: number,
    kdRatio?: number,
    ratio?: number,
    providerId?: string,
    percentage?: any,
    playerLink?: any,
    preferences?: any,
    username?: string,
    lastUpdated?: any,
    password?: string,
    validSince?: any,
    lastSignIn?: any,
    lastRefresh?: any,
    emailVerified?: any,
    uniqueIndex?: number,
    lastUpdatedBy?: any,
    displayName?: string,
    description?: string,
    firebaseUserData?: any,
  }) {
    Object.assign(this, playerObj);
  }
}