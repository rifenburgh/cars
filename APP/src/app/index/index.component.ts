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
  constructor(
    private myCar:      CarService
  ) { }

  ngOnInit() {
  }

}
