import React from 'react';
import {Row, Col} from 'antd';
import {Link} from 'react-router';

export default class MobileList extends React.Component {
  constructor() {
    super();
    this.state = {
      news: ''
    };
  }

  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type + '&count=' + this.props.count, myFetchOptions)
      .then(response => response.json())
      .then(json => this.setState({news: json}))
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    const news = this.state.news;
    const newsList = news.length
      ? news.map((newsItem, index) => (
        <section key={index} className='m_article list-item special_section clearfix'>
          <Link to={`/details/${newsItem.uniquekey}`}>
            <div className='m_article_img'>
              <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
            </div>
            <div className='m_article_info'>
              <div className='m_article_title'>
                <span>{newsItem.title}</span>
              </div>
              <div className='m_article_desc clearfix'>
                <div className='m_article_desc_l'>
                  <span className='m_article_channel'>{newsItem.realtype}</span>
                  <span className='m_article_time'>{newsItem.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      ))
      : '没有加载到任何新闻';

    return (
      <div>
        <Row>
          <Col span={24}>
            {newsList}
          </Col>
        </Row>
      </div>
    )
  }
}