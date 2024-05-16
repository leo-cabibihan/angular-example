import {Routes} from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import {AddComponent} from "./add/add.component";


const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page',
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Home details',
    },
    {
        path: 'add',
        component: AddComponent,
        title: 'Add House'
    }

];

export default routeConfig