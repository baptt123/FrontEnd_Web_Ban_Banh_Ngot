import AdminProductList from "../views/AdminProductList.jsx";
import AdminCategories from "../views/AdminCategories.jsx";
import AdminUserList from "../views/AdminUserList.jsx";

const routes = [

  {
    path: "/userList",
    name: "Danh sách người dùng",
    icon: "ni ni-single-02 text-red",
    component: <AdminUserList />,
    layout: "/admin",
  },
  {
    path: "/productList",
    name: "Danh sách sản phẩm",
    icon: "ni ni-bullet-list-67 text-red",
    component: <AdminProductList/>,
    layout: "/admin",
  },
  {
    path: "/categories",
    name: "Quản lý danh mục",
    icon: "ni ni-bullet-list-67 text-yellow",
    component: <AdminCategories/>,
    layout: "/admin",
  },
  // {
  //   path: "/orderList",
  //   name: "Danh sách đơn hàng",
  //   icon: "ni ni-bullet-list-67 text-red",
  //   component: <AdminOrderList />,
  //   layout: "/admin",
  // },

];
export default routes;
