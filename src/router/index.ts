import { createRouter, createWebHistory } from "vue-router";
import { stepStore } from "@/store/stepStore";

const midllewareGuard: (to: any, next: any) => void = (to, next) => {
  const store = stepStore();

  if (!store._currentStep) {
    return next("/step-one");
  } else {
    return next();
  }
};
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/templates/TemplateHome.vue"),
    redirect: "/step-one",
    children: [
      {
        path: "step-one",
        name: "step-one",
        component: () => import("@/components/templates/common/StepOne.vue"),
      },
      {
        path: "step-two",
        name: "step-two",
        beforeEnter: (to: any, from: any, next: any) => {
          return midllewareGuard(to, next);
        },
        component: () =>
          import("@/components/templates/common/StepTwo/StepTwo.vue"),
        children: [
          {
            path: "pessoa_fisica",
            name: "step-two_pessoa_fisica",
            component: () =>
              import("@/components/templates/common/StepTwo/PessoaFisica.vue"),
          },
          {
            path: "pessoa_juridica",
            name: "step-two_pessoa_juridica",
            component: () =>
              import(
                "@/components/templates/common/StepTwo/PessoaJuridica.vue"
              ),
          },
        ],
      },
      {
        path: "step-three",
        name: "step-three",
        beforeEnter: (to: any, from: any, next: any) => {
          return midllewareGuard(to, next);
        },
        component: () => import("@/components/templates/common/StepThree.vue"),
      },
      {
        path: "step-four",
        name: "step-four",
        beforeEnter: (to: any, from: any, next: any) => {
          return midllewareGuard(to, next);
        },
        component: () => import("@/components/templates/common/StepFour.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
