import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, hashHistory} from 'react-router';
import PCIndex from './components/pc_index';
import PCUserCenter from './components/pc_usercenter';
import PCNewsDetails from './components/pc_news_details';
import MobileIndex from './components/mobile_index';
import MobileUserCenter from './components/mobile_usercenter';
import MobileNewsDetails from './components/mobile_news_details';
import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path='/' component={PCIndex}/>
            <Route path='/usercenter' component={PCUserCenter}/>
            <Route path='/details/:uniquekey' component={PCNewsDetails}/>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path='/' component={MobileIndex}/>
            <Route path='/usercenter' component={MobileUserCenter}/>
            <Route path='/details/:uniquekey' component={MobileNewsDetails}/>
          </Router>
        </MediaQuery>
      </div>
    );
  };
}

ReactDOM.render(
  <Root/>, document.getElementById('mainContainer'))