import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const SpectaclesPage = () => {
  const { gender } = useParams();
  return (
    <MainContainer>
      <PageHeader>
        <Fragment />
        <TitleWrapper>{gender} Spectacles</TitleWrapper>
        <Fragment>
          <FilterWrapper>Colour</FilterWrapper>
          <FilterWrapper>Shape</FilterWrapper>
        </Fragment>
      </PageHeader>
    </MainContainer>
  );
};
const MainContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const PageHeader = styled.div`
  height: 45px;
  border-bottom: 0.2px solid ${({ theme }) => theme.secondery};
  display: flex;
  flex-direction: row;
`;
const TitleWrapper = styled.div`
  border-right: 0.2px solid ${({ theme }) => theme.secondery};
  border-left: 0.2px solid ${({ theme }) => theme.secondery};
  width: 33.333vw;
  text-align: center;
  font-weight: 700;
  align-items: center;
  line-height: 45px;
`;
const Fragment = styled.div`
  width: 33.333vw;
  display: flex;
  flex-direction: row;
`;
const FilterWrapper = styled.div`
  border-right: 0.2px solid ${({ theme }) => theme.secondery};
  width: 10vw;
  line-height: 45px;
  text-align: center;
  font-size: 0.8em;
  cursor: pointer;
`;
export default SpectaclesPage;
