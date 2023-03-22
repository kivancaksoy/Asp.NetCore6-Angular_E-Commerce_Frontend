import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { List_Role } from 'src/app/contracts/role/list-role';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';
import { RoleService } from 'src/app/services/common/models/role.service';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.scss'],
})
export class AuthorizeMenuDialogComponent
  extends BaseDialog<AuthorizeMenuDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private authorizationEndpointService: AuthorizationEndpointService,
    private spinner: NgxSpinnerService
  ) {
    super(dialogRef);
  }
  roles: { datas: List_Role[]; totalCount: number };
  assignedRoles: string[];
  listRoles: { name: string; selected: boolean }[];
  async ngOnInit() {
    const assignedRoles =
      await this.authorizationEndpointService.getRolesToEndpoint(
        this.data.code,
        this.data.menuName
      );

    this.roles = await this.roleService.getRoles(-1, -1);
    this.listRoles = this.roles.datas.map((r: any) => {
      return {
        name: r.name,
        selected: assignedRoles?.indexOf(r.name) > -1,
      };
    });
  }

  assignRoles(rolesComponent: MatSelectionList) {
    const roles: string[] = rolesComponent.selectedOptions.selected.map(
      (o) => o._elementRef.nativeElement.innerText
    );
    this.spinner.show(SpinnerType.BallAtom);
    this.authorizationEndpointService.assignRoleEndpoint(
      roles,
      this.data.code,
      this.data.menuName,
      () => {
        this.spinner.hide(SpinnerType.BallAtom);
      },
      (error) => {}
    );
  }
}

export enum AuthorizeMenuState {
  Yes,
  No,
}
