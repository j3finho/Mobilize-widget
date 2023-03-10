
function adicionaZero(numero) {
  if (numero <= 9) return "0" + numero;
  else return numero;
}

function getApizohoSites() {
  var creatorSdkPromise = ZOHO.CREATOR.init();
  creatorSdkPromise.then(function (data) {
    var recordOps = ZOHO.CREATOR.API;

    var config = {
      appName: "mobilize",
      reportName: "widget_sites_full",
    };

    var getRecords = recordOps.getAllRecords(config);
    var v_sites = [];
    getRecords.then(function (response) {
      var recordArr = response.data;
      console.log(recordArr);

      recordArr.forEach(function (data) {
        var dataAcionamento = data.Data_de_Acionamento;
        var novaDataAcionamento = new Date(dataAcionamento);
        var dataAcionamentoFormatada =
          adicionaZero(novaDataAcionamento.getDate().toString()) +
          "/" +
          adicionaZero(novaDataAcionamento.getMonth() + 1).toString() +
          "/" +
          novaDataAcionamento.getFullYear().toString().replace("-", "");
        v_sites.push({
          id: data.ID,
          idSiteMobilize: data.ID_Site_Mobilize,
          idSiteOperadora: data.ID_Site_Operadora,
          idSiteSharing: data.ID_Site_Sharing,
          latitude: data.Latitude,
          latitudeBusca: data.Latitude_de_Busca,
          longitude: data.Longitude,
          longitudeBusca: data.Longitude_de_Busca,
          //operadora: ((data.Operadora.length != '') ? data.Operadora.display_value : ''),
          //radioDeBusca:  data.RAIO_DE_BUSCA_M,
          //aluguel:  data.Target_do_Aluguel,
          //tipoSite: ((data.Tipo_Site.length != '') ? data.Tipo_Site.display_value : ''),
          projeto: data.Projeto,
          //etapa:  ((data.Etapa.length != '') ? data.Etapa.display_value : ''),
          //dataAcionamento: dataAcionamentoFormatada,
          cliente: data.cliente != "" ? data.cliente.ID : "",
          uf: data.UF != "" ? data.UF.display_value : "",
          //municipio: data.Municipio2.display_value,
          municipio: data.Municipio2.length != "" ? data.Municipio2.display_value : "",
          candidatos: data.Candidato.lenght > 0,
          relatorioId: data.Relatorio_Critico.length > 0 ? data.Relatorio_Critico[0].ID : ""
        });
      });

      // KPIS
      var filtrodeCandidatos = v_sites.filter((candidatos) => candidatos);
      var totalFinalizados = adicionaZero(filtrodeCandidatos.length);
      document.querySelector("#totalSites").innerText = totalFinalizados;

      $(document).ready(function () {
        var idioma = {
          bJQueryUI: true,
          sProcessing: "Processando...",
          sLengthMenu: "Mostrar _MENU_ registros",
          sZeroRecords: "N??o h?? declara????es emitidas no momento",
          sInfo: "Mostrando de _START_ at?? _END_ de _TOTAL_ registros",
          sInfoEmpty: "Mostrando de 0 at?? 0 de 0 registros",
          sInfoFiltered: "",
          sInfoPostFix: "",
          sSearch: "Buscar:",
          sUrl: "",
          oPaginate: {
            sFirst: "Primeiro",
            sPrevious: "Anterior",
            sNext: "Seguinte",
            sLast: "??ltimo",
          },
          oAria: {
            sSortAscending:
              ": Ativar para ordenar  a columna de maneira ascendente",
            sSortDescending:
              ": Ativar para ordenar  a columna de maneira descendente",
          },

          pageLength: {
            "-1": "Mostrar todos os registros",
            _: "Mostrar %d registros",
          },
        };

        $("#datatable-sites")
          .DataTable({
            data: v_sites,
            order: [[2, "asc"]],
            paging: true,
            lengthChange: !1,
            buttons: [ "excel", "pdf"],
            dom:
              "<'row'<'col-sm-6 toolbarsite'><'col-sm-6'B>>" +
              "<'row'<'col-sm-6'><'col-sm-6'f>>" +
              "<'row'<'col-sm-12'tr>>" +
              "<'row'<'col-sm-5'i><'col-sm-7'p>>",
            searching: true,
            ordering: true,
            info: true,
            autoWidth: true,
            language: idioma,
            columns: [
              //{ data: 'projeto', title: "Projeto" },
             // { data: "idSiteMobilize", title: "ID Site Mobilize" },
              //{ data: 'cliente', title: "ID Cliente" },
              //{ data: 'tipoSite', title: "Tipo Site" },
              //{ data: 'etapa', title: "Etapa" },
              { data: "idSiteSharing", title: "ID Cliente" },
              { data: "idSiteOperadora", title: "ID Operadora" },
              //{ data: 'dataAcionamento', title: "Data de Acionamento" },
              { data: "municipio", title: "Munic??pio" },
              { data: "uf", title: "UF" },
              { data: "latitude", title: "Latitude" },
              { data: "longitude", title: "Longitude" },
              {
                orderable: false,
                data: null,
                defaultContent: "",
                render: function (data, type, row) {
                  return `
                                <div class="d-flex" style="width: 100%; justify-content: center">
                                    <button id="${row.id}" type="button" onclick="viewEditSite(this, true)" class="btn btn-outline-secondary btn-sm" title="Visualizar">
                                        <i class="far fa-eye"></i>
                                    </button>
                                    &nbsp;&nbsp;
                                    <button id="${row.id}" type="button" onclick="excluirSite(this, ${row.candidatos},'${row.idSiteSharing}')" class="btn btn-outline-secondary btn-sm" title="Excluir Site">
                                         <i class="fas fa-trash-alt"></i>
                                    </button>
                                    &nbsp;&nbsp;
                                    <button id="${row.id}"  type="button" class="btn btn-outline-secondary btn-sm" title="Candidatos" data-bs-toggle="modal" data-bs-target="#modalCandidatosPorSite" onClick="viewCandidatosPorSite(this)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                                        </svg>
                                        <span class="visually-hidden">Button</span>                 
                                    </button>
                                    &nbsp;&nbsp;
                                    <button id="${row.id}" type="button" class="btn btn-outline-secondary btn-sm" title="Tarefas" data-bs-toggle="modal" data-bs-target="#modalAtividadesPorSite" onClick="viewAtividadesPorSite(this)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"></path>
                                        </svg>
                                        <span class="visually-hidden">Button</span>                
                                    </button>
                                    &nbsp;&nbsp;
                                    <button title="Relat??rio Cr??tico" onClick="addRelatorioCritico('${row.relatorioId}','${row.id}')" class="btn_view_site btn btn-outline-secondary btn-sm edit" >
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                      </svg>
                                   </button>
                                </div>
                            `;
                },
                title: "A????es",
                width: "200px"
              },
            ],
          })
          .buttons()
          .container()
          .appendTo("#datatable-sites_wrapper .col-md-6:eq(0)");

        $("div.toolbarsite").html(
          '<button class="btn btn-primary  p-2" data-bs-toggle="modal" data-bs-target=".modalAdicionarSite" onclick="actionCadastrarSite()" >Criar Sites</button>&nbsp;&nbsp;&nbsp;<button class="btn btn-primary p-2" data-bs-toggle="modal" data-bs-target=".modalAdicionarCandidato" onclick="actionCadastrarCandidato()">Criar Candidato</button>'
        );
      });
    });
  });
}
getApizohoSites();


function actionCadastrarSite() {
  $('#downloadFile').css('display', 'none')
  document.getElementById('form_cliente_dataAcionamento').valueAsDate = new Date()
  escolhalatlong('', 1)
  habilitarAlturaSite('form_cliente_tipoSite',1)
  getAllRecords('widget_clientes_full', 'form_cliente_site', '', true)
  getAllRecords('widget_operadoras_full', 'form_cliente_operadora', '',true)
  getAllRecords('widget_etapas_full', 'form_cliente_etapa', '(Ordem==0&&Nome_da_Etapa=="ACIONAMENTO")',true)
  getAllRecords('widget_estados_full', 'form_site_uf')
  getAllRecords('widget_contatos_full', 'form_cliente_coordenadorCliente', '')
  getAllRecords('widget_responsaveis_full', 'form_cliente_coordenadorMobilize', '(Funcao.contains("Coordenador"))',true)
}

function actionCadastrarCandidato() {
  escolhalatlongCand('', 1)
  corredorAcessoCand('', 1)
  habilitarAlturaCand('form_candidato_tipo_site',1)
  getAllRecords('widget_sites_full', 'form_candidato_site', '',true)
  getAllRecords('widget_sitetipos_full', 'form_candidato_tipo_site', '',true)
  getAllRecords('Widget_Proprietario', 'form_candidato_proprietario', '',true)
}

function getMunicipios(campo, estadoID, municipioID, page, firstExecution) {
 var field = $('#' + campo)

  if(firstExecution && municipioID == null) {
    field
      .empty()
      .append('<option value="">Selecione..</option>')
  }

  var criterio = municipioID == null ? "(uf1.ID=="+estadoID+")" : "(uf1.ID=="+estadoID+"&&ID!="+municipioID+")"
  var config = {
    appName: "mobilize",
    reportName: "widget_municipios_full",
    criteria: criterio,
    page: page,
    pageSize: 200,
  };
  ZOHO.CREATOR.API.getAllRecords(config).then((responseJson) => {
    $.each(responseJson.data, (index, value) => {
      field.append('<option value="'+value.ID+ '">'+value.name+'</option>')
      console.log("page: " + page + " : record: " + index + " name: " + value.name)
    })

    var num_of_records = Object.keys(responseJson.data).length;
    if(num_of_records == 200) {
      getMunicipios(campo, estadoID, municipioID,(page + 1), false)
    }
  }).catch(err => console.log("N??o h?? mais munic??pios ap??s a page: " + page));
}


function getRegional(regionalId, estadoID) {
  var regiao = $('#' + regionalId)
  var estadoSigla = $('#' + estadoID).find(':selected').text()

  const norte = ["AC", "AM", "RO", "RR", "PA", "TO", "AP"]
  const nordeste = ["MA", "PI", "CE", "RN", "PB", "PE", "AL", "SE", "BA"]
  const centroOeste = ["MT", "MS", "GO", "DF"]
  const sudeste = ["MG", "ES", "SP", "RJ"]
  const sul = ["RS", "PR", "SC"]

  if(norte.includes(estadoSigla)) {
    regiao.val('Norte')
  }
  if(nordeste.includes(estadoSigla)) {
    regiao.val('Nordeste')
  }
  if(centroOeste.includes(estadoSigla)) {
    regiao.val('Centro Oeste')

  }
  if(sudeste.includes(estadoSigla)) {
    regiao.val('Sudeste')
  }
  if(sul.includes(estadoSigla)) {
    regiao.val('Sul')
  }
}

function getAllRecords(report, inputField, criteria, clearContentBefore) {
  var field = $('#' + inputField)
  var page = 1
  config = {
    appName: "mobilize",
    reportName: report, 
    criteria: criteria,
    page: page,
    limit: 200
  }

  if(clearContentBefore) {
    field
        .empty()
        .append('<option value="">Selecione..</option>')
  }

  ZOHO.CREATOR.API.getAllRecords(config).then(function(response) {
      if(response.code != 3000) {
          var error = []
          $.each(response.error, function(key,val) {             
              error = error + val + ". ";
           });
          console.log("Nao foi possivel carregar os dados - " + error)
          return
      }
      response.data
      .forEach((data) => {
          var value = data.ID
          var textContent = ""
          if(report == "widget_clientes_full") {
              textContent = data.nameClient
          }
          else if(report == "widget_operadoras_full") {
             textContent = data.Nome_Operadora1
          }
          else if(report == "widget_etapas_full") {
            textContent = data.Ordem + " - " + data.Nome_da_Etapa
          }
          else if(report == "widget_estados_full") {
            textContent = data.Sigla
          }
          else if(["widget_contatos_full", "Widget_Proprietario"].includes(report)) {
            textContent = data.Nome
          }
          else if(report == "widget_responsaveis_full") {
            textContent = data.Nome.display_value
          }
          else if(report == "widget_sites_full") {
            textContent = data.ID_Site_Sharing
          }
          else if(report == "widget_sitetipos_full") {
            textContent = data.Tipo_Site
          }

          field.append('<option value="'+value+'">' + textContent + '</option>')
      })
  });
}

function viewSite(n) {
  var config = {
    appName: "mobilize",
    reportName: "widget_sites_full",
    id: n.id,
  };
  ZOHO.CREATOR.API.getRecordById(config).then((response) => {
    if(response.code != 3000) {
      swal({
        title: "Nao foi possivel carregar o site",
        type: "error",
        showConfirmButton: true
     });
      return
    }
      var data = response.data;
      var dataAcionamento = data.Data_de_Acionamento;
      var novaDataAcionamento = new Date(dataAcionamento);
      var dataAcionamentoFormatada =  adicionaZero(novaDataAcionamento.getDate().toString())+"/"+adicionaZero(novaDataAcionamento.getMonth() + 1).toString()+"/"+novaDataAcionamento.getFullYear().toString().replace("-", "");
      
      var aluguel = data.Target_do_Aluguel;
      var aluguelFormatado = toFloat(aluguel);
      var aluguelParse = aluguelFormatado.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      $("#form_cliente_edit_site").val(data.cliente.display_value);
      $("#form_cliente_edit_IdsiteMobilize").val(data.ID_Site_Mobilize);
      $("#form_cliente_edit_operadora").val(data.Operadora.display_value);
      $("#form_cliente_edit_Idsharing").val(data.ID_Site_Sharing);
      $("#form_cliente_edit_etapa").val(data.Etapa.display_value);
      $("#form_cliente_edit_idSiteOperadora").val(data.ID_Site_Operadora);
      $("#form_cliente_edit_tipoSite").val(data.TipoSiteCandidato);
      $("#form_cliente_edit_id_dataAcionamento").val(dataAcionamentoFormatada);
      $("#form_cliente_edit_projeto").val(data.Projeto);
      $("#form_cliente_edit_Subprojeto").val(data.Sub_Projeto);
      $("#form_cliente_edit_regional").val(data.regional);
      $("#form_cliente_edit_targetAluguel").val(aluguelParse);
      $("#form_cliente_edit_raioBusca").val(data.RAIO_DE_BUSCA_M);
      $("#form_cliente_edit_alturaPrevista").val(data.Altura_Prevista_M);
      $("#form_cliente_edit_opcao").val(data.Opcao);
      $("#form_cliente_edit_latitude").val(data.Latitude);
      $("#form_cliente_edit_longitude").val(data.Longitude);
      $("#form_cliente_edit_coordenadorCliente").val(data.Contato.display_value);
      $("#form_cliente_edit_coordenadorMobilize").val(data.Coordenador_Mobilize.display_value);
      $("#form_cliente_edit_UF").val(data.UF.display_value);
      $("#form_cliente_edit_municipio").val(data.Municipio2.display_value);

      var opcao = data.Opcao
      escolhalatlong(opcao, 2)
      habilitarAlturaSite("form_cliente_edit_tipoSite", 2);
      $("#modalvisualizarSite").modal("show");
  })
}

function viewCandidatosPorSite(n) {
  console.log("data-table is initialized: " + $.fn.dataTable.isDataTable('#datatable-buttons-candidatos'));

  var creatorSdkPromise = ZOHO.CREATOR.init();
  creatorSdkPromise.then(function (data) {
    var recordOps = ZOHO.CREATOR.API;
    var config = {
      appName: "mobilize",
      reportName: "widget_candidatos_full",
      criteria: "(Site=" + n.id + ")",
    };
    var getRecords = recordOps.getAllRecords(config);
    getRecords.then(function (response) {
      var recordArr = response.data;
      var v_candidatos = [];
      recordArr.forEach(function (data, inicio) {
        v_candidatos.push({
          id: data.ID,
          age: data.AGE,
          altitude: data.altitude,
          larguraArea: data.largura_Area_Locada,
          latitude: data.Latitude,
          longitude: data.Longitude,
          proprietario:
            data.Proprietario.length != ""
              ? data.Proprietario.display_value
              : "",
          proprietarioid:
            data.Proprietario.length != "" ? data.Proprietario.ID : "",
          qualificacaoid: data.Qualifica_o_do_Candadito_ID.length != ""? data.Qualifica_o_do_Candadito_ID.ID: "",
          siglaCandidato: data.Sigla_do_Candidato,
          pontuacao: (data.pontuacaoCandidato.length > 0 ? data.pontuacaoCandidato : "0"),
          tipoSite: data.Tipo_Site,
          status: data.Status_do_Candidato,
          endereco: data.Endereco,
          bairro: data.Bairro,
          cep: data.CEP,
          cuos: data.CUOS,
          site: data.Site.length != "" ? data.Site.display_value : "",
          docsLicenciamentoId:
            data.Docs_e_Licenciamento.length > 0
              ? data.Docs_e_Licenciamento[0].ID
              : "",
          infraestruturaId:
            data.Infraestrutura.length > 0 ? data.Infraestrutura[0].ID : "",
          protocoloCuosId:
            data.Protocolo_ou_CUOS.length > 0
              ? data.Protocolo_ou_CUOS[0].ID
              : "",
          siteId: data.Site.ID
        });
      });

      $(document).ready(function () {
        var idioma = {
          bJQueryUI: true,
          sProcessing: "Processando...",
          sLengthMenu: "Mostrar _MENU_ registros",
          sZeroRecords: "N??o h?? declara????es emitidas no momento",
          sInfo: "Mostrando de _START_ at?? _END_ de _TOTAL_ registros",
          sInfoEmpty: "Mostrando de 0 at?? 0 de 0 registros",
          sInfoFiltered: "",
          sInfoPostFix: "",
          sSearch: "Buscar:",
          sUrl: "",
          oPaginate: {
            sFirst: "Primeiro",
            sPrevious: "Anterior",
            sNext: "Seguinte",
            sLast: "??ltimo",
          },
          oAria: {
            sSortAscending:
              ": Ativar para ordenar  a columna de maneira ascendente",
            sSortDescending:
              ": Ativar para ordenar  a columna de maneira descendente",
          },

          pageLength: {
            "-1": "Mostrar todos os registros",
            _: "Mostrar %d registros",
          },
        };

        $("#datatable-buttons-candidatos")
          .DataTable({
            data: v_candidatos,
            order: [[1, "desc"]],
            paging: true,
            lengthChange: !1,
            buttons: ["excel", "pdf"],
            dom:
                `
                "<'row'<'col-sm-6 toolbarcandidato'><'col-sm-6'B>>"
                "<'row'<'col-sm-6'><'col-sm-6'f>>"
                <'row'<'col-sm-12'tr>>
                <'row'<'col-sm-5'i><'col-sm-7'p>>
            `,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: true,
            language: idioma,

            columns: [
              {
                orderable: false,
                data: null,
                defaultContent: "",
                render: function (data, type, row) {
                  return `
                            <button id="${data["id"]}"  type="button" onclick="viewCandidato(this)" class="btn_view_site btn btn-outline-secondary btn-sm edit" title="Visualizar">
                                <i class="far fa-eye"></i>
                            </button>
                            <button id="${data["id"]}"  type="button" onclick="excluirCandidato('${row.id}', '${row.status}', '${row.siglaCandidato}')" class="btn_view_site btn btn-outline-secondary btn-sm edit" title="Excluir">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                            `;
                },
                width: "150px",
                title: "A????es"
            },
            {
                data: 'status',
                title: "Status",
                width: "150px"
            },
            {
                data: 'siglaCandidato',
                title: "Sigla",
                width: "100px"
            },
              {
                data: "pontuacao",
                title: "Pontua????o",
              },
              {
                data: "latitude",
                title: "Latitude",
              },
              {
                data: "longitude",
                title: "Longitude",
              },
              {
                className: "details-control",
                orderable: true,
                data: "cuos",
                defaultContent: "",
                render: function (data, type, row) {
                  if (row.cuos === "Em An??lise")
                    return '<span class="badge rounded-pill badge-soft-warning font-size-12">Em An??lise</span>';
                  else if (row.cuos === "A Protocolar") {
                    return '<span class="badge rounded-pill badge-soft-warning font-size-12">A protocolar</span>';
                  } else if (row.cuos === "Sem Informa????o") {
                    return '<span class="badge rounded-pill badge-soft-danger font-size-12">Sem Informa????o</span>';
                  } else if (row.cuos === "Indeferido") {
                    return '<span class="badge rounded-pill badge-soft-danger font-size-12">Indeferido</span>';
                  } else if (row.cuos === "N/A") {
                    return '<span class="badge rounded-pill badge-soft-secondary font-size-12">N/A</span>';
                  } else if (row.cuos === "Deferido") {
                    return '<span class="badge badge-soft-success font-size-12" > Deferido </span>';
                  }
                },
                width: "auto",
                title: "CUOS",
              },
              {
                orderable: true,
                defaultContent: "",
                render: function (data, type, row) {
                  return `
                          <button onClick="alterarProprietario('${row.id}', '${row.proprietarioid}')" class="btn_view_site btn btn-outline-secondary btn-sm edit" title="Propriet??rio">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                          </svg>
                      </button>
                      <button  onClick="alterarQualificacao('${row.id}','${row.qualificacaoid}') "class="btn_view_site btn btn-outline-secondary btn-sm edit" title="Qualifica????o">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-award" viewBox="0 0 16 16">
                              <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
                              <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                        </svg>
                      </button>
                
                      <button  title="Docs e Licenciamento" onClick="alterarDocseLic('${row.id}', '${row.docsLicenciamentoId}')" class="btn_view_site btn btn-outline-secondary btn-sm edit" >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder2" viewBox="0 0 16 16">
                              <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z"/>
                          </svg>
                      </button>
                
                      <button  title="Infraestrutura" onClick="alterarInfra('${row.id}', '${row.infraestruturaId}')" class="btn_view_site btn btn-outline-secondary btn-sm edit" >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-broadcast-pin" viewBox="0 0 16 16">
                              <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM6 8a2 2 0 1 1 2.5 1.937V15.5a.5.5 0 0 1-1 0V9.937A2 2 0 0 1 6 8z"/>
                          </svg>
                      </button>
                      <button  title="Protocolo CUOS" onClick="alterarProtCuos('${row.id}', '${row.protocoloCuosId}')" class="btn_view_site btn btn-outline-secondary btn-sm edit" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-line-fill" viewBox="0 0 16 16">
                          <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z"/>
                        </svg>
                      </button>
                      <button  title="SAR" disabled onClick="abrirSAR('${row.id}')" class="btn_view_site btn btn-outline-secondary btn-sm edit" >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
                              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                              <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                          </svg>
                      </button>
                    `;
                },
                width: "300px",
                title: "A????es para Candidato",
              }
            ],
          })
          .buttons()
          .container()
          .appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)");
      });
    });
  });
}

function desabilitarCampoCandidato(isEnabled, clearSelectOptions) {
  $('#form_candidato_sigla').prop('disabled', isEnabled)
  $('#form_candidato_aluguel').prop('disabled', isEnabled)
  $("input[name=form_tipo_propriedade]").prop('disabled', isEnabled);
  $('#form_candidato_cep').prop('disabled', isEnabled);
  $('#form_candidato_endereco').prop('disabled', isEnabled);
  $('#form_candidato_numero').prop('disabled', isEnabled);
  $('#form_candidato_complemento').prop('disabled', isEnabled);
  $('#form_candidato_bairro').prop('disabled', isEnabled);
  $('#form_candidato_municipio').prop('disabled', isEnabled);
  $('#form_candidato_uf').prop('disabled', isEnabled);
  $('#form_candidato_distancia_pn').prop('disabled', isEnabled);
  $('#form_candidato_pre_comar').prop('disabled', isEnabled);
  $('#form_candidato_largura_area').prop('disabled', isEnabled);
  $('#form_candidato_profundidade').prop('disabled', isEnabled);
  $('#form_candidato_corredor').prop('disabled', isEnabled);
  $('#form_candidato_area_locada').prop('disabled', isEnabled);
  $('#form_candidato_altura_edificio').prop('disabled', isEnabled);
  $('#form_candidato_latitude').prop('disabled', isEnabled);
  $('#form_candidato_longitude').prop('disabled', isEnabled);
  $('#form_candidato_grauLat').prop('disabled', isEnabled);
  $('#form_candidato_grauLong').prop('disabled', isEnabled);
  $('#form_candidato_minutoLat').prop('disabled', isEnabled);
  $('#form_candidato_minutLong').prop('disabled', isEnabled);
  $('#form_candidato_segundoLat').prop('disabled', isEnabled);
  $('#form_candidato_segundoLong').prop('disabled', isEnabled);
  $('#form_candidato_pontoCardealLat').prop('disabled', isEnabled);
  $('#form_candidato_pontoCardealLong').prop('disabled', isEnabled);
  $('#form_candidato_altitude').prop('disabled', isEnabled);
  $('#form_candidato_observacao').prop('disabled', isEnabled)
  $('#form_candidato_anexo').prop('disabled', isEnabled)
  $('#form_tipo_opcao').prop('disabled', isEnabled)
  $('#form_candidato_largura_area_normal').prop('disabled', isEnabled)
  $('#form_candidato_profundidade_normal').prop('disabled', isEnabled)

  //
 var anelBusca =  $("input[name=anelBusca]")
 var usoProposto = $("input[name=usoProposto]")
 var legislacaoLocal =  $("input[name=legislacaoLocal]")
 var documentacao=  $("input[name=documentacao]")
 var acesso =  $("input[name=acesso]")
 var energia = $("input[name=energia]");
 var obstrucao = $("input[name=obstrucao]")

  anelBusca.prop('disabled', isEnabled);
  usoProposto.prop('disabled', isEnabled);
  legislacaoLocal.prop('disabled', isEnabled);
  documentacao.prop('disabled', isEnabled);
  acesso.prop('disabled', isEnabled);
  energia.prop('disabled', isEnabled);
  obstrucao.prop('disabled', isEnabled);

  $('#form_candidato_candidatolocalizado').prop('disabled', (anelBusca.val() != "N??o" || isEnabled))
  $('#form_candidato_proprietariointeressado').prop('disabled', (usoProposto.val() != "N??o" || isEnabled))
  $('#form_candidato_arealocadaatende').prop('disabled', (legislacaoLocal.val() != "N??o" || isEnabled))
  $('#form_candidato_justifique_documentacaonecessaria').prop('disabled', (documentacao.val() != "Sim" || isEnabled))
  $('#form_candidato_justifique_acessodisponivel').prop('disabled', (acesso.val() != "N??o" || isEnabled))
  $('#form_candidato_justifique_energiadisponivel').prop('disabled', (energia.val() != "N??o" || isEnabled))
  $('#form_candidato_justifique_obstrucao').prop('disabled', (obstrucao.val() != "Sim" || isEnabled))

  var sites = $('#form_candidato_site')
  var tipoSite = $('#form_candidato_tipo_site')
  var proprietario = $('#form_candidato_proprietario')
  var contatos = $('#form_candidato_contato')

  sites.prop('disabled', isEnabled);
  tipoSite.prop('disabled', isEnabled);
  proprietario.prop('disabled', isEnabled);
  contatos.prop('disabled', isEnabled);

  if(clearSelectOptions) {
     const defaultOption = '<option value="">Selecione..</option>'
     tipoSite.empty().append(defaultOption)
     proprietario.empty().append(defaultOption)
     contatos.empty().append(defaultOption)
     sites.empty().append(defaultOption)
  }
}


function viewCandidato(obj) {
  $('#modal_title_candidato').text("Visualizar candidato")
  desabilitarCampoCandidato(true, false)

  document.getElementById('candidatoID').value = obj.id

  var config = {
      appName: "mobilize",
      reportName: "widget_candidatos_full",
      id: obj.id
  }

  ZOHO.CREATOR.API.getRecordById(config).then((response) => {
      if (response.code != 3000) {
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'N??o foi poss??vel carregar o candidato. Tente novamente mais tarde! - Erro: ' + response.code,
          })
          return
      }

      const candidato = response.data;

      $('#form_candidato_sigla').val(candidato.Sigla_do_Candidato)
      $('#form_candidato_site')
          .append('<option value="'+candidato.Site.ID+'">'+candidato.Site.display_value+'</option>')
          .val(candidato.Site.ID)

      $('#form_candidato_tipo_site')
          .append('<option value="'+candidato.Tipo_Site.ID+'">'+candidato.Tipo_Site.display_value+'</option>')
          .val(candidato.Tipo_Site.ID)

      $('#form_candidato_aluguel').val(maskCurrency(candidato.Valor_do_Aluguel))
      $("input[name=form_tipo_propriedade][value=" + candidato.Tipo_de_Negocia_o + "]").prop('checked', true);
      $('#form_candidato_proprietario')
          .append('<option value="'+candidato.Proprietario.ID+'">'+candidato.Proprietario.display_value+'</option>')
          .val(candidato.Proprietario.ID)

      $('#form_candidato_contato')
        .append('<option value="'+candidato.Contato.ID+'">'+candidato.Contato.display_value+'</option>')
        .val(candidato.Contato.ID)
      
      $('#form_candidato_cep').val(candidato.CEP)
      $('#form_candidato_endereco').val(candidato.Endereco)
      $('#form_candidato_numero').val(candidato.Endere_o)
      $('#form_candidato_complemento').val(candidato.Endere_o)
      $('#form_candidato_bairro').val(candidato.Bairro)
      $('#form_candidato_municipio').val(candidato.Municipio)
      $('#form_candidato_uf').val(candidato.UF)
      $('#form_candidato_distancia_pn').val(candidato.Distancia_PN)
      $('#form_candidato_pre_comar').val(candidato.Pre_Comar_m)
      $('#form_candidato_largura_area_normal').val(candidato.Largura_area)
      $('#form_candidato_profundidade_normal').val(candidato.Profundidade_area)
      $('#form_candidato_corredor').val(candidato.Corredor_de_Acesso)
      $('#form_candidato_largura_area').val(candidato.Largura_Corredor_de_Acesso)
      $('#form_candidato_profundidade').val(candidato.Profundidade_Corredor_de_Acesso)
      $('#form_candidato_area_locada').val(candidato.Area_Locada_m)
      $('#form_candidato_altura_edificio').val(candidato.Altura_do_Edifica_o)
      $('#form_tipo_opcao').val(candidato.Opcao)
      $('#form_candidato_latitude').val(candidato.Latitude)
      $('#form_candidato_longitude').val(candidato.Longitude)
      $('#candidatoGrauLat').val(candidato.GrauLAT)
      $('#candidatoGrauLong').val(candidato.GrauLONG)
      $('#candidatoMinutoLat').val(candidato.MinutoLAT)
      $('#candidatoMinutLong').val(candidato.MinutoLONG)
      $('#candidatoSegundoLat').val(candidato.SegundoLAT)
      $('#candidatoSegundoLong').val(candidato.SegundoLONG)
      $('#form_candidato_pontoCardealLat').val(candidato.Ponto_Cardeal_LAT)
      $('#form_candidato_pontoCardealLong').val(candidato.PontoCardealLONG)
      $('#form_candidato_altitude').val(candidato.Altitude)

      $("input[name=anelBusca][value=" + candidato.anelBusca + "]").prop('checked', true);
      $('#form_candidato_candidatolocalizado').val(candidato.Justificativa_O_candidato_est_localizado_dentro_do_anel_de_busca)
      $("input[name=usoProposto][value=" + candidato.usoProposto + "]").prop('checked', true);
      $('#form_candidato_proprietariointeressado').val(candidato.Justificativa_O_propriet_rio_est_interessado_no_uso_proposto)
      $("input[name=legislacaoLocal][value=" + candidato.legislacaoLocal + "]").prop('checked', true);
      $('#form_candidato_arealocadaatende').val(candidato.Justificativa_A_rea_locada_atende_os_requisitos_m_nimos_exigidos_pela_legisla_o_local)
      $("input[name=documentacao][value=" + candidato.documentacao + "]").prop('checked', true);
      $('#form_candidato_justifique_documentacaonecessaria').val(candidato.Justificativa_A_documenta_o_necess_ria_est_dispon_vel)
      $("input[name=acesso][value=" + candidato.acesso + "]").prop('checked', true);
      $('#form_candidato_justifique_acessodisponivel').val(candidato.Justificativa_O_acesso_ao_site_est_dispon_vel_24horas_dia_7dias_semana)
      $("input[name=energia][value=" + candidato.energia + "]").prop('checked', true);
      $('#form_candidato_justifique_energiadisponivel').val(candidato.Justificativa_Existe_energia_dispon_vel_no_site)
      $("input[name=obstrucao][value=" + candidato.obstrucao + "]").prop('checked', true);
      $('#form_candidato_justifique_obstrucao').val(candidato.Justificativa_Existe_alguma_obstru_o_ou_interfer_ncia_vis_vel)
      $('#form_candidato_observacao').val(candidato.Coment_rios)

      //
      $('#btnNovoProprietario').css('display', 'none')
      $('#btnAddContact').css('display', 'none')
      $('#addCandidato').css('display', 'none')
      $('#editCandidato').css('display', 'block')

      escolhalatlongCand(candidato.Opcao)
      $('#modalAdicionarCandidato').modal('show')
      $('#modalCandidatosPorSite').css('z-index', 1051)
  })
}

function excluirCandidato(id, status, ID_Mobilize) {
  Swal.fire({
      title: 'Deseja excluir este candidato?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'N??o',
      reverseButtons: true
  }).then((result) => {
      if (result.isConfirmed) {
          if (["Aprovado", "Em Documenta????o", "Conclu??do"].includes(status)) {
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Candidato com status ' + status + " . N??o ?? poss??vel exclui-lo."
              })
              return
          }
          config = {
              appName: "mobilize",
              reportName: "widget_candidatos_full",
              criteria: "(ID == " + id + ")",
          };
          ZOHO.CREATOR.API.deleteRecord(config).then(function(response) {
              if (response.code != 3000) {
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Ocorreu um erro ao tentar excluir o candidato. Tente novamente mais tarde'
                  })
                  return
              }
              Swal.fire(
                  'Deletado!',
                  'O candidato ' + ID_Mobilize + ' foi excluido com sucesso',
                  'success'
              )
              setTimeout(() => document.location.reload(true), 1000);
          });
      }
  })
}

function excluirSite(obj, candidatos, ID_Site) {
  Swal.fire({
      title: 'Deseja excluir este site?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'N??o',
      reverseButtons: true
  }).then((result) => {
      if (result.isConfirmed) {
          if (candidatos) {
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'N??o ?? poss??vel deletar o site, pois ha candidato para o site'
              })
              return
          }
          config = {
              appName: "mobilize",
              reportName: "widget_sites_full",
              criteria: "(ID == " + obj.id + ")",
          };
          ZOHO.CREATOR.API.deleteRecord(config).then(function(response) {
              if (response.code != 3000) {
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Ocorreu um erro ao tentar excluir o site. Tente novamente mais tarde'
                  })
                  return
              }
              Swal.fire(
                  'Deletado!',
                  'O site ' + ID_Site + ' foi excluido com sucesso',
                  'success'
              )
              setTimeout(() => document.location.reload(true), 1000);
          });
      }
  })
}

function viewAtividadesPorSite(n) {
    var creatorSdkPromise = ZOHO.CREATOR.init();
    creatorSdkPromise.then(function (data) {
        var recordOps = ZOHO.CREATOR.API;
        var config = {
            appName: "mobilize",
            reportName: "widget_atividades_full",
            criteria: "(site=" + n.id + ")",
        }
        var getRecords = recordOps.getAllRecords(config);
        getRecords.then(function (response) {
            var recordArr = response.data;
            var v_Atividades = [];
            recordArr.forEach(function (data, inicio) {

                var dataInicioGet = data.startDate;
                var dataInicio = new Date(dataInicioGet);
                var dataInicioFormatada = (adicionaZero(dataInicio.getDate().toString()) + "/" + (adicionaZero(dataInicio.getMonth() + 1).toString()) + "/" + dataInicio.getFullYear().toString().replace('-', ''));

                var dataConclusaoGet = data.endDate;
                var dataConclusao = new Date(dataConclusaoGet);
                var dataConclusaoFormatada = (adicionaZero(dataConclusao.getDate().toString()) + "/" + (adicionaZero(dataConclusao.getMonth() + 1).toString()) + "/" + dataConclusao.getFullYear().toString().replace('-', ''));

                var dataTerminoGet = data.startDate;
                var dataTermino = new Date(dataTerminoGet);
                var dataTerminoFormatada = (adicionaZero(dataTermino.getDate().toString()) + "/" + (adicionaZero(dataTermino.getMonth() + 1).toString()) + "/" + dataTermino.getFullYear().toString().replace('-', ''));

                v_Atividades.push(
                    {
                        id: data.ID,
                        status: ((data.status.length != '') ? data.status.display_value : ''),
                        site: ((data.site.length != '') ? data.site.display_value : ''),
                        tarefa: ((data.task.length != '') ? data.task.display_value : ''),
                        responsavel: ((data.responsible.length != '') ? data.responsible.display_value : ''),
                        dataInicio: dataInicioFormatada,
                        dataConclusao: dataConclusaoFormatada,
                        dataTermino: dataTerminoFormatada,
                        tempoHoras: data.Tempo_em_Horas
                    }
                );
            });

            if(v_Atividades.length > 0) {
              $(document).ready(function () {
                  var idioma =
                  {
                      "bJQueryUI": true,
                      "sProcessing": "Processando...",
                      "sLengthMenu": "Mostrar _MENU_ registros",
                      "sZeroRecords": "N??o h?? declara????es emitidas no momento",
                      "sInfo": "Mostrando de _START_ at?? _END_ de _TOTAL_ registros",
                      "sInfoEmpty": "Mostrando de 0 at?? 0 de 0 registros",
                      "sInfoFiltered": "",
                      "sInfoPostFix": "",
                      "sSearch": "Buscar:",
                      "sUrl": "",
                      "oPaginate": {
                          "sFirst": "Primeiro",
                          "sPrevious": "Anterior",
                          "sNext": "Seguinte",
                          "sLast": "??ltimo"
  
                      },
                      "oAria": {
                          "sSortAscending": ": Ativar para ordenar  a columna de maneira ascendente",
                          "sSortDescending": ": Ativar para ordenar  a columna de maneira descendente"
                      },
  
                      "pageLength": {
                          "-1": "Mostrar todos os registros",
                          "_": "Mostrar %d registros"
                      },
                  };
  
                   /*
                  {
                    orderable: true,
                    data: 'tarefa',
                    defaultContent: '',
                    render: function (data, type, row) {
                        if ((row.status == "Em andamento" || row.status == "N??o Iniciado") && new Date() > new Date(row.dataTermino)) {
                            return '<span style="color: #fff; background-color: #f00;">' + row.tarefa + '</span>';
                        } else if ((row.status == "Em andamento" || row.status == "N??o Iniciado") && new Date() == new Date(row.dataTermino)) {
                            return '<span style="color: #000; background-color: #ff0;">' + row.tarefa + '</span>';
                        } else {
                            return '<span style="color: #000; background-color: #0f0;">' + row.tarefa + '</span>';
                        }
                    },
                    width: 'auto',
                    title: "Tarefas",
                  } */
  
                  $('#datatable-buttons-atividades').DataTable({
                      data: v_Atividades,
                      "paging": true,
                      "lengthChange": !1,
                      "buttons": [ "excel", "pdf" ],
                      "dom": "<'row'<'col-sm-6 toolbaratividade'><'col-sm-6'B>>" +
                          "<'row'<'col-sm-6'><'col-sm-6'f>>" +
                          "<'row'<'col-sm-12'tr>>" +
                          "<'row'<'col-sm-5'i><'col-sm-7'p>>"
                      ,
                      "searching": true,
                      "ordering": true,
                      "info": true,
                      "autoWidth": true,
                      "language": idioma,
                      "order": [
                          [7, 'desc'],
                          [3, 'asc'],
  
                      ],
                      columns: [
                          { data: 'tarefa', title: 'Tarefa' },
                          { data: 'site', title: "ID Site" },
                          { data: 'dataInicio', title: "Data de Inicio" },
                          { data: 'dataTermino', title: "Data de T??rmino" },
                          { data: 'dataConclusao', title: "Data de Conclus??o"},
                          { data: 'tempoHoras', title: "Tempo Consumido"},
                          { data: 'responsavel', title: "Respons??vel" },
                          {
                              className: 'details-control',
                              orderable: true,
                              data: 'status',
                              defaultContent: '',
                              render: function (data, type, row) {
                                  if (row.status === 'Em andamento')
                                      return '<span class="badge rounded-pill badge-soft-info font-size-12">Em andamento</span>';
                                  else if (row.status === "Finalizado") {
                                      return '<span class="badge rounded-pill badge-soft-success font-size-12">Finalizado</span>';
                                  } else if (row.status === "N??o Iniciado") {
                                      return '<span class="badge rounded-pill badge-soft-danger font-size-12">N??o Iniciado</span>';
                                  }
                              },
                              title: "Status"
                          },
                          {
                              className: 'dt-body-center',
                              orderable: false,
                              data: null,
                              defaultContent: '',
                              render: function (data, type, row) {
                                  if (row.status === 'Em andamento')
                                      return `
                                  <div class="col-3">
                                  <button id="${data['id']}" onclick="concluirAtividade(this)" type="button" class="btn btn-success btn-sm">Concluir</button>
                                  </div>
                                  `;
                                  else if (row.status === "Finalizado") {
                                      return `
                                  <div class="col-3">
                                  <button id="${data['id']}" onclick="concluirAtividade(this)" type="button" class="btn btn-success btn-sm" disabled>Concluir</button>
                                  </div>
                                  `;
                                  } else if (row.status === "N??o Iniciado") {
                                      return `
                                  <div class="col-3">
                                  <button id="${data['id']}" onclick="iniciarAtividade(this)" type="button" class="btn btn-warning btn-sm">Iniciar  </button>
                                  </div>
                                  `;
                                  }
                              },
                              title: "A????es"
                          }
                      ],
                  }).buttons().container().appendTo("#datatable-Tarefas_wrapper .col-md-6:eq(0)");
                  $('div.toolbaratividade').html('');
              });
            }
        });
    });
  }

 function disabledEnabledFieldsSite(isDisabled, clearSelectOptions) {
  $('#titleFormSite').text((isDisabled ? "Visualizar Site" : "Editar Site"))
  $('#addNewSite').text('Salvar altera????es').css('display', (!isDisabled ? 'block' : 'none'))
  $('#btnEditarSite').css('display', (isDisabled ? 'block' : 'none'))

  $("#form_cliente_IdsiteMobilize").prop('disabled', isDisabled)
  $("#form_cliente_Idsharing").prop('disabled', isDisabled)
  $("#form_cliente_idSiteOperadora").prop('disabled', isDisabled)
  
  var date = document.getElementById('form_cliente_dataAcionamento')
  date.disabled = isDisabled
  date.style.display = (!isDisabled ? 'block' : 'none')
  
  $("#form_cliente_dataAcionamento_view")
      .prop('disabled', isDisabled)
      .css('display', (isDisabled ? 'block' : 'none'))
  
  $("#form_cliente_projeto").prop('disabled', isDisabled)
  $("#form_cliente_subProjeto").prop('disabled', isDisabled)
  $("#form_cliente_targetAluguel").prop('disabled', isDisabled)
  $("#form_cliente_alturaPrevista").prop('disabled', isDisabled)
  $("#form_cliente_latitude").prop('disabled', isDisabled)
  $("#form_cliente_longitude").prop('disabled', isDisabled)

  $("#anexos").css('display', (isDisabled ? "none" : "block"))

  var cliente = $("#form_cliente_site")
  var operadora = $("#form_cliente_operadora")
  var etapa = $("#form_cliente_etapa")
  var uf = $("#form_site_uf")
  var municipio = $("#form_site_municipio")
  var regional = $("#form_cliente_regional")
  var raioDeBusca =  $("#form_cliente_raioBusca")
  var opcao =  $("#form_cliente_opcao")
  var coordenadorCliente =  $("#form_cliente_coordenadorCliente")
  var coordenadorMobilize = $("#form_cliente_coordenadorMobilize")
  var tipoSite = $("#form_cliente_edit_tipoSite")


  cliente.prop('disabled', isDisabled);
  operadora.prop('disabled', isDisabled);
  etapa.prop('disabled', isDisabled);
  uf.prop('disabled', isDisabled);
  municipio.prop('disabled', isDisabled)
  regional.prop('disabled', isDisabled)
  raioDeBusca.prop('disabled', isDisabled)
  opcao.prop('disabled', isDisabled)
  coordenadorCliente.prop('disabled', isDisabled)
  coordenadorMobilize.prop('disabled', isDisabled)
  tipoSite.prop('disabled', isDisabled)

  if(!isDisabled) {
    var clienteSelected = cliente.find(':selected').val()
    var operadoraSelected = operadora.find(':selected').val()
    var etapaSelected = etapa.find(':selected').val()
    var ufSelected = uf.find(':selected').val()
    var clienteSelected = cliente.find(':selected').val()
    var _coordenadorCliente = coordenadorCliente.find(':selected').val()
    var _coordenadorMobilize = coordenadorMobilize.find(':selected').val()
    var municipioSelected = municipio.find(':selected').val()

    getAllRecords('widget_clientes_full', 'form_cliente_site', '(ID!='+clienteSelected+')' , false)
    getAllRecords('widget_operadoras_full', 'form_cliente_operadora','(ID!='+operadoraSelected+')', false)
    getAllRecords('widget_etapas_full', 'form_cliente_etapa', `(ID!=${etapaSelected})`)
    // getAllRecords('widget_sitetipos_full', 'editar_cliente_tipoSite', '(ID!='+_tipoSite+')', false)
    getAllRecords('widget_estados_full', 'form_site_uf', '(ID!='+ufSelected+')', false)
    getAllRecords('widget_contatos_full', 'form_cliente_coordenadorCliente', '(ID!='+_coordenadorCliente+')',false)
    getAllRecords('widget_responsaveis_full', 'form_cliente_coordenadorMobilize', '(Funcao.contains("Coordenador")&&ID!='+_coordenadorMobilize+')',false)
    getMunicipios('form_site_municipio', ufSelected,municipioSelected, 1, true)
  }

  if(clearSelectOptions) {
     const defaultOption = '<option value="">Selecione..</option>'
     cliente.empty().append(defaultOption)
     operadora.empty().append(defaultOption)
     etapa.empty().append(defaultOption)
     uf.empty().append(defaultOption)
     municipio.empty().append(defaultOption)
     coordenadorCliente.empty().append(defaultOption)
     coordenadorMobilize.empty().append(defaultOption)
     regional.val('')
     raioDeBusca.val('')
     opcao.val('')
  }
 }

 function viewEditSite(obj) {
  var config = {
    appName: "mobilize",
    reportName: "widget_sites_full",
    id: obj.id,
  };
  disabledEnabledFieldsSite(true, false)
  ZOHO.CREATOR.API.getRecordById(config).then((response) => {
    if(response.code != 3000) {
      swal({
        title: "Nao foi possivel carregar o site",
        type: "error",
        showConfirmButton: true
     });
      return
    }
      var data = response.data;

      $('#siteID').val(obj.id)

      if(data.cliente != '') {
        $("#form_cliente_site")
          .append(`<option value="${data.cliente.ID}">${data.cliente.display_value}</option>`)
          .val(data.cliente.ID)
      }

      $("#form_cliente_IdsiteMobilize").val(data.ID_Site_Mobilize)

      if(data.Operadora != '') {
          $("#form_cliente_operadora")
            .append(`<option value="${data.Operadora.ID}">${data.Operadora.display_value}</option>`)
            .val(data.Operadora.ID)
       }  

      $("#form_cliente_Idsharing").val(data.ID_Site_Sharing)

      if(data.Etapa != '') {      
        $("#form_cliente_etapa")
          .append(`<option value="${data.Etapa.ID}">${data.Etapa.display_value}</option>`)
          .val(data.Etapa.ID)
      }

      $("#form_cliente_idSiteOperadora").val(data.ID_Site_Operadora)

      if(data.TipoSiteCandidato != '' && data.TipoSiteCandidatoID != '') {
        $("#form_cliente_edit_tipoSite")
          .append(`<option value="${data.TipoSiteCandidatoID}">${data.TipoSiteCandidato}</option>`)
          .val(data.TipoSiteCandidatoID)
      }  

      var date = document.getElementById('form_cliente_dataAcionamento')
      date.valueAsDate = new Date(data.Data_de_Acionamento.replaceAll('-','/'))

      $("#form_cliente_dataAcionamento_view")
        .val(new Date(data.Data_de_Acionamento.replaceAll('-','/')).toLocaleDateString('pt-br'))

      $("#form_cliente_projeto").val(data.Projeto)

      $("#form_cliente_subProjeto").val(data.Sub_Projeto)

      $("#form_cliente_targetAluguel").val(maskCurrency(data.Target_do_Aluguel))

      if(data.UF != '') {
        $("#form_site_uf")
          .append(`<option value="${data.UF.ID}">${data.UF.display_value}</option>`)
          .val(data.UF.ID)
      }

      if(data.Municipio2 != '') {    
        $("#form_site_municipio")
          .append(`<option value="${data.Municipio2.ID}">${data.Municipio2.display_value}</option>`)
          .val(data.Municipio2.ID)
      }

      $("#form_cliente_regional").val(data.regional)

      $("#form_cliente_raioBusca").val(data.RAIO_DE_BUSCA_M)

      $("#form_cliente_opcao").val(data.Opcao)

      $("#form_cliente_alturaPrevista").val(data.Altura_Prevista_M)

      $("#form_cliente_latitude").val(data.Latitude)

      $("#form_cliente_longitude").val(data.Longitude)

      if(data.Contato != '') {
        $("#form_cliente_coordenadorCliente")
          .append(`<option value="${data.Contato.ID}">${data.Contato.display_value}</option>`)
          .val(data.Contato.ID)
      }

      if(data.Coordenador_Mobilize != '') {
        $("#form_cliente_coordenadorMobilize")
          .append(`<option value="${data.Coordenador_Mobilize.ID}">${data.Coordenador_Mobilize.display_value}</option>`)
          .val(data.Coordenador_Mobilize.ID)
      }
      
      escolhalatlong(data.Opcao, 1)
      habilitarAlturaSite("form_cliente_site", 1);
      $("#modalAdicionarSite").modal("show");
  })
}

// EXCLUS??ES //
function excluirSite(obj) {
  var siteID = obj.id;
  console.log(siteID);
  swal(
    {
      title: "Tem certeza que voc?? deseja deletar esse Site?",
      text: "Essa a????o ?? irrevers??vel",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "btn-secondary ",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Sim, deletar Site",
      cancelButtonText: "Cancelar",
      closeOnConfirm: false,
      closeOnCancel: false,
    },
    function (isConfirm) {
      if (isConfirm) {
        config = {
          appName: "mobilize",
          reportName: "All_Sites1",
          criteria: "(ID == " + siteID + ")",
        };
        ZOHO.CREATOR.API.deleteRecord(config).then(function (response) {
          if (response.code === 3000) {
            swal("Site excluido Com sucesso!", "", "success");
            setTimeout(() => {
              document.location.reload(true);
            }, 2000);
          } else {
            swal({
              title: "Atualize a Pagina e tente novamente!",
              type: "error",
              showConfirmButton: true,
            });
          }
        });
      } else {
        swal("Cancelado", "", "error");
      }
    }
  );
}

function mascaraMoeda(event) {
  const onlyDigits = event.target.value
    .split("")
    .filter((s) => /\d/.test(s))
    .join("")
    .padStart(3, "0");

  console.log(onlyDigits);
  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);

  console.log(digitsFloat);

  event.target.value = maskCurrency(digitsFloat);
}

function maskCurrency(valor, locale = "pt-BR", currency = "BRL") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(valor);
}

function toFloat(x) {
  var floatValue = +x;
  return floatValue;
}
