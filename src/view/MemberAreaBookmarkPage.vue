<template>
  <!--navbar-->
  <NavbarLogin/>
  <!--letterbox-->
  <div class="row" style="margin-top: 100px">
    <div class="col"></div>
    <div class="col-10 col-sm-7 col-md-4 row" style="padding: 0;">
      <h1 class="text-center">收藏的信件</h1>
      <div v-for="(item, index) in paginatedContent" :key="index" class="border border-2 rounded-3"
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
                          <button @click="btn_deleteCollections(item.cid)" type="button" class="btn btn-primary">確定</button>
                        </div>
                      </div>
                    </div>
                  </div>
        <div class="text-secondary paddingbot">#{{ (currentPage - 1) * contentPerPage + index + 1 }}</div> <!--index-->
        <span>{{ item.sender_name }}</span> <!--寄出人name-->
        <span class="text-secondary">&nbsp;@{{ item.sender_account }}</span> <!--寄出人account-->
        <div class="text-secondary float-end">{{ item.content_time.replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')}}</div> <!--訊息時間-->
        <div class="paddingtop text-newline">{{ item.content }}</div> <!--訊息-->
        <div style="padding-top: 10px;"></div>

        <!--放大檢視內容-->
        <button type="button" class="btn float-end" disabled><img style="margin: 0;"
                                                                  src="@/assets/image/arrows-angle-expand.svg"></button>
      </div>
    </div>
    <div class="col"></div>
  </div>
  <div style="text-align: center;">
    <!-- Bootstrap 分頁元件 -->
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(currentPage = 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(currentPage - 1)">
            <span aria-hidden="true">&lsaquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="page in totalPageCount" :key="page" :class="{ active: currentPage === page }">
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPageCount }">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
            <span aria-hidden="true">&rsaquo;</span>
          </a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPageCount }">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(totalPageCount)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import NavbarLogin from "@/components/NavbarLogin";
import {mapGetters} from "vuex";
export default {
  name: "MemberAreaBookmarkPage",
  components: {NavbarLogin},
  data(){
    return {
      contentPerPage: 10,
      currentPage: 1,
    }
  },
  methods:{
    btn_deleteCollections(cid){
      return this.$store.dispatch('deleteCollections', cid);
    },
    // 改變當前頁數
    changePage(page) {
      if (page >= 1 && page <= this.totalPageCount) {
        this.currentPage = page;
      }
    },
  },
  created() {
    this.$store.dispatch('getBookmarkContent');
  },
  computed: {
    ...mapGetters([
      'bookmark_content'
    ]),
    // 計算分頁後的訊息數據
    paginatedContent() {
      // 將物件的值轉換成陣列
      const contentArray = Object.values(this.bookmark_content);
      const startIndex = (this.currentPage - 1) * this.contentPerPage;
      const endIndex = startIndex + this.contentPerPage;
      return contentArray.slice(startIndex, Math.min(endIndex, contentArray.length));
    },
    // 計算總頁數
    totalPageCount: (state) => {
        const contentArray = Object.values(state.bookmark_content);
        return Math.ceil(contentArray.length / state.contentPerPage);
    },
  },
}
</script>

<style scoped>
.paddingtop {
  padding-top: 10px;
}
.paddingbot {
  padding-bottom: 10px;
}
*{
  word-break : break-all
}
.text-newline{
  white-space : pre-wrap; /*讀取時將\n換行*/
}
</style>