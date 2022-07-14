import { StoreItems } from '../components/storeItems';
import { ItemInterface } from '../components/itemsData';

export class App {
  start(data: ItemInterface[]) {
    
    const filtersCheckbox = Array.from(document.querySelectorAll('input[type=checkbox]')) as HTMLInputElement[];
    const filteredResults = new StoreItems(); 

    //Add Event listener to checkboxes
    filtersCheckbox.forEach(filter => {
      filter.addEventListener('click', () => {
        
        if (filter.checked) {
          filteredResults.addToFilters(filter);
        } else {
          filteredResults.elements.filters =
            filteredResults.elements.filters.filter(el => filter.id !== el.value);
        }

        console.log('clicked', filteredResults.elements.filters);

        filteredResults.applyFilters(data);
      });
    });

    filtersCheckbox.forEach(filter => {
      if (filter.checked){
        filteredResults.addToFilters(filter);
      }
    });

    filteredResults.elements.resultData = data;

    filteredResults.initialize(filteredResults.elements.resultData);
  

    //Add Event listener to search bar
    const filtersText = document.querySelector('input[type=text]') as HTMLInputElement;
    const resetBtn = document.querySelector('.reset-btn');

    filtersText.focus();
    filtersText.addEventListener('change', () => {
      filteredResults.remove();

      const searchRequest = filtersText.value.toLowerCase();
      filteredResults.elements.searchRequest = searchRequest;

      const searchData: ItemInterface[] = [];

      filteredResults.elements.resultData.forEach(dataObj => {
        if (dataObj.name.toLowerCase().includes(searchRequest.toLowerCase())){
          searchData.push(dataObj);
        }
      });

      filteredResults.elements.searchData = searchData;

      if(searchData.length === 0){
        filteredResults.showError();
      }

      filteredResults.initialize(searchData);
    });

    resetBtn?.addEventListener('click', () => {
      filteredResults.elements.searchRequest = filtersText.value = '';
      filteredResults.elements.searchData = [];
      filteredResults.applyFilters(data);
    })
  } 

}