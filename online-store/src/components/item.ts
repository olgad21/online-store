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

  elements: {item: HTMLDivElement, itemButton: HTMLDivElement} = {
    item: document.createElement('div'),
    itemButton: document.createElement('div'),
  }

  draw() {
      //const item = document.createElement('div');
      this.elements.item.className = 'item';
      this.elements.item.classList.add('col-4');
  
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

      return this.elements.item
  }
}

export default Item;