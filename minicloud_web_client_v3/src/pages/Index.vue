<template>
  <div>
    <div class="page-header clear-filter" filter-color="black">
      <parallax
        class="page-header-image"
        :style="{ 'background-image': 'url(' + require('../assets/img/header.jpg') + ')' }"
      >
      </parallax>
      <div class="container">
        <div class="content-center brand">
          <h2 class="black">{{$t("slogan")}}</h2>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container text-center">
        <div class="row justify-content-md-center">
          <div class="col-md-12 col-lg-8">
            <h2 class="title"></h2>
            <h5 class="description">
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Parallax } from '@/components';

export default {
  name: 'index',
  bodyClass: 'index-page',
  components: {
    Parallax
  }
};
</script>

<style scoped>
  .black {
    color: black;
  }
</style>
