/**
 * target 不为null并且不为undefined 时返回 true
 * @param target 目标
 */
export function isset(target:any):boolean{
    return target!==null&&target!==undefined;
}

/**
 * 格式字符串
 * @example
 * FormatString("hello {0}", "world"); output: hello world
 * @param str 
 * @param args 
 */
export function FormatString(str:string,...args:any[]){
    return args.reduce((str:string,_arg,_index)=>str.replace(`{${_index}}`,_arg),str);
}

/**
 * 调用函数 基于反射 Reflect.apply
 * @param func 函数实体
 * @param thisArgument 回调 function的this参数
 * @param args 参数列表
 */
export function CallFunction(func:Function, thisArgument?:any, ...args:any[]):any;
/**
 * 调用对象上的某个方法
 * @param target 对象
 * @param func 方法名称
 * @param args 参数列表
 */
export function CallFunction(target:object, func:string, ...args:any[]):any;
export function CallFunction(target:object|Function,  thisOrFunc:string|undefined, ...args:any[]):any{
    if(!isset(target)) return null;
    if(typeof target==='function'){
        return Reflect.apply(<Function>target,thisOrFunc,args);
    }else if(typeof target==='object'){
        let _func = Reflect.get(target,thisOrFunc!,args);
        if(!isset(_func)) return;
        return CallFunction(<Function>_func,target,...args);
    }
    return null;
}

/**
 * 
 * @param arr 被迭代的数组
 * @param callback 迭代的元素key, 用于标记完成的finishStep
 * @param onFinished 遍历结束回调
 */
export function ParallelForEach<T>(arr:Array<T>, callback:(key:T,finishStep:Function)=>void, onFinished:Function){
    let _iteratorCount = 0;
    let _func = ()=>{
        if(++_iteratorCount>=arr.length)
            onFinished();
    };
    for(let _key of arr){
        callback(_key,_func);
    }
}
