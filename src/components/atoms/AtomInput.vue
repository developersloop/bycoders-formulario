<script lang="ts" setup>
import { PropType, reactive, ref, watch } from "vue";

const model = ref();

const props = defineProps({
  type: {
    type: String,
    default: "text",
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
</script>
<template>
  <input
    v-if="props.name != 'email' && props.name != 'password'"
    class="input"
    v-model="model"
    v-mask="props.mask"
    :style="props.customStyle"
    :type="props.type"
    :name="props.name"
    @input="($event) => $emit('model', model)"
  />
  <input
    v-else
    class="input"
    v-model="model"
    :style="props.customStyle"
    :type="props.type"
    :name="props.name"
    :value="props.value"
    @input="($event) => $emit('model', model)"
  />
</template>
<style lang="scss" scoped>
.input {
  border: 2px solid black;
  width: 250px;
  border-radius: 6px;
  padding: 8px;
}
</style>
