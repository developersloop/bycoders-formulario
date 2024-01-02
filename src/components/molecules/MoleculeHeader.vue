<script lang="ts" setup>
import { PropType, reactive } from "vue";
import { loadComponent } from "@/utils";

const AtomHeader = loadComponent("atoms", "AtomHeader.vue");

const prefix = reactive({
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
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
  <div>
    Etapa <span class="prefix">{{ prefix[props.step] }}</span> de 5
    <AtomHeader :style="props.customStyle" :step="props.step" />
  </div>
</template>
<style lang="scss" scoped>
.prefix {
  color: #f39c12;
}
</style>
