export default class Command {
  [key: string]: any;
  constructor(commandObj: {
    id?: any,
    uuid?: any,
    name?: string,
    icon?: string,
    label?: string,
    command?: string,
    example?: string,
    triggers?: string[],
    description?: string,
    shortDescription?: string,
  }) {
    Object.assign(this, commandObj);
  }
}