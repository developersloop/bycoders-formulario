import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "step-one",
    component: () => import("@/components/templates/TemplateHome.vue"),
    children: [
      {
        path: "step-two",
        name: "step-two",
        component: () => import("@/components/templates/common/StepTwo.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
