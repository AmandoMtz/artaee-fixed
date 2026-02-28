// src/data/products.ts
import type { Product } from '../types';

export const backpacks: Product[] = [
  { id: 'bp-1', name: 'Mochila Vante', price: 400, category: 'Bolsas', image: '/mochilavante.png', description: 'Mochila ligera con diseño Vante, ideal para el día a día.' },
  { id: 'bp-2', name: 'Mochila RPWP', price: 350, category: 'Bolsas', image: '/mochilarpwp.png', description: 'Diseño deportivo y moderno, perfecta para cualquier aventura.' },
  { id: 'bp-3', name: 'Mochila Agust D', price: 450, category: 'Bolsas', image: '/mochilaagustd.png', description: 'Diseño único inspirado en Agust D, estilo y funcionalidad.' },
  { id: 'bp-4', name: 'Hope On The Stage', price: 500, category: 'Bolsas', image: '/mochilahopeonstage.png', description: 'Mochila vibrante y colorida, una pieza de colección.' },
  { id: 'bp-5', name: 'Still Negra & Morado', price: 550, category: 'Bolsas', image: '/mochilasillnegro.png', description: 'Elegante combinación negro y morado, un clásico atemporal.' },
  { id: 'bp-6', name: 'Still Blanco', price: 600, category: 'Bolsas', image: '/mochilasillblanco.png', description: 'Minimalismo en blanco puro, versátil y sofisticada.' },
  { id: 'bp-7', name: 'Still Lila', price: 650, category: 'Bolsas', image: '/mochilastilllila.png', description: 'El lila más fresco de la colección, único y especial.' },
  { id: 'bp-8', name: 'Standing', price: 700, category: 'Bolsas', image: '/mochilastanding.png', description: 'Estructura firme y resistente para quienes se atreven a destacar.' },
];

export const portavasos: Product[] = [
  { id: 'pv-1', name: 'Portavasos Verde', price: 90, category: 'Portavasos', image: '/portavasos1.png', description: 'Portavasos artesanal en tono verde menta, perfecto para regalo.' },
  { id: 'pv-2', name: 'Portavasos Rosa', price: 90, category: 'Portavasos', image: '/portavasos2.png', description: 'Diseño floral en rosa pastel, delicado y elegante.' },
  { id: 'pv-3', name: 'Portavasos Azul', price: 90, category: 'Portavasos', image: '/portavasos3.png', description: 'Azul cielo con acabado suave, ideal para la mesa de centro.' },
  { id: 'pv-4', name: 'Portavasos Lila', price: 95, category: 'Portavasos', image: '/portavasos4.png', description: 'Tono lila intenso, un toque de personalidad en cada rincón.' },
  { id: 'pv-5', name: 'Portavasos Crema', price: 95, category: 'Portavasos', image: '/portavasos5.png', description: 'Neutro y sofisticado, combina con cualquier decoración.' },
  { id: 'pv-6', name: 'Portavasos Coral', price: 100, category: 'Portavasos', image: '/portavasos6.png', description: 'Coral vibrante para los que buscan color y alegría.' },
];

export const allProducts: Product[] = [
  ...backpacks,
  ...portavasos,
];

export const featuredProducts: Product[] = [
  backpacks[0],
  backpacks[3],
  portavasos[0],
  portavasos[3],
];

export const CATEGORIES = ['Todos', 'Bolsas', 'Portavasos', 'Llaveros', 'Playeras', 'Accesorios'];
