import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OperationService } from './../operation.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {


  OTPForm: FormGroup;
  savedetail: object;
  host: string = environment.serverpath;

  login: object;
  token = sessionStorage.getItem( "access" );

  constructor(private router: Router, private http: HttpClient, public operation: OperationService) {
    this.OTPForm = new FormGroup({
      number: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    let data = this.OTPForm.value;
    let finaldata = this.savedetail =
    {
      "username": this.operation.mobno,
      "password": data.number
    }

    console.log(finaldata);
    return this.http.post(this.host + '/api/v1/user/get_access_token/', finaldata).subscribe(
      res => {

        this.login = res;
        sessionStorage.setItem( "token", this.login[ "access" ]);
        this.router.navigate(['prod-list']);
      },
      err => {
        console.log(err.message);
      }
    );


  }


}
