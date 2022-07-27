import { Cart } from '../components/cart';

jest.spyOn(document, 'querySelector').mockImplementation(() => {
  const mockParagraph = document.createElement('p');
  return mockParagraph;
});

describe('Test cart', () => {
  let mockCart: Cart;

  beforeEach(() => {
    mockCart = new Cart(['a', 'b']);
  });

  test('amount in cart should increase', () => {
    mockCart.increaseNumber();
    expect(mockCart.numberInCart).toBeGreaterThan(mockCart.itemsInCart.length);
    expect(+mockCart.numberInCartEl.innerHTML).toBeGreaterThan(mockCart.itemsInCart.length);
  });

  test('amount in cart should be positive', () => {
    mockCart.decreaseNumber();
    expect(mockCart.numberInCart).toBeGreaterThanOrEqual(0);
  })
})