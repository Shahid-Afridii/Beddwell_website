import React,{Suspense, lazy} from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categories from '../Components/Categories';
import Footer from '../Components/Common/Footer';
import Header from '../Components/Common/Header';
import Home from '../Components/Home';
import Products from '../Components/Products';
import Blog from "../Components/blogs/Blog"
import BlogDetails from "../Components/blogs/BlogDetails"
import ContactUs from '../Components/ContactUs';
import AboutUs from '../Components/AboutUs';

const MainRoutes = () => {
  return (
    <>
        



        <Router>
        <Suspense
          fallback={
            <div className="flone-preloader-wrapper">
              <div className="flone-preloader">
                <span></span>
                <span></span>
              </div>
            </div>
          }
        >
          <Header />
          <Routes>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path={"/products"} element={<Products />} />
            <Route exact path={"/categories"} element={<Categories />} />
            <Route exact path={"/blog"} element={<Blog />} />
            <Route exact path={"/blogDetails"} element={<BlogDetails />} />
            <Route exact path={"/contactus"} element={<ContactUs />} />
            <Route exact path={"/aboutus"} element={<AboutUs />} />
          </Routes>
          <Footer />
        </Suspense>
      </Router>

    </>
  )
}

export default MainRoutes
