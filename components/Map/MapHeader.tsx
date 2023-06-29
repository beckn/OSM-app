import React from 'react'
import Settings from '../header/Settings';

export interface MapHeaderProps {
	handleMenuClick: () => void;
}

const MapHeader: React.FC<MapHeaderProps> = ({ handleMenuClick }) => {
	return (
		<div className='h-7 w-full bg-[#D9D9D9]'>
			<div className='px-3 h-full flex items-center' >

<div className='ml-auto flex gap-4'>
				<Settings />

				<img onClick={() => handleMenuClick()} className='block' src='/images/3-dots.svg' alt="menu icon" />
</div>
			</div>
		</div>
	)
}


export default MapHeader;
