import React from 'react'
import './NewItem.css'

class NewItem extends React.Component{

render()
{
    return (
         //TO DO: use functional components!
        <tr><th><input id="name"  defaultValue="Burek"/></th>
        <th><input id='description' defaultValue="Golden"/></th>
        <th><input id='image URL' defaultValue="https://clubk9.com/wp-content/uploads/2018/04/Depositphotos_4953129_original-1-256x256.jpg"/></th>
        <th><input id='rating' defaultValue='10'/></th>
        <th><button onClick={
          ()=>{ 
          this.props.saveNewItem(document.getElementById('name').value, 
          document.getElementById('description').value,
          document.getElementById('image URL').value,
          document.getElementById('rating').value)}
          }>Add a new dog!🐕‍🦺</button></th></tr>
    )
}
}

export default NewItem