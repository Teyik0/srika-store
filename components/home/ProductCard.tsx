import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Product } from '../../utils/interface';

interface IProps {
  product: Product;
  size: 'xs' | 'sm' | 'lg' | 'xl';
  name: boolean;
}

const ProductCard: NextPage<IProps> = ({ product, size, name }) => {
  const { title, imageUrl, slug, vendor } = product;

  const [sizeD, setSizeD] = useState('xs');
  useEffect(() => {
    if (size === 'xs') setSizeD(() => 'w-[120px] h-[120px]');
    else if (size === 'sm') setSizeD(() => 'w-[180px] h-[180px]');
    else if (size === 'lg') setSizeD(() => 'w-[200px] h-[200px]');
    else if (size === 'xl') setSizeD(() => 'w-[300px] h-[300px]');
  }, [size]);

  return (
    <Link href={`/product/${slug}`}>
      <div className='cursor-pointer'>
        <div
          className={`${sizeD} bg-gray-400 rounded-lg flex
          items-center justify-center
          hover:scale-105 ease-in-out duration-300`}
        >
          <Image
            src={imageUrl}
            alt={title}
            width={150}
            height={150}
            className='rounded-xl'
          />
        </div>
        {name && <p className='font-semibold'>{title}</p>}
      </div>
    </Link>
  );
};

export default ProductCard;
