<template>
  <div>
    <div class="page-header page-header-small">
      <parallax
        class="page-header-image"
        :style="{
          'background-image':
            'url(' + require('../../assets/img/bg-career.jpeg') + ')',
        }"
      >
      </parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">{{ $t("hiring") }}</h1>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container">
        <h3>{{ title }}</h3>
        <p>{{ overview }}</p>
        <h3>{{ $t("job_description") }}</h3>
        <p v-for="desc in job_descriptions" :key="desc">
          {{ `${desc ? "・" + desc : ""}` }}
        </p>
        <h3>{{ $t("job_requirements") }}</h3>
        <p v-for="req in job_requirements" :key="req">
          {{ `${req ? "・" + req : ""}` }}
        </p>
        <h3>{{ $t("job_advanced_requirements") }}</h3>
        <p v-for="adv_req in job_advanced_requirements" :key="adv_req">
          {{ `${adv_req ? "・" + adv_req : ""}` }}
        </p>
        <h3>{{ $t("job_benefits") }}</h3>
        <p v-for="benefit in benefits" :key="benefit">
          {{ `${benefit ? "・" + benefit : ""}` }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const _ = require("lodash");

export default {
  name: "job_details",
  bodyClass: "landing-page",
  computed: {
    title() {
      return this.jobPost["data"][this.$i18n.locale]?.title;
    },
    overview() {
      return this.jobPost["data"][this.$i18n.locale]?.overview;
    },
    job_descriptions() {
      const description = this.jobPost["data"][this.$i18n.locale]?.description;
      return _.split(description, /\s*;\s*/);
    },
    job_requirements() {
      const requirements =
        this.jobPost["data"][this.$i18n.locale]?.primary_requirements;
      return _.split(requirements, /\s*;\s*/);
    },
    job_advanced_requirements() {
      const advanced_requirements =
        this.jobPost["data"][this.$i18n.locale]?.additional_requirements;
      return _.split(advanced_requirements, /\s*;\s*/);
    },
    benefits() {
      const benefits =
        this.jobPost["data"][this.$i18n.locale]?.benefits ||
        this.jobPost["data"][this.$i18n.locale]?.benefit;
      return _.split(benefits, /\s*;\s*/);
    },
  },
  data() {
    return {
      jobPost: {},
    };
  },
  created() {
    if (!sessionStorage.getItem("data")) {
      this.$router.push("/");
    }
    const data = JSON.parse(sessionStorage.getItem("data"));
    let jobPosts = _.filter(data, { category: "jobs" });
    this.jobPost = _.find(jobPosts, { id: this.$route.params.id });
  },
};
</script>
<style></style>
