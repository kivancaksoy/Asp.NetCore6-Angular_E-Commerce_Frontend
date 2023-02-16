import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) { 
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);

    this.httpClientService.get<Product[]>({
      controller: "products"
    }).subscribe(data => console.log(data));
    
    // this.httpClientService.post({
    //   controller: "products"
    // }, {
    //   name: "Kalem",
    //   stock: 100,
    //   price: 15
    // }).subscribe();

    // this.httpClientService.put({
    //   controller: "products"
    // }, {
    //   id: "c3d38ccf-522c-434f-abe5-23cfa3ecc4c5",
    //   name: "Renkli Kağıt",
    //   stock: "1500",
    //   price: 5.5
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller: "products"
    // }, "f40d6308-fbcb-49fe-ba95-9f143090a0c6").subscribe();

    // this.httpClientService.get({
    //   fullEndPoint: "https://jsonplaceholder.typicode.com/posts"
    // }).subscribe(data => console.log(data));

  }

}
