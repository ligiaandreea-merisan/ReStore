import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

//when adding all const, useEffect and function from App.tsx -> Inferface removed including params.
// interface Props {
//     products: Product[];
//     addProduct: () => void;
//     //empty () represents what we pass as a parameter list to this function and then it returns => void
// }

// Add ProductList component here.

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  //we fetch the products from our API and then
  //we use the "setProducts"'s state method to set the products inside our state
  //that we get back from our API.
  // then use an empty array as a dependency, that means this is only ever going to be called once. -> avoid infinite loop.
  // if I don't add the empty array [], then the useEffect will run every time the component renders or rerenders.
  useEffect(() => {
    //the fetch returns a promise, then we're going to do something with the promise
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  //also we don't need this function -> it was just an exercise
  // function addProduct() {
  //   //use a function called spread operator and then use the existing list of products
  //   //(the "...products" it's spreading prod1 and prod2 like displaying them)
  //   //then add a new product in this array -> prod3
  //   //setProducts([...products, {name: 'product3', price: 300.00}])

  //   //now to make it to add and count +1 to each adding of products
  //   setProducts((prevState) => [
  //     ...prevState,
  //     {
  //       id: prevState.length + 101,
  //       name: "product" + (prevState.length + 1),
  //       price: prevState.length * 100 + 100,
  //       brand: "some brand",
  //       descriprion: "descr",
  //       pictureUrl: "http://picsum.photos/200",
  //     },
  //   ]);
  // }

  return (
    <>
      <ProductList products={products} /> 
    </>
  );
}
