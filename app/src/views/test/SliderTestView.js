import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState } from 'react'
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

const Slider2 = () => {
  const [multiSliderValue, setMultiSliderValue] = useState([0, 100])

  const multiSliderValuesChange = (values) => setMultiSliderValue(values)

  return (
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
  )
}

const SliderTestView = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Article Screen</Text>
            <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />
            <Slider2/>
        </View>
    )
}
export default SliderTestView;