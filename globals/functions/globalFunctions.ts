import { userRoles } from "../globals";

export const generateID = () => {
  let id = Math.random().toString(36).substr(2, 9);
  return Array.from(id).map(char => {
    return Math.random() > 0.5 ? char.toUpperCase() : char;
  }).join(``);
}

export const generateUniqueID = (existingIDs?: string[]) => {
  let newID = generateID();
  if (existingIDs && existingIDs.length > 0) {
    while (existingIDs.includes(newID)) {
      newID = generateID();
    }
  }
  return newID;
}

export const removeTrailingZeroDecimal = (number, decimalPlaces = 1) => {
  let num = typeof number == `string` ? parseFloat(number) : number;
  const wholeNumber = Math.trunc(num);
  const decimalPart = num - wholeNumber;
  if (decimalPart === 0) {
    return wholeNumber;
  } else {
    return num.toFixed(decimalPlaces);
  }
}

export const checkUserRole = (wRoles, role) => {
  if (!wRoles) return false;
  let userRolesList = !Array.isArray(wRoles) && wRoles?.roles ? wRoles?.roles : wRoles;
  if (userRolesList && Array.isArray(userRolesList)) {
    let roleLevel = role;
    if (typeof role == `string`) roleLevel = userRoles[role]?.level; 
    else if (Object.keys(role).length > 0) roleLevel = role.level;
    let rolesAsStrings = userRolesList.some(userRole => typeof userRole == `string`);
    let userHasMinimumRole = rolesAsStrings ? userRolesList.some(rol => userRoles[rol]?.level >= roleLevel) : userRolesList.some(userRole => userRole?.level >= roleLevel);
    return userHasMinimumRole;
  }
}