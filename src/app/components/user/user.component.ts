import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalUserComponent } from '../modal-user/modal-user.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '../../../../node_modules/@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'last_name', 'photo', 'actions'];
  userList: any[] = [];
  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _router : Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getListUsers();
  }

  getListUsers(): void {
    const user: Subscription = this._userService.getUsers()
      .subscribe(res => {
        this.userList = res.data;
        user.unsubscribe();
      })
  }
  openModalUser(): void {
    const dialogM = this.dialog.open(ModalUserComponent, {
    });
    dialogM.afterClosed()
      .subscribe(res => {
      });
  }
  removeUser(id: any): void {
    const index = this.userList.findIndex(u => {
      return u.id === id;
    });
    const userR: Subscription = this._userService.deleteUser(id)
      .subscribe(res => {
        this.userList.splice(index, 1);
        this.userList = [...this.userList];
        userR.unsubscribe();
      })
  }
  editModalUser(user): void {
    const dialogM = this.dialog.open(ModalUserComponent, {
      data: user
    });
    dialogM.afterClosed()
      .subscribe(res => {
      });
  }
  closeSession(): void {
    if(this._authService.logout()){
      this._router.navigate(['/login']);  
    }else{
      return;
    }
  }
}
