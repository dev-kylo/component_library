
export type validationTypes = 'Email' | 'Required' | 'Number' | 'Date' | 'Regex';

//The config containing all classes and props which contain a validation decorator
export interface validationConfig {
    [className: string] : {
        [propName: string] : validationTypes[]
    }       
}

//the object returned by each type of validation check
export class validationResult {
    constructor(public hasErrors: boolean, public errors: string[]){}
}

export interface errorLogInt {
    hasErrors: boolean;
    errors: {
        [propName: string] : string[]
    }
}

//This is the final class that the validate() function returns
export class validationPackage {
    public errorLog: errorLogInt;
    constructor(){
        this.errorLog = {
            hasErrors: false,
            errors: {}
        }
    }

    public addError(newErrors: string[], propName){
        //Prevent Mutation
        const updatedLog = {...this.errorLog}
        updatedLog.errors = {...this.errorLog.errors}

        updatedLog.hasErrors = true;
        //Check if property is already in error log
        if (propName in updatedLog.errors){
            const errs = updatedLog.errors[propName];
            updatedLog.errors[propName] = [...errs, ...newErrors]
        }
        else {
            updatedLog.errors[propName] = [...newErrors]
        }
        //re-assign updated log object to log property
        this.errorLog = updatedLog;
    }

    public removeErrors(className){
        const updatedLog = {...this.errorLog}
        updatedLog.errors = {...this.errorLog.errors}
        updatedLog.hasErrors = false;

        //remove all errors in array
        updatedLog.errors[className] = [];

        //re-assign updated log object to log property
        this.errorLog = updatedLog;
    }


}