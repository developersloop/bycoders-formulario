<script lang="ts" setup>
import { computedRef, computed, reactive } from "vue";
import { loadComponent } from "@/utils";
import { useRouter } from "vue-router";

const OrganismGrid = loadComponent("organisms", "OrganismGrid.vue");
const AtomButton = loadComponent("atoms", "AtomButton.vue");
const MoleculeHeader = loadComponent("molecules", "MoleculeHeader.vue");
const MoleculeInput = loadComponent("molecules", "MoleculeInput.vue");

const router = useRouter();

let modelFilter: {
  [key: string]: any;
} = reactive({});

const getStep: computedRef = computed(() => {
  return router.currentRoute.value.query?.step ?? "one";
});

function input(name: string, value: string): void {
  modelFilter[name] = value;
}
</script>
<template>
  <OrganismGrid>
    <template #context>
      <div class="form-step">
        <MoleculeHeader :step="getStep" />
        <MoleculeInput name="email" @model="input('email', value)" />
        <AtomButton label="Continuar" size="lg" />
      </div>
    </template>
  </OrganismGrid>
</template>
