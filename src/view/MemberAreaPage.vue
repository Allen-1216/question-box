<template>
  <!--navbar-->
  <NavbarLogin/>
  <!--text box-->
  <div class="row" style="margin-top: 100px">
    <div class="col"></div>
    <div class="col-10 col-sm-8 col-md-5 text-center shadow border">
      <img v-if = member_data.avatar class="personal-avatar" alt="avatar" :src="member_data.avatar"> <!--頭像-->
      <p style="padding-top:5px;" >{{member_data.name}}</p> <!--名稱-->
      <p>@{{member_data.account}}</p> <!--id-->
      <p>{{member_data.email}}</p> <!--email-->
      <p class="text-newline">{{member_data.introduction}}</p> <!--自我介紹-->
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
.text-newline{
  white-space : pre-wrap; /*讀取時將\n換行*/
}
.personal-avatar {
  width: 120px;
  height: 120px;
  box-sizing: border-box;
  border-radius: 100%;
  border: 2px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  transition: all ease-in-out .3s;
}
.personal-avatar:hover {
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
}
</style>