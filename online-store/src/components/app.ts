import { StoreItems } from '../components/storeItems';
import { ItemInterface } from '../components/itemsData';

export class App {
  start(data: ItemInterface[]) {
    const filters = Array.from(document.querySelectorAll('input'));
    const filtersByCategory = filters.filter(filter => filter.name === 'categories');
    const filteredResults = new StoreItems(); 

    filtersByCategory.forEach(filter => {
      filter.addEventListener('click', () => {
        if (filter.checked) {
          filteredResults.applyFilters(filter);
        } else {
          filteredResults.elements.appliedFiltersByCategory =
            filteredResults.elements.appliedFiltersByCategory.filter(el => filter.id !== el);
        }

        filteredResults.initialize(data);
      });
    });

    filtersByCategory.forEach(filter => {
      if (filter.checked){
        filteredResults.applyFilters(filter);
      }
    });
    filteredResults.initialize(data);
  } 

}