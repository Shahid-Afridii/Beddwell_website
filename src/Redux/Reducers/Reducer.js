import {
  authenticate,
  logout,
  register,
  resetPassword,
  verifyPassword,
   categories,
   categoryProducts,
   singleProduct,
   products,
   relatedProducts,
   addCart,
   getCart,
   getCartCount,
   updateCart,
   removeCart,
   getWishList,
   addWishList,
   productSpecification,
   searchProduct,
   hotDeal,
   buyNow,
   banner,
   getProfile,
   updateProfile,
   addAddress,
   deleteAddresss,
   getAddress,
   getOrder,
   getOrderDetail,
   addReview,
   deleteReview,
   myReview,
   getReview,
   checkOut,
   payNow,
   faq
   } 
   from "../ActionType";

const initialState = {};

//User
export const User = (state = initialState, actions) => {
  switch (actions.type) {
    case authenticate.login.success:
      return {
        status: true,
        payload: actions.data,
      };
    case authenticate.login.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};
//Reset Password
export const resetPasswords = (state = initialState, actions) => {
  switch (actions.type) {
    case resetPassword.reset.success:
      return {
        status: true,
        payload: actions.data,
      };
    case resetPassword.reset.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};
//Verify Password
export const verifyPasswords = (state = initialState, actions) => {
  switch (actions.type) {
    case verifyPassword.verify.success:
      return {
        status: true,
        payload: actions.data,
      };
    case verifyPassword.verify.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};


//Register
export const registerUser = (state = initialState, actions) => {
  switch (actions.type) {
    case register.registerUser.success:
      return {
        status: true,
        payload: actions.data,
      };
    case register.registerUser.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

//logout
export const logoutUser = (state = initialState, actions) => {
  switch (actions.type) {
    case logout.logoutUser.success:
      return {
        status: true,
        payload: actions.data,
      };
    case logout.logoutUser.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

//categories
export const getCategories =(state =initialState,actions)=>{

    switch(actions.type){
        case categories.getCategories.success:
            return{
                status:true,
                payload:actions.data,
            };
        case categories.getCategories.error:
            return{
                status:false,
                payload:actions.data,
            };
        default:
            return state;
    }

}

export const getCategoryProducts = (state = initialState, actions) => {
    switch (actions.type) {
      case categoryProducts.getProducts.success:
        return {
          status: true,
          payload: actions.data,
        };
      case categoryProducts.getProducts.error:
        return {
          status: false,
          payload: actions.data,
        };
      default:
        return state;
    }
  };

  export const getSingleProduct = (state = initialState, actions) => {
    switch (actions.type) {
      case singleProduct.getSingleProduct.success:
        return {
          status: true,
          payload: actions.data,
        };
      case singleProduct.getSingleProduct.error:
        return {
          status: false,
          payload: actions.data,
        };
      default:
        return state;
    }
  };

//fetch Products

export const getProducts = (state = initialState, actions) => {
  switch (actions.type) {
    case products.getProducts.success:
      return {
        status: true,
        payload: actions.data,
      };
    case products.getProducts.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

//get Related products

export const getRelatedProducts = (state = initialState, actions) => {
  switch (actions.type) {
    case relatedProducts.rProducts.success:
      return {
        status: true,
        payload: actions.data,
      };
    case relatedProducts.rProducts.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

//Wishlist
export const getWishLists = (state = initialState, actions) => {
  switch (actions.type) {
    case getWishList.getList.success:
      return {
        status: true,
        payload: actions.data,
      };
    case getWishList.getList.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};


export const addWishLists = (state = initialState, actions) => {
  switch (actions.type) {
    case addWishList.wishList.success:
      return {
        status: true,
        payload: actions.data,
      };
    case addWishList.wishList.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

// Cart
export const addCarts = (state = initialState, actions) => {
  switch (actions.type) {
    case addCart.add.success:
      // console.log("response",actions)
      return {
        status: true,
        payload: actions.data,
      };
    case addCart.add.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

export const getCarts = (state = initialState, actions) => {
  switch (actions.type) {
    case getCart.getCarts.success:
      return {
        status: true,
        payload: actions.data,
      };
    case getCart.getCarts.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

export const getCartCounts = (state = initialState, actions) => {
  switch (actions.type) {
    case getCartCount.getCount.success:
      return {
        status: true,
        payload: actions.data,
      };
    case getCartCount.getCount.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

export const updateCarts = (state = initialState, actions) => {
  switch (actions.type) {
    case updateCart.update.success:
      return {
        status: true,
        payload: actions.data,
      };
    case updateCart.update.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

export const removeCarts = (state = initialState, actions) => {
  switch (actions.type) {
    case removeCart.remove.success:
      return {
        status: true,
        payload: actions.data,
      };
    case removeCart.remove.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

//Product Specifications

export const productSpecifications=(state=initialState,actions)=>{
    switch(actions.type){
      case productSpecification.specifications.success:
      return{
        status:true,
        payload:actions.data,

      };
      case productSpecification.specifications.error:
      return{
        status:false,
        payload:actions.data,

      };
      default:
        return state;
    }
}

//search
export const searchs = (state = initialState, actions) => {
  switch (actions.type) {
    case searchProduct.search.success:
      return {
        status: true,
        payload: actions.data,
      };
    case searchProduct.search.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};


//Hot deals
export const hotDeals = (state = initialState, actions) => {
  switch (actions.type) {
    case hotDeal.hot.success:
      return {
        status: true,
        payload: actions.data,
      };
    case hotDeal.hot.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

export const buyNows = (state = initialState, actions) => {
  switch (actions.type) {
    case buyNow.buy.success:
      return {
        status: true,
        payload: state,
      };
    case buyNow.buy.error:
      return {
        status: false,
        payload: typeof actions.data === String,
      };
    default:
      return state;
  }
};

//Banner start
export const getBanner = (state = initialState, actions) => {
  switch (actions.type) {
    case banner.getBanner.success:
      return {
        status: true,
        payload: actions.data,
      };
    case banner.getBanner.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

//Getprofile
export const getProfiles = (state = initialState, actions) => {
  switch (actions.type) {
    case getProfile.get.success:
      return {
        status: true,
        payload: actions.data,
      };
    case getProfile.get.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};
//Getprofile
export const updateProfiles = (state = initialState, actions) => {
  switch (actions.type) {
    case updateProfile.update.success:
      return {
        status: true,
        payload: actions.data,
      };
    case updateProfile.update.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

//addAddres
export const addUserAddress = (state = initialState, actions) => {
  switch (actions.type) {
    case addAddress.add.success:
      return {
        status: true,
        payload: actions.data,
      };
    case addAddress.add.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};
//getAddres
export const deleteUserAddress = (state = initialState, actions) => {
  switch (actions.type) {
    case deleteAddresss.delete.success:
      return {
        status: true,
        payload: actions.data,
      };
    case deleteAddresss.delete.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};
//delAddres
export const getUserAddress = (state = initialState, actions) => {
  switch (actions.type) {
    case getAddress.get.success:
      return {
        status: true,
        payload: actions.data,
      };
    case getAddress.get.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

//orders
export const getOrders = (state = initialState, actions) => {
  switch (actions.type) {
    case getOrder.get.success:
      return {
        status: true,
        payload: actions.data,
      };
    case getOrder.get.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};
//ordersdetails
export const getOrdersDetails = (state = initialState, actions) => {
  switch (actions.type) {
    case getOrderDetail.details.success:
      return {
        status: true,
        payload: actions.data,
      };
    case getOrderDetail.details.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

//addReviews
export const addReviews = (state = initialState, actions) => {
  switch (actions.type) {
    case addReview.add.success:
      return {
        status: true,
        payload: actions.data,
      };
    case addReview.add.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

//myreviews
export const myReviews = (state = initialState, actions) => {
  switch (actions.type) {
    case myReview.review.success:
      return {
        status: true,
        payload: actions.data,
      };
    case myReview.review.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};
//deletereviews
export const deleteReviews = (state = initialState, actions) => {
  switch (actions.type) {
    case deleteReview.delete.success:
      return {
        status: true,
        payload: actions.data,
      };
    case deleteReview.delete.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

//getReviews
export const getReviews = (state = initialState, actions) => {
  switch (actions.type) {
    case getReview.get.success:
      return {
        status: true,
        payload: actions.data,
      };
    case getReview.get.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

//checkout
export const checkouts = (state = initialState, actions) => {
  switch (actions.type) {
    case checkOut.check.success:
      return {
        status: true,
        payload: actions.data,
      };
    case checkOut.check.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};
//PayNows
export const payNows = (state = initialState, actions) => {
  switch (actions.type) {
    case payNow.pay.success:
      return {
        status: true,
        payload: actions.data,
      };
    case payNow.pay.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};

//faqs
export const faqs = (state = initialState, actions) => {
  switch (actions.type) {
    case faq.quest.success:
      return {
        status: true,
        payload: actions.data,
      };
    case faq.quest.error:
      return {
        status: false,
        payload: actions.data,
      };
    default:
      return state;
  }
};