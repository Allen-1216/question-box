<template>
  <!--navbar-->
  <NavbarNotLogin></NavbarNotLogin>
  <!--image-->
  <div class="mx-auto" style="max-width:400px; max-height:300px; margin-top: 60px">
    <img class="img-fluid img-thumbnail" src="@/assets/image/letters.png" alt="letters">
  </div>
  <!--text box-->
  <div class="row">
    <div class="col"></div>
    <div class="col-10 text-center">

      <h1>首頁</h1>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import NavbarNotLogin from "@/components/NavbarNotLogin";
export default {
  name: "HomePage",
  components: {NavbarNotLogin}
}
</script>

<style scoped>

</style>