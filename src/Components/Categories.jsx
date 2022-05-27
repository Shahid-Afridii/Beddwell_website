import React,{ useEffect,useState} from 'react'
import { Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getCategories} from "../Redux/Action"
import img from "../images/No.jpg"

const Categories = () => {
    const [load,setLoad]=useState(true);
    const dispatch = useDispatch();
    const category = useSelector(({getCategories}) =>getCategories.payload);
  
    useEffect(() => {
      dispatch(getCategories())
      .then(res => setLoad(false));
    }, []);
  
      let navigate = useNavigate();
  
      const catshop = (id) =>{
          navigate("/categoryShop/"+id)
      }
  return (
    <>
       <div class="banner-area " >
          <div class="container">
            <div class="section-title-tab-wrap mb-40 mt-5">
              <div
                class="section-title-2 "
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h2>Categories</h2>
              </div>
            </div>
            <div class="row">
              {Array.isArray(category) && category?.length !==0 ? category?.map((data)=>(
                <div class="col-lg-2 col-md-6 col-12">
                <div
                  class="banner-wrap mb-30"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <a  onClick={()=>catshop(data?.id)} >
                    <img src={process.env.REACT_APP_BASE_URL+data?.categoryImage}
                   style={{borderRadius:"10px"}}
                    alt={data?.categoryName}
                    onError={ ({ currentTarget }) => {
                      currentTarget.onerror = null; 
                      currentTarget.src=img
                    }}
                     />
                  </a>
                  <div class="product-content">
                        <h3 style={{ textTransform: "capitalize",marginTop:"15px",fontSize:"22px",fontWeight:"500"}}>
                          <a onClick={()=>catshop(data?.id)} >
                            {data.categoryName}
                          </a>
                        </h3>
                      
                      </div>
                </div>
              </div>
              )):<h3 className="container">"No Category Found!"</h3>}
            </div>
          </div>
        </div>
    </>
  )
}

export default Categories
