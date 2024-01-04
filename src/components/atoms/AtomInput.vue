<script lang="ts" setup>
import { PropType, reactive, ref, watch, ComputedRef, computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: null,
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
  mask: {
    type: String,
    default: "X".repeat(50),
  },
});

const visibleInputMask: ComputedRef = computed(() => {
  return (
    props.name !== "email" &&
    props.name !== "password" &&
    props.type !== "radio" &&
    props.name !== "nome"
  );
});
</script>
<template>
  <input
    v-if="visibleInputMask"
    class="input"
    v-mask="props.mask"
    :style="props.customStyle"
    :type="props.type"
    :name="props.name"
    :value="props.value"
    @input="($event) => $emit('model', $event.target.value)"
  />
  <input
    v-else
    class="input"
    :style="props.customStyle"
    :type="props.type"
    :name="props.name"
    :value="props.value"
    @input="($event) => $emit('model', $event.target.value)"
  />
</template>
<style lang="scss" scoped>
.input {
  border: 2px solid black;
  width: -webkit-fill-available;
  border-radius: 6px;
  padding: 8px;
}
</style>
