import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {last} from "rxjs";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
      <section >
        <h2 class="section-heading">Add House</h2>

        <form [formGroup]="addForm!!" (submit)="submitApplication()">
          <label for="name">Name</label>
          <input id="name" type="text" formControlName="name"/>
          <div *ngIf="name?.invalid && (name?.dirty || name?.touched)"
               class="alert alert-danger">
            <div *ngIf="name?.hasError('required')">
              Name is required
            </div>
          </div>
          <label for="city">City</label>
          <input id="city" type="text" formControlName="city"/>
          <div *ngIf="city?.invalid && (city?.dirty || city?.touched)"
               class="alert alert-danger">
            <div *ngIf="city?.hasError('required')">
              City is required
            </div>
          </div>
          <label for="state">State</label>
          <input id="state" type="text" formControlName="state"/>
          <div *ngIf="state?.invalid && (state?.dirty || state?.touched)"
               class="alert alert-danger">
            <div *ngIf="state?.hasError('required')">
              State is required
            </div>
          </div>
          <label for="photo">Photo</label>
          <input id="photo" type="text" formControlName="photo"/>
          <div *ngIf="photo?.invalid && (photo?.dirty || photo?.touched)"
               class="alert alert-danger">
            <div *ngIf="photo?.hasError('required')">
              Photo is required
            </div>
          </div>
          <label for="available-units">AvailableUnits</label>
          <input id="available-units" type="number" formControlName="availableUnits"/>
          <div *ngIf="availableUnits?.invalid && (availableUnits?.dirty || availableUnits?.touched)"
               class="alert alert-danger">
            <div *ngIf="availableUnits?.hasError('required')">
              City is required
            </div>
            <div *ngIf="availableUnits?.hasError('minLength')">
              City is required
            </div>
          </div>
         
          <label for="wifi">
            Has Wifi
            <input id="wifi" type="checkbox" formControlName="wifi"/>
          </label>
          <div *ngIf="wifi?.invalid && (wifi?.dirty || wifi?.touched)"
               class="alert alert-danger">
            <div *ngIf="wifi?.hasError('required')">
              City is required
            </div>
          </div>
          <label for="laundry">
            Has Laundry
            <input id="laundry" type="checkbox" formControlName="laundry"/>
          </label>
          <div *ngIf="laundry?.invalid && (laundry?.dirty || laundry?.touched)"
               class="alert alert-danger">
            <div *ngIf="laundry?.hasError('required')">
              City is required
            </div>
          </div>
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    
  `,
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  addForm: FormGroup | undefined

  ngOnInit(): void{
    this.addForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required]),
      availableUnits: new FormControl(0, [Validators.required, Validators.min(1)]),
      wifi: new FormControl(false, [Validators.required]),
      laundry: new FormControl(false, [Validators.required])
    });

  }

  get name() {
    return this.addForm?.get('name');
  }

  get city() {
    return this.addForm?.get('city');
  }
  get state() {
    return this.addForm?.get('state');
  }

  get photo() {
    return this.addForm?.get('photo')
  }

  get availableUnits() {
    return this.addForm?.get('availableUnits')
  }

  get wifi() {
    return this.addForm?.get('wifi')
  }

  get laundry() {
    return this.addForm?.get('laundry')
  }

  submitApplication() {
    console.log("help me", this.addForm?.value);
    if(this.addForm?.invalid) return
    console.log("actually dont")
    this.housingService.addHouse(this.addForm?.value);
  }





  constructor() {

  }

  protected readonly last = last;
}