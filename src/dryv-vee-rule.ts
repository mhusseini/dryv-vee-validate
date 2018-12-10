const w = window as any;
const a = w.dryv = (w.dryv || {});
a.vee = a.vee || {};

const validator = {
    getMessage(_: string, args: Array<any>) {
        const mid = args[0];
        const vee = (window as any).dryv.vee;
        const error = vee[mid + "_e"];
        return error;
    },
    validate(_: any, args: Array<any>) {
        let error: string = null;
        const mid = args[0];
        const vee = (window as any).dryv.vee;
        const val = vee[mid];
        if (!val || !val.model) {
            return true;
        }
        if (val.refreshModel) {
            val.refreshModel();
        }
        for (let func of val.v) {
            error = func(val.model);
            if (error) {
                break;
            }
        }
        vee[mid + "_e"] = error;
        return error == null;;
    }
};

export default validator;
