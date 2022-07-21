import { App } from '../components/app';
import { items } from '../components/itemsData';

const app = new App();
describe('Test app', () => {
  test('should clear all custom settings', () => {
    app.resetAllSettings();
    expect(localStorage.clear).toHaveBeenCalledTimes(1);
    expect(localStorage.__STORE__).toEqual({}); 
    expect(localStorage.length).toBe(0);
  });

  test('should draw range slider', () => {
    const mockSliders: HTMLInputElement[] = [];

    for (let i = 0; i < 2; i++){
      mockSliders.push(document.createElement('input'))
    }

    const mockMinValue = document.createElement('p');
    const mockMaxValue = document.createElement('p');

    const mockOutput: number[] = [20, 40];

    app.drawSlider(mockSliders, mockMinValue, mockMaxValue, mockOutput);

    expect([+mockMinValue.innerHTML, +mockMaxValue.innerHTML]).toEqual(mockOutput);
  })
})