import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {

  items:                Object;
  details:              Object;
  selectedItem:         String;

  constructor(
    private myCar: CarService
  ) { }

  ngOnInit() {
    this.myCar.all()
      .then((item) => {
        this.items = item;
        console.log('/inventory onInit', this.items);
      });
  }
  detail(id) {
    this.selectedItem = id;
    this.myCar.detail(id)
      .then((item) => {
        this.details = item;
      });
  }

}
