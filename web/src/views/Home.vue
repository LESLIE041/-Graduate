<template>
  <div>
    <swiper :options="swiperOptions" class="d-flex">
      <swiper-slide>
        <router-link
        tag="div"
        :to="`/ads`">
        <img class="w-100" src="../assets/images/img_1251.jpg">
        </router-link>
      </swiper-slide>
      <swiper-slide>
        <router-link
        tag="div"
        :to="`/ads`">
        <img class="w-100" src="../assets/images/img_1252.png">
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2"  
      slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <!-- flex-wrap实现换行 -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark">
      <div class="d-flex flex-wrap">
      <div class="nav-item mb-3"
      v-for="n in 10" :key="n">
        <i class="sprite sprite-news"></i>
        <div class="py-2">待补充</div>
      </div>
      </div>
      <div class="bg-right py-2 fs-xs d-flex ai-center jc-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>
          收起
        </span>
      </div>
      <!-- end of sprint -->
    </div>
    <!-- 字体图标 -->
    <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats">
      <!-- #items与ListCard.vue中的items相关联, category在ListCard.vue中动态绑定，因此在这也需绑定-->
      <!--  eslint-disable-next-line -->
      <template #items="{category}"> 
        <router-link 
        tag="div"
        :to="`/articles/${news._id}`"
        class="py-2 d-flex fs-s" 
        v-for="(news, i) in category.newsList" :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-xs">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- end of icon -->
    <m-card icon="data" title="数据中心">
      <router-link
      tag="div"
      :to="`/datas`">
      <img class="w-100" src="../assets/images/img_1254.png">
      </router-link>
    </m-card>
      </div>

</template>

<script>
import dayjs from 'dayjs'
import Swiper, {Autoplay, Navigation, Pagination} from 'swiper';
Swiper.use([Autoplay,Navigation,Pagination]);
export default {
  // 时间格式化
  filters: {
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
        swiperOptions: {
          pagination: {
            el: '.swiper-pagination'
          },
          // Some Swiper option/callback...
          Autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          }
        },
        newsCats: []
      };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('/news/list')
      this.newsCats = res.data
    }
  },
  created() {
    this.fetchNewsCats()
  }
};
</script>

// 只有lang="scss"才能在style中使用嵌套
<style lang="scss">
@import '../assets/scss/_variables.scss';
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1429rem;
    background: #fff;
    &.swiper-pagination-bullet-active {
      background: map-get($map: $colors, $key: 'info');
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    // 用于实现第四个边框不加
    // 4n+1代表用序号除以4若余数为0
    &:nth-child(4n){
      border-right: none;
    }
  }
}

</style>
