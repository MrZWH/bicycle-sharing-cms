import React, { Component } from 'react'
import { Card, Button, message } from 'antd';
import './ui.less';

export default class Messages extends Component {
  showMessage = () => {
    message.success('恭喜')
  }

  render() {
    return (
      <div>
        <Card title="全局提示框" className="card-wrap">
          <Button type="primary" onClick={this.showMessage} >Success</Button>
          <Button type="primary" onClick={this.showMessage} >Success</Button>
          <Button type="primary" onClick={this.showMessage} >Success</Button>
          <Button type="primary" onClick={this.showMessage} >Success</Button>
          <Button type="primary" onClick={this.showMessage} >Success</Button>
        </Card>
      </div>
    )
  }
}
