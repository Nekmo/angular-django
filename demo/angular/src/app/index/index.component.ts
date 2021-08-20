import { Component, OnInit } from '@angular/core';

const CODE_EXAMPLE_1 = '' +
  'const users: Page<User> = await UserApi.filter({is_active: true}).list();\n' +
  'const user: User = users.first();\n' +
  'await user.setPassword(\'newPassword\'):';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  CODE_EXAMPLE_1 = CODE_EXAMPLE_1;

  constructor() { }

  ngOnInit(): void {
  }

}
