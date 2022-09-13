import Link from 'next/link';
import { NextPage } from 'next';

import { titleToSlug } from '../../utils/utils';
import ProductCard from './ProductCard';
import { Category, Product } from '../../utils/interface';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

interface IProps {
  title: string;
  products: Product[];
  sortByCategory: 'Indispensable' | 'Epices' | 'Produits déshydraté' | string;
}

const ProductSlider: NextPage<IProps> = ({
  title,
  products,
  sortByCategory,
}) => {
  const sliderID = `slider ${title}`;
  const slideLeft = () => {
    var slider = document.getElementById(sliderID);
    slider!.scrollLeft = slider!.scrollLeft - 300;
  };
  const slideRight = () => {
    var slider = document.getElementById(sliderID);
    slider!.scrollLeft = slider!.scrollLeft + 300;
  };

  return (
    <div className='bg-green z-10 mt-4'>
      <Link href={titleToSlug(title)}>
        <h2 className='capitalize text-xl font-semibold mb-2 cursor-pointer'>
          {title}
        </h2>
      </Link>

      <div className='relative items-center flex'>
        <MdChevronLeft
          className='opacity-50 cursor-pointer hover:opacity-100'
          size={40}
          onClick={slideLeft}
        />
        <div
          id={sliderID}
          className='w-full h-full flex
            overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide p-4'
        >
          {products.map((product: Product) => {
            return product.categories.map(
              (category: Category) =>
                category.name.includes(sortByCategory) && (
                  <div key={product.title} className='mr-4'>
                    <ProductCard product={product} size='sm' name />
                  </div>
                )
            );
          })}
        </div>
        <MdChevronRight
          className='opacity-50 cursor-pointer hover:opacity-100'
          size={40}
          onClick={slideRight}
        />
      </div>
    </div>
  );
};

export default ProductSlider;
