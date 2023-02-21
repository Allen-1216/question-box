<template>
  <!--navbar-->
  <NavbarLogin/>
  <!--text box-->
  <div class="row" style="margin-top: 100px">
    <div class="col"></div>
    <div class="col-4 text-center shadow border">
      <p>@頭像</p> <!--頭像-->
      <p>{{member_data.NAME}}</p> <!--名稱-->
      <p>{{member_data.ID}}</p> <!--id-->
      <p>{{member_data.EMAIL}}</p> <!--email-->
      <p>{{member_data.INTRODUCTION}}</p> <!--自我介紹-->
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import NavbarLogin from "@/components/NavbarLogin";
export default {
  name: "MemberAreaPage",
  // eslint-disable-next-line vue/no-unused-components
  components: {NavbarLogin},
  // data(){
  //   this.$store.dispatch('getMemberData')
  // },
  created(){
    this.$store.dispatch('getMemberData')
  },
  computed:{
    ...mapGetters([
      'member_data'
    ]),
  },
}
</script>

<style scoped>
*{
  word-break : break-all
}
</style>