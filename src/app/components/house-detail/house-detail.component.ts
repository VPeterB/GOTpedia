import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {HttpServiceService} from "../../services/http-service.service";
import {House} from "../../models/house.model";
import {Character} from "../../models/character.model";
import {IdService} from "../../services/id.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {
  url: string;
  house: House;
  currentLord: Character | undefined;
  heir: Character | undefined;
  overlord: House | undefined;
  founder: Character | undefined;
  cadetBranches: House[];
  swornMembers: Character[];

  constructor(
    private route : ActivatedRoute,
    private WebService: HttpServiceService,
    public idService: IdService
  ) { }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
        this.url = this.idService.getHouseUrl(params["id"]);
        this.WebService.getDetailsFromUrl(this.url).subscribe((house: any) => { this.house = house;
          this.currentLord = undefined;
          this.heir = undefined;
          this.overlord = undefined;
          this.founder = undefined;
          if(this.house.currentLord) this.WebService.getDetailsFromUrl(this.house.currentLord).subscribe((character: any) => { if(character) this.currentLord = character });
          if(this.house.heir) this.WebService.getDetailsFromUrl(this.house.heir).subscribe((character: any) => { if(character) this.heir = character });
          if(this.house.overlord) this.WebService.getDetailsFromUrl(this.house.overlord).subscribe((house: any) => { if(house) this.overlord = house });
          if(this.house.founder) this.WebService.getDetailsFromUrl(this.house.founder).subscribe((character: any) => { if(character) this.founder = character });
          this.cadetBranches = [];
          this.swornMembers = [];
          this.house.cadetBranches.forEach(branch => {
            this.WebService.getDetailsFromUrl(branch).subscribe((house: any) => { if(house) this.cadetBranches.push(house) });
          });
          this.house.swornMembers.forEach(member => {
            this.WebService.getDetailsFromUrl(member).subscribe((character: any) => { if(character) this.swornMembers.push(character) });
          });
        });
      });
  }
}
