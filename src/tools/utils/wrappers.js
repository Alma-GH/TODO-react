import {changeOnPage, createThrottling} from "./func";
import Server from "../services/Server";
import {createMyTimer} from "./func"

export const errTimer = createMyTimer()
export const keyboardTimer = createMyTimer()
export const yetTimer = createMyTimer()


export const updateOrderThrottle = createThrottling(Server.saveOrder,1000)
// export const saveOnPageThrottle = createThrottling(changeOnPage,500)