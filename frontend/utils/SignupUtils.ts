import { isNullOrUndefined } from "../lib/utils";
import { isEmpty } from "lodash";
import { toast } from "sonner";


export interface SignupFormData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}


export const validateSignupForm = (formData: SignupFormData) => {
     
    const { email, password } = formData;
    for (const [key, value] of Object.entries(formData)) {
        if (isNullOrUndefined(value) || isEmpty(value.trim())) {
            toast.error(`Please fill in the ${key} field.`);
            return false;
        }
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address format.");
        return false;
    }


    const passwordErrors  : string[]= [];
    if (!/[0-9]/.test(password)) {
        passwordErrors.push("number");
    }
    if (!/[a-z]/.test(password)) {
        passwordErrors.push("lowercase letter");
    }
    if (!/[A-Z]/.test(password)) {
        passwordErrors.push("uppercase letter");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) { 
        passwordErrors.push("special symbol");
    }

    if (passwordErrors.length > 0) {
        toast.error(`Password must contain at least one ${passwordErrors.join(', ')}.`);
        return false;
    }

}

export const validateLoginForm = (formData: LoginFormData) => {
    const { email, password } = formData;
    if (!email || !password) {
        toast.error("Please fill in all fields.");
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address format.");
        return false;
    }

}