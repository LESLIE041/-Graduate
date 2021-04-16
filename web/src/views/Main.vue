<template>
  <div>
    <div class="topbar bg-gblue py-3 px-6 d-flex ai-center ">
      <div>
        <div class="text-white fs-s px-5 d-flex ai-center jc-center">太原市房价平台</div>
      </div>
    </div>
    <div class="bg-primary py-2 pt-3 pb-2">
      <div class="nav text-white nav-inverse pb-1 jc-around">
        <div class="nav-item ">
          <router-link class="nav-link" tag='div' to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag='div' to="/datas">数据中心</router-link>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }  
}
</script>

<style lang = "scss">
.topbar {
  /* 表示吸顶效果 */
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
