import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin'
import Home from './pages/home'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loadings from './pages/ui/loadings'
import Notice from './pages/ui/notice'
import Messages from './pages/ui/messages'
import City from './pages/city';
import Order from './pages/order';
import User from './pages/user';
import NoMatch from './pages/nomatch';
import OrderDetail from './pages/order/detail';
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import RichText from './pages/rich';
import PermissionUser from './pages/permission';
import Common from './common';

export default class IRouter extends React.Component {
	render() {
		return (
			<HashRouter>
				<App>
					<Switch>
						<Route path="/login" component={Login} />
						<Route path="/common" render={
							() =>
								<Common>
									<Route path="/common/order/detail/:orderId" component={OrderDetail} />
								</Common>
						} />
						<Route path="/" render={() =>
							<Admin>
								<Switch>
									<Route path="/home" component={Home} />
									<Route path="/ui/buttons" component={Buttons} />
									<Route path="/ui/modals" component={Modals} />
									<Route path="/ui/loadings" component={Loadings} />
									<Route path="/ui/notification" component={Notice} />
									<Route path="/ui/messages" component={Messages} />
									<Route path="/city" component={City} />
									<Route path="/order" component={Order} />
									<Route path="/user" component={User} />
									<Route path="/bikemap" component={BikeMap} />
									<Route path="/charts/bar" component={Bar} />
									<Route path="/charts/pie" component={Pie} />
									<Route path="/charts/line" component={Line} />
									<Route path="/rich" component={RichText} />
									<Route path="/permission" component={PermissionUser} />
									<Redirect from="/" exact to="/home" />
									<Route component={NoMatch} />
								</Switch>
							</Admin>
						} />
					</Switch>
				</App>
			</HashRouter>
		)
	}
}