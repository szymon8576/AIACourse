import React from 'react'
import './SearchModule.css';

class SearchModule extends React.Component {

    render() {
        return (
            <span>
              //TO DO: use functional components!
            <input placeholder="Start typing here..." name="query" onChange={(x)=>{this.props.searchEvent(x.target.name,x.target.value)}}/>
            <form style={{display: "inline"}}name="field" onChange={(x)=>{this.props.searchEvent(x.target.name,x.target.value)}}>
            <select>
                <option value="name">Name</option>
                <option value="description">Description</option>
                <option value="rating">Rating</option>
            </select>
            
            </form>
            </span>

        )
    }
}

export default SearchModule