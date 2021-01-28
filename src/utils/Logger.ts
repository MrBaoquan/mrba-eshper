import moment from "moment";

type LogAction = (...args:any[])=>void;

export class Logger{
    
    private static info:LogAction = console.log;
    private static warn:LogAction = console.warn;
    private static error:LogAction = console.error;

    static Register(params:{info?:LogAction, warn?:LogAction, error?:LogAction}){
        if(params.info)
            this.info = params.info;
        if(params.warn)
            this.warn = params.warn;
        if(params.error)
            this.error = params.error;
    }

    static  Log(message?: any, ...optionalParams: any[]){
        Logger.doLogger(this.info,message,...optionalParams);
    }

    static  Warn(message?: any, ...optionalParams: any[]){
        Logger.doLogger(this.warn,message,...optionalParams);
    }

    static  Error(message?: any, ...optionalParams: any[]){
        Logger.doLogger(this.error,message,...optionalParams);
    }

    /**
     * examples 
     */
    private static doLogger(action:{(message?: any, ...optionalParams: any[]):void}, message?: any, ...optionalParams: any[]){
        let _timePrefix:string = moment().format("YYYY-MM-DD HH:mm:ss.SSS") + ": ";
        if(typeof message==='string')
            action(_timePrefix + message, ...optionalParams);
        else
            action(_timePrefix, message);
    }
}