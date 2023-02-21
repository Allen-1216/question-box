<template>
  <!--navbar-->
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow row">
    <div class="col-3"></div>
    <div class="container col">
      <a href="/home"><img class="align-text-bottom" src="@/assets/image/envelope.svg"
                           style="height: 20px; width: 20px;"></a>
      <a class="navbar-brand" style="padding-left:5px" href="/home">
        提問箱
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#">查看信箱</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">收藏的問題</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal_login"
               data-bs-whatever="@id">登入</a>
            <div class="modal fade" id="exampleModal_login" data-bs-backdrop="static" tabindex="-1"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title ms-auto" id="exampleModalLabel">登入</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <label for="recipient-id-login" class="col-form-label">請輸入帳號 :</label>
                      <input v-model="user.username" type="text" class="form-control" id="recipient-id-login">
                      <label for="recipient-password" class="col-form-label">請輸入密碼 :</label>
                      <input v-model="user.password" type="password" class="form-control" id="recipient-password">
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button @click="login()" type="button" class="btn btn-primary">登入</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal_signup"
               data-bs-whatever="@id">註冊</a>
            <div class="modal fade" id="exampleModal_signup" data-bs-backdrop="static" tabindex="-1"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title ms-auto" id="exampleModalLabel">註冊</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div>

                  </div>
                  <div class="modal-body">
                    <form>
                      <label for="recipient-id-signup" class="col-form-label">帳號 :</label>
                      <input type="text" class="form-control" id="recipient-id-signup">
                      <label for="recipient-password-signup" class="col-form-label">密碼 :</label>
                      <input type="text" class="form-control" id="recipient-password-signup">
                      <label for="recipient-password-signup" class="col-form-label">確認密碼 :</label>
                      <input type="text" class="form-control" id="recipient-password-signup-confirm">
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary">註冊</button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-3"></div>
  </nav>
</template>

<script>
// import {mapActions} from 'vuex';
export default {
  name: "NavbarNotLogin",
  data() {
    const user = {
      username: "",
      password: "",
    }
    return {
      user
    }
  },
  // created(){
  //   this.$store.dispatch('login')
  // },
  computed: {},
  methods: {
    login() {
      const loginDetail = {
        username: this.user.username,
        password: this.user.password
      }
      return this.$store.dispatch('login', loginDetail);
    }
  }
}


</script>

<style scoped>

</style>