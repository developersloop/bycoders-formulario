<script lang="ts" setup>
import { loadComponent } from "@/utils";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const AtomInput = loadComponent("atoms", "AtomInput.vue");
</script>
<template>
  <div class="input-control">
    <span class="label">Nome</span>
    <AtomInput :name="props.name" @model="(value) => $emit('model', value)" />
  </div>
</template>
<style lang="scss" scoped>
.input-control {
  display: flex;
  flex-flow: column;

  > .label {
    margin-bottom: 5px;
  }
}
</style>
