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

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      action: this.props.action,
      confirmDirty: false
    };
  }

  handleSubmitReg(e) {
    //页面开始向api提交数据
    e.preventDefault();
    this
      .props
      .form
      .validateFieldsAndScroll((err, values) => {
        if (!err) {
          //console.log('values of form', values);
          var formData = values;
           var myFetchOptions = {
             method: 'GET'
           };
           fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action + "&r_username=" + formData.r_username + "&r_password=" + formData.r_password + "&r_confirmPassword=" + formData.r_confirmPassword, myFetchOptions)
             .then(response => response.json())
             .then(json => {
                localStorage.userId = json.UserId;
              })
             .catch(error => {
               //error
             });

          localStorage.setItem('userInfo', JSON.stringify(formData));
          localStorage.hasLogined = '0';
          message.success('注册成功！');
          this
            .props
            .form
            .resetFields();
          this
            .props
            .setModalVisible(false);
        }
      });
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
  }

  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('r_password')) {
      callback('两次密码不一致！');
    } else {
      callback();
    }
  }

  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['r_confirmPassword'], {force: true});
    }
    callback();
  }

  render() {

    let {getFieldDecorator} = this.props.form;
    const formItemLayout = this.props.formItemLayout;
    const tailFormItemLayout = this.props.tailFormItemLayout;

    return (
      <Form onSubmit={this
        .handleSubmitReg
        .bind(this)}>
        <FormItem label='账户' {...formItemLayout} hasFeedback>
          {getFieldDecorator('r_username', {
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
          {getFieldDecorator('r_password', {
            rules: [
              {
                required: true,
                message: '密码不能为空！'
              }, {
                validator: this
                  .checkConfirm
                  .bind(this)
              }
            ]
          })(<Input type='password' placeholder='请输入您的密码'/>)}
        </FormItem>
        <FormItem label='确认密码' {...formItemLayout} hasFeedback>
          {getFieldDecorator('r_confirmPassword', {
            rules: [
              {
                required: true,
                message: '重复密码不能为空！'
              }, {
                validator: this
                  .checkPassword
                  .bind(this)
              }
            ]
          })(<Input
            type='password'
            placeholder='请再次输入您的密码'
            onBlur={this
            .handleConfirmBlur
            .bind(this)}/>)}
        </FormItem>
        <FormItem {...tailFormItemLayout} class='mb_0'>
          <Button type='primary' htmlType='submit'>注册</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Register = Form.create({})(Register);