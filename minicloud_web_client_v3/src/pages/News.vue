<template>
  <div>
    <div class="page-header page-header-small">
      <parallax
        class="page-header-image"
        :style="{
          'background-image':
            'url(' + require('../assets/img/bg-news.jpeg') + ')',
        }"
      >
      </parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">{{ $t("news") }}</h1>
        </div>
      </div>
    </div>
    <div
      class="section section-about-us"
      v-for="element in orderedNews"
      :key="element.id"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h2 class="title">{{ element["data"][$i18n.locale].title }}</h2>
            <img v-bind:src="element.image_url" class="img-raised" />
            <h5 class="description display-text">
              {{ element["data"][$i18n.locale].content }}
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
export default {
  name: "news",
  bodyClass: "landing-page",
  computed: {
    orderedNews() {
      return _.orderBy(this.news, "id");
    },
  },
  data() {
    return {
      news: [],
    };
  },
  created() {
    if (!sessionStorage.getItem("data")) {
      this.$router.push("/");
    }
    const data = JSON.parse(sessionStorage.getItem("data"));
    this.news = _.filter(data, { category: "news" });
  },
};
</script>
<style></style>
