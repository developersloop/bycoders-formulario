// @ts-nocheck
import { defineStore } from "pinia";
import { PropType } from "vue";

export const stepStore = defineStore("stepStore", {
  state: () => ({
    _currentStep: String,
    _form: {
      "step-one": {},
      "step-two_pessoa_fisica": {},
      "step-two_pessoa_juridica": {},
      "step-three": {},
    },
  }),
  actions: {
    setStep(step: string): void {
      this._currentStep = step;
    },
    setForm(step: string, form: any): void {
      this._form[step] = { ...form };
    },
  },
});
