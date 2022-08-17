import { derived } from 'svelte/store';
import { page } from '$app/stores';

import Dashboard from 'carbon-icons-svelte/lib/Dashboard.svelte';
import ShoppingCart from 'carbon-icons-svelte/lib/ShoppingCart.svelte';
import Money from 'carbon-icons-svelte/lib/Money.svelte';
import FruitBowl from 'carbon-icons-svelte/lib/FruitBowl.svelte';
import TaskComplete from 'carbon-icons-svelte/lib/TaskComplete.svelte';
import Data from 'carbon-icons-svelte/lib/Data_1.svelte';

export const routes = [
  { path: 'overzicht', name: 'Overzicht', title: 'Theehuis', icon: Dashboard },
  { path: 'boodschappen', name: 'Boodschappen', icon: ShoppingCart },
  { path: 'uitgaven', name: 'Uitgaven', icon: Money },
  { path: 'klusjes', name: 'Klusjes', icon: TaskComplete },
  { path: 'recepten', name: 'Recepten', icon: FruitBowl },
  { path: 'instellingen', name: 'Instellingen', icon: Data },
];

export const getRoute = (routeId: string | null) => {
  const filter = routes.filter((route) => routeId === route.path);
  if (filter.length > 0) return filter[0];
  else return null;
};

export const currentPath = derived(page, ($page) => $page.routeId);

export const currentRoute = derived(currentPath, ($route) => getRoute($route));

export const isRoute = derived(currentPath, ($route) => (routeId: string) => $route === routeId);
