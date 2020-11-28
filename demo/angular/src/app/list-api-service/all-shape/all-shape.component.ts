import { Component, OnInit } from '@angular/core';
import {Shape, ShapeApi} from '../../shared/api.service';

@Component({
  selector: 'app-all-shape',
  templateUrl: './all-shape.component.html',
  styleUrls: ['./all-shape.component.scss']
})
export class AllShapeComponent implements OnInit {

  shapeNames: string[] = [];

  constructor(public shapeApi: ShapeApi) { }

  ngOnInit(): void {
    this.shapeApi.all().subscribe((shape: Shape) => {
      this.shapeNames.push(shape.identifier);
    });
  }

}
