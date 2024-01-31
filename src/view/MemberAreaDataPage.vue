<template>
  <!--navbar-->
  <NavbarLogin/>
  <!--letterbox-->
  <div class="row" style="margin-top: 50px">
    <div class="col"></div>
    <div class="col-10 col-sm-7 col-md-4 row" style="padding: 0;">
      <h1 class="text-center">個人資料</h1>
      <div class="personal-image">
        <label class="label">
          <input type="file" @change="chgAvatarData" accept="image/*"/>
          <figure class="personal-figure">
            <img v-if = member_data.avatar class="personal-avatar" alt="avatar" :src="member_data.avatar">
            <img v-else src="@/assets/image/card-image.svg" class="personal-avatar" alt="avatar">
            <figcaption class="personal-figcaption">
              <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png">
            </figcaption>
          </figure>
        </label>
      </div>
      <!----bs-gutter-x:0;-->
      <div class="border border-2 rounded-3" style="padding: 15px; margin-bottom: 10px">
        <img style="opacity: 0.3;" class="float-end btn pe-none" data-bs-toggle="modal" data-bs-target="#exampleModal_changeid" data-bs-whatever="@id" src="@/assets/image/pencil-square.svg">
        <span>id: </span>
        <span>{{member_data.account}}</span> <!--account-->
<!--        <div class="modal fade" id="exampleModal_changeid" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">-->
<!--          <div class="modal-dialog">-->
<!--            <div class="modal-content">-->
<!--              <div class="modal-header">-->
<!--                <h5 class="modal-title" id="exampleModalLabel">更改 id</h5>-->
<!--                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>-->
<!--              </div>-->
<!--              <div class="modal-body">-->
<!--                <form>-->
<!--                  <label for="recipient-name" class="col-form-label">請輸入新 id:</label>-->
<!--                  <input type="text" class="form-control" id="recipient-name">-->
<!--                </form>-->
<!--              </div>-->
<!--              <div class="modal-footer">-->
<!--                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>-->
<!--                <button type="button" class="btn btn-primary">儲存</button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div class="border border-2 rounded-3" style="padding: 15px; margin-bottom: 10px">
        <img class="float-end btn" data-bs-toggle="modal" data-bs-target="#exampleModal_changename" data-bs-whatever="@id" src="@/assets/image/pencil-square.svg">
        <span>顯示名稱: </span>
        <span>{{member_data.name}}</span> <!--顯示名稱-->
        <div class="modal fade" id="exampleModal_changename" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">更改 顯示名稱</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <label for="recipient-name" class="col-form-label">請輸入新名稱:</label>
                  <input v-model="user.name" type="text" class="form-control" id="recipient-name" autocomplete="off">
                </form>
              </div>
              <div class="modal-footer">
                <button @click="clearNameForm()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button @click="btn_chgAreaData()" type="button" class="btn btn-primary">儲存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border border-2 rounded-3" style="padding: 15px; margin-bottom: 10px">
        <img class="float-end btn" data-bs-toggle="modal" data-bs-target="#exampleModal_changeemail" data-bs-whatever="@id" src="@/assets/image/pencil-square.svg">
        <span>email: </span>
        <span>{{member_data.email}}</span> <!--顯示email-->
        <div class="modal fade" id="exampleModal_changeemail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">更改 email</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <label for="recipient-name" class="col-form-label">請輸入新 email:</label>
                  <input v-model="user.email" @input="validateEmail" type="email" class="form-control" id="recipient-name" placeholder="name@gmail.com" autocomplete="off">
                  <div v-if="emailValidationMessage" class="email-verify-message">{{ emailValidationMessage }}</div>
                </form>
              </div>
              <div class="modal-footer">
                <button @click="clearEmailForm()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button @click="btn_chgEmailData()" type="button" class="btn btn-primary">儲存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border border-2 rounded-3" style="padding: 15px; margin-bottom: 10px">
        <img class="float-end btn" data-bs-toggle="modal" data-bs-target="#exampleModal_Selfintroduction" data-bs-whatever="@id" src="@/assets/image/pencil-square.svg">
        <span>自我介紹: </span>
        <span class="text-newline">{{member_data.introduction}}</span> <!--自我介紹-->
        <div class="modal fade" id="exampleModal_Selfintroduction" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">更改 自我介紹</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form>
                  <label for="recipient-name" class="col-form-label">請輸入新自我介紹:</label>
                  <textarea v-model="user.introduction" type="text" class="form-control" id="recipient-name"></textarea>
                </form>
              </div>
              <div class="modal-footer">
                <button @click="clearIntroductionForm()" type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button @click="btn_chgAreaData()" type="button" class="btn btn-primary">儲存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border border-2 rounded-3" style="padding: 15px; margin-bottom: 10px">
        <span @click="copyText()" class="copy-url-tips" tabindex="0">
          <span>我的提問箱鏈結: </span>
          <img class="copy-url-img" src="@/assets/image/link-45deg.svg">
        </span>
        <br>
        <a id="CopyUrl" :href="'https://question-box-7e446f16ba95.herokuapp.com/messageboardpage/' + member_data.account" class="link-dark" target="_blank">https://question-box-7e446f16ba95.herokuapp.com/messageboardpage/{{member_data.account}}</a>
      </div>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import NavbarLogin from "@/components/NavbarLogin";
export default {
  data() {
    const user = {
      name: "",
      email: "",
      introduction: "",
      avatar: "",
      emailValidationMessage: "",
    }
    return{
      user
    }
  },
  created(){
    this.$store.dispatch('getMemberData')
  },
  name: "MemberAreaData",
  components: {NavbarLogin},
  computed:{
    ...mapGetters([
      'member_data',
    ])
  },
  methods: {
    btn_chgEmailData(){
      if (this.validateEmail()) {
        //console.log('email格式通過驗證');
        const newData = {
          email: this.user.email,
        }
        return this.$store.dispatch('chgAreaData', newData);
      }
    },
    btn_chgAreaData(){
      const newData = {
        name: this.user.name,
        introduction: this.user.introduction
      }
      return this.$store.dispatch('chgAreaData', newData);
    },
    chgAvatarData(event){
      const avatar = event.target.files[0];
      //console.log("🚀 ~ chgAvatarData ~ avatar:", avatar)
      if(avatar){
        const reader = new FileReader()
        reader.onload = () => {
          this.user.avatar = reader.result
          const newData = {
          avatar: this.user.avatar,
          }
          return this.$store.dispatch('chgAreaData', newData);
        }
        reader.readAsDataURL(avatar)
      }
    },
    copyText(){
      let copyText = document.getElementById("CopyUrl").textContent;
      navigator.clipboard.writeText(copyText)
    },
    validateEmail() { //即時驗證email
      //eslint-disable-next-line
      const emailRegex = /[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*/;
      if (!emailRegex.test(this.user.email)) {
        this.emailValidationMessage = '請輸入有效的電子信箱';
        return false;
      } else {
        this.emailValidationMessage = '';
        return true;
      }
    },
    clearEmailForm() {
      setTimeout(() => {
        this.user.email = '';
        this.emailValidationMessage = '';
      }, 100);
    },
    clearNameForm() {
      setTimeout(() => {
        this.user.name = '';
      }, 100);
    },
    clearIntroductionForm() {
      setTimeout(() => {
        this.user.introduction = '';
      }, 100);
    },
  }
}
</script>

<style scoped>
.email-verify-message{
  color: rgba(216, 77, 77, 0.844);
}
.personal-image {
  text-align: center;
}
.personal-image input[type="file"] {
  display: none;
}
.personal-figure {
  position: relative;
  width: 120px;
  height: 120px;
}
.personal-avatar {
  cursor: pointer;
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
.personal-figcaption {
  cursor: pointer;
  position: absolute;
  top: 0px;
  width: inherit;
  height: inherit;
  border-radius: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0);
  transition: all ease-in-out .3s;
}
.personal-figcaption:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, .5);
}
.personal-figcaption > img {
  margin-top: 32.5px;
  width: 50px;
  height: 50px;
}
*{
  word-break : break-all /*文字超出容器時自動換行*/
}
.text-newline{
  white-space : pre-wrap; /*顯示時將\n換行*/
}
.copy-url-img{
  display: none; /*預設隱藏 */
}
span:hover + .copy-url-img{
  display: inline; /*懸停時顯示 */
}
.copy-url-tips{
position: relative;
}
.copy-url-tips:focus::before{
position: absolute;
top: -30px;
left: 16px;
color: #fff;
font-size: .8em;
background: #666a6a;
padding: 5px;
border-radius: 5px;
content: '已複製連結';
}
</style>