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
  modelValues["step-two"] = { ..._form.value["step-two"] };
  modelValues["step-three"] = { ..._form.value["step-three"] };
});

const stepInvalid: ComputedRef = computed(() => {
  return (
    !modelValues["nome"] ||
    !modelValues["cpf"] ||
    !modelValues["data_nascimento"] ||
    !modelValues["phone"]
  );
});

function input(name: string, value: string): void {
  modelValues[name] = value;
}

watch(modelValues, function (value) {
  store.setForm(routerName.value, value);
});
</script>
<template>
  <OrganismGrid>
    <template #context>
      {{ modelValues }}
      <div class="form-step_four">
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
      </div>
    </template>
  </OrganismGrid>
</template>
<style lang="scss" scoped>
.form-step_four {
  > .actions {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
}
</style>
