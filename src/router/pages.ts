export default [
  {
    path: "/error-404",
    name: "error-404",
    component: () => import("@/pages/Error404.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      action: "read",
    },
  },
  {
    path: "/login",
    name: "auth-login",
    component: () => import("@/pages/Login.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      redirectIfLoggedIn: true,
    },
  },
  {
    path: "/register",
    name: "auth-register",
    component: () => import("@/pages/Register.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      redirectIfLoggedIn: true,
    },
  },
  {
    path: "/forgot-password",
    name: "auth-forgot-password",
    component: () => import("@/pages/ForgotPassword.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      redirectIfLoggedIn: true,
    },
  },
  {
    path: "/pages/reset-password-v1",
    name: "auth-reset-password-v1",
    component: () => import("@/pages/ResetPassword-v1.vue"),
    meta: {
      layout: "full",
    },
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/pages/Dashboard.vue"),
  },
]
