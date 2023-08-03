// "user manual" : add your page in this configuration
/**
 *  sample:
 * 
    import Dashboard from "../../../pages/Dashboard/Dashboard";
 * 
 * const routes = [
    {
        path: "/",
        exact: true,
        element: <Dashboard />,
    },
    // if need to pass the params into the page, then follow the configuration below
    {
        path: "/UserDetail/:name/:fat",
        exact: true,
        element: <UserDetail />,
    },
]

 */
import Dashboard from "../../../pages/Dashboard/Dashboard";
import PlaceDetail from "../../../pages/Place/PlaceDetails";
import HotelDetail from "../../../pages/Hotel/HotelDetails";
import HotelSearch from "../../../pages/Hotel/HotelSearch";
import UserManagement from '../../../pages/UserManagement/UserManagement';
import OverallStock from "../../../pages/Stock/OverallStock/OverallStock";
import StockGoods from "../../../pages/Stock/StockGoods/StockGoods";
import CreditNote from '../../../pages/Reporting/CreditNote/CreditNote';
import DeliveryOrder from "../../../pages/Reporting/DeliveryOrder/DeliveryOrder";
import Invoice from "../../../pages/Reporting/Invoice/Invoice";
import DataManagement from "../../../pages/DataManagement/DataManagement";
import AllPayments from "../../../pages/Payments/AllPayments/AllPayments";
import BalanceSettlement from "../../../pages/Payments/BalanceSettlement/BalanceSettlement";
import Statements from "../../../pages/Statements/Statements";
import UserDetail from "../../../pages/UserManagement/UserDetail"
import AddUser from "../../../pages/UserManagement/AddUser";
import ShoppingCart from "../../../pages/Payments/ShoppingCart/ShoppingCart";
import LocalFoodCategories from "../../../pages/LocalFood/LocalFoodCategories";
import LocalFoodDetail from "../../../pages/LocalFood/LocalFoodDetail";
import TicketingFilter from "../../../pages/Ticketing/TicketingFilter";
import ProductsFilter from "../../../pages/Products/ProductsFilter";
import ProductsDetail from "../../../pages/Products/ProductsDetail";
import TransportationFilter from "../../../pages/Transportation/TransportationFilter";
import TourPackagesFilter from "../../../pages/TourPackages/TourPackagesFilter";
// import UserManagement from '../../../pages/UserManagement/UserManagement';
// import OverallStock from "../../../pages/Stock/OverallStock/OverallStock";
// import StockGoods from "../../../pages/Stock/StockGoods/StockGoods";
// import CreditNote from '../../../pages/Reporting/CreditNote/CreditNote';
// import DeliveryOrder from "../../../pages/Reporting/DeliveryOrder/DeliveryOrder";
// import Invoice from "../../../pages/Reporting/Invoice/Invoice";
// import DataManagement from "../../../pages/DataManagement/DataManagement";
// import AllPayments from "../../../pages/Payments/AllPayments/AllPayments";
// import BalanceSettlement from "../../../pages/Payments/BalanceSettlement/BalanceSettlement";
// import Statements from "../../../pages/Statements/Statements";
// import UserDetail from "../../../pages/UserManagement/UserDetail"
// import AddUser from "../../../pages/UserManagement/AddUser";
import PlaceDetailsForTour from "../../../pages/Place/PlaceDetailsForTour";

const routes = [
    {
        path: "/",
        exact: true,
        element: <Dashboard />,
    },
    {
        path: "/PlaceDetail",
        exact: true,
        element: <PlaceDetail />,
    },
    {
        path: "/HotelDetail",
        exact: true,
        element: <HotelDetail />,
    },
    {
        path: "/HotelSearch",
        exact: true,
        element: <HotelSearch />,
    },
    
    {
        path: "/ShoppingCart",
        exact: true,
        element: <ShoppingCart />,
    },
    {
        path: "/FoodCategory",
        exact: true,
        element: <LocalFoodCategories />
    },
    {
        path: "/FoodDetail/:id",
        exact: true,
        element: <LocalFoodDetail />,
    },
    {
        path: "/PlaceDetailsForTour",
        exact: true,
        element: <PlaceDetailsForTour />,
    },
    {
        path: "/Ticket",
        exact: true,
        element: <TicketingFilter />,
    },
    {
        path: "/Products",
        exact: true,
        element: <ProductsFilter />,
    },
    {
        path: "/ProductsDetail/:id",
        exact: true,
        element: <ProductsDetail />,
    },
    {
        path: "/Transportation",
        exact: true,
        element: <TransportationFilter />,
    },
    {
        path: "/TourPackages",
        exact: true,
        element: <TourPackagesFilter />,
    },
    // {
    //     path: "/UserManagement",
    //     exact: true,
    //     element: <UserManagement />,
    // },
    // {
    //     path: "/OverallStock",
    //     exact: true,
    //     element: <OverallStock />,
    // },
    // {
    //     path: "/StockGoods",
    //     exact: true,
    //     element: <StockGoods />,
    // },
    // {
    //     path: "/Invoice",
    //     exact: true,
    //     element: <Invoice />,
    // },
    // {
    //     path: "/DeliveryOrder",
    //     exact: true,
    //     element: <DeliveryOrder />,
    // },
    // {
    //     path: "/CreditNote",
    //     exact: true,
    //     element: <CreditNote />,
    // },
    // {
    //     path: "/ImportExcelData",
    //     exact: true,
    //     element: <DataManagement />,
    // },
    // {
    //     path: "/AllPayments",
    //     exact: true,
    //     element: <AllPayments />,
    // },
    // {
    //     path: "/BalanceSettlement",
    //     exact: true,
    //     element: <BalanceSettlement />,
    // },
    // {
    //     path: "/Statements",
    //     exact: true,
    //     element: <Statements />,
    // },
    // {
    //     path: "/UserDetail/:name/:fat",
    //     exact: true,
    //     element: <UserDetail />,
    // },
    // {
    //     path: "/AddUser",
    //     exact: true,
    //     element: <AddUser />,
    // },

]

export default routes