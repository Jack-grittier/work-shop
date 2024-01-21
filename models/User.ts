import Role from "./Role";

export default class User {
  [key: string]: any;

  constructor(userObj: {
    ID: string,
    id: string,
    uid: string,
    type: string,
    uuid: string,
    created: any,
    updated: any,
    email: string,
    lastSignIn: any,
    validSince: any,
    lastRefresh: any,
    lastUpdated: any,
    providerId: string,
    playerLink: boolean,
    operationType: string,
    auth?: any,
    name: string,
    roles?: Role[],
    image?: string,
    source?: string,
    active?: boolean,
    password?: string,
    firebaseUser?: any,
    properties?: number,
    uniqueIndex: number,
    playerUUID?: string,
    userCredential?: any,
    emailVerified: boolean,
    passwordUpdatedAt?: any,
  }) {
    Object.assign(this, userObj);
  }
}