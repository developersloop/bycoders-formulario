<script lang="ts" setup>
import { PropType } from "vue";

const props = defineProps({
  customStyle: {
    type: Object as PropType<{
      [key: string]: string;
    }>,
  },
});
</script>
<template>
  <div class="organism-grid" :style="props.customStyle">
    <slot name="context"></slot>
  </div>
</template>
<style lang="scss" scoped>
.organism-grid {
  padding: 20px;
}
</style>
