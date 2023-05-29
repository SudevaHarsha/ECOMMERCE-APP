import React from 'react'
import Layout from '../../components/layout/Layout.js'
import UserMenu from '../../components/layout/UserMenu'
const Profile = () => {
  return (
    <Layout title={'your profile'}>
    <div className='container-fluid m-3 p-3'>
        <div className='row'>
            <div className='col-md-3'>
                <UserMenu />
            </div>
            <div className='col-md-9'>
                <h1>your profile</h1>
            </div>
        </div>
    </div>
</Layout>
  )
}

export default Profile