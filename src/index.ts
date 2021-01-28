export * from "./utils/ESUtils";
export * from "./utils/Logger"
export * from "./utils/Singleton"

export function isset(target:any):boolean{
    return target!==null&&target!==undefined;
}