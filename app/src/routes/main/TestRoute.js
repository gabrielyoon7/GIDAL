import React, { useState, useCallback, useRef } from 'react';
import { Button, View, Text, SafeAreaView, StyleSheet, Pressable, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Carousel from 'react-native-snap-carousel';

const exampleItems = [
  {
    title: 'Item 1',
  },
  {
    title: 'Item 2',
  },
  {
    title: 'Item 3',
  },
  {
    title: 'Item 4',
  },
  {
    title: 'Item 5',
  },
];

const CustomCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState(exampleItems);
  const ref = useRef(null);

  const onPressFunction = () => {
    Alert.alert('press!')
  }

  const renderItem = useCallback(({ item, index }) => (
    <View style={{ backgroundColor: 'gray',}}>
      <Text style={{ fontSize: 30 }}>{item.title}</Text>
      <View style={{ justifyContent: 'center', flexDirection : "row" }} >
        <View style={styles.btnView}>
          <Pressable style={styles.button} onPress={onPressFunction}>
              <Text>1</Text>
          </Pressable>
        </View>
        <View style={styles.btnView}>
          <Pressable style={styles.button} onPress={onPressFunction}>
              <Text>2</Text>
          </Pressable>
        </View>
        <View style={styles.btnView}>
          <Pressable style={styles.button} onPress={onPressFunction}>
              <Text>3</Text>
          </Pressable>
        </View>
      </View>
      
    </View>
  ), []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Carousel
          layout="default"
          ref={ref}
          data={carouselItems}
          sliderWidth={300}
          itemWidth={300}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: '#dcdde1',
    width: 80
  },
  btnView: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 100,
    borderWidth: 2,
    margin: 5
  }
});
  
const TestMainScreen = (props) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Test!</Text>
            <CustomCarousel/>
            <View style={{ flex: 1 }}>
              <Button
                  title="홈으로 이동하기"
                  onPress={() => props.navigation.navigate('Home')}
              />  
            </View>
        </View>
    );
}


function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="TestMain" component={TestMainScreen} />
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const TestRoute = () =>{
    return (
        // <Tab.Navigator
        //     screenOptions={{ headerShown: false }} 
        // >
        //     <Tab.Screen name="TestMain" component={TestMainScreen} />
        // </Tab.Navigator>
        <MyDrawer/>
    )
}
export default TestRoute;