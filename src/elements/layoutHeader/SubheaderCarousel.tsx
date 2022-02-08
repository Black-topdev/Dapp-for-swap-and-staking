import Slick, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SubheaderCarousel.css';

import data from 'fake_data/staking/sub_header.json';

export const SubHeaderCarousel = () => {
  const sliderSettings: Settings = {
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    infinite: true,
    customPaging: (i) => <div className="ft-slick__dots--custom" key={i} />,
  };

  const renderItems = () => {
    const items = [];
    for (let i = 0; i < data.length; i++) {
      items.push(i);
    }
    return items.map((item) => (
      <div key={data[item].id}>{data[item].content}</div>
    ));
  };

  return (
    <div className="content dark:text-black">
      <Slick {...sliderSettings}>{renderItems()}</Slick>
    </div>
  );
};
