import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Category, Product } from '../../utils/interface';
import { ProductCard, ProductSlider } from '../../components';
import { useStore, useLoadStore } from '../../utils/store';

import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';

interface IProps {
  allProducts: Product[];
  allCategories: Category[];
}

const Product: NextPage<IProps> = ({ allProducts, allCategories }) => {
  const router = useRouter();
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [dQty, setDQty] = useState(1);

  const setCart = useLoadStore((state) => state.setCart);
  const productOnCart = useStore((state) => state.productsOnCart);
  const addProductToCart = useStore((state) => state.addProductToCart);
  const modifyQty = useStore((state) => state.modifyQty);

  const addToCart = () => {
    //On vérifie s'il y a un item dans le panier (obligatoire!)
    setCart(true);
    if (productOnCart.length === 0 && currentProduct) {
      addProductToCart(currentProduct, dQty);
      return;
    }

    //On vérifie que le produit n'est pas déjà dans le panier
    let isAlreadyInCart = false;
    productOnCart.map((product, index) => {
      if (product.title === currentProduct?.title) {
        modifyQty(dQty, index, 'plus');
        isAlreadyInCart = true;
      }
    });

    //Si le produit n'est pas déjà dans le panier, on l'ajoute !
    if (!isAlreadyInCart && currentProduct) {
      addProductToCart(currentProduct, dQty);
    }
  };

  useEffect(() => {
    allProducts.map((product) => {
      if (product.slug === router.query.id) setCurrentProduct(product);
    });
    setDQty(1);
  }, [allProducts, router.query.id]);

  return (
    <div className='flex flex-col'>
      {currentProduct && (
        <div className='mt-8 flex flex-row mb-4'>
          <ProductCard product={currentProduct} size='xl' name={false} />
          <div className='flex flex-col ml-4'>
            <p className='font-semibold text-xl capitalize'>
              {currentProduct?.title}
            </p>
            <div className='w-64 h-[1px] mt-2 bg-black' />
            <p className='capitalize font-semibold mt-2'>
              état : <span className='text-green-800'>en stock</span>
            </p>
            <p className='text-justify'>{currentProduct?.presentation?.fr}</p>
            <p className='mt-4 font-semibold text-green-800'>
              Prix : <span>{currentProduct?.price}$</span>
            </p>
            <div className='flex flex-row items-center mt-2'>
              <AiFillPlusCircle
                className='mr-2 cursor-pointer'
                size={20}
                onClick={() => setDQty((prev) => prev + 1)}
              />
              <span>{dQty}</span>
              <AiFillMinusCircle
                className='ml-2 cursor-pointer'
                size={20}
                onClick={() => {
                  if (dQty != 1) setDQty((prev) => prev - 1);
                }}
              />
            </div>
            <button
              className='mt-2 p-2 w-[200px] bg-red-800 rounded-lg'
              onClick={addToCart}
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      )}
      <div>
        <h2 className='font-bold text-3xl mb-4'>
          Tout savoir sur le {currentProduct?.title}
        </h2>
        <p className='text-justify'>{currentProduct?.content?.fr}</p>
      </div>
      {currentProduct && (
        <ProductSlider
          title='Autres produits correspondant'
          products={allProducts}
          sortByCategory={currentProduct?.categories[0].name}
        />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const allProducts = await axios.get(`http://localhost:3000/api/products`);
  const allCategories = await axios.get(
    `http://localhost:3000/api/products/categories`
  );

  return {
    props: {
      allProducts: allProducts.data,
      allCategories: allCategories.data,
    },
  };
};

export default Product;
