import {createMyTimer, createThrottling} from "./func";
import Server from "../services/Server";

export const errTimer = createMyTimer()
export const keyboardTimer = createMyTimer()
// export const nextTimer = createMyTimer()


export const updateOrderThrottle = createThrottling(Server.saveOrder,1000)
// export const saveOnPageThrottle = createThrottling(changeOnPage,500)