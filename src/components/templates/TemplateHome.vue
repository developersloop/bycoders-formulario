<script lang="ts" setup>
import { ComputedRef, computed, reactive, ref } from "vue";
import { loadComponent } from "@/utils";
import { useRouter } from "vue-router";
import { stepStore } from "@/store/stepStore";

const OrganismGrid = loadComponent("organisms", "OrganismGrid.vue");
const AtomButton = loadComponent("atoms", "AtomButton.vue");
const MoleculeHeader = loadComponent("molecules", "MoleculeHeader.vue");
const MoleculeInput = loadComponent("molecules", "MoleculeInput.vue");

const router = useRouter();
const store = stepStore();
const routerName = ref(router.currentRoute.value.name);
const isValidEmail = ref(false);

let modelValues: {
  [key: string]: any;
} = reactive({});

const getStep: ComputedRef = computed(() => {
  return router.currentRoute.value.query?.step ?? "one";
});

const stepInvalid: ComputedRef = computed(() => {
  return !modelValues?.email || !modelValues?.typePessoa || !isValidEmail.value;
});

function input(name: string, value: string): void {
  modelValues[name] = value;
}
</script>
<template>
  <OrganismGrid>
    <template #context>
      {{ modelValues }}
      <div class="form-step">
        <MoleculeHeader :step="getStep" />
        <MoleculeInput
          type="text"
          label="Endereço de e-mail"
          name="email"
          @model="(value) => input('email', value)"
          @error="(value) => (isValidEmail = value)"
        />
        <div class="people-type">
          <MoleculeInput
            label="Pessoa física"
            type="radio"
            value="PF"
            name="typePessoa"
            :customStyle="{ width: 'max-content' }"
            @model="(value) => input('typePessoa', value)"
          />
          <MoleculeInput
            label="Pessoa jurídica"
            type="radio"
            value="PJ"
            name="typePessoa"
            :customStyle="{ width: 'max-content' }"
            @model="(value) => input('typePessoa', value)"
          />
        </div>
        <AtomButton
          label="Continuar"
          size="lg"
          :disabled="stepInvalid"
          @click.prevent="
            () => {
              $router.push({ path: '/step-two' });
              store.setStep(routerName);
            }
          "
        />
      </div>
      <router-view></router-view>
    </template>
  </OrganismGrid>
</template>
<style lang="scss" scoped>
.form-step {
  > .people-type {
    display: flex;
    flex-flow: row wrap;
    margin-top: 10px;
    justify-content: space-between;
  }
}
</style>
