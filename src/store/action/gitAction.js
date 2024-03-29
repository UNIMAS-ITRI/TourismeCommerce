export class GitAction {
  ///////////////////////////////////////////////////  user account credentials ///////////////////////////////////////////////////

  static Login = "USER_LOGIN";
  static LoginSuccess = "USER_LOGIN_SUCCESS";
  static CallUserLogin(propsData) {
    console.log(propsData)
    return {
      type: GitAction.Login,
      payload: propsData
    };
  }

  static Logout = "USER_LOGOUT";
  static LoggedOutSuccess = "USER_LOGGED_OUT_SUCCESS";
  static CallUserLogout(propsData) {
    return {
      type: GitAction.Logout,
      payload: propsData
    };
  }

  static RegisterUser = "REGISTER_USER";
  static UserRegistered = "USER_REGISTERED";
  static ResetRegistrationReturn = "RESET-REGISTRATION_RETURN";
  static CallUserRegistration(propsData) {
    return {
      type: GitAction.RegisterUser,
      payload: propsData
    };
  }
  static CallResetUserRegistrationReturn() {
    return {
      type: GitAction.ResetRegistrationReturn,
    };
  }

  static GetUserProfile = "GET_USER_PROFILE";
  static GotUserProfile = "GOT_USER_PROFILE";
  static ResetUserProfile = "RESET-USER_PROFILE";
  static CallUserProfileByID(propsData) {
    return {
      type: GitAction.GetUserProfile,
      payload: propsData
    };
  }  

  static ResetLoginAction = "ResetLoginAction";
  static CallResetLoginAction() {
    console.log("CallResetLoginAction")
    return {
      type: GitAction.ResetLoginAction,
    };
  }

  static CallResetUserProfile() {
    return {
      type: GitAction.ResetUserProfile,
    };
  }

  static AddUserCart = "AddUserCart";
  static AddedUserCart = "AddedUserCart";

  static CallAddProductCart(propsData) {
    return {
      type: GitAction.AddUserCart,
      payload: propsData
    };
  }

  static UpdateUserCart = "UpdateUserCart";
  static UpdatedUserCart = "UpdatedUserCart";

  static CallUpdateProductCart(propsData) {
    return {
      type: GitAction.UpdateUserCart,
      payload: propsData
    };
  }

  
  static ViewUserCart = "ViewUserCart";
  static ViewedUserCart = "ViewedUserCart";

  static CallViewProductCart(propsData) {
    return {
      type: GitAction.ViewUserCart,
      payload: propsData
    };
  }


  static ViewUserCartItem = "ViewUserCartItem";
  static ViewedUserCartItem = "ViewedUserCartItem";

  static CallViewProductCartItem(propsData) {
    return {
      type: GitAction.ViewUserCartItem,
      payload: propsData
    };
  }

  static ResetCartAction = "ResetCartAction";
  static CallResetProductCartAction() {
    return {
      type: GitAction.ResetCartAction,
    };
  }


  
  // static AddUserCart = "AddUserCart";
  // static AddedUserCart = "AddedUserCart";

  // static CallAddProductCartItem(propsData) {
  //   return {
  //     type: GitAction.AddUserCart,
  //     payload: propsData
  //   };
  // }

  
  static DeleteUserCart = "DeleteUserCart";
  static DeletedUserCart = "DeletedUserCart";

  static CallDeleteProductCartItem(propsData) {
    return {
      type: GitAction.DeleteUserCart,
      payload: propsData
    };
  }

    // ----------------------------- PRODUCT LISTING -------------------------------------
  
  static ViewProductListing = "ViewProductListing";
  static ViewedProductListing = "ViewedProductListing";

  static CallViewProductListing(propsData) {
    return {
      type: GitAction.ViewProductListing,
      payload: propsData
    };
  }


  static ViewProductDetail = "ViewProductDetail";
  static ViewedProductDetail = "ViewedProductDetail";

  static CallViewProductDetails(propsData) {
    return {
      type: GitAction.ViewProductDetail,
      payload: propsData
    };
  }


  ///////////////////////////////////////////////////  sidebar configuration  ///////////////////////////////////////////////////
  static FetchSidebar = "FETCH_SIDEBAR";
  static SidebarFetched = "SIDEBAR_FETCHED";
  static ResetSidebar = "RESET-SIDEBAR";
  static CallFetchSidebar(propsData) {
    return {
      type: GitAction.FetchSidebar,
      payload: propsData
    };
  }
  static CallResetSidebar() {
    return {
      type: GitAction.ResetSidebar,
    };
  }

}

