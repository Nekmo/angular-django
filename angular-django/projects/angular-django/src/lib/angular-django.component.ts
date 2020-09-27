import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-angular-django',
  template: `
    <p>
      Ey, angular-django works!! :)
    </p>
  `,
  styles: [
  ]
})
export class AngularDjangoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
