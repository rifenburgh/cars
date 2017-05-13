import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarService } from '../car.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  items:                Object;
  itemId:               String;

  constructor(
    private myCar:      CarService
  ) { }

  ngOnInit() {
    /*
    this.myCar.detail(item._id)
      .then((item) => {
        this.items      = item;
      });
    */
  }

}
