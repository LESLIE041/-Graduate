<template>
<div class="page_others">
        <div class="d-flex py-3 px-2 border-bottom">
      <router-link
      tag="div"
      :to="`/datas`">
        <div class="iconfont icon-back text-gblue"></div>
      </router-link>
      <strong class="flex-1 text-gblue">
        {{'具体地区房均价走势'}}
      </strong>
      <div class="text-grey fs-xs">
        2021-01-28
      </div>
    </div> 
    <m-card icon="data" title="小店区">
        <div id="myChart" class="chart"></div>
        <div>
        <span>注：2021年数据仅为一月份均价</span>
        </div>
    </m-card>
        <m-card icon="data" title="万柏林区">
        <div id="myChart_1" class="chart"></div>
        <div>
        <span>注：2021年数据仅为一月份均价</span>
        </div>
    </m-card>
        <m-card icon="data" title="杏花岭区">
        <div id="myChart_2" class="chart"></div>
        <div>
        <span>注：2021年数据仅为一月份均价</span>
        </div>
    </m-card>
        <m-card icon="data" title="迎泽区">
        <div id="myChart_3" class="chart"></div>
        <div>
        <span>注：2021年数据仅为一月份均价</span>
        </div>
    </m-card>
        <m-card icon="data" title="晋源区">
        <div id="myChart_4" class="chart"></div>
        <div>
        <span>注：2021年数据仅为一月份均价</span>
        </div>
    </m-card>
        <m-card icon="data" title="尖草坪区">
        <div id="myChart_5" class="chart"></div>
        <div>
        <span>注：2021年数据仅为一月份均价</span>
        </div>
    </m-card>
        <m-card icon="data" title="古交市">
        <div id="myChart_6" class="chart"></div>
        <div>
        <span>注：2021年数据仅为一月份均价</span>
        </div>
    </m-card>
        <m-card icon="data" title="阳曲县">
        <div id="myChart_8" class="chart"></div>
        <div>
        <span>注：2021年数据仅为一月份均价</span>
        </div>
    </m-card>
    <m-card icon="data" title="清徐县">
        <div id="myChart_9" class="chart"></div>
        <div>
        <span>注：2021年数据仅为一月份均价</span>
        </div>
    </m-card>
</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'xwPassengerFlow',
  data () {
    return {}
  },
  mounted () {
    this.loadLine()
    this.loadLine_1()
    this.loadLine_2()
    this.loadLine_3()
    this.loadLine_4()
    this.loadLine_5()
    this.loadLine_6()
    this.loadLine_8()
    this.loadLine_9()
  },
  methods: {
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
            data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018','2019','2020','2021']
        },
        yAxis: {
            type: 'value',
            min:'7000'
        },
        series: [{
            data: [7891, 8329, 8564, 8429, 8486, 10012, 12643,12244,11697,11709],
            name: '小店区',
            type: 'line',
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
            }
        }],
      }

      this.myChartOne = echarts.init(document.getElementById('myChart'))
      this.myChartOne.setOption(option)
    },
    loadLine_1 () {
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
            data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018','2019','2020','2021']
        },
        yAxis: {
            type: 'value',
            min: '7000'
        },
        series: [{
            data: [6699, 7240, 7725, 7525, 7519, 8219, 11339,10954,10206,10196],
            name: '万柏林区',
            type: 'line',
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
            }
        }],
      }

      this.myChartOne = echarts.init(document.getElementById('myChart_1'))
      this.myChartOne.setOption(option)
    },
    loadLine_2 () {
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
            data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018','2019','2020','2021']
        },
        yAxis: {
            type: 'value',
            min: '6000'
        },
        series: [{
            data: [6821, 7534, 7836, 7763, 7705, 8189, 10320,11212,10331,9913],
            name: '杏花岭区',
            type: 'line',
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
            }
        }],
      }

      this.myChartOne = echarts.init(document.getElementById('myChart_2'))
      this.myChartOne.setOption(option)
    },
    loadLine_3 () {
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
            data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018','2019','2020','2021']
        },
        yAxis: {
            type: 'value',
            min: '7000'
        },
        series: [{
            data: [7837, 8718, 8686, 8807, 9072, 10400, 12396,12034,11502,11441],
            name: '迎泽区',
            type: 'line',
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
            }
        }],
      }

      this.myChartOne = echarts.init(document.getElementById('myChart_3'))
      this.myChartOne.setOption(option)
    },
    loadLine_4 () {
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
            data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018','2019','2020','2021']
        },
        yAxis: {
            type: 'value',
            min:'6000'
        },
        series: [{
            data: [6473, 7049, 8343, 7099, 7376, 9303, 11855,11962,10684,10721],
            name: '晋源区',
            type: 'line',
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
            }
        }],
      }

      this.myChartOne = echarts.init(document.getElementById('myChart_4'))
      this.myChartOne.setOption(option)
    },
    loadLine_5 () {
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
            data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018','2019','2020','2021']
        },
        yAxis: {
            type: 'value',
            min: '6000'
        },
        series: [{
            data: [5468, 6276,6743,6834,6432,6593,9280,9668,8894,8511],
            name: '尖草坪区',
            type: 'line',
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
            }
        }],
      }

      this.myChartOne = echarts.init(document.getElementById('myChart_5'))
      this.myChartOne.setOption(option)
    },
    loadLine_6 () {
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
            data: ['2017', '2018', '2019', '2020', '2021',]
        },
        yAxis: {
            type: 'value',
            min:'10000'
        },
        series: [{
            data: [10766,11372,11156,10368,10368],
            name: '古交市',
            type: 'line',
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
            }
        }],
      }

      this.myChartOne = echarts.init(document.getElementById('myChart_6'))
      this.myChartOne.setOption(option)
    },
    loadLine_8 () {
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
            data: ['2016', '2017', '2018', '2019', '2020', '2021',]
        },
        yAxis: {
            type: 'value',
            min:'6000'
        },
        series: [{
            data: [7249,9525,8293,5871,5692,6494],
            name: '阳曲县',
            type: 'line',
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
            }
        }],
      }

      this.myChartOne = echarts.init(document.getElementById('myChart_8'))
      this.myChartOne.setOption(option)
    },
    loadLine_9 () {
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
            data: ['2019', '2020', '2021',]
        },
        yAxis: {
            type: 'value',
            min:'2000'
        },
        series: [{
            data: [2386,2281,2295],
            name: '清徐县',
            type: 'line',
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
            }
        }],
      }

      this.myChartOne = echarts.init(document.getElementById('myChart_9'))
      this.myChartOne.setOption(option)
    },
  }
}
</script>

<style lang="scss">
.chart {
    width: 100%;
    height: 40vh;
}
</style>
