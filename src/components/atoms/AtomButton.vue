<script lang="ts" setup>
import { PropType } from "vue";

enum ESizes {
  "sm",
  "md",
  "lg",
}
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  customStyle: {
    type: Object as PropType<{
      [key: string]: string;
    }>,
  },
  size: {
    type: String as PropType<ESizes, string>,
    default: "md",
  },
  variant: {
    type: String,
    default: "default",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <button
    :style="props.customStyle"
    :class="[
      'button',
      `-${props.size}`,
      `-${props.variant}`,
      `-${props.disabled ? 'disabled' : ''}`,
    ]"
  >
    {{ props.label }}
  </button>
</template>
<style lang="scss" scoped>
$color: #f39c12;

.button {
  color: white;
  background: $color;
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 7px;
  cursor: pointer;
  margin-top: 15px;

  &.-sm {
    width: 10rem;
  }

  &.-md {
    width: 12rem;
  }

  &.-lg {
    width: 27rem;
  }

  &.-outlined {
    background: transparent;
    border: 2px solid $color;
    color: $color;
  }

  &.-disabled {
    opacity: 0.2;
    pointer-events: none;
  }
  @media (max-width: 700px) {
    & * {
      width: 100%;
    }
  }
}
</style>
