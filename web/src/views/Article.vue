<template>
<!-- 需要加上v-if，因为model默认值为空 -->
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <router-link 
      tag="div"
      :to="`/`">
      <div class="iconfont icon-back text-gblue"></div>
      </router-link>
      <strong class="flex-1 text-gblue">
        {{model.title}}
      </strong>
      <div class="text-grey fs-xs">
        2021-01-26
      </div>
    </div>
    <div v-html="model.body" class="px-3 fs-m body"></div>
    <!-- 相关资讯 -->
    <div class="px-3 border-top py-3" >
      <div class="d-flex ai-center">
        <i class="iconfont icon-Menu"></i>
        <strong class="text-gblue ml-2 fs-m">相关资讯</strong>
      </div>
      <div class="pt-2">
        <router-link
        class="py-2"
        tag="div" 
        :to="`/articles/${item._id}`"
        v-for="item in model.related"
        :key="item._id">
        {{item.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  // 接收参数，显示标题
  props: {
    id: {required: true}
  },
  data() {
    return {
      model: null
    }
  },
  // 监听数据，重新加载
  watch: {
    id() {
      this.fetch()
    },
    // 或者以下这种写法
    // id: 'fetch'
  },
  methods: {
   async fetch() {
     const res = await this.$http.get('articles/' + this.id)
     this.model = res.data
    }
  },
  created(){
    this.fetch()
  }
}
</script>

<style lang="scss">
.page-article{
  .icon-back {
    font-size: 1.5rem
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    // 设置文章中视频的样式
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
