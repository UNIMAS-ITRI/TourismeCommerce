import { GitAction } from "../action/gitAction";

const INITIAL_STATE = {
  loading: false,
  logonUser: [],
  userProfile: [],
  registrationReturn: [],
  productCart: [],
  productCartAction: [],
  productCartItem: [],
  sidebars: [],

  productList: [],
};

export function counterReducer(state = INITIAL_STATE, action) {
  ///////////////////////////////////////////////////  user account credentials ///////////////////////////////////////////////////
  switch (action.type) {
    case GitAction.Login:
      return Object.assign({}, state, { loading: true });
    case GitAction.LoginSuccess:
      return Object.assign({}, state, {
        loading: false,
        logonUser: action.payload
      });

    case GitAction.Logout:
      return Object.assign({}, state, { loading: true });
    case GitAction.UserLoggedOut:
      return Object.assign({}, state, {
        loading: false,
        logonUser: action.payload
      });


    case GitAction.ResetLoginAction:
      return Object.assign({}, state, { logonUser: [] });

    case GitAction.RegisterUser:
      return Object.assign({}, state, { loading: true });
    case GitAction.UserRegistered:
      return Object.assign({}, state, {
        loading: false,
        registrationReturn: action.payload
      });
    case GitAction.ResetRegistrationReturn:
      return Object.assign({}, state, { registrationReturn: [] });

    case GitAction.GetUserProfile:
      return Object.assign({}, state, { loading: true });
    case GitAction.GotUserProfile:
      return Object.assign({}, state, {
        loading: false,
        userProfile: action.payload
      });
    case GitAction.ResetUserProfile:
      return Object.assign({}, state, { userProfile: [] });

    // case GitAction.AddUserCart:
    //   return Object.assign({}, state, { loading: true });
    // case GitAction.AddedUserCart:
    //   return Object.assign({}, state, {
    //     loading: false,
    //     productCart: action.payload
    //   });

    case GitAction.ViewUserCart:
      return Object.assign({}, state, { loading: true });
    case GitAction.ViewedUserCart:
      return Object.assign({}, state, {
        loading: false,
        productCart: action.payload
      });

    case GitAction.AddUserCart:
      return Object.assign({}, state, { loading: true });
    case GitAction.AddedUserCart:
      return Object.assign({}, state, {
        loading: false,
        productCartAction: action.payload
      });


    case GitAction.UpdateUserCart:
      return Object.assign({}, state, { loading: true });
    case GitAction.UpdatedUserCart:
      return Object.assign({}, state, {
        loading: false,
        productCartAction: action.payload
      });


    case GitAction.DeleteUserCart:
      return Object.assign({}, state, { loading: true });
    case GitAction.DeletedUserCart:
      return Object.assign({}, state, {
        loading: false,
        productCartAction: action.payload
      });

    case GitAction.ViewUserCartItem:
      return Object.assign({}, state, { loading: true });
    case GitAction.ViewedUserCartItem:
      return Object.assign({}, state, {
        loading: false,
        productCartItem: action.payload
      });

      case GitAction.ResetCartAction:
        return Object.assign({}, state, { productCartAction: [] });

    // ----------------------------- PRODUCT LISTING -------------------------------------

    case GitAction.ViewProductListing:
      return Object.assign({}, state, { loading: true });
    case GitAction.ViewedProductListing:
      return Object.assign({}, state, {
        loading: false,
        productList: action.payload
      });

    ///////////////////////////////////////////////////  sidebar configuration ///////////////////////////////////////////////////

    case GitAction.FetchSidebar:
      return Object.assign({}, state, { loading: true });
    case GitAction.SidebarFetched:
      return Object.assign({}, state, {
        loading: false,
        sidebars: action.payload
      });
    case GitAction.ResetSidebar:
      return Object.assign({}, state, { sidebars: [] });

    /////////////////////////////////////////////////// Default ///////////////////////////////////////////////////
    default:
      return state;
  }
}
