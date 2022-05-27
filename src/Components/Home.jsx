import React, { useEffect,useState } from "react";

import { Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {addCart,addWishList} from "../Redux/ActionType"
import { hotDeals,getCategories,getSingleProduct,addCarts,addWishLists,getBanner } from "../Redux/Action"
import img from "../images/No.jpg"
import "./style.css"
import theme from "../images/theme.svg"
const Home = () => {


    const [load, setLoad] = useState(true);
 
    const [render, setRender] = useState(false);
    const dispatch = useDispatch();
    const Token = localStorage.getItem("AuthTok");
    const [change, setChange] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [changeVariant, setChangeVariant] = useState(0);
    const banner = useSelector(({ getBanner }) => getBanner.payload);
    const category = useSelector(({getCategories}) =>getCategories.payload);
    const deal = useSelector(({ hotDeals }) => hotDeals.payload);
    const Product = useSelector(
      ({ getSingleProduct }) => getSingleProduct.payload
    );
  
    const SingleProduct = (proId) => {
      
      dispatch(getSingleProduct({productId:proId}))
      // .then(res => setLoad(false));
      console.log("products", Product[0].productName);
    };
    //add to cart
  const carts = useSelector(
  ({ addCarts }) => addCarts.payload
  );
  const wish = useSelector(
    ({ addWishLists }) => addWishLists.payload
    );
  const [cartId, getCartId] = useState({
      variantColor: "",
      variantId: "",
      units: 0,
    });
    const [render1,setRender1] = useState(false)
    const handleClick = () => {
        
      cartId.variantId = Product[changeVariant].id;
      cartId.units = quantity;
      cartId.variantColor = JSON.parse(Product[changeVariant].variantColor)[change];
      dispatch(addCarts(cartId)).then((res)=>{
        console.log("response",res)
        
      })
  
      
    };
    
     
   
  const jquery=window.$
   
  
  
  const slider= ()=>{
    if(jquery)
    var sliderActive = new window.Swiper(".slider-active", {
      loop: true,
      speed: 750,
      effect: "fade",
      slidesPerView: 6,
      navigation: {
        nextEl: ".home-slider-next",
        prevEl: ".home-slider-prev" 
      },
    });
  }
  
  
  
    useEffect(() => {
     
  
      Promise.allSettled([
        dispatch(getBanner()),
        dispatch(hotDeals()), 
        dispatch(getCategories()),
      ])
      .then((res)=>{
        setTimeout(slider,1000)
        setLoad(false);
      })
        .catch(() => {
          console.log("Waiting For Network");
        });
    }, []);
  
    useEffect(() => {
      localStorage.removeItem("Error");
    }, []);
  
    
    let navigate = useNavigate();
    const catshop = (id) =>{
      navigate("/categoryShop/"+id)
  }
  
  useEffect(() => {
    window.setTimeout(function() {
        dispatch({type:addCart.add.success})
        window.$(".alert").fadeTo(500, 0).slideUp(500, function(){
            window.$(this).remove(); 
        });
    }, 4000);
    
    window.setTimeout(function() {
        dispatch({type:addWishList.wishList.success})
        window.$(".alert1").fadeTo(500, 0).slideUp(500, function(){
            window.$(this).remove(); 
        });
    }, 4000);
    
    
  }, [carts,wish]);
  
  
  
  
  
  useEffect(() => {
  
    if(document.cookie !== 'true') {
      document.cookie = true;
      setTimeout(() => window.$(document).ready(function(){
    
        window.$("#test").modal('show');
      }),1000)
      }
    
  }, [])
  

  return load ? (
    <div
      style={{
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
  >
 
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <>
     <div class="main-wrapper main-wrapper-2">


     <div class="modal fade quickview-modal-style" id="test" aria-labelledby="test"  tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" style={{width:"50%",marginLeft:"250px "}}>
                    <div class="modal-header">
                        <a href="#" class="close" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark"></i></a>
                    </div>
                    <div class="modal-body">
                        <div class="row gx-0">
                            <div class="col-lg-12 col-md-5 col-12">
                                <div class="modal-img-wrap">
                                    <img src="assets/images/product/quickview.png" alt=""/>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>

      <div class="sidebar-cart-active">
            <div class="sidebar-cart-all">
                <a class="cart-close" href="#"><i class="pe-7s-close"></i></a>
                <div class="cart-content">
                    <h3>Shopping Cart</h3>
                    <ul>
                        <li>
                            <div class="cart-img">
                                <a href="#"><img src="assets/images/cart/cart-1.jpg" alt=""/></a>
                            </div>
                            <div class="cart-title">
                                <h4><a href="#">Stylish Swing Chair</a></h4>
                                <span> 1 × $49.00	</span>
                            </div>
                            <div class="cart-delete">
                                <a href="#">×</a>
                            </div>
                        </li>
                        <li>
                            <div class="cart-img">
                                <a href="#"><img src="assets/images/cart/cart-2.jpg" alt=""/></a>
                            </div>
                            <div class="cart-title">
                                <h4><a href="#">Modern Chairs</a></h4>
                                <span> 1 × $49.00	</span>
                            </div>
                            <div class="cart-delete">
                                <a href="#">×</a>
                            </div>
                        </li>
                    </ul>
                    <div class="cart-total">
                        <h4>Subtotal: <span>$170.00</span></h4>
                    </div>
                    <div class="cart-btn btn-hover">
                        <a class="theme-color" href="cart.html">view cart</a>
                    </div>
                    <div class="checkout-btn btn-hover">
                        <a class="theme-color" href="checkout.html">checkout</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="slider-area">
       
       <div class="slider-active swiper-container">
         <div class="swiper-wrapper">
         {Array.isArray(banner) && banner.length !== 0 ? (
         banner?.map((Banner) => (
           
           <div class="swiper-slide">
             <div
               class="intro-section slider-height-1 slider-content-center bg-img single-animation-wrap slider-bg-color-1"
               style={{
                 backgroundImage:`url(${process.env.REACT_APP_BASE_URL+ Banner.bannerImage})`,
               }}
             >
               <div class="container">
                 <div class="row align-items-center">
                   <div class="col-lg-6 col-md-6">
                     <div class="slider-content-1 slider-animated-1">
                       <h3 class="animated" style={{color:"white"}}>new arrival</h3>
                       <h1 class="animated" style={{background:"rgb(242 242 242 / 60%)",paddingLeft:"20px"}}>
                         Summer <br />
                         Collection
                       </h1>
                       <div class="slider-btn btn-hover">
                         <a href="product-details.html" class="btn animated">
                           Shop Now <i class=" ti-arrow-right "></i>
                         </a>
                       </div>
                     </div>
                   </div>
                   <div class="col-lg-6 col-md-6">
                     <div class="hero-slider-img-1 slider-animated-1">
                       <img
                         class="animated animated-slider-img-1"
                         // src="assets/images/slider/slider-img-1.png"
                         alt=""
                       />
                       <div class="product-offer animated">
                         <h5>
                           30% <span>Off</span>
                         </h5>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>

))
) : (
<div class="spinner-border" role="status">
 <span class="sr-only"> Loading...</span>
</div>
)} 

<div class="carousel-indicators home-slider-prev main-slider-nav" style={{marginLeft:"-100px"}}>
 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" class="active"aria-label="Slide 2"></button>
 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
           {/* <div class="home-slider-prev main-slider-nav">
             <i class="fa fa-angle-left" style={{color:"white"}}></i>
           </div>
           <div class="home-slider-next main-slider-nav">
             <i class="fa fa-angle-right" style={{color:"white",marginLeft:"5px"}}></i>
           </div> */}
         </div>
       </div>
     </div>
     <div class="banner-area pt-100 pb-70">
          <div class="container">
            <div class="section-title-tab-wrap mb-40">
              <div
                class="section-title-2"
                data-aos="fade-up"
                data-aos-delay="200">
                <h2>Categories</h2>
              </div>
            </div>

            <div class="team-area pt-50 pb-30">
            <div class="container">
                
                <div class="row">
                {Array.isArray(category) && category?.length !==0 ? category?.map((data)=>(
                    <div class="col-lg-2 col-md-4 col-sm-4 col-12">
                        <div class="single-team-wrap text-center mb-30" data-aos="fade-up" data-aos-delay="200">
                        <a  onClick={()=>catshop(data?.id)}>
                            <img src={process.env.REACT_APP_BASE_URL+data?.categoryImage} alt={data?.categoryName}
                            onError={ ({ currentTarget }) => {
                              currentTarget.onerror = null; 
                              currentTarget.src=img
                            }}
                            />
                            </a>
                            <div class="team-info-position">
                                <div class="team-info">
                                    <h5>
                                      
                                    <a style={{textTransform: "capitalize"}} onClick={()=>catshop(data?.id)}>
                            {data.categoryName}
                          </a>
                                      </h5>
                                    {/* <span>Sales Man</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                     )):<h3 className="container">"No Category Found!"</h3>}
                </div>
            </div>
        </div>




          
          </div>
        </div>
       
       
        <div class="service-area pb-70">
          <div class="container">
            <div class="row">
              <div class="col-lg-3 col-md-6 col-sm-6 col-12 mb-30">
                <div
                  class="service-wrap"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div class="service-img">
                    <img src="assets/images/icon-img/car.png" alt="" />
                  </div>
                  <div class="service-content">
                    <h3>Free Shipping</h3>
                    <p>Free shipping on all order</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6 col-12 mb-30">
                <div
                  class="service-wrap"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div class="service-img">
                    <img src="assets/images/icon-img/time.png" alt="" />
                  </div>
                  <div class="service-content">
                    <h3>Support 24/7</h3>
                    <p>Support 24 hours a day</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6 col-12 mb-30">
                <div
                  class="service-wrap"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <div class="service-img">
                    <img src="assets/images/icon-img/dollar.png" alt="" />
                  </div>
                  <div class="service-content">
                    <h3>Money Return</h3>
                    <p>Back Guarantee Under </p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      
       
        <div class="product-area pb-60">
          <div class="container">
            <div class="section-title-tab-wrap mb-75">
              <div
                class="section-title-2"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                  {Array.isArray(deal) && Array.length !== 0 ? (
                <h2>Hot Deals</h2>
                ) : (
                  false
                )}
              </div>
              {/* <div
                class="tab-style-1 nav"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <a class="active" href="#pro-1" data-bs-toggle="tab">
                  New Arrivals{" "}
                </a>
                <a href="#pro-2" data-bs-toggle="tab" class="">
                  {" "}
                  Best Sellers{" "}
                </a>
                <a href="#pro-3" data-bs-toggle="tab" class="">
                  {" "}
                  Sale Items{" "}
                </a>
              </div> */}
            </div>
            <div class="tab-content jump">
              <div id="pro-1" class="tab-pane active">
                <div class="row">
                {Array.isArray(deal) && Array.length !== 0
              ? deal
                  .filter((data) => data.discountPrice >= 1)
                  .map((data) => (
                  <div class="col-lg-2 col-md-4 col-sm-6 col-12">
                    <div
                      class="product-wrap mb-35"
                      data-aos="fade-up"
                      data-aos-delay="200"
                    >
                      <div class="product-img img-zoom mb-25">
                        <Link to={"/productDetails/"+data.id}>
                          <img
                           style={{borderRadius:"10px"}}
                            src={process.env.REACT_APP_BASE_URL+data.productImage}
                            alt={data.productName}
                          />
                        </Link>
                        <div class="ribbon ribbon-top-right"><span>10%</span></div>
                        <div class="product-action-wrap">
                          {/* <button 
                          class="product-action-btn-1"
                           title="Wishlist"
                           onClick={() => {
                            setLoad(true);
                            dispatch(
                                addWishLists({ productId: data?.id })
                            ).then((res) => {
                              setLoad(false);
                            });
                          }}
                          
                          >
                            <i class="pe-7s-like"></i>
                          </button> */}
                          <button
                            class="product-action-btn-1"
                            title="Quick View"
                            onClick={() => SingleProduct(data.id)}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <i class="pe-7s-look"></i>
                          </button>
                        </div>
                        <div class="product-action-2-wrap">
                          <Link
                          to={"/productDetails/"+data.id}
                            class="product-action-btn-2"
                            title="Add To Cart"
                          >
                           <i class="pe-7s-angle-right-circle"></i> View Product Details
                          </Link>
                        </div>
                      </div>
                      <div class="product-content">
                        <h3 style={{ textTransform: "capitalize"}}>
                          <a href="product-details.html">
                            {data.productName}
                          </a>
                        </h3>
                        <div class="product-price">
                          {/* <span class="old-price">₹25000 </span> */}
                          <span class="new-price">₹ {data.discountPrice} </span>
                        </div>
                      </div>
                    </div>
                  </div>
    ))
    : false}
                </div>
              </div>
            
            </div>
          </div>
        </div>
        
        {/* <!-- Product Modal start --> */}
        <div class="modal fade quickview-modal-style" id="exampleModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <a href="#" class="close" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark"></i></a>
                    </div>
                    <div class="modal-body">
                    <div class="product-details-area pb-80 pt-60 " style={{marginLeft:"-15px"}}>
            <div class="container">
                    {Array.isArray(Product) && Product.length > 0 ? (
                <div class="row">
                    <div class="col-lg-6">
                        <div class="product-details-img-wrap" data-aos="fade-up" data-aos-delay="200">
                            <div class="swiper-container product-details-big-img-slider-2 pd-big-img-style">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <div class="easyzoom-style">
                                            <div class="easyzoom easyzoom--overlay">
                                                <a href={
                      JSON.parse(Product[changeVariant]?.variantImage)[change]
                    }>
                                                    <img src={process.env.REACT_APP_BASE_URL+
                      JSON.parse(Product[changeVariant]?.variantImage)[change]
                    } alt=""/>
                                                </a>
                                            </div>
                                            <a target="_blank" class="easyzoom-pop-up img-popup" href={
                      JSON.parse(Product[changeVariant]?.variantImage)[change]
                    }>
                                                <i class="pe-7s-search"></i>
                                            </a>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="product-details-content" data-aos="fade-up" data-aos-delay="400">
                        
                            <h2 style={{textTransform: "capitalize" }}>
                                 {Product[changeVariant].productName}
                                 <span style={{textTransform:"capitalize"}}>
                                     ({Product[changeVariant].variantName}) 
                                </span>
                            </h2>
                        

                            <div className="mt-3 mb-3">
                    {Array.isArray(Product)
                      ? Product?.map((data, index) => (
                          <button
                            onClick={() => setChangeVariant(index)}
                            className="btn btn-light "
                            style={Product[changeVariant]?.variantName===data?.variantName?{border:"1px solid #e97730",background:"#e97730",color:"white"}:{ marginRight: "10px",textTransform:"capitalize", borderRadius:"0px" }}
                          >
                            {data?.variantName}
                          </button>
                        ))
                      : false}
                  </div>

                            <div class="product-details-price">
                                <span class="old-price">₹
                                {JSON.parse(Product[changeVariant].actualPrice)[change]} 
                                </span>
                                <span class="new-price">₹ 
                                {JSON.parse(Product[changeVariant].discountPrice)[change]}
                                </span>
                            </div>
                            {/* <div class="product-details-review">
                                <div class="product-rating">
                                    <i class=" ti-star"></i>
                                    <i class=" ti-star"></i>
                                    <i class=" ti-star"></i>
                                    <i class=" ti-star"></i>
                                    <i class=" ti-star"></i>
                                </div>
                                <span>( 1 Customer Review )</span>
                            </div> */}
                            <div class="product-color product-color-active product-details-color">
                                <span>Color :</span>
                                {JSON.parse(Product[changeVariant].variantColor).map(
                        (data, i) => (
                          <a
                            style={{ width: "40px" }}
                            className="imageborder active"
                          >
                            <span
                              style={{
                                width: "30px",
                                height: "30px",
                                background: data,
                                border: "1px solid black",
                                borderRadius: "50%",
                              }}
                              onClick={() => setChange(i)}
                            ></span>
                          </a>
                        )
                      )}
                            </div>
                            <div>
                    {carts? (
                      <div
                      style={{marginTop:"-20px"}}
                        class="alert alert-warning alert-dismissible fade show"
                        role="alert"
                        mt-3
                      >
                        {carts}
                        <button
                       
                          type="button"
                          class="btn-close"
                          data-dismiss="alert"
                          aria-label="Close"
                          // onClick={()=>dispatch({type:addCart.add.success,data:false})}
                          
                        ></button>
                      </div>
                    ) :(false)}
                  </div>
                  <div>
                    {wish? (
                      <div
    
                        class="alert alert-warning alert-dismissible fade show"
                        role="alert"
                        mt-3
                      >
                        {wish}
                        <button
                       
                          type="button"
                          class="btn-close"
                          data-dismiss="alert"
                          // onClick={()=>dispatch({type:addWishList.wishList.success,data:false})}
                          aria-label="Close"
                        ></button>
                      </div>
                    ) :(false)}
                  </div>
                            <div class="product-details-action-wrap">
                             
                            <div class="product-quality" style={{textAlign:"center"}}>
                                            <span style={{display:"flex", padding:"5px 10px",marginTop:"8px",marginBottom:"5px"}}>
                                            {/* <div  style={{display:"flex"}}> */}
                                      <span
                                    class="minus-btn"
                                    onClick={() => {
                                        return quantity > 1
                                          ? setQuantity(quantity - 1)
                                          : false;
                                      }}
                                  >
                                    <i class="bx bx-minus"></i>
                                  </span>
                                  <input
                                    type="text"
                                    min="1"
                                          style={{outline:"none",border:"none",width:"20px",marginLeft:"8px",marginTop:"-5px"}}
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                  />
                                  {/* <input type="text" min="1" value={quantity[i]} onChange={(e)=>setQuantity(e.target.value)} /> */}
                                  <span
                                    class="plus-btn"
                                    onClick={() => {
                                        setQuantity(quantity + 1);
                                      }}
                                  >
                                    <i class="bx bx-plus"></i>
                                  </span>
                                  </span>
                                  {/* </div> */}
                                      </div>
                                <div class="single-product-cart btn-hover">
                                {Token ? <a style={{fontSize:"18px",paddingTop:"10px",paddingBottom:"10px",paddingleft:"20px",color:"white"}}onClick={handleClick}>Add to Cart</a>:
                                <a style={{fontSize:"18px",paddingTop:"10px",paddingBottom:"10px",paddingleft:"20px"}} href="/authenticate">Add to Cart</a>
                                    }
                                </div>
                                <div>
                                    <a title="Wishlist"  onClick={() => {
                            
                            dispatch(
                                addWishLists({ productId: Product[changeVariant]?.id })
                            ).then((res) => {
                            
                            });
                          }}>
                             {Product[changeVariant]?.favourites === 0 ? <i class='bx bx-heart' style={{fontSize:"26px"}}></i>:<i style={{fontSize:"26px"}} class='bx bxs-heart' ></i>}
                            </a>
                                </div>
                               
                            </div>
                              <div> 
                            {/* <div class="single-product-cart btn-hover mt-5">
                                    <a  style={{fontSize:"18px",paddingTop:"10px",paddingBottom:"10px",paddingleft:"20px",}}href="#">Add to Cart</a>
                                </div> */}
                                </div>
                            
                        </div>
                    </div>
                   
            </div>
              ) : (
                false
              )}
        </div>
        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Product Modal end --> */}
        </div>
    </>
  )
}

export default Home
