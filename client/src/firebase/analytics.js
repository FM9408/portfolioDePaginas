import { analytics } from "./config";
import {logEvent} from "firebase/analytics";



export function registerView(page) {
    logEvent(analytics, 'page_view', {
        value: page
    })
}


export function logIn(){
    logEvent(analytics, 'login')
}

export function logOut(){
    logEvent(analytics, 'logout')
}

export function signUp(){
    logEvent(analytics, 'sign_up')
}


export function shared(social){
    logEvent(analytics, "share", {
        value: social
    })
}



