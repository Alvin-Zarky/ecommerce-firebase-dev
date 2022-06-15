import React, {useEffect} from 'react';
import NavBar from '../../components/Navbar';
import * as Images from "../../constants/images";
import * as Routes from "../../router";
import {Row, Col} from "reactstrap";
import {Link} from "react-router-dom";
import Slider from 'react-slick';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import {AiOutlineStar} from "react-icons/ai";
import Footer from '../../components/Footer';
import Loading from "../../components/Loading"
import './overview.scss'
import { getProductListAction, getProductSlideAction } from '../../actions/productAction';

export default function Overview() {

  const {products, isLoading} = useSelector(state => state.products)
  const { products: productSlides } = useSelector(state => state.productSlides)
  const dispatch= useDispatch()

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() =>{
    if(!products || products.length===0){
      dispatch(getProductListAction())
    }
    if(!productSlides || productSlides.length===0){
      dispatch(getProductSlideAction())
    }
  }, [dispatch, products, productSlides])

  return (
    <>
      <NavBar />
      <div className="slick-carosoul">
        <Slider {...settings}>
          {productSlides && productSlides.map((val, ind) =>(
            <Link key={ind} to={`${Routes.PRODUCT}/${val.id}`}>
              <div>
                <div className="title-image-slider">
                  <span>{val.name} (${val.price})</span>
                </div>
                <div className='image-slide'>
                  <img src={val.image} alt="iamge-1" />
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
      <div className="list-products">
        <div className="title-product">
          <span>Latest products</span>
        </div>
        <div className="core-products">
          <Row>
            {isLoading && (
              <div className="loading" style={{marginTop:"20px"}}>
                <Loading />
              </div>
            )}
            {!isLoading && products && products.map((val, ind) =>(
              <Col xl="3" lg="3" md="4" key={val.id}>
                <Link to={`${Routes.PRODUCT}/${val.id}`}>
                  <div className="box-product">
                    <div className="image-per-product">
                      <img src={val.image} alt="product_image" />
                    </div>
                    <div className="detail-product">
                      <h5>{val.name.substring(0, 25)}{val.name.length > 25 ? `...` : ``}</h5>
                      <p>
                        <AiOutlineStar /> <AiOutlineStar /> <AiOutlineStar /> <AiOutlineStar /> <AiOutlineStar /> <span>2 Reviews</span>
                      </p>
                      <span>$ {val.price}</span>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}
