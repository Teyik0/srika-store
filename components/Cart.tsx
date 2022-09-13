import { toast } from 'react-toastify';

import { useStore, useLoadStore } from '../utils/store';
import getStripe from '../utils/getStripe';
import ProductCard from './home/ProductCard';

import { BiCartAlt, BiSearchAlt } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { TiDelete } from 'react-icons/ti';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import axios from 'axios';
import { Product } from '../utils/interface';

const Cart = () => {
  const setCart = useLoadStore((state) => state.setCart);
  const setManualSearch = useLoadStore((state) => state.setManualSearch);

  const productOnCart = useStore((state) => state.productsOnCart);
  const totalPrice = useStore((state) => state.totalPrice);
  const qte = useStore((state) => state.qty);
  const deleteProductOnCart = useStore((state) => state.deleteProductOnCart);
  const modifyQty = useStore((state) => state.modifyQty);

  const slideTop = () => {
    var slider = document.getElementById('slider');
    slider!.scrollTop = slider!.scrollTop - 300;
  };
  const slideDown = () => {
    var slider = document.getElementById('slider');
    slider!.scrollTop = slider!.scrollTop + 300;
  };

  const handleCheckout = async () => {
    const items = productOnCart.map((item: Product, index: number) => {
      return { ...item, quantity: qte[index] };
    });
    const stripe = await getStripe();
    const resp = await axios.post('/api/checkout_session', items);
    if (resp.status === 500) return;
    stripe?.redirectToCheckout({ sessionId: resp.data.id });
  };

  return (
    <div
      className='fixed z-20 h-[100vh] w-[40vw] right-0 top-0 bg-slate-200 p-4 
        rounded-l-3xl shadow-black shadow-2xl animate-in slide-in-from-right duration-700'
    >
      <div className='flex flex-row absolute right-4 p-2'>
        <BiSearchAlt
          className='mr-4 h-[25px] w-[25px] cursor-pointer z-30'
          onClick={() => {
            setCart(false);
            setManualSearch(true);
          }}
        />
        <BiCartAlt
          className='mr-4 h-[25px] w-[25px] cursor-pointer z-30'
          onClick={() => setCart(false)}
        />
        <CgProfile className='h-[25px] w-[25px] cursor-pointer z-30' />
      </div>

      <div className='bg-slate-300 mt-10 rounded-xl'>
        <div className='relative items-center justify-center'>
          <IoIosArrowUp
            className='opacity-50 cursor-pointer hover:opacity-100 ease-in-out duration-150 m-auto'
            size={40}
            onClick={slideTop}
          />
          <div
            id='slider'
            className='w-full h-[400px]
            overflow-y-scroll scroll-smooth whitespace-nowrap scrollbar-hide p-4'
          >
            {productOnCart &&
              productOnCart.map((product, index) => {
                return (
                  <div key={product.title} className='flex flex-row mb-4'>
                    <ProductCard product={product} size='xs' name={false} />
                    <div className='flex flex-col ml-8 w-[600px]'>
                      <div className='flex flex-row items-center'>
                        <p className='font-semibold text-xl capitalize'>
                          {product?.title}
                        </p>
                        <button
                          onClick={() => deleteProductOnCart(index)}
                          className='text-red-600 ml-4 items-center'
                        >
                          <TiDelete height='50px' width='50px' />
                        </button>
                      </div>
                      <div className='w-64 h-[1px] mt-2 bg-black' />

                      <p className='mt-4 font-semibold text-green-800'>
                        Prix : <span>{product?.price}$</span>
                      </p>
                      <div className='flex flex-row items-center mt-2'>
                        <AiFillPlusCircle
                          className='mr-2 cursor-pointer'
                          size={20}
                          onClick={() => modifyQty(1, index, 'plus')}
                        />
                        <span>{qte[index]}</span>
                        <AiFillMinusCircle
                          className='ml-2 cursor-pointer'
                          size={20}
                          onClick={() => modifyQty(1, index, 'minus')}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <IoIosArrowDown
            className='opacity-50 cursor-pointer hover:opacity-100 ease-in-out duration-150 m-auto'
            size={40}
            onClick={slideDown}
          />
        </div>
      </div>

      <div className='absolute bottom-4 left-4 flex flex-row items-center rounded-xl'>
        <div className='bg-slate-300 p-2 flex flex-row justify-between rounded-xl mr-2'>
          <p className='mr-4'>Total :</p>
          <span>{totalPrice}$</span>
        </div>
        <button
          className='bg-red-600 p-2 pl-8 pr-8 rounded-xl'
          onClick={handleCheckout}
        >
          Payer
        </button>
      </div>
      <button
        onClick={() => setCart(false)}
        className='absolute bottom-4 right-4 bg-slate-300 p-2 pl-8 pr-8 rounded-xl'
      >
        Retour
      </button>
    </div>
  );
};

export default Cart;
