import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { BaseService } from '../../../../../services/base.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private baseService: BaseService
  ) { }

  private _paramId: any;
  public productInfo: any;

  getProductDetail() {
    this.baseService.productDetail('wc/v3/products', this._paramId).subscribe(
      res => {
        console.log( "Res", res )
        this.productInfo = res;
      },
      err => {
        console.log( "Err", err )
      }
    )
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this._paramId = params['id']
        console.log("this._paramId", this._paramId )
        this.getProductDetail();
      }
    )

    

  }

}
