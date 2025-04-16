<template>
  <div>
    <div class="page-header page-header-small">
      <parallax
        class="page-header-image"
        :style="{
          'background-image':
            'url(' + require('../assets/img/bg-sitepolicy.jpg') + ')',
        }"
      >
      </parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">{{ $t("sitepolicy") }}</h1>
        </div>
      </div>
    </div>
    <div class="section section-about-us">
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h2 class="title">{{ sitepolicy["data"][$i18n.locale].title }}</h2>
            <h5 class="description display-text">
              {{ sitepolicy["data"][$i18n.locale].content }}
            </h5>
          </div>
        </div>
        <div class="separator separator-primary"></div>
        <div class="section-story-overview">
          <div class="row"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, FormGroupInput } from "@/components";
export default {
  name: "sitepolicy",
  bodyClass: "landing-page",
  components: {
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      sitepolicy: {},
    };
  },
  created() {
    if (!sessionStorage.getItem("data")) {
      this.$router.push("/");
    }
    const data = JSON.parse(sessionStorage.getItem("data"));
    this.sitepolicy = _.find(data, { category: "policies" });
  },
};
</script>
<style></style>
