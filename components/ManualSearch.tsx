import React, { useEffect, useState } from 'react';

import { client, productQueryOption } from '../utils/utils';
import { Product } from '../utils/interface';
import { useLoadStore } from '../utils/store';

import ProductCard from './home/ProductCard';

const ManualSearch = () => {
  const [valueSearch, setValueSearch] = useState('');
  const [productsRes, setProductsRes] = useState<Product[]>();
  const setManualSearch = useLoadStore((state) => state.setManualSearch);

  //Query for manually searching a product
  useEffect(() => {
    const query = async () => {
      if (valueSearch !== '') {
        const searchQuery = `*[title match "${valueSearch}*"]${productQueryOption}`;
        const data = await client.fetch(searchQuery);
        setProductsRes(data);
      } else {
        const searchQuery = `*[_type == "product"]${productQueryOption}`;
        const data = await client.fetch(searchQuery);
        setProductsRes(data);
      }
    };
    query();
  }, [valueSearch]);

  return (
    <div className='fixed z-30 rounded-xl h-[80vh] top-[10vh] w-[80vw] left-[10vw] bg-gray-200 flex flex-col p-4 shadow-black shadow-2xl'>
      <input
        type='text'
        placeholder='Ex: Curcuma'
        className='bg-gray-800 rounded-xl p-2 w-3/4 text-white'
        value={valueSearch}
        onChange={(val) => setValueSearch(val.target.value)}
      />

      <div className='flex flex-row flex-wrap mt-4 items-center justify-center'>
        {productsRes &&
          productsRes.map((product) => (
            <div
              key={product.title}
              className='mr-4'
              onClick={() => {
                setManualSearch(false), setValueSearch('');
              }}
            >
              <ProductCard product={product} size='xs' name={true} />
            </div>
          ))}
      </div>
      {productsRes && productsRes.length == 0 && (
        // eslint-disable-next-line react/no-unescaped-entities
        <div>Aucun résultat pour "{valueSearch}"</div>
      )}

      <button
        className='absolute bottom-4 right-4 bg-gray-800 w-1/6 text-white rounded-xl p-2'
        onClick={() => {
          setManualSearch(false), setValueSearch('');
        }}
      >
        Retour
      </button>
    </div>
  );
};

export default ManualSearch;
