<script lang="ts" setup>
import { PropType, ref, watchEffect, ComputedRef, computed } from "vue";
import { loadComponent } from "@/utils";

const props = defineProps({
  mask: [String],
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: null,
  },
  checked: {
    type: Boolean,
    default: false,
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

const showErrorMessage: ComputedRef = computed(() => {
  return (
    props.name == "email" &&
    !isValidEmail.value &&
    props.type == "text" &&
    model.value
  );
});
function validateEmail(): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isValidEmail.value = regex.test(model.value);
}

watchEffect(() => {
  emit("model", model.value);
  emit("error", isValidEmail.value);
});
</script>
<template>
  <div
    class="input-control"
    :style="{ flexFlow: props.type != 'radio' ? 'column wrap' : 'row wrap' }"
  >
    <span class="label">{{ props.label }}</span>
    <AtomInput
      :type="props.type"
      :style="props.customStyle"
      :name="props.name"
      :mask="props.mask"
      :value="props.value"
      :checked="props.checked"
      @input="validateEmail"
      @model="(value) => (model = value)"
    />
    <p v-if="showErrorMessage" style="color: red">
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
