import React, { useState, useEffect } from "react";
import { EnumType } from "typescript";
import CreateRestaurant from "./components/create-restaurant";
import Sidebar from "./components/sidebar";

const Restaurant = () => {
  enum Category {
    FAST_FOOD = " Fast Food",
    CAFE = "Cafe",
    DINNING = "Dinning",
    CUISINE_RESTAURANTS = "Cuisines Restaurants",
    SEAFOOD_RESTAURANTS = "Seaside Restaurants",
  }
  interface RestaurantData {
    name: string;
    description: string;
    officialChef: string;
    reservations: boolean;
    orderOut: boolean;
    email: string;
    contactNo: string;
    address: string;
    category: Category;
  }

  const addRestaurant = (restaurant: RestaurantData) => {};
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <CreateRestaurant />
        </div>
      </div>
    </>
  );
};

export default Restaurant;
