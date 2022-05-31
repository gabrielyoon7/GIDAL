import { View } from "native-base";
import { useCallback, useEffect, useRef, useState } from "react";
import Carousel, { ParallaxImage } from 'react-native-snap-carousel'; import { config } from "../../../config";
import TagCard from "../tag/TagCard";
// import { TagDataExample } from "./TagDataExample";
import axios from 'axios';
import { Dimensions, Text, TouchableOpacity, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get('window')
const TagSelector = (props) => {

  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
  }, [carouselItems]);

  const getTags = () => {
    let result = []
    axios.get(config.ip + ':5000/tagsRouter/find')
      .then((response) => {
        setCarouselItems(response.data);
      }).catch(function (error) {
        console.log(error);
      })
  }

  const renderItem = useCallback(({ item, index }, parallaxProps) => (
    <View>
      <ParallaxImage
        source={{ uri: item.thumbnail }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
      <TagCard item={item} selectTags={props.selectTags} tags={props.tags} />
    </View>


  ), [props.tags]);


  return (
    <View>
      <Carousel
        layout={'default'}
        ref={ref}
        data={carouselItems}
        sliderWidth={450}
        itemWidth={350}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
        hasParallaxImages={true}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 2,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'green',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
})
export default TagSelector;  