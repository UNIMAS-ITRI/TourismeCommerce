import 'rxjs'

import { GitAction } from "../action/gitAction";
import { toast} from "react-toastify";
import axios from "axios";
import { ServerConfiguration } from "../serverConf";
const { filter, map } = require('rxjs/operators');


/**
 * ** IMPORTANT! Never do any file uploads or save data to the local storage here!! This Git EPIC is highly focus on call APIs to communicate to the server 
 * 
 * ** you can set your server url by switch the option as below 
 */
//           options          //
//   1. testing server url    //
//   2. live server url       // 
const url = ServerConfiguration.dataUrl;
export class GitEpic {
  ///////////////////////////////////////////////////  user account credentials ///////////////////////////////////////////////////

  User_Login = action$ =>
    action$.pipe(filter(action => action.type === GitAction.Login), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_Login?" +
            "username=" + action.payload.Username +
            "&password=" + action.payload.Password +
            "&ProjectDomainName=myemporia")
            .then(response => response.json())
            .then(json => {
              console.log("dassdsa", json)
              json = JSON.parse(json)
              return dispatch({ type: GitAction.LoginSuccess, payload: json });
            });
        } catch (error) {
          toast.error("Error Code: VerifyUserLogin")
          return dispatch({ type: GitAction.LoginSuccess, payload: [] });
        }
      }
    }));

  User_Logout = action$ =>
    action$.pipe(filter(action => action.type === GitAction.Logout), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_Logout?" +
            "UserId=" + action.payload.UserId)
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              return dispatch({ type: GitAction.LoggedOutSuccess, payload: json });
            });
        } catch (error) {
          toast.error("Error Code: User_Logout")
          return dispatch({ type: GitAction.LoggedOutSuccess, payload: [] });
        }
      }
    }));

  User_Register = action$ =>
    action$.pipe(filter(action => action.type === GitAction.RegisterUser), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_Register?" +
            "userFirstName=" + action.payload.userFirstName +
            "&userLastName=" + action.payload.userLastName +
            "&username=" + action.payload.username +
            "&userEmail=" + action.payload.userEmail +
            "&password=" + action.payload.password)
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              return dispatch({ type: GitAction.UserRegistered, payload: json });
            });
        } catch (error) {
          toast.error("Error Code: RegisterUser")
          return dispatch({ type: GitAction.UserRegistered, payload: [] });
        }
      }
    }));

  User_ProfileByID = action$ =>
    action$.pipe(filter(action => action.type === GitAction.GetUserProfile), map(action => {
      return dispatch => {
        try {
          return fetch(url + "User_ProfileByID?" +
            "USERID=" + action.payload.USERID)
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              return dispatch({ type: GitAction.GotUserProfile, payload: json });
            });
        } catch (error) {
          toast.error("Error Code: GetUserProfile")
          return dispatch({ type: GitAction.GotUserProfile, payload: [] });
        }
      }
    }));


    // ----------------------------- PRODUCT CART -------------------------------------

  User_AddProductCart = action$ =>
    action$.pipe(filter(action => action.type === GitAction.AddUserCart), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Product_AddProductCart?" +
            "USERID=" + action.payload.userID + 
            "&PRODUCTID=" + action.payload.productID + 
            "&PRODUCTQUANTITY=" + action.payload.quantity + 
            "&PRODUCTVARIATIONDETAILID=" + action.payload.variationDetailID + 
            "&APPLYINGPROMOCODE=" + action.payload.promoCode  )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)
              return dispatch({ type: GitAction.AddedUserCart, payload: json });
            });
        } catch (error) {
          toast.error("Error Code: AddedUserCart")
          return dispatch({ type: GitAction.AddedUserCart, payload: [] });
        }
      }
    }));

    
  User_UpdateProductCart = action$ =>
  action$.pipe(filter(action => action.type === GitAction.UpdateUserCart), map(action => {
    return dispatch => {
      try {
        return fetch(url + "Product_UpdateProductCart?" +
        "USERCARTID=" + action.payload.userCartID + 
        "&PRODUCTQUANTITY=" + action.payload.quantity )
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            return dispatch({ type: GitAction.UpdatedUserCart, payload: json });
          });
      } catch (error) {
        toast.error("Error Code: UpdatedUserCart")
        return dispatch({ type: GitAction.UpdatedUserCart, payload: [] });
      }
    }
  }));

  User_DeleteProductCart = action$ =>
  action$.pipe(filter(action => action.type === GitAction.DeleteUserCart), map(action => {
    return dispatch => {
      try {
        return fetch(url + "Product_DeleteProductCart?" +
        "USERCARTID=" + action.payload.userCartID  )
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            return dispatch({ type: GitAction.DeletedUserCart, payload: json });
          });
      } catch (error) {
        toast.error("Error Code: DeletedUserCart")
        return dispatch({ type: GitAction.DeletedUserCart, payload: [] });
      }
    }
  }));
    
  User_ViewProductCart = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ViewUserCart), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Product_ItemListInCartByUserID?" +
            "USERID=" + action.payload.userID)
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)

              if (json[0].ReturnVal === 1)
                return dispatch({ type: GitAction.ViewedUserCart, payload: JSON.parse(json[0].ReturnData) });
              else
                return dispatch({ type: GitAction.ViewedUserCart, payload: [] });
            });
        } catch (error) {
          toast.error("Error Code: ViewedUserCart")
          return dispatch({ type: GitAction.ViewedUserCart, payload: [] });
        }
      }
    }));


    // User_ViewProductCart = action$ =>
    // action$.pipe(filter(action => action.type === GitAction.ViewUserCart), map(action => {
    //   return dispatch => {
    //     return dispatch({ type: GitAction.ViewedUserCart, payload: localStorage.getItem("cartItemLength") });
    //   }
    // }));

    
    User_ViewProductCartItem = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ViewUserCartItem), map(action => {
      return dispatch => {
        return dispatch({ type: GitAction.ViewedUserCartItem, payload: localStorage.getItem("cartItem") });
      }
    }));

    
    // ----------------------------- PRODUCT LISTING -------------------------------------
    
    User_ViewProductListing = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ViewProductListing), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Product_ItemListByType?" +
            "TYPE=" + action.payload.type + 
            "&TYPEVALUE=" + action.payload.typeValue + 
            "&USERID=" + action.payload.userID +
            "&PRODUCTPERPAGE=" + action.payload.productPage +
            "&PAGE=" + action.payload.page +
            "&PLATFORMTYPE=" + action.payload.platformType +
            "&PROJECTID=2"  )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)

              if (json[0].ReturnVal === 1)
                return dispatch({ type: GitAction.ViewedProductListing, payload: JSON.parse(json[0].ReturnData) });
              else
                return dispatch({ type: GitAction.ViewedProductListing, payload: [] });
            });
        } catch (error) {
          toast.error("Error Code: ViewedProductListing")
          return dispatch({ type: GitAction.ViewedProductListing, payload: [] });
        }
      }
    }));

        
    User_ViewProductDetails = action$ =>
    action$.pipe(filter(action => action.type === GitAction.ViewProductDetail), map(action => {
      return dispatch => {
        try {
          return fetch(url + "Product_ItemDetailByProductID?" +
            "PRODUCTID=" + action.payload.productID + 
            "&USERID=" + action.payload.userID +
            "&PLATFORMTYPE=" + action.payload.platformType +
            "&PROJECTID=2"  )
            .then(response => response.json())
            .then(json => {
              json = JSON.parse(json)

              if (json[0].ReturnVal === 1)
                return dispatch({ type: GitAction.ViewedProductDetail, payload: JSON.parse(json[0].ReturnData) });
              else
                return dispatch({ type: GitAction.ViewedProductDetail, payload: [] });
            });
        } catch (error) {
          toast.error("Error Code: ViewedProductDetail")
          return dispatch({ type: GitAction.ViewedProductDetail, payload: [] });
        }
      }
    }));


  ///////////////////////////////////////////////////  user account credentials ///////////////////////////////////////////////////





  ///////////////////////////////////////////////////  sidebar configurations ///////////////////////////////////////////////////
  User_ViewPage  = action$ =>
  action$.pipe(filter(action => action.type === GitAction.FetchSidebar), map(action => {
    return dispatch => {
      try {
        return fetch(url + "User_ViewPage?" +
        "ROLEGROUPID=" + action.payload.ROLEGROUPID +
        "&USERID=" + action.payload.USERID
          )
          .then(response => response.json())
          .then(json => {
            json = JSON.parse(json)
            return dispatch({ type: GitAction.SidebarFetched, payload: json });
          });
      } catch (error) {
        toast.error("Error Code: SidebarFetch")
        return dispatch({ type: GitAction.SidebarFetched, payload: [] });
      }
    }
  }));
  

  ///////////////////////////////////////////////////  sidebar configurations ///////////////////////////////////////////////////


}
export let gitEpic = new GitEpic();


// "user manual": adding the api call backs here

// by get API
// User_ViewPage = action$ =>
//   action$.ofType(GitAction.FetchSidebar).switchMap(async ({ payload }) => {
//     // console.log(url +
//     //   double_click_and_paste_url_here
//     // )
//     try {
//       const response = await fetch(url +
//         "User_ViewPage?" +
//         "ROLEGROUPID=" + payload.ROLEGROUPID +
//         "&USERID=" + payload.USERID
//       );

//       let json = await response.json();
//       json = JSON.parse(json)
//       return {
//         type: GitAction.SidebarFetched,
//         payload: json,
//       };
//     }
//     catch (error) {
//       toast.error("Error Code: FetchSidebar")
//       return {
//         type: GitAction.SidebarFetched,
//         payload: [],
//       };
//     }
//   });

// by post API
// Inventory_UpdateStockDetailByPost = action$ =>
// action$.ofType(GitAction.UpdateStockDetailByPost).switchMap(async ({ payload }) => {

//   return fetch(
//     url + "Inventory_UpdateStockDetailByPost"
//     , {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         STOCKID: payload.StockID,
//         USERCODE: payload.UserCode,
//         TRACKINGNUMBER: payload.TrackingNumber,
//         PRODUCTWEIGHT: payload.ProductWeight,
//         PRODUCTHEIGHT: payload.ProductDimensionHeight,
//         PRODUCTWIDTH: payload.ProductDimensionWidth,
//         PRODUCTDEEP: payload.ProductDimensionDeep,
//         AREACODE: payload.AreaCode,
//         ITEM: payload.Item,
//         TRACKINGSTATUSID: payload.TRACKINGSTATUSID,
//         CONTAINERNAME: payload.ContainerName,

//         CONTAINERDATE: payload.ContainerDate,
//         REMARK: payload.Remark,
//         EXTRACHARGE: payload.AdditionalCharges
//       })
//     }
//   )
//     .then(response => response.json())
//     .then(json => {
//       if (json !== "fail") {
//         json = json;
//         toast.success("Successfully update stock. Fetching the latest data..", { autoClose: 3000 })
//       } else {
//         json = [];
//       }
//       return {
//         type: GitAction.UpdatedStockDetailByPost,
//         payload: json,
//       };
//     })
//     .catch(error => toast.error("Error code: 8003"));
// });