import React from 'react';
import {Route, Link, browserHistory} from 'react-router';
import Login from './login';
import Register from './register';
import {
  Row,
  Col,
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Tooltip,
  Button,
  Checkbox,
  Modal
} from 'antd';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MobileHeader extends React.Component {

  constructor() {
    super();
    this.state = {
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userId: 0
    };
  }

  componentWillMount() {
    const userInfo = localStorage.getItem('userInfo') || '';
    if (userInfo != '' && localStorage.hasLogined == '1') {
      this.setState({hasLogined: true});
      this.setState({
        userNickName: JSON
          .parse(userInfo)
          .r_username,
        userId: localStorage.userId
      });
    }
  }

  setModalVisible(value) {
    this.setState({modalVisible: value});
  }

  handleClick(e) {
    if (e.key == 'register') {
      this.setState({current: 'register'});
      this.setModalVisible(true);
    } else {
      this.setState({current: e.key});
    }
  }

  login() {
    this.setModalVisible(true);
  }

  callback(key) {
    if (key == 1) {
      this.setState({action: 'login'});
    } else if (key == 2) {
      this.setState({action: 'register'});
    }
  }

  setSet(obj) {
    this.setState(obj);
  }

  render() {
    let {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogined
      ? <Link to={`/usercenter`}>
          <Icon type='inbox'/>
        </Link>
      : <Icon type='setting' onClick={this
        .login
        .bind(this)}/>
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 6
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 14
        }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 14,
          offset: 6
        }
      }
    };

    return (
      <div id='mobileheader'>
        <header>
          <a href='/'>
            <img src='./src/images/logo.png' alt='logo'/></a>
          <span>ReactNews</span>
          {userShow}
        </header>
        <Modal
          wrapClassName='vertical-center-modal'
          title='用户中心'
          visible={this.state.modalVisible}
          onCancel={() => this.setModalVisible(false)}
          onOk={() => this.setModalVisible(false)}
          okText='关闭'>
          <Tabs type='card' onChange={this
            .callback
            .bind(this)}>
            <TabPane tab='登录' key='1'>
              <Login
                formItemLayout={formItemLayout}
                tailFormItemLayout={tailFormItemLayout}
                setModalVisible={this
                .setModalVisible
                .bind(this)}
                action={this.state.action}
                setSet={this
                .setSet
                .bind(this)}></Login>
            </TabPane>
            <TabPane tab='注册' key='2'>
              <Register
                formItemLayout={formItemLayout}
                tailFormItemLayout={tailFormItemLayout}
                setModalVisible={this
                .setModalVisible
                .bind(this)}
                action={this.state.action}></Register>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default MobileHeader = Form.create({})(MobileHeader);