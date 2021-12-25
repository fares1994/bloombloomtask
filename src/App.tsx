import GlassesPage from "./Pages/GlassesPage";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import styled, {
  ThemeProvider,
  createGlobalStyle,
  keyframes,
} from "styled-components";
import { theme } from "./Theme/colors";
import { useCallback, useEffect, useState } from "react";
import MenuItem from "./Components/MenuItem";
import { Collection } from "./Type";
import { GetCollections } from "./DataQuery";
import * as _ from "lodash";
const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
  }
`;
const App = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [subMenu, setSubMenu] = useState<Collection[]>();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [categories, setCategories] = useState<
    { name: string; collection: boolean }[]
  >([]);
  const handleSetCollections = (collections: Collection[]) => {
    setCollections(collections);
  };
  const handleSetCategories = useCallback(() => {
    setCategories(
      _.uniqBy(
        collections.map((collection) => ({
          name: collection.configuration_name.split("-")[0],
          collection: true,
        })),
        "name"
      ) || []
    );
  }, [collections]);

  useEffect(() => {
    GetCollections({ handleSetCollections });
  }, []);

  useEffect(() => {
    handleSetCategories();
  }, [collections, handleSetCategories]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MainContainer>
        <Router>
          <MainNavBar
            onMouseEnter={() => (isShown ? setIsShown(true) : null)}
            onMouseLeave={() => (isShown ? setIsShown(false) : null)}
          >
            {isShown && window.innerWidth < 700 ? (
              <div
                onClick={() => setIsShown(false)}
                style={{ cursor: "pointer" }}
              >
                X
              </div>
            ) : (
              <BurgerMenuWrapper onClick={() => setIsShown(true)}>
                <BurgerLine />
                <BurgerLine />
                <BurgerLine />
              </BurgerMenuWrapper>
            )}
            {window.innerWidth >= 700 && (
              <MenuTextWrapper
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
              >
                <MenuText>Menu</MenuText>
                <MenuLine shown={isShown} />
              </MenuTextWrapper>
            )}
            <Logo
              src="https://d32y5z2afvomc1.cloudfront.net/assets/bloobloom_header_blue_logo.png"
              alt="logo"
            />
            <div />
          </MainNavBar>
          <MainMenu
            shown={isShown}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            {[
              ...categories,
              {
                name: "HOME TRY ON",
                collection: false,
              },
              {
                name: "PAIR FOR PAIR",
                collection: false,
              },
            ].map((item, index) => {
              return (
                <MenuItem
                  onMouseEnter={() =>
                    // eslint-disable-next-line no-restricted-globals
                    item.collection && window.innerWidth > 700
                      ? setSubMenu(
                          collections.filter((col) =>
                            col.name
                              .toLowerCase()
                              .includes(item.name.toLowerCase())
                          )
                        )
                      : null
                  }
                  onMouseLeave={() =>
                    item.collection ? setSubMenu(undefined) : null
                  }
                  onClick={() =>
                    item.collection && window.innerWidth < 700
                      ? setSubMenu(
                          collections.filter((col) =>
                            col.name
                              .toLowerCase()
                              .includes(item.name.toLowerCase())
                          )
                        )
                      : null
                  }
                  arrow={!!item?.collection}
                  title={item.name}
                  key={index}
                  order={index}
                  show={isShown}
                />
              );
            })}
          </MainMenu>
          <SubMenu
            shown={!!subMenu}
            onMouseEnter={() => {
              setIsShown(true);
              setSubMenu(subMenu);
            }}
            onMouseLeave={() => {
              setIsShown(false);
              setSubMenu(undefined);
            }}
          >
            {subMenu?.map((item, index) => (
              <MenuItem
                arrow={false}
                title={item.name}
                key={index}
                order={index}
                show={isShown}
                onClick={() => {
                  setIsShown(false);
                  setSubMenu(undefined);
                }}
              />
            ))}
          </SubMenu>
          <Routes>
            <Route
              path="/glasses/:collection/:gender/:name"
              element={<GlassesPage />}
            />
            <Route
              path="*"
              element={
                <Navigate to="/glasses/spectacles/women/Spectacles-Men" />
              }
            />
          </Routes>
        </Router>
      </MainContainer>
    </ThemeProvider>
  );
};

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.primary};
`;

const MainNavBar = styled.div`
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 0.2px solid ${({ theme }) => theme.secondery};
  padding: 0px 20px;
`;
const MenuText = styled.div`
  cursor: pointer;
  text-align: center;
  margin-bottom: 3px;
`;
const Logo = styled.img`
  height: 24px;
  width: 24px;
`;

const openMain = keyframes`
  from {
    left: -180px;
  }

  to {
    left: 0px;
  }
`;
const closeMain = keyframes`
  from {
    left: 0px;
  }

  to {
    left: -180px;
  }
`;
const MainMenu = styled.div<{ shown: boolean }>`
  display: ${({ shown }) => (shown ? "flex" : "none")};
  flex-direction: column;
  border: 0.2px solid ${({ theme }) => theme.secondery};
  border-top: none;
  position: absolute;
  top: 30;
  left: 0;
  height: 100%;
  width: 180px;
  @media screen and (max-width: 700px) {
    width: 100vw;
  }
  background-color: ${({ theme }) => theme.primary};
  z-index: 100;
  left: ${(props) => (props.shown ? "0px" : "-180px")};
  animation: ${(props) => (props.shown ? openMain : closeMain)} 0.3s linear;
  transition: visibility 0.3s linear;
`;
const openSub = keyframes`
  from {
    left: 0px;
  }

  to {
    left: 182px;
  }
`;
const closeSub = keyframes`
  from {
    left: 182px;
  }

  to {
    left: 0px;
  }
`;
const SubMenu = styled.div<{ shown: boolean }>`
  display: ${({ shown }) => (shown ? "flex" : "none")};
  flex-direction: column;
  border-right: 0.2px solid ${({ theme }) => theme.secondery};
  position: absolute;
  top: 30;
  left: 182px;
  height: 100%;
  width: 180px;
  @media screen and (max-width: 700px) {
    width: 100vw;
    left: 0px;
    z-index: 101;
  }
  background-color: ${({ theme }) => theme.primary};
  z-index: 99;
  left: ${(props) => (props.shown ? "182px" : "0px")};
  animation: ${(props) => (props.shown ? openSub : closeSub)} 0.3s linear;
  transition: visibility 0.3s linear;
`;
const expand = keyframes`
  from {
    width: 0px;
  }

  to {
    width: 40px;
  }
`;

const shrink = keyframes`
  from {
    width: 40px;
  }

  to {
    width: 0px;
  }
`;
const MenuLine = styled.div<{ shown: boolean }>`
  display: ${({ shown }) => (shown ? "block" : "none")};
  height: 2px;
  background-color: ${({ theme }) => theme.secondary};
  width: ${(props) => (props.shown ? "40px" : "0px")};
  animation: ${(props) => (props.shown ? expand : shrink)} 0.3s linear;
  transition: visibility 0.3s linear;
`;
const MenuTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 51px;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const BurgerMenuWrapper = styled.div`
  height: 15px;
  width: 20px;
  display: none;
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 700px) {
    display: flex;
  }
`;
const BurgerLine = styled.div`
  height: 2px;
  background-color: black;
  width: 20px;
`;
export default App;
