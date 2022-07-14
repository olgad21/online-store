import { ItemInterface } from '../components/itemsData';
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

  draw() {
      const item = document.createElement('div');
      item.className = 'item';
      item.classList.add('col-4');

      const itemBody = document.createElement('div');
      itemBody.classList.add('card-body');
  
      const itemImage = document.createElement('img');
      itemImage.className = 'item__img';
      itemImage.src = this.img;
      itemImage.classList.add('card-img-top');

      item.prepend(itemImage);
      itemImage.after(itemBody);

      const itemName = document.createElement('h2');
      itemName.className = 'item__name';
      itemName.innerHTML = this.name;
      itemName.classList.add('card-title');
      itemBody.prepend(itemName);
  
      const itemColor = document.createElement('p');
      itemColor.className = 'item__color';
      itemColor.innerHTML = `Color: ${this.color}`;
      itemColor.classList.add('card-text');
      itemName.after(itemColor);
  
      const itemDate = document.createElement('p');
      itemDate.className = 'item__date';
      itemDate.innerHTML = `Created: ${this.date}`;
      item.classList.add('card-text');
      itemColor.after(itemDate);
  
      const itemPrice = document.createElement('p');
      itemPrice.className = 'item__price';
      itemPrice.innerHTML = `$${this.price}`;
      itemDate.classList.add('card-text');
      itemDate.after(itemPrice);

      const itemSize = document.createElement('p');
      itemPrice.className = 'item__size';
      itemPrice.innerHTML = `Size: ${this.size}`;
      itemDate.classList.add('card-text');
      itemPrice.after(itemSize);

      const itemButton = document.createElement('div');
      itemButton.classList.add('btn', 'btn-dark');
      itemButton.innerHTML = 'Add to cart';
      itemPrice.after(itemButton);

      return item

  }
}

export default Item;