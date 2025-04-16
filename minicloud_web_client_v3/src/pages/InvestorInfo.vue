<template>
  <div>
    <div class="page-header page-header-small">
      <parallax
        class="page-header-image"
        :style="{
          'background-image':
            'url(' + require('../assets/img/bg-invest.jpg') + ')',
        }"
      >
      </parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">{{ $t("investors") }}</h1>
        </div>
      </div>
    </div>
    <div
      class="section section-about-us"
      v-for="ele in orderedInvestorInfo"
      :key="ele.title"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h2 class="title">{{ ele["data"][$i18n.locale].title }}</h2>
            <h5 class="description display-text">
              {{ ele["data"][$i18n.locale].content }}
            </h5>
            <iframe
              :src="ele.pdf_file_url"
              style="width: 100%; height: 800px"
              v-if="ele.pdf_file_url"
            ></iframe>
            <!-- <vue-pdf-embed :source="ele.pdf_file_url" v-if="ele.pdf_file_url" /> -->
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
  name: "investor_info",
  bodyClass: "landing-page",
  computed: {
    orderedInvestorInfo() {
      return _.orderBy(this.investor_info, "id");
    },
  },
  data() {
    return {
      investor_info: [],
    };
  },
  created() {
    const data = JSON.parse(sessionStorage.getItem("data"));
    this.faqs = _.filter(data, { category: "investorInfo" });
  },
};
</script>
<style></style>
