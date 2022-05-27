import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {addCart,addWishList} from "../Redux/ActionType"
import "./product.css"
import { getProducts,
    getSingleProduct,
    addCarts,
    addWishLists,
    authenticateLogin} from "../Redux/Action";
    const Token = localStorage.getItem("AuthTok");
const Products = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
      });
      const [passworderror, setPassworderror] = useState("");
      const [load, setLoad] = useState(false);
      const [change, setChange] = useState(0);
      const [changeVariant, setChangeVariant] = useState(0);
      const [quantity, setQuantity] = useState(1);
      const { id } = useParams();
      const [render,setRender] = useState(false)
      const [render1,setRender1] = useState(false)
   
      //userlogin form submit 
      const handleSubmit = (e) => {
        e.preventDefault();
        if (user.password.length > 3) {
          dispatch(authenticateLogin(user)).then((res) => {
            if (res.data.data === "Wrong Email/Password. Try Again!") {
              setPassworderror(res.data.data);
            } else {
              window.location.href = "/Products" ;
            }
          });
        } else {
          setPassworderror("password must be  greater than 3 letters");
        }
      };


      window.$(function() {
        window.$( "#slider-range" ).slider({
          range: true,
          min: 130,
          max: 3500,
          values: [ 1000, 2500 ],
          slide: function( event, ui ) {
          window.$( "#amount" ).val( "₹" + ui.values[ 0 ] + " - ₹" + ui.values[ 1 ] );
          }
        });
        window.$( "#amount" ).val( "₹" + window.$( "#slider-range" ).slider( "values", 0 ) +
          " - ₹" + window.$( "#slider-range" ).slider( "values", 1 ) );
      });


    
      function getVals(){
        // Get slider values
        let parent = this.parentNode;
        let slides = parent.getElementsByTagName("input");
          let slide1 = parseFloat( slides[0].value );
          let slide2 = parseFloat( slides[1].value );
        // Neither slider will clip the other, so make sure we determine which is larger
        if( slide1 > slide2 ){ let tmp = slide2; slide2 = slide1; slide1 = tmp; }
        
        let displayElement = parent.getElementsByClassName("rangeValues")[0];
            displayElement.innerHTML = "$" + slide1 + " - $" + slide2;
      }
      
      window.onload = function(){
        // Initialize Sliders
        let sliderSections = document.getElementsByClassName("range-slider");
            for( let x = 0; x < sliderSections.length; x++ ){
              let sliders = sliderSections[x].getElementsByTagName("input");
              for( let y = 0; y < sliders.length; y++ ){
                if( sliders[y].type ==="range" ){
                  sliders[y].oninput = getVals;
                  // Manually trigger event first time to display values
                  sliders[y].oninput();
                }
              }
            }
      }
      //userLogin handleChange
      const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

    const dispatch = useDispatch();
    
      
    const product = useSelector(({ getProducts }) => getProducts.payload);
 
    const Product = useSelector(
        ({ getSingleProduct }) => getSingleProduct.payload
      );

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
       
          const handleClick = () => {
              
            cartId.variantId = Product[changeVariant].id;
            cartId.units = quantity;
            cartId.variantColor = JSON.parse(Product[changeVariant].variantColor)[change];
            dispatch(addCarts(cartId)).then((res)=>{
              console.log("response",res)
              
            })
    
            
          };

          useEffect(() => {
   
 
        }, [Product]);
    useEffect(() => {
        dispatch(getProducts())
    },[] );

    const SingleProduct = (proId) => {
    
        dispatch(getSingleProduct({productId:proId}))
        // .then(res => setLoad(false));
        console.log("products", Product[0].productName);
      };



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

    console.log("productsss",product,product?.[changeVariant])
    useEffect(() => {
     
    }, [])
  return load ? (
    <div
      style={{
        height: "400px",
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
          <div class="shop-area shop-page-responsive pt-100 pb-100">
            <div class="container">
                <div class="row flex-row-reverse">
                    <div class="col-lg-9">
                        <div class="shop-topbar-wrapper mb-40">
                            <div class="shop-topbar-left">
                                <div class="showing-item">
                                    <span>Showing 1–12 of 60 results</span>
                                </div>
                            </div>
                            <div class="shop-topbar-right">
                                <div class="shop-sorting-area">
                                    <select class="nice-select nice-select-style-1">
                                        <option>Default Sorting</option>
                                        <option>Sort by popularity</option>
                                        <option>Sort by average rating</option>
                                        <option>Sort by latest</option>
                                    </select>
                                </div>
                                <div class="shop-view-mode nav">
                                    <a class="active" href="#shop-1" data-bs-toggle="tab"><i class=" ti-layout-grid3 "></i> </a>
                                    <a href="#shop-2" data-bs-toggle="tab" class=""><i class=" ti-view-list-alt "></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="shop-bottom-area">
                            <div class="tab-content jump">
                                <div id="shop-1" class="tab-pane active">
                                    <div class="row">
                                    {Array.isArray(product) && product.length != 0 ? (
        product
          ?.filter((Y) => Y.discountPrice >= 1)
          .map((data) => (
                                 
                                        <div class="col-lg-3 col-md-4 col-sm-6 col-12">
                                            <div class="product-wrap mb-35" data-aos="fade-up" data-aos-delay="200">
                                                <div class="product-img img-zoom mb-25">
                                                <Link to={"/productDetails/" + data.id }>
                                                        <img src={process.env.REACT_APP_BASE_URL+data.productImage} alt={data.productName}  style={{borderRadius:"10px"}}/>
                                                    </Link>
                                                    {/* <div class="product-badge badge-top badge-right badge-pink">
                                                        <span>-10%</span>
                                                    </div> */}
                                                    <div class="product-action-wrap">
                                                        {/* <button class="product-action-btn-1" title="Wishlist"><i class="pe-7s-like"></i></button> */}
                                                        <button class="product-action-btn-1" title="Quick View"    onClick={() => SingleProduct(data.id)}data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                            <i class="pe-7s-look"></i>
                                                        </button>
                                                    </div>
                                                    <div class="product-action-2-wrap">
                                                    <Link class="product-action-btn-2" to={"/productDetails/"+data.id} ><i class="pe-7s-angle-right-circle"></i> View Product Details</Link>
                                                    </div>
                                                </div>
                                                <div class="product-content">
                                                <h3 style={{ textTransform: "capitalize" }}><a href="product-details.html">{data.productName}</a></h3>
                                                    <div class="product-price">
                                                        {/* <span class="old-price">$25.89 </span> */}
                                                        <span class="new-price">₹{data.discountPrice} </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                          ))
                                          ) : (
                                            <h3 className="container">"No Product Found"</h3>
                                          )}
                                         
                                       
                                       
                                      
                                        
                                      
                                   
                                    </div>
                                    {/* <div class="pagination-style-1" data-aos="fade-up" data-aos-delay="200">
                                        <ul>
                                            <li><a class="active" href="#">1</a></li>
                                            <li><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a class="next" href="#"><i class=" ti-angle-double-right "></i></a></li>
                                        </ul>
                                    </div> */}
                                </div>
                                <div id="shop-2" class="tab-pane">
                                {Array.isArray(product) && product.length != 0 ? (
        product
          ?.filter((Y) => Y.discountPrice >= 1)
          .map((data) => (
                                    <div class="shop-list-wrap mb-30">
                                        <div class="row">
                                            <div class="col-lg-3 col-sm-5">
                                                <div class="product-list-img">
                                                <Link to={"/productDetails/" + data.id }>
                            <img src={process.env.REACT_APP_BASE_URL+data.productImage} alt=""/>
                        </Link>
                                                    {/* <div class="product-list-badge badge-right badge-pink">
                                                        <span>-20%</span>
                                                    </div> */}
                                                    <div class="product-list-quickview">
                                                    <button class="product-action-btn-2" title="Quick View"  onClick={() => SingleProduct(data.id)}data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i class="pe-7s-look"></i>
                            </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-8 col-sm-7">
                                                <div class="shop-list-content">
                                                    <h3><a href="product-details.html"> <h3><a href="product-details.html">{data.productName}</a></h3></a></h3>
                                                    <div class="product-price">
                                                        {/* <span class="old-price">$70.89 </span> */}
                                                        <span class="new-price">₹{data.discountPrice}</span>
                                                    </div>
                                                    <div class="product-list-rating">
                                                        <i class=" ti-star"></i>
                                                        <i class=" ti-star"></i>
                                                        <i class=" ti-star"></i>
                                                        <i class=" ti-star"></i>
                                                        <i class=" ti-star"></i>
                                                    </div>
                                                    <p>{data.productDescription}</p>
                                                    <div class="product-list-action">
                                                    <Link to={"/productDetails/"+data.id} class="product-action-btn-3" title="Product Details" ><i class="pe-7s-angle-right-circle"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                               
                               ))
                               ) : (
                                 <h3 className="container">"No Product Found"</h3>
                               )}
                                
                                    {/* <div class="pagination-style-1">
                                        <ul>
                                            <li><a class="active" href="#">1</a></li>
                                            <li><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a class="next" href="#"><i class=" ti-angle-double-right "></i></a></li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="sidebar-wrapper">
                            <div class="sidebar-widget mb-40" data-aos="fade-up" data-aos-delay="200">
                                <div class="search-wrap-2">
                                    <form class="search-2-form" action="#">
                                        <input placeholder="Search*" type="text"/>
                                        <button class="button-search"><i class=" ti-search "></i></button>
                                    </form>
                                </div>
                            </div>
                            <div class="sidebar-widget sidebar-widget-border mb-40 pb-35" data-aos="fade-up" data-aos-delay="200">
                                <div class="sidebar-widget-title mb-30">
                                    <h3>Filter By Price</h3>
                                </div>
                                <div class="price-filter">
                                    <div id="slider-range"></div>
                                    <div class="price-slider-amount">
                                        <div class="label-input">
                                            <label>Price:</label>
                                            <input type="text" id="amount" name="price" placeholder="Add Your Price" />
                                        </div>
                                        <button type="button">Filter</button>
                                    </div>
                                </div>
                            </div>
                            <div class="sidebar-widget sidebar-widget-border mb-40 pb-35" data-aos="fade-up" data-aos-delay="200">
                                <div class="sidebar-widget-title mb-25">
                                    <h3>Product Categories</h3>
                                </div>
                                <div class="sidebar-list-style">
                                    <ul>
                                        <li><a href="shop.html">Accessories <span>4</span></a></li>
                                        <li><a href="shop.html">Book <span>9</span></a></li>
                                        <li><a href="shop.html">Clothing <span>5</span></a></li>
                                        <li><a href="shop.html">Homelife <span>3</span></a></li>
                                        <li><a href="shop.html">Kids & Baby <span>4</span></a></li>
                                        <li><a href="shop.html">Stationery <span>8</span></a></li>
                                        <li><a href="shop.html">Health & Beauty <span>3</span></a></li>
                                        <li><a href="shop.html">Home Appliances <span>4</span></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="sidebar-widget sidebar-widget-border mb-40 pb-35" data-aos="fade-up" data-aos-delay="200">
                                <div class="sidebar-widget-title mb-25">
                                    <h3>Choose Colour</h3>
                                </div>
                                <div class="sidebar-widget-color sidebar-list-style">
                                    <ul>
                                        <li><a class="black" href="#">Black <span>4</span></a></li>
                                        <li><a class="blue" href="#">Blue <span>9</span></a></li>
                                        <li><a class="brown" href="#">Brown <span>5</span></a></li>
                                        <li><a class="red" href="#">Red <span>3</span></a></li>
                                        <li><a class="orange" href="#">Orange <span>4</span></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="sidebar-widget sidebar-widget-border mb-40 pb-35" data-aos="fade-up" data-aos-delay="200">
                                <div class="sidebar-widget-title mb-25">
                                    <h3>Size</h3>
                                </div>
                                <div class="sidebar-widget-size sidebar-list-style">
                                    <ul>
                                        <li><a href="#">XL <span>4</span></a></li>
                                        <li><a href="#">M <span>9</span></a></li>
                                        <li><a href="#">LM <span>5</span></a></li>
                                        <li><a href="#">L <span>3</span></a></li>
                                        <li><a href="#">ML <span>4</span></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="sidebar-widget" data-aos="fade-up" data-aos-delay="200">
                                <div class="sidebar-widget-title mb-25">
                                    <h3>Tags</h3>
                                </div>
                                <div class="sidebar-widget-tag">
                                    <a href="#">All, </a>
                                    <a href="#">Clothing, </a>
                                    <a href="#"> Kids, </a>
                                    <a href="#">Accessories, </a>
                                    <a href="#">Stationery, </a>
                                    <a href="#">Homelife, </a>
                                    <a href="#">Appliances, </a>
                                    <a href="#">Clothing, </a>
                                    <a href="#">Baby, </a>
                                    <a href="#">Beauty </a>
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
         <div class="modal fade quickview-modal-style" id="loginModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content" style={{width:"70%",marginLeft:"180px"}}>
                    <div class="modal-header">
                        <a href="#" class="close" data-bs-dismiss="modal" aria-label="Close"><i class="fa-solid fa-xmark"></i></a>
                    </div>
                    <div class="modal-body">
                    <div class="row gx-0">
                            <div class="col-lg-5 col-md-5 col-12">
                            <form 
                            // onSubmit={handleSubmit}
                            >
                            <div class="row">
                              <div class="col-lg-12 mt-3 mb-3">
                                <div class="form-group">
                                  <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Email"
                                    name="email"
                                    style={{ borderRadius: "0px",width:"450px",marginLeft:"125px" }}
                                    onChange={handleChange}
                                    value={user.email}
                                    required
                                  />
                                </div>
                              </div>
                              <div class="col-lg-12 mt-3">
                                <div class="form-group">
                                  <input
                                    type="password"
                                    class="form-control"
                                    placeholder="Password"
                                    name="password"
                                    style={{ borderRadius: "0px",width:"450px",marginLeft:"125px" }}
                                    onChange={handleChange}
                                    value={user.password}
                                    required
                                  />
                                  <span
                                    style={{
                                      color: "brown",
                                      marginLeft: "20px",
                                    }}
                                  >
                                    {passworderror}
                                  </span>
                                </div>
                              </div>
                              <div class="col-lg-12 mb-3"  style={{ borderRadius: "0px",width:"850px",marginLeft:"125px" }}>
                                <p class="forgot-password">
                                  <Link to="/register">
                                    Don't you have an account? <b>Register</b>
                                  </Link>
                                </p>
                              </div>
                              <div class="col-lg-12"  style={{ borderRadius: "0px",width:"850px",marginLeft:"113px" }}>
       
                             
                                
                              <div class="single-product-cart btn-hover">
                                    <a  onClick={handleSubmit}  style={{fontSize:"18px",paddingTop:"10px",paddingBottom:"10px",paddingleft:"20px",borderRadius:"5px"}}href="#">Log In</a>
                                </div>
                              </div>
                            </div>
                          </form>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
                </div>
            </div>
            {/* <!-- Mobile Menu start -->  */}
        <div class="off-canvas-active">
          <a class="off-canvas-close">
          <i class="fa-solid fa-xmark"></i>
          </a>
          <div class="off-canvas-wrap">
            {/* <div class="welcome-text off-canvas-margin-padding">
              <p>Default Welcome Msg! </p>
            </div> */}
            <div class="mobile-menu-wrap off-canvas-margin-padding-2">
              <div id="mobile-menu" class="slinky-mobile-menu text-left">
                <ul>
                  <li>
                    <a href="/">HOME</a>
                  </li>
                  <li>
                    <a href="/products">SHOP</a>
                  </li>
                  <li>
                    <a href="/categories">CATEGORIES </a>
                  </li>

                  <li>
                    <a href="/aboutus">ABOUT US</a>
                  </li>
                  <li>
                    <a href="/contactus">CONTACT US</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>
    </>
  )
}

export default Products
