import { View } from "native-base";
import { useCallback, useEffect, useRef, useState } from "react";
import Carousel from "react-native-snap-carousel";
import { config } from "../../../config";
import TagCard from "../tag/TagCard";
// import { TagDataExample } from "./TagDataExample";
import axios from 'axios';
import { Text, TouchableOpacity } from "react-native";

const TagSelector = (props) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const ref = useRef(null);
  
  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    // console.log('123')
  }, [carouselItems]);

  const getTags = () => {
    let result = []
    axios.get(config.ip + ':5000/tagsRouter/find')
      .then((response) => {
        // console.log(response.data);
        setCarouselItems(response.data);
      }).catch(function (error) {
        console.log(error);
      })
  }

  const renderItem = useCallback(({ item, index }) => (
    <TagCard item={item} selectTags={props.selectTags} />
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