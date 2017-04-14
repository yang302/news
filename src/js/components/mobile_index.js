import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import MobileList from './mobile_list';
import {Tabs, Carousel, BackTop} from 'antd';

const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component {
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
        <MobileHeader/>
        <Tabs>
          <TabPane tab='头条' key='1'>
            <div class='carousel'>
              <Carousel {...settings}>
                {imgList.map((item, index) => <div key={index}><img src={item}/></div>)}
              </Carousel>
            </div>
            <MobileList count={20} type='top'/>
          </TabPane>
          <TabPane tab='社会' key='2'>
            <MobileList count={20} type='shehui'/>
          </TabPane>
          <TabPane tab='国内' key='3'>
            <MobileList count={20} type='guonei'/>
          </TabPane>
          <TabPane tab='国际' key='4'>
            <MobileList count={20} type='guoji'/>
          </TabPane>
          <TabPane tab='娱乐' key='5'>
            <MobileList count={20} type='yule'/>
          </TabPane>
        </Tabs>
        <MobileFooter/>
        <BackTop className='backTop'/>
      </div>
    )
  }
}