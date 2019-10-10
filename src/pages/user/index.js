import React, { Component } from 'react'
import { Card, Button, Form, Modal, Radio, DatePicker, Input, Select } from 'antd';
import axios from './../../axios';
import Utils from '../../utils/utils';
import ETable from '../../components/ETable';
import BaseForm from '../../components/BaseForm';
import moment from 'moment';

const FormItem = Form.Item;
const RaidoGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

export default class User extends Component {
  state = {
    list: [],
    isVisible: false
  }
  params = {
    page: 1
  }
  formList = [
    {
      type: 'INPUT',
      label: '用户名',
      field: 'user_name',
      placeholder: '请输入用户名称',
      width: 80,
    },
    {
      type: 'INPUT',
      label: '手机号',
      field: 'user_mobile',
      placeholder: '请输入手机号',
      width: 80,
    },
    {
      type: 'DATE',
      label: '请选择入职日期',
      field: 'user_date',
      placeholder: '请输入日期'
    }
  ]

  componentDidMount() {
    // this.requestList()
  }

  handleFilter = (params) => {
    this.params = params;
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/user/list', this.params)
  }

  handleOperate = (type) => {
    let item = this.state.selectedItem;
    if (type == 'create') {
      this.setState({
        type,
        isVisible: true,
        title: '创建员工'
      })
    } else if (type == 'edit') {
      if (!item) {
        Modal.info({
          title: '提升',
          content: '请选择一个用户'
        })
        return;
      }
      this.setState({
        type,
        isVisible: true,
        title: '编辑员工',
        userInfo: item
      })
    } else if (type == 'detail') {
      this.setState({
        type,
        isVisible: true,
        title: '员工详情',
        userInfo: item
      })
    } else {
      if (!item) {
        Modal.info({
          title: '提升',
          content: '请选择一个用户'
        })
        return;
      }
      Modal.confirm({
        title: '确认删除',
        onOk: () => {
          axios.ajax({
            url: '/user/delete',
            data: {
              params: {
                id: item.id
              }
            }
          }).then(res => {
            if (res.code == 0) {
              this.setState({
                isVisible: false
              })
              this.requestList()
            }
          })
        }
      })
    }
  }

  handleSubmit = () => {
    const { type } = this.state;
    let data = this.userForm.props.form.gerFieldsValue();
    axios.ajax({
      url: type == 'create' ? '/user/add' : '/user/edit',
      data: {
        params: data
      }
    }).then((res) => {
      if (res.code == 0) {
        this.setState({
          isVisible: false
        })

        this.requestList();
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
        dataIndex: 'username'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          return {
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
          }[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest'
      },
      {
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        title: '联系地址',
        dataIndex: 'adress'
      },
      {
        title: '早期时间',
        dataIndex: 'time',
      }
    ]
    let footer = {}
    if (this.state.type == 'detail') {
      footer = {
        footer: null
      }
    }
    return (
      <div>
        <Card>
          <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card style={{ marginTop: 10 }} className="operate-wrap">
          <Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>创建员工</Button>
          <Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
          <Button type="primary" onClick={() => this.handleOperate('detail')}>员工详情</Button>
          <Button type="primary" icon="delete" onClick={() => this.handleOperate('delete')}>删除员工</Button>
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            selectedRowKeys={this.state.selectedRowKeys}
          />
        </div>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.userForm.props.form.resetFields();
            this.setState({
              isVisible: false
            })
          }}
          width={600}
          {...footer}
        >
          <UserForm userInfo={this.state.userInfo} type={this.state.type} wrappedComponentRef={(inst) => { this.userForm = inst }} />
        </Modal>
      </div>
    )
  }
}

class UserForm extends Component {
  getState(state) {
    return {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
    }[state]
  }
  render() {
    const { type, userInfo = {} } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    return (
      <Form>
        <FormItem {...formItemLayout} label="用户名">
          {type == 'detail' ? userInfo.username : getFieldDecorator('user_name', {
            initialValue: userInfo.username
          })(
            <Input type="text" placeholder="请输入用户名" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="性别">
          {type == 'detail' ? userInfo.sex == 1 ? '男' : '女' : getFieldDecorator('sex', {
            initialValue: userInfo.sex
          })(
            <RaidoGroup>
              <Radio value={1}>男</Radio>
              <Radio value={2}>女</Radio>
            </RaidoGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="状态">
          {type == 'detail' ? this.getState(userInfo.state) : getFieldDecorator('state', {
            initialValue: userInfo.state
          })(
            <Select>
              <Option value={1}>咸鱼一条</Option>
              <Option value={2}>咸鱼一条</Option>
              <Option value={3}>咸鱼一条</Option>
              <Option value={4}>咸鱼一条</Option>
              <Option value={5}>咸鱼一条</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="生日">
          {type == 'detail' ? userInfo.birthday : getFieldDecorator('birthday', {
            initialValue: moment(userInfo.birthday)
          })(
            <DatePicker />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="联系地址">
          {type == 'detail' ? userInfo.address : getFieldDecorator('address', {
            initialValue: userInfo.address
          })(
            <TextArea row={3} placeholder="请输入联系地址" />
          )}
        </FormItem>
      </Form>
    )
  }
}

UserForm = Form.create({})(UserForm)