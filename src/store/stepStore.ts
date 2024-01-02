// @ts-nocheck
import { defineStore } from "pinia";

export const stepStore = defineStore("stepStore", {
  state: () => ({
    _currentStep: String,
  }),
  actions: {
    setStep(step: string): void {
      this._currentStep = step;
    },
  },
});
