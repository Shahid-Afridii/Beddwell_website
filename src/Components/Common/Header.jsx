import React, {useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import {getCategories,getCartCounts,logoutUser} from "../../Redux/Action"
import "./style.css"


const Header = () => {

    const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const jquery = window.$;
  const Count = useSelector(({ getCartCounts }) => getCartCounts.payload);
  const Token = localStorage.getItem("AuthTok");
  
  const handleClick = (e) => {
    e.preventDefault();
    navigate(`${"/searchProducts/" + search}`);
  };

  const category = useSelector(({getCategories}) =>getCategories.payload);
  const catshop = (id) =>{
    navigate("/categoryShop/"+id)
}

  useEffect(() => {

    console.log("window",window.$)
    if (window.$ && window.$(".currency-wrap").length) {
      var $body2 = window.$("body"),
        $urdanDropdown2 = window.$(".currency-wrap"),
        $urdanDropdownMenu2 = $urdanDropdown2.find(".currency-dropdown");
      $urdanDropdown2.on("click", ".currency-active", function (e) {
        e.preventDefault();
        var $this = window.$(this);
        if (!$this.parent().hasClass("show")) {
          $this
            .siblings(".currency-dropdown")
            .addClass("show")
            .slideDown()
            .parent()
            .addClass("show");
        } else {
          $this
            .siblings(".currency-dropdown")
            .removeClass("show")
            .slideUp()
            .parent()
            .removeClass("show");
        }
      });
      /*Close When Click Outside*/
      $body2.on("click", function (e) {
        var $target = e.target;
        if (
          !window.$($target).is(".currency-wrap") &&
          !window.$($target).parents().is(".currency-wrap") &&
          $urdanDropdown2.hasClass("show")
        ) {
          $urdanDropdown2.removeClass("show");
          $urdanDropdownMenu2.removeClass("show").slideUp();
        }
      });
    }

    if (window.$ && window.$(".language-wrap").length) {
      var $body3 = window.$("body"),
        $urdanDropdown3 = window.$(".language-wrap"),
        $urdanDropdownMenu3 = $urdanDropdown3.find(".language-dropdown");
      $urdanDropdown3.on("click", ".language-active", function (e) {
        e.preventDefault();
        var $this = window.$(this);
        if (!$this.parent().hasClass("show")) {
          $this
            .siblings(".language-dropdown")
            .addClass("show")
            .slideDown()
            .parent()
            .addClass("show");
        } else {
          $this
            .siblings(".language-dropdown")
            .removeClass("show")
            .slideUp()
            .parent()
            .removeClass("show");
        }
      });
      /*Close When Click Outside*/
      $body3.on("click", function (e) {
        var $target = e.target;
        if (
          !window.$($target).is(".language-wrap") &&
          !window.$($target).parents().is(".language-wrap") &&
          $urdanDropdown3.hasClass("show")
        ) {
          $urdanDropdown3.removeClass("show");
          $urdanDropdownMenu3.removeClass("show").slideUp();
        }
      });
    }

    var header = window.$('.sticky-bar');
    var $window = window.$(window);
    $window.on('scroll', function() {
        var scroll = $window.scrollTop();
        if (scroll < 200) {
            header.removeClass('stick');
        } else {
            header.addClass('stick');
        }
    });
    
if(window.$){
    var searchToggle = window.$(".search-toggle");
    searchToggle.on("click", function (e) {

      e.preventDefault();
      if (window.$(this).hasClass("open")) {
        window.$(this).removeClass("open");
        window.$(this).siblings(".search-wrap-1").removeClass("open");
      
        
      } else {
        window.$(this).addClass("open");
        window.$(this).siblings(".search-wrap-1").addClass("open");
      }
    });
  }
    function mobileMainMenu() {
      if(window.$){
        var navbarTrigger = window.$(".mobile-menu-active-button"),
        endTrigger = window.$(".off-canvas-close"),
        container = window.$(".off-canvas-active"),
        wrapper = window.$(".main-wrapper-2");

      wrapper.prepend('<div class="body-overlay-2"></div>');

      navbarTrigger.on("click", function (e) {
        e.preventDefault();
        container.addClass("inside");
        wrapper.addClass("overlay-active-2");
      });

      endTrigger.on("click", function () {
        container.removeClass("inside");
        wrapper.removeClass("overlay-active-2");
      });

      window.$(".body-overlay-2").on("click", function () {
        container.removeClass("inside");
        wrapper.removeClass("overlay-active-2");
      });
      }
     
    }
    mobileMainMenu();
    dispatch(getCartCounts());
  }, [jquery]);

   //logout user
   const logout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("AuthTok");
    
    window.location.href = "/";
  };
  return (
    <>
       <header class="header-area header-responsive-padding header-height-1">
            <div class="header-top d-none d-lg-block bg-gray">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-6 col-6">
                            <div class="welcome-text mt-5">
                                <p style={{textAlign: 'right',fontWeight:"600",fontSize:"14px"}}>Welcome to Beddwell! </p>
                            </div>
                        </div>
                        <div class="col-lg-6 col-6">
                            <div class="language-currency-wrap">
                                {/* <div class="currency-wrap border-style">
                                    <a class="currency-active" href="#">$ Dollar (US) <i class=" ti-angle-down "></i></a>
                                    <div class="currency-dropdown">
                                        <ul>
                                            <li><a href="#">Taka (BDT) </a></li>
                                            <li><a href="#">Riyal (SAR) </a></li>
                                            <li><a href="#">Rupee (INR) </a></li>
                                        </ul>
                                    </div>
                                </div> */}
                                <div class="language-wrap">
                                    <a style={{display:"none"}} class="language-active" href="#"><img src="assets/images/icon-img/flag.png" alt=""/> English <i class=" ti-angle-down "></i></a>
                                    <div class="language-dropdown">
                                        <ul style={{display:"none"}}>
                                            <li><a href="#"><img src="assets/images/icon-img/flag.png" alt=""/>English </a></li>
                                            <li><a href="#"><img src="assets/images/icon-img/spanish.png" alt=""/>Spanish</a></li>
                                            <li><a href="#"><img src="assets/images/icon-img/arabic.png" alt=""/>Arabic </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="header-bottom sticky-bar " >
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-md-6 col-6">
                            <div class="logo">
                            <Link to="/" >
                      <img
                        src="/assets/images/logo/logo1.svg"
                        class="mb-3 imageLogo"
                        alt="logo"
                        style={{ width: "50%" }}
                      />
                  </Link>
                            </div>
                        </div>
                        <div class="col-lg-6 d-none d-lg-block d-flex justify-content-center">
                            <div class="main-menu text-center">
                                <nav>
                                    <ul>
                                        <li> <Link to="/" >
                         <i class='bx bxs-home' style={{padding:"5px"}}></i>
                          HOME
                          </Link>
                                           
                                        </li>
                                        <li><Link to="/products">
                        <i class='bx bxs-cart' style={{padding:"5px"}}></i>
                          SHOP</Link>
                                           
                                        </li>
                                        <li>
                       
                          <Link to="/categories">   <i class='bx bxs-category' style={{padding:"5px"}}></i>CATEGORIES</Link>
                                            <ul class="sub-menu-style">
                          {Array.isArray(category) && category?.length !==0 ? category?.map((data)=>(
                                                <li><a style={{textTransform: "capitalize"}} onClick={()=>catshop(data?.id)}>{data?.categoryName} </a></li>
                                               
                                                )):<h3 className="container">"No Category Found!"</h3>}
                                            </ul>
                                        </li>
                                        <li><Link to="/blog">
                        <i class='bx bxl-blogger' style={{padding:"5px"}}></i>
                          BLOGS</Link>
                                        </li>
                                        <li><Link to="/aboutus">
                        <i class='bx bxs-detail' style={{padding:"5px"}} ></i>
                          ABOUT US</Link></li>
                                        <li><Link to="/contactus">
                        <i class='bx bxs-contact' style={{padding:"5px"}}></i>
                          CONTACT US</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-6">
                            <div class="header-action-wrap">
                                <div class="header-action-style header-search-1">
                                    <a class="search-toggle" href="#">
                                        <i class="pe-7s-search s-open"></i>
                                        <i class="pe-7s-close s-close"></i>
                                    </a>
                                    <div class="search-wrap-1" style={{width:"198px"}}>
                        <form onSubmit={handleClick}>
                          <input
                          
                           placeholder="Search products…" 
                           type="text"
                          //  class="form-control"
                           onChange={(e) => setSearch(e.target.value)}
                            />
                          <button class="button-search">
                            <i class="pe-7s-search"></i>
                          </button>
                        </form>
                      </div>
                                </div>
                                <div class="header-action-style">
                      {Token?
                       <Link to="/profile" title="Profile">
                       <i class="pe-7s-user"></i>
                   </Link>:
                    <Link to="/authenticate" title="Login">
                    <i class="pe-7s-user"></i>
                </Link>
                      }
                   
                     
                    </div>
                    <div class="header-action-style">
                    <Link to="/wishList" title="wishList">
                        <i class="pe-7s-like"></i>
                        </Link>
                    </div>
                    <div class="header-action-style header-action-cart">
                    <Link to="/cart" title="Cart">
                        <i class="pe-7s-shopbag"></i>
                        {Count?.count > 0 ? <span class="product-count bg-black">{Count.count}</span>:false}
                        {/* <span class="product-count bg-black">01</span> */}
                        </Link>
                    </div>
                    <div class="header-action-style">
                      {Token?
                       <a  onClick={logout} title="Log Out">
                     <span class="iconify" data-icon="simple-line-icons:logout" style={{fontSize:"19px",marginTop:"2px",marginLeft:"10px"}}></span>
                   </a>:
                   false
                      }
                   
                     
                    </div>
                                <div class="header-action-style d-block d-lg-none">
                                    <a class="mobile-menu-active-button" href="#"><i class="pe-7s-menu"></i></a>
                                </div>
                                <div class="off-canvas-active">
          <a class="off-canvas-close">
            <i class=" ti-close "></i>
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
                  <li>
                  {Token?<a onClick={logout}>Logout</a>:false}
                    
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </>
  )
}

export default Header
