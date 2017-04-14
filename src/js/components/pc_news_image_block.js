import React from 'react';
import {Card} from 'antd';
import {Link} from 'react-router';

export default class PCNewsImageBlock extends React.Component {
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
    const styleImage = {
        display: 'block',
        width: this.props.imageWidth,
        height: '90px'
    };
    const styleH3 = {
        width: this.props.imageWidth,
        whiteSpace: 'noWrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis' 
    };
    const news = this.state.news;
    const newsList = news.length
      ? news.map((newsItem, index) => (
        <div key={index} className='imageblock'>
            <Link to={`details/${newsItem.uniquekey}`} target='_blank'>
                <div className='custom-image'>
                    <img style={styleImage} src={newsItem.thumbnail_pic_s} />
                </div>
                <div className='custom-card'>
                    <h3 style={styleH3}>{newsItem.title}</h3>
                    <p>{newsItem.author_name}</p>
                </div>
            </Link>
        </div>
      ))
      : '没有加载到任何新闻';

    return (
      <Card title={this.props.cardTitle} style={{
        width: this.props.width
      }} className='topNewsList'>
        {newsList}
      </Card>
    )
  }
}
