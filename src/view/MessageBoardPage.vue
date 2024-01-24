<template>
  <!--navbar-->
  <nav v-if = "is_logged_in"><NavbarLogin/></nav>
  <nav v-else><NavbarNotLogin/></nav>
  <!--text box-->
  <div class="row" style="margin-top: 100px">
    <div class="col"></div>
    <div class="col-4 text-center shadow border">
      <p>頭像</p> <!--頭像-->
      <p>{{message_board_data.name}}</p> <!--顯示名稱-->
      <p>@{{message_board_data.account}}</p> <!--account-->
      <p>@logo</p> <!--logo-->
      <p>{{message_board_data.introduction}}</p> <!--自我介紹-->
    </div>
    <div class="col"></div>
  </div>
  <div class="row" style="margin-top: 100px">
    <div class="col"></div>
    <div class="col-4 border">
      <h5 style="padding: 10px 0px 5px 0px; color:darkgray;">在這裡填入你的問題</h5>
      <textarea v-model="input" class="form-control" aria-label="With textarea"></textarea>
      <div style="padding: 10px 0px 10px 0px;" class="text-center" @click="btn_send()" ><button type="button" class="btn btn-secondary">送出</button></div>
    </div>
    <div class="col"></div>
  </div>
  <div class="row" style="margin: 100px 0px 100px 0px;">
    <div class="col"></div>
    <div class="col-4 border">
      <h5 class="text-center" style="padding: 10px 0px 5px 0px;">曾經回答的問題</h5>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import NavbarLogin from "@/components/NavbarLogin";
import NavbarNotLogin from "@/components/NavbarNotLogin";
export default {
  name: "message_board",
  components: {NavbarNotLogin, NavbarLogin},
  data(){
    return{
      input : '',
    }
  },
  created() {
    this.$store.dispatch('isLoggedIn');
    this.$store.dispatch('getMessageBoardData');
    this.$store.dispatch('getMemberData');
  },
  methods:{
    btn_send(){
      const contentDetail = {
        account: this.message_board_data.account,
        input: this.input,
        sender_name: this.member_data.name,
      }
      this.$store.dispatch('addContent', contentDetail);
      this.input = ''; // set input field back to blank
    }
  },
  computed:{
    ...mapGetters([
      'message_board_data', 'member_data', 'is_logged_in'
    ]),
  },
}
</script>

<style scoped>
*{
  word-break : break-all
}
</style>