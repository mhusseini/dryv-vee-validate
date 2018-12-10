import Vue from "Vue";
import { Field } from "vee-validate";
export declare function refresh(validator: any, val: any, form: HTMLFormElement): void;
export declare function updateModelFromElement(element: HTMLInputElement, i: number, obj: any, validator: any): Field;
declare function prepareValidation(component: Vue, form: HTMLFormElement): any;
export default prepareValidation;
