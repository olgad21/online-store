import Item from '../components/item';
import { ItemInterface } from '../components/itemsData';

export class StoreItems {

  elements: {appliedFiltersByCategory: string[], resultData: ItemInterface[]} = {
    appliedFiltersByCategory: [],
    resultData: []
  }

  initialize(data: ItemInterface[]) {
    const itemsContainer = document.getElementsByClassName('items-container')[0] as HTMLDivElement;

    this.elements.resultData = [];
    itemsContainer?.replaceChildren();

    this.elements.appliedFiltersByCategory.forEach(filter => {
      const itemsFilteredByCategory = data.filter(dataObj => dataObj.category === filter);
      this.elements.resultData = this.elements.resultData.concat(itemsFilteredByCategory);
    });

    itemsContainer?.append(...this.createItems(this.elements.resultData));
  }

  createItems(itemsData: ItemInterface[]){
    return itemsData.map(itemObj => {
      const item = new Item(itemObj);
      
      return item.draw();
    }); 
  }

  applyFilters(filter: HTMLInputElement){
    this.elements.appliedFiltersByCategory.push(filter.id); 
  }    
  // applySearchResult(){

  // }
}