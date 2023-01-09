import asset1 from '../assets/tg_image_909964289.jpeg';
import asset2 from '../assets/tg_image_3539948750.jpeg';
import asset3 from '../assets/tg_image_2153305755.jpeg';
import asset4 from '../assets/tg_image_2298469695.jpeg';
import asset5 from '../assets/tg_image_3414101219.jpeg';
import asset6 from '../assets/tg_image_1721007457.jpeg';
import asset7 from '../assets/tg_image_3358567342.jpeg';
import asset8 from '../assets/tg_image_446819166.jpeg';
import asset9 from '../assets/tg_image_4285496111.jpeg';
import asset10 from '../assets/tg_image_396749770.jpeg';
import asset11 from '../assets/tg_image_2742377915.jpeg';
import asset12 from '../assets/tg_image_1984385382.jpeg';
import asset13 from '../assets/tg_image_2336474914.jpeg';
import asset14 from '../assets/tg_image_2424065743.jpeg';
import asset15 from '../assets/tg_image_2554768769.jpeg';

export enum Size {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large'
}


export interface ItemInterface {
  name: string,
  description?: string,
  color: string,
  category: string,
  featured: boolean,
  inCart: boolean,
  img: string,
  date: number,
  price: number,
  size: string
}

export const items: ItemInterface[] = [
  {
    name: 'Blue Cereal Bowl',
    color: 'Blue',
    category: 'Bowls',
    featured: true,
    inCart: false,
    img: asset1,
    date: 2001,
    price: 199,
    size: Size.Large
  },
  {
    name: 'Flat Plate',
    color: 'Gold',
    category: 'Plates',
    featured: false,
    inCart: false,
    img: asset2,
    date: 2005,
    price: 29,
    size: Size.Medium
  },
  {
    name: 'Hemp Dessert Bowl',
    color: 'Green',
    category: 'Bowls',
    featured: false,
    inCart: false,
    img: asset3,
    date: 1998,
    price: 499,
    size: Size.Small
  },
  {
    name: '6" Small Bowl',
    description: '6" Diameter   2 1/2" Height',
    color: 'Green',
    category: 'Bowls',
    featured: false,
    inCart: false,
    img: asset4,
    date: 2018,
    price: 39,
    size: Size.Small
  },
  {
    name: 'Flower Vase',
    description: '3 3/8" Width x 3 5/8" Height',
    color: 'White',
    category: 'Vases',
    featured: true,
    inCart: false,
    img: asset5,
    date: 2019,
    price: 699,
    size: Size.Large
  },
  {
    name: 'Cylinder Vase',
    description: '7 3/8" Diameter x 7 5/8" Height',
    color: 'Gold',
    category: 'Vases',
    featured: false,
    inCart: false,
    img: asset6,
    date: 2020,
    price: 99,
    size: Size.Large
  },
  {
    name: 'Black Sea Urchin',
    description: '4 1/8" Diameter x 3 3/4" Height',
    color: 'Black',
    category: 'Bowls',
    featured: true,
    inCart: false,
    img: asset7,
    date: 2022,
    price: 399,
    size: Size.Medium
  },
  {
    name: 'Rabbit Tea Cup',
    description: '4 1/4" Diameter w/ handle  4 1/8" Height. Hand Painted',
    color: 'White',
    category: 'Cups',
    featured: false,
    inCart: false,
    img: asset8,
    date: 2021,
    price: 49,
    size: Size.Large
  },
  {
    name: 'Pink Bowl',
    color: 'Pink',
    category: 'Bowls',
    featured: false,
    inCart: false,
    img: asset9,
    date: 2019,
    price: 119,
    size: Size.Large
  },
  {
    name: 'Silver Goblet',
    color: 'Silver',
    category: 'Cups',
    featured: false,
    inCart: false,
    img: asset10,
    date: 2006,
    price: 259,
    size: Size.Medium
  },
  {
    name: 'Golden Mug',
    color: 'Gold',
    category: 'Cups',
    featured: false,
    inCart: false,
    img: asset11,
    date: 2013,
    price: 79,
    size: Size.Medium
  },
  {
    name: 'Flower Vase Set',
    color: 'Pink',
    category: 'Vases',
    featured: true,
    inCart: false,
    img: asset12,
    date: 2015,
    price: 439,
    size: Size.Large
  },
  {
    name: 'Hand-Painted Bowl',
    color: 'Blue',
    category: 'Bowls',
    featured: false,
    inCart: false,
    img: asset13,
    date: 2017,
    price: 109,
    size: Size.Medium
  },
  {
    name: 'Bowl',
    color: 'White',
    category: 'Bowls',
    featured: false,
    inCart: false,
    img: asset14,
    date: 2018,
    price: 189,
    size: Size.Medium
  },
  {
    name: 'Golden Plate',
    color: 'Gold',
    category: 'Plates',
    featured: true,
    inCart: false,
    img: asset15,
    date: 2011,
    price: 219,
    size: Size.Small
  },
]