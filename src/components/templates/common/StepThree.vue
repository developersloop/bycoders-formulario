<script lang="ts" setup>
import { ComputedRef, computed, reactive, ref, watch, onMounted } from "vue";
import { loadComponent } from "@/utils";
import { useRouter, useRoute } from "vue-router";
import { stepStore } from "@/store/stepStore";
import { storeToRefs } from "pinia";

const OrganismGrid = loadComponent("organisms", "OrganismGrid.vue");
const AtomButton = loadComponent("atoms", "AtomButton.vue");
const MoleculeHeader = loadComponent("molecules", "MoleculeHeader.vue");
const MoleculeInput = loadComponent("molecules", "MoleculeInput.vue");

const router = useRouter();
const route = useRoute();
const store = stepStore();
const { _form, _currentStep } = storeToRefs(store);
const routerName = ref(router.currentRoute.value.name);
const isValidEmail = ref(false);

const props = defineProps({
  isSlot: {
    type: Boolean,
    default: false,
  },
});

let modelValues: {
  [key: string]: any;
} = reactive({});

function input(name: string, value: string): void {
  if (value != null) {
    modelValues[name] = value;
    store.setForm("step-three", name, value);
  }
}

function goBack(): void {
  console.log(router);
  router.push({
    path: localStorage.getItem("route-back-step-three") ?? router.back(),
  });
}

function nextStep(): void {
  localStorage.setItem(
    "route-back-step-three",
    router.options.history.state.back
  );

  router.push({ path: "/step-four" });
  store.setStep(routerName);
}
</script>
<template>
  <OrganismGrid>
    <template #context>
      <div class="form-step_two_three">
        <MoleculeHeader v-if="!props.isSlot" />
        <MoleculeInput
          type="password"
          label="Sua Senha"
          name="password"
          :value="_form['step-three'].password"
          :readonly="isSlot"
          @model="(value) => input('password', value)"
        />
        <div class="actions" v-if="!props.isSlot">
          <AtomButton
            label="Voltar"
            variant="outlined"
            @click.prevent="goBack"
          />
          <AtomButton
            label="Continuar"
            :disabled="!_form['step-three']?.password"
            @click.prevent="nextStep()"
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
