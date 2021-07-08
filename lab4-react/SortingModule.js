import React from 'react'

class SortingModule extends React.Component {

    render() {
        return (
             //TO DO: use functional components!
            <form onChange={(x)=>{this.props.sortingEvent(x.target.name,x.target.value)}}>

                <select name="sort_by">
                    <option value="name">Name</option>
                    <option value="description">Description</option>
                    <option value="rating">Rating</option>
                </select>

                <select name="direction">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>

            </form>

        )
    }
}

export default SortingModule