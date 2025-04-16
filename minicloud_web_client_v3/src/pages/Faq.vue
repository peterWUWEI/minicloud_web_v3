<template>
  <div>
    <div class="page-header page-header-small">
      <parallax
        class="page-header-image"
        :style="{ 'background-image': 'url(' + require('../assets/img/bg-faq.jpg') + ')' }"
      >
      </parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">{{ $t("questions") }}</h1>
        </div>
      </div>
    </div>
    <div class="section section-about-us" v-for="element in faqs" :key="element.id">
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto">
            <h4><strong>{{ $t("question") }}</strong> : {{ element['data'][$i18n.locale].question }}</h4>
            <h4 class="display-text">
              <strong>{{ $t("answer") }}</strong> : {{ element['data'][$i18n.locale].answer }}
            </h4>
          </div>
        </div>
        <div class="separator separator-primary"></div>
        <div class="section-story-overview">
          <div class="row">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'faq',
  bodyClass: 'landing-page',
  data() {
    return {
      faqs: []
    }
  },
  created() {
    const data = JSON.parse(sessionStorage.getItem('data'))
    this.faqs = _.filter(data, {'category': 'qnas'})
  }
};
</script>
<style></style>
