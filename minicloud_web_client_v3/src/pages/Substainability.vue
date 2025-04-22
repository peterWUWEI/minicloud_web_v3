<template>
  <div>
    <div class="page-header page-header-small">
      <parallax
        class="page-header-image"
        :style="{
          'background-image': 'url(' + require('../assets/img/bg-sd.jpg') + ')',
        }"
      >
      </parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">{{ $t("sustainability") }}</h1>
        </div>
      </div>
    </div>
    <div
      class="section section-about-us"
      v-for="sus in orderedSustainability"
      :key="sus.title"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h2 class="title">
              {{ sus["data"][$i18n.locale].title }}
            </h2>
            <h5 class="description">
              {{ sus["data"][$i18n.locale].content }}
            </h5>
            <iframe
              :src="sustainability.image_url"
              style="width: 100%; height: 800px"
              v-if="sus.image_url"
            ></iframe>
            <!-- <vue-pdf-embed :source="sustainability.image_url" v-if="sustainability.image_url"/> -->
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
  name: "sustainability",
  bodyClass: "landing-page",
  computed: {
    orderedSustainability() {
      return _.orderBy(this.sustainability, "id");
    },
  },
  data() {
    return {
      sustainability: [],
    };
  },
  created() {
    if (!sessionStorage.getItem("data")) {
      this.$router.push("/");
    }
    const data = JSON.parse(sessionStorage.getItem("data"));
    this.sustainability = _.filter(data, { category: "sustainability" });
  },
};
</script>
<style></style>
