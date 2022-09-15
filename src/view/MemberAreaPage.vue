<template>
  <!--navbar-->
  <NavbarLogining></NavbarLogining>
  <!--text box-->
  <div class="row" style="margin-top: 100px">
    <div class="col"></div>
    <div class="col-4 text-center shadow border">
      <p>@頭像</p>
      <p>@顯示名稱</p>
      <p>@id</p>
      <p>@logo</p>
      <p>@自我介紹</p>
    </div>
    <div class="col"></div>
  </div>
</template>

<script>
import NavbarLogining from "@/components/NavbarLogining";
export default {
  name: "MemberAreaPage",
  components: {NavbarLogining}
}
</script>

<style scoped>

</style>