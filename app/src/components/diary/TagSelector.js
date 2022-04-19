import { View } from "native-base";
import { useCallback, useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import TagCard from "../tag/TagCard";
import { TagDataExample } from "./TagDataExample";

const TagSelector = (props) =>{
    const exampleItems = TagDataExample;
    
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