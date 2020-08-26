import { validateByType } from './validators';
import { validationConfig, validationTypes, validationPackage, errorLogInt } from './models';

//Create central config object
const config: validationConfig = {}

// exported decorator functions
export const isEmail = (target: any, propName: string) => updateConfig('Email', target.constructor.name, propName);
export const isNumber = (target: any, propName: string) => updateConfig('Number', target.constructor.name, propName);
export const isDate = (target: any, propName: string) => updateConfig('Date', target.constructor.name, propName);
export const isRequired = (target: any, propName: string) => updateConfig('Required', target.constructor.name, propName);

// exported validate function to use with decorators
export function validate(ob: any): errorLogInt {

    const classConfig = config[ob.constructor.name];
    //create a new error control class.
    const validationControl = new validationPackage()

    if (!classConfig) return validationControl.errorLog as errorLogInt;
    // loop through properties for the correct class
    for (const prop in classConfig){

        //loop through validator types for each property, and perform validation check
        for (const validator of classConfig[prop]){
            const result = validateByType(validator, ob[prop])
            if (result.hasErrors){
                validationControl.addError(result.errors, prop)
            }    
        }
    }
    return validationControl.errorLog;
}

function updateConfig(type: validationTypes, className, propName){
    if(className in config){
        if (propName in config[className]) {
            config[className][propName].push(type)
        }
        else {
         config[className][propName] = [type]
        }
    }
    else {
        config[className] = {
            [propName]: [type]
        }     
    }
}



//THIS DECORATOR TAKES AN ARGUMENT, SO MUST RETURN A FUNCTION
// export function isRegex(regex){

// }
