import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <header className="bg-[#0D0D0D] w-full h-[200px] flex items-center justify-center">
            <Image src={'/Logo.png'} alt="logo" height={48} width={226} />
        </header>
    )
}

export default Header