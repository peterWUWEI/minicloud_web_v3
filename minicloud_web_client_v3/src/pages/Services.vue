<template>
  <div>
    <div class="page-header page-header-small">
      <parallax
        class="page-header-image"
        :style="{
          'background-image':
            'url(' + require('../assets/img/bg-services.jpg') + ')',
        }"
      >
      </parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">{{ $t("services") }}</h1>
        </div>
      </div>
    </div>
    <div
      class="section section-about-us"
      v-for="service in orderedServices"
      :key="service.id"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h2 class="title">{{ service["data"][$i18n.locale]?.title }}</h2>
            <h5 class="description display-text">
              {{ service["data"][$i18n.locale]?.content }}
            </h5>
            <img v-bind:src="service.image_url" class="img-raised" />
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
const _ = require("lodash");

export default {
  name: "services",
  bodyClass: "landing-page",
  computed: {
    orderedServices() {
      return _.orderBy(this.services, "id");
    },
  },
  data() {
    return {
      services: [],
    };
  },
  created() {
    const data = JSON.parse(sessionStorage.getItem("data"));
    this.services = _.filter(data, { category: "services" });
  },
};
</script>

<style>
.display-text {
  white-space: pre-line;
  text-align: left;
}
</style>
