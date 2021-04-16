<template>
        <div class="card  bg-white p-3 my-3">
        <div class="card-header d-flex ai-center pb-3">
        <i class="iconfont text-blavk" :class="`icon-${icon}`"></i>
        <div class="fs-m flex-1 px-2">{{title}}</div>
        <i class="iconfont icon-menu-p text-black"></i>
      </div>
      <div class="card-body pt-3">
          <slot></slot>
      </div>
        </div>
</template>

<script>
export default {
    props: {
        title: {type: String,required: true},
        icon:  {type: String, required: true}
    }
}
</script>

<style lang="scss">
// @import url('../assets/scss/_variables.scss');
.card{
    .card-header{
        border-bottom: 1px solid;
        border-bottom-color: #AEAEAE,;
    }
        border-bottom: 1px solid;
        border-bottom-color: #AEAEAE,;
}
</style>
