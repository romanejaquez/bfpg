import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { DialogbaseComponent } from './dialogbase/dialogbase.component';
import { ClientDetailsExpanderComponent } from './controls/client-details-expander/client-details-expander.component';
import { FooterComponent } from './controls/footer/footer.component';
import { HeaderComponent } from './controls/header/header.component';
import { SidenavComponent } from './controls/sidenav/sidenav.component';
import { AddclientComponent } from './dialogs/addclient/addclient.component';
import { AddnoteComponent } from './dialogs/addnote/addnote.component';
import { ConfirmationComponent } from './dialogs/confirmation/confirmation.component';
import { MakepaymentComponent } from './dialogs/makepayment/makepayment.component';
import { AnnotationsComponent } from './pages/annotations/annotations.component';
import { BaseComponent } from './pages/base/base.component';
import { ClientdetailsComponent } from './pages/clientdetails/clientdetails.component';
import { ClientlistComponent } from './pages/clientlist/clientlist.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { EditclientComponent } from './pages/editclient/editclient.component';
import { HelpComponent } from './pages/help/help.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewclientComponent } from './pages/newclient/newclient.component';
import { NewrelativeComponent } from './pages/newrelative/newrelative.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { PaymentslistComponent } from './pages/paymentslist/paymentslist.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ShellComponent } from './pages/shell/shell.component';
import { MetadataPipe } from './pipes/metadata.pipe';
import { AppRoutingModule } from './/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SplashscreenComponent,
    DialogbaseComponent,
    ClientDetailsExpanderComponent,
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    AddclientComponent,
    AddnoteComponent,
    ConfirmationComponent,
    MakepaymentComponent,
    AnnotationsComponent,
    BaseComponent,
    ClientdetailsComponent,
    ClientlistComponent,
    ClientsComponent,
    EditclientComponent,
    HelpComponent,
    HomeComponent,
    LoginComponent,
    NewclientComponent,
    NewrelativeComponent,
    NotificationsComponent,
    PaymentsComponent,
    PaymentslistComponent,
    ProfileComponent,
    ReportsComponent,
    SettingsComponent,
    ShellComponent,
    MetadataPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
