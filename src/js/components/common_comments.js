import React from 'react';
import {
  Row,
  Col,
  Icon,
  Form,
  Input,
  Card,
  Button,
  notification
} from 'antd';

const FormItem = Form.Item;

class CommonComments extends React.Component {
  constructor() {
    super();
    this.state = {
      comments: ''
    };
  }

  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };

    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=' + this.props.uniquekey, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({comments: json});
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    this
      .props
      .form
      .validateFieldsAndScroll((err, values) => {
        if (!err) {
          var formData = values;
          var myFetchOptions = {
            method: 'GET'
          };
          fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=' + localStorage.userId + '&uniquekey=' + this.props.uniquekey + '&commnet=' + formData.remark, myFetchOptions)
            .then(response => response.json())
            .then(json => {
              this.componentDidMount();
              this
                .props
                .form
                .resetFields();
            })
            .catch(error => {
              console.log(error);
            });
        }
      });
  }

  addUserCollection() {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=' + localStorage.userId + '&uniquekey=' + this.props.uniquekey, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        notification['success'](
            {
                message: 'ReactNews提醒',
                description: '收藏此文章成功！',
                duration: 2
            }
        );
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {

    let {getFieldDecorator} = this.props.form;
    const {comments} = this.state;
    const commentList = comments.length
      ? comments.map((comment, index) => (
        <Card
          key={index}
          title={comment.UserName || JSON
          .parse(localStorage.userInfo)
          .r_username}
          extra={<a href = 'javascript:;' > 发布于 {comment.datetime} </a>}>
          <p>{comment.Comments}</p>
        </Card>
      ))
      : '没有加载到任何评论';

    return (
      <div className='comment'>
        <Row>
          <Col span={24}>
            {commentList}
            <Form onSubmit={this
              .handleSubmit
              .bind(this)}>
              <FormItem label='您的评论'>
                {getFieldDecorator('remark', {
                  rules: [
                    {
                      required: true,
                      message: '内容不能为空！',
                      whitespace: true
                    }
                  ]
                })(<Input type='textarea' placeholder='随便写'/>)}
              </FormItem>
              <Button type='primary' htmlType='submit'>提交评论</Button>
              &nbsp;&nbsp;
              <Button
                type='primary'
                htmlType='button'
                onClick={this
                .addUserCollection
                .bind(this)}>收藏该文章</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CommonComments = Form.create({})(CommonComments);