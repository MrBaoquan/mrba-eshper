import moment from 'moment';

function FormatString(str, ...args) {
    return args.reduce((str, _arg, _index) => str.replace(`{${_index}}`, _arg), str);
}
function CallFunction(target, thisOrFunc, ...args) {
    if (typeof target === 'function') {
        console.log("call function...");
        console.log(args);
        return Reflect.apply(target, thisOrFunc, args);
    }
    else if (typeof target === 'object') {
        let _func = Reflect.get(target, thisOrFunc, args);
        if (_func === undefined)
            return;
        return CallFunction(_func, target, ...args);
    }
    return null;
}
/**
 *
 * @param arr 被迭代的数组
 * @param callback 迭代的元素key, 用于标记完成的finishStep
 * @param onFinished 遍历结束回调
 */
function ParallelForEach(arr, callback, onFinished) {
    let _iteratorCount = 0;
    let _func = () => {
        if (++_iteratorCount >= arr.length)
            onFinished();
    };
    for (let _key of arr) {
        callback(_key, _func);
    }
}

class Logger {
    static Register(params) {
        if (params.info)
            this.info = params.info;
        if (params.warn)
            this.warn = params.warn;
        if (params.error)
            this.error = params.error;
    }
    static Log(message, ...optionalParams) {
        Logger.doLogger(this.info, message, ...optionalParams);
    }
    static Warn(message, ...optionalParams) {
        Logger.doLogger(this.warn, message, ...optionalParams);
    }
    static Error(message, ...optionalParams) {
        Logger.doLogger(this.error, message, ...optionalParams);
    }
    /**
     * examples
     */
    static doLogger(action, message, ...optionalParams) {
        let _timePrefix = moment().format("YYYY-MM-DD HH:mm:ss.SSS") + ": ";
        if (typeof message === 'string')
            action(_timePrefix + message, ...optionalParams);
        else
            action(_timePrefix, message);
    }
}
Logger.info = console.log;
Logger.warn = console.warn;
Logger.error = console.error;

const SINGLETON_KEY = Symbol();
const singleton = (classTarget) => new Proxy(classTarget, {
    construct(target, argumentsList, newTarget) {
        // Skip proxy for children
        if (target.prototype !== newTarget.prototype) {
            return Reflect.construct(target, argumentsList, newTarget);
        }
        if (!target[SINGLETON_KEY]) {
            target[SINGLETON_KEY] = Reflect.construct(target, argumentsList, newTarget);
        }
        return target[SINGLETON_KEY];
    },
});

function isset(target) {
    return target !== null && target !== undefined;
}

export { CallFunction, FormatString, Logger, ParallelForEach, SINGLETON_KEY, isset, singleton };
//# sourceMappingURL=index.mjs.map
