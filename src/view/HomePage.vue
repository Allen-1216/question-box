<template>
  <!--navbar-->
  <nav v-if = "is_logged_in"><NavbarLogin/></nav>
  <nav v-else><NavbarNotLogin/></nav>
  <!--image-->
  <div class="mx-auto homepage-img">
    <img class="img-fluid img-thumbnail" src="@/assets/image/letters.png" alt="letters">
  </div>
  <!--text box-->
  <div class="row">
    <div class="col"></div>
    <div class="col-10 text-center">
      <h1 style="padding-top: 10px;">首頁</h1>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import NavbarNotLogin from "@/components/NavbarNotLogin";
import NavbarLogin from "@/components/NavbarLogin";
import {mapGetters} from "vuex";
export default {
  name: "HomePage",
  components: {NavbarNotLogin, NavbarLogin},
  created(){
    this.$store.dispatch('isLoggedIn')
  },
  computed:{
    ...mapGetters([
      'is_logged_in'
    ]),
  },
}
</script>

<style scoped>
  .homepage-img{
    max-width : 400px;
    max-height : 300px;
    margin-top : 60px
  }
</style>