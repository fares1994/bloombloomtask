import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
interface Props {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
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
  show,
}: Props) => {
  const navigate = useNavigate();
  const navigateToPage = () => {
    const titleSplit = title.split(" ");
    navigate(
      `glasses/${titleSplit[0].toLowerCase()}/${titleSplit[1].toLowerCase()}/${title.replace(
        "-",
        " "
      )}`
    );
  };
  return (
    <Wrapper
      onMouseEnter={() => (onMouseEnter ? onMouseEnter() : null)}
      onMouseLeave={() => (onMouseLeave ? onMouseLeave() : null)}
      onClick={navigateToPage}
      show={show}
      time={order - 0.8}
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
const Wrapper = styled.div<{ show: boolean; time: number }>`
  height: 20px;
  cursor: pointer;
  border-bottom: 0.2px solid ${({ theme }) => theme.secondery};
  padding: 12px 8px;
  display: "flex";
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  animation: ${(props) => (props.show ? fadeOut : fadeIn)}
    ${({ time }) => time}s step-end;
  transition: visibility ${({ time }) => time}s step-end;
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
