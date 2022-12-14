import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from 'react-router-dom'

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  z-index: -20;
`;

const Image = styled.img`
  height: 350px;
  min-width: 280px;
  z-index: -1;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const imageURL=`images/${item?.img}` ;
  //{`${imageURL}`}
  // let productLink="/product/" + item;
  console.log(item);
  return (
    <>
      <Container>
      <Link to={`/product/${item._id}`}>  
      <Circle />
      <Image src ={`${imageURL}`}/>
      <Info>
        <Icon>
         
          <ShoppingCartOutlined />
          
        </Icon>
        <Icon>
          
          <SearchOutlined />
          
        </Icon>
        <Icon>
        
          <FavoriteBorderOutlined />
       
        </Icon>
      </Info>
      </Link>
    </Container>
    </>
  );
};

export default Product;



