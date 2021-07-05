module.exports=class Cart{
    constructor(prevCart)
    {
        this.items=prevCart.items||[];

    }

    add(instrument, id)
    {
        if(this.items.find(instr=>instr.id===+id))
        {
            console.log("This product is already in the cart!");
            
        }
        else
        {
            console.log("adding to cart elem with id="+id);
            this.items.push({id:instrument.id,name:instrument.name,price:instrument.price})
        }
    }

    delete(id)
    {
            let instrIdx=this.items.findIndex(instr=>instr.id===+id);
            if(instrIdx!=-1)
            {
                this.items.splice(instrIdx,1);
                console.log("instrument with id "+id+" deleted!");
                console.log(this.items);
            }
    }
}