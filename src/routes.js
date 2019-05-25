import React from "react";
import Update from "./views/product-list/update";
import Users from "./views/Users/Users";
import User from "./views/Users/User";
import Product from "./views/product-list";
import AddProduct from "./views/add-product";

import AddCategory from "./views/add-category/index";
import Logout from "./views/logout/logout";
import AdminProfile from "./views/admin-profile/index";
import ChangePassword from "./views/change-password/index";
import Category from "./views/Category/category";
import UserRow from "./views/Category/categoryList";

const routes = [
  { path: "/category-list", name: "UserRow", component: UserRow },
  { path: "/cat-list/:id", name: "Category", component: Category },
  { path: "/add-product", name: "AddProduct", component: AddProduct },

  { path: "/product-list", exact: true, name: "Product", component: Product },
  {
    path: "/add-category",
    exact: true,
    name: "AddCategory",
    component: AddCategory
  },
  {
    path: "/check-password",
    exact: true,
    name: "ChangePassword",
    component: ChangePassword
  },
  {
    path: "/admin-profile",
    exact: true,
    name: "AdminProfile",
    component: AdminProfile
  },
  {
    path: "/logout",
    exact: true,
    name: "Logout",
    component: Logout
  },

  { path: "/users", exact: true, name: "Users", component: Users },
  { path: "/users/:id", exact: true, name: "User Details", component: User },
  { path: "/gtItem/:id", exact: true, name: "Update", component: Update }
];
export default routes;
