import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../../../services/base.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  pageTitle: string = "Products..";
  products: any;
  errorMsg: any;

  pagination = {
    totalRecords: 0,
    currentPage: 1,
    perPage: 3,
    pages: 0,
  };

  constructor(
    public httpClient: HttpClient,
    public baseService: BaseService
  ) { }


  getProducts() {
    
    console.log("getProducts()... from baseService")

    this.baseService.productListing('wc/v3/products',
        {
          _perPageLimit: this.pagination.perPage,
          _currentPageNumber: this.pagination.currentPage
        }
        ).subscribe(
      res => {
        console.log("res", res)

        this.products = res

        console.log( "Prodcut:", this.products )
      },
      err => {
        console.log("err", err)
        this.errorMsg = `${err.statusText} | Server not response`;
      }
    )

  }







  paginatorFunc() {

    this.baseService.allProduct('wc/v3/products').subscribe(
      res=> {
        this.pagination.totalRecords = res['length']

        let numberOfPages = Math.ceil( this.pagination.totalRecords / this.pagination.perPage )

        console.log("numberOfPages", numberOfPages)
        this.pagination.pages = numberOfPages;

        console.log("total pages..", this.pagination.totalRecords)
      },
      err => {
        console.log("Err", err )
      }
    )
    
  }


  loadNewPage( _num ) {
    this.pagination.currentPage = _num;
    this.getProducts(); // call
  }

  ngOnInit(): void {

    this.paginatorFunc()
    this.getProducts()
  }

}
