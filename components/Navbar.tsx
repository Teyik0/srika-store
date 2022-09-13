import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { useLoadStore } from '../utils/store';
import { Cart, ManualSearch } from './';

import { BiCartAlt, BiSearchAlt } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';

const Navbar = () => {
  const manualSearch = useLoadStore((state) => state.manualSearch);
  const setManualSearch = useLoadStore((state) => state.setManualSearch);
  const cart = useLoadStore((state) => state.cart);
  const setCart = useLoadStore((state) => state.setCart);

  return (
    <div>
      <div className='flex flex-row items-center justify-between p-2'>
        <nav className='flex flex-row'>
          <Link href='/'>
            <h2 className='mr-4 capitalize font-semibold cursor-pointer'>
              Accueil
            </h2>
          </Link>
          <Link href='/products'>
            <h2 className='mr-4 capitalize font-semibold cursor-pointer'>
              Produits
            </h2>
          </Link>
          <Link href='/about-us'>
            <h2 className='mr-4 capitalize font-semibold cursor-pointer'>
              à propos
            </h2>
          </Link>
          <Link href='/contact'>
            <h2 className=' capitalize font-semibold cursor-pointer'>
              Contact
            </h2>
          </Link>
        </nav>
        <div className='flex flex-row'>
          <BiSearchAlt
            className='mr-4 h-[25px] w-[25px] cursor-pointer'
            onClick={() => {
              setManualSearch(!manualSearch);
            }}
          />
          <BiCartAlt
            className='mr-4 h-[25px] w-[25px] cursor-pointer'
            onClick={() => {
              setCart(true);
              setManualSearch(false);
            }}
          />
          <CgProfile className='h-[25px] w-[25px] cursor-pointer' />
        </div>
      </div>
      {cart && <Cart />}
      {manualSearch && <ManualSearch />}
    </div>
  );
};

export default Navbar;
