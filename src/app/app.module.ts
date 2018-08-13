import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '../../node_modules/@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { AppComponent } from './app.component';
//Material
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatTableModule, MatDialogModule } from '@angular/material';

//Components
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { ModalUserComponent } from './components/modal-user/modal-user.component';

//Routing
import { APP_ROUTING } from './app.routing';

//Services
import { HttpService } from './services/config/http.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { LoginGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ModalUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    APP_ROUTING
  ],
  entryComponents: [
    ModalUserComponent
  ],
  providers: [
    HttpService,
    AuthService,
    UserService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
