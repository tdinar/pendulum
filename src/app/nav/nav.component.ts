import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-nav',
  template:require('./nav.component.html'),
  // styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  navH;
  navW;

  constructor() { }

  ngOnInit() {
    // this.myStore.changes.subscribe((newState)=>{
    //   this.navH = newState.viewData.navH;
    //   this.navW = newState.viewData.navW;
    //
    // })

  }

}
