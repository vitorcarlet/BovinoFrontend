import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  {
    state: 'oxDashboard',
    name: 'Manage OxDashboard',
    type: 'link',
    icon: 'dashboard',
    role: '',
  },
  {
    state: 'animalTable',
    name: 'Manage Animal',
    type: 'link',
    icon: 'pets',
    role: '',
  },
  {
    state:'animalEvolution',
    name: 'Manage Animal Evolution',
    type: 'link',
    icon: 'pets',
    role: ''
  },

  {
    state: 'user',
    name: 'Manage User',
    type: 'link',
    icon: 'people',
    role: 'admin',
  },
  
];

@Injectable()
export class MenuItems {
  getMenuItem(): Menu[] {
    return MENUITEMS;
  }
}
