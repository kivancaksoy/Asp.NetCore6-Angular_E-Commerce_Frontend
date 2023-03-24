import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode/lib/ngx-scanner-qrcode.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from 'src/app/services/ui/custom-toastr.service';
import { BaseDialog } from '../base/base-dialog';

declare var $: any;

@Component({
  selector: 'app-qrcode-reading-dialog',
  templateUrl: './qrcode-reading-dialog.component.html',
  styleUrls: ['./qrcode-reading-dialog.component.scss'],
})
export class QrcodeReadingDialogComponent
  extends BaseDialog<QrcodeReadingDialogComponent>
  implements OnInit, OnDestroy
{
  constructor(
    dialogRef: MatDialogRef<QrcodeReadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private toastrService: CustomToastrService,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) {
    super(dialogRef);
  }

  @ViewChild('scanner', { static: true }) scanner: NgxScannerQrcodeComponent;
  @ViewChild('txtStock', { static: true }) txtStock: ElementRef;

  async ngOnInit() {
    this.scanner.start();
    //
    //
  }

  ngOnDestroy(): void {
    this.scanner.stop();
  }

  onEvent(e) {
    this.spinner.show(SpinnerType.BallAtom);
    const data = e[0].value;
    if (data != null) {
      const jsonData = JSON.parse(data);

      const stockValue = (this.txtStock.nativeElement as HTMLInputElement)
        .value;

      this.productService.updateStockQrCodeToProduct(
        jsonData.Id,
        parseInt(stockValue),
        () => {
          $('#btnClose').click();
          this.toastrService.message(
            `${jsonData.Name} ürününün stok bilgisi ${stockValue} olarak güncellenmiştir.`,
            'Stok Başarıyla Güncelelndi',
            {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight,
            }
          );
          this.spinner.hide(SpinnerType.BallAtom);
        }
      );
    }
  }
}
