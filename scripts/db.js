import { world } from "@minecraft/server";
export function saveData(varname, value) {
    const mkValue = JSON.stringify(value);
    world.setDynamicProperty(varname, mkValue);
}
export function readData(varname) {
    try {
        const getValue = world.getDynamicProperty(varname);
        if (world.getDynamicProperty(varname) == undefined) {
            return undefined;
        }
        return JSON.parse(`${getValue}`);
    }
    catch (error) {
        return `${world.getDynamicProperty(varname)}`;
    }
}
