<template>
  <!--navbar-->
  <div class="container-fluid">
    <div class="navbar navbar-expand-lg navbar-light bg-light shadow row">
      <div class="col-3"></div>
      <div class="container col">
        <a href="/memberarea"><img class="align-text-bottom" src="@/assets/image/envelope.svg" style="height: 20px; width: 20px;"></a>
        <a class="navbar-brand" style="padding-left:5px" href="/home">
          提問箱
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" target="_blank" href="http://localhost:3000/api-docs">API 文件</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/memberarea">對外資訊</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/memberarea/letterbox">查看信箱</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/memberarea/bookmark">收藏的問題</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="bi bi-person-fill"></i>
              </a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                會員專區
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item pe-none" href="#">
                  <img v-if = member_data.avatar class="personal-avatar" alt="avatar" :src="member_data.avatar"> <!--頭像--> 
                  {{member_data.name}}
                </a></li>
                <li><a class="dropdown-item" href="/memberarea/data"><img style="padding-right: 5px;" src="@/assets/image/gear.svg">個人資料</a></li>
                <li><a @click="logout()" class="dropdown-item" href="#"><img style="padding-right: 5px;" src="@/assets/image/box-arrow-left.svg">登出{{member_data.name}}</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "NavbarLogin",
  created(){
    this.$store.dispatch('getMemberData')
  },
  computed:{
    ...mapGetters([
      'member_data'
    ]),
  },
  methods:{
    logout(){
      return this.$store.dispatch('logOut');
    }
  }
}
</script>

<style scoped>
.personal-avatar {
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  border-radius: 100%;
  border: 2px solid transparent;
  /* box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2); */
  /* transition: all ease-in-out .3s; */
}
</style>