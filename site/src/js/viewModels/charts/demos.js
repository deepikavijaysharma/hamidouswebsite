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



			
			var envArray = [{
                    id: '1',
                    Group: 'Platform',
                    Team: 'Integration',
                    TeamLead: 'Craig Mikus',
                    GSEAccountOwner: '<a href="mailto:bruce.bailey@oracle.com">Bruce Bailey</a>',
                    GSEReportLink: 'https://dss-obiee.oracleads.com/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FGSE%20Public%2F_portal%2FDemo%20Activity%20Report&Page=Environment%20Usage%20%26%20Assignments&PageIdentifier=dci6so08o36rkjab&BookmarkState=c646hqtff9i0v2tp4hfhs3i4p2&opti',
                    GSEUCMEnvironmentsTotalNumber: 6,
                    GSEUCMEnvironmentsZeroDemos: 2,
                    TotalDemos: 8,
                    FutureDemos: 0,
                    DemosMonthtoDate: 0,
                    DemosPriorMonth: 1,
                    Demos2MonthsBack: 7,
                    TotalPastDemos: 8,
                    PercentwithZeroDemos: 33,
                    DemosEnvMonth: 0.6
                },
                {
                    id: '2',
                    Group: 'Platform',
                    Team: 'IaaS/AppDev',
                    TeamLead: 'Joe Corvaia',
                    GSEAccountOwner: '<a href="mailto:aravind.tadakamalla@oracle.com;anoop.deshpande@oracle.com">Aravind Tadakamalla, Anoop Deshpande</a>',
                    GSEReportLink: 'https://dss-obiee.oracleads.com/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FGSE%20Public%2F_portal%2FDemo%20Activity%20Report&Page=Environment%20Usage%20%26%20Assignments&PageIdentifier=dci6so08o36rkjab&BookmarkState=vdet2qqng5bs1jqk2trs0gabtm&opti',
                    GSEUCMEnvironmentsTotalNumber: 5,
                    GSEUCMEnvironmentsZeroDemos: 2,
                    TotalDemos: 7,
                    FutureDemos: 0,
                    DemosMonthtoDate: 0,
                    DemosPriorMonth: 6,
                    Demos2MonthsBack: 1,
                    TotalPastDemos: 7,
                    PercentwithZeroDemos: 40,
                    DemosEnvMonth: 0.7
                },
                {
                    id: '3',
                    Group: 'Platform',
                    Team: 'Security',
                    TeamLead: 'Michael Freel',
                    GSEAccountOwner: '<a href="mailto:waymon.whiting@oracle.com">Waymon Whiting</a>',
                    GSEReportLink: 'https://dss-obiee.oracleads.com/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FGSE%20Public%2F_portal%2FDemo%20Activity%20Report&Page=Environment%20Usage%20%26%20Assignments&PageIdentifier=dci6so08o36rkjab&BookmarkState=928l12lgdltfkpvr64bvcd1hsu&opti',
                    GSEUCMEnvironmentsTotalNumber: 8,
                    GSEUCMEnvironmentsZeroDemos: 5,
                    TotalDemos: 8,
                    FutureDemos: 1,
                    DemosMonthtoDate: 0,
                    DemosPriorMonth: 3,
                    Demos2MonthsBack: 4,
                    TotalPastDemos: 7,
                    PercentwithZeroDemos: 63,
                    DemosEnvMonth: 0.4
                },
                {
                    id: '4',
                    Group: 'Platform',
                    Team: 'Information Management',
                    TeamLead: 'Paul Miller',
                    GSEAccountOwner: '<a href="mailto:david.bayard@oracle.com;catherine.szen@oracle.com">David Bayard, Catherine Szen</a>',
                    GSEReportLink: 'https://dss-obiee.oracleads.com/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FGSE%20Public%2F_portal%2FDemo%20Activity%20Report&Page=Environment%20Usage%20%26%20Assignments&PageIdentifier=dci6so08o36rkjab&BookmarkState=br81cc5tfmpnt7c1gu46cksibu&opti',
                    GSEUCMEnvironmentsTotalNumber: 5,
                    GSEUCMEnvironmentsZeroDemos: 0,
                    TotalDemos: 15,
                    FutureDemos: 1,
                    DemosMonthtoDate: 1,
                    DemosPriorMonth: 8,
                    Demos2MonthsBack: 5,
                    TotalPastDemos: 14,
                    PercentwithZeroDemos: 0,
                    DemosEnvMonth: 1.3
                },
                {
                    id: '5',
                    Group: 'Platform',
                    Team: 'Adrienne Howard',
                    TeamLead: 'Adam Driver',
                    GSEAccountOwner: '<a href="mailto:adrienne.howard@oracle.com">Adrienne Howard</a>',
                    GSEReportLink: 'https://dss-obiee.oracleads.com/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FGSE%20Public%2F_portal%2FDemo%20Activity%20Report&Page=Environment%20Usage%20%26%20Assignments&PageIdentifier=dci6so08o36rkjab&BookmarkState=d7sk0f94vcuu7d10e473he8uq6&opti',
                    GSEUCMEnvironmentsTotalNumber: 6,
                    GSEUCMEnvironmentsZeroDemos: 0,
                    TotalDemos: 29,
                    FutureDemos: 0,
                    DemosMonthtoDate: 2,
                    DemosPriorMonth: 18,
                    Demos2MonthsBack: 9,
                    TotalPastDemos: 29,
                    PercentwithZeroDemos: 0,
                    DemosEnvMonth: 2.2
                },
                {
                    id: '6',
                    Group: 'OD',
                    Team: 'OD',
                    TeamLead: 'Carl Griffin',
                    GSEAccountOwner: '<a href="mailto:ashish.sohane@oracle.com">Ashish Sohane</a>',
                    GSEReportLink: 'https://dss-obiee.oracleads.com/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FGSE%20Public%2F_portal%2FDemo%20Activity%20Report&Page=Environment%20Usage%20%26%20Assignments&PageIdentifier=dci6so08o36rkjab&BookmarkState=9befjq9dihibgoie49kqqgu6nm&opti',
                    GSEUCMEnvironmentsTotalNumber: 18,
                    GSEUCMEnvironmentsZeroDemos: 11,
                    TotalDemos: 25,
                    FutureDemos: 6,
                    DemosMonthtoDate: 6,
                    DemosPriorMonth: 13,
                    Demos2MonthsBack: 0,
                    TotalPastDemos: 19,
                    PercentwithZeroDemos: 61,
                    DemosEnvMonth: 0.5
                },
                {
                    id: '7',
                    Group: 'ECA',
                    Team: 'National',
                    TeamLead: 'Edwin Upson',
                    GSEAccountOwner: '<a href="mailto:william.x.green@oracle.com">William Green</a>',
                    GSEReportLink: 'https://dss-obiee.oracleads.com/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FGSE%20Public%2F_portal%2FDemo%20Activity%20Report&Page=Environment%20Usage%20%26%20Assignments&PageIdentifier=dci6so08o36rkjab&BookmarkState=9dr5n9lrt119sg3b08ustngkji&opti',
                    GSEUCMEnvironmentsTotalNumber: 11,
                    GSEUCMEnvironmentsZeroDemos: 1,
                    TotalDemos: 66,
                    FutureDemos: 12,
                    DemosMonthtoDate: 10,
                    DemosPriorMonth: 37,
                    Demos2MonthsBack: 7,
                    TotalPastDemos: 54,
                    PercentwithZeroDemos: 9,
                    DemosEnvMonth: 2.3
                },
                {
                    id: '8',
                    Group: 'ECA',
                    Team: 'Enterprise Named & EGA/CPG/Util',
                    TeamLead: 'Robin Link',
                    GSEAccountOwner: '<a href="mailto:job.miller@oracle.com;jeff.knudsen@oracle.com">Job Miller, Jeff Knudsen</a>',
                    GSEReportLink: 'https://dss-obiee.oracleads.com/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FGSE%20Public%2F_portal%2FDemo%20Activity%20Report&Page=Environment%20Usage%20%26%20Assignments&PageIdentifier=dci6so08o36rkjab&BookmarkState=iaqgabonve569q9u5vomv6bkd6&opti',
                    GSEUCMEnvironmentsTotalNumber: 5,
                    GSEUCMEnvironmentsZeroDemos: 2,
                    TotalDemos: 11,
                    FutureDemos: 2,
                    DemosMonthtoDate: 0,
                    DemosPriorMonth: 8,
                    Demos2MonthsBack: 1,
                    TotalPastDemos: 9,
                    PercentwithZeroDemos: 40,
                    DemosEnvMonth: 0.8
                },
                {
                    id: '9',
                    Group: 'ECA',
                    Team: 'Retail & Healthcare',
                    TeamLead: 'Alan Levine',
                    GSEAccountOwner: '<a href="mailto:michael.x.glas@oracle.com">Michael Glas</a>',
                    GSEReportLink: 'https://dss-obiee.oracleads.com/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FGSE%20Public%2F_portal%2FDemo%20Activity%20Report&Page=Environment%20Usage%20%26%20Assignments&PageIdentifier=dci6so08o36rkjab&BookmarkState=66i45isgrfb369sf31bbl98hua&opti',
                    GSEUCMEnvironmentsTotalNumber: 4,
                    GSEUCMEnvironmentsZeroDemos: 1,
                    TotalDemos: 10,
                    FutureDemos: 0,
                    DemosMonthtoDate: 0,
                    DemosPriorMonth: 2,
                    Demos2MonthsBack: 8,
                    TotalPastDemos: 10,
                    PercentwithZeroDemos: 25,
                    DemosEnvMonth: 1.2
                },
                {
                    id: '10',
                    Group: 'ECA',
                    Team: 'FSI/Telco',
                    TeamLead: 'Larry Welles',
                    GSEAccountOwner: '<a href="mailto:walter.romanski@oracle.com">Walter Romanski</a>',
                    GSEReportLink: 'https://dss-obiee.oracleads.com/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FGSE%20Public%2F_portal%2FDemo%20Activity%20Report&Page=Environment%20Usage%20%26%20Assignments&PageIdentifier=dci6so08o36rkjab&BookmarkState=2a9eot3uvlit8881btmpso75bm&opti',
                    GSEUCMEnvironmentsTotalNumber: 3,
                    GSEUCMEnvironmentsZeroDemos: 0,
                    TotalDemos: 5,
                    FutureDemos: 0,
                    DemosMonthtoDate: 0,
                    DemosPriorMonth: 2,
                    Demos2MonthsBack: 3,
                    TotalPastDemos: 5,
                    PercentwithZeroDemos: 0,
                    DemosEnvMonth: 0.8
                },
                {
                    id: '11',
                    Group: 'PS',
                    Team: 'PS',
                    TeamLead: 'Aaron Cornfeld',
                    GSEAccountOwner: '<a href="mailto:carlos.augusto@oracle.com">Carlos Augusto</a>',
                    GSEReportLink: 'https://dss-obiee.oracleads.com/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FGSE%20Public%2F_portal%2FDemo%20Activity%20Report&Page=Environment%20Usage%20%26%20Assignments&PageIdentifier=dci6so08o36rkjab&BookmarkState=hbhlktcin3g2tf82c2fk64bsaq&opti',
                    GSEUCMEnvironmentsTotalNumber: 14,
                    GSEUCMEnvironmentsZeroDemos: 9,
                    TotalDemos: 5,
                    FutureDemos: 1,
                    DemosMonthtoDate: 0,
                    DemosPriorMonth: 0,
                    Demos2MonthsBack: 4,
                    TotalPastDemos: 4,
                    PercentwithZeroDemos: 64,
                    DemosEnvMonth: 0.1
                },
                {
                    id: '12',
                    Group: 'CSM',
                    Team: 'CSM',
                    TeamLead: 'Misha Logvinov',
                    GSEAccountOwner: '<a href="mailto:craig.lockwood@oracle.com">Craig Lockwood</a>',
                    GSEReportLink: 'https://dss-obiee.oracleads.com/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FGSE%20Public%2F_portal%2FDemo%20Activity%20Report&Page=Environment%20Usage%20%26%20Assignments&PageIdentifier=dci6so08o36rkjab&BookmarkState=sakn4n11gj52ns7leslj48lmtu&opti',
                    GSEUCMEnvironmentsTotalNumber: 7,
                    GSEUCMEnvironmentsZeroDemos: 2,
                    TotalDemos: 18,
                    FutureDemos: 3,
                    DemosMonthtoDate: 1,
                    DemosPriorMonth: 3,
                    Demos2MonthsBack: 11,
                    TotalPastDemos: 15,
                    PercentwithZeroDemos: 29,
                    DemosEnvMonth: 1.0
                },
                {
                    id: '13',
                    Group: 'Workshop/Hubs',
                    Team: 'It includes Hub Instances as well as Hub Platform instances',
                    TeamLead: 'Patrick Davies, Subhash Vanga, Jack Kingsley, Girish Venkat',
                    GSEAccountOwner: '<a href="mailto:steven.nichols@oracle.com;subhash.vanga@oracle.com;jack.kingsley@oracle.com;v.girish@oracle.com">Steven Nichols, Subhash Vanga, Jack Kingsley, Girish Venkat</a>',
                    GSEReportLink: 'https://dss-obiee.oracleads.com/analytics/saw.dll?Dashboard&PortalPath=%2Fshared%2FGSE%20Public%2F_portal%2FDemo%20Activity%20Report&Page=Environment%20Usage%20%26%20Assignments&PageIdentifier=dci6so08o36rkjab&BookmarkState=vbnoj8nrllbcn4asb1qq96kbvq&opti',
                    GSEUCMEnvironmentsTotalNumber: 21,
                    GSEUCMEnvironmentsZeroDemos: 9,
                    TotalDemos: 25,
                    FutureDemos: 2,
                    DemosMonthtoDate: 2,
                    DemosPriorMonth: 7,
                    Demos2MonthsBack: 14,
                    TotalPastDemos: 23,
                    PercentwithZeroDemos: 43,
                    DemosEnvMonth: 0.5
                }
            ];
			//console.log("all data 2"+self.fetchdetails());
            self.datasource = new oj.ArrayTableDataSource(envArray, {
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

            for (var i = 0; i < envArray.length; i++) {
				
                self.gsetotalnumber = envArray[i].GSEUCMEnvironmentsTotalNumber + self.gsetotalnumber;
                self.gsezeronumber = envArray[i].GSEUCMEnvironmentsZeroDemos + self.gsezeronumber;
                self.gsetotaldemo = envArray[i].TotalDemos + self.gsetotaldemo;
                self.futuredemo = envArray[i].FutureDemos + self.futuredemo;
                self.demosmonthtodate = envArray[i].DemosMonthtoDate + self.demosmonthtodate;
                self.demospriormonth = envArray[i].DemosPriorMonth + self.demospriormonth;
                self.demostwomonths = envArray[i].Demos2MonthsBack + self.demostwomonths;
                self.totalpastdemo = envArray[i].TotalPastDemos + self.totalpastdemo;
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