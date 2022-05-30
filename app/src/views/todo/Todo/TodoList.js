import React from "react";
import { View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components";
import { Checkbox } from "native-base";

export default function TodoList({ item, deleteItem, changeIsDone }) {
  return (
    <ComponentContainer>
    {item != null && 
      <ListContainer>
        <CirlceContainer>
          {/* <Entypo name="circle" size={20} color="midnightblue" /> */}
          <Checkbox value={item.isDone} onChange={(val) => changeIsDone(item, val)}> </Checkbox>
        </CirlceContainer>
        <View style={{marginTop: 8}}>
          <TextItem>{item.value}</TextItem>
        </View>
        <IconContainer onPress={() => deleteItem(item)}>
          <MaterialIcons name="delete" size={24} color="black" />
        </IconContainer>
      </ListContainer>
    }
    </ComponentContainer>
  );
}

const ListContainer = styled.TouchableOpacity`
  background-color: #b8e994;
  height: auto;
  width: 350px;
  margin-top:20px
  margin-bottom: 0.1px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

const ComponentContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

const TextItem = styled.Text`
  color: black;
  width: 240px;
  height: auto;
  font-size: 20px;
  margin-top: 10px;
  margin-right:1px;
`;

const TextDate = styled.Text`
  color: goldenrod;
  font-size: 15px;
  margin-right: 20px;
  border-radius: 10px;
  width: 40px;
`;

const IconContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 60px;
  padding-right: 10px;
  padding-top: 1px;
`;

const CirlceContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-left: 15px;

`;