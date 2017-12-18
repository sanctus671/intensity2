import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AppSettings} from '../../app/app.settings';
import { Storage } from '@ionic/storage';


/*
  Generated class for the DiaryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChartProvider {

    constructor(public http: HttpClient, public storage: Storage) {

    }
    
    private brighten(hex, lum){
        // Validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, "");
        if (hex.length < 6) {
          hex = hex.replace(/(.)/g, '$1$1');
        }
        lum = lum || 0;
        // Convert to decimal and change luminosity
        var rgb = "#",
          c;
        for (var i = 0; i < 3; ++i) {
          c = parseInt(hex.substr(i * 2, 2), 16);
          c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
          rgb += ("00" + c).substr(c.length);
        }
        return rgb;        
    }
    
    public getColors(){
        var colors = [],
            base = '#de4223',
            i;

        for (i = 0; i < 20; i += 1) {
            // Start out with a darkened base color (negative brighten), and end
            // up with a much brighter color
            colors.push(this.brighten(base, (i - 3) / 7));
        }
        return colors;
    }
  
  
    public getLineConfig(){
        return {
            options: {
                chart: {
                    type: 'line',
                    zoomType: 'x',
                    resetZoomButton: {
                        position: {
                            align: 'right', // right by default
                            verticalAlign: 'top',
                            y: 10
                        },
                        relativeTo: 'chart'
                    },                
                    spacingRight: 20,
                    marginLeft:70,
                    marginTop:40
                }
            },
            series: [{
                data: [],
                name: "",
                color: '#de4223',
                showInLegend: false
            }],
            title: {
                text: null
            },
            credits: {
              enabled: false
            },            
            yAxis: {title:{text:""},min: 0},
            xAxis: {type: 'datetime',
                    dateTimeLabelFormats: { // don't display the dummy year
                        month: '%e. %b',
                        year: '%b'
                    }},
            tooltip: {
                //headerFormat: '<b>{series.name}</b><br>',
                //pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
            },                
            loading: false
        }
    }
    
    public getHeatmapConfig(){
        return {
            chart: {
                type: 'heatmap',
                spacingRight: 20
            }, 
            colorAxis: {
                min:0,
                minColor: '#ffffff',
                maxColor: '#de4223'
            },
            legend:{
                enabled:true
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '<b>Date:</b> {point.x:%e. %b}<br><b>Volume:</b> {point.value:.0f}'     
            },
            title: {
                text: null
            },
            credits: {
              enabled: false
            },
            xAxis: {
                type: 'datetime',
                min: Date.UTC(2016, 0, 1),
                max: Date.UTC(2017, 0, 1), 
                labels: {
                    format: '{value:%b}',
                    step:1
                },
                showLastLabel: false,
                tickLength: 4
            },

            yAxis: {
                categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                title: null,
                reversed: true,  
                    gridLineWidth: 0,
                    minorGridLineWidth: 0,            
            },

            series: [{
                name: 'Session workload',
                borderWidth: 0,
                colsize: 24 * 36e5 *7 , // one day
                borderColor:'#de4223',
                data: [],
                dataLabels: {
                    enabled: false,
                    color: 'black',
                    style: {
                        textShadow: 'none'
                    }
                }

            }]

        }
    }
        
        
    public getPieConfig(){
        return { 
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },

            tooltip: {
                pointFormat: 'Total Volume:<b>{point.y:.0f}</b><br>{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    },
                    colors: this.getColors()
                }
            },
            title: {
                text: null
            },
            credits: {
              enabled: false
            },            
            series: [{
                name: 'Percentage of total volume',
                colorByPoint: true,
                borderWidth: 0,
                data: []
            }]

        }      
        
    }
    


}
