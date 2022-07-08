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

  constructor(itemObj: ItemInterface){
    this.name = itemObj.name;
    this.description = itemObj.description;
    this.color = itemObj.color;
    this.category = itemObj.category;
    this.featured = itemObj.featured;
    this.inCart = itemObj.inCart;
    this.img = itemObj.img;
    this.date = itemObj.date;
    this.price = itemObj.price

  }
  draw() {

    // const allItems: HTMLDivElement[] = [];

    // items.forEach((itemObj: ItemInterface) => {
      const item = document.createElement('div');
      item.className = 'item';
  
      const itemName = document.createElement('h2');
      itemName.className = 'item__name';
      itemName.innerHTML = this.name;
      item.prepend(itemName);
  
      const itemImage = document.createElement('img');
      itemImage.className = 'item__img';
      itemImage.src = this.img;
      itemName.after(itemImage);

      if(this.description){
        const itemDesc = document.createElement('p');
        itemDesc.className = 'item__desc';
        itemDesc.innerHTML = this.description;
        itemImage.after(itemDesc);
      }
  
      const itemColor = document.createElement('p');
      itemColor.className = 'item__color';
      itemColor.innerHTML = `Color: ${this.color}`;
      itemName.after(itemColor);
  
      const itemDate = document.createElement('p');
      itemDate.className = 'item__date';
      itemDate.innerHTML = `Created: ${this.date}`;
      itemColor.after(itemDate);
  
      const itemPrice = document.createElement('p');
      itemPrice.className = 'item__price';
      itemPrice.innerHTML = `$${this.price}`;
      itemDate.after(itemPrice);

      return item

  }
}

export default Item;