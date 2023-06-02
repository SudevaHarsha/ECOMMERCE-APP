import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import useCategory from '../hooks/useCategory';

const Categories = () => {

    const categories = useCategory();

  return (
    <Layout title="All categories">
        <div className='container'>
            <div className='row'>
                {categories.map((c)=>{
                    return <div className='col-md-6 mt-5 mb-3 gx-3 by-3' key={c._id}>
                               <button className='btn btn-primary text-light'><Link to={`/category/${c.slug}`} className='btn btn-primary'>{c.name}</Link></button>
                            </div>
                })}
                
            </div>
        </div>
    </Layout >
  )
}

export default Categories