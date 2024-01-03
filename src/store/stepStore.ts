// @ts-nocheck
import { defineStore } from "pinia";
import { PropType } from "vue";

export const stepStore = defineStore("stepStore", {
  state: () => ({
    _currentStep: String,
    _form: Object as PropType<unknow>,
  }),
  actions: {
    setStep(step: string): void {
      this._currentStep = step;
    },
    setForm(step: string, form: unknow): void {
      this._form = {
        [step]: { ...form },
      };
    },
  },
});
