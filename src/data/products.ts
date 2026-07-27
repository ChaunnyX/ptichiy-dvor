export type Product = {
  id: string
  title: string
  note: string
  price: number
  unit: string
  img: string
  /** фото «как будет готово» — показывается при hover */
  cookedImg?: string
  tag?: string
  oldPrice?: number
  cat: 'chicken' | 'broiler' | 'turkey' | 'eggs'
}

export const PRODUCTS: Product[] = [
  {
    id: 'broiler-whole',
    title: 'Цыплёнок-бройлер целый',
    note: 'Тушка 1,8–2,4 кг · охлаждённый',
    price: 495,
    oldPrice: 560,
    unit: '₽/кг',
    img: '/ptichiy-dvor/img/product-chicken-board.jpg',
    cookedImg: '/ptichiy-dvor/img/roast-basting.jpg',
    tag: 'Хит недели',
    cat: 'broiler',
  },
  {
    id: 'chicken-whole',
    title: 'Курица домашняя',
    note: 'Тушка 1,4–1,8 кг · для бульона',
    price: 545,
    unit: '₽/кг',
    img: '/ptichiy-dvor/img/product-chicken-slate.jpg',
    cat: 'chicken',
  },
  {
    id: 'fillet',
    title: 'Филе грудки',
    note: 'Упаковка 0,7–1 кг · без кожи',
    price: 790,
    unit: '₽/кг',
    img: '/ptichiy-dvor/img/product-fillet-marble.jpg',
    cookedImg: '/ptichiy-dvor/img/grill-fire.jpg',
    tag: 'Свежий забой',
    cat: 'chicken',
  },
  {
    id: 'drumsticks',
    title: 'Голень куриная',
    note: 'Упаковка ~1 кг · 5–6 шт',
    price: 520,
    unit: '₽/кг',
    img: '/ptichiy-dvor/img/product-drumsticks.jpg',
    cookedImg: '/ptichiy-dvor/img/roast-spit.jpg',
    cat: 'chicken',
  },
  {
    id: 'breast-set',
    title: 'Грудка на кости',
    note: 'Упаковка 0,8–1,2 кг',
    price: 640,
    unit: '₽/кг',
    img: '/ptichiy-dvor/img/product-breast-dark.jpg',
    cat: 'chicken',
  },
  {
    id: 'wings',
    title: 'Крылья куриные',
    note: 'Упаковка ~1 кг · на мангал',
    price: 480,
    unit: '₽/кг',
    img: '/ptichiy-dvor/img/texture-grill-grid.jpg',
    cat: 'chicken',
  },
  {
    id: 'thighs',
    title: 'Бедро куриное',
    note: 'Упаковка ~1 кг · самое сочное',
    price: 560,
    unit: '₽/кг',
    img: '/ptichiy-dvor/img/texture-marinated.jpg',
    cat: 'chicken',
  },
  {
    id: 'soup-set',
    title: 'Суповой набор',
    note: 'Спинки и каркасы · для бульона',
    price: 260,
    unit: '₽/кг',
    img: '/ptichiy-dvor/img/flatlay-chicken-veg.jpg',
    cat: 'chicken',
  },
  {
    id: 'turkey-fillet',
    title: 'Филе индейки',
    note: 'Упаковка 0,8–1,2 кг · грудка',
    price: 920,
    unit: '₽/кг',
    img: '/ptichiy-dvor/img/product-turkey-tray.jpg',
    tag: 'Индейка',
    cat: 'turkey',
  },
  {
    id: 'eggs-10',
    title: 'Яйца домашние С0',
    note: 'Десяток · куры на выгуле',
    price: 220,
    unit: '₽/10 шт',
    img: '/ptichiy-dvor/img/eggs-closeup.jpg',
    tag: 'Сегодняшний сбор',
    cat: 'eggs',
  },
  {
    id: 'eggs-30',
    title: 'Яйца — лоток',
    note: '30 шт · выгоднее на 15%',
    price: 560,
    oldPrice: 660,
    unit: '₽/30 шт',
    img: '/ptichiy-dvor/img/eggs-basket.jpg',
    cat: 'eggs',
  },
]

export type Cut = {
  id: string
  name: string
  price: number
  desc: string
  img: string
  // позиция точки на силуэте, % от viewBox
  x: number
  y: number
}

export const CUTS: Cut[] = [
  { id: 'breast', name: 'Грудка · филе', price: 790, desc: 'Самое постное — на гриль и запекание', img: '/ptichiy-dvor/img/product-fillet-marble.jpg', x: 44, y: 52 },
  { id: 'wing', name: 'Крыло', price: 480, desc: 'К пиву и на мангал, маринуем за час', img: '/ptichiy-dvor/img/texture-grill-grid.jpg', x: 55, y: 38 },
  { id: 'thigh', name: 'Бедро', price: 560, desc: 'Самое сочное — для жарки и плова', img: '/ptichiy-dvor/img/texture-marinated.jpg', x: 66, y: 56 },
  { id: 'drumstick', name: 'Голень', price: 520, desc: 'Любимец детей, держит форму в духовке', img: '/ptichiy-dvor/img/product-drumsticks.jpg', x: 71, y: 72 },
  { id: 'carcass', name: 'Суповой набор', price: 260, desc: 'Спинка и каркас — золотой бульон', img: '/ptichiy-dvor/img/flatlay-chicken-veg.jpg', x: 56, y: 47 },
]
