import React, { useState, useCallback, useRef } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Button, View, Text, TextInput, SafeAreaView, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import { Center } from 'native-base';
import Slider from '@react-native-community/slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import styled from 'styled-components/native'
import { Platform } from 'react-native'


const SliderWrapper = styled.View`
  margin: 20px;
  width: 280px;
  height: 300px;
  justify-content: center;
`

const ViewContainer = styled.View`
  align-self: center;
  justify-content: center;
`
const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
`

const LabelText = styled.Text`
  font-size: 20px;
`


const Slider2 = (props) => {
    const [multiSliderValue, setMultiSliderValue] = useState([0, 100])

    const multiSliderValuesChange = (values) => setMultiSliderValue(values)

    return (
        <View style={{ justifyContent: 'center', flexDirection: "row" }} >
            <ViewContainer>
                <SliderWrapper>
                    <LabelWrapper>
                        <LabelText>{multiSliderValue[0]} </LabelText>
                        <LabelText>{multiSliderValue[1]}</LabelText>
                    </LabelWrapper>
                    <MultiSlider
                        markerStyle={{
                            ...Platform.select({
                                ios: {
                                    height: 30,
                                    width: 30,
                                    shadowColor: '#000000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 3
                                    },
                                    shadowRadius: 1,
                                    shadowOpacity: 0.1
                                },
                                android: {
                                    height: 30,
                                    width: 30,
                                    borderRadius: 50,
                                    backgroundColor: '#1792E8'
                                }
                            })
                        }}
                        pressedMarkerStyle={{
                            ...Platform.select({
                                android: {
                                    height: 30,
                                    width: 30,
                                    borderRadius: 20,
                                    backgroundColor: '#148ADC'
                                }
                            })
                        }}
                        selectedStyle={{
                            backgroundColor: '#1792E8'
                        }}
                        trackStyle={{
                            backgroundColor: '#CECECE'
                        }}
                        touchDimensions={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            slipDisplacement: 40
                        }}
                        values={[multiSliderValue[0], multiSliderValue[1]]}
                        sliderLength={280}
                        onValuesChange={multiSliderValuesChange}
                        min={0}
                        max={100}
                        allowOverlap={false}
                        minMarkerOverlapDistance={10}
                    />
                </SliderWrapper>
            </ViewContainer>
            {/* {props.tags.map((tag) => (
                <View key={tag.id} style={styles.btnView}>
                    <Pressable style={styles.button} onPress={() => onPressFunction(tag.name)}>
                        <Text>{tag.name}</Text>
                    </Pressable>
                </View>
            ))} */}
        </View>
    )
}

export default Slider2;


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
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
        margin: 5,
        marginTop: 15
    },
});