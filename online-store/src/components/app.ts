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

        console.log(filteredResults.elements.filters);

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
      
      filteredResults.elements.searchData = [];
      filteredResults.applyFilters(data);

      const searchRequest = filtersText.value.toLowerCase();
      filteredResults.elements.searchRequest = searchRequest;

      filteredResults.elements.resultData.forEach(dataObj => {
        if (dataObj.name.toLowerCase().includes(searchRequest.toLowerCase())){
          filteredResults.elements.searchData.push(dataObj);
        }
      });

      filteredResults.applyFilters(data);
    });

    resetBtn?.addEventListener('click', resetSearch);

    function resetSearch(){
      filtersText.value = '';
      filteredResults.elements.searchData = [];
      filteredResults.applyFilters(data);
    }

    //Add Range Filters
    const priceSliders = Array.from(document.querySelectorAll<HTMLInputElement>('#priceRange'));
    const yearSliders = Array.from(document.querySelectorAll<HTMLInputElement>('#yearRange'));

    const sliderMinPrice = document.querySelector<HTMLElement>('.filters__price-min-value') as HTMLElement;
    const sliderMaxPrice = document.querySelector<HTMLElement>('.filters__price-max-value') as HTMLElement;

    const sliderMinYear = document.querySelector<HTMLElement>('.filters__year-min-value') as HTMLElement;
    const sliderMaxYear = document.querySelector<HTMLElement>('.filters__year-max-value') as HTMLElement;

    function handleSlider(sliders: HTMLInputElement[], minValue:HTMLElement, maxValue:HTMLElement, outputArr: number[]){
      sliders[0].addEventListener('input', () => {
        if(+sliders[0].value > +sliders[1].value){
           sliders[1].value = sliders[0].value.toString();
         }
       });
       
       sliders[1].addEventListener('input', () => {
        if(+sliders[1].value < +sliders[0].value){
           sliders[0].value = sliders[1].value.toString();
         }
       });
       
       sliders.forEach((slider) => {
         slider.addEventListener('change', () => {
           minValue.innerHTML = `${sliders[0].value}`;
           maxValue.innerHTML = `${sliders[1].value}`;
           outputArr[0] = +sliders[0].value;
           outputArr[1] = +sliders[1].value;
           filteredResults.applyFilters(data);
         })
       });
    }

    handleSlider(priceSliders, sliderMinPrice, sliderMaxPrice, filteredResults.elements.priceRange);
    handleSlider(yearSliders, sliderMinYear, sliderMaxYear, filteredResults.elements.dateRange);

    //Add sorting

    const select = document.querySelector<HTMLSelectElement>('select');
    select?.addEventListener('change', (e) => {
      filteredResults.elements.sortType = (e.target as HTMLSelectElement).value;
      console.log(filteredResults.elements.sortType);
      filteredResults.applyFilters(data);
      
    });

  
    //RESET FILTERS
    // const resetFiltersBtn = document.querySelector('.reset-filters-btn');


    // //RESET All SETTINGS
    // const resetFiltersBtn = document.querySelector('.reset-settings-btn');
  } 
}