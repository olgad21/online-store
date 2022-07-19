import { Cart } from '../components/cart';
import Item from '../components/item';
import { ItemInterface } from '../components/itemsData';

type Filter = {
  type: string,
  value: string
}

export class StoreItems {

  elements: {
    filters: Filter[], 
    resultData: ItemInterface[], 
    itemsContainer: HTMLDivElement, 
    searchRequest: string, 
    searchData: ItemInterface[], 
    priceRange: number[], 
    dateRange: number[],
    sortType: string,
    cart: Cart,
  } = {
    filters: JSON.parse(window.localStorage.getItem('checkboxFilters') as string) || [], //
    // filters: [],
    resultData: [],
    itemsContainer: document.getElementsByClassName('items-container')[0] as HTMLDivElement,
    searchRequest: '',
    searchData: [],
    priceRange: [0, 1000], //
    dateRange: [1990, 2022], //
    sortType: JSON.parse(window.localStorage.getItem('sortType') as string) || '', //
    cart: new Cart() //
  }

  initialize(data: ItemInterface[]) {
    const itemDivs = this.createItems(data);

    itemDivs.map(item => {
      item.addEventListener('click', this.handleCart);

      const itemName = (item.childNodes[1] as HTMLElement).innerHTML;
      if (this.elements.cart.itemsInCart.includes(itemName)){
        item.classList.add('item--active');
      }
    })
    
    this.elements.itemsContainer?.append(...itemDivs);
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

    if (this.elements.searchRequest) {
      res = res.filter(dataObj => {
        return dataObj.name.toLowerCase().includes(this.elements.searchRequest.toLowerCase());
      });
    }

    if (this.elements.sortType){
      switch (this.elements.sortType){
        case 'name-a':
        res.sort(function(a, b){
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        break;

        case 'name-z':
        res.sort(function(a, b){
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });
        break;

        case 'price-lowest':
        res.sort(function(a, b){
          return a.price - b.price;
        });
        break;

        case 'price-highest':
        res.sort(function(a, b){
          return b.price - a.price;
        });
        break;
      }
    }

    if (featured.length !== 0){
      res = res.filter(el => {
        return featured.includes(el.featured);
      });
    }

    res = res.filter(el => {
      return el.price <= this.elements.priceRange[1] && el.price >= this.elements.priceRange[0];
    });

    res = res.filter(el => {
      return el.date <= this.elements.dateRange[1] && el.date >= this.elements.dateRange[0];
    });

    res = res.filter(el => {
      return categories.includes(el.category);
    });

    res = res.filter(el => {
      return colors.includes(el.color);
    });

    res = res.filter(el => {
      return sizes.includes(el.size);
    });

    if (res.length === 0) {
      this.showError();
    }

    this.elements.resultData = [...res];
    
    this.initialize(this.elements.resultData);
    
  }

  showError() {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-text');
    errorMessage.innerHTML = 'Sorry, no results found';
    this.elements.itemsContainer?.append(errorMessage);
  }

  handleCart = (e:Event) => {
    const cart = new Cart();
    const target = e.target as Element; //куда кликнули
  
    // if item is in the cart
    if (target.classList.contains('item')){
      if (target.classList.contains('item--active')){
        target.classList.remove('item--active');
        const itemName = (target.childNodes[1] as HTMLElement).innerHTML;
        this.elements.cart.decreaseNumber();
        this.elements.cart.itemsInCart.splice(this.elements.cart.itemsInCart.indexOf(itemName), 1);
        console.log(this.elements.cart.itemsInCart);
        return
      }
    } else {
      if ((target.parentNode as HTMLDivElement)?.classList.contains('item--active')){
      (target.parentNode as HTMLElement)?.classList.remove('item--active');
      const itemName = ((target.parentNode as HTMLElement)?.childNodes[1] as HTMLElement).innerHTML;
      this.elements.cart.decreaseNumber();
      this.elements.cart.itemsInCart.splice(this.elements.cart.itemsInCart.indexOf(itemName), 1);
      console.log(this.elements.cart.itemsInCart);
      return
    }
  }

    //if item is not in the cart

    if (cart.numberInCart === 10){
      cart.createPopup();
      return
    }

    if (target.classList.contains('item')){
      if (!target.classList.contains('item--active')){
        target.classList.add('item--active');
        this.elements.cart.increaseNumber();
        const itemName = (target.childNodes[1] as HTMLElement).innerHTML;
        this.elements.cart.itemsInCart.push(itemName);
        console.log(this.elements.cart.itemsInCart);
        return
      }
    }

    if (!target.classList.contains('item')){
      if (!(target.parentNode as HTMLDivElement)?.classList.contains('item--active')){
        (target.parentNode as HTMLDivElement)?.classList.add('item--active');
        this.elements.cart.increaseNumber();
        const itemName = ((target.parentNode as HTMLDivElement)?.childNodes[1] as HTMLElement).innerHTML;
        this.elements.cart.itemsInCart.push(itemName);
        console.log(this.elements.cart.itemsInCart);
        return
      }
    }
  }
}
