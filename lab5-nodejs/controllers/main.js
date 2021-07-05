const Instrument = require("../models/instrument");
const Cart = require("../models/my_cart");

exports.listInstruments = (req, res, next) => {
    
    req.session.isLoggedIn = true;
    req.session.purchaseSuccess = false;
    req.session.purchaseFail = false;
    req.session.cartCleared=false;

  
    Instrument.getAll()
      .then(([instruments_list]) => {
        res.render("shop", {instruments: instruments_list});
      }).catch((err) => console.log(err));
  };



  exports.getCart = (req,res,next)=>
  {
    
    if(req.session.purchaseSuccess===null) req.session.purchaseSuccess=false;
    if(req.session.purchaseFail===null)req.session.purchaseFail=false;
    if(req.session.cartCleared===null)req.session.cartCleared=false;


    //fill cart
    
    var cart = new Cart({});

    
  Instrument.getAll().then(([elems]) => {
    console.log(elems);
    if (req.session.cart!=null) {
      for (elem of elems) {
        if (req.session.cart.items.find((x) => x.id === elem.id)) {
          cart.add(elem, elem.id);
        }
      }
    }

    var temp_cart = new Cart(req.session.cart?req.session.cart:{});
    console.log(temp_cart.items.length.toString()+"---"+cart.items.length.toString());
    
    if(temp_cart.items.length!=cart.items.length)req.session.refreshFail=true;
    else req.session.refreshFail=false;

    req.session.cart = cart;
    
    res.render("my_cart",
    {
      instruments_in_cart:req.session.cart.items,
      purchaseSuccess:req.session.purchaseSuccess,
      purchaseFail:req.session.purchaseFail,
      cartCleared:req.session.cartCleared,
      refreshFail:req.session.refreshFail
    }
    )

  }
  )

    
  }

  exports.postCart = (req,res,next)=>
  {

    let id=req.body.instrument_id;
    
    var cart=new Cart(req.session.cart?req.session.cart:{});

    //get instrument from db by id and add it to a cart

    Instrument.getProdByID(id)
    .then(([[elem]]) => {
      cart.add(elem, id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect("/");
    })
    .catch((err) => console.log(err));

    

  }

  exports.postCartDelItem=(req,res,next)=>
  {
    var cart = new Cart(req.session.cart);
    cart.delete(req.body.instrument_id);
    req.session.purchaseFail=false;
    res.redirect("/shopping_cart");
  }

  exports.clearShoppingCart=(req,res,next)=>
  {
    var cart = new Cart({});
    req.session.cart=cart;
    req.session.purchaseFail=false;
    req.session.cartCleared=true;
    res.redirect("/shopping_cart");
  }

  exports.finalizeShopping=(req,res,next)=>
  {
  

    let cart=new Cart({});
    var idsToDelete= [];

    //check if selected items still exist in db
    Instrument.getAll()
    .then(([elems]) => {
      for (elem of elems) {
        if (req.session.cart.items.find((x) => x.id === elem.id)) {
          cart.add(elem, elem.id);
          idsToDelete.push(elem.id);
        }
      }

      if(req.session.cart.items.length===idsToDelete.length){
        console.log("all items all available for purchase!"+idsToDelete);
        
        Instrument.delByIDs(idsToDelete).then(()=>
        {
          req.session.cart=new Cart({});
          req.session.purchaseSuccess=true;
          req.session.purchaseFail=false;
          res.redirect("/shopping_cart");
        }).catch((err) => console.log(err));
      }
      else{
        console.log("some of selected items were bought by other user, they are about to be deleted from cart");
        req.session.purchaseFail=true;
        req.session.cart=cart;

        res.redirect('/shopping_cart'); 
      }

    }).catch((err) => console.log(err));

  }
