import { Cart } from '../components/cart';

jest.spyOn(document, 'querySelector').mockImplementation(() => {
  const mockParagraph = document.createElement('p');
  return mockParagraph;
});


describe('amount in cart increases', () => {
  let mockCart: Cart;

  beforeEach(() => {
    mockCart = new Cart(['a', 'b']);
  });

  test('increases amount in cart', () => {
    mockCart.increaseNumber();
    expect(mockCart.numberInCart).toBeGreaterThan(mockCart.itemsInCart.length);
    expect(+mockCart.numberInCartEl.innerHTML).toBeGreaterThan(mockCart.itemsInCart.length);
  })
})