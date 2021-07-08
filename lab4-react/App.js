import logo from './logo.svg';
import './App.css';
import React from 'react';
import data from './data/sources.json';
import Item from "./Item"
import NewItem from "./NewItem"
import SearchModule from './SearchModule';
import SortingModule from './SortingModule';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      list: data,
      search_query:"",
      search_field:"name",
      sort_by:"name",
      sorting_direction:"asc"
    }
    this.currId=2;
  }

  removeItem = (id) => {
    console.log("removing id "+id+" !");
    this.setState((prevState) => {
      return {
        list: prevState.list.filter(elem => elem.id !== id)
      }
    })
  }

  saveNewItem = (name_val,description_val,img_val,rating_val) => {
    const new_item = {
        id: this.currId++,
        name: name_val,
        description: description_val,
        image: img_val,
        rating: parseInt(rating_val,10),
        editable: false
    }
    this.setState((prevState) => {
        return {list: prevState.list.concat([new_item])}
    })
}

enableEditRating = (id) => {
  console.log("making id "+id+" editable");
  this.setState((prevState) => {
    let list = { ...prevState.list };
  
    for(let i=0;i<Object.keys(list).length;i++)
    {
      if(list[i].id===id)list[i].editable=true;
    }

    return list;
})
}

saveEditRating = (id) => {
  console.log("making id "+id+" UNeditable");
  this.setState((prevState) => {
    let list = { ...prevState.list };
    for(let i=0;i<Object.keys(list).length;i++)
    {
      if(list[i].id===id)list[i].editable=false;
    }
    return list;
})
}

searchFun=(message_type,message)=>
{
  if(message_type=='query')
  {
  console.log("searching for query="+message);
  this.setState({search_query:message});
  }
  else  //field info
  {
    console.log("changing searching field to="+message);
    this.setState({search_field:message});
  }

}

sortFun=(message_type,value)=>
{
  if(message_type=="sort_by") this.setState({sort_by:value});
  else this.setState({sorting_direction:value});
}

compareElements = (a, b) => {
  let sorting_field=this.state.sort_by;
  let direction=this.state.sorting_direction;
  console.log("COMPARING!");
  
  if(a[sorting_field] === b[sorting_field]) {
    console.log("comparing "+a[sorting_field]+" and "+b[sorting_field]+", res=0");
    return 0;
  }
  console.log("type="+typeof(a[sorting_field])+",comparing"+a[sorting_field]+" and "+b[sorting_field]+", res="+(((a[sorting_field] > b[sorting_field]) === (direction === "asc")) ? 1 : -1));
  return ((a[sorting_field] > b[sorting_field]) === (direction === "asc")) ? 1 : -1
}

filterFun = (item) => {

  if(item[this.state.search_field].toString().includes(this.state.search_query))return true;
  return false;
}
  render() {
    const dogsList = this.state.list
    .filter((item) => this.filterFun(item))
    .sort(this.compareElements)
    .map((item) => <Item key={item.id} item={item} removeItemEvent={this.removeItem} editRatingEvent={this.enableEditRating} saveRatingEvent={this.saveEditRating}/>);

    return (
      <div>
        <table id='top'>
          //TO DO: use functional components!
         <tr><th>Filter:<br/><SearchModule searchEvent={this.searchFun} /></th>
          <th>Sort: <SortingModule sortingEvent={this.sortFun}/></th></tr>
          </table>
        <table>
          <thead>
          
            
            <tr><th>Name</th><th>Description</th><th>Image</th><th>Rating</th><th>Options</th></tr>
          </thead>
          <tbody>
            {dogsList}
            //TO DO: use functional components!
            <NewItem saveNewItem={this.saveNewItem} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
