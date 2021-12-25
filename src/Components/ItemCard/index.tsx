import React from "react";
import styled from "styled-components";
import { GLassItem } from "../../Type";
interface Props {
  index: number;
  item: GLassItem;
}
const MenuItem = ({ index, item }: Props) => {
  return (
    <Wrapper middle={!!(index % 2)} image={item.glass_variants[0].media[0].url}>
      <div>
        <Title>{item.name}</Title>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ middle: boolean; image: string }>`
  background-image: url(${({ image }) => (image ? image : "")});
  background-size: cover;
  background-repeat: no-repeat;
  border-right: 0.1px solid ${({ theme }) => theme.secondary};
  border-bottom: 0.1px solid ${({ theme }) => theme.secondary};
  border-top: none;
  border-top: none;
  background-color: #f4f0ed;
  height: 280px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: ${100 / 3 - 0.5}vw;
  @media screen and (max-width: 1270px) {
    width: ${100 / 3 - .8}vw;
  }
  @media screen and (max-width: 900px) {
    width: ${48.8}vw;
  }
  @media screen and (max-width: 750px) {
    width: ${48.4}vw;
  }
  @media screen and (max-width: 650px) {
    width: 100vw;
  }
`;
const Title = styled.div`
  position: relative;
  top: 20px;
`;
export default MenuItem;
