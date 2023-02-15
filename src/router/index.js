import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import myDecks from "../views/myDecks.vue";
import { account } from "../composables/auth.js";
import Search from "../views/Search.vue";
import Deck from "../views/Deck.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/my-decks",
      name: "my-decks",
      component: myDecks,
    },
    {
      path: "/search",
      name: "search",
      component: Search,
    },
    {
      path: "/deck/:id",
      name: "deck",
      component: Deck,
      props: true,
    },
  ],
});

const authRoutes = ["login", "register"];
const accountRoutes = ["my-decks"];
router.beforeEach(async (to, from, next) => {
  const name = to.name;

  try {
    const session = await account.getSession("current");
    to.meta.session = session;
    console.log(
      "ses: " + session.$id + " to.meta.ses: " + to.meta.session + " to: " + to
    );

    if (authRoutes.includes(name)) {
      return next({ name: "my-decks" });
    }
  } catch (err) {
    if (accountRoutes.includes(name)) {
      return next({ name: "login" });
    }
  }

  next();
});

export default router;
