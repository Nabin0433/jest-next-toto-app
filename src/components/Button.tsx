import Image from 'next/image'
import React from 'react'

interface Props {
    click: () => void,
    icon?: string,
    title: string,
    disabled?: boolean
}

const Button: React.FC<Props> = ({ click, icon, title, disabled = false }) => {
    return (
        <button disabled={disabled} onClick={click} className="flex items-center justify-center w-full h-[52px] bg-[#1E6F9F] gap-2 transition-all duration-200 hover:bg-[#4BA5DB] rounded-md">
            <span>{title}</span>
            {icon && <Image src={icon} alt="logo" height={16} width={16} />}
        </button>
    )
}

export default Button