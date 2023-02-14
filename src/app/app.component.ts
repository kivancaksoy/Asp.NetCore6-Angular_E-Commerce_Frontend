import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ECommerceClient';

  constructor(private toastr: ToastrService) {

    toastr.success("Merhaba", "Kıvanç");
    
  }
}

