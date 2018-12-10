

import dryvRule from "local/dryv-vee-rule";
import dryvRemoteRule from "local/dryv-vee-remote-rule";
import prepareValidation from "local/prepareValidation";
import mixin from "local/dryv-vee-mixin";

function init(veeValidate) {
    veeValidate.Validator.extend("dryv", dryvRule);
    veeValidate.Validator.extend("dryv-remote", dryvRemoteRule);
}

export { init, mixin, prepareValidation };
export default { init, mixin, prepareValidation };