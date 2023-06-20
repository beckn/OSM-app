import React,{useEffect,useState} from 'react'
import dynamic from 'next/dynamic';

 const  homepage = ()=> {

	const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false
  });


	return (
		<div>
			<MapWithNoSSR />


		</div>
	)
}

export default homepage;
