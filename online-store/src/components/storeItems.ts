import Item  from '../components/item';
import { ItemInterface } from '../components/itemsData';

export class StoreItems {

  elements: {items: HTMLDivElement[]} = {
    items: [],
  }

  initialize(data: ItemInterface[]) {
    const itemsContainer = document.querySelector('.items') as HTMLDivElement;

    if (itemsContainer) {
      this.elements.items = [];
    }

    itemsContainer?.append(...this.createItems(data));
  }

  createItems(itemsData: ItemInterface[]){
    let item;
    itemsData.forEach(itemObj => {
      item = new Item(itemObj);
      
      this.elements.items.push(item.draw());
    });

    return this.elements.items

  }
}