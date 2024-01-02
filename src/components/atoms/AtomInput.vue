<script lang="ts" setup>
import { PropType } from "vue";

const props = defineProps({
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
</script>
<template>
  <input
    class="input"
    :style="props.customStyle"
    type="text"
    :name="props.name"
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
