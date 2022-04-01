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
const url = ServerConfiguration.testingServerUrl;
export class GitEpic {
  ///////////////////////////////////////////////////  user account credentials ///////////////////////////////////////////////////

  User_Login = action$ =>
    action$.pipe(filter(action => action.type === GitAction.Login), map(action => {
      return dispatch => {
        try {
          return fetch(url + "VerifyUserLogin?" +
            "StaffUsername=" + action.payload.username +
            "&StaffPassword=" + action.payload.password)
            .then(response => response.json())
            .then(json => {
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



  ///////////////////////////////////////////////////  user account credentials ///////////////////////////////////////////////////





  ///////////////////////////////////////////////////  sidebar configurations ///////////////////////////////////////////////////
  User_ViewPage = action$ =>
    action$.ofType(GitAction.FetchSidebar).switchMap(async ({ payload }) => {
      // console.log(url + 
      //   double_click_and_paste_url_here
      // )
      try {
        const response = await fetch(url +
          "User_ViewPage?" +
          "ROLEGROUPID=" + payload.ROLEGROUPID +
          "&USERID=" + payload.USERID
        );

        let json = await response.json();
        json = JSON.parse(json)
        return {
          type: GitAction.SidebarFetched,
          payload: json,
        };
      }
      catch (error) {
        toast.error("Error Code: FetchSidebar")
        return {
          type: GitAction.SidebarFetched,
          payload: [],
        };
      }
    });

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