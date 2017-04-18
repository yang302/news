import React from 'react';
import {Row, Col, Tabs, Carousel} from 'antd';
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';
import PCProducts from './pc_products';

const TabPane = Tabs.TabPane;

export default class PCNewsContainer extends React.Component {
  render() {

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    };

    const imgList = ['./src/images/carousel_1.jpg', './src/images/carousel_2.jpg', './src/images/carousel_3.jpg', './src/images/carousel_4.jpg'];

    return (
      <div>
        <Row>
          <Col span={2}></Col>
          <Col span={20} class='container'>
            <div class='leftContainer'>
              <div class='carousel'>
                <Carousel {...settings}>
                  {imgList.map((item, index) => <div key={index}><img src={item}/></div>)
}
                </Carousel>
              </div>
              <PCNewsImageBlock
                count={6}
                type='guoji'
                width='400px'
                cardTitle='国际头条'
                imageWidth='112px'/>
            </div>
            <Tabs className='tabs_news'>
              <TabPane tab='头条新闻' key='1'>
                <PCNewsBlock count={22} type='top'/>
              </TabPane>
              <TabPane tab='国际' key='2'>
                <PCNewsBlock count={22} type='guoji'/>
              </TabPane>
            </Tabs>
            <Tabs className='tabs_product'>
              <TabPane tab='ReactNews 产品' key='1'>
                <PCProducts />
              </TabPane>
            </Tabs>
            <PCNewsImageBlock
              count={8}
              type='guonei'
              width='100%'
              cardTitle='国内新闻'
              imageWidth='132px'/>
            <PCNewsImageBlock
              count={16}
              type='yule'
              width='100%'
              cardTitle='娱乐新闻'
              imageWidth='132px'/>
          </Col>
          <Col span={2}></Col>
        </Row>
      </div>
    )
  }
}