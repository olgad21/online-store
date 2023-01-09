import { items } from '../components/itemsData';
import Item  from '../components/item';

const blueBowl = new Item(items[0]);

describe('Item class constructor should collect all the properties of initial data correctly', () => {
  test('is featured', () => {
    expect(blueBowl.featured).toBeTruthy();
  }) 
})