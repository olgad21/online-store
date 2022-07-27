import { Cart } from './cart';
import Item from './item';
import { ItemInterface } from './itemsData';

type Filter = {
  type: string,
  value: string
}

export class StoreItems {

  elements: {
    filters: Required<Filter[]>,
    resultData: ItemInterface[],
    itemsContainer: HTMLDivElement,
    searchRequest: string,
    priceRange: number[],
    dateRange: number[],
    sortType: string,
    cart: Readonly<Cart>,
  } = {
      filters: JSON.parse(localStorage.getItem('checkboxFilters') as string) || [],
      resultData: [],
      itemsContainer: document.getElementsByClassName('items-container')[0] as HTMLDivElement,
      searchRequest: '',
      priceRange: JSON.parse(localStorage.getItem('priceRange') as string) || [0, 1000],
      dateRange: JSON.parse(localStorage.getItem('yearsRange') as string) || [1990, 2022],
      sortType: JSON.parse(localStorage.getItem('sortType') as string) || '',
      cart: new Cart(JSON.parse(localStorage.getItem('cart') as string) ?? []),
    }

  initialize(data: ItemInterface[]) {
    const itemDivs = this.createItems(data);
    this.elements.cart.setInitialCartValue();

    itemDivs.map(item => {
      item.addEventListener('click', this.handleCart);

      const itemName = (item.childNodes[1] as HTMLElement).innerHTML;

      if (this.elements.cart.itemsInCart.includes(itemName)) {
        item.classList.add('item--active');
        (item.childNodes[7] as HTMLElement).innerHTML = 'Added';

      }
    })

    this.elements.itemsContainer?.append(...itemDivs);
  }

  remove() {
    while (this.elements.itemsContainer.firstChild) {
      this.elements.itemsContainer.removeChild(this.elements.itemsContainer.firstChild);
    }
  }

  createItems(itemsData: ItemInterface[]) {
    return itemsData.map(itemObj => {
      const item = new Item(itemObj);
      return item.draw();
    });
  }

  addToFilters(filter: HTMLInputElement) {
    this.elements.filters.push({ type: filter.name, value: filter.value });
  }

  applyFilters(data: ItemInterface[]) {
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
      } else if (filter.type === 'featured') {
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

    if (this.elements.sortType) {
      switch (this.elements.sortType) {
        case 'name-a':
          res.sort(function (a, b) {
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
          res.sort(function (a, b) {
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
          res.sort(function (a, b) {
            return a.price - b.price;
          });
          break;

        case 'price-highest':
          res.sort(function (a, b) {
            return b.price - a.price;
          });
          break;
      }
    }

    if (featured.length !== 0) {
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

    if (!res.length) {
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

  handleCart = (e: Event) => {
    const target = e.target as Element;

    // if item is in the cart
    if (target.classList.contains('item')) {
      if (target.classList.contains('item--active')) {
        target.classList.remove('item--active');
        const itemName = (target.childNodes[1] as HTMLElement).innerHTML;
        this.elements.cart.decreaseNumber();
        this.elements.cart.itemsInCart.splice(this.elements.cart.itemsInCart.indexOf(itemName), 1);
        localStorage.setItem('cart', JSON.stringify(this.elements.cart.itemsInCart));
        (target.childNodes[7] as HTMLElement).innerHTML = 'Add to cart';
        return
      }
    } else {
      if ((target.parentNode as HTMLDivElement)?.classList.contains('item--active')) {
        (target.parentNode as HTMLElement)?.classList.remove('item--active');
        const itemName = ((target.parentNode as HTMLElement)?.childNodes[1] as HTMLElement).innerHTML;
        this.elements.cart.decreaseNumber();
        this.elements.cart.itemsInCart.splice(this.elements.cart.itemsInCart.indexOf(itemName), 1);
        localStorage.setItem('cart', JSON.stringify(this.elements.cart.itemsInCart));
        ((target.parentNode as HTMLElement)?.childNodes[7] as HTMLElement).innerHTML = 'Add to cart';
        return
      }
    }

    //if item is not in the cart

    if (this.elements.cart.numberInCart === 9) {
      this.elements.cart.createPopup();
      return
    }

    if (target.classList.contains('item')) {
      if (!target.classList.contains('item--active')) {
        target.classList.add('item--active');
        this.elements.cart.increaseNumber();
        const itemName = (target.childNodes[1] as HTMLElement).innerHTML;
        this.elements.cart.itemsInCart.push(itemName);
        localStorage.setItem('cart', JSON.stringify(this.elements.cart.itemsInCart));
        (target.childNodes[7] as HTMLElement).innerHTML = 'Added';
        return
      }
    }

    if (!target.classList.contains('item')) {
      if (!(target.parentNode as HTMLDivElement)?.classList.contains('item--active')) {
        (target.parentNode as HTMLDivElement)?.classList.add('item--active');
        this.elements.cart.increaseNumber();
        const itemName = ((target.parentNode as HTMLDivElement)?.childNodes[1] as HTMLElement).innerHTML;
        this.elements.cart.itemsInCart.push(itemName);
        localStorage.setItem('cart', JSON.stringify(this.elements.cart.itemsInCart));
        ((target.parentNode as HTMLDivElement)?.childNodes[7] as HTMLElement).innerHTML = 'Added';
        return
      }
    }
  }
}
