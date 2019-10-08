import React from 'react';
import { Card, Button, notification } from 'antd';
import './ui.less';

export default class Notice extends React.Component {
  openNotification = (type) => {
    notification[type]({
      message: '发工资了',
      description: ''
    })
  }

  render() {
    return (
      <div>
        <Card title="通知提醒框" className="card-wrap">
          <Button type="primary" onClick={() => this.openNotification('success')}>
            success
          </Button>
          <Button type="primary" onClick={() => this.openNotification('info')}>
            Info
          </Button>
          <Button type="primary" onClick={() => this.openNotification('warning')}>
            Warning
          </Button>
          <Button type="primary" onClick={() => this.openNotification('error')}>
            Error
          </Button>
        </Card>
      </div>
    )
  }
}