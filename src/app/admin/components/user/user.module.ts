import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ListComponent } from './list/list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDirectiveModule } from 'src/app/directives/admin/delete.directive.module';
import { RouterModule } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';



@NgModule({
  declarations: [
    UserComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: "", component: UserComponent}
    ]),
    MatPaginatorModule,
    MatTableModule,
    DeleteDirectiveModule,
    MatButtonModule,
    
  ]
})
export class UserModule { }
