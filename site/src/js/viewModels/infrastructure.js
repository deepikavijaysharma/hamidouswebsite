define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojtoolbar', 'graphs', 'ojs/ojdialog', 'ojs/ojtable', 'ojs/ojarraytabledatasource'],
    function(oj, ko, $) {
        function ChartModel() {

            /* toggle button variables */
            var self = this;
			
			
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


        }
        return new ChartModel();

    });