import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  items:                Object;

  constructor(
    private myCar: CarService
  ) { }

  ngOnInit() {
    this.myCar.quotes()
      .then((item) => {
        this.items      = item;
      });
  }

}
