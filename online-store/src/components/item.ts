import { ItemInterface } from '../components/itemsData';
import { Cart } from '../components/cart';
import './item.css';

class Item {
  name: string;
  description?: string;
  color: string;
  category: string;
  featured: boolean;
  inCart: boolean;
  img: string;
  date: number;
  price: number;
  size: string;

  constructor(itemObj: ItemInterface){
    this.name = itemObj.name;
    this.description = itemObj.description;
    this.color = itemObj.color;
    this.category = itemObj.category;
    this.featured = itemObj.featured;
    this.inCart = itemObj.inCart;
    this.img = itemObj.img;
    this.date = itemObj.date;
    this.price = itemObj.price;
    this.size = itemObj.size;

  }

  elements: {item: HTMLDivElement, itemButton: HTMLDivElement} = {
    item: document.createElement('div'),
    itemButton: document.createElement('div'),
  }

  draw() {
      //const item = document.createElement('div');
      this.elements.item.className = 'item';
      this.elements.item.classList.add('col-4');

      // const itemBody = document.createElement('div');
      // itemBody.classList.add('card-body');
  
      const itemImage = document.createElement('img');
      itemImage.className = 'item__img';
      itemImage.src = this.img;
      itemImage.classList.add('card-img-top');

      this.elements.item.prepend(itemImage);
      // itemImage.after(itemBody);

      const itemName = document.createElement('h2');
      itemName.className = 'item__name';
      itemName.innerHTML = this.name;
      itemName.classList.add('card-title');
      itemImage.after(itemName);
  
      const itemColor = document.createElement('p');
      itemColor.className = 'item__color';
      itemColor.innerHTML = `Color: ${this.color}`;
      itemColor.classList.add('card-text');
      itemName.after(itemColor);
  
      const itemDate = document.createElement('p');
      itemDate.className = 'item__date';
      itemDate.innerHTML = `Created: ${this.date}`;
      itemDate.classList.add('card-text');
      itemColor.after(itemDate);
  
      const itemPrice = document.createElement('p');
      itemPrice.className = 'item__price';
      itemPrice.innerHTML = `$${this.price}`;
      itemPrice.classList.add('card-text');
      itemDate.after(itemPrice);

      const itemSize = document.createElement('p');
      itemSize.className = 'item__size';
      itemSize.innerHTML = `Size: ${this.size}`;
      itemSize.classList.add('card-text');
      itemPrice.after(itemSize);

      const itemFeatured = document.createElement('p');
      itemFeatured.className = 'item__featured';
      if (this.featured === true){
        itemFeatured.innerHTML = 'Featured: yes';
      } else {
        itemFeatured.innerHTML = 'Featured: no';
      }
      itemFeatured.classList.add('card-text');
      itemSize.after(itemFeatured);

      //const itemButton = document.createElement('div');
      this.elements.itemButton.classList.add('btn', 'btn-dark');
      this.elements.itemButton.innerHTML = 'Add to cart';
      itemFeatured.after(this.elements.itemButton);

      
      this.elements.item.addEventListener('click', this.handleCart);

      return this.elements.item

  }

  handleCart(e:Event){
    const cart = new Cart();

    console.log('click');
    const target = e.target as Element; //куда кликнули
    console.log(cart.numberInCart);

    // if item is in the cart
    if (target.classList.contains('item--active') || (target.parentNode as HTMLDivElement)?.classList.contains('item--active')){
      
      target.classList.remove('item--active');
      (target.parentNode as HTMLElement)?.classList.remove('item--active');
      cart.decreaseNumber();
      return
    }

    //if item is not in the cart

    if (cart.numberInCart === 4){
      console.log('limit');
      cart.createPopup();
      return
    }

    if (target.classList.contains('item')){
      if (!target.classList.contains('item--active')){
        target.classList.add('item--active');
        cart.increaseNumber();
        return
      }
    }

    if (!target.classList.contains('item')){
      if (!(target.parentNode as HTMLDivElement)?.classList.contains('item--active')){
        (target.parentNode as HTMLDivElement)?.classList.add('item--active');
        cart.increaseNumber();
        return
      }
    }
    console.log(cart.numberInCart);
  }
}

export default Item;