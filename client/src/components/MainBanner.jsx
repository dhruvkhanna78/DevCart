import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const MainBanner = () => {
    return (
        <div>
            <img src={assets.mb} alt="banner" className='w-full hidden md:block' />
            <img src="assets.main_banner_bg_sm" alt="banner" className='w-full md:hidden' />
            <div className="absolute inset-0 flex items-center">
                <div className="w-full max-w-6xl mx-auto px-4 md:px-0">
                    <div className="flex flex-col items-center md:items-start justify-center gap-6">

                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-xl leading-tight">
Everything your home needs, in one place.                        </h1>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <Link
                                to="/products"
                                className="group flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-dull transition rounded text-white"
                            >
                                Shop Now
                                <img
                                    className="transition group-hover:translate-x-1"
                                    src={assets.white_arrow_icon}
                                    alt=""
                                />
                            </Link>

                            <Link
                                to="/products"
                                className="group flex items-center gap-2 px-8 py-3"
                            >
                                Explore Deals
                                <img
                                    className="transition group-hover:translate-x-1"
                                    src={assets.black_arrow_icon}
                                    alt=""
                                />
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default MainBanner
