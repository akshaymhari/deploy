import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OperationService } from './../operation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  savedetail: object;
  host: string = environment.serverpath;

  constructor(private router: Router, private http: HttpClient, public operation: OperationService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      mobile: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    let data = this.loginForm.value;
    let finaldata = this.savedetail =
    {
      "phone": "+91" + data.mobile
    }
    console.log(finaldata);
    return this.http.post(this.host + '/api/v1/user/get_otp/', finaldata).subscribe(
      res => {

        this.operation.mobno = finaldata.phone;
        this.operation.otp = res;
        this.router.navigate(['otp']);
      },
      err => {
        console.log(err.message);
      }
    );

  }

}
