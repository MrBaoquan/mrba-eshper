declare function FormatString(str: string, ...args: any[]): string;
declare function CallFunction(func: Function, thisArgument?: any, ...args: any[]): any;
declare function CallFunction(target: object, func: string, ...args: any[]): any;
/**
 *
 * @param arr 被迭代的数组
 * @param callback 迭代的元素key, 用于标记完成的finishStep
 * @param onFinished 遍历结束回调
 */
declare function ParallelForEach<T>(arr: Array<T>, callback: (key: T, finishStep: Function) => void, onFinished: Function): void;
type LogAction = (...args: any[]) => void;
declare class Logger {
    private static info;
    private static warn;
    private static error;
    static Register(params: {
        info?: LogAction;
        warn?: LogAction;
        error?: LogAction;
    }): void;
    static Log(message?: any, ...optionalParams: any[]): void;
    static Warn(message?: any, ...optionalParams: any[]): void;
    static Error(message?: any, ...optionalParams: any[]): void;
    /**
     * examples
     */
    private static doLogger;
}
declare const SINGLETON_KEY: unique symbol;
type Singleton<T extends new (...args: any[]) => any> = T & {
    [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never;
};
declare const singleton: <T extends new (...args: any[]) => any>(classTarget: T) => T;
declare function isset(target: any): boolean;
export { FormatString, CallFunction, ParallelForEach, Logger, SINGLETON_KEY, Singleton, singleton, isset };
