<template>
  <!--navbar-->
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow row">
    <div class="col-3"></div>
    <div class="container col">
      <a href="/memberarea"><img class="align-text-bottom" src="@/assets/image/envelope.svg" style="height: 20px; width: 20px;"></a>
      <a class="navbar-brand" style="padding-left:5px" href="/memberarea">
        提問箱
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="/memberarea/letterbox">查看信箱</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/memberarea/bookmark">收藏的問題</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="bi bi-person-fill"></i>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              會員專區
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" href="#">@頭像@id</a></li>
              <li><a class="dropdown-item" href="/memberarea/data"><img style="padding-right: 5px;" src="@/assets/image/gear.svg">個人資料</a></li>
              <li><a class="dropdown-item" href="#"><img style="padding-right: 5px;" src="@/assets/image/box-arrow-left.svg">登出@id</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-3"></div>
  </nav>
</template>

<script>
export default {
  name: "NavbarLogining"
}
</script>

<style scoped>

</style>