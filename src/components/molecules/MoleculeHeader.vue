<script lang="ts" setup>
import { PropType, reactive } from "vue";
import { loadComponent } from "@/utils";

const AtomHeader = loadComponent("atoms", "AtomHeader.vue");

const prefix = reactive({
  "step-one": 1,
  "step-two": 2,
  "step-three": 3,
  "step-four": 4,
  "step-five": 5,
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
  <div>
    Etapa
    <span class="prefix">{{ prefix[$router.currentRoute.value.name] }}</span> de
    5
    <AtomHeader :style="props.customStyle" />
  </div>
</template>
<style lang="scss" scoped>
.prefix {
  color: #f39c12;
}
</style>
