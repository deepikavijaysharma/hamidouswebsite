define(['ojs/ojcore', 'knockout', 'jquery', 'graphs', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojtoolbar','knockoutchart','ojs/ojdialog', 'ojs/ojtable', 'ojs/ojarraytabledatasource'],
    function(oj, ko, $) {
        function ChartModel() {

            /* toggle button variables 
	  https://jsfiddle.net/6d0jsyxu/1/
	  */
            var self = this;
			 self.demodataset = ['0.6', '0.7', '0.4', '1.3', '2.2', '0.5', '2.3', '0.8', '1.2', '0.8', '0.1', '1.0', '0.5'];
               self.democolorarray = [];
                for (var i = 0; i < self.demodataset.length; i++) {
                    if (self.demodataset[i] <= 1) {
                        self.democolorarray.push('#fc4544');
                    } else if (self.demodataset[i] > 1 && self.demodataset[i] < 2) {
                        self.democolorarray.push('#ffd83c');
                    } else {
                        self.democolorarray.push('#6bc986');
                    }
                }
				
                /*data for percent with zero demos*/
               self.zerodemodataset = [33, 40, 63, 0, 0, 61, 9, 40, 25, 0, 64, 29, 43];
                self.zerodemocolorarray = [];
                for (var i = 0; i < self.zerodemodataset.length; i++) {
                    if (self.zerodemodataset[i] == 0) {
                        self.zerodemocolorarray.push('#6bc986');
                    } else if (self.zerodemodataset[i] < 50) {
                        self.zerodemocolorarray.push('#ffd83c');
                    } else {
                        self.zerodemocolorarray.push('#fc4544');
                    }

                }


               self.chartColors = {
                    red: '#fc4544',
                    yellow: '#ffd83c',
                    green: '#6bc986',
			   };
					self.BarData = {
					labels: ["Integration", "IaaS/AppDev", "Security", "Information Management", "Analytics", "OD", "National", "Enterprise Named & EGA/CPG/Util", "Retail & Healthcare", "FSI/Telco", "PS", "CSM", "Workshops/Hubs"],
					datasets: [{
                                label: 'Percent with Zero Demos',
                                data: self.zerodemodataset,
								 yAxisID: 'B',
                                backgroundColor: self.zerodemocolorarray,
                                borderColor: '#555',
                                radius: 8,
                                hoverRadius: 8,
                                type: 'bubble',
                                borderWidth: 1
                            },
                            {
                                label: 'Demos/Env/Month',
                                backgroundColor: self.democolorarray,
								yAxisID: 'A',
                                borderWidth: 0,
                                data: self.demodataset,
								type: 'bar'
                            }
					]
					
				};
               

			
				
				self.BarOptions =  {
                        responsive: true,
                        legend: {
                            display: false


                        },
                        scales: {
                            yAxes: [{
                                id: 'A',
                                type: 'linear',
                                position: 'left',
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Demos per Environment per Month'
                                },
                                ticks: {

                                }
                            }, {
                                id: 'B',
                                type: 'linear',
                                position: 'right',
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Percent with Zero Demos'
                                },
                                ticks: {
                                    max: 100,
                                    min: 0
                                },

                                ticks: {
                                    beginAtZero: true,
                                    autoSkip: false,

                                    callback: function(value, index, values) {
                                        return value + '%';
                                    }
                                }
                            }],
                            xAxes: [{
                                ticks: {

                                    autoSkip: false
                                }
                            }]
                        },
                        onClick: function(e) {
							
                            var activePoints = this.getElementsAtEvent(e);
                            var selectedIndex = activePoints[0]._index;
							//(selectedIndex);
                            //alert(this.data.datasets[0].data[selectedIndex]);
                            //alert(this.data.labels[selectedIndex]);   
                            var showdiv = "#graph" + selectedIndex;
                            $('#mainchart').toggle("slow");
                            $(showdiv).toggle("slow");
                        }


                    };
self.subchartlabels = ["GSE UCM Environments- Total Number", "GSE UCM Environments - Zero Demos", "Total Demos", "Future Demos", "Demos Month to Date", "Demos Prior Month", "Demos 2 Months Back", "Total Past Demos"];
self.subchart1 = {
    labels: self.subchartlabels,
    datasets: [{
                            label: 'Number of Demos',
                            data: ['6', '2', '8', '0', '0', '1', '7', '8'],
                            backgroundColor: '#27a5e4',
                        }]

};


self.subchartOptions = {
                        legend: {
                            display: true
                        }
};


self.subchart2 = {
    labels: self.subchartlabels,
    datasets: [{
                            label: 'Number of Demos',
                            data: ['5', '2', '7', '0', '0', '6', '1', '7'],
                            backgroundColor: '#27a5e4',
                        }]

};

self.subchart3 = {
    labels: self.subchartlabels,
    datasets: [{
                            label: 'Number of Demos',
                            data: ['8', '5', '8', '1', '0', '3', '4', '7'],
                            backgroundColor: '#27a5e4',
                        }]

};

self.subchart4 = {
    labels: self.subchartlabels,
    datasets: [{
                            label: 'Number of Demos',
                            data: ['5', '0', '15', '1', '1', '8', '5', '14'],
                            backgroundColor: '#27a5e4',
                        }]

};

self.subchart5 = {
    labels: self.subchartlabels,
    datasets: [{
                            label: 'Number of Demos',
                            data: ['6', '0', '29', '0', '2', '18', '9', '29'],
                            backgroundColor: '#27a5e4',
                        }]

};

self.subchart6 = {
    labels: self.subchartlabels,
    datasets: [{
                            label: 'Number of Demos',
                            data: ['18', '11', '25', '6', '6', '13', '0', '19'],
                            backgroundColor: '#27a5e4',
                        }]

};

self.subchart7 = {
    labels: self.subchartlabels,
    datasets: [{
                            label: 'Number of Demos',
                            data: ['11', '1', '66', '12', '10', '37', '7', '54'],
                            backgroundColor: '#27a5e4',
                        }]

};

self.subchart8 = {
    labels: self.subchartlabels,
    datasets: [{
                            label: 'Number of Demos',
                            data: ['5', '2', '11', '2', '0', '8', '1', '9'],
                            backgroundColor: '#27a5e4',
                        }]

};

self.subchart9 = {
    labels: self.subchartlabels,
    datasets: [{
                            label: 'Number of Demos',
                            data: ['4', '1', '10', '0', '0', '2', '8', '10'],
                            backgroundColor: '#27a5e4',
                        }]

};

self.subchart10 = {
    labels: self.subchartlabels,
    datasets: [{
                            label: 'Number of Demos',
                            data: ['3', '0', '5', '0', '0', '2', '3', '5'],
                            backgroundColor: '#27a5e4',
                        }]

};

self.subchart11 = {
    labels: self.subchartlabels,
    datasets: [{
                            label: 'Number of Demos',
                            data: ['14', '9', '5', '1', '0', '0', '4', '4'],
                            backgroundColor: '#27a5e4',
                        }]

};

self.subchart12 = {
    labels: self.subchartlabels,
    datasets: [{
                            label: 'Number of Demos',
                            data: ['7', '2', '18', '3', '1', '3', '11', '15'],
                            backgroundColor: '#27a5e4',
                        }]

};


self.subchart13 = {
    labels: self.subchartlabels,
    datasets: [{
                            label: 'Number of Demos',
                            data: ['21', '9', '25', '2', '2', '7', '14', '23'],
                            backgroundColor: '#27a5e4',
                        }]

};



			
			self.fetchdetails = function () {
			 var result = null;
    $.ajax({
        async: false,
        url: "http://localhost:8000/css/infrastructure.json",
        dataType: "json",
        success: function(data){
            result = data;
        }
	});
    return result;
			
			}
			self.fetchdetails();
			console.log("all data 2"+self.fetchdetails());
            self.datasource = new oj.ArrayTableDataSource(self.fetchdetails(), {
                idAttribute: 'id'
            });
            self.gsetotalnumber = 0;
            self.gsezeronumber = 0;
            self.gsetotaldemo = 0;
            self.futuredemo = 0;
            self.demosmonthtodate = 0;
            self.demospriormonth = 0;
            self.demostwomonths = 0;
            self.totalpastdemo = 0;
            self.percentwithzero = 0;
            self.demosenvmonth = 0;

            for (var i = 0; i < self.fetchdetails().length; i++) {
				
                self.gsetotalnumber = self.fetchdetails()[i].GSEUCMEnvironmentsTotalNumber + self.gsetotalnumber;
                self.gsezeronumber = self.fetchdetails()[i].GSEUCMEnvironmentsZeroDemos + self.gsezeronumber;
                self.gsetotaldemo = self.fetchdetails()[i].TotalDemos + self.gsetotaldemo;
                self.futuredemo = self.fetchdetails()[i].FutureDemos + self.futuredemo;
                self.demosmonthtodate = self.fetchdetails()[i].DemosMonthtoDate + self.demosmonthtodate;
                self.demospriormonth = self.fetchdetails()[i].DemosPriorMonth + self.demospriormonth;
                self.demostwomonths = self.fetchdetails()[i].Demos2MonthsBack + self.demostwomonths;
                self.totalpastdemo = self.fetchdetails()[i].TotalPastDemos + self.totalpastdemo;
                self.percentwithzero = Math.ceil(((self.gsezeronumber / self.gsetotalnumber) * 100));
                self.demosenvmonth = ((self.totalpastdemo / self.gsetotalnumber) / 2.15).toFixed(1);

            }

            var envreportedArray = [{
                gsetotalnumberreport: 111,
                gsezeronumberreport: 42,
                gsetotaldemoreport: 232,
                futuredemoreport: 28,
                demosmonthtodatereport: 22,
                demospriormonthreport: 109,
                demostwomonthsreport: 73,
                totalpastdemoreport: 111,
                percentwithzeroreport: 111,
                demosenvmonthreport: 111,
                envreportlink: 'https://dss-obiee.oracleads.com/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FGSE%20Public%2F_portal%2FDemo%20Activity%20Report&Page=Environment%20Usage%20%26%20Assignments&PageIdentifier=dci6so08o36rkjab&BookmarkState=s8d1u9s3ff813u84l06j0m0nne&opti',

            }];

            for (var z = 0; z < envreportedArray.length; z++) {
                self.gsetotalnumberreport = envreportedArray[z].gsetotalnumberreport;
                self.gsezeronumberreport = envreportedArray[z].gsezeronumberreport;
                self.gsetotaldemoreport = envreportedArray[z].gsetotaldemoreport;
                self.futuredemoreport = envreportedArray[z].futuredemoreport;
                self.demosmonthtodatereport = envreportedArray[z].demosmonthtodatereport;
                self.demospriormonthreport = envreportedArray[z].demospriormonthreport;
                self.demostwomonthsreport = envreportedArray[z].demostwomonthsreport;
                self.totalpastdemoreport = self.demostwomonthsreport + self.demospriormonthreport + self.demosmonthtodatereport;
                self.percentwithzeroreport = Math.ceil(((self.gsezeronumberreport / self.gsetotalnumberreport) * 100));
                self.demosenvmonthreport = ((self.totalpastdemoreport / self.gsetotalnumberreport) / 2.15).toFixed(1);
                self.envreportlink = envreportedArray[z].envreportlink;

            }


            self.showreport = function() {
                $("#reportsDialog").ojDialog("open");
            };
			
			//self.currentProfit= ko.observable(150000);
			
			self.addBgpercent = function(value){
				if(value == 0)
				{
					return 'greenBg';
					}
					else if(value < 50)
				{
					return 'yellowBg';
					}
					else{
						return 'redBg';
						}
				
				}
				self.addBgvalue = function(value){
				if(value <= 1)
				{
					return 'redBg';
					}
					else if(value>1 && value<2)
				{
					return 'yellowBg';
					}
					else{
						return 'greenBg';
						}
				
				}






            goback = function() {
                $('#mainchart').toggle("slow");
                $('.graphs').hide("slow");
            }




        }
        return new ChartModel();

    });