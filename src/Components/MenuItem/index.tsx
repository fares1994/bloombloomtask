import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
interface Props {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onPress?: () => void;
  onClick?: () => void;
  title: string;
  arrow: boolean;
  order: number;
  show: boolean;
}
const MenuItem = ({
  title,
  onMouseEnter,
  onMouseLeave,
  arrow,
  order,
  onClick,
}: Props) => {
  const navigate = useNavigate();
  const navigateToPage = () => {
    if (onClick) {
      return onClick();
    }
    const titleSplit = title.split(" ");
    navigate(
      `glasses/${titleSplit[0].toLowerCase()}/${titleSplit[1].toLowerCase()}/${title.replace(
        "-",
        " "
      )}`
    );
  };
  const [show, setShow] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, (order + 1) * 500);
  });
  return (
    <Wrapper
      onMouseEnter={() => (onMouseEnter ? onMouseEnter() : null)}
      onMouseLeave={() => (onMouseLeave ? onMouseLeave() : null)}
      onClick={navigateToPage}
      show={show}
    >
      <Title>{title.toUpperCase()}</Title>
      <Arrow shown={arrow} />
    </Wrapper>
  );
};
const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;
const Wrapper = styled.div<{ show: boolean }>`
  height: 20px;
  cursor: pointer;
  border-bottom: 0.2px solid ${({ theme }) => theme.secondery};
  padding: 12px 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  animation: ${(props) => (props.show ? fadeOut : fadeIn)} 0.4s ease-in;
  transition: visibility 0.4s ease-in;
`;
const Title = styled.div``;
const Arrow = styled.div<{ shown: boolean }>`
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid ${({ theme }) => theme.blue};
  display: ${({ shown }) => (shown ? "block" : "none")};
`;
export default MenuItem;
