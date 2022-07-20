import './cart.css';
// import { items } from './itemsData';
export class Cart {

  numberInCartEl: Element;
  numberInCart: number;
  itemsInCart: string[];

  constructor(itemsInCart: string[]) {
    this.numberInCartEl = document.querySelector('.shopping-card__number') as Element;
    this.itemsInCart = itemsInCart;
    this.numberInCart = itemsInCart.length;
  }

  setInitialCartValue() {
    this.numberInCartEl.innerHTML = String(this.numberInCart);
  }

  increaseNumber() {
    this.numberInCart += 1;
    this.numberInCartEl.innerHTML = String(this.numberInCart);
  }

  decreaseNumber() {
    this.numberInCart -= 1;
    this.numberInCartEl.innerHTML = String(this.numberInCart);
  }

  createPopup() {
    const limitPopup = document.createElement('div');
    document.body.append(limitPopup);
    limitPopup.className = 'cart__popup';

    const limitMessage = document.createElement('div');
    limitMessage.classList.add('cart__popup-message');
    limitPopup.append(limitMessage);

    limitMessage.innerHTML = 'Your cart is full!';

    limitPopup.addEventListener('click', () => {
      limitPopup.classList.add('cart__popup--inactive')
    })
  }
}