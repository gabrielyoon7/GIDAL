import React from "react";
import styled from "styled-components";

export default function Empty() {
  return (
    <ComponentContainer>
      {/* <EmptyImage
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/42/42767.png',
        }}
      /> */}
      <EmptyText>Add To-Do.</EmptyText>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 650px;
`;

const EmptyImage = styled.Image`
  width: 350px;
  height: 400px;
`;

const EmptyText = styled.Text`
  color: white;
  font-size: 30px;
`;