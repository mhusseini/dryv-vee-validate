import prepareValidation from "local/prepareValidation";
import mixin from "local/dryv-vee-mixin";
declare function init(veeValidate: any): void;
export { init, mixin, prepareValidation };
declare const _default: {
    init: typeof init;
    mixin: {
        methods: {
            dryvVee(e: Event): Promise<any>;
        };
    };
    prepareValidation: typeof prepareValidation;
};
export default _default;
