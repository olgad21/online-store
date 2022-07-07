interface ItemInterface {
  name: string,
  description?: string,
  color: string,
  category: string,
  featured: boolean,
  inCart: boolean,
  img: string
  date: number
}

export const items: ItemInterface[] = [
  {
    name: 'Blue Cereal Bowl',
    color: 'Blue',
    category: 'Bowls',
    featured: true,
    inCart: false,
    img: './assets/tg_image_909964289.jpeg',
    date: 2001,
  },
  {
    name: 'Flat Plate by Masahiro Kishida',
    color: 'Gold',
    category: 'Plates',
    featured: false,
    inCart: false,
    img: 'online-store/src/assets/tg_image_3539948750.jpeg',
    date: 2005,
  },
  {
    name: 'NERIKOMI Hemp Dessert Bowl',
    color: 'Green',
    category: 'Bowls',
    featured: false,
    inCart: false,
    img: 'online-store/src/assets/tg_image_2153305755.jpeg',
    date: 1998,
  },
  {
    name: 'Wraps 6" Small Bowl',
    description: '6" Diameter   2 1/2" Height',
    color: 'Green',
    category: 'Bowls',
    featured: false,
    inCart: false,
    img: 'online-store/src/assets/tg_image_2298469695.jpeg',
    date: 2018,
  },
  {
    name: 'Flower Vase',
    description: '3 3/8" Width x 3 5/8" Height',
    color: 'White',
    category: 'Vase',
    featured: true,
    inCart: false,
    img: 'online-store/src/assets/tg_image_3414101219.jpeg',
    date: 2019,
  },
  {
    name: 'Cylinder Flower Vase',
    description: '7 3/8" Diameter x 7 5/8" Height',
    color: 'Gold',
    category: 'Vase',
    featured: false,
    inCart: false,
    img: 'online-store/src/assets/tg_image_1721007457.jpeg',
    date: 2020
  },
  {
    name: 'Black Sea Urchin Sculpture',
    description: '4 1/8" Diameter x 3 3/4" Height',
    color: 'Black',
    category: 'Bowls',
    featured: true,
    inCart: false,
    img: 'online-store/src/assets/tg_image_3358567342.jpeg',
    date: 2022,
  },
  {
    name: 'Bunny Suit Rabbit Tea Cup',
    description: '4 1/4" Diameter w/ handle  4 1/8" Height. Hand Painted',
    color: 'White',
    category: 'Cup',
    featured: false,
    inCart: false,
    img: 'online-store/src/assets/tg_image_446819166.jpeg',
    date: 2021
  },
  {
    name: 'Pink Bowl',
    color: 'Pink',
    category: 'Bowls',
    featured: false,
    inCart: false,
    img: 'online-store/src/assets/tg_image_4285496111.jpeg',
    date: 2019,
  },
  {
    name: 'Silver Goblet',
    color: 'Silver',
    category: 'Cup',
    featured: false,
    inCart: false,
    img: 'online-store/src/assets/tg_image_396749770.jpeg',
    date: 2006
  },
  {
    name: 'Golden Mug',
    color: 'Gold',
    category: 'Cup',
    featured: false,
    inCart: false,
    img: 'online-store/src/assets/tg_image_2742377915.jpeg',
    date: 2013
  },
  {
    name: 'Flower Vase Set',
    color: 'Pink',
    category: 'Vase',
    featured: true,
    inCart: false,
    img: 'online-store/src/assets/tg_image_1984385382.jpeg',
    date: 2015
  },
  {
    name: 'Hand Painted Dessert Bowl',
    color: 'Blue',
    category: 'Bowls',
    featured: false,
    inCart: false,
    img: 'online-store/src/assets/tg_image_2336474914.jpeg',
    date: 2017
  },
  {
    name: 'Bowl',
    color: 'White',
    category: 'Bowls',
    featured: false,
    inCart: false,
    img: 'online-store/src/assets/tg_image_2424065743.jpeg',
    date: 2018
  },
  {
    name: 'Golden Plate',
    color: 'Gold',
    category: 'Plates',
    featured: true,
    inCart: false,
    img: 'online-store/src/assets/tg_image_2554768769.jpeg',
    date: 2011
  },
]