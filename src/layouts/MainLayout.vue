<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="bg-white text-grey-8" height-hint="64">
      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />
        <router-link v-if="$q.screen.gt.xs" class="q-ml-md" to="/">
          <q-toolbar-title
            shrink
            class="row items-center no-wrap cursor-pointer"
          >
            <img
              src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg"
            />
          </q-toolbar-title>
        </router-link>

        <q-space />

        <search-global></search-global>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            icon="add"
            @click="handleAddDialogPerfume"
            color="primary"
            label="Agregar"
          />
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Cuenta</q-tooltip>
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup @click="handleLogout">
                  <q-item-section>Cerrar sesión</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-white"
      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item
            class="GNL__drawer-item"
            v-ripple
            v-for="link in links1"
            :key="link.text"
            clickable
            :to="link.to"
            active-class="menu-active"
          >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm" />

          <q-item
            class="GNL__drawer-item"
            v-ripple
            v-for="link in links3"
            :key="link.text"
            clickable
          >
            <q-item-section>
              <q-item-label
                >{{ link.text }} <q-icon v-if="link.icon" :name="link.icon"
              /></q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="q-mb-sm absolute absolute-bottom text-center">
          <div class="flex flex-center q-gutter-xs">
            <a
              class="GNL__drawer-footer-link"
              href="javascript:void(0)"
              aria-label="Privacy"
              >Privacy</a
            >
            <span> · </span>
            <a
              class="GNL__drawer-footer-link"
              href="javascript:void(0)"
              aria-label="Terms"
              >Terms</a
            >
            <span> · </span>
            <a
              class="GNL__drawer-footer-link"
              href="javascript:void(0)"
              aria-label="About"
              >About Google</a
            >
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import {
  fasSprayCanSparkles,
  fasBagShopping,
  fasStar,
} from "@quasar/extras/fontawesome-v6";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import useAuthUser from "src/composables/useAuthUser";
import SearchGlobal from "components/SearchGlobal.vue";
import useUI from "composables/useUI";
const { leftDrawerOpen, toggleLeftDrawer, handleAddDialogPerfume } = useUI();
const { logout } = useAuthUser();

const router = useRouter();
const $q = useQuasar();
const handleLogout = async () => {
  $q.dialog({
    title: "Cerrar sesión",
    message: "Desea cerrar sesión?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await logout();
    router.replace({ name: "login" });
  });
};

const links1 = [
  { icon: fasSprayCanSparkles, text: "Perfumes", to: "/main/perfumes" },
  { icon: "monetization_on", text: "Gastos", to: "/main/gastos" },
  { icon: fasBagShopping, text: "Zapatillas", to: "main/zapatillas" },
  { icon: fasStar, text: "Wish List", to: "/main/wish-list" },
];
const links3 = [
  { icon: "", text: "Language & region" },
  { icon: "", text: "Settings" },
  { icon: "open_in_new", text: "Help" },
];
</script>

<style lang="scss" scoped>
.menu-active {
  background: $grey-9;
  .q-item__section {
    .q-icon {
      color: $white !important;
    }
    .q-item__label {
      color: $white;
    }
  }
}
.GNL {
  &__toolbar {
    height: 64px;
  }

  &__toolbar-input {
    width: 55%;
  }

  &__drawer-item {
    line-height: 24px;
    border-radius: 0 24px 24px 0;
    margin-right: 12px;

    .q-item__section--avatar {
      .q-icon {
        color: #5f6368;
      }
    }

    .q-item__label {
      color: #3c4043;
      letter-spacing: 0.01785714em;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.25rem;
    }
  }

  &__drawer-footer-link {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.75rem;

    &:hover {
      color: #000;
    }
  }
}
</style>