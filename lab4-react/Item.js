import React from 'react'
import './Item.css';

class Item extends React.Component{

render()
{


    let rating_field,button,x;
    if(this.props.item.editable)
    {
        rating_field=<td><input defaultValue={this.props.item.rating} onChange={(x)=>{this.props.item.rating=parseInt(x.target.value,10);}}/></td>;
        button=<button onClick={()=>{this.props.saveRatingEvent(this.props.item.id)}}>Save rating ✔</button>;
    }
    else{
        rating_field=<td id="rating_field">{this.props.item.rating}</td>;
        button=<button onClick={()=>{this.props.editRatingEvent(this.props.item.id)}}>Edit rating 🔨</button>;
    }
    return (
        <tr>
            <td>{this.props.item.name}</td>
            <td>{this.props.item.description}</td>
            <td><img src={this.props.item.image}></img></td>
            {rating_field}
            <td>
                <button onClick={()=>{this.props.removeItemEvent(this.props.item.id)}}>Remove item ✖</button>
                <br/>
                {button}
                </td>
        </tr>
    )
}
}

export default Item