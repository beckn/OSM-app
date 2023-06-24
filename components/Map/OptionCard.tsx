import React from 'react'
import { IconType } from 'react-icons';
import cs from 'classnames';


type OptionMeta = {

	tagValue: string;
	tagName: string;
}

type OptionIcons = {

	iconUrl:string;
	iconUrlLight:string;
}

interface OptionCardProps {
	optionMeta:OptionMeta;
	optionIcons:OptionIcons;
	isSelected?:boolean;
	setOption: React.Dispatch<React.SetStateAction<OptionMeta>>;
}

const OptionCard:React.FC<OptionCardProps> = ({optionMeta:{tagName,tagValue},optionIcons:{iconUrl,iconUrlLight},isSelected,setOption})=> {
	return (

		<div className='text-center' onClick={(e)=>{
			setOption({tagName,tagValue})

		}} >
			{/* <OptionIcon /> */}
			<div className={cs('mb-2 min-w-[40px] min-h-[40px]  rounded-xl p-4 shadow-custom',{['bg-palette-primary']:isSelected},{['bg-white']:!isSelected})}>

			<img src={isSelected ? iconUrlLight : iconUrl} alt="" />
			</div>
			<p>{tagValue}</p>
		</div>
	)
}

export default OptionCard;
