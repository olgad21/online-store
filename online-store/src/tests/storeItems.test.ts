import { StoreItems } from '../components/storeItems';
import { items } from '../components/itemsData';

const store = new StoreItems();

describe('Test StoreItems class', () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test('createItems method should return array of HTMLDiv', () => {
    expect(store.createItems(items)).toBeDefined();
  
    let result = store.createItems(items);
    expect(typeof result[0]).toBe('object');
  });

  test('initializing should work correctly', () => {
    store.elements.resultData = [...items];
    expect(store.elements.resultData).toHaveLength(items.length);
  });

  test('should add filters properly', () => {
    const input1 = document.createElement('input');
    input1.value = 'Bowls';
    input1.name = 'category';

    const input2 = document.createElement('input');
    input2.value = 'White';
    input2.name = 'color';

    const input3 = document.createElement('input');
    input3.value = 'Medium';
    input3.name = 'size';

    store.addToFilters(input1);
    store.addToFilters(input2);
    store.addToFilters(input3);

    expect(store.elements.filters).toEqual(
      [{ type: 'category', value: 'Bowls' }, { type: 'color', value: 'White' }, { type: 'size', value: 'Medium' }]
    );
  });

  test('should apply filters properly', () => {
    jest.spyOn(store, 'remove').mockImplementation(() => null);
    jest.spyOn(store.elements.cart, 'setInitialCartValue').mockImplementation(() => null);

    store.applyFilters(items);

    expect(store.remove).toHaveBeenCalled();
    expect(store.elements.resultData[0].category).toBe('Bowls');
    expect(store.elements.resultData[0].color).toBe('White');
    expect(store.elements.resultData[0].size).toBe('Medium');
  });

  test('should clear items container', () => {
    store.elements.itemsContainer = document.createElement('div');
    const mockInnerContainer = document.createElement('div');
    for (let i = 0; i <= 15; i++){
      store.elements.itemsContainer.append(mockInnerContainer);
    };

    store.remove();

    expect(store.elements.itemsContainer.childNodes).toHaveLength(0);
  })
})

