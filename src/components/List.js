import './List.scss'
import { useState, useEffect } from 'react'
const List = (props) => {

    const [restaurantsHTML, setRestaurantsHTML] = useState([])

    useEffect(function onRestaurantsChange() {
        if (!props.restaurants) return
        const restaurantsHTML = props.restaurants.map((restaurant) => {
            return (
                <li aria-label="restaurant" className="list__item" key={restaurant.id} >
                    { restaurant.name }
                </li>
            )
        })
        setRestaurantsHTML(restaurantsHTML)
    }, [props.restaurants])

    return (
        <ul
        className='list'
        aria-label="restaurant list"
        >
            { restaurantsHTML }
        </ul>
    )
}

export default List