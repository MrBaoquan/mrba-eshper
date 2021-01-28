import { CallFunction, isset, Logger } from "@App/index";

test("isset",()=>{
    expect(isset(undefined)).toBe(false);
    expect(isset(null)).toBe(false);
});

test("callback",()=>{
    const _function = ()=>{
        return "callback";
    }
    expect(CallFunction(_function)).toBe("callback");
});

test("Log",()=>{
    Logger.Log("warn message. %s", {abc:'123'});
})