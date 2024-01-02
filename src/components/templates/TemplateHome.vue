<script lang="ts" setup>
import { computedRef, computed, reactive, ref } from "vue";
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

let modelValues: {
  [key: string]: any;
} = reactive({});

const getStep: computedRef = computed(() => {
  return router.currentRoute.value.query?.step ?? "one";
});

function input(name: string, value: string): void {
  console.log(value);
  modelValues[name] = value;
}
</script>
<template>
  <OrganismGrid>
    <template #context>
      {{ modelValues }}
      <div class="form-step">
        <MoleculeHeader :step="getStep" />
        <MoleculeInput name="email" @model="(value) => input('email', value)" />
        <AtomButton
          label="Continuar"
          size="lg"
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
