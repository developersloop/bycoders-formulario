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

export const isNullish: (obj: any) => boolean = (obj: any) => {
  return Object.values(obj).every((value) => {
    if (value === null) return true;
    return false;
  });
};

export const cleanCache = () => {
  localStorage.removeItem("route-back-step-three");
};
