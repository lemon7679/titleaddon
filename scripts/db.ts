import { world } from "@minecraft/server";

export function saveData(varname: string, value: number | object | string | boolean) {
    const mkValue = JSON.stringify(value);
    world.setDynamicProperty(varname, mkValue);
}

export function readData(varname: string): object | string | undefined {
    try {
        const getValue = world.getDynamicProperty(varname);
        if ( world.getDynamicProperty(varname) == undefined) {
            return undefined
        }
        return JSON.parse(`${getValue}`);
    } catch (error) {
        
        return `${world.getDynamicProperty(varname)}`;
    }
}
