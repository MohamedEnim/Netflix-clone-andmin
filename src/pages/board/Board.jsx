import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./../../components/navbar/Navbar";
import Sidebar from "./../../components/sidebar/Sidebar";
import UserList from "./../../components/userList/UserList";
import User from "./../../components/user/User";
import CreateUser from "./../../components/createUser/CreateUser";
import ProductList from "../../components/movieList/MovieList";
import Product from "../../components/movie/Movie";
import CreateProduct from "../../components/createMovie/CreateMovie";
import Lists from "./../../components/lists/Lists";
import List from "./../../components/list/List";
import CreateList from "./../../components/createList/CreateList";
import Home from "./../../components/home/Home";

const Board = () => {
  return (
    <Router>
      <Switch>
        <>
          <div className="app">
            <Navbar />
            <div className="app__container">
              <Sidebar />

              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:id">
                <User />
              </Route>
              <Route path="/createUser">
                <CreateUser />
              </Route>
              <Route path="/movies">
                <ProductList />
              </Route>
              <Route path="/movie/:id">
                <Product />
              </Route>
              <Route path="/createMovie">
                <CreateProduct />
              </Route>
              <Route path="/lists">
                <Lists />
              </Route>
              <Route path="/list/:id">
                <List />
              </Route>
              <Route path="/createList">
                <CreateList />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </div>
          </div>
        </>
      </Switch>
    </Router>
  );
};

export default Board;
