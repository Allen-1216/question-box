<template>
  <!--navbar-->
  <NavbarNotLogin/>
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
      <textarea v-model="input" @keyup.enter="monitorEnterKey" class="form-control" aria-label="With textarea"></textarea>
      <div style="padding: 10px 0px 10px 0px;" class="text-center" @click="monitorEnterKey" ><button type="button" class="btn btn-secondary">送出</button></div>
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
import NavbarNotLogin from "@/components/NavbarNotLogin";
export default {
  name: "message_board",
  components: {NavbarNotLogin},
  data(){
    return{
      input : '',
    }
  },
  created() {
    this.$store.dispatch("getMessageBoardData")
  },
  methods:{
    monitorEnterKey(){
      this.$store.dispatch('addNote', this.input)
      this.input = ''; // set input field back to blank
    }
  },
  computed:{
    ...mapGetters([
      'message_board_data'
    ]),
  },
}
</script>

<style scoped>
*{
  word-break : break-all
}
</style>