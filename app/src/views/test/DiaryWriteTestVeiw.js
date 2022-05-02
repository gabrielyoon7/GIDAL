import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Box, Button, Center, Divider, HStack, Icon, Image, Avatar, Spacer } from "native-base"
import React, { useEffect, useState, } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { config } from '../../../config'
import InputTitle from "../../components/diary/InputTitle";
import RadioDisclosure from "../../components/diary/RadioDisclosure";
import TagSelector from "../../components/diary/TagSelector";
import InputContent from "../../components/diary/InputContent";
import PressableTag from '../../components/tag/interaction/PressableTag';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll';
import { useWindowDimensions } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';


const ReadProfile = () => {
  return (
    <Box>
      <Text color="coolGray.800" mt="3" fontWeight="bold" fontSize="4xl">
        일기장
      </Text>
      <Text fontSize="sm" color="coolGray.700" my="1">
          <Text>2022-04-25 00:00:00</Text>
      </Text>
      <Box  style={styles.row} justifyContent="center" display="flex">
          <TouchableOpacity>
              <HStack alignItems="center" my="1">
                  <Avatar bg="green.500" alignSelf="center" size="sm" source={{
                      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  }}>
                      AJ
                  </Avatar>
                  <Text mx={2} fontSize="md" color="coolGray.700">
                      202212069
                  </Text>
                  <Spacer />
              </HStack>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, flexDirection: 'row-reverse', alignSelf: 'center', marginLeft: 10}}>
                      
          </TouchableOpacity>
      </Box>
      <Box height={1000} background={"coolGray.500"}>
        
      </Box>
    </Box>
  )
}

const FixedHeader = () => {
  return (
    <Box background={'green.300'}>
      Welcome
    </Box>
  )
}

const FidexBackground = () => {
  return (
    <Box background={'darkBlue.300'}>Background</Box>
  )
}

const FidexForeground = () => {
  return (
    <Box background={'coolGray.300'}>Foreground</Box>
  )
}

// const DiaryWriteView = (props) => {
//   return (
//      <ParallaxScroll
//       renderHeader={() => <FixedHeader/>} 
//       parallaxHeaderHeight={300}
//       isHeaderFixed={false}
//       parallaxHeight={250}
//       renderParallaxBackground={() => <FidexBackground />}
//       renderParallaxForeground={() => <ReadProfile />}
//       parallaxBackgroundScrollSpeed={5}
//       parallaxForegroundScrollSpeed={2.5}
//     >
//     </ParallaxScroll>
//   );
// };

const DiaryWriteView = (props) => {
  return (
    <ParallaxScrollView
      backgroundColor="blue"
      contentBackgroundColor="pink"
      parallaxHeaderHeight={300}
      // renderScrollComponent={() => <Animated.View />}
      //renderScrollComponent={() => <AnimatedCustomScrollView />}
      renderForeground={() => (
       <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Hello World!</Text>
        </View>
      )}>
      <View style={{ height: 500 }}>
        <Text>Scroll me</Text>
      </View>
    </ParallaxScrollView>
  );
}

export default DiaryWriteView;

const styles = StyleSheet.create({
  row: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginBottom: 16,
      // backgroundColor: 'black'
    },
})