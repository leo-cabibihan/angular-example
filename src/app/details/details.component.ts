import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {last} from "rxjs";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
          class="listing-photo"
          [src]="housingLocation?.photo"
          alt="Exterior photo of {{ housingLocation?.name }}"
          crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm!!" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" required/>

          <div *ngIf="firstName?.invalid && (firstName?.dirty || firstName?.touched)"
               class="alert alert-danger">
                <div *ngIf="firstName?.hasError('required')">
                  FirstName is required.
                </div>
          </div>
          
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName"/>

          <div *ngIf="lastName?.invalid && (lastName?.dirty || lastName?.touched)"
               class="alert alert-danger">
            <div *ngIf="lastName?.hasError('required')">
              LastName is required.
            </div>

          </div>
          
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email"/>

          <div *ngIf="email?.invalid && (email?.dirty || email?.touched)"
               class="alert alert-danger">
            <div *ngIf="email?.hasError('required')">
              Email is required.
            </div>
            <div *ngIf="email?.hasError('pattern')">
              Has to follow email format JohnDoe@company.com
            </div>
          </div>
          <button type="submit" class="primary">Apply now</button>
        </form>

      </section>
    
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  
  applyForm: FormGroup | undefined

  ngOnInit(): void{
    this.applyForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    });

  }

  get firstName() {
    return this.applyForm?.get('firstName');
  }

  get lastName() {
    return this.applyForm?.get('lastName');
  }
  get email() {
    return this.applyForm?.get('email');
  }

  submitApplication() {
    if(this.applyForm?.invalid) return
    this.housingService.submitApplication(
      this.applyForm?.value.firstName ?? '',
      this.applyForm?.value.lastName ?? '',
      this.applyForm?.value.email ?? '',
    );
  }



  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {this.housingLocation = housingLocation});
  }

  protected readonly last = last;
}