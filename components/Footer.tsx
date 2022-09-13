import React from 'react';
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillYoutube,
} from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='flex flex-col bg-gray-200 p-4 rounded-lg'>
      <div className='flex flex-row text-sm mb-4'>
        <div className='flex flex-col mr-16'>
          <p className='font-semibold mb-2'>Produits</p>
          <p className='capitalize'>Les indispensables</p>
          <p className='capitalize'>épices</p>
          <p className='capitalize'>Déshydratés</p>
          <p className='capitalize'>Riz</p>
        </div>
        <div className='flex flex-col mr-16'>
          <p className='font-semibold mb-2'>Support</p>
          <p className='capitalize'>Les indispensables</p>
          <p className='capitalize'>épices</p>
          <p className='capitalize'>Déshydratés</p>
          <p className='capitalize'>Riz</p>
        </div>
        <div className='flex flex-col mr-16'>
          <p className='font-semibold mb-2'>Entreprise</p>
          <p className='capitalize'>Les indispensables</p>
          <p className='capitalize'>épices</p>
          <p className='capitalize'>Déshydratés</p>
          <p className='capitalize'>Riz</p>
        </div>
        <div className='flex flex-col mr-16'>
          <p className='font-semibold mb-2'>Termes légal</p>
          <p className='capitalize'>Conditions générales de ventes</p>
          <p className='capitalize'>épices</p>
          <p className='capitalize'>Déshydratés</p>
          <p className='capitalize'>Riz</p>
        </div>
      </div>

      <div className='flex flex-row justify-between items-center'>
        <p className='capitalize font-semibold text-sm'>
          SriKa Store 2022 - All rights reserved
        </p>
        <p className='flex flex-row'>
          <AiFillYoutube className='mr-2 w-[20pxpx]' />
          <AiFillInstagram className='mr-2 w-[20pxpx]' />
          <AiOutlineTwitter className='w-[20pxpx]' />
        </p>
      </div>
    </div>
  );
};

export default Footer;
