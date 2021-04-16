<template>
  <div class="page-data">
    <div class="d-flex py-3 px-2 border-bottom">
      <router-link
      tag="div"
      :to="`/`">
        <div class="iconfont icon-back text-gblue"></div>
      </router-link>
      <strong class="flex-1 text-gblue">
        {{'数据中心'}}
      </strong>
      <div class="text-grey fs-xs">
        2021-01-26
      </div>
    </div>
    <m-card icon="data" title="太原市">
      <router-link
      tag="div"
      :to="`/datas/taiyuan`">
      <img class="w-100" src="../assets/images/img_1255.png">
      </router-link>
    </m-card>
        <m-card icon="data" title="具体地区">
      <router-link
      tag="div"
      :to="`/datas/others`">
      <img class="w-100" src="../assets/images/img_1256.png">
      </router-link>
    </m-card>
  </div>
</template>
