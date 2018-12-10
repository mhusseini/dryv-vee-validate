declare const validator: {
    getMessage: (field: string, args: any[]) => string;
    validate: (value: any, args: string[]) => true | Promise<boolean>;
};
export default validator;
