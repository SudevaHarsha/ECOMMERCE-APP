import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {Helmet} from 'react-helmet';

import {Toaster} from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
        <Header />
        <main style={{minHeight:"70vh"}}>{children}</main>
        <Toaster />
        <Footer/>
    </div>
   
  );
};

Layout.defaultProps={
  title:"Ecommerce-App-shop now",
  description:"mern stack project",
  keywords: "mern,react,node,mongodb",
  author:"Sudeva Harsha",
};

export default Layout;