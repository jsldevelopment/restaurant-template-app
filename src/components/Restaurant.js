import List from './List'
import Filter from './Filter'
import './Restaurant.scss'
import RestaurantJSON from '../api/restaurants.json'
import { useEffect, useState } from 'react'

// import static js file
const restaurantList = RestaurantJSON
// get list of available cuisines
const cuisineList = restaurantList.reduce((prevRest, restaurant) => {
    if (!prevRest.includes(restaurant.cuisineType)) {
        return [...prevRest, restaurant.cuisineType]
    }
    return prevRest;
}, [])

const Restaurant = () => {

    const [filteredRestaurantList, setFilteredRestaurantList] = useState([])
    const [filters, setFilters] = useState({
        name: "",
        cuisineType: 'all',
        stars: null
    })

    useEffect(function onFiltersUpdate() {
        setFilteredRestaurantList(() => {
            return restaurantList.reduce((prev, restaurant) => {
                if (filters.name && restaurant.name.toLowerCase().indexOf(filters.name.toLowerCase()) === -1) return prev
                if (filters.cuisineType !== 'all' && filters.cuisineType && restaurant.cuisineType != filters.cuisineType) return prev
                if (filters.stars && restaurant.stars > filters.stars) return prev
                return [...prev, restaurant]
            }, [])
        })
    }, [filters])

    const updateFilters = (filterChanged) => {
        setFilters((curFilters) => {
            // only take the properties that have changed
            return {
                ...curFilters,
                ...filterChanged
            }
        })
    }

    return (
        <section className='restaurant'>
            <Filter
                filters={filters}
                cuisineList={cuisineList}
                updateFilters={(filters) => updateFilters(filters)}
                />
            <List restaurants={filteredRestaurantList} />
        </section>
    )
}

export default Restaurant