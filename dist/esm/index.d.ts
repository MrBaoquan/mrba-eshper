/**
 * target 不为null并且不为undefined 时返回 true
 * @param target 目标
 */
declare function isset(target: any): boolean;
/**
 * 格式字符串
 * @example
 * FormatString("hello {0}", "world"); output: hello world
 * @param str
 * @param args
 */
declare function FormatString(str: string, ...args: any[]): string;
/**
 * 调用函数 基于反射 Reflect.apply
 * @param func 函数实体
 * @param thisArgument 回调 function的this参数
 * @param args 参数列表
 */
declare function CallFunction(func: Function, thisArgument?: any, ...args: any[]): any;
/**
 * 调用对象上的某个方法
 * @param target 对象
 * @param func 方法名称
 * @param args 参数列表
 */
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
    private static logable;
    static Enable(): void;
    static Disable(): void;
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
export { isset, FormatString, CallFunction, ParallelForEach, Logger, SINGLETON_KEY, Singleton, singleton };
