import React, { Component } from 'react'
import { Row, Col } from 'antd';
import './index.less';
import Util from '../../utils/utils';
import axios from '../../axios';
import { connect } from 'react-redux';

class Header extends Component {
  state = {}
  componentWillMount() {
    this.setState({
      userName: '英俊男孩'
    })

    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime())
      this.setState({ sysTime })
    }
      , 1000)
    // this.getWeatherAPIData()
  }

  getWeatherAPIData() {
    let city = '北京'
    axios.jsonp({
      url: `http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(city)}&output=json&ak=你的key`
    }).then((res) => {
      if (res.status) {
        let data = res.results[0].weather_data[0]
        this.setState({
          dayPictureUrl: data.dayPictureUrl,
          weather: data.weather
        })
      }
    })
  }
  render() {
    const { menuType } = this.props;
    return (
      <div className="header">
        <Row className="header-top">
          {menuType && <Col span={6} className="logo">
            <img src="/assets/logo-ant.svg" />
            <span>通用管理系统</span>
          </Col>
          }
          <Col span={menuType ? 18 : 24}>
            <span>欢迎，{this.state.userName}</span>
            <a>退出</a>
          </Col>
        </Row>
        {!menuType && <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            {this.props.menuName}
          </Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            {/* <span className="weather-img">
              <img src={this.state.dayPictureUrl} />
            </span> */}
            <span className="weather-detail">
              {/* {this.state.weather} */}
              晴转多云
            </span>
          </Col>
        </Row>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    menuName: state.menuName
  }
}

export default connect(mapStateToProps)(Header)