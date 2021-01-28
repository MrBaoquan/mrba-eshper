export function FormatString(str:string,...args:any[]){
    return args.reduce((str:string,_arg,_index)=>str.replace(`{${_index}}`,_arg),str);
}

export function CallFunction(func:Function, thisArgument?:any, ...args:any[]):any;
export function CallFunction(target:object, func:string, ...args:any[]):any;
export function CallFunction(target:object|Function,  thisOrFunc:string|undefined, ...args:any[]):any{
    if(typeof target==='function'){
        return Reflect.apply(<Function>target,thisOrFunc,args);
    }else if(typeof target==='object'){
        let _func = Reflect.get(<object>target,<string>thisOrFunc,args);
        if(_func===undefined) return;
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
