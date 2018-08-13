import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '../../../../node_modules/@angular/forms';
import { UserService } from '../../services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from '../../../../node_modules/rxjs';
@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit {

  userForm: FormGroup;
  name: AbstractControl;
  job: AbstractControl;
  userAction: boolean;
  message: string;
  title: string;
  textBtn: string;
  id: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.createUserForm();
    this.title = (this.data) ? "Update user" : "New user";
    this.textBtn = (this.data) ? "Update" : "Create";
    if (this.data) {
      this.name.setValue(this.data.first_name + ' ' + this.data.last_name);
      this.id = this.data.id;
    }
  }

  createUserForm(): void {
    this.userForm = this._formBuilder.group({
      name: ['', Validators.required],
      job: ['', Validators.required]
    });
    this.name = this.userForm.controls["name"];
    this.job = this.userForm.controls["job"];
  }
  addUser(): void {
    if (this.userForm.invalid) {
      return;
    } else {
      const objUser = {
        name: this.name.value,
        job: this.job.value
      }
      if (!this.data) {
        const userCreate: Subscription = this._userService.createUser(objUser)
          .subscribe(res => {
            this.userAction = true;
            this.message = 'User successfully added!'
            this.userForm.reset();
            setInterval(() => {
              this.userAction = false;
            }, 1250)
            userCreate.unsubscribe();
          });
      } else {
        const userUpdate: Subscription = this._userService.updateUser(objUser, this.id)
          .subscribe(res => {
            this.userAction = true;
            this.message = 'User successfully updated !'
            setInterval(() => {
              this.userAction = false;
            }, 1250)
            userUpdate.unsubscribe();
          });
      }
    }
  }
}
