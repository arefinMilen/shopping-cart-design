let label = document.getElementById("label");
let ShoppingCart= document.getElementById("Shopping-cart");
console.log(ShoppingCart);

let basket = JSON.parse(localStorage.getItem("data"))|| [];

let calculation = ()=> {
    let cartIcon = document.getElementById("cartAmount");
     cartIcon.innerHTML=basket.map((x) => x.item).reduce((x,y)=> x+y,0);

    
};
calculation();

let generateCartItem = ()=> {
    if(basket.length !== 0){
       return(ShoppingCart.innerHTML=basket.map((x)=>{
        console.log(x);
        let{id,item} = x;
        let search = shopItemData.find((y)=>y.id===id) || [];
        let {img,name,price} = search;

        return`
            <div class= "cart-item">
                <img width= "100" src=${img} alt="shoping images">
                <div class="details"> 
                    <div class="title-price-x">
                    <h4 class="title-price">
                    <p>${name}</p>
                    <p class="cart-item-price">$ ${price}</p>

                    </h4>
                    
                    <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>

                    <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus"></i>
                </div>
                <div>
                 <h3>
                 $ ${item*price}
                 </h3>
                </div>
                    </div>
            </div>`;}).join("")); 
        
    }
    else{

        ShoppingCart.innerHTML=``
        label.innerHTML= `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Go to Home</button>
        </a>
        `
       
    }
};
generateCartItem();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined)
    {
        basket.push({

        id: selectedItem.id,
        item:1,
        });
        
    }
    else
    {
        search.item+=1;
    }
    generateCartItem();
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(basket));
    // console.log(basket);
    
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) return;

    else if(search.item === 0) return;

    else
    {
        search.item-=1;
    }
    update(selectedItem.id);
    basket = basket.filter((x)=>x.item !== 0);
    generateCartItem();
    localStorage.setItem("data",JSON.stringify(basket));
   
    
};
let update = (id) => {
let search = basket.find((x)=>x.id ===id);

document.getElementById(id).innerHTML=search.item;
calculation();
totalAmount();

};

let removeItem = (id) =>
{
let selectedItem = id;
basket = basket.filter((x)=> x.id !== selectedItem.id);
generateCartItem();
totalAmount();
calculation();
localStorage.setItem("data",JSON.stringify(basket));
// console.log(selectedItem.id);
};

let clearCut=()=>
{
  basket = [];
  localStorage.setItem("data",JSON.stringify(basket));
   
  generateCartItem();
  calculation();
}
let totalAmount=()=>
{
 if(basket.length !== 0){
    let amount = basket.map((x)=>
    {
        let {item,id} = x;
        let search = shopItemData.find((y)=>y.id===id) || [];

        return item * search.price;
    }).reduce((x,y)=>x+y,0);

    // console.log(amount);
     label.innerHTML=`<h2> Total amount : $ ${amount}</h2>
     <button  class="checkOut"> Check Out </button>
    <button onclick="clearCut()" class="removeAll"> Clear Cart </button>
     `;

    
 }
 else return;
};
totalAmount();