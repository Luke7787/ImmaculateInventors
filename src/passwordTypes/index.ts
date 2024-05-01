export interface ResetPasswordProps {
    params: {
        token: string
    }
}

export interface InputError {
    [key: string]: string;
}