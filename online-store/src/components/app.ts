import { StoreItems } from '../components/storeItems';
import { ItemInterface } from '../components/itemsData';
import { Cart } from './cart';

export class App {
  start(data: ItemInterface[]) {
    const filtersCheckbox = Array.from(document.querySelectorAll('input[type=checkbox]')) as HTMLInputElement[];
    const filteredResults = new StoreItems(); 
    filteredResults.elements.cart = new Cart();

    // Add Event listener to checkboxes
    filtersCheckbox.forEach(filter => {
      filter.addEventListener('click', () => {
        if (filter.checked) {
          filteredResults.addToFilters(filter);
        } else {
          filteredResults.elements.filters =
            filteredResults.elements.filters.filter(el => filter.id !== el.value);
        }

        filteredResults.applyFilters(data);
      });
    });

   filtersCheckbox.forEach(filter => {
      if (filter.checked){
        filteredResults.addToFilters(filter);
      }
   });
 
   filteredResults.elements.resultData = data;

  //  filtersCheckbox.forEach(filter => {
  //   filteredResults.elements.filters.forEach(storedFilter => {
  //     if (storedFilter.value === filter.value){
  //       filter.checked = true;
  //     } else {
  //       filter.checked = false;
  //     }
  //   })
  // })

   filteredResults.applyFilters(data);

   console.log(filteredResults.elements.filters);
   //window.localStorage.setItem('checkboxFilters', JSON.stringify(filteredResults.elements.filters));
  

    //Add Event listener to search bar
    const filtersText = document.getElementById('search') as HTMLInputElement;
    const resetBtn = document.querySelector('.reset-btn');

    filtersText.focus();
    filtersText.addEventListener('change', () => {
      
      const searchRequest = filtersText.value.toLowerCase();
      filteredResults.elements.searchRequest = searchRequest;

      filteredResults.applyFilters(data);
    });

    resetBtn?.addEventListener('click', resetSearch);

    function resetSearch(){
      filtersText.value = '';
      filteredResults.elements.searchRequest = '';
      // filteredResults.elements.searchData = [];
      filteredResults.applyFilters(data);
    }

    //Add Event listener to Range Filters
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

    function resetSlider(sliders: HTMLInputElement[], minValue:HTMLElement, maxValue:HTMLElement, outputArr: number[]){
      sliders[0].value = minValue.innerHTML = `${sliders[0].min}`;
      sliders[1].value = maxValue.innerHTML = `${sliders[1].max}`;
      outputArr[0] = +sliders[0].value;
      outputArr[1] = +sliders[1].value;
      filteredResults.applyFilters(data);
    }

    handleSlider(priceSliders, sliderMinPrice, sliderMaxPrice, filteredResults.elements.priceRange);
    handleSlider(yearSliders, sliderMinYear, sliderMaxYear, filteredResults.elements.dateRange);

    //Add sorting

    const select = document.querySelector<HTMLSelectElement>('select');
    select?.addEventListener('change', (e) => {
      filteredResults.elements.sortType = (e.target as HTMLSelectElement).value;
      window.localStorage.setItem('sortType', JSON.stringify(filteredResults.elements.sortType));
      filteredResults.applyFilters(data);
    });

    if (select){
      select.value = filteredResults?.elements.sortType || 'default';
    }
    
    //Handle Cart
    const itemsDiv = Array.from(document.querySelectorAll('.item')) as HTMLDivElement[];

    itemsDiv.forEach(itemDiv => {
      itemDiv.addEventListener('click', filteredResults.handleCart)
    });

  
    //RESET FILTERS
    const resetFiltersBtn = document.querySelector('.reset-filters-btn');
    resetFiltersBtn?.addEventListener('click', resetFilters);
    
    function resetFilters(){
      filteredResults.elements.filters = [];

      filtersCheckbox.forEach(filter => {
        if (filter.name === 'featured'){
          filter.checked = false;
        } else {
          filter.checked = true;
        }
        if (filter.checked){
          filteredResults.addToFilters(filter);
        }
     });

     resetSlider(priceSliders, sliderMinPrice, sliderMaxPrice, filteredResults.elements.priceRange);
     resetSlider(yearSliders, sliderMinYear, sliderMaxYear, filteredResults.elements.dateRange);

    filteredResults.applyFilters(data);
    }


    // //RESET All SETTINGS
    // const resetFiltersBtn = document.querySelector('.reset-settings-btn');
  } 
}