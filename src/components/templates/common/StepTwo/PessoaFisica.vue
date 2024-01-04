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
    !_form.value["step-two_pessoa_fisica"]?.nome ||
    !_form.value["step-two_pessoa_fisica"]?.cpf ||
    !_form.value["step-two_pessoa_fisica"]?.phone ||
    !_form.value["step-two_pessoa_fisica"]?.data_nascimento
  );
});

function input(name: string, value: string): void {
  if (value) {
    modelValues[name] = value;
    store.setForm("step-two_pessoa_fisica", name, value);
  }
}
</script>
<template>
  <OrganismGrid>
    <template #context>
      <div class="form-step_two_fisica">
        <MoleculeHeader v-if="!props.isSlot" />
        <MoleculeInput
          type="text"
          label="Nome"
          name="nome"
          :value="_form['step-two_pessoa_fisica']?.nome"
          @model="(value) => input('nome', value)"
        />
        <MoleculeInput
          type="text"
          label="CPF"
          mask="###.###.###-##"
          name="cpf"
          :value="_form['step-two_pessoa_fisica']?.cpf"
          @model="(value) => input('cpf', value)"
        />
        <MoleculeInput
          type="text"
          label="Data de nascimento"
          mask="##/##/####"
          name="data_nascimento"
          :value="_form['step-two_pessoa_fisica']?.data_nascimento"
          @model="(value) => input('data_nascimento', value)"
        />
        <MoleculeInput
          type="text"
          label="Telefone"
          mask="(##)#####-####"
          name="phone"
          :value="_form['step-two_pessoa_fisica']?.phone"
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
.form-step_two_fisica {
  width: 30rem;
  & > * {
    margin-bottom: 15px;
  }
  .actions {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
}
</style>
