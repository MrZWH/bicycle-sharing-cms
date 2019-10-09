import React, { Component } from 'react'
import { Card, Table, Modal, Button, message } from 'antd';
import axios from '../../axios/index';
import Utils from '../../utils/utils';

export default class BasicTable extends Component {
  state = {
    dataSource2: []
  }
  componentDidMount() {
    this.request()
  }
  params = {
    page: 1
  }
  request = () => {
    let _this = this;
    axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: this.params.page
        },
        isShowLoading: false
      }
    }).then((res) => {
      res.result.list.map((item, index) => {
        item.key = index
      }
      )
      this.setState({
        dataSource2: res.result.list,
        selectedRowKeys: [],
        selectedRows: null,
        pagination: Utils.pagination(res,
          (current) => {
            _this.params.page = current;
            this.request()
          }
        )
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

  // 多选执行删除动作
  handleDelete = () => {
    let rows = this.state.selectedRows;
    let ids = [];
    rows.map((item) => {
      ids.push(item.ids)
    }
    )
    Modal.confirm({
      title: '',
      content: `您确定要删除这些数据吗? ${ids.join(',')}`,
      onOk: () => {
        this.request()
        message.success('删除成功')
      }

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
    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    }


    return (
      <div>
        <Card title="动态数据渲染表格+单选框">
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
        <Card title="复选框">
          <div style={{ marginBottom: 10 }}>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
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
        <Card title="分页">
          <Table
            bordered
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }

              }
            }}
            columns={columns}
            dataSource={this.state.dataSource3}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    )
  }
}
