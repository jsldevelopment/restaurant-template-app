import './Filter.scss'
import { useState, useEffect } from 'react'
import Star from '../media/star-regular.svg'

const Filter = (props) => {

    const [cuisineListHTML, setCuisineListHTML] = useState([])
    const [selected, setSelected] = useState([ false, false, false, false, false])
    const [optionValue, setOptionValue] = useState('all')

    useEffect(function onStarsChange() {
        const selectedStars = new Array(5).fill(false)
        selectedStars.fill(true, 0, props.filters.stars)
        setSelected(() => selectedStars)
    }, [props.filters.stars])

    /**
     * This doesn't *have* to be a useEffect, it could just be build statically when the component first loads,
     * since the cuisineList shouldn't change. But either way it only renders the one time.
     */
    useEffect(function onCuisineListChange() {
        if (!props.cuisineList) return
        const allOption = (
            <option selected value='all' key='all' >All</option>
        )
        const cuisineListHTML = props.cuisineList.map((cuisine) => {
            return (
                <option value={cuisine} key={cuisine} >{cuisine}</option>
            )
        })
        setCuisineListHTML([allOption, ...cuisineListHTML])
    }, [props.cuisineList])

    const updateSelected = (value) =>{
        setOptionValue(value)
        props.updateFilters({ cuisineType: value })
    }

    const reset = () => {
        setOptionValue('all')
        props.updateFilters({
            name: "",
            cuisineType: 'all',
            stars: null
        })
    }

    return (
        <section className='filter'>
            <form
                className='filter-form'
                onSubmit={(e) => e.preventDefault()}>
                <input
                    className='filter-form__name'
                    type="text" value={props.filters.name}
                    placeholder="Restaurant"
                    aria-label="search by name"
                    onChange={(e) => props.updateFilters({ name: e.target.value })}
                    />
                <select
                    className='filter-form__cuisine'
                    value={optionValue}
                    onChange={(e) => updateSelected(e.target.value)}
                    aria-label="sort by cuisine"
                    >
                    { cuisineListHTML }
                </select>
                <div
                    className='filter-form__stars'
                    aria-label="star rating"
                    role="list"
                    >
                    <img
                        className={`filter-form__stars--${selected[0]}`}
                        alt='1 star'
                        onClick={() => { props.updateFilters({ stars: 1 }) }}
                        role="listitem"
                        />
                    <img
                        className={`filter-form__stars--${selected[1]}`}
                        alt='1 star'
                        onClick={() => { props.updateFilters({ stars: 2 }) }}
                        role="listitem"
                        />
                    <img
                        className={`filter-form__stars--${selected[2]}`}
                        alt='1 star'
                        onClick={() => { props.updateFilters({ stars: 3 }) }}
                        role="listitem"
                        />
                    <img
                        className={`filter-form__stars--${selected[3]}`}
                        alt='1 star'
                        onClick={() => { props.updateFilters({ stars: 4 }) }}
                        role="listitem"
                        />
                    <img
                        className={`filter-form__stars--${selected[4]}`}
                        alt='1 star'
                        onClick={() => { props.updateFilters({ stars: 5 }) }}
                        role="listitem"
                        />
                </div>
                <button
                    className='filter-form__reset'
                    onClick={() => reset()}
                    >
                    Reset
                </button>
            </form>
        </section>
    )
}

export default Filter