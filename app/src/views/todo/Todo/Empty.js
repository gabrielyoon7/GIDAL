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
      <EmptyText>할 일이 없습니다.</EmptyText>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 630px;
  font-color:red;
  background-color: #ffffff;
`;

// const EmptyText = styled.Image`

// `;

const EmptyText = styled.Text`
  ${'' /* color: white; */}
  font-size: 20px;
`;