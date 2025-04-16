<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <router-link class="navbar-brand" to="/">
        <h4 class="black">
          <img class="n-logo" width="54" src="img/now-logo.png" alt="" />
          Minicloud</h4>
      </router-link>

    </template>
    <template slot="navbar-menu">
      <li class="nav-item" style="margin-top:3px">
        <router-link class="nav-link" to="/services">
          <h4 class="black"><i class="now-ui-icons ui-2_settings-90"></i> {{ $t("services") }}</h4>
        </router-link>
      </li>

      <li class="nav-item" style="margin-top:3px">
        <router-link class="nav-link" to="/about">
          <h4 class="black"><i class="now-ui-icons business_badge"></i> {{ $t("about") }}</h4>
        </router-link>
      </li>

      <drop-down
        tag="li"
        :title="others_title()"
        icon="now-ui-icons design_bullet-list-67"
        class="nav-item"
      >
        <nav-link to="/news">
          <h5> <i class="now-ui-icons files_single-copy-04"></i> {{ $t("news") }} </h5>
        </nav-link>
        <nav-link to="/investor_info">
          <h5> <i class="now-ui-icons education_paper"></i> {{ $t("investors") }} </h5>
        </nav-link>
        <nav-link to="/sustainability">
          <h5> <i class="now-ui-icons users_single-02"></i> {{ $t("sustainability") }} </h5>
        </nav-link>
        <nav-link to="/career">
          <h5> <i class="now-ui-icons ui-1_zoom-bold"></i> {{ $t("hiring") }} </h5>
        </nav-link>
        <nav-link to="/faq">
          <h5> <i class="now-ui-icons travel_info"></i> {{ $t("questions") }} </h5>
        </nav-link>
      </drop-down>
      <li class="nav-item">
        <!-- <LocaleSwitcher /> -->
      </li>
      <drop-down
        :title="language_title()"
        icon="now-ui-icons business_globe"
        class="nav-item"
      >
        <h5> 
          <a class="dropdown-item" @click="changeLocale('jp')" style="cursor: pointer">
            日本語
          </a>
        </h5>
        <h5> 
          <a class="dropdown-item" @click="changeLocale('en')" style="cursor: pointer">
            English
          </a> 
        </h5>
        <h5>
          <a class="dropdown-item" @click="changeLocale('cn')" style="cursor: pointer">
            简体中文
          </a>
        </h5>
        <h5>
          <a class="dropdown-item" @click="changeLocale('tw')" style="cursor: pointer">
            繁體中文
          </a>
        </h5>
      </drop-down>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    DropDown,
    Navbar,
    NavLink,
    [Popover.name]: Popover
  },
  data() {
    return {
      selected: this.$i18n.locale,
      options: [
        { value: 'jp', text: '日本語' },
        { value: 'tw', text: '繁體中文' },
        { value: 'cn', text: '简体中文' },
        { value: 'en', text: 'English' },
      ],
    }
  },
  methods: {
    onChange(event) {
        this.$router.replace(this.switchLocalePath(event));
    },
    changeLocale(language) {
      this.$i18n.locale = language;
    },
    info_title() {
      return this.$i18n.messages[this.$i18n.locale].info
    },
    others_title() {
      return this.$i18n.messages[this.$i18n.locale].others
    },
    language_title() {
      return this.$i18n.messages[this.$i18n.locale].language
    }
  }
};
</script>

<style scoped>
  .black {
    color: black;
  }
</style>
