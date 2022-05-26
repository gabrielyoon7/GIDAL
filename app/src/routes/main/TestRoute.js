import React, { useState, useCallback, useRef } from 'react';
import { Button, View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Carousel from 'react-native-snap-carousel';
import TestMainView from '../../views/test/TestMainView';
import CarouselTestView from '../../views/test/CarouselTestView';
import SliderTestView from '../../views/test/SliderTestView';
import RichTextTestView from '../../views/test/RichTextTestView';
import DiaryWriteTestVeiw from '../../views/test/DiaryWriteTestVeiw';
import TodoTestView from '../../views/test/TodoTest/TodoTestView'
import TodoTest2View from '../../views/test/TodoDetailView';
import ImagePickerExample from '../../views/test/ImagePickerTest';

  
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

function RichTextTestScreen() {
  return (
    <RichTextTestView/>
  );
}

function DiaryWriteTestScreen(){
  return (
    <DiaryWriteTestVeiw/>
  );
}

function TodoTestScreen(){
  return (
    <TodoTestView/>
  );
}

function TodoTest2Screen({navigation}){
  return (
    <TodoTest2View navigation={navigation} />
  );
}

function ImagePickerScreen({navigation}){
  return (
    <ImagePickerExample navigation={navigation} />
  );
}


const Drawer = createDrawerNavigator();

const MyDrawer = (props) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="TestMain" component={TestMainScreen} />
      <Drawer.Screen name="CarouselTest" component={CarouselTestScreen} />
      <Drawer.Screen name="SliderTest" component={SliderTestScreen} />
      <Drawer.Screen name="RichTextTest" component={RichTextTestScreen} />
      <Drawer.Screen name="DiartWriteTest" component={DiaryWriteTestScreen} />
      <Drawer.Screen name="TodoTest" component={TodoTestScreen} />
      <Drawer.Screen name="TodoTest2" component={TodoTest2Screen} />
      <Drawer.Screen name="ImagePicker" component={ImagePickerScreen} />
    </Drawer.Navigator>
  );
}

const TestRoute = (props) =>{
    return (
        <MyDrawer/>
    )
}
export default TestRoute;