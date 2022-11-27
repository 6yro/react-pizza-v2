import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loadable from "react-loadable";

import "./App.css";
import "./scss/app.scss";

import Home from "./pages/Home";
import MainLayout from "./components/layouts/MainLayout";

// const Cart = React.lazy(
//   () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
// );

const Cart = Loadable({
  loader: () => import("./pages/Cart"),
  loading: () => <div>Идёт загрузка корзины...</div>,
});

const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Идёт загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
