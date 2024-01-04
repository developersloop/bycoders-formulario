import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "step-one",
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
        component: () => import("@/components/templates/common/StepThree.vue"),
      },
      {
        path: "step-four",
        name: "step-four",
        component: () => import("@/components/templates/common/StepFour.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
