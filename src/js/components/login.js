import React from 'react';
import {Row, Col} from 'antd';
import {
  Icon,
  Form,
  Input,
  Button,
  CheckBox,
  message
} from 'antd';

const FormItem = Form.Item;

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      action: 'login'
    }
  }

  handleSubmitLogin(e) {
    //页面开始向api提交数据
    e.preventDefault();
    this
      .props
      .form
      .validateFieldsAndScroll((err, values) => {
        if (!err) {
          var formData = values;
          // var myFetchOptions = {   method: 'GET' };
          // fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" +
          // this.state.action + "&userName=" + formData.username + "&password=" +
          // formData.password, myFetchOptions)   .then(response => response.json())
          // .then(json => {})   .catch(error => {     //error   });

          const userInfo = localStorage.getItem('userInfo') || '';

          if (userInfo == '') {
            message.error('请先去注册！');
            return;
          }
          if (formData.username == JSON.parse(userInfo).r_username && formData.password == JSON.parse(userInfo).r_password) {
            if (this.props.action == 'login') {
              this
                .props
                .setSet({hasLogined: true});
              localStorage.hasLogined = '1';
              this
                .props
                .setSet({userNickName: formData.username});
              message.success('登录成功！');
              this
                .props
                .form
                .resetFields();
              this
                .props
                .setModalVisible(false);

            }
          } else {
            message.error('账号或密码错误！');
          }

        }
      });
  }

  render() {

    let {getFieldDecorator} = this.props.form;
    const formItemLayout = this.props.formItemLayout;
    const tailFormItemLayout = this.props.tailFormItemLayout;

    return (
      <Form onSubmit={this
        .handleSubmitLogin
        .bind(this)}>
        <FormItem label='账户' {...formItemLayout} hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '账号不能为空！',
                whitespace: true
              }
            ]
          })(<Input placeholder='请输入您的账号'/>)}
        </FormItem>
        <FormItem label='密码' {...formItemLayout} hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '密码不能为空！'
              }, {
                // validator: this   .checkConfirm   .bind(this)
              }
            ]
          })(<Input type='password' placeholder='请输入您的密码'/>)}
        </FormItem>
        <FormItem {...tailFormItemLayout} className='mb_0'>
          <Button type='primary' htmlType='submit'>登录</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Login = Form.create({})(Login);