// @ts-nocheck
import { TPayload } from "@/types";
import { defineStore } from "pinia";
import axios from "axios";

export const stepStore = defineStore("stepStore", {
  state: () => ({
    _currentStep: "",
    _form: {
      "step-one": {
        email: null,
        typePessoa: null,
      },
      "step-two_pessoa_fisica": {
        nome: null,
        cpf: null,
        data_nascimento: null,
        phone: null,
      },
      "step-two_pessoa_juridica": {
        razao_social: null,
        cnpj: null,
        data_abertura: null,
        phone: null,
      },
      "step-three": {
        password: null,
      },
    },
  }),
  actions: {
    setStep(step: string): void {
      this._currentStep = step;
    },
    setForm(step: string, key: string, value: any): void {
      this._form[step][key] = value;
    },
    async persistForm(payload: TPayload) {
      console.log(payload);
      // await axios.post(`/cadastro/domiciliares/familia`, payload);
    },
  },
});
