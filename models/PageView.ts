import { formatDate } from "../pages/_app";
import { generateUniqueID } from "../globalFunctions";

export default class PageView {
  [key: string]: any;

  constructor(pageViewObj: {
    date?: any,
    id?: string,
    ID?: string,
    url?: string,
    device?: any,
    uid?: string,
    uuid?: string,
    browser?: any,
    location?: any,
    timestamp?: any,
    ipAddress?: any,
    referrerURL?: any,
    dateNoSpaces?: any,
    uniqueIndex?: number,
    browserLanguage?: any,
    browserTimezone?: any,
    screenResolution?: any,
  }) {
    Object.assign(this, pageViewObj);

    if (this?.uniqueIndex == undefined) this.uniqueIndex = 1;
    if (this?.timestamp == undefined) this.timestamp = new Date();
    if (this?.date == undefined) this.date = formatDate(this?.timestamp);
    if (this?.dateNoSpaces == undefined) this.dateNoSpaces = formatDate(this?.timestamp, `timezoneNoSpaces`);

    if (this?.ipAddress == undefined) this.ipAddress = `::1`;
    if (this?.url == undefined) this.url = window.location.href;
    if (this?.referrerURL == undefined) this.referrerURL = document?.referrer;
    if (this?.device == undefined) this.device = /Mobi|Android/i?.test(navigator?.userAgent) ? `Mobile` : `Desktop`;
    if (this?.browserTimezone == undefined) this.browserTimezone = Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone;
    if (this?.screenResolution == undefined) this.screenResolution = `${window.screen.width} x ${window.screen.height}`;
    if (this?.browserLanguage == undefined) this.browserLanguage = (navigator as any)?.language || (navigator as any)?.userLanguage;
    if (this?.location == undefined) this.location = this?.browserTimezone?.split(`/`)[0] || Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone?.split(`/`)[0];
    if (this?.browser == undefined) this.browser = (navigator as any)?.userAgentData?.brands?.find(brand => brand?.brand)?.brand || (navigator as any)?.userAgent;
    
    if (this?.ID == undefined || this?.uuid == undefined || this?.uid == undefined || this?.id == undefined) {
      this.uuid = generateUniqueID();
      this.uid = this?.uuid;
      this.ID = `${this?.uniqueIndex} New Page View ${this.date} ${this.uuid}`;
      this.id = `${this?.uniqueIndex}_New_Page_View_${this.dateNoSpaces}_${this.uuid}`;
    }
  }
}