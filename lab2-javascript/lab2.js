function add_element()
{
    let tab = document.querySelector('table');

    let row=tab.insertRow();

    let row_id=tab.rows.length-1;

    let titleCell=row.insertCell(0);
    let genreCell=row.insertCell(1);
    let buttonsCell=row.insertCell(2);

    titleCell.appendChild(document.createElement('input'));
    genreCell.appendChild(document.createElement('input'));


    //edit button - initially not visible 
    let edit_button=document.createElement('button');
    edit_button.textContent='Edit';
    edit_button.onclick= function(){editRow(row_id)};
    edit_button.style.display='none';
    
    buttonsCell.appendChild(edit_button);

    //save button
    let save_button=document.createElement('button');
    save_button.textContent='Save';
    save_button.onclick= function(){saveRow(row_id)}

    buttonsCell.appendChild(save_button);


    //remove button
    let remove_button=document.createElement('button');
    remove_button.textContent='Remove';
    remove_button.onclick= function(){removeRow(row_id)}
    
    buttonsCell.appendChild(remove_button);

    
}

function editRow(row_id)
{

    let tab = document.querySelector('table');
    
    let titleField=document.createElement('input');
    titleField.value=tab.rows[row_id].cells[0].childNodes[0].data;
    
    
    
    let genreField=document.createElement('input');
    genreField.value=tab.rows[row_id].cells[1].childNodes[0].data;


    tab.rows[row_id].cells[0].childNodes[0].replaceWith(titleField);
    tab.rows[row_id].cells[1].childNodes[0].replaceWith(genreField);

    tab.rows[row_id].cells[2].childNodes[0].style.display='none';
    tab.rows[row_id].cells[2].childNodes[1].style.display='initial';


}


function saveRow(row_id)
{

    
    let tab = document.querySelector('table');
    
    let titleValue=tab.rows[row_id].cells[0].childNodes[0].value;
    let genreValue=tab.rows[row_id].cells[1].childNodes[0].value;

    if(titleValue=='' || genreValue=='')
    { 
        alert('Please type both title and genre before saving!');
    }
    else 
    {
    let titleField=document.createElement('td');
    titleField.textContent=titleValue;
    
    let genreField=document.createElement('td');
    genreField.textContent=genreValue;

    tab.rows[row_id].cells[0].replaceWith(titleField);
    tab.rows[row_id].cells[1].replaceWith(genreField);

    tab.rows[row_id].cells[2].childNodes[0].style.display='initial';
    tab.rows[row_id].cells[2].childNodes[1].style.display='none';
    tab.rows[row_id].cells[2].childNodes[2].style.display='initial';
    }

}



function removeRow(row_id)


{
    let tab = document.querySelector('table');
    tab.deleteRow(row_id);

    //update ID's
    for(let new_id=1;new_id<tab.rows.length;new_id++)
    {
        tab.rows[new_id].cells[2].childNodes[0].onclick=function(){editRow(new_id)};
        tab.rows[new_id].cells[2].childNodes[1].onclick=function(){saveRow(new_id)};
        tab.rows[new_id].cells[2].childNodes[2].onclick=function(){removeRow(new_id)};
    }


}


