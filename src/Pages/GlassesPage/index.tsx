import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ItemCard from "../../Components/ItemCard";
import { GetGlasses } from "../../DataQuery";
import { FrameType, GLassItem, LensType } from "../../Type";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
const lensFilters: LensType[] = [
  "black",
  "tortoise",
  "coloured",
  "crystal",
  "dark",
  "bright",
];
const frameFilters: FrameType[] = ["square", "rectangle", "round", "cat-eye"];
const GlassesPage = () => {
  const [items, setItems] = useState<GLassItem[]>();
  const [lensTypes, setLensTypes] = useState<LensType[]>([]);
  const [frameTypes, setFrameTypes] = useState<FrameType[]>([]);
  const [currentFilter, setCurrentFilter] = useState<"lens" | "frame">();
  const [page, setPage] = useState<number>(1);
  const handleAddLensTypes = (type: LensType) => {
    setPage(1);
    if (lensTypes?.find((lens) => lens === type)) {
      setLensTypes(lensTypes?.filter((lens) => lens !== type));
    } else {
      setLensTypes([...(lensTypes || []), type]);
    }
  };

  const handleFrameTypes = (type: FrameType) => {
    setPage(1);
    if (frameTypes?.find((lens) => lens === type)) {
      setFrameTypes(frameTypes?.filter((lens) => lens !== type));
    } else {
      setFrameTypes([...(frameTypes || []), type]);
    }
  };
  const { gender, name, collection } = useParams();
  const handleSetItems = (fetchedItems: GLassItem[]) => {
    console.log(fetchedItems, "fetchedItems");
    console.log(page);
    if (page === 1) {
      setItems(fetchedItems);
    } else {
      setItems([...(items || []), ...fetchedItems]);
    }
  };
  const getCollection = useCallback(async () => {
    console.log("hit");
    console.log(gender);

    await GetGlasses({
      frameTypes,
      lensTypes,
      gender: gender as "men" | "women",
      limit: 12,
      page,
      handleSetItems,
      collection: collection as "sunglasses" | "spectacles",
    });
  }, [collection, gender, lensTypes, frameTypes, page]);
  useEffect(() => {
    getCollection();
  }, [gender, name, collection, getCollection]);

  useEffect(() => {
    setItems(undefined);
  }, [gender, name, collection]);

  useBottomScrollListener(() => {
    getCollection();
    setPage(page + 1);
  });
  return (
    <MainContainer>
      <PageHeader>
        <Fragment />
        <TitleWrapper>
          {name?.split("-")[0]} {name?.split("-")[1]}
        </TitleWrapper>
        <Fragment>
          <FilterSubHeader onClick={() => setCurrentFilter("lens")}>
            Colour
          </FilterSubHeader>
          <FilterSubHeader onClick={() => setCurrentFilter("frame")}>
            Shape
          </FilterSubHeader>
        </Fragment>
      </PageHeader>
      {currentFilter ? (
        <FilterWrapper>
          {currentFilter === "frame"
            ? frameFilters.map((type) => (
                <>
                  <Border />
                  <FilterChoice
                    onClick={() => handleFrameTypes(type)}
                    choosen={!!frameTypes.find((ftype) => ftype === type)}
                  >
                    <InnerFilterChoice
                      choosen={!!frameTypes.find((ftype) => ftype === type)}
                    >
                      {type}
                    </InnerFilterChoice>
                  </FilterChoice>
                  <Border />
                </>
              ))
            : lensFilters.map((type) => (
                <>
                  <Border />
                  <FilterChoice
                    onClick={() => handleAddLensTypes(type)}
                    choosen={!!lensTypes.find((ftype) => ftype === type)}
                  >
                    {type}
                  </FilterChoice>
                  <Border />
                </>
              ))}
        </FilterWrapper>
      ) : null}
      <ItemsWrapper borderLeft={!(!items || items?.length === 0)}>
        {!items ? (
          <EmptyState> Loading ...</EmptyState>
        ) : items?.length === 0 ? (
          <EmptyState> No Items to display</EmptyState>
        ) : (
          items?.map((item, index) => (
            <ItemCard index={index + 1} key={index} item={item} />
          ))
        )}
      </ItemsWrapper>
    </MainContainer>
  );
};
const MainContainer = styled.div``;

const PageHeader = styled.div`
  height: 45px;
  border-bottom: 0.2px solid ${({ theme }) => theme.secondery};
  border-right: 0.2px solid ${({ theme }) => theme.secondery};
  border-left: 0.2px solid ${({ theme }) => theme.secondery};
  display: flex;
  flex-direction: row;
`;
const FilterWrapper = styled(PageHeader)`
  justify-content: center;
`;
const FilterChoice = styled.div<{ choosen: boolean }>`
  height: 40px;
  cursor: pointer;
  margin: 0px auto;
  color: ${({ choosen, theme }) => (choosen ? theme.secondary : theme.silver)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const InnerFilterChoice = styled.div<{ choosen: boolean }>`
  margin: auto;
  text-align: center;
  height: 25px;
  padding: 3px;
  border: 0.2px solid
    ${({ theme, choosen }) => (choosen ? theme.secondary : "transparent")};
`;
const Border = styled.div`
  height: 45px;
  width: 0.1px;
  background-color: ${({ theme }) => theme.secondary};
`;
const TitleWrapper = styled.div`
  border-right: 0.2px solid ${({ theme }) => theme.secondary};
  border-left: 0.2px solid ${({ theme }) => theme.secondary};
  width: ${100 / 3}vw;
  text-align: center;
  font-weight: 700;
  align-items: center;
  line-height: 45px;
`;
const Fragment = styled.div`
  width: ${100 / 3}vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const FilterSubHeader = styled.div`
  border-right: 0.2px solid ${({ theme }) => theme.secondery};
  width: 10vw;
  line-height: 45px;
  text-align: center;
  font-size: 0.8em;
  cursor: pointer;
`;
const ItemsWrapper = styled.div<{ borderLeft: boolean }>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-grow: 1;
  ${({ borderLeft }) =>
    borderLeft ? "border-left: 0.2px solid black;" : null};
`;

const EmptyState = styled.div`
  margin: 20px;
`;
export default GlassesPage;
