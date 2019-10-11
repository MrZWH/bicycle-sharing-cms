import React, { Component } from 'react'
import { Card, Button, Modal, Form, Select, Input, Tree, Transfer } from 'antd';
import ETable from '../../components/ETable';
import Utils from './../../utils/utils';
import axios from './../../axios';
import menuConfig from '../../config/menuConfig';

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
export default class PermissionUser extends Component {
  state = { list: [], isRoleVisible: false }
  componentWillMount() {
    // axios.requestList(this, '/role/list', {})
  }
  requestList = () => {
    axios.requestList(this, '/role/list', {})
  }

  handleRole = () => {
    this.setState({
      isRoleVisible: true
    })
  }
  handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    axios.ajax({
      url: '/role/create',
      data: {
        params: data
      }
    }).then((res) => {
      if (res.code == 0) {
        this.setState({ isRoleVisible: false })
        this.roleForm.props.form.resetFields();
        this.requestList()
      }
    })
  }

  handlePermission = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        text: '请选择一个角色'
      })
      return
    }
    this.setState({
      isPermVisible: true,
      detailInfo: item,
      menuInfo: item.menus
    })
  }

  handlePermEditSubmit = () => {
    let data = this.permForm.props.form.getFieldValue();
    data.role_id = this.state.selectedItem.id;
    data.menus = this.state.menuInfo;
    axios.ajax({
      url: '/permission/edit',
      data: {
        params: {
          ...data
        }
      }
    }).then(res => {
      if (res) {
        this.setState({
          isPermVisible: false
        })
        this.requestList()
      }
    })
  }

  handleUserAuth = (params) => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        text: '请选择一个角色'
      })
      return
    }
    this.setState({
      isUserVisible: true,
      detailInfo: item
    })
    this.getRoleUserList(item.id)
  }

  getRoleUserList = (id) => {
    axios.ajax({
      url: '/role/user_list',
      data: {
        params: {
          id
        }
      }
    }).then(res => {
      if (res) {
        this.getAuthUserList(res.result)
      }
    })
  }

  // 筛选目标用户
  getAuthUserList = (dataSource) => {
    const mockData = [];
    const targetKeys = [];
    if (dataSource && dataSource.length > 0) {
      for (let i = 0; i < dataSource.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status
        }
        if (data.status == 1) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }

      this.setState({ targetKeys, mockData })
    }
  }

  handleUserSubmit = () => {
    let data = {}
    data.user_ids = this.state.targetKeys
    data.role_id = this.state.selectedItem.id
    axios.ajax({
      url: '/role/user_role_edit',
      data: {
        params: {
          ...data
        }
      }

    }).then(res => {
      if (res) {
        this.setState({
          isUserVisible: false
        })
        this.requestList()
      }
    })
  }


  render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      },
      {
        title: '角色名称',
        dataIndex: 'role_name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time'
      },
      {
        title: '使用状态',
        dataIndex: 'status',
        render(status) {
          return status == 1 ? '启用' : '停用'
        }
      },
      {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formateDate
      },
      {
        title: '授权人',
        dataIndex: 'authorize_user_name'
      }
    ]
    return (
      <div>
        <Card>
          <Button style={{ marginRight: 10 }} type="primary" onClick={this.handleRole}>创建角色</Button>
          <Button style={{ marginRight: 10 }} type="primary" onClick={this.handlePermission}>设置权限</Button>
          <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            columns={columns}
            dataSource={this.state.list} />
        </div>
        <Modal
          title="创建角色"
          visible={this.state.isRoleVisible}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.roleForm.props.form.resetFields();
            this.setState({
              isRoleVisible: false
            })
          }}
        >
          <RoleForm wrapperedComponentRef={(inst) => this.roleForm = inst} />
        </Modal>

        <Modal
          title="设置权限"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            })
          }}
        >
          <PermEditForm
            patchMenuInfo={(checkedKeys) => {
              this.setState({ menuInfo: checkedKeys })
            }}
            menuInfo={this.state.menuInfo}
            detailInfo={this.state.detailInfo}
            wrapperedComponentRef={(inst) => this.permForm = inst}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isUserVisible: false
            })
          }}
        >
          <RoleAuthForm
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            detailInfo={this.state.detailInfo}
            wrapperedComponentRef={(inst) => this.userAuthForm = inst}
            patchUserInfo={(targetKeys) => {
              this.setState({
                targetKeys
              })
            }}
          />
        </Modal>
      </div>
    )
  }
}

class RoleForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    return (
      <Form>
        <FormItem {...formItemLayout} label="用户名">
          {getFieldDecorator('role_name', {
          })(
            <Input type="text" placeholder="请输入用户名" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="状态">
          {getFieldDecorator('state', {
          })(
            <Select>
              <Option value={1}>开启</Option>
              <Option value={0}>关闭</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    )
  }
}

RoleForm = Form.create({})(RoleForm)


class PermEditForm extends Component {
  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys)
  }

  renderTreeNodes = (data) => {
    return data.map(item => {
      if (item.children) {
        return <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      } else {
        return <TreeNode title={item.title} key={item.key} />
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    const { detailInfo = {}, menuInfo } = this.props;
    return (
      <Form>
        <FormItem {...formItemLayout} label="角色名称">
          {getFieldDecorator('role_name', {
          })(
            <Input type="text" disabled placeholder={detailInfo.role_name} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="状态">
          {getFieldDecorator('state', {
            initialValue: '1'
          })(
            <Select>
              <Option value={1}>开启</Option>
              <Option value={0}>关闭</Option>
            </Select>
          )}
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          onCheck={checkedKeys => {
            this.onCheck(checkedKeys)
          }}
          checkedKeys={menuInfo}
        >
          <TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}

PermEditForm = Form.create({})(PermEditForm)


class RoleAuthForm extends Component {
  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys)
  }

  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1
  }

  handleChange = (targetKeys) => {
    this.props.patchUserInfo(targetKeys);
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    }
    const { detailInfo = {}, menuInfo } = this.props;
    return (
      <Form>
        <FormItem {...formItemLayout} label="角色名称">
          {getFieldDecorator('role_name', {
          })(
            <Input type="text" disabled placeholder={detailInfo.role_name} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="选择用户">
          <Transfer
            listStyle={{ width: 200, height: 300 }}
            onChange={this.handleChange}
            dataSource={this.props.mockData}
            titles={['待选用户', '已选用户']}
            showSearch
            searchPlaceholder="输入用户名"
            filterOption={this.filterOption}
            targetKeys={this.props.targetKeys}
            render={item => item.title}
          />
        </FormItem>
      </Form>
    )
  }
}

RoleAuthForm = Form.create({})(RoleAuthForm)