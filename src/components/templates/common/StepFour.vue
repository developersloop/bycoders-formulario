<script lang="ts" setup>
import {
  ComputedRef,
  computed,
  reactive,
  ref,
  watch,
  onMounted,
  defineAsyncComponent,
} from "vue";
import { loadComponent } from "@/utils";
import { useRouter } from "vue-router";
import { stepStore } from "@/store/stepStore";
import { storeToRefs } from "pinia";

const OrganismGrid = loadComponent("organisms", "OrganismGrid.vue");
const AtomButton = loadComponent("atoms", "AtomButton.vue");
const MoleculeHeader = loadComponent("molecules", "MoleculeHeader.vue");
const MoleculeInput = loadComponent("molecules", "MoleculeInput.vue");

const router = useRouter();
const store = stepStore();
const { _form, _currentStep } = storeToRefs(store);
const routerName = ref(router.currentRoute.value.name);
const isValidEmail = ref(false);

const nameComponent = _form.value["step-one"]?.typePessoa?.includes("PF")
  ? "PessoaFisica"
  : "PessoaJuridica";

const stepOne = defineAsyncComponent({
  loader: () => import(`@/components/templates/common/StepOne.vue`),
});

const stepTwo = defineAsyncComponent({
  loader: () => import(`@/components/templates/common/StepTwo/${nameComponent}.vue`),
});

const stepThree = defineAsyncComponent({
  loader: () => import(`@/components/templates/common/StepThree.vue`),
});

function cleanStates(): void {
  store.setStep(null);

  _form.value["step-one"] = {
    email: null,
    typePessoa: null,
  };

  _form.value["step-two_pessoa_fisica"] = {
    nome: null,
    cpf: null,
    data_nascimento: null,
    phone: null,
  };

  _form.value["step-two_pessoa_juridica"] = {
    razao_social: null,
    cnpj: null,
    data_abertura: null,
    phone: null,
  };
  _form.value["step-three"] = {
    password: null,
  };
}

function fetchStore(): void {
  store.persistForm(_form.value).then((resp) => {
    if (resp.status == 201) {
      alert("Registro criado com sucesso!");
      setTimeout(() => {
        cleanStates();
        router.push("/step-one");
      }, 500);
    }
  });
}
</script>
<template>
  <div class="form-step_four">
    <MoleculeHeader :customStyle="{ width: 'max-content' }" />
    <stepOne isSlot :customStyle="{ padding: '0', marginBottom: '15px' }" />
    <stepTwo isSlot :customStyle="{ padding: '0' }" />
    <stepThree isSlot :customStyle="{ padding: '0' }" />
    <div class="actions">
      <AtomButton
        label="Voltar"
        variant="outlined"
        @click.prevent="$router.push({ path: '/step-three' })"
      />
      <AtomButton
        label="Cadastrar"
        :disabled="stepInvalid"
        @click.prevent="fetchStore()"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.form-step_four {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  > .actions {
    margin-top: 10px;
    width: 30rem;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
}
</style>
