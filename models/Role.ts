export default class Role {
  [key: string]: any;
  constructor(
    public level: any,
    public name: string,
    public promoted: string,
    public lastUpdatedBy?: any,
    public description?: string,
    public dateUpdated?: string,
    public dateAdded?: string,
  ) {
    this.name = name;
    this.level = level;
    this.promoted = promoted;
    this.dateAdded = dateAdded;
    this.dateUpdated = dateUpdated;
    this.description = description;
    this.lastUpdatedBy = lastUpdatedBy;
  }
}