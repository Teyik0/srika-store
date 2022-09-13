import type { NextPage } from 'next';
import axios from 'axios';
import Link from 'next/link';
import { Herobanner, ProductSlider } from '../components';
import { title } from 'process';
import { Category, Product } from '../utils/interface';

interface IProps {
  allProducts: Product[];
  allCategories: Category[];
}

const Home: NextPage<IProps> = ({ allProducts, allCategories }) => {
  return (
    <div className='p-8'>
      <Herobanner />
      <div className='mt-8'>
        <h2 className='capitalize text-xl font-semibold mb-2 cursor-pointer'>
          Catégories
        </h2>
        <div className='flex flex-row flex-wrap items-center'>
          {allCategories.map((category: Category) => (
            <div
              key={category?.name}
              className='p-[0.2rem] pr-2 pl-2 bg-slate-400 rounded-2xl 
              mr-2 cursor-pointer justify-center items-center text-center'
            >
              <Link href={`/product/?${category?.name}`}>
                <p>{category?.name}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <ProductSlider
        title='Les indispensables'
        products={allProducts}
        sortByCategory='Indispensable'
      />
      <ProductSlider
        title='Nos épices'
        products={allProducts}
        sortByCategory='Epices'
      />
      <ProductSlider
        title='Produits déshydratés'
        products={allProducts}
        sortByCategory='Produits déshydraté'
      />
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

export default Home;
