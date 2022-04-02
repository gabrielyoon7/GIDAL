import React, { useState, useCallback, useRef } from 'react';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Carousel from 'react-native-snap-carousel';
import TestMainView from '../../views/test/TestMainView';
import CarouselTestView from '../../views/test/CarouselTestView';
import SliderTestView from '../../views/test/SliderTestView';

  
const TestMainScreen = (props) => {
  return (
      <TestMainView navigation={props.navigation}/>
  );
}


function CarouselTestScreen() {
  return (
    <CarouselTestView/>
  );
}

function SliderTestScreen() {
  return (
    <SliderTestView/>
  );
}


const Drawer = createDrawerNavigator();

const MyDrawer = (props) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="TestMain" component={TestMainScreen} />
      <Drawer.Screen name="CarouselTest" component={CarouselTestScreen} />
      <Drawer.Screen name="SliderTest" component={SliderTestScreen} />
    </Drawer.Navigator>
  );
}

const TestRoute = (props) =>{
    return (
        <MyDrawer/>
    )
}
export default TestRoute;