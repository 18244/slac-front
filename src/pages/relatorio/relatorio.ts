import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-relatorio',
  templateUrl: 'relatorio.html',
})
export class RelatorioPage {

  @ViewChild('barChart') barChart;  

  public technologies : any = {
    "technologies" : [
                       {
                          'status' : 'Aberto',
                          'time'       : 50,
                          'color'      : 'rgba(206, 61, 95, 0.8)',
                          'hover'      : 'rgba(199, 108, 129, 0.8)'
                       },
                       {
                          'status' : 'Andamento',
                          'time'       : 15,
                          'color'      : 'rgba(83, 131, 185, 0.8)',
                          'hover'      : 'rgba(122, 160, 202, 0.8)'
                       },
                       {
                          'status' : 'Atendido',
                          'time'       : 10,
                          'color'      : 'rgba(198, 147, 194, 0.8)',
                          'hover'      : 'rgba(200, 166, 197, 0.8)'
                       },
                       {
                          'status' : 'Fechado',
                          'time'       : 5,
                          'color'      : 'rgba(54, 116, 152, 0.8)',
                          'hover'      : 'rgba(103, 139, 160, 0.8)'
                       }
   ]
};

public chartLabels : any    = [];
public chartValues : any    = [];
public chartColours : any    = [];
public chartHoverColours : any    = [];
public barChartEl : any;
public chartLoading: any;


  constructor(private _navCtrl: NavController,
              private _navParms: NavParams) {
  }

  ionViewDidLoad() {
    this.defineChartData();
    this.createBarChart();
  }
  defineChartData() : void
  {
     let k : any;

     for(k in this.technologies.technologies)
     {
        var tech  =      this.technologies.technologies[k];

        this.chartLabels.push(tech.status);
        this.chartValues.push(tech.time);
        this.chartColours.push(tech.color);
        this.chartHoverColours.push(tech.hover);
     }
  } 
  
  createBarChart()
  {
     this.barChartEl 			= new Chart(this.barChart.nativeElement,
     {
        type: 'bar',
        data: {
           labels: this.chartLabels,
            datasets: [{
                label                 : 'Relatório de chamados',
                data                  : this.chartValues,
                duration              : 2000,
                easing                : 'easeInQuart',
                backgroundColor       : this.chartColours,
                hoverBackgroundColor  : this.chartHoverColours
            }]
        },
        options : {
           maintainAspectRatio: false,
           legend         : {
              display     : true,
              boxWidth    : 80,
              fontSize    : 15,
              padding     : 0
           },
           scales: {
               yAxes: [{
                   ticks: {
                      beginAtZero:true,
                      stepSize: 5,
                      max : 100
                   }
               }],
               xAxes: [{
                   ticks: {
                      autoSkip: false
                   }
               }]
           }
        }
     });
  }
  irHomePage(): void{
    this._navCtrl.setRoot(HomePage.name);
  }
}
