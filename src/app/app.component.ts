import { NovoChamadoPage } from './../pages/novo-chamado/novo-chamado';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'myapp',
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  @ViewChild(Nav)
  public nav: Nav;

  public paginas = [
    { titulo: 'Novo Chamado', page: NovoChamadoPage.name, icone: 'person-add' },
    { titulo: 'Seus chamados', page: LoginPage, icone: 'person' },
    { titulo: 'Relatórios', page: LoginPage, icone: 'trending-up' },
    { titulo: 'A equipe de manutenção', page: LoginPage, icone: 'construct' },
    { titulo: 'Tutorial', page: LoginPage, icone: 'bulb' },
    { titulo: 'Sobre', page: LoginPage, icone: 'help-circle' },
    { titulo: 'Logout', page: LoginPage, icone: 'exit' }
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  irParaPagina(page){
    if(page.name === LoginPage.name )
      this.nav.setRoot(page);
    
    else
      this.nav.push(page);
    
  }
}

