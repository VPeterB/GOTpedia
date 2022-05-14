import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {HttpServiceService} from "../../services/http-service.service";
import {House} from "../../models/house.model";
import {Character} from "../../models/character.model";
import {IdService} from "../../services/id.service";

/**
 * House details page.
 */
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

  /**
   * - set url from route param via idService
   * - reset values
   * - get values from API via WebService
   */
  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
        this.url = this.idService.getHouseUrl(params["id"]);
        this.resetValues();
        this.getValues();
      });
  }

  /**
   * Reset values.
   */
  resetValues(){
    this.currentLord = undefined;
    this.heir = undefined;
    this.overlord = undefined;
    this.founder = undefined;
    this.cadetBranches = [];
    this.swornMembers = [];
  }

  /**
   * Load values from API via WebService.
   */
  getValues(){
    this.WebService.getDetailsFromUrl(this.url).subscribe((house: House) => { this.house = house;
      if(this.house.currentLord) this.WebService.getDetailsFromUrl(this.house.currentLord).subscribe((character: Character) => { this.currentLord = character });
      if(this.house.heir) this.WebService.getDetailsFromUrl(this.house.heir).subscribe((character: Character) => { this.heir = character });
      if(this.house.overlord) this.WebService.getDetailsFromUrl(this.house.overlord).subscribe((house: House) => { this.overlord = house });
      if(this.house.founder) this.WebService.getDetailsFromUrl(this.house.founder).subscribe((character: Character) => { this.founder = character });
      this.house.cadetBranches.forEach(branch => {
        this.WebService.getDetailsFromUrl(branch).subscribe((house: House) => { this.cadetBranches.push(house) });
      });
      this.house.swornMembers.forEach(member => {
        this.WebService.getDetailsFromUrl(member).subscribe((character: Character) => { this.swornMembers.push(character) });
      });
    });
  }
}
