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

  constructor(
    public httpClient: HttpClient,
    public baseService: BaseService
  ) { }


  getProducts() {
    
    console.log("getProducts()... from baseService")

    /* Fetch All Products
    this.baseService.allProduct('wc/v3/products').subscribe(
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
    */

    this.baseService.productListing('wc/v3/products', {_perPageLimit:2, _currentPageNumber:2 }).subscribe(
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


  ngOnInit(): void {
    this.getProducts()
  }

}
