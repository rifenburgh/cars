import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {

  car: Array<any>       = [];
  items:                Object;
  detail:               Object;
  constructor(
    private myCar:      CarService,
    private myRoute:    ActivatedRoute,
    private myNavigator: Router
  ) { }

  ngOnInit() {
    this.myCar.three()
      .then((item) => {
        this.items = item;
        console.log(item);
      });
  }
  carDetails(id) {
    /*
    this.myCar.carDetails(id)
      .then((detail) => {});
    */
    console.log('/Index car details');
    this.myCar.detail(id)
      .then((apiResult) => {
        this.myNavigator.navigate([`api/details/${id}`]);
      })
  }

}
