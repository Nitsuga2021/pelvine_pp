function doGet() {
  var template = HtmlService.createTemplateFromFile('index');
  var output = template.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL).setTitle('Pacientes Pelvine');
  return output
}

function include(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}

function ingresarBdD(form){
  const datos = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1TMju-1H7Qapf4eR2yftSZ3DY1Ligp7jsUYsc2MgN9Uk/edit?gid=491805317#gid=491805317").getSheetByName("Filt - CABA").getDataRange().getDisplayValues();
  var infoUsuario = []
  var k = 0;
  for( var i in datos){
    if( datos[i][6] == form.usuario){
      infoUsuario[k] = datos[i];
      k = k + 1;
    }
  }
  return infoUsuario
}