import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ECommerceClient';

  constructor(private toastrService: CustomToastrService) {
    toastrService.message("Merhaba", "Kıvanç", { messageType: ToastrMessageType.Info, position: ToastrPosition.TopCenter });
    toastrService.message("Merhaba", "Kıvanç", { messageType: ToastrMessageType.Success, position: ToastrPosition.BottomFullWidth });
    toastrService.message("Merhaba", "Kıvanç", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopLeft });
    toastrService.message("Merhaba", "Kıvanç", { messageType: ToastrMessageType.Warning, position: ToastrPosition.TopRight });
    
  }
}

