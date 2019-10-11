import React, { Component } from 'react'
import { Card } from 'antd';
// 按需导入
import echarts from 'echarts/lib/echarts';
// 导入柱形图
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import echartTheme from '../echartTheme';
import ReactEcharts from 'echarts-for-react';

export default class Line extends Component {
  componentWillMount() {
    echarts.registerTheme('Imooc', echartTheme)
  }

  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [2000, 3000, 5500, 7000, 8000, 12000, 8000]
        }
      ]
    }
    return option;
  }

  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['OFO订单量', '摩拜订单量']
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'OFO订单量',
          type: 'line',
          data: [2000, 3000, 5500, 7000, 8000, 12000, 8000]
        },
        {
          name: '摩拜订单量',
          type: 'line',
          data: [1000, 4000, 6500, 7000, 9000, 12000, 18000]
        },
      ]
    }
    return option;
  }

  getOption3 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [2000, 3000, 5500, 7000, 8000, 12000, 8000],
          areaStyle: {}
        }
      ]
    }
    return option;
  }

  render() {
    return (
      <div>
        <Card title="折线图表之一">
          <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: 500 }} />
        </Card>
        <Card title="折线表之二" style={{ marginTop: 10 }}>
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
        </Card>
        <Card title="折线表之三" style={{ marginTop: 10 }}>
          <ReactEcharts option={this.getOption3()} theme="Imooc" style={{ height: 500 }} />
        </Card>
      </div>
    )
  }
}
