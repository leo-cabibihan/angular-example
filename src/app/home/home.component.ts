import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingLocation} from "../housing-location";
import {HousingService} from "../housing.service";
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, ReactiveFormsModule, RouterOutlet, RouterLink],
  template: `
 
    <section>
      <form [formGroup]="applyForm" (submit)="filterResults()">
        <input type="text" placeholder="Filter by city" formControlName="search">
        <button class="primary" type="submit">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
    </section>
    <section>
      <a class="primary" [routerLink]="['/add']" >
        Add House
      </a>
    </section>
    
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  filteredLocationList: HousingLocation[] = [];
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  
  applyForm= new FormGroup({
    search: new FormControl('')
  });

  filterResults() {
    const text = this.applyForm.value.search

    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
  
  constructor() {
    this.housingService.getAllHousingLocations().then((housingList: HousingLocation[]) => {
      
      this.housingLocationList = housingList
      this.filteredLocationList = this.housingLocationList;
    })
  }
}