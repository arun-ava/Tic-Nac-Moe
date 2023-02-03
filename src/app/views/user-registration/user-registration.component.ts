import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AWSService } from '../../service/aws.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {

  username!: string;
  password!: string;

  constructor(private _aws: AWSService) { }

  ngOnInit(): void {
  }

  registerUser() {
    this._aws.createUser(this.username, this.password);
  }

  loginUser() {
    this._aws.getUser(this.username).subscribe((val) => {
      console.log('Get request ', val);
    });
  }
}
