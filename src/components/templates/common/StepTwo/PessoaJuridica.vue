<script lang="ts" setup>
import { ComputedRef, computed, reactive, ref, watch, onMounted } from "vue";
import { loadComponent } from "@/utils";
import { useRouter } from "vue-router";
import { stepStore } from "@/store/stepStore";
import { storeToRefs } from "pinia";

const OrganismGrid = loadComponent("organisms", "OrganismGrid.vue");
const AtomButton = loadComponent("atoms", "AtomButton.vue");
const MoleculeHeader = loadComponent("molecules", "MoleculeHeader.vue");
const MoleculeInput = loadComponent("molecules", "MoleculeInput.vue");

const router = useRouter();
const store = stepStore();
const { _form } = storeToRefs(store);
const routerName = ref(router.currentRoute.value.name);
const isValidEmail = ref(false);

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
    !_form.value["step-two_pessoa_juridica"]?.razao_social ||
    !_form.value["step-two_pessoa_juridica"]?.cnpj ||
    !_form.value["step-two_pessoa_juridica"]?.phone ||
    !_form.value["step-two_pessoa_juridica"]?.data_abertura
  );
});

function input(name: string, value: string): void {
  if (value) {
    modelValues[name] = value;
    store.setForm("step-two_pessoa_juridica", name, value);
  }
}
</script>
<template>
  <OrganismGrid>
    <template #context>
      <div class="form-step_two_juridica">
        <MoleculeHeader v-if="!props.isSlot" />
        <MoleculeInput
          type="text"
          label="Razão Social"
          name="razao_social"
          :value="_form['step-two_pessoa_juridica']?.razao_social"
          @model="(value) => input('razao_social', value)"
        />
        <MoleculeInput
          type="text"
          label="CNPJ"
          mask="##.###.###/####-##"
          name="cnpj"
          :value="_form['step-two_pessoa_juridica']?.cnpj"
          @model="(value) => input('cnpj', value)"
        />
        <MoleculeInput
          type="text"
          label="Data de abertura"
          mask="##/##/####"
          name="data_abertura"
          :value="_form['step-two_pessoa_juridica']?.data_abertura"
          @model="(value) => input('data_abertura', value)"
        />
        <MoleculeInput
          type="text"
          label="Telefone"
          mask="(##)#####-####"
          name="phone"
          :value="_form['step-two_pessoa_juridica']?.phone"
          @model="(value) => input('phone', value)"
        />
        <slot name="custom" v-if="props.isSlot"></slot>
        <div class="actions" v-if="!props.isSlot">
          <AtomButton
            label="Voltar"
            variant="outlined"
            @click.prevent="$router.push({ path: '/step-one' })"
          />
          <AtomButton
            label="Continuar"
            :disabled="stepInvalid"
            @click.prevent="
              () => {
                $router.push({ path: '/step-three' });
                store.setStep(routerName);
              }
            "
          />
        </div>
      </div>
    </template>
  </OrganismGrid>
</template>
<style lang="scss" scoped>
.form-step_two_juridica {
  width: 30rem;
  & > * {
    margin-bottom: 15px;
  }
  > .actions {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
}
</style>
