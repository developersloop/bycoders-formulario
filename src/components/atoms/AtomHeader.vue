<script lang="ts" setup>
import { reactive, PropType } from "vue";

const label = reactive({
  "step-one": "Seja Bem vindo (a)",
  "step-two": "Pessoa Física",
  "step-three": "Pessoa Jurídica",
  "step-four": "Senha de acesso",
  "step-five": "Revise suas informacoes",
});

const props = defineProps({
  customStyle: {
    type: Object as PropType<{
      [key: string]: string;
    }>,
  },
});
</script>
<template>
  <h1 class="title" :style="props.customStyle">
    {{ label[$router.currentRoute.value.name] }}
  </h1>
</template>
<style lang="scss" scoped>
.title {
  margin-top: 10px;
}
</style>
