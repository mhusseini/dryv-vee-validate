import prepareValidation from "local/prepareValidation";

const mixin = {
    methods: {
        async dryvVee(e: Event) {
            if (this.dryvSkipValidate) {
                this.dryvSkipValidate = false;
                return true;
            }

            e.preventDefault();

            const form = this.$el as HTMLFormElement;
            this.formConfig = prepareValidation(this, form);

            return await this.$validator.validateAll()
                .then((isValid: boolean) => {
                    this.formConfig.skipRefresh = false;

                    if (!isValid) { return false; }

                    this.dryvSkipValidate = true;

                    (this.$el as HTMLFormElement).submit();
                    return true;
                })
                .catch(() => this.formConfig.skipRefresh = false);
        }
    }
}

export default mixin;
