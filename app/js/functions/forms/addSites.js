import adicionaZero, { mostrarErro } from "../ultilitys.js";

function addSite(){
    ZOHO.CREATOR.init()
    .then(function(data) {
     var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
     var paramsID = queryParams.idconta
     
     var form_cliente_site = document.getElementById("form_cliente_site");
     var form_cliente_siteValue = form_cliente_site.options[form_cliente_site.selectedIndex].value;
 
     var form_cliente_operadora = document.getElementById("form_cliente_operadora");
     var form_cliente_operadoraValue = form_cliente_operadora.options[form_cliente_operadora.selectedIndex].value;

     var form_cliente_tipoSite = document.getElementById("form_cliente_tipoSite");
     var form_cliente_tipoSiteValue = form_cliente_tipoSite.options[form_cliente_tipoSite.selectedIndex].value;

     var form_cliente_coordenadorCliente = document.getElementById("form_cliente_coordenadorCliente");
     var form_cliente_coordenadorClienteValue = form_cliente_coordenadorCliente.options[form_cliente_coordenadorCliente.selectedIndex].value;
  
     var form_cliente_coordenadorMobilize = document.getElementById("form_cliente_coordenadorMobilize");
     var form_cliente_coordenadorMobilizeValue = form_cliente_coordenadorMobilize.options[form_cliente_coordenadorMobilize.selectedIndex].value;
    
     var form_cliente_etapa = document.getElementById("form_cliente_etapa");
     var form_cliente_etapaValue = form_cliente_etapa.options[form_cliente_etapa.selectedIndex].value;
     
     var form_cliente_regional = document.getElementById("form_cliente_regional");
     var form_cliente_regionalValue = form_cliente_regional.options[form_cliente_regional.selectedIndex].value;
    
     var form_cliente_alturaPrevista = document.getElementById("form_cliente_alturaPrevista");
     var form_cliente_alturaPrevistaValue = form_cliente_alturaPrevista.options[form_cliente_alturaPrevista.selectedIndex].value;

     var form_cliente_raioBusca = document.getElementById("form_cliente_raioBusca");
     var form_cliente_raioBuscaValue = form_cliente_raioBusca.options[form_cliente_raioBusca.selectedIndex].value;
     
     var form_cliente_opcao = document.getElementById("form_cliente_opcao");
     var form_cliente_opcaoValue = form_cliente_opcao.options[form_cliente_opcao.selectedIndex].value;
     
     var form_cliente_pontoCardealLat = document.getElementById("form_cliente_pontoCardealLat");
     if(form_cliente_pontoCardealLat != null){
       var form_cliente_pontoCardealLatValue = form_cliente_pontoCardealLat.options[form_cliente_pontoCardealLat.selectedIndex].value;
     }
    
     var form_cliente_pontoCardealLong = document.getElementById("form_cliente_pontoCardealLong");
     if(form_cliente_pontoCardealLong != null){
       var form_cliente_pontoCardealLongValue = form_cliente_pontoCardealLong.options[form_cliente_pontoCardealLong.selectedIndex].value;
     }
    
     var form_cliente_IdsiteMobilize = document.getElementById("form_cliente_IdsiteMobilize").value;   
    
     var form_cliente_Idsharing = document.getElementById("form_cliente_Idsharing").value;

     var form_cliente_idSiteOperadora = document.getElementById("form_cliente_idSiteOperadora").value;  
     
     var form_cliente_projeto = document.getElementById("form_cliente_projeto").value;  

     var form_cliente_subProjeto = document.getElementById("form_cliente_subProjeto").value;  

     var form_cliente_targetAluguel = document.getElementById("form_cliente_targetAluguel").value;
     
     var form_cliente_uf = document.getElementById("form_site_uf");
     var form_cliente_ufValue = form_cliente_uf.options[form_cliente_uf.selectedIndex].value;
     var form_cliente_municipio = document.getElementById("form_site_municipio");
     var form_cliente_municipioValue = form_cliente_municipio.options[form_cliente_municipio.selectedIndex].value;
      
     var form_cliente_latitude = document.getElementById("form_cliente_latitude").value.replace(',', '.');  

     var form_cliente_longitude = document.getElementById("form_cliente_longitude").value.replace(',', '.');
     
     if(document.querySelector('#lat_long').innerHTML == ''){
       var form_cliente_grauLat = document.getElementById("form_cliente_grauLat").value; 
       
       var form_cliente_grauLong = document.getElementById("form_cliente_grauLong").value; 

       var form_cliente_minLat = document.getElementById("form_cliente_minLat").value; 
     
       var form_cliente_minLong = document.getElementById("form_cliente_minLong").value; 
     
       var form_cliente_segLat = document.getElementById("form_cliente_segLat").value; 
     
       var form_cliente_segLong = document.getElementById("form_cliente_segLong").value; 
     }

     var form_cliente_dataAcionamento = document.getElementById("form_cliente_dataAcionamento").value; 
  
     const meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];
     let dataInicioAnterior = new Date(form_cliente_dataAcionamento);
     let  dataInicioAFormatada = (adicionaZero(dataInicioAnterior.getDate().toString()) + "-" + meses[(dataInicioAnterior.getMonth())] + "-" + dataInicioAnterior.getFullYear());


     var form_cliente_targetAluguel2 = form_cliente_targetAluguel.replace('R$', '')
     var valorFinal1 = form_cliente_targetAluguel2.replaceAll('.', '')
     var valorFinal2 = valorFinal1.replace(',', '.').trim();


    var opcaoCliente = form_cliente_site.options[form_cliente_site.selectedIndex].text;
    if(opcaoCliente == "Selecione..") {
      mostrarErro("form_cliente_site", "Cliente não selecionado")
      return
    }
    if(form_cliente_IdsiteMobilize == "") {
      mostrarErro("form_cliente_IdsiteMobilize", "ID Mobilize não informado")
      return
    }
    var opcaoOperadora = form_cliente_operadora.options[form_cliente_operadora.selectedIndex].text
    if(opcaoOperadora == "Selecione..") {
      mostrarErro("form_cliente_operadora", "Operadora não selecionada")
      return
    }
    if(form_cliente_Idsharing == "") {
      mostrarErro("form_cliente_Idsharing", "ID Site Sharing não informada")
      return
    }
    if(form_cliente_idSiteOperadora == "") {
      mostrarErro("form_cliente_idSiteOperadora", "ID Site Operadora não informada")
      return
    }
    if(form_cliente_projeto == "") {
      mostrarErro("form_cliente_projeto", "Projeto não informado")
      return
    }
    var opcaoUF = document.getElementById("form_site_uf");
    var opcaoUFTexto = opcaoUF.options[opcaoUF.selectedIndex].text;
    if(opcaoUFTexto == "Selecione...") {
      mostrarErro("form_site_uf", "UF não selecionada")
      return
    }
    var opcaoMunicipio = document.getElementById("form_site_municipio");
    var opcaoMunicpioTexto = opcaoMunicipio.options[opcaoMunicipio.selectedIndex].text;
    if(opcaoMunicpioTexto == "Selecione...") {
      mostrarErro("form_site_municipio", "Municipio não selecionada")
      return
    }
    var opcaoRaioBusca = form_cliente_raioBusca.options[form_cliente_raioBusca.selectedIndex].text;
    if(opcaoRaioBusca == "Selecione..") {
      mostrarErro("form_cliente_raioBusca", "Raio de Busca não selecionada")
      return
    }
    var opcaoPontoNominal = form_cliente_opcao.options[form_cliente_opcao.selectedIndex].text
    if(opcaoPontoNominal == "Selecione..") {
      mostrarErro("form_cliente_opcao", "Tipo de ponto nominal não selecionada")
      return
    }
    if(opcaoPontoNominal == "Decimal" && opcaoPontoNominal != "Selecione..") {
      if(form_cliente_latitude == "") {
        mostrarErro("form_cliente_latitude", "Latitude não informada")
        return
      } else if(form_cliente_longitude == "") {
        mostrarErro("form_cliente_longitude", "Longitude não informada")
        return
      }
    }
    if(opcaoPontoNominal == "UTM" && opcaoPontoNominal != "Selecione..") {
      var pontoCardealLAT = form_cliente_pontoCardealLat.options[form_cliente_pontoCardealLat.selectedIndex].text
      var pontoCardealLONG = form_cliente_pontoCardealLong.options[form_cliente_pontoCardealLong.selectedIndex].text
      var grauLat = document.getElementById("form_cliente_grauLat").value
      var grauLong = document.getElementById("form_cliente_grauLong").value
      var minLat = document.getElementById("form_cliente_minLat").value
      var minLong = document.getElementById("form_cliente_minLong").value
      var segLat = document.getElementById("form_cliente_segLat").value
      var segLong = document.getElementById("form_cliente_segLong").value

      if(grauLat == "") {
        mostrarErro("form_cliente_grauLat", "Grau LAT não informada")
        return
      }
      else if(minLat == "") {
        mostrarErro("form_cliente_minLat", "Minuto LAT não informada")
        return
      }
      else if(segLat == "") {
        mostrarErro("form_cliente_segLat", "Segundos LAT não informada")
        return
      }
      else if(pontoCardealLAT == "Selecione..") {
        mostrarErro("form_cliente_pontoCardealLat", "Ponto Cardeal LAT não selecionada")
        return
      }
      else if(grauLong == "") {
        mostrarErro("form_cliente_grauLong", "Grau LONG não informada")
        return
      }
      else if(minLong == "") {
        mostrarErro("form_cliente_minLong", "Minuto LONG não informada")
        return
      }
      else if(segLong == "") {
        mostrarErro("form_cliente_segLong", "Segundos LONG não informada")
        return
      }
      else if(pontoCardealLONG == "Selecione..") {
        mostrarErro("form_cliente_pontoCardealLong", "Ponto Cardeal LONG não selecionada")
        return
      }
    }
    
    


     
    var formData = { "data": {'Projeto' : form_cliente_projeto, 'UF' : form_cliente_ufValue, 'Municipio2' : form_cliente_municipioValue, 'Tipo_Site' : form_cliente_tipoSiteValue, 'Etapa' : form_cliente_etapaValue, 'ID_Site_Mobilize' : form_cliente_IdsiteMobilize , 'Data_de_Acionamento' : dataInicioAFormatada, 'Longitude' : form_cliente_longitude,'Latitude' : form_cliente_latitude, 'Operadora' : form_cliente_operadoraValue, 'ID_Site_Operadora' : form_cliente_idSiteOperadora,'ID_Site_Sharing' : form_cliente_Idsharing, 'cliente' : form_cliente_siteValue, 'regional' : form_cliente_regionalValue, 'Altura_Prevista_M' : form_cliente_alturaPrevistaValue, 'RAIO_DE_BUSCA_M' : form_cliente_raioBuscaValue, 'Target_do_Aluguel' : valorFinal2, 'Opcao' : form_cliente_opcaoValue, 'GrauLAT' : form_cliente_grauLat, 'GrauLONG' : form_cliente_grauLong, 'MinutoLAT' : form_cliente_minLat, 'MinutoLONG' : form_cliente_minLong, 'SegundosLAT' : form_cliente_segLat, 'SegundosLONG' : form_cliente_segLong, 'PontoCardealLAT' : form_cliente_pontoCardealLatValue, 'PontoCardealLONG' : form_cliente_pontoCardealLongValue, 'Coordenador_Mobilize' : form_cliente_coordenadorMobilizeValue, 'Sub_Projeto' : form_cliente_subProjeto, 'Contato' : form_cliente_coordenadorClienteValue}}
    var fileObject = document.getElementById("form_cliente_anexo").files[0];
    var config = {
        appName : "mobilize",
        formName : "Site",
        data : formData
      }
      
      if(!$('input[name="form_cliente_anexo"]').val()){
           ZOHO.CREATOR.API.addRecord(config).then(function (response) {
        if (response.code == 3000) {
            console.log('cadastrou o formulario SITE')
            var idSite = response.data.ID;

              var formDataAnexos = {"data":{'Tipo_do_Anexo' : 'Tipo Site', 'Site' : idSite, 'usuario' : 'samyr@mobilize-eng.com.br'}}
              var fileObject = document.getElementById("form_cliente_anexo").files[0];

              
              var configAnexo = {
                appName : "mobilize",
                formName : "Anexos",
                data : formDataAnexos
              }
                
               ZOHO.CREATOR.API.addRecord(configAnexo).then(function (responseAnexo) {
                var fileObject = document.getElementById("form_cliente_anexo").files[0];
                 if (responseAnexo.code == 3000) { 
                     console.log('FORM SITE') 
                     swal({
                      title: "Site Adicionado com sucesso!",
                      type: "success",
                      showConfirmButton: false
                      });
                      setTimeout(() => {
                      document.location.reload(true);
                                  }, 2000)
                    }
            });
         }else{
          var v_erro = "";
          $.each(response.error, function(key,val) {             
              v_erro = v_erro + val + ". ";
          });
          swal({
            title: "Atualize a Pagina e tente novamente! ("+v_erro+")",
            type: "error",
            showConfirmButton: true
          });
         }
            
      });
    
     }else{
      ZOHO.CREATOR.API.addRecord(config).then(function (response) {
        if (response.code == 3000) {
            console.log('cadastrou o formulario SITE')
            var idSite = response.data.ID;

              var formDataAnexos = {"data":{'Tipo_do_Anexo' : 'Tipo Site', 'Site' : idSite, 'usuario' : 'samyr@mobilize-eng.com.br'}}
              var fileObject = document.getElementById("form_cliente_anexo").files[0];

      
              var configAnexo = {
                appName : "mobilize",
                formName : "Anexos",
                data : formDataAnexos
              }
                
               ZOHO.CREATOR.API.addRecord(configAnexo).then(function (responseAnexo) {
                var fileObject = document.getElementById("form_cliente_anexo").files[0];
                 if (responseAnexo.code == 3000) { 
                     console.log('FORM SITE')
                     
                    
                     var configPdf = { 
                      appName : "mobilize",
                      reportName : "Anexos_Report", 
                      id : responseAnexo.data.ID,
                      fieldName : "Anexos",
                      file : fileObject
                   } 
                   swal({
                    title: "Site Adicionado com sucesso!",
                    type: "success",
                    showConfirmButton: false
                    });
                    setTimeout(() => {
                    document.location.reload(true);
                                }, 2000)
                

                }else{
                  var v_erro = "";
                  $.each(responseAnexo.error, function(key,val) {             
                      v_erro = v_erro + val + ". ";
                  });
                  swal({
                    title: "Atualize a Pagina e tente novamente! ("+v_erro+")",
                    type: "error",
                    showConfirmButton: true
                  }); 

                }
              if(fileObject != null){
                ZOHO.CREATOR.API.uploadFile(configPdf).then(function (responsePdf) {
                  if (responsePdf.code == 3000) {

                    console.log('PDF')
                    swal({
                      title: "Site Adicionado com sucesso!",
                      type: "success",
                      showConfirmButton: false
                    });
                    setTimeout(() => {
                      document.location.reload(true);
                    }, 2000)
                  } else {
                    var v_erro = "";
                    $.each(responsePdf.error, function(key,val) {             
                        v_erro = v_erro + val + ". ";
                    });
                    swal({
                      title: "Atualize a Pagina e tente novamente! ("+v_erro+")",
                      type: "error",
                      showConfirmButton: true
                    });
                  }
                });
              }
              });
        }else{
          var v_erro = "";
          $.each(response.error, function(key,val) {             
              v_erro = v_erro + val + ". ";
          });
          swal({
            title: "Atualize a Pagina e tente novamente! ("+v_erro+")",
            type: "error",
            showConfirmButton: true
          }); 
        } 
      });
     }
    });
}



export default addSite;


