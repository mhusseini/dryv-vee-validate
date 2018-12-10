import Vue from "Vue";
import { Field } from "vee-validate";

var w = window as any;
var a = w.dryv = w.dryv || {};
a.vee = a.vee || {};

export function refresh(validator: any, val: any, form: HTMLFormElement) {
    if (val.config.skipRefresh) {
        return;
    }
    const obj = {};
    for (let i = 0; i < form.childElementCount; i++) {
        updateModelFromElement(form[i] as HTMLInputElement, i, obj, validator);
    }
    val.model = obj;
};

function updateField(obj: any, inputName: string, value: any) {
    if (!inputName) {
        return;
    }

    const names = inputName.replace(/^\w|\.\w/g, m => m.toLowerCase()).split(".");
    const max = names.length - 1;
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const m = /(\w+)(\[(\d)\])?/.exec(name);
        const [, field, , index] = m;
        const parent = obj;
        obj = obj[field];
        if (i < max) {
            if (!obj) {
                obj = parent[field] = index ? [] : {};
            }

            if (index) {
                const idx = Number(index);
                obj = obj[idx] ? obj[idx] : (obj[idx] = {});
            }
        }
        else if (index) {
            (obj || (obj = parent[field] = []))[Number(index)] = value;
        }
        else {
            parent[field] = value;
        }
    }
};

export function updateModelFromElement(element: HTMLInputElement, i: number, obj: any, validator: any): Field {
    if (!element) { return null; }
    if (!element.name) {
        if(element.tagName !== "BUTTON" && element.type !== "submit" && element.type !== "cancel")
        {
            console.warn("Form element without name attribute found. DryvVee needs the name attribute to work.");
        }
        return null;
    }

    const field = validator.fields.find({ name: element.name });
    updateField(obj, field.name, field.value);

    return field;
}

function prepareValidation(component: Vue, form: HTMLFormElement): any {
    const obj = {};
    const vee = (window as any).dryv.vee;
    const config = {
        skipRefresh: true
    };
    for (let i = 0; i < form.childElementCount; i++) {
        const element = form[i] as HTMLInputElement;
        if (!element)
            continue;
        const field = updateModelFromElement(element, i, obj, component.$validator);
        const mid = element.getAttribute("dryv-v");
        if (mid) {
            const val = vee[mid] || (vee[mid] = {});
            val.model = obj;
            val.refreshModel = () => refresh(component.$validator, val, form);
            val.config = config;
            field.update({ bails: false });
        }
    }
    return config;
}

export default prepareValidation;