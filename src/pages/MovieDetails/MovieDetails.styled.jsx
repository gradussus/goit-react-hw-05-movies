import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Poster = styled.img`
  width: 450px;
  margin: 20px;
`;
export const Title = styled.h1``;

export const Card = styled.div`
  display: flex;
`;

export const MovieCardLeft = styled.div`
  display: flex;
`;
export const MovieCardRight = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Genre = styled.li`
  display: inline;
`;
export const Back = styled(Link)`
  padding: 5px;
  border: 1px tomato solid;
  border-radius: 10px;
  text-decoration: none;
  font-size: 64px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  height: 300px;
  margin-top: 20px;
`;
