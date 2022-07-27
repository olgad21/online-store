import { StoreItems } from './storeItems';
import { ItemInterface } from './itemsData';

export class App {
  filteredResults: StoreItems = new StoreItems();

  priceSliders = Array.from(document.querySelectorAll<HTMLInputElement>('#priceRange'));
  yearSliders = Array.from(document.querySelectorAll<HTMLInputElement>('#yearRange'));
  sliderMinPrice = document.querySelector<HTMLElement>('.filters__price-min-value') as HTMLElement;
  sliderMaxPrice = document.querySelector<HTMLElement>('.filters__price-max-value') as HTMLElement;
  sliderMinYear = document.querySelector<HTMLElement>('.filters__year-min-value') as HTMLElement;
  sliderMaxYear = document.querySelector<HTMLElement>('.filters__year-max-value') as HTMLElement;


  start(data: ItemInterface[]) {
    const filtersCheckbox = Array.from(document.querySelectorAll('input[type=checkbox]')) as HTMLInputElement[];

    // Add Event listener to checkboxes
    filtersCheckbox.forEach(filter => {
      filter.addEventListener('click', () => {
        if (filter.checked) {
          this.filteredResults.addToFilters(filter);
        } else {
          this.filteredResults.elements.filters =
            this.filteredResults.elements.filters.filter(el => filter.id !== el.value);
        }

        localStorage.setItem('checkboxFilters', JSON.stringify(this.filteredResults.elements.filters));
        this.filteredResults.applyFilters(data);
      });
    });

    if (!this.filteredResults.elements.filters.length) {
      filtersCheckbox.forEach(filter => {
        if (filter.checked) {
          this.filteredResults.addToFilters(filter);
        }
      });
    }

    this.filteredResults.elements.resultData = data;

    // Set checkbox filter's values
    filtersCheckbox.forEach(filter => {
      const find = this.filteredResults.elements.filters.find(storedFilter => {
        return storedFilter.value === filter.value;
      });

      filter.checked = !!find;
    })

    this.filteredResults.applyFilters(data);

    //Add Event listener to search bar
    const filtersText = document.getElementById('search') as HTMLInputElement;
    const resetBtn = document.querySelector('.reset-btn');

    filtersText.focus();
    filtersText.addEventListener('input', () => {

      const searchRequest = filtersText.value.toLowerCase();
      this.filteredResults.elements.searchRequest = searchRequest;

      this.filteredResults.applyFilters(data);
    });

    resetBtn?.addEventListener('click', () => this.resetSearch(data, filtersText));


    //Add Event listener to Range Filters

    this.drawSlider(this.priceSliders, this.sliderMinPrice, this.sliderMaxPrice, this.filteredResults.elements.priceRange);
    this.drawSlider(this.yearSliders, this.sliderMinYear, this.sliderMaxYear, this.filteredResults.elements.dateRange);

    this.handleSlider(this.priceSliders, this.sliderMinPrice, this.sliderMaxPrice, this.filteredResults.elements.priceRange, 'priceRange', data);
    this.handleSlider(this.yearSliders, this.sliderMinYear, this.sliderMaxYear, this.filteredResults.elements.dateRange, 'yearsRange', data);

    //Add sorting

    this.filteredResults.applyFilters(data);

    const select = document.querySelector<HTMLSelectElement>('select');
    select?.addEventListener('change', (e) => {
      this.filteredResults.elements.sortType = (e.target as HTMLSelectElement).value;
      localStorage.setItem('sortType', JSON.stringify(this.filteredResults.elements.sortType));
      this.filteredResults.applyFilters(data);
    });

    if (select) {
      select.value = this.filteredResults?.elements.sortType || 'default';
    }

    //Handle Cart
    const itemsDiv = Array.from(document.querySelectorAll('.item')) as HTMLDivElement[];

    itemsDiv.forEach(itemDiv => {
      itemDiv.addEventListener('click', this.filteredResults.handleCart)
    });

    //RESET FILTERS
    const resetFiltersBtn = document.querySelector('.reset-filters-btn');
    resetFiltersBtn?.addEventListener('click', () => this.resetFilters(filtersCheckbox, data));

    //RESET All SETTINGS
    const resetSetsBtn = document.querySelector('.reset-settings-btn');
    resetSetsBtn?.addEventListener('click', this.resetAllSettings);
  }

  resetAllSettings() {
    localStorage.clear();
    window.location.reload();
  }

  drawSlider(sliders: HTMLInputElement[], minValue: HTMLElement, maxValue: HTMLElement, outputArr: number[]) {
    sliders[0].value = outputArr[0].toString();
    sliders[1].value = outputArr[1].toString();

    minValue.innerHTML = sliders[0].value;
    maxValue.innerHTML = sliders[1].value;
  }

  handleSlider(sliders: HTMLInputElement[], minValue: HTMLElement, maxValue: HTMLElement, outputArr: number[], storeName: string, data: ItemInterface[]) {
    sliders[0].addEventListener('input', () => {
      if (+sliders[0].value > +sliders[1].value) {
        sliders[1].value = sliders[0].value;
      }
    });

    sliders[1].addEventListener('input', () => {
      if (+sliders[1].value < +sliders[0].value) {
        sliders[0].value = sliders[1].value;
      }
    });

    sliders.forEach((slider) => {
      slider.addEventListener('change', () => {
        minValue.innerHTML = sliders[0].value;
        maxValue.innerHTML = sliders[1].value;
        outputArr[0] = +sliders[0].value;
        outputArr[1] = +sliders[1].value;
        localStorage.setItem(storeName, JSON.stringify(outputArr));
        this.filteredResults.applyFilters(data);
      })
    });
  }

  resetSlider(sliders: HTMLInputElement[], minValue: HTMLElement, maxValue: HTMLElement, outputArr: number[], storeName: string, data: ItemInterface[]) {
    sliders[0].value = minValue.innerHTML = sliders[0].min;
    sliders[1].value = maxValue.innerHTML = sliders[1].max;
    outputArr[0] = +sliders[0].value;
    outputArr[1] = +sliders[1].value;
    localStorage.setItem(storeName, JSON.stringify(outputArr));
    this.filteredResults.applyFilters(data);
  }

  resetFilters(checkboxes: HTMLInputElement[], data: ItemInterface[]) {
    this.filteredResults.elements.filters = [];

    checkboxes.forEach(filter => {
      if (filter.name === 'featured') {
        filter.checked = false;
      } else {
        filter.checked = true;
      }
      if (filter.checked) {
        this.filteredResults.addToFilters(filter);
      }
    });

    this.resetSlider(this.priceSliders, this.sliderMinPrice, this.sliderMaxPrice, this.filteredResults.elements.priceRange, 'priceRange', data);
    this.resetSlider(this.yearSliders, this.sliderMinYear, this.sliderMaxYear, this.filteredResults.elements.dateRange, 'yearsRange', data);

    this.filteredResults.applyFilters(data);
    localStorage.setItem('checkboxFilters', JSON.stringify(this.filteredResults.elements.filters));
  }

  resetSearch(data: ItemInterface[], searchBar: HTMLInputElement) {
    searchBar.value = '';
    this.filteredResults.elements.searchRequest = '';
    this.filteredResults.applyFilters(data);
  }
}