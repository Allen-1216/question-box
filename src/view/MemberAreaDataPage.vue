<template>
  <!--navbar-->
  <NavbarLogin/>
  <!--letterbox-->
  <div class="row" style="margin-top: 50px">
    <div class="col"></div>
    <div class="col-4 row" style="padding: 0;">
      <h1 class="text-center">個人資料</h1>
      <div class="personal-image">
        <label class="label">
          <input type="file" accept="image/*"/>
          <figure class="personal-figure">
            <img src="@/assets/image/card-image.svg" class="personal-avatar" alt="avatar">
            <figcaption class="personal-figcaption">
              <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png">
            </figcaption>
          </figure>
        </label>
      </div>
      <!----bs-gutter-x:0;-->
      <div class="border border-2 rounded-3" style="padding: 15px; margin-bottom: 10px">
        <span>id: </span>
        <span>{{member_data.account}}</span> <!--account-->
        <img class="float-end btn" data-bs-toggle="modal" data-bs-target="#exampleModal_changeid" data-bs-whatever="@id" src="@/assets/image/pencil-square.svg">
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
        <span>顯示名稱: </span>
        <span>{{member_data.name}}</span> <!--顯示名稱-->
        <img class="float-end btn" data-bs-toggle="modal" data-bs-target="#exampleModal_changename" data-bs-whatever="@id" src="@/assets/image/pencil-square.svg">
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
                  <input v-model="user.name" type="text" class="form-control" id="recipient-name">
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button @click="btn_chgAreaData()" type="button" class="btn btn-primary">儲存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border border-2 rounded-3" style="padding: 15px; margin-bottom: 10px">
        <span>email: </span>
        <span>{{member_data.email}}</span> <!--顯示email-->
        <img class="float-end btn" data-bs-toggle="modal" data-bs-target="#exampleModal_changeemail" data-bs-whatever="@id" src="@/assets/image/pencil-square.svg">
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
                  <input v-model="user.email" type="text" class="form-control" id="recipient-name">
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button @click="btn_chgAreaData()" type="button" class="btn btn-primary">儲存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border border-2 rounded-3" style="padding: 15px; margin-bottom: 10px">
        <span>自我介紹: </span>
        <span>{{member_data.introduction}}</span> <!--自我介紹-->
        <img class="float-end btn" data-bs-toggle="modal" data-bs-target="#exampleModal_Selfintroduction" data-bs-whatever="@id" src="@/assets/image/pencil-square.svg">
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
                  <input v-model="user.introduction" type="text" class="form-control" id="recipient-name">
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button @click="btn_chgAreaData()" type="button" class="btn btn-primary">儲存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="border border-2 rounded-3" style="padding: 15px; margin-bottom: 10px">
        <img src="@/assets/image/link-45deg.svg">
        <span>我的提問箱鏈結: </span>
        <a :href="'http://localhost:8080/messageboardpage/' + member_data.account" class="link-dark" target="_blank">http://localhost:8080/messageboardpage/{{member_data.account}}</a>
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
      // account: "",
      name: "",
      email: "",
      introduction: ""
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
      'member_data'
    ])
  },
  methods: {
    btn_chgAreaData(){
      const newData = {
        name: this.user.name,
        email: this.user.email,
        introduction: this.user.introduction
      }
      return this.$store.dispatch('chgAreaData', newData);
    },
  }
}
</script>

<style scoped>
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
  word-break : break-all
}
</style>