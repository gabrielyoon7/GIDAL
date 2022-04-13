import { View } from "native-base";
import { useCallback, useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import TagCard from "../tag/TagCard";

const TagSelector = (props) =>{
    const exampleItems = [
      {
        type : 'button',
        question: '버튼형 질문',
        tags: [{
          id: 1,
          name: 'a'
        }, {
          id: 2,
          name: 'b'
        }, {
          id: 3,
          name: 'b'
        }]
      },
      {
        type : 'search',
        question: '검색형 질문',
        tags: [{
          id: 1,
          name: 'a'
        }, {
          id: 2,
          name: 'b'
        }, {
          id: 3,
          name: 'b'
        }]
      },
      {
        type : 'time',
        question: '시간형 질문',
        tags: [{
          id: 1,
          name: 'a'
        }, {
          id: 2,
          name: 'b'
        }, {
          id: 3,
          name: 'b'
        }]
      },
      {
        type : 'slider1',
        question: '수치형 질문1',
        tags: [{
          id: 1,
          name: 'a'
        }, {
          id: 2,
          name: 'b'
        }, {
          id: 3,
          name: 'b'
        }]
      },
      {
        type : 'slider2',
        question: '수치형 질문2',
        tags: [{
          id: 1,
          name: 'a'
        }, {
          id: 2,
          name: 'b'
        }, {
          id: 3,
          name: 'b'
        }]
      },
    ];
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselItems, setCarouselItems] = useState(exampleItems);
    const ref = useRef(null);
  
    const renderItem = useCallback(({ item, index }) => (
      <TagCard item={item} />
    ), []);
  
    return (
      <View>
        <Carousel
          layout="default"
          ref={ref}
          data={carouselItems}
          sliderWidth={350}
          itemWidth={350}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
    );
  }
export default TagSelector;  