export interface loginData {
    email: string;
    password: string;
    returnSecureToken: boolean
}

export class LoginPackage {
    package: loginData;
    area: string;

    constructor(email: string, password: string, database: string){
        this.package = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        this.area = database
    }
}

export interface firebaseResponse {
    idToken: string;
    refreshToken: string;
    expiresIn: string;
    error?: {
        errors: {domain: string, reason: string, message: string}[];
        code: number;
        message: string;
      }
}
