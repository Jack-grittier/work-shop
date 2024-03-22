import Role from "../models/Role";
import Action from "../models/Action";

export const userRoles = {
    User: {
        level: 1,
        name: `User`,
    } as Role,
    Mod: {
        level: 2,
        name: `Mod`,
    } as Role,
    Admin: {
        level: 3,
        name: `Admin`,
    } as Role,
    Developer: {
        level: 4,
        name: `Developer`,
    },
    Owner: {
        level: 5,
        name: `Owner`,
    } as Role,
}

export const productActions = {
    Cart: `Cart`,
    Details: `Details`,
    Add: {
        name: `Add`,
        label: `Add`,
        color: `green`,
        icon: `fa-plus`,
        doneLabel: `Added`,
        inProgressLabel: `Adding`,
    } as Action,
    Edit: {
        color: `blue`,
        name: `Edit`,
        label: `Edit`,
        icon: `fa-pen`,
        doneLabel: `Updated`,
        inProgressLabel: `Editing`,
    } as Action,
    Cancel: {
        color: `blue`,
        icon: `fa-ban`,
        name: `Cancel`,
        label: `Cancel`,
        doneLabel: `Canceled`,
        inProgressLabel: `Canceling`,
    } as Action,
    Navigate: {
        color: `green`,
        icon: `fa-tags`,
        name: `Details`,
        label: `Navigate`,
        doneLabel: `Navigated`,
        inProgressLabel: `Navigating`,
    } as Action,
    Archive: {
        color: `red`,
        name: `Archive`,
        label: `Archive`,
        icon: `fa-trash-alt`,
        doneLabel: `Archived`,
        inProgressLabel: `Archiving`,
    } as Action,
    Remove: {
        color: `red`,
        name: `Remove`,
        label: `Remove`,
        icon: `fa-trash-alt`,
        doneLabel: `Removed`,
        inProgressLabel: `Removing`,
    } as Action,
    Delete: {
        color: `red`,
        name: `Delete`,
        label: `Delete`,
        icon: `fa-trash-alt`,
        doneLabel: `Deleted`,
        inProgressLabel: `Deleting`,
    } as Action,
    AddToCart: {
        name: `Cart`,
        color: `pink`,
        label: `Add to Cart`,
        icon: `fa-shopping-cart`,
        doneLabel: `Added to Cart`,
        inProgressLabel: `Adding to Cart`,
    } as Action,
}