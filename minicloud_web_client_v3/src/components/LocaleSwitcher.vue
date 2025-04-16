<template>
  <!-- <div class="locale-switcher">
    <select v-model="$i18n.locale">
      <option value="en">English</option>
      <option value="jp">日本語</option>
      <option value="tw">繁體中文</option>
      <option value="cn">简体中文</option>
    </select>
  </div> -->
  <drop-down
    tag="li"
    title="Others"
    icon="now-ui-icons business_globe"
    class="nav-item"
  >
    <nav-link to="/sustainability">
      <i class="now-ui-icons education_paper"></i> {{ $t("sustainability") }}
    </nav-link>
    <nav-link to="/login">
      <i class="now-ui-icons users_circle-08"></i> {{ $t("investors") }}
    </nav-link>
    <nav-link to="/profile">
      <i class="now-ui-icons users_single-02"></i> {{ $t("investors") }}
    </nav-link>
  </drop-down>
</template>

<script>
export default {
  name: 'locale-switcher',
  data() {
    return {
      locale: $i18n.locale
    }
  },
  method: {

  }
}
</script>