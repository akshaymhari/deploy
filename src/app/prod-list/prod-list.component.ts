import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OperationService } from './../operation.service';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-prod-list',
  templateUrl: './prod-list.component.html',
  styleUrls: ['./prod-list.component.css']
})
export class ProdListComponent implements OnInit {
  details:object;

    // MatPaginator Inputs
    length: number;
    pageSize: number;
    num: number = 1;
    changeno: number = 1;


    // MatPaginator Output
    pageEvent: PageEvent;

    searchform: FormGroup;
    savesearch: object;

  displayedColumns: string[] = ['sn', 'id', 'name', 'minorder', 'maxorder', 'price'];

  host: string = environment.serverpath;
  token = sessionStorage.getItem("token");


  constructor(private router: Router, private http: HttpClient, public operation: OperationService) {
    this.searchform = new FormGroup({
      search: new FormControl('')
    });
   }

  ngOnInit(): void {
    this.prolist(this.num);
  }


  prolist(num){
    return this.http.get(this.host + '/api/v1/fish/?page='+num, { headers: new HttpHeaders().set('Authorization', this.token) }).subscribe(
      res => {

          this.details= res["results"];
          console.log(res);
          this.pageSize = res["page_size"];
          this.length = res["count"];
          this.num = res["num_pages"];
      },
      err => {
        console.log(err.message);

      }
    );
  }

index(event){
    console.log(this.pageEvent.pageIndex);
    this.num = this.pageEvent.pageIndex + 1;
    this.prolist(this.num);

}

onSubmit() {
  let data = this.searchform.value;
  console.log(data.search);

  return this.http.get(this.host + '/api/v1/fish/?page='+this.num+'&search='+data.search, { headers: new HttpHeaders().set('Authorization', this.token) }).subscribe(
    res => {
        console.log(res);
    },
    err => {
      console.log(err.message);

    }
  );
}
}

