import React from 'react';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import routes from './data/RouterConfiguration';
import PanelHeader from './PanelHeader';
import PanelFooter from './PanelFooter';
import Dashboard from '../../pages/Dashboard/Dashboard';
const Main = ({
  collapsed,
  rtl,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
}) => {
  return (
    <>
      {/* <PanelHeader /> */}
      <main>
        <div><PanelHeader /></div>
        {/* <div><Dashboard /></div> */}

        {/* <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <MenuOutlinedIcon />
        </div> */}
        {/* <PanelHeader /> */}
        <div className="block ">
          <Switch>
            {
              routes.map((route, index) => {
                return (
                  <Route key={index} path={route.path} exact={route.exact}>
                    {route.element}
                  </Route>
                )
              })
            }
          </Switch>
        </div>

        <div><PanelFooter /></div>
      </main>
    </>

  );
};

export default Main;