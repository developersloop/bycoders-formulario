<script lang="ts" setup>
import {
  ComputedRef,
  computed,
  reactive,
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { loadComponent, cleanCache } from "@/utils";
import { useRouter } from "vue-router";
import { stepStore } from "@/store/stepStore";
import { storeToRefs } from "pinia";
import _ from "lodash";
const OrganismGrid = loadComponent("organisms", "OrganismGrid.vue");
const AtomButton = loadComponent("atoms", "AtomButton.vue");
const MoleculeHeader = loadComponent("molecules", "MoleculeHeader.vue");
const MoleculeInput = loadComponent("molecules", "MoleculeInput.vue");

const router = useRouter();
const store = stepStore();
const { _form } = storeToRefs(store);
const routerName = ref(router.currentRoute.value.name);
const isValidEmail = ref(!_.isEmpty(_form.value["step-one"]));

const props = defineProps({
  isSlot: {
    type: Boolean,
    default: false,
  },
});

let modelValues: {
  [key: string]: any;
} = reactive({});

const stepInvalid: ComputedRef = computed(() => {
  return (
    !_form.value["step-one"]?.email || !_form.value["step-one"]?.typePessoa
  );
});

function input(name: string, value: string): void {
  if (value != null) {
    modelValues[name] = value;
    store.setForm("step-one", name, value);
  }
}

function nextStep(): void {
  if (_form.value["step-one"]["typePessoa"].includes("PF")) {
    router.push({ path: "/step-two/pessoa_fisica" });
  } else {
    router.push({ path: "/step-two/pessoa_juridica" });
  }
  store.setStep(routerName.value);
}

onMounted(() => {
  if (!props.isSlot) {
    cleanCache();
  }
});
</script>
<template>
  <OrganismGrid>
    <template #context>
      <div class="form-step">
        <MoleculeHeader v-if="!props.isSlot" />
        <MoleculeInput
          type="text"
          label="Endereço de e-mail"
          name="email"
          :value="_form['step-one']?.email"
          :readonly="isSlot"
          @model="(value) => input('email', value)"
          @error="
            (value) => {
              isValidEmail = value;
            }
          "
        />
        <div class="people-type" v-if="!props.isSlot">
          <MoleculeInput
            label="Pessoa física"
            type="radio"
            value="PF"
            name="typePessoa"
            :checked="_form['step-one']?.typePessoa == 'PF'"
            :customStyle="{ width: 'max-content' }"
            :readonly="isSlot"
            @model="(value) => input('typePessoa', value)"
          />
          <MoleculeInput
            label="Pessoa jurídica"
            type="radio"
            value="PJ"
            name="typePessoa"
            :checked="_form['step-one']?.typePessoa == 'PJ'"
            :customStyle="{ width: 'max-content' }"
            :readonly="isSlot"
            @model="(value) => input('typePessoa', value)"
          />
        </div>
        <AtomButton
          v-if="!props.isSlot"
          label="Continuar"
          size="lg"
          :disabled="stepInvalid || (modelValues['email'] && !isValidEmail)"
          @click.prevent="nextStep()"
        />
      </div>
    </template>
  </OrganismGrid>
</template>
<style lang="scss" scoped>
.form-step {
  width: 30rem;
  > .people-type {
    display: flex;
    flex-flow: row wrap;
    margin-top: 10px;
    justify-content: space-between;
  }
}
</style>
