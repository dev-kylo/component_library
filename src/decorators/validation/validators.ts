import {validationResult} from './models';

export function validateByType(type, val) : validationResult {
    switch(type){
        case 'Email' : return validateEmail(val);
        case 'Number' : return validateNumber(val);
        case 'Required' : return validateRequired(val);
    }
}

function validateEmail(val) : validationResult {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(val)){
        return new validationResult(false, [])
    }
    else {
        return new validationResult(true, ['The email supplied is in an incorrect format. Please supply another.'])
    }
}


function validateNumber(val) : validationResult {
    if (val.isNumber() && !Number.isNaN(val)){
        return new validationResult(false, [])
    }
    else {
        return new validationResult(true, ['You have supplied a value that is not a number.'])
    }
}

function validateRequired(val) : validationResult {
    if (val !== '' ){
        return new validationResult(false, [])
    }
    else {
        return new validationResult(true, ['You have missed a required field'])
    }   
}