<script lang="ts" setup>
import { ComputedRef, computed, reactive, ref, watch, onMounted } from "vue";
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

let modelValues: {
  [key: string]: any;
} = reactive({});

onMounted(() => {
  modelValues["step-one"] = { ..._form.value["step-one"] };
  modelValues["step-two_pessoa_fisica"] = {
    ..._form.value["step-two_pessoa_fisica"],
  };
  modelValues["step-two_pessoa_juridica"] = {
    ..._form.value["step-two_pessoa_juridica"],
  };
});

function input(name: string, value: string): void {
  modelValues[name] = value;
}

watch(modelValues, function (value) {
  const spreadModelValues = { ...value };
  delete spreadModelValues["step-one"];
  delete spreadModelValues["step-two_pessoa_fisica"];
  delete spreadModelValues["step-two_pessoa_juridica"];
  store.setForm("step-three", spreadModelValues);
});
</script>
<template>
  <OrganismGrid>
    <template #context>
      <div class="form-step_two_three">
        <MoleculeHeader />
        <MoleculeInput
          type="password"
          label="Sua Senha"
          name="password"
          @model="(value) => input('password', value)"
        />
        <div class="actions">
          <AtomButton
            label="Voltar"
            variant="outlined"
            @click.prevent="$router.push({ path: '/step-two' })"
          />
          <AtomButton
            label="Continuar"
            :disabled="!modelValues['password']"
            @click.prevent="
              () => {
                $router.push({ path: '/step-four' });
                store.setStep(routerName);
              }
            "
          />
        </div>
      </div>
    </template>
  </OrganismGrid>
</template>
<style lang="scss" scoped>
.form-step_two_three {
  width: 30rem;
  > .actions {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
}
</style>
