import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from "../../services/http-service.service";
import {House} from "../../models/house.model";
import {IdService} from "../../services/id.service";

@Component({
  selector: 'app-houses',
  templateUrl: './houses.component.html',
  styleUrls: ['./houses.component.css']
})
export class HousesComponent implements OnInit {
  page = 1;
  pageSize = 3;
  lastPage = Math.ceil(444 / this.pageSize);
  houses: House[] = [];

  constructor(
    private webService: HttpServiceService,
    public idService: IdService
  ) { }

  ngOnInit(): void {
    this.loadHouses();
  }

  loadHouses(){
    this.webService.getHouses(this.page, this.pageSize).subscribe((houses: House[]) => {
      this.houses = houses;
    })
  }

  nextPage(){
    this.page++;
    this.loadHouses();
  }

  prevPage(){
    this.page--;
    this.loadHouses();
  }
}
