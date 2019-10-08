import React, { Component } from 'react'
import { Card, Table } from 'antd';
import axios from '../../axios/index';

export default class BasicTable extends Component {
  state = {
    dataSource2: []
  }
  componentDidMount() {
    this.request()
  }
  request = () => {
    let baseUrl = 'xxxx'
    axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: 1
        },
        isShowLoading: false
      }
    }).then((res) => {
      this.setState({
        dataSource2: res.result
      })
    }
    )
  }

  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }


  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state'
      },
      {
        title: '爱好',
        dataIndex: 'interest'
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早期时间',
        dataIndex: 'time'
      }
    ]
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }

    return (
      <div>
        <Card title="动态数据渲染表格">
          <Table
            bordered
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }

              }
            }
            }
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
      </div>
    )
  }
}
