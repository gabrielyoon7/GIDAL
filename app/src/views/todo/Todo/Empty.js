import React from "react";
import styled from "styled-components";

export default function Empty() {
  return (
    <ComponentContainer>
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