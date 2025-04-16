<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <ul>
          <li>
            <router-link to="/sitepolicy">
              {{ $t("sitepolicy") }}
            </router-link>
          </li>
          <li>
            <router-link to="/contact">
              {{ $t("contact") }}
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="copyright">
        &copy; 株式会社ミニクラウド
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String
  },
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
