import React from 'react';
import {Card, Button, Spin, Icon, Alert} from 'antd';
import './ui.less';

export default class Loadings extends React.Component {
	render() {
		const icon = <Icon type="loading" style={{fontSize: 24}} />
		return (
			<div>
				<Card title="Spin 用法" className="card-wrap">
					<Spin size="small" />
					<Spin style={{margin: '0 10px'}} />
					<Spin size="large" />
					<Spin indicator={icon} style={{marginLeft: 10}} />
				</Card>
				<Card title="内容遮罩" className="card-wrap">
					<Alert
						message="react"
						description="welcome"
						type="info"
					/>
					<Spin>
						<Alert
							message="react"
							description="welcome"
							type="warning"
						/>	
					</Spin>
					<Spin tip="加载中...">
						<Alert
							message="react"
							description="welcome"
							type="warning"
						/>	
					</Spin>
				</Card>
			</div>
		)
	}
}