import { Component, OnInit } from '@angular/core';
import{pendulumComponent} from '../pendulum/pendulum.Component'


// import {MdSidenav, MdSidenavContainer,MdButton,MdMenu,MdIcon } from '@angular/material';

@Component({
  selector: 'app-layout',
  template:require('./layout.component.html'),
//  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  lavW ;
  lavH ;
  viewIndex;
  mTop;
  mRight;
  constructor() { }

  ngOnInit() {

  }
  onResize(event){
}

}
