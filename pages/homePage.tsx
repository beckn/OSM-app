import React, { useEffect, useState } from 'react'
import MapSearch from '../components/Map/MapSearch'
import TopSheet from '../components/topSheet/TopSheet'
import { getUserLocation } from '../utilities/common-utils'
import useRequest from '../hooks/useRequest'
import GeoLocationInput from '../components/geoLocationInput/GeoLocationInput'

type Coords = {
    lat: number
    long: number
}

const homePage = () => {
    const [currentLocation, setCurrentLocation] = useState<string>('')
    const [searchInput, setSearchInput] = useState(false)

    useEffect(() => {
        getUserLocation()
            .then((position) => {
                const { latitude, longitude } = position.coords
                fetchLocationNameByCoords(latitude, longitude)
            })
            .catch((error) => {
                console.error(`Error getting user location: ${error.message}`)
            })
    }, [])

    const fetchLocationNameByCoords = (lat: number, long: number) => {
        const url = `${process.env.NEXT_PUBLIC_NOMINATIM_URL}/reverse?format=jsonv2&lat=${lat}&lon=${long}`
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const locationName = data.display_name
                setCurrentLocation(locationName)
            })
            .catch((error) => {
                console.error(`Error fetching location name: ${error.message}`)
            })
    }

    return (
        <>
            <TopSheet
                currentAddress={currentLocation}
                setSearchInput={(isActive) => setSearchInput(isActive)}
            />
        </>
    )
}

export default homePage
