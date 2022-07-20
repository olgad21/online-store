import { items } from '../components/itemsData';

const blueBowl = items[0];

describe('blueBowl', () => {
  test('is featured', () => {
    expect(blueBowl.featured).toBeTruthy();
  }) 
})