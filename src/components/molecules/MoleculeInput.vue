<script lang="ts" setup>
import { PropType, ref, watchEffect } from "vue";
import { loadComponent } from "@/utils";

const props = defineProps({
  value: {
    type: [String, Number, Boolean],
    default: null,
  },
  type: {
    type: String,
    default: "text",
  },
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  customStyle: {
    type: Object as PropType<{
      [key: string]: string;
    }>,
  },
});

const AtomInput = loadComponent("atoms", "AtomInput.vue");

const emit = defineEmits<{
  (e: string, value: unknown): void;
}>();

const isValidEmail = ref(false);
const model = ref();

function validateEmail(): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isValidEmail.value = regex.test(model.value);
}

watchEffect(() => {
  if (model.value) {
    emit("model", model.value);
  }

  emit("error", isValidEmail.value);
});
</script>
<template>
  <div
    class="input-control"
    :style="{ flexFlow: props.type == 'text' ? 'column wrap' : 'row wrap' }"
  >
    <span class="label">{{ props.label }}</span>
    <AtomInput
      :type="props.type"
      :name="props.name"
      :value="props.value"
      :style="props.customStyle"
      @input="validateEmail"
      @model="(value) => (model = value)"
    />
    <p v-if="!isValidEmail && props.type == 'text' && model" style="color: red">
      Por favor, insira um e-mail válido.
    </p>
  </div>
</template>
<style lang="scss" scoped>
.input-control {
  display: flex;
  align-items: baseline;

  > .label {
    margin-bottom: 5px;
  }
}
</style>
