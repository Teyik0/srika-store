import React from 'react';
import Image from 'next/image';

import bannerImg from '/img-epice1.png';

const Herobanner = () => {
  return (
    <div className='flex flex-row'>
      <div className='flex flex-col'>
        <h1 className='font-bold text-3xl'>Bienvenue sur Srika Store</h1>
        <h2 className='font-bold text-2xl mt-2'>
          Les meilleurs produits du Sri-Lanka à porté de main
        </h2>
      </div>
      <Image
        className='z-5'
        src='/img-epice2.png'
        alt='épices'
        width={600}
        height={400}
      />
    </div>
  );
};

export default Herobanner;
