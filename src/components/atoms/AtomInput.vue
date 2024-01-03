<script lang="ts" setup>
import { PropType } from "vue";

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
  value: [String, Number, Boolean],
});
</script>
<template>
  <input
    v-show="props.type"
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
  width: 250px;
  border-radius: 4px;
  padding: 8px;
}
</style>
