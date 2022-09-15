<template>
  <!--navbar-->
  <NavbarLogining></NavbarLogining>
  <!--letterbox-->
  <div class="row" style="margin-top: 100px">
    <div class="col"></div>
    <div class="col-4 row" style="padding: 0;">
      <h1 class="text-center">收藏的信件</h1>
      <div class="border border-2 rounded-3" style="padding: 15px; margin-bottom: 10px">
        <button type="button" class="btn-close float-end" aria-label="Close"></button>
        <p>@日期時間 </p>
        <p>@內容</p>

        <div class="exit_hover float-start" @click="changesvg1()">
          <button class="btn pic1_1" ref="pic1_1" >
            <img src="@/assets/image/bookmark-fill.svg">
          </button>
          <button class="btn pic1_2" ref="pic1_2">
            <img src="@/assets/image/bookmark.svg">
          </button>
        </div>

        <div class="exit_hover float-start" @click="changesvg2()">
          <button class="btn pic2_1" ref="pic2_1" >
            <img src="@/assets/image/exclamation-triangle.svg">
          </button>
          <button class="btn pic2_2" ref="pic2_2">
            <img src="@/assets/image/exclamation-triangle-fill.svg">
          </button>
        </div>

        <button type="button" class="btn float-end"><img style="margin: 0;" src="@/assets/image/arrows-angle-expand.svg"></button>

      </div>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import NavbarLogining from "@/components/NavbarLogining";
export default {
  name: "MemberAreaBookmarkPage",
  components: {NavbarLogining},
  data(){
    return{
      svg1 : 0,
      svg2 : 0
    }
  },
  methods:{
    changesvg1() {
      if (this.svg1 % 2 === 0) {
        this.$refs.pic1_1.style.display = "none";
        this.$refs.pic1_2.style.display = "inline-block";
        this.svg1++;
      }else{
        this.$refs.pic1_2.style.display = "none";
        this.$refs.pic1_1.style.display = "inline-block";
        this.svg1++;
      }
    },
    changesvg2() {
      if (this.svg2 % 2 === 0) {
        this.$refs.pic2_1.style.display = "none";
        this.$refs.pic2_2.style.display = "inline-block";
        this.svg2++;
      }else{
        this.$refs.pic2_2.style.display = "none";
        this.$refs.pic2_1.style.display = "inline-block";
        this.svg2++;
      }
    }
  }
}
</script>

<style scoped>
.exit_hover .pic1_1{display: inline-block;}
.exit_hover .pic1_2{display: none;}


.exit_hover .pic2_1{display: inline-block;}
.exit_hover .pic2_2{display: none;}
.exit_hover:hover .pic2_1{display: none;}
.exit_hover:hover .pic2_2{display: inline-block;}
</style>