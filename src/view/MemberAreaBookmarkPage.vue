<template>
  <!--navbar-->
  <NavbarLogin/>
  <!--letterbox-->
  <div class="row" style="margin-top: 100px">
    <div class="col"></div>
    <div class="col-4 row" style="padding: 0;">
      <h1 class="text-center">收藏的信件</h1>
      <div v-for="(item, index) in bookmark_content" :key="index" class="border border-2 rounded-3"
           style="padding: 15px; margin-bottom: 10px">
        <button type="button" class="btn-close float-end" aria-label="Close" style="box-shadow: none;" data-bs-toggle="modal" :data-bs-target="'#exampleModal-' + index"></button>
         Modal
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
                          <button @click="btn_deleteCollections(item.cid)" type="button" class="btn btn-primary">確定</button>
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

        <!--放大檢視內容-->
        <button type="button" class="btn float-end" disabled><img style="margin: 0;"
                                                                  src="@/assets/image/arrows-angle-expand.svg"></button>
      </div>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import NavbarLogin from "@/components/NavbarLogin";
import {mapGetters} from "vuex";
export default {
  name: "MemberAreaBookmarkPage",
  components: {NavbarLogin},
  data(){
  },
  methods:{
    btn_deleteCollections(cid){
      return this.$store.dispatch('deleteCollections', cid);
    },
  },
  created() {
    this.$store.dispatch('getBookmarkContent');
  },
  computed: {
    ...mapGetters([
      'bookmark_content'
    ]),
  },
}
</script>

<style scoped>
*{
  word-break : break-all
}
</style>