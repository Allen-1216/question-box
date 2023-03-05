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
        <button type="button" class="btn-close float-end" aria-label="Close"></button>
        <div class="text-secondary paddingBot10">#{{ index + 1 }}</div> <!--index-->
        <span>{{ item.sender_name }}</span> <!--寄出人name-->
        <span class="text-secondary">&nbsp;@{{ item.sender_account }}</span> <!--寄出人account-->
        <div class="text-secondary float-end">{{ item.content_time.replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')}}</div> <!--訊息時間-->
        <div class="paddingTop10">{{ item.content }}</div> <!--訊息-->
        <div style="padding-top: 10px;"></div>

        <div class="exit_hover float-start" @click="changeSvg1()">
          <button class="btn pic1_1" ref="pic1_1">
            <img src="@/assets/image/bookmark.svg">
          </button>
          <button class="btn pic1_2" ref="pic1_2">
            <img src="@/assets/image/bookmark-fill.svg">
          </button>
        </div>

        <div class="exit_hover float-start" @click="changeSvg2()">
          <button class="btn pic2_1" ref="pic2_1">
            <img src="@/assets/image/exclamation-triangle.svg">
          </button>
          <button class="btn pic2_2" ref="pic2_2">
            <img src="@/assets/image/exclamation-triangle-fill.svg">
          </button>
        </div>

        <button type="button" class="btn float-end"><img style="margin: 0;"
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
      svg1: 0,
      svg2: 0,
    }
  },
  methods: {
    changeSvg1() {
      if (this.svg1 % 2 === 0) {
        this.$refs.pic1_1.style.display = "none";
        this.$refs.pic1_2.style.display = "inline-block";
        this.svg1++;
      } else {
        this.$refs.pic1_2.style.display = "none";
        this.$refs.pic1_1.style.display = "inline-block";
        this.svg1++;
      }
    },
    changeSvg2() {
      if (this.svg2 % 2 === 0) {
        this.$refs.pic2_1.style.display = "none";
        this.$refs.pic2_2.style.display = "inline-block";
        this.svg2++;
      } else {
        this.$refs.pic2_2.style.display = "none";
        this.$refs.pic2_1.style.display = "inline-block";
        this.svg2++;
      }
    },
  },
  created() {
    this.$store.dispatch('getContent')
  },
  computed: {
    ...mapGetters([
      'content'
    ]),
  },
}
</script>

<style scoped>
.exit_hover .pic1_1 {
  display: inline-block;
}

.exit_hover .pic1_2 {
  display: none;
}

.exit_hover:hover .pic1_1 {
  display: none;
}

.exit_hover:hover .pic1_2 {
  display: inline-block;
}

.exit_hover .pic2_1 {
  display: inline-block;
}

.exit_hover .pic2_2 {
  display: none;
}

.exit_hover:hover .pic2_1 {
  display: none;
}

.exit_hover:hover .pic2_2 {
  display: inline-block;
}

.paddingTop10{
  padding-top: 10px;
}

.paddingBot10{
  padding-bottom: 10px;
}

* {
  word-break: break-all
}
</style>