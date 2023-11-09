import { ScrollView, View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import CategoryCard from "./category-card";
import createClient, { urlFor } from "../sanity";

const Categories = () => {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    createClient.fetch(`
        *[_type == "category"]{
          name,
          "image": image.asset->url
        }
    `).then((data) => {
      setCategories(data)
    });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Category Card */}

      {categories?.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
