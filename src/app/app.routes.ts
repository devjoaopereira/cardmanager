import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DeckComponent } from './components/deck/deck.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'mydeck',
        component: DeckComponent
    }
];
