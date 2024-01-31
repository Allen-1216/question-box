<template>
  <!--navbar-->
  <NavbarLogin/>
  <!--letterbox-->
  <div class="container">
    <div class="row" style="margin-top: 100px;">
      <div class="col"></div>
      <div class="col-10 col-sm-7 col-md-4 row" style="padding: 0;">
        <h1 class="text-center">收到的信件</h1>
        <!-- 循環顯示每10則訊息 -->
        <div v-for="(item, index) in paginatedContent" :key="index" class="border border-2 rounded-3"
            style="padding: 15px; margin-bottom: 10px;">
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
          <div class="text-secondary paddingbot">#{{ (currentPage - 1) * contentPerPage + index + 1 }}</div> <!--index-->
          <span>{{ item.sender_name }}</span> <!--寄出人name-->
          <span class="text-secondary">&nbsp;@{{ item.sender_account }}</span> <!--寄出人account-->
          <div class="text-secondary float-end">{{ item.content_time.replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')}}</div> <!--訊息時間-->
          <div class="paddingtop text-newline">{{ item.content }}</div> <!--訊息-->
          <div style="padding-top: 10px;"></div>

          <div class="exit_hover float-start">
            <!--儲存內容-->
            <button class="btn"
                    @mouseover="pic1Visible[index] = true"
                    @mouseleave="(!pic1isClicking[index]) && (pic1Visible[index] = false)"
                    @click="togglePic1Visible(item, index)">
              <img src="@/assets/image/bookmark.svg" v-if="!pic1Visible[index] && !item.isBookmarked">
              <img src="@/assets/image/bookmark-fill.svg" v-if="pic1Visible[index] || item.isBookmarked">
            </button>
          </div>
          <div class="exit_hover float-start">
            <!--檢舉內容-->
            <button class="btn"
                    @mouseover="pic2Visible[index] = true"
                    @mouseleave="(!pic2isClicking[index]) && (pic2Visible[index] = false)"
                    @click="togglePic2Visible(index)">
              <img src="@/assets/image/exclamation-triangle.svg" v-if="!pic2Visible[index]">
              <img src="@/assets/image/exclamation-triangle-fill.svg" v-if="pic2Visible[index]">
            </button>
          </div>
          <!--放大檢視內容-->
          <button type="button" class="btn float-end" disabled><img style="margin: 0;"
                                                          src="@/assets/image/arrows-angle-expand.svg"></button>
        </div>
      </div>
      <div class="col"></div>
    </div>
  </div>
  <!-- Bootstrap 分頁元件 -->
  <div style="text-align : center;">
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
import {mapGetters} from 'vuex';
import NavbarLogin from "@/components/NavbarLogin";

export default {
  name: "MemberAreaLetterBoxPage",
  components: {NavbarLogin},
  data() {
    return {
      pic1Visible: [],
      pic2Visible: [],
      pic1isClicking: [],
      pic2isClicking: [],
      contentPerPage: 10,
      currentPage: 1,
    }
  },
  methods: {
    btn_add_bookmark(account,mid){
      if(this.pic1isClicking) {
        const bookmarkDetail = {
          account: account,
          article_id: mid
        }
        this.$store.dispatch('addBookmarkContent', bookmarkDetail);
      }
    },
    btn_delete_bookmark(cid){
      return this.$store.dispatch('deleteCollectionsfromletterbox', cid);
    },
    togglePic1Visible(item, index) {
      // 使用 item.isBookmarked 來判斷書籤狀態
      if (item.isBookmarked) {
        // 已經儲存，執行相應的邏輯
        // 取消儲存
        this.btn_delete_bookmark(item.bookmarkCid);

        this.$nextTick(() => {
          this.pic1Visible[index] = !this.pic1Visible[index];  // 切換回原本的圖片
          this.pic1isClicking[index] = false;  // 重置點擊狀態
          this.$forceUpdate();
        });
      } else {
        // 未儲存，執行相應的邏輯
        // 將訊息儲存
        this.btn_add_bookmark(item.account, item.mid)
        // 在 $nextTick 內使用 $forceUpdate 強制更新 Vue 實例
        this.$nextTick(() => {
          this.pic1isClicking[index] = true;  // 開始點擊
          this.pic1Visible[index] = !this.pic1Visible[index];  // 切換成另一個圖片
          this.$forceUpdate();
        });
      }
    },
    togglePic2Visible(index) {
      if (this.pic2isClicking[index]) {  // 如果已經點擊
        this.pic2Visible[index] = !this.pic2Visible[index];  // 切換回原本的圖片
        this.pic2isClicking[index] = false;  // 重置點擊狀態
      } else {
        this.pic2isClicking[index] = true;  // 開始點擊
        this.pic2Visible[index] = !this.pic2Visible[index];  // 切換成另一個圖片
      }
    },
    btn_deleteContent(mid){
      return this.$store.dispatch('deleteContent', mid);
    },
    // 改變當前頁數
    changePage(page) {
      if (page >= 1 && page <= this.totalPageCount) {
        this.currentPage = page;
      }
    },
  },
  created() {
    this.$store.dispatch('getContent');
    this.$store.dispatch('getBookmarkContent');
    this.pic1Visible = Array(this.content.length).fill(false);
    this.pic2Visible = Array(this.content.length).fill(false);
  },
  computed: {
    ...mapGetters([
      'content',
      'bookmark_content',
    ]),
    // 計算分頁後的訊息數據
    paginatedContent() {
      // 將物件的值轉換成陣列
      const contentArray = Object.values(this.content);
      const startIndex = (this.currentPage - 1) * this.contentPerPage;
      const endIndex = startIndex + this.contentPerPage;

      const bookmarks = Object.values(this.bookmark_content);
      // 將已收藏物件的 mid 與 cid 轉成 Map 方便後面查詢
      const bookmarkedMap = new Map(bookmarks.map(bookmark => [bookmark.mid, bookmark.cid]));
      return contentArray.slice(startIndex, Math.min(endIndex, contentArray.length)).map(message => {
        return {
          ...message,
          isBookmarked: bookmarkedMap.has(message.mid),
          bookmarkCid: bookmarkedMap.get(message.mid),
        };
      });
    },
    // 計算總頁數
    totalPageCount: (state) => {
        const contentArray = Object.values(state.content);
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
* {
  word-break: break-all
}
.btn:focus {
  box-shadow: none;
}
.text-newline{
  white-space : pre-wrap; /*讀取時將\n換行*/
}
</style>