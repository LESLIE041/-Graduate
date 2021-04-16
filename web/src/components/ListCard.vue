<template>
        <m-card :icon="icon" :title="title">
        <div class="nav jc-between">
          <div class="nav-item" :class="{active:active ===i}"
          v-for="(category,i) in categories" :key="i"
          @click="$refs.list.$swiper.slideTo(i) ">
          <!-- 这里是点击不是滑动 -->
            <div class="nav-link">{{category.name}}</div>
          </div>
        </div>
        <div class="pt-3">
          <!-- 实现相应的交互 -->
          <swiper ref="list" 
          @transitionStart = "() => active = $refs.list.$swiper.activeIndex">
          <swiper-slide v-for="(category, i) in categories" :key="i">
            <div>
                <!-- slot指的是插槽 -->
                <!-- 冒号加变量值代表绑定 -->
                <slot name="items" :category="category"></slot>
            </div>
          </swiper-slide>
        </swiper>
        </div>
    </m-card>
</template>

<script>
export default {
    props:{    
    icon: {type: String, required: true},
    title: {type: String, required: true},
    categories: {type: Array, required: true}
    },

    data() {
        return {
            active: 0
        }
    }
}
</script>

<style scoped>

</style>
