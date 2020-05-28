import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Logo from "@/components/header/Logo.vue";
import CollapsibleCart from "@/components/collpasible-cart/index.vue";
import CollapsibleCartIcon from "@/components/collpasible-cart/Icon.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Cart" },
    meta: {
      headerComponent: {
        middle: Logo,
        right: CollapsibleCartIcon
      }
    },
    name: "Home",
    component: Home
  },
  {
    path: "/cart",
    meta: {
      headerComponent: {
        middle: Logo
      }
    },
    name: "Cart",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "cart" */ "../views/Cart.vue")
  },
  {
    path: "/subscription",
    meta: {
      headerComponent: {
        left: Logo,
        right: CollapsibleCart
      }
    },
    name: "Subscription",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "subscription" */ "../views/Subscription.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
