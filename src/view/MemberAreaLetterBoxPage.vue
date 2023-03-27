<template>
  <!--navbar-->
  <NavbarLogin/>
  <!--letterbox-->
  <div class="row" style="margin-top: 100px">
    <div class="col"></div>
    <div class="col-4 row" style="padding: 0;">
      <h1 class="text-center">收到的信件</h1>
      <div v-for="(item, index) in content" :key="index" class="border border-2 rounded-3"
           style="padding: 15px; margin-bottom: 10px">
        <button type="button" class="btn-close float-end" aria-label="Close" style="box-shadow: none;" data-bs-toggle="modal" :data-bs-target="'#exampleModal-' + index"></button>
        <!-- Modal -->
        <div class="modal fade" :id="'exampleModal-' + index" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">刪除訊息</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>確定要刪除嗎</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                <button @click="btn_deleteContent(item.mid)" type="button" class="btn btn-primary">確定</button>
              </div>
            </div>
          </div>
        </div>
        <div class="text-secondary paddingBot10">#{{ index + 1 }}</div> <!--index-->
        <span>{{ item.sender_name }}</span> <!--寄出人name-->
        <span class="text-secondary">&nbsp;@{{ item.sender_account }}</span> <!--寄出人account-->
        <div class="text-secondary float-end">{{ item.content_time.replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')}}</div> <!--訊息時間-->
        <div class="paddingTop10">{{ item.content }}</div> <!--訊息-->
        <div style="padding-top: 10px;"></div>

        <div class="exit_hover float-start">
          <button class="btn"
                  @mouseover="pic1Visible[index] = true"
                  @mouseleave="!pic1isClicking && (pic1Visible[index] = false)"
                  @click="togglePic1Visible(index)">
            <img src="@/assets/image/bookmark.svg" v-if="!pic1Visible[index]">
            <img src="@/assets/image/bookmark-fill.svg" v-if="pic1Visible[index]">
          </button>
        </div>
        <div class="exit_hover float-start">
          <button class="btn"
                  @mouseover="pic2Visible[index] = true"
                  @mouseleave="!pic2isClicking && (pic2Visible[index] = false)"
                  @click="togglePic2Visible(index)">
            <img src="@/assets/image/exclamation-triangle.svg" v-if="!pic2Visible[index]">
            <img src="@/assets/image/exclamation-triangle-fill.svg" v-if="pic2Visible[index]">
          </button>
        </div>
        <button type="button" class="btn float-end" disabled><img style="margin: 0;"
                                                         src="@/assets/image/arrows-angle-expand.svg"></button>
      </div>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import NavbarLogin from "@/components/NavbarLogin";

export default {
  name: "MemberAreaLetterBoxPage",
  components: {NavbarLogin},
  data() {
    return {
      pic1Visible: [],
      pic2Visible: [],
      pic1isClicking: false,
      pic2isClicking: false,
    }
  },
  methods: {
    togglePic1Visible(index) {
      if (this.pic1isClicking) {  // 如果已經點擊過一次
        this.pic1Visible[index] = !this.pic1Visible[index];  // 切換回原本的圖片
        this.pic1isClicking = false;  // 重置點擊狀態
      } else {
        this.pic1isClicking = true;  // 開始點擊
        this.pic1Visible[index] = true;  // 切換成另一個圖片
      }
    },
    togglePic2Visible(index) {
      if (this.pic2isClicking) {  // 如果已經點擊過一次
        this.pic2Visible[index] = !this.pic2Visible[index];  // 切換回原本的圖片
        this.pic2isClicking = false;  // 重置點擊狀態
      } else {
        this.pic2isClicking = true;  // 開始點擊
        this.pic2Visible[index] = true;  // 切換成另一個圖片
      }
    },
    btn_deleteContent(mid){
      return this.$store.dispatch('deleteContent', mid);
    }
  },
  created() {
    this.$store.dispatch('getContent');
    this.pic1Visible = Array(this.content.length).fill(false);
    this.pic2Visible = Array(this.content.length).fill(false);
  },
  computed: {
    ...mapGetters([
      'content'
    ]),
  },
}
</script>

<style scoped>
.paddingTop10 {
  padding-top: 10px;
}
.paddingBot10 {
  padding-bottom: 10px;
}
* {
  word-break: break-all
}
.btn:focus {
  box-shadow: none;
}
</style>