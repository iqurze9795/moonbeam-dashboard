<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <!-- <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul> -->

    <!-- Left Col -->
    <!-- <div
      class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex"
    > -->
    <!-- Bookmarks Container -->

    <!-- <bookmarks v-if="false" /> -->
    <!-- </div> -->
    <b-col>
      <address-search />
    </b-col>
    <b-navbar-nav class="nav align-items-center ml-auto">
      <locale v-if="false" />
      <dark-Toggler class="d-none d-lg-block" />
      <search-bar v-if="false" />
      <cart-dropdown />
      <notification-dropdown class="d-none" />
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
import { BLink, BNavbarNav } from 'bootstrap-vue'
import Bookmarks from './components/Bookmarks.vue'
import Locale from './components/Locale.vue'
import SearchBar from './components/SearchBar.vue'
import DarkToggler from './components/DarkToggler.vue'
import CartDropdown from './components/CartDropdown.vue'
import NotificationDropdown from './components/NotificationDropdown.vue'
import UserDropdown from './components/UserDropdown.vue'
import AddressSearch from '@/components/AddressSearch.vue'
export default {
  components: {
    BNavbarNav,
    Locale,
    SearchBar,
    DarkToggler,
    CartDropdown,
    NotificationDropdown,
    UserDropdown,
    AddressSearch
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {}
    }
  }
}
</script>
