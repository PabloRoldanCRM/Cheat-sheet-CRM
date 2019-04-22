
function processPDF(){
   var sessionArray =  runReportToPrint(customFileName,entityName,reportName,reportGuid);
   var sendToSharepoint = confirm("¿Enviar Sharepoint?");
   if(sendToSharepoint)
      var data = convertResponseToPDF(sessionArray);
   else
      return;
}

function convertResponseToPDF(arrResponseSession) {
    //Create query string that will be passed to Report Server to generate PDF version of report response.
    var pth = Xrm.Page.context.getClientUrl() + "/Reserved.ReportViewerWebControl.axd?ReportSession=" + arrResponseSession[0] + "&Culture=1033&CultureOverrides=True&UICulture=1033&UICultureOverrides=True&ReportStack=1&ControlID=" + arrResponseSession[1] + "&OpType=Export&FileName=Public&ContentDisposition=OnlyHtmlInline&Format=PDF";
    //Create request object that will be called to convert the response in PDF base 64 string.
    var retrieveEntityReq = new XMLHttpRequest();
    retrieveEntityReq.open("GET", pth, false);
    retrieveEntityReq.setRequestHeader("Accept", "*/*");
    retrieveEntityReq.responseType = "arraybuffer";
    retrieveEntityReq.onreadystatechange = function () { // This is the callback function.
        if (retrieveEntityReq.readyState == 4 && retrieveEntityReq.status == 200) {
            var binary = "";
            var bytes = new Uint8Array(this.response);
            for (var i = 0; i < bytes.byteLength; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            //This is the base 64 PDF formatted string and is ready to pass to the action as an input parameter.
            var base64PDFString = btoa(binary);
            //4. Call Action and pass base 64 string as an input parameter. That’s it.
      }

    };
    retrieveEntityReq.send();

}

///Function that handler the PDF download
///<params>
///customFileName - the file name, PDF's name (example) without parenthesis
///entityName - the logical name of the entity where report runs
///reportName - the name of the report (example.rdl) without parenthesis
//reportGuid - the GUID value of the report (D6975B18-B63A-E911-A97A-000D3A3AC6BB) without parenthesis
function runReportToPrint(customFileName,entityName,reportName,reportGuid) {
    debugger    
    var params = getReportingSession(entityName,reportName,reportGuid);
    if(params.length>0){
    var newPth = Xrm.Page.context.getClientUrl() + "/Reserved.ReportViewerWebControl.axd?ReportSession=" + params[0] + "&Culture=1033&CultureOverrides=True&UICulture=1033&UICultureOverrides=True&ReportStack=1&ControlID=" + params[1] + "&OpType=Export&FileName=" + customFileName + "&ContentDisposition=OnlyHtmlInline&Format=PDF";
    window.open(newPth, "_self");
    return params ;
    }
}
    
///Function that runReportToPrint uses to get ReportSession AND ControlID
    function getReportingSession(entityName,reportName,reportGuid) {
    
    var recordId = Xrm.Page.data.entity.getId();
    recordId = recordId.replace('{', '').replace('}', '');
    
    var strParameterXML = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'><entity name='"+entityName+"'><all-attributes /><filter type='and'><condition attribute='"+entityName+"id"+"' operator='eq' value='" + recordId + "' /> </filter></entity></fetch>";
    //use this pth for  version 8.2
    //var pth = Xrm.Page.context.getClientUrl() + "/CRMReports/rsviewer/QuirksReportViewer.aspx";
    //use this pth for version 9.0
    //var pth = Xrm.Page.context.getClientUrl() + "/CRMReports/rsviewer/reportviewer.aspx";
    var pth = Xrm.Page.context.getClientUrl() + "/CRMReports/rsviewer/ReportViewer.aspx";
    var retrieveEntityReq = new XMLHttpRequest();
    
    retrieveEntityReq.open("POST", pth, false);
    retrieveEntityReq.setRequestHeader("Accept", "*/*");
    retrieveEntityReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    retrieveEntityReq.send("id=%7B" + reportGuid + "%7D&uniquename=" + Xrm.Page.context.getOrgUniqueName() + "&iscustomreport=true&reportnameonsrs=&reportName=" + reportName + "&isScheduledReport=false&p:CRM_contact="+strParameterXML);
    
    var x = retrieveEntityReq.responseText.lastIndexOf("ReportSession=");
    var y = retrieveEntityReq.responseText.lastIndexOf("ControlID=");
    
    var ret = [];
    ret[0] = retrieveEntityReq.responseText.substr(x + 14, 24);
    ret[1] = retrieveEntityReq.responseText.substr(y + 10, 32);
    
    return ret;
    }

    function sendToSharepoint(dataBase64){
        debugger
        var result = null;
        var site = "";
        var query =  "sharepointsites?$select=absoluteurl&$filter=contains(name,'Sitio predeterminado')";
        var result = Retrieve_WebApi(query);
        if(result!=null){
            site  = result.value[0]["absoluteurl"];
        }
        if(site.length>0)
        {

        }
    }

   