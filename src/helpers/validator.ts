import Validator  from "validatorjs"

const validator = async (body: any, rules: any, customMessages: any, callback: (param1: null | any, param2: boolean) => any) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

export default validator;