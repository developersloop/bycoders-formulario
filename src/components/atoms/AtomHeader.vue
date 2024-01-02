<script lang="ts" setup>
import { reactive, PropType } from "vue";

const label = reactive({
  one: "Seja Bem vindo (a)",
  two: "Pessoa Física",
  three: "Pessoa Jurídica",
  four: "Senha de acesso",
  five: "Revise suas informacoes",
});

const props = defineProps({
  step: {
    type: String,
    required: true,
  },
  customStyle: {
    type: Object as PropType<{
      [key: string]: string;
    }>,
  },
});
</script>
<template>
  <h1 class="title" :style="props.customStyle">{{ label[props.step] }}</h1>
</template>
<style lang="scss" scoped>
.title {
  margin-top: 10px;
}
</style>
