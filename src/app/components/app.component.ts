import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Observable} from "rxjs";
import {map, filter} from 'rxjs/operators';
import * as _ from "lodash";

/**
 * Root page with color and navbar.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'GOTpedia';
  isCollapsed = false;
  currentPageTitle: Observable<string>;

  constructor(private router: Router, private elementRef: ElementRef) { }

  /**
   * Set page subtitle.
   */
  ngOnInit() {
    this.currentPageTitle = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((() => _.find(["Books", "Characters", "Houses"], t => this.router.isActive('/' + t.toLowerCase(), false))).bind(this))
    ) as Observable<string>
  }

  /**
   * Set background color.
   */
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'WhiteSmoke';
  }
}
