import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin'
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
import Common from './common';

export default class IRouter extends React.Component {
	render() {
		return (
			<HashRouter>
				<App>
					<Route path="/login" component={Login} />
					<Route path="/admin" render={() =>
						<Admin>
							<Switch>
								<Route path="/admin/ui/buttons" component={Buttons} />
								<Route path="/admin/ui/modals" component={Modals} />
								<Route path="/admin/ui/loadings" component={Loadings} />
								<Route path="/admin/ui/notification" component={Notice} />
								<Route path="/admin/ui/messages" component={Messages} />
								<Route path="/admin/city" component={City} />
								<Route path="/admin/order" component={Order} />
								<Route path="/admin/user" component={User} />
								<Route path="/admin/bikemap" component={BikeMap} />
								<Route path="/admin/charts/bar" component={Bar} />
								<Route path="/admin/charts/pie" component={Pie} />
								<Route path="/admin/charts/line" component={Line} />
								<Route component={NoMatch} />
							</Switch>
						</Admin>
					} />
					<Route path="/common" render={
						() =>
							<Common>
								<Route path="/common/order/detail/:orderId" component={OrderDetail} />
							</Common>
					} />
				</App>
			</HashRouter>
		)
	}
}