<template>
  <!--navbar-->
  <NavbarLogin/>
  <!--text box-->
  <div class="row" style="margin-top: 100px">
    <div class="col"></div>
    <div class="col-4 text-center shadow border">
      <p>@頭像</p> <!--頭像-->
      <p>{{member_data.name}}</p> <!--名稱-->
      <p>@{{member_data.account}}</p> <!--id-->
      <p>{{member_data.email}}</p> <!--email-->
      <p>{{member_data.introduction}}</p> <!--自我介紹-->
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
  word-break : break-all;  /*內容超出時換行*/
}
</style>