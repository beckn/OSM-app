import React from 'react'

export interface MapHeaderProps {
	handleMenuClick:()=>void;
}

const MapHeader:React.FC<MapHeaderProps> = ({handleMenuClick})=> {
	return (
		<div  className='h-7 w-full bg-[#D9D9D9]'>
			<div className='px-3 h-full flex items-center' >

			<img onClick={()=>handleMenuClick()}  className='ml-auto block' src='/images/3-dots.svg' alt="menu icon" />
			</div>
		</div>
	)
}


export default MapHeader;
