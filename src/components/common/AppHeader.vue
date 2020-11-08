<template>
  <nav
    class="app-header"
    :class="{ mobile: !desktop, hideSidebarMenu: hideSidebarMenu }"
  >
    <div v-show="!hideSidebarMenu" class="container" :class="{ open: open }">
      <div class="header-item" :class="{ open: open }">
        <a v-if="!isMobileApp" href="https://octa-coin.com">
          <img
              class="header-item-logo"
              src="../../../public/img/icons/octa-192x192.png"
              alt="Lunie sharing circle - dots on the left outline of the cirle, line on the right side"
          />
          OCTA
        </a>
        <router-link
          v-else
          :to="{ name: 'portfolio', params: { networkId: networkSlug } }"
          exact="exact"
          title="Portfolio"
        >
          <img
            class="header-item-logo"
            src="~assets/images/lunie-logo-white.svg"
            alt="Lunie sharing circle - dots on the left outline of the cirle, line on the right side"
          />
        </router-link>
        <div class="header-menu-section">
          <template v-if="!desktop">
            <UserMenu v-if="isMobileApp" />
            <div v-if="open" class="close-menu" @click="close()">
              <i class="material-icons notranslate mobile-menu-action">close</i>
            </div>
            <div v-if="!open" class="open-menu" @click="show()">
              <i class="material-icons notranslate mobile-menu-action"
                >more_vert</i
              >
            </div>
          </template>
        </div>
      </div>
      <AppMenu v-if="open || desktop" @close="close" />
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex"
import AppMenu from "common/AppMenu"
import UserMenu from "account/UserMenu"
export default {
  name: `app-header`,
  components: {
    AppMenu,
    UserMenu,
  },
  data: () => ({
    open: false,
    desktop: false,
  }),
  computed: {
    ...mapState([`session`, `connection`]),
    networkSlug() {
      return this.connection.networkSlug
    },
    isMobileApp() {
      return this.session.mobile
    },
    hideSidebarMenu() {
      return !this.desktop
    },
  },
  mounted: async function () {
    this.watchWindowSize()
    window.onresize = this.watchWindowSize
  },
  updated() {
    this.watchWindowSize()
    window.onresize = this.watchWindowSize
  },
  methods: {
    close() {
      this.open = false
    },
    show() {
      if (this.session.currrentModalOpen) {
        this.session.currrentModalOpen.close()
      }
      this.open = true
    },
    watchWindowSize() {
      const w = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      )

      if (w >= 1024) {
        this.close()
        this.desktop = true
        return
      } else {
        this.desktop = false
      }
    },
  },
}
</script>

<style scoped>
.app-header {
  z-index: var(--z-appHeader);
  position: relative;
  width: var(--sidebar-plus-width);
  display: flex;
  flex-direction: row;
}

.app-header.hideSidebarMenu {
  width: 4rem;
}

.container {
  display: flex;
  width: var(--sidebar-plus-width);
  flex-direction: row;
}

.app-header .header-item.open {
  background: var(--app-nav);
}

.mobile-menu-action {
  font-size: 1.5rem !important;
}

.app-header > .container {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  padding-top: 1.4rem;
}

@media screen and (max-width: 1023px) {
  .app-header > .container.open {
    height: 100%;
    overflow: auto;
  }

  .app-header > .container {
    position: fixed;
    top: 0;
  }
}

.header-item-logo {
  height: 2rem;
  width: 6.5rem;
  fill: var(--menu-bright);
}

.header-menu-section {
  display: flex;
  align-items: center;
}

.header-menu-section > * {
  padding: 0 0.5rem;
}

.mobile-menu-action,
.header-menu-section a {
  color: var(--menu-bright);
}

.app-header .header-item {
  padding: 1.75rem;
  font-size: 0;
}

.app-header .header-item a {
  display: inline-block;
}

@media screen and (max-width: 1023px) {
  .app-header {
    width: 100%;
    min-height: 0;
  }

  .container {
    background: var(--app-nav);
    position: fixed;
    width: 100%;
  }

  .app-header .header-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    color: var(--link);
    cursor: pointer;
  }

  .header-item-logo {
    height: 1.75rem;
  }
}

@media screen and (min-width: 1024px) {
  .app-header > .container {
    position: fixed;
    height: 100%;
    overflow: auto;
    background: var(--app-nav);
  }
}

/* iPhone X and Xs Max */
@media only screen and (min-device-width: 375px) and (min-device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait) {
  .app-header > .container {
    padding-top: 2.2rem;
  }
}

/* iPhone XR */
@media only screen and (min-device-width: 414px) and (min-device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait) {
  .app-header > .container {
    padding-top: 2.2rem;
  }
}
</style>
