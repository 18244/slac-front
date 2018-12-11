import { LoginPageModule } from './../pages/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import 'rxjs/add/operator/do';
import { ChartsModule } from 'ng2-charts';
import { Camera} from '@ionic-native/camera'



import { UserServiceProvider } from '../providers/user-service/user-service';
import { ChamadoServiceProvider } from '../providers/chamado-service/chamado-service';

@NgModule({
  declarations: [
    MyApp,    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    LoginPageModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    ChamadoServiceProvider, 
    Camera
  ]
})
export class AppModule {}
