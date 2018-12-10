// import axios from "axios";

const w = window as any;
const a = w.dryv = (w.dryv || {});
const vee = a.vee = (a.vee || {});

function normalize(txt: string) {
    txt = txt.replace("*.", "");
    return txt.charAt(0).toLowerCase() + txt.slice(1);
}

const validator = {
    getMessage: (field: string, args: Array<any>) => `${field} is not valid`,

    validate: (value: any, args: Array<string>) => {
        if (args.length < 3) {
            return true;
        }

        const mid = args[0];
        const val = vee[mid];
        if (!val || !val.model) {
            return true;
        }

        if (val.refreshModel) {
            val.refreshModel();
        }

        const model = val.model;

        const fields = args.slice(2)
            .map(f => normalize(f))
            .map(f => `${f}=${model[f] || ""}`)
            .join("&");
        const url = args[1];
        const sep = url.indexOf("?") < 0 ? "?" : "&";
        const fullUrl = url + sep + fields;

        return fetch(fullUrl)
            .then((response: Response) => response.json())
            .then((isValid: boolean) => isValid);
    }
};

export default validator;