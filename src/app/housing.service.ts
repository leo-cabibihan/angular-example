import {Injectable, Optional} from '@angular/core';
import {HousingLocation} from './housing-location';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  
  protected readonly baseUrl = 'http://localhost:4200/assets';

//  url = 'http://localhost:3000/locations';
  private readonly localStorageKey = 'housingLocations';

  
  constructor() {

     const initialData: HousingLocation[] =
     [
       {
           "id": 0,
           "name": "Acme Fresh Start Housing",
           "city": "Chicago",
           "state": "IL",
           "photo": "assets/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
           "availableUnits": 4,
           "wifi": true,
           "laundry": true
       },
       {
           "id": 1,
           "name": "A113 Transitional Housing",
           "city": "Santa Monica",
           "state": "CA",
           "photo": "assets/brandon-griggs-wR11KBaB86U-unsplash.jpg",
           "availableUnits": 0,
           "wifi": false,
           "laundry": true
       },
       {
           "id": 2,
           "name": "Warm Beds Housing Support",
           "city": "Juneau",
           "state": "AK",
           "photo": "assets/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg",
           "availableUnits": 1,
           "wifi": false,
           "laundry": false
       },
       {
           "id": 3,
           "name": "Homesteady Housing",
           "city": "Chicago",
           "state": "IL",
           "photo": "assets/ian-macdonald-W8z6aiwfi1E-unsplash.jpg",
           "availableUnits": 1,
           "wifi": true,
           "laundry": false
       },
       {
           "id": 4,
           "name": "Happy Homes Group",
           "city": "Gary",
           "state": "IN",
           "photo": "assets/krzysztof-hepner-978RAXoXnH4-unsplash.jpg",
           "availableUnits": 1,
           "wifi": true,
           "laundry": false
       },
       {
           "id": 5,
           "name": "Hopeful Apartment Group",
           "city": "Oakland",
           "state": "CA",
           "photo": "assets/r-architecture-JvQ0Q5IkeMM-unsplash.jpg",
           "availableUnits": 2,
           "wifi": true,
           "laundry": true
       },
       {
           "id": 6,
           "name": "Seriously Safe Towns",
           "city": "Oakland",
           "state": "CA",
           "photo": "assets/phil-hearing-IYfp2Ixe9nM-unsplash.jpg",
           "availableUnits": 5,
           "wifi": true,
           "laundry": true
       },
       {
           "id": 7,
           "name": "Hopeful Housing Solutions",
           "city": "Oakland",
           "state": "CA",
           "photo": "assets/r-architecture-GGupkreKwxA-unsplash.jpg",
           "availableUnits": 2,
           "wifi": true,
           "laundry": true
       },
       {
           "id": 8,
           "name": "Seriously Safe Towns",
           "city": "Oakland",
           "state": "CA",
           "photo": "assets/saru-robert-9rP3mxf8qWI-unsplash.jpg",
           "availableUnits": 10,
           "wifi": false,
           "laundry": false
       },
       {
           "id": 9,
           "name": "Capital Safe Towns",
           "city": "Portland",
           "state": "OR",
           "photo": "assets/webaliser-_TPTXZd9mOo-unsplash.jpg",
           "availableUnits": 6,
           "wifi": true,
           "laundry": true
       }
     ]
     if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(initialData));
    }
  }
  
  async getAllHousingLocations(): Promise<HousingLocation[]> {
      return JSON.parse(localStorage.getItem(this.localStorageKey) ?? "[]");
  }
  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data: HousingLocation[] = JSON.parse(localStorage.getItem(this.localStorageKey) ?? "[]")
    return data.find((location: HousingLocation) => location.id === id);
  }

    addHouse(housingLocation: Partial<HousingLocation>): void {
        const locations: HousingLocation[] = JSON.parse(localStorage.getItem(this.localStorageKey) ?? '[]');
        const lastId = locations.length > 0 ? locations[locations.length - 1].id : 0;
        const newId = lastId + 1;
        const newHouse: HousingLocation = <HousingLocation>{ id: newId, ...housingLocation, photo: "assets/" + housingLocation.photo };

        locations.push(newHouse);



        localStorage.setItem(this.localStorageKey, JSON.stringify(locations));
    }



    submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
  
}
