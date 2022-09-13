import React from 'react';
import Head from 'next/head';
import { Navbar, Footer } from './';

const Layout = ({ children }: any) => {
  return (
    <div className='p-4'>
      <Head>
        <title>SriKa Store - Les meilleurs produits Sri-Lankais</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main>{children}</main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
