import React from 'react';
import ReactDOM from 'react-dom';
import './Index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Router, Route, IndexRoute, hashHistory } from "react-router";
import Faq from "./components/faq/Faq";
import Contact from "./components/contact/Contact";
import BuySell from "./components/buy_sell/BuySell";

ReactDOM.render(<Router history={hashHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={BuySell}></IndexRoute>
						<Route path="faq" component={Faq}></Route>
						<Route path="contact" component={Contact}></Route>
					</Route>
				</Router>, document.getElementById('root'));
registerServiceWorker();
