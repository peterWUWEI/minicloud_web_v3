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
        <div
          class="card mb-3 text-center"
          v-for="job in orderedJobPosts"
          :key="job['data'].id"
        >
          <div class="card-body">
            <h4 class="card-title">
              {{ job["data"][$i18n.locale].title }}
            </h4>
            <p class="card-text">
              {{ job["data"][$i18n.locale].overview }}
            </p>
            <button
              type="button"
              class="btn btn-lg"
              @click="showDetails(job.id)"
            >
              {{ $t("job_details") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const _ = require("lodash");

export default {
  name: "career",
  bodyClass: "landing-page",
  computed: {
    orderedJobPosts() {
      return _.orderBy(this.jobPosts, Number(["id"]));
    },
  },
  data() {
    return {
      jobPosts: [],
    };
  },
  methods: {
    showDetails(jobPostId) {
      this.$router.push(`/career/${jobPostId}`);
    },
  },
  created() {
    const data = JSON.parse(sessionStorage.getItem("data"));
    this.jobPosts = _.filter(data, { category: "jobs" });
  },
};
</script>
<style></style>
