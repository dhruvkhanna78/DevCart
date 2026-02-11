import React, { use, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount, axios } = useAppContext();

    const logout = async () => {
        try{
            const {data} = await axios.get('/api/user/logout');
            if(data.success){
                toast.success(data.message);
                setUser(null);
                navigate('/');
            } else{
                toast.error(data.message);
            }
        } catch(error){
                toast.error(error.message);
        }
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate('/products');
        }
    },[searchQuery])


    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all z-50">

            <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 h-10 w-25">
<h1 className="text-primary text-3xl font-semibold tracking-tight">
  DevCart
</h1>            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <Link to='/'>Home</Link>
                <Link to="/products">All Products</Link>
                <a href="#">Contact</a>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <i class="fi fi-rs-search"></i>
                </div>

                <div className="relative cursor-pointer">
                    <div onClick={() => navigate('/cart')} className="w-5 h-5 flex items-center justify-center">
                        <i className="fi fi-rs-shopping-cart text-lg"></i>
                        <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                    </div>
                </div>

                {!user ?
                    (<button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                        Login
                    </button>)
                    :
                    (
                        <div className="relative group">
                            <img className="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                                alt="userImage1" />
                            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 rounded-md w-40 z-40 text-sm py-2.5 px-2.5">

                                <li onClick={() => navigate("my-orders")} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                                <li onClick={logout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                            </ul>
                        </div>
                    )}
            </div>

            <div className='flex items-center gap-6 sm:hidden '>
                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <i className="fi fi-rs-shopping-cart text-lg w-6 opacity-80"></i>
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" >
                    <img src={assets.menu_icon} alt="menu" />
                </button>
            </div>


            {/* Mobile Menu */}
            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                    <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
                    <NavLink to="/Products" onClick={() => setOpen(false)}>All Products</NavLink>
                    {user &&
                        <NavLink to="/Products" onClick={() => setOpen(false)}>My Orders</NavLink>
                    }
                    <NavLink to="/" onClick={() => setOpen(false)}>Contact</NavLink>

                    {!user ? (<button onClick={() => {
                        setOpen(false);
                        setShowUserLogin(true);
                    }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:primary-dull transition text-white rounded-full text-sm">
                        Login
                    </button>) : (<button className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:primary-dull transition text-white rounded-full text-sm">
                        Logout
                    </button>)}

                </div>)}

        </nav>
    )
}

export default Navbar
