import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OperationService } from './../operation.service';






@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css']
})
export class ProdListComponent implements OnInit {
  details:object;
  displayedColumns: string[] = ['sn', 'id', 'name', 'minorder', 'maxorder', 'price'];

  host: string = environment.serverpath;
  token = sessionStorage.getItem("token");


  constructor(private router: Router, private http: HttpClient, public operation: OperationService) { }

  ngOnInit(): void {
    this.prolist();
  }

  prolist(){
    return this.http.get(this.host + '/api/v1/fish/', { headers: new HttpHeaders().set('Authorization',this.token) }).subscribe(
      res => {
        this.details = res["results"];
        console.log(this.details);
      },
      err => {
        console.log(err.message);
      }
    );
  }
}

