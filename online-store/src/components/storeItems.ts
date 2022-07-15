import Item from '../components/item';
import { ItemInterface } from '../components/itemsData';

type Filter = {
  type: string,
  value: string
}

export class StoreItems {

  elements: {filters: Filter[], resultData: ItemInterface[], itemsContainer: HTMLDivElement, searchRequest: string, searchData: ItemInterface[]} = {
    filters: [],
    resultData: [],
    itemsContainer: document.getElementsByClassName('items-container')[0] as HTMLDivElement,
    searchRequest: '',
    searchData: [],
  }

  initialize(data: ItemInterface[]) {
    this.elements.itemsContainer?.append(...this.createItems(data));
  }

  remove(){
    while (this.elements.itemsContainer.firstChild) {
      this.elements.itemsContainer.removeChild(this.elements.itemsContainer.firstChild);
    }
  }

  createItems(itemsData: ItemInterface[]){
    return itemsData.map(itemObj => {
      const item = new Item(itemObj);
      
      return item.draw();
    }); 
  }

  addToFilters(filter: HTMLInputElement){
    this.elements.filters.push({ type: filter.name, value: filter.value }); 
  }    

  applyFilters(data: ItemInterface[]){
    this.remove();
    this.elements.resultData = [];

    const categories: string[] = [];
    const sizes: string[] = [];
    const colors: string[] = [];
    const featured: boolean[] = [];

    this.elements.filters.forEach(filter => {
      if (filter.type === 'category') {
        categories.push(filter.value)
      } else if (filter.type === 'color') {
        colors.push(filter.value)
      } else if (filter.type ==='featured'){
        featured.push(!!filter.value)
      } else {
        sizes.push(filter.value)
      } 
    })

    let res: ItemInterface[] = [...data];

    if (this.elements.searchData.length !== 0){
      res = this.elements.searchData;
    }

    if (featured.length !== 0){
      res = res.filter(el => {
        return featured.includes(el.featured);
      });
    }

    res = res.filter(el => {
      return categories.includes(el.category);
    });

    res = res.filter(el => {
      return colors.includes(el.color);
    });

    res = res.filter(el => {
      return sizes.includes(el.size);
    });

    if (res.length === 0){
      this.showError();
    }

    this.elements.resultData = [...res];
    
    this.initialize(this.elements.resultData);
    
  }

  showError(){
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-text');
    errorMessage.innerHTML = 'Sorry, no results found';
    this.elements.itemsContainer?.append(errorMessage);
  }
}