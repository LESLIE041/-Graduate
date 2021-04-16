<template>
<div class="page_tai">
        <div class="d-flex py-3 px-2 border-bottom">
      <router-link
      tag="div"
      :to="`/datas`">
        <div class="iconfont icon-back text-gblue"></div>
      </router-link>
      <strong class="flex-1 text-gblue">
        {{'太原市整体房价'}}
      </strong>
      <div class="text-grey fs-xs">
        2021-01-28
      </div>
    </div>
    <div class="chart_1">
    <m-card icon="data" title="太原市2021年1月房均价">
        <div>
            <div id="myChart_1" class="chart">
            </div>
            <div class="px-2">
                <span>注：娄烦县数据空缺</span>
            </div>
        </div>
    </m-card>
    </div>
    <m-card icon="data" title="近四年太原市房均价">
        <div>
            <div id="myChart_2" class="chart">
            </div>
        </div>
    </m-card>
    <m-card icon="data" title="太原市2006-2021房均价走势">
        <div>
            <div id="myChart" class="chart">
            </div>
            <div>
                <span>注：2021年太原市房均价预估为11365元/平方米</span>
            </div>
        </div>
    </m-card>
</div>
</template>

<script>
/* eslint-disable */
import * as echarts from 'echarts'
import taiyuan from '../assets/map/taiyuan.json'
echarts.registerMap('taiyuan', taiyuan)
export default {
    name: 'xwPassengerFlow',
  data () {
    return {
        data1: []
    }
  },
  mounted() {
      this.loadLine()
      this.loadLine_1()
      this.loadLine_2()
  },
  methods: {
      async fetchdata(){
          const res = await this.$http.get('datas/list/1')
        //   注意这个of
          for(var i of res.data){
              var data = parseInt(i.data)
              this.data1.push(data)
          console.log(this.data1)
          }
        // console.log(res.data)

      },
      loadLine () {
          const option = {
        tooltip: {
            trigger: 'axis'
       },
    toolbox: {
        feature: {
            saveAsImage: {},
            magicType: {
                type: ['bar','line']
            }
        }
    },
        xAxis: {
          type: '',
          data: ['2006', '2007', '2008', '2009', '2010', '2011', '2012','2013','2014','2015','2016','2017','2018','2019','2020','2021']
        },
        yAxis: {
          type: 'value',
          min: '4000'
        },
        series: [{
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            },
          data: [4500,4975,4979,5400,6000,7374,7625,8194,8365,8118,8308,9695,11979,11752,11017,11365
],
        //   data:data1,
          name: '太原市', 
          type: 'line'
        }]
      }

      this.myChartOne = echarts.init(document.getElementById('myChart'))
      this.myChartOne.setOption(option)
      },
loadLine_2 () {
    const option = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['2017', '2018', '2019', '2020',]
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {},
            magicType: {
                type: ['bar','line']
            }
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月', '九月', '十月', '十一月', '十二月',]
    },
    yAxis: {
        type: 'value',
         min:'8000',
    },
    series: [
        {
            name: '2017',
            type: 'line',
            data: [8347, 8438, 8470, 8527, 8672, 8852, 8871, 8932,8981, 9074, 9458, 9695]
        },
        {
            name: '2018',
            type: 'line',
            data: [9971, 10105, 10378, 10869, 11294, 11594, 11867, 12024, 12084, 12132, 12046, 11979]
        },
        {
            name: '2019',
            type: 'line',
            data: [11990, 12006, 12030,12003, 12025, 12084, 12113, 12095, 12051, 11955, 11854, 11752]
        },
        {
            name: '2020',
            type: 'line',
            data: [11715, 11807, 11852, 11653, 11456, 11417, 11396, 11275, 11234, 11065, 11017, 11017]
        },
    ]
      }

      this.myChartOne = echarts.init(document.getElementById('myChart_2'))
      this.myChartOne.setOption(option)
      },
      loadLine_1() {
    const option = {
        tooltip: {},
        toolbox: {
        feature: {
            saveAsImage: {},
        }
    },
            dataRange:{
            	min:2000,
            	max:12000,
            	text:['高','低'],
            	realtime:true,
            	calculable:true,
            	color:['#336699','#99CCCC','#666666']
            },
            series: [
              {
               name: '', 
               type: 'map',
               mapType: 'taiyuan',
               itemStyle: {
                  normal:{
                      show: true,
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                  },
                  emphasis:{
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },
                showLegendSymbol: true,
                label: {
                  normal: {
                    show: true
                  },
                  emphasis: {
                    show: true
                  }
                },
                data: [
                    {name: '小店区',value: 11709 },
                    {name: '万柏林区',value: 10196 },
                    {name: '杏花岭区',value: 9913 },
                    {name: '迎泽区',value: 11441 },
                    {name: '晋源区',value: 10721 },
                    {name: '尖草坪区',value: 8511 },
                    {name: '古交市',value: 10368 },
                    {name: '阳曲县',value: 6494  },
                    {name: '清徐县',value: 2295 },
                ],
                 
              }
            ]
          }
      this.myChartOne = echarts.init(document.getElementById('myChart_1'))
      this.myChartOne.setOption(option)
      }

  },
  created(){
      this.fetchdata()
  }
}



</script>

<style lang="scss">
.mychart{
    width: 100%;
    height: 40vh;
}

