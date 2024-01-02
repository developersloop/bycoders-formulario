import { defineAsyncComponent } from "vue";
import MoleculeLoader from "./components/molecules/MoleculeLoader.vue";

export const loadComponent: (type: string, nameComponent: string) => string = (
  type: string,
  nameComponent: string
) => {
  return defineAsyncComponent({
    loadingComponent: MoleculeLoader,
    loader: () => import("@/components/" + type + "/" + nameComponent),
  });
};
