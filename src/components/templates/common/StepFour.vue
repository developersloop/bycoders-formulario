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
const { _form } = storeToRefs(store);
const routerName = ref(router.currentRoute.value.name);
const isValidEmail = ref(false);

const nameComponent = _form.value["step-one"]?.typePessoa?.includes("PF")
  ? "PessoaFisica"
  : "PessoaJuridica";

const dynamicComponent = defineAsyncComponent({
  loader: () =>
    import(`@/components/templates/common/StepTwo/${nameComponent}.vue`),
});

onMounted(() => {
  // console.log(;
});
</script>
<template>
  <div class="form-step_four">
    <dynamicComponent isSlot>
      <template #custom-header>
        <MoleculeHeader :customStyle="{ width: 'max-content' }" />
      </template>
      <template #custom>
        <MoleculeInput
          type="password"
          label="password"
          name="password"
          @model="(value) => input('password', value)"
        />
        <div class="actions">
          <AtomButton
            label="Voltar"
            variant="outlined"
            @click.prevent="$router.push({ path: '/step-three' })"
          />
          <AtomButton label="Cadastrar" :disabled="stepInvalid" />
        </div>
      </template>
    </dynamicComponent>
  </div>
</template>
<style lang="scss" scoped>
.actions {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
</style>
