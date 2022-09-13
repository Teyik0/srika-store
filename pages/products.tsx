import React from 'react';
import axios from 'axios';
import { NextPage } from 'next';
import { Category, Product } from '../utils/interface';
import { ProductCard } from '../components';

interface IProps {
  allProducts: Product[];
  allCategories: Category[];
}

const Products: NextPage<IProps> = ({ allProducts }) => {
  return (
    <div>
      <h2 className='capitalize text-xl font-semibold mb-2 cursor-pointer'>
        Tous les produits
      </h2>
      <div className='flex flex-row flex-wrap '>
        {allProducts.map((product) => (
          <div key={product.title} className='mr-4'>
            <ProductCard product={product} size='lg' name={false} />
          </div>
        ))}
      </div>
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

export default Products;
