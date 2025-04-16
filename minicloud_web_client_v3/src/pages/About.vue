<template>
  <div>
    <div class="page-header page-header-small">
      <parallax
        class="page-header-image"
        :style="{
          'background-image':
            'url(' + require('../assets/img/bg-about.jpeg') + ')',
        }"
      >
      </parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">{{ $t("about") }}</h1>
        </div>
      </div>
    </div>

    <div class="section section-about-us text-center">
      <div class="container">
        <h2 class="title">{{ $t("company_info") }}</h2>
        <div class="col-md-8 ml-auto mr-auto text-center">
          <table style="width: 100%">
            <tr>
              <th>{{ $t("company_name") }}</th>
              <td>{{ company_info["data"][$i18n.locale].name }}</td>
            </tr>
            <tr>
              <th>{{ $t("company_address") }}</th>
              <td>{{ company_info["data"][$i18n.locale].address }}</td>
            </tr>
            <tr>
              <th>{{ $t("date_of_estblish") }}</th>
              <td>{{ company_info["data"][$i18n.locale].established_date }}</td>
            </tr>
            <tr>
              <th>{{ $t("company_fund") }}</th>
              <td>{{ company_info["data"][$i18n.locale].fund }}</td>
            </tr>
            <tr>
              <th>{{ $t("company_services") }}</th>
              <td>{{ company_info["data"][$i18n.locale].business_content }}</td>
            </tr>
            <tr>
              <th>{{ $t("milestones") }}</th>
              <td>{{ company_info["data"][$i18n.locale].milestones }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="section section-team text-center">
      <div class="container">
        <h2 class="title">{{ $t("our_team") }}</h2>
        <div class="team">
          <div class="row">
            <div
              class="col-md-4"
              v-for="team_member in orderedTeamMembers"
              :key="team_member.id"
            >
              <div class="team-player">
                <img
                  :src="team_member.image_url"
                  alt="Thumbnail Image"
                  class="img-fluid img-raised"
                />
                <h4 class="title">
                  {{ team_member["data"][$i18n.locale].name }}
                </h4>
                <p class="category text-black">
                  {{ team_member["data"][$i18n.locale].title }}
                </p>
                <p class="description display-text">
                  {{ team_member["data"][$i18n.locale].desc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="section section-about-us"
      v-for="element in orderedAbout"
      :key="element.title"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-8 ml-auto mr-auto text-center">
            <h2 class="title">{{ element["data"][$i18n.locale].title }}</h2>
            <img
              v-bind:src="element['data'][$i18n.locale].image_url"
              class="img-raised"
            />
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
const _ = require("lodash");

export default {
  name: "about",
  bodyClass: "landing-page",
  computed: {
    orderedAbout() {
      return _.orderBy(this.about, "id");
    },
    orderedTeamMembers() {
      return _.orderBy(this.team_members, "id");
    },
  },
  data() {
    return {
      about: [],
      team_members: [],
      company_info: {},
    };
  },
  created() {
    if (!sessionStorage.getItem("data")) {
      this.$router.push("/");
    }
    const data = JSON.parse(sessionStorage.getItem("data"));
    this.about = _.filter(data, { category: "about" });
    this.team_members = _.filter(data, { category: "teammembers" });
    this.company_info = _.find(data, { category: "companyInfo" });
  },
};
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th {
  border: 1px solid #dddddd;
  text-align: middle;
  padding: 8px;
  border: 1px dotted;
  width: 150px;
  overflow: hidden;
}

td {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  white-space: pre-wrap; /* 👈 this is the important part */
  border: 1px dotted;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
