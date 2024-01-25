import { capWords, formatDate, generateUniqueID } from "../pages/_app";

const formatDateFromFirebase = (timestamp) => {
  let date;
  if (typeof timestamp === `number`) {
    date = new Date(timestamp * 1000);
  } else {
    date = new Date(timestamp);
  }
  date.setHours(date.getHours() - 5);
  const options = { weekday: `short`, year: `numeric`, month: `short`, day: `numeric`, hour: `2-digit`, minute: `2-digit`, second: `2-digit`, hour12: true };
  const formattedDate = date.toLocaleString(`en-US`, options);
  return `${formattedDate} EST`;
}

export default class User {
  [key: string]: any;

  constructor(userObj: {
    uid: string,
    email: string,
    providerId: string,
    emailVerified: boolean,

    auth?: any,
    ID?: string,
    id?: string,
    name?: string,
    type?: string,
    uuid?: string,
    created?: any,
    updated?: any,
    roles?: any[],
    image?: string,
    createdAt?: any,
    updatedAt?: any,
    source?: string,
    active?: boolean,
    lastSignIn?: any,
    validSince?: any,
    lastRefresh?: any,
    lastUpdated?: any,
    password?: string,
    firebaseUser?: any,
    creationTime?: any,
    passwordHash?: any,
    properties?: number,
    uniqueIndex: number,
    playerUUID?: string,
    lastRefreshAt?: any,
    playerLink?: boolean,
    lastSignInTime?: any,
    userCredential?: any,
    operationType?: string,
    passwordUpdatedAt?: any,
    currentDateTimeStamp?: any,
    currentDateTimeStampNoSpaces?: any,
  }) {
    Object.assign(this, userObj);

    if (this.uniqueIndex == undefined) this.uniqueIndex = 1;
    if (this.type == undefined) this.type = capWords(this.providerId);
    if (this.source == undefined) this.source = this.type;
    if (this.currentDateTimeStamp == undefined) this.currentDateTimeStamp = formatDate(new Date());
    if (this.currentDateTimeStampNoSpaces == undefined) this.currentDateTimeStampNoSpaces = formatDate(new Date(), `timezoneNoSpaces`);
    if (this.updated == undefined) this.updated = this.currentDateTimeStamp;
    if (this.lastUpdated == undefined) this.lastUpdated = this.currentDateTimeStamp;
    if (this.creationTime == undefined) this.creationTime = this.metadata && this.metadata?.creationTime;
    if (this.created == undefined) this.created = formatDateFromFirebase(this.creationTime);
    if (this.lastSignInTime == undefined) this.lastSignInTime = this.metadata && this.metadata?.lastSignInTime;
    if (this.lastSignIn == undefined) this.lastSignIn = formatDateFromFirebase(this.lastSignInTime);
    if (this.lastRefreshAt == undefined) this.lastRefreshAt = this.reloadUserInfo && this.reloadUserInfo?.lastRefreshAt;
    if (this.lastRefresh == undefined) this.lastRefresh = formatDateFromFirebase(this.lastRefreshAt);
    if (this.validSince == undefined) this.validSince = formatDateFromFirebase(this.reloadUserInfo && this.reloadUserInfo?.validSince);

    if (this.name == undefined) {
      this.name = capWords(this.email.split(`@`)[0]);
      this.displayName = capWords(this.email.split(`@`)[0]);
    }

    if (this.uuid == undefined) {
      this.uuid = `${this.uid}_${generateUniqueID()}`;
      this.ID = `${this.uniqueIndex} User ${this.name} ${this.currentDateTimeStamp} ${this.uuid}`;
      this.id = `${this.uniqueIndex}_User_${this.name}_${this.currentDateTimeStampNoSpaces}_${this.uuid}`;
    }

    if (this.roles == undefined) {
      this.roles = [`User`];
    }

    if (this.type == `Google`) {
      this.image = this.photoURL;
    } else {
      if (this.passwordHash == undefined) this.passwordHash = this.reloadUserInfo && this.reloadUserInfo?.passwordHash;
      if (this.passwordUpdatedAt == undefined) this.passwordUpdatedAt = this.reloadUserInfo && this.reloadUserInfo?.passwordUpdatedAt;
    }
  }
}