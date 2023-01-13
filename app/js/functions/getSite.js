function adicionaZero(numero) {
  if (numero <= 9) return "0" + numero;
  else return numero;
}

function verificarRegional() {
  valor = $("#form_editar_site_uf option:selected").html();
  if (
    valor == "AC" ||
    valor == "AM" ||
    valor == "RO" ||
    valor == "RR" ||
    valor == "PA" ||
    valor == "TO" ||
    valor == "AP"
  ) {
    $("#editar_cliente_regional").val("Norte");
  } else if (
    valor == "MA" ||
    valor == "PI" ||
    valor == "CE" ||
    valor == "RN" ||
    valor == "PB" ||
    valor == "PE" ||
    valor == "AL" ||
    valor == "SE" ||
    valor == "BA"
  ) {
    $("#editar_cliente_regional").val("Nordeste");
  } else if (valor == "MT" || valor == "MS" || valor == "GO" || valor == "DF") {
    $("#editar_cliente_regional").val("Centro Oeste");
  } else if (valor == "MG" || valor == "ES" || valor == "SP" || valor == "RJ") {
    $("#editar_cliente_regional").val("Sudeste");
  } else if (valor == "RS" || valor == "PR" || valor == "SC") {
    $("#editar_cliente_regional").val("Sul");
  }
}

function verificaSelectMunicipio(estadouf, pagina, campo) {
  var creatorSdkPromise = ZOHO.CREATOR.init();
  creatorSdkPromise.then(function (data) {
    var recordOps = ZOHO.CREATOR.API;

    var valorMun = $("#form_editar_site_municipio_old").val();
    var config = {
      appName: "mobilize",
      reportName: "widget_municipios_full",
      criteria: "(uf1.ID==" + estadouf + ")",
      page: pagina,
      pageSize: 200,
    };
    var getRecords = recordOps.getAllRecords(config);
    getRecords.then(function (response) {
      var v_municipiosSelectOptions = [];
      var recordArr = response.data;
      console.log(recordArr, "Municipios");
      recordArr.forEach(function (data, inicio) {
        v_municipiosSelectOptions.push({
          id: data.ID,
          nome: data.name,
        });
      });
      const form_site_municipio = document.getElementById(campo);
      v_municipiosSelectOptions.forEach((cod, cod2) => {
        var option = new Option(cod.nome);
        form_site_municipio.options[form_site_municipio.options.length] =
          option;
        $(option).val(cod.id);
      });
      if (v_municipiosSelectOptions.length >= 199) {
        getSelectMunicipio(estadouf, pagina + 1, campo);
      }
      $("#form_editar_site_municipio").val(valorMun);
    });
  });
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
          cliente: data.cliente.ID,
          uf: data.UF.display_value,
          //municipio: data.Municipio2.display_value,
          municipio:
            data.Municipio2.length != "" ? data.Municipio2.display_value : "",
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
          sZeroRecords: "Não há declarações emitidas no momento",
          sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
          sInfoEmpty: "Mostrando de 0 até 0 de 0 registros",
          sInfoFiltered: "",
          sInfoPostFix: "",
          sSearch: "Buscar:",
          sUrl: "",
          oPaginate: {
            sFirst: "Primeiro",
            sPrevious: "Anterior",
            sNext: "Seguinte",
            sLast: "Último",
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
            buttons: ["copy", "excel", "pdf"],
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
              { data: "idSiteMobilize", title: "ID Site Mobilize" },
              //{ data: 'cliente', title: "ID Cliente" },
              //{ data: 'tipoSite', title: "Tipo Site" },
              //{ data: 'etapa', title: "Etapa" },
              { data: "idSiteSharing", title: "ID Site Sharing" },
              { data: "idSiteOperadora", title: "ID Site Operadora" },
              //{ data: 'dataAcionamento', title: "Data de Acionamento" },
              { data: "latitude", title: "Latitude" },
              { data: "longitude", title: "Longitude" },
              { data: "uf", title: "UF" },
              { data: "municipio", title: "Município" },
              {
                className: "dt-body-center",
                orderable: false,
                data: null,
                defaultContent: "",
                render: function (data, type, row) {
                  return `
                                <div class="d-flex">
                                    <button id="${row.id}" type="button" onclick="viewSite(this)" class="btn btn-outline-secondary btn-sm" title="Visualizar">
                                        <i class="far fa-eye"></i>
                                    </button>
                                    <button id="${row.id}" type="button" onclick="editViewSite(this)" class="btn btn-outline-secondary btn-sm" title="Editar">
                                        <i class="fas fa-pencil-alt"></i>
                                    </button>
                                    <button id="${row.id}" type="button" onclick="excluirSite(this)" class="btn btn-outline-secondary btn-sm" title="Excluir Site">
                                         <i class="fas fa-trash-alt"></i>
                                    </button>
                                    <button id="${row.id}"  type="button" class="btn btn-outline-secondary btn-sm" title="Candidatos" data-bs-toggle="modal" data-bs-target="#modalCandidatosPorSite" onClick="viewCandidatosPorSite(this)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"></path>
                                        </svg>
                                        <span class="visually-hidden">Button</span>                 
                                    </button>
                                    <button id="${row.id}" type="button" class="btn btn-outline-secondary btn-sm" title="Tarefas" data-bs-toggle="modal" data-bs-target="#modalAtividadesPorSite" onClick="viewAtividadesPorSite(this)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"></path>
                                        </svg>
                                        <span class="visually-hidden">Button</span>                
                                    </button>
                                </div>
                            `;
                },
                title: "Ações",
              },
            ],
          })
          .buttons()
          .container()
          .appendTo("#datatable-sites_wrapper .col-md-6:eq(0)");

        $("div.toolbarsite").html(
          '<button class="btn btn-primary  p-2" data-bs-toggle="modal" data-bs-target=".modalAdicionarSite" onclick="escolhalatlong(``, 1),habilitarAlturaSite(`form_cliente_tipoSite`,1)" ><i class="mdi mdi-plus me-1"></i>  Criar Sites</button>&nbsp;&nbsp;&nbsp;<button class="btn btn-primary  p-2" data-bs-toggle="modal" data-bs-target=".modalAdicionarCandidato" onclick="escolhalatlongCand(``, 1),corredorAcessoCand(``, 1),habilitarAlturaCand(`form_candidato_tipo_site`,1)"><i class="mdi mdi-plus me-1"></i>Criar Candidato</button>'
        );
      });
    });
  });
}
getApizohoSites();

function viewSite(n) {
  console.log("teste view Site");
  $("#modalvisualizarSite").modal("show");
  var creatorSdkPromise = ZOHO.CREATOR.init();
  creatorSdkPromise.then(function (data) {
    var recordOps = ZOHO.CREATOR.API;
    var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
    var config = {
      appName: "mobilize",
      reportName: "widget_sites_full",
      id: n.id,
    };
    var getRecords = recordOps.getRecordById(config);
    var v_sites = [];
    getRecords.then(function (response) {
      var data = response.data;
      console.log(data, "Visualizar Sites");
      var dataAcionamento = data.Data_de_Acionamento;
      var novaDataAcionamento = new Date(dataAcionamento);
      var dataAcionamentoFormatada =
        adicionaZero(novaDataAcionamento.getDate().toString()) +
        "/" +
        adicionaZero(novaDataAcionamento.getMonth() + 1).toString() +
        "/" +
        novaDataAcionamento.getFullYear().toString().replace("-", "");
      var aluguel = data.Target_do_Aluguel;
      var aluguelFormatado = toFloat(aluguel);
      var aluguelParse = aluguelFormatado.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      v_sites.push({
        id: data.ID,
        idSiteMobilize: data.ID_Site_Mobilize,
        idSiteOperadora: data.ID_Site_Operadora,
        idSiteSharing: data.ID_Site_Sharing,
        latitude: data.Latitude,
        latitudeBusca: data.Latitude_de_Busca,
        longitude: data.Longitude,
        longitudeBusca: data.Longitude_de_Busca,
        operadora: data.Operadora.display_value,
        radioDeBusca: data.RAIO_DE_BUSCA_M,
        aluguel: data.Target_do_Aluguel,
        tipoSite: data.Tipo_Site.display_value,
        projeto: data.Projeto,
        subProjeto: data.Sub_Projeto,
        etapa: data.Etapa.display_value,
        dataAcionamento: dataAcionamentoFormatada,
        regional: data.regional,
        aluguel: aluguelParse,
        tipoContrato: data.Tipo_de_Contrato,
        alturaPrevista: data.Altura_Prevista_M,
        opcao: data.Opcao,
        cordMobilize: data.Coordenador_Mobilize.display_value,
        cordCliente: data.Contato.display_value,
        cliente: data.cliente.display_value,
        uf: data.UF.display_value,
        municipio: data.Municipio2.display_value,
      });

      var filtrarSite = v_sites.filter((site) => site.id == n.id);
      console.log(filtrarSite, "filtro site");
      $("#form_cliente_edit_site").val(filtrarSite.map((site) => site.cliente));
      $("#form_cliente_edit_IdsiteMobilize").val(
        filtrarSite.map((site) => site.idSiteMobilize)
      );
      $("#form_cliente_edit_operadora").val(
        filtrarSite.map((site) => site.operadora)
      );
      $("#form_cliente_edit_Idsharing").val(
        filtrarSite.map((site) => site.idSiteSharing)
      );
      $("#form_cliente_edit_etapa").val(filtrarSite.map((site) => site.etapa));
      $("#form_cliente_edit_idSiteOperadora").val(
        filtrarSite.map((site) => site.idSiteOperadora)
      );
      $("#form_cliente_edit_tipoSite").val(
        filtrarSite.map((site) => site.tipoSite)
      );
      $("#form_cliente_edit_id_dataAcionamento").val(
        filtrarSite.map((site) => site.dataAcionamento)
      );
      $("#form_cliente_edit_projeto").val(
        filtrarSite.map((site) => site.projeto)
      );
      $("#form_cliente_edit_Subprojeto").val(
        filtrarSite.map((site) => site.subProjeto)
      );
      $("#form_cliente_edit_regional").val(
        filtrarSite.map((site) => site.regional)
      );
      $("#form_cliente_edit_targetAluguel").val(
        filtrarSite.map((site) => site.aluguel)
      );
      $("#form_cliente_edit_raioBusca").val(
        filtrarSite.map((site) => site.radioDeBusca)
      );
      $("#form_cliente_edit_alturaPrevista").val(
        filtrarSite.map((site) => site.alturaPrevista)
      );
      $("#form_cliente_edit_opcao").val(filtrarSite.map((site) => site.opcao));
      $("#form_cliente_edit_latitude").val(
        filtrarSite.map((site) => site.latitude)
      );
      $("#form_cliente_edit_longitude").val(
        filtrarSite.map((site) => site.longitude)
      );
      $("#form_cliente_edit_coordenadorCliente").val(
        filtrarSite.map((site) => site.cordCliente)
      );
      $("#form_cliente_edit_coordenadorMobilize").val(
        filtrarSite.map((site) => site.cordMobilize)
      );
      $("#form_cliente_edit_UF").val(filtrarSite.map((site) => site.uf));
      $("#form_cliente_edit_municipio").val(
        filtrarSite.map((site) => site.municipio)
      );

      escolhalatlong(
        filtrarSite.map((site) => site.opcao),
        2
      );
      habilitarAlturaSite("form_cliente_edit_tipoSite", 3);
    });
  });
}

function viewCandidatosPorSite(n) {
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
          siteId: data.Site.ID,
          relatorioCriticoId:
            data.Relatorio_critico.length != ""
              ? data.Relatorio_critico.ID
              : "",
        });
      });

      $(document).ready(function () {
        var idioma = {
          bJQueryUI: true,
          sProcessing: "Processando...",
          sLengthMenu: "Mostrar _MENU_ registros",
          sZeroRecords: "Não há declarações emitidas no momento",
          sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
          sInfoEmpty: "Mostrando de 0 até 0 de 0 registros",
          sInfoFiltered: "",
          sInfoPostFix: "",
          sSearch: "Buscar:",
          sUrl: "",
          oPaginate: {
            sFirst: "Primeiro",
            sPrevious: "Anterior",
            sNext: "Seguinte",
            sLast: "Último",
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
            buttons: ["copy", "excel", "pdf"],
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
                                <button id="${data["id"]}"  type="button" onclick="" class="btn_view_site btn btn-outline-secondary btn-sm edit" title="Editar">
                                <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button id="${data["id"]}"  type="button" onclick="" class="btn_view_site btn btn-outline-secondary btn-sm edit" title="Excluir">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                            `;
                },
                width: "130px",
                title: "Ações"
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
                title: "Pontuação",
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
                  if (row.cuos === "Em Análise")
                    return '<span class="badge rounded-pill badge-soft-warning font-size-12">Em Análise</span>';
                  else if (row.cuos === "A Protocolar") {
                    return '<span class="badge rounded-pill badge-soft-warning font-size-12">A protocolar</span>';
                  } else if (row.cuos === "Sem Informação") {
                    return '<span class="badge rounded-pill badge-soft-danger font-size-12">Sem Informação</span>';
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
                className: "details-control",
                orderable: true,
                defaultContent: "",
                render: function (data, type, row) {
                  var disabledButton =
                    row.relatorioCriticoId.length > 0 ? "disabled" : "";
                  return `
                        <button onClick="alterarProprietario('${row.id}', '${row.proprietarioid}')" class="btn_view_site btn btn-outline-secondary btn-sm edit" title="Proprietário">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                        </button>
                        <button  onClick="alterarQualificacao('${row.id}','${row.qualificacaoid}') "class="btn_view_site btn btn-outline-secondary btn-sm edit" title="Qualificação">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-award" viewBox="0 0 16 16">
                                 <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"/>
                                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                          </svg>
                        </button>

                        <button  title="Docs e Licenciamento" onClick="alterarDocseLic('${row.id}', '${row.docsLicenciamentoId}')" "class="btn_view_site btn btn-outline-secondary btn-sm edit" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder2" viewBox="0 0 16 16">
                                <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z"/>
                            </svg>
                        </button>

                        <button  title="Infraestrutura" onClick="alterarInfra('${row.id}', '${row.infraestruturaId}')" "class="btn_view_site btn btn-outline-secondary btn-sm edit" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-broadcast-pin" viewBox="0 0 16 16">
                                <path d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM6 8a2 2 0 1 1 2.5 1.937V15.5a.5.5 0 0 1-1 0V9.937A2 2 0 0 1 6 8z"/>
                            </svg>
                        </button>
                        <button  title="Protocolo CUOS" onClick="alterarProtCuos('${row.id}', '${row.protocoloCuosId}')" "class="btn_view_site btn btn-outline-secondary btn-sm edit" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                            </svg>
                        </button>
                        <button  title="Relatório Crítico" data-bs-target=".modalConfirmacao" onClick="addRelatorioCritico('${row.siteId}', '${row.id}')" ${disabledButton} "class="btn_view_site btn btn-outline-secondary btn-sm edit" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                        </button>
                        <button  title="SAR"  onClick="abrirSAR('${row.id}')" class="btn_view_site btn btn-outline-secondary btn-sm edit" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                            </svg>
                        </button>
                    `;
                },
                width: "auto",
                title: "Ações para Candidato",
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

function viewAtividadesPorSite(n) {
    var creatorSdkPromise = ZOHO.CREATOR.init();
    creatorSdkPromise.then(function (data) {
        var recordOps = ZOHO.CREATOR.API;
        var config = {
            appName: "mobilize",
            reportName: "widget_atividades_full",
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

            // KPIS
            var filtrodeAtividades = v_Atividades.filter(atividade => atividade.status == "Finalizado")
            var totalFinalizados = adicionaZero(filtrodeAtividades.length);
            document.querySelector('#tarefasFinalizadas').innerText = totalFinalizados;

            var filtrodeAtividadesVc = v_Atividades.filter(function (v, i) {
                var dataHoje = new Date();
                var dataAtividade = new Date(v.dataTermino);
                return (((v.status == "Em andamento" || v.status == "Não Iniciado") && dataHoje > dataAtividade));
            })
            var totalFinalizadosVc = adicionaZero(filtrodeAtividadesVc.length);
            document.querySelector('#tarefasVencidas').innerText = totalFinalizadosVc;

            var filtrodeAtividadesEA = v_Atividades.filter(atividade => atividade.status == "Em andamento")
            var totalEmAndamentos = adicionaZero(filtrodeAtividadesEA.length);
            document.querySelector('#tarefasEmAndamento').innerText = totalEmAndamentos;

            var filtrodeAtividadesNI = v_Atividades.filter(atividade => atividade.status == "Não Iniciado")
            var totalNaoIniciadas = adicionaZero(filtrodeAtividadesNI.length);
            document.querySelector('#tarefasNaoIniciadas').innerText = totalNaoIniciadas;

            $(document).ready(function () {
                var idioma =
                {
                    "bJQueryUI": true,
                    "sProcessing": "Processando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "Não há declarações emitidas no momento",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando de 0 até 0 de 0 registros",
                    "sInfoFiltered": "",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "oPaginate": {
                        "sFirst": "Primeiro",
                        "sPrevious": "Anterior",
                        "sNext": "Seguinte",
                        "sLast": "Último"

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

                $('#datatable-buttons-atividades').DataTable({
                    data: v_Atividades,
                    "paging": true,
                    "lengthChange": !1,
                    "buttons": ["copy", "excel", "pdf"],
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
                        {
                            className: 'details-control',
                            orderable: true,
                            data: 'tarefa',
                            defaultContent: '',
                            render: function (data, type, row) {
                                if ((row.status == "Em andamento" || row.status == "Não Iniciado") && new Date() > new Date(row.dataTermino)) {
                                    return '<span style="color: #fff; background-color: #f00;">' + row.tarefa + '</span>';
                                } else if ((row.status == "Em andamento" || row.status == "Não Iniciado") && new Date() == new Date(row.dataTermino)) {
                                    return '<span style="color: #000; background-color: #ff0;">' + row.tarefa + '</span>';
                                } else {
                                    return '<span style="color: #000; background-color: #0f0;">' + row.tarefa + '</span>';
                                }
                            },
                            width: 'auto',
                            title: "Tarefas",
                        },
                        { data: 'site', title: "Id Site" },
                        { data: 'dataInicio', title: "Data de Inicio" },
                        { data: 'dataTermino', title: "Data de Término" },
                        { data: 'dataConclusao', title: "Data de Conclusão" },
                        { data: 'tempoHoras', title: "Tempo Consumido" },
                        { data: 'responsavel', title: "Responsável" },
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
                                } else if (row.status === "Não Iniciado") {
                                    return '<span class="badge rounded-pill badge-soft-danger font-size-12">Não Iniciado</span>';
                                }
                            },
                            width: 'auto',
                            title: "Status",
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
                                } else if (row.status === "Não Iniciado") {
                                    return `
                                <div class="col-3">
                                <button id="${data['id']}" onclick="iniciarAtividade(this)" type="button" class="btn btn-warning btn-sm">Iniciar  </button>
                                </div>
                                `;
                                }
                            },
                            title: "Ações",
                        }
                    ],
                }).buttons().container().appendTo("#datatable-Tarefas_wrapper .col-md-6:eq(0)");
                $('div.toolbaratividade').html('');
            });
        });
    });
  }

function editViewSite(n) {
  $("#modalEditarSite").modal("show");
  var idUpdate = n.id;
  var campo = $("#form_editar_site_uf");
  var creatorSdkPromise = ZOHO.CREATOR.init();
  creatorSdkPromise.then(function (data) {
    var recordOps = ZOHO.CREATOR.API;
    var config = {
      appName: "mobilize",
      reportName: "widget_sites_full",
      id: n.id,
    };
    var getRecords = recordOps.getRecordById(config);
    var v_sites = [];
    getRecords.then(function (response) {
      var data = response.data;
      console.log(data, "Visualizar Sites");
      var dataAcionamento = data.Data_de_Acionamento;
      var novaDataAcionamento = new Date(dataAcionamento);
      var dataAcionamentoFormatada =
        adicionaZero(novaDataAcionamento.getDate().toString()) +
        "/" +
        adicionaZero(novaDataAcionamento.getMonth() + 1).toString() +
        "/" +
        novaDataAcionamento.getFullYear().toString().replace("-", "");
      var aluguel = data.Target_do_Aluguel;
      var aluguelFormatado = toFloat(aluguel);
      var aluguelParse = aluguelFormatado.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      v_sites.push({
        id: data.ID,
        cliente: data.cliente.length != "" ? data.cliente.display_value : "",
        idSiteMobilize: data.ID_Site_Mobilize,
        idSiteOperadora: data.ID_Site_Operadora,
        idSiteSharing: data.ID_Site_Sharing,
        idCliente: data.cliente.length != "" ? data.cliente.ID : "",
        latitude: data.Latitude,
        latitudeBusca: data.Latitude_de_Busca,
        longitude: data.Longitude,
        longitudeBusca: data.Longitude_de_Busca,
        idOperadora: data.Operadora.length != "" ? data.Operadora.ID : "",
        operadora:
          data.Operadora.length != "" ? data.Operadora.display_value : "",
        radioDeBusca: data.RAIO_DE_BUSCA_M,
        aluguel: aluguelParse,
        idtipoSite: data.Tipo_Site.length != "" ? data.Tipo_Site.ID : "",
        tipoSite:
          data.Tipo_Site.length != "" ? data.Tipo_Site.display_value : "",
        projeto: data.Projeto,
        subProjeto: data.Sub_Projeto,
        etapa: data.Etapa,
        dataAcionamento: dataAcionamentoFormatada,
        regional: data.regional,
        tipoContrato: data.Tipo_de_Contrato,
        alturaPrevista: data.Altura_Prevista_M,
        opcao: data.Opcao,
        grauLat: data.GrauLAT,
        grauLong: data.GrauLONG,
        minutoLat: data.MinutoLAT,
        minutoLong: data.MinutoLONG,
        segLat: data.SegundosLAT,
        segLong: data.SegundosLONG,
        pontoCardLat: data.PontoCardealLAT,
        pontoCardLong: data.PontoCardealLONG,
        idCordMobilize:
          data.Coordenador_Mobilize.length != ""
            ? data.Coordenador_Mobilize.ID
            : "",
        cordMobilize:
          data.Coordenador_Mobilize.length != ""
            ? data.Coordenador_Mobilize.display_value
            : "",
        idcordCliente: data.Contato.length != "" ? data.Contato.ID : "",
        cordCliente: data.Contato.display_value,
        dataNormal: data.Data_de_Acionamento,
        uf: data.UF.length != "" ? data.UF.ID : "",
        municipio: data.Municipio2.length != "" ? data.Municipio2.ID : "",
      });
      var filtrarSite = v_sites.filter((site) => site.id == n.id);
      var cliente = filtrarSite
        .map((site) => site.idCliente)
        .reduce((site) => site.idCliente);
      var operadora = filtrarSite
        .map((site) => site.idOperadora)
        .reduce((site) => site.idOperadora);
      var etapa = filtrarSite
        .map((site) => site.etapa)
        .reduce((site) => site.etapa);
      var tipoSite = filtrarSite
        .map((site) => site.idtipoSite)
        .reduce((site) => site.idtipoSite);
      var regional = filtrarSite
        .map((site) => site.regional)
        .reduce((site) => site.regional);
      var tipoContrato = filtrarSite
        .map((site) => site.tipoContrato)
        .reduce((site) => site.tipoContrato);
      var alturaPrevista = filtrarSite
        .map((site) => site.alturaPrevista)
        .reduce((site) => site.alturaPrevista);
      var radioDeBusca = filtrarSite
        .map((site) => site.radioDeBusca)
        .reduce((site) => site.radioDeBusca);
      var opcao = filtrarSite
        .map((site) => site.opcao)
        .reduce((site) => site.opcao);
      var pontoCardLat = filtrarSite
        .map((site) => site.pontoCardLat)
        .reduce((site) => site.pontoCardLat);
      var pontoCardLong = filtrarSite
        .map((site) => site.pontoCardLong)
        .reduce((site) => site.pontoCardLong);
      var idcordCliente = filtrarSite
        .map((site) => site.idcordCliente)
        .reduce((site) => site.idcordCliente);
      var idCordMobilize = filtrarSite
        .map((site) => site.idCordMobilize)
        .reduce((site) => site.idCordMobilize);
      var dataAcionamento = filtrarSite
        .map((site) => site.dataNormal)
        .reduce((site) => site.dataNormal);
      var data = new Date(dataAcionamento);
      var dataAcionamentoFormatada =
        data.getFullYear().toString().replace("-", "") +
        "-" +
        adicionaZero(data.getMonth() + 1) +
        "-" +
        data.getDate();

      $("#form_editar_site_uf").val(filtrarSite.map((site) => site.uf));
      $("#editar_cliente_site")
        .find('[value="' + cliente + '"]')
        .attr("selected", true);
      $("#editar_cliente_operadora")
        .find('[value="' + operadora + '"]')
        .attr("selected", true);
      $("#editar_cliente_etapa")
        .find('[value="' + etapa.ID + '"]')
        .attr("selected", true);
      $("#editar_cliente_tipoSite")
        .find('[value="' + tipoSite + '"]')
        .attr("selected", true);
      $("#editar_cliente_regional")
        .find('[value="' + regional + '"]')
        .attr("selected", true);
      $("#editar_cliente_alturaPrevista")
        .find('[value="' + alturaPrevista + '"]')
        .attr("selected", true);
      $("#editar_cliente_raioBusca")
        .find('[value="' + radioDeBusca + '"]')
        .attr("selected", true);
      $("#editar_clienteopcao_")
        .find('[value="' + opcao + '"]')
        .attr("selected", true);
      $("#editar_cliente_pontoCardealLat")
        .find('[value="' + pontoCardLat + '"]')
        .attr("selected", true);
      $("#editar_cliente_pontoCardealLong")
        .find('[value="' + pontoCardLong + '"]')
        .attr("selected", true);
      $("#editar_cliente_coordenadorCliente")
        .find('[value="' + idcordCliente + '"]')
        .attr("selected", true);
      $("#editar_cliente_coordenadorMobilize")
        .find('[value="' + idCordMobilize + '"]')
        .attr("selected", true);
      $("#editar_cliente_IdsiteMobilize").val(
        filtrarSite.map((site) => site.idSiteMobilize)
      );
      $("#editar_cliente_Idsharing").val(
        filtrarSite.map((site) => site.idSiteSharing)
      );
      $("#editar_cliente_idSiteOperadora").val(
        filtrarSite.map((site) => site.idSiteOperadora)
      );
      $("#editar_cliente_projeto").val(filtrarSite.map((site) => site.projeto));
      $("#editar_cliente_subProjeto").val(
        filtrarSite.map((site) => site.subProjeto)
      );
      $("#editar_cliente_latitudeBusca").val(
        filtrarSite.map((site) => site.latitudeBusca)
      );
      $("#editar_longitudeBusca").val(
        filtrarSite.map((site) => site.longitudeBusca)
      );
      $("#editar_cliente_latitude").val(
        filtrarSite.map((site) => site.latitude)
      );
      $("#editar_cliente_longitude").val(
        filtrarSite.map((site) => site.longitude)
      );
      $("#editar_cliente_targetAluguel").val(
        filtrarSite.map((site) => site.aluguel)
      );
      $("#editar_cliente_grauLat").val(filtrarSite.map((site) => site.grauLat));
      $("#editar_cliente_grauLong").val(
        filtrarSite.map((site) => site.grauLong)
      );
      $("#editar_cliente_minLat").val(
        filtrarSite.map((site) => site.minutoLat)
      );
      $("#editar_cliente_minLong").val(
        filtrarSite.map((site) => site.minutoLong)
      );
      $("#editar_cliente_segLat").val(filtrarSite.map((site) => site.segLat));
      $("#editar_cliente_segLong").val(filtrarSite.map((site) => site.segLong));
      $("#form_editar_site_municipio").val(
        filtrarSite.map((site) => site.municipio)
      );
      $("#form_editar_site_municipio_old").val(
        filtrarSite.map((site) => site.municipio)
      );
      $("#editar_cliente_dataAcionamento").val(dataAcionamentoFormatada);
      $("#idUpdate").val(idUpdate);
      verificarRegional();
      verificaSelectMunicipio(
        filtrarSite.map((site) => site.uf),
        1,
        "form_editar_site_municipio"
      );
      escolhalatlong(opcao, 2);
      habilitarAlturaSite("editar_cliente_tipoSite", 2);
    });
  });
}

// EXCLUSÕES //
function excluirSite(obj) {
  var siteID = obj.id;
  console.log(siteID);
  swal(
    {
      title: "Tem certeza que você deseja deletar esse Site?",
      text: "Essa ação é irreversível",
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

function editSite() {
  swal(
    {
      title: "Atenção",
      text: "Você tem certeza que deseja atualizar este site?",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "btn-secondary ",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Atualizar",
      cancelButtonText: "Cancelar",
      closeOnConfirm: false,
      closeOnCancel: false,
    },
    function (isConfirm) {
      if (isConfirm) {
        ZOHO.CREATOR.init().then(function (data) {
          var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
          var paramsID = queryParams.idconta;
          var form_cliente_site = document.getElementById(
            "editar_cliente_site"
          );
          var form_cliente_siteValue =
            form_cliente_site.options[form_cliente_site.selectedIndex].value;
          var form_cliente_operadora = document.getElementById(
            "editar_cliente_operadora"
          );
          var form_cliente_operadoraValue =
            form_cliente_operadora.options[form_cliente_operadora.selectedIndex]
              .value;
          var form_cliente_tipoSite = document.getElementById(
            "editar_cliente_tipoSite"
          );
          var form_cliente_tipoSiteValue =
            form_cliente_tipoSite.options[form_cliente_tipoSite.selectedIndex]
              .value;
          var form_cliente_coordenadorCliente = document.getElementById(
            "editar_cliente_coordenadorCliente"
          );
          var form_cliente_coordenadorClienteValue =
            form_cliente_coordenadorCliente.options[
              form_cliente_coordenadorCliente.selectedIndex
            ].value;
          var form_cliente_coordenadorMobilize = document.getElementById(
            "editar_cliente_coordenadorMobilize"
          );
          var form_cliente_coordenadorMobilizeValue =
            form_cliente_coordenadorMobilize.options[
              form_cliente_coordenadorMobilize.selectedIndex
            ].value;
          var form_cliente_etapa = document.getElementById(
            "editar_cliente_etapa"
          );
          var form_cliente_etapaValue =
            form_cliente_etapa.options[form_cliente_etapa.selectedIndex].value;
          var form_cliente_regional = document.getElementById(
            "editar_cliente_regional"
          );
          var form_cliente_regionalValue =
            form_cliente_regional.options[form_cliente_regional.selectedIndex]
              .value;
          var form_cliente_alturaPrevista = document.getElementById(
            "editar_cliente_alturaPrevista"
          );
          var form_cliente_alturaPrevistaValue =
            form_cliente_alturaPrevista.options[
              form_cliente_alturaPrevista.selectedIndex
            ].value;
          var form_cliente_raioBusca = document.getElementById(
            "editar_cliente_raioBusca"
          );
          var form_cliente_raioBuscaValue =
            form_cliente_raioBusca.options[form_cliente_raioBusca.selectedIndex]
              .value;
          var form_cliente_pontoCardealLat = document.getElementById(
            "editar_cliente_pontoCardealLat"
          );
          var form_cliente_pontoCardealLatValue =
            form_cliente_pontoCardealLat.options[
              form_cliente_pontoCardealLat.selectedIndex
            ].value;
          var form_cliente_pontoCardealLong = document.getElementById(
            "editar_cliente_pontoCardealLong"
          );
          var form_cliente_pontoCardealLongValue =
            form_cliente_pontoCardealLong.options[
              form_cliente_pontoCardealLong.selectedIndex
            ].value;
          var form_cliente_IdsiteMobilize = document.getElementById(
            "editar_cliente_IdsiteMobilize"
          ).value;
          var form_cliente_Idsharing = document.getElementById(
            "editar_cliente_Idsharing"
          ).value;
          var form_cliente_idSiteOperadora = document.getElementById(
            "editar_cliente_idSiteOperadora"
          ).value;
          var form_cliente_projeto = document.getElementById(
            "editar_cliente_projeto"
          ).value;
          var form_cliente_subProjeto = document.getElementById(
            "editar_cliente_subProjeto"
          ).value;
          var form_cliente_targetAluguel = document.getElementById(
            "editar_cliente_targetAluguel"
          ).value;
          var form_cliente_opcao = document.getElementById(
            "editar_clienteopcao_"
          ).value;
          var form_cliente_latitude = document.getElementById(
            "editar_cliente_latitude"
          ).value;
          var form_cliente_longitude = document.getElementById(
            "editar_cliente_longitude"
          ).value;
          var form_cliente_grauLat = document.getElementById(
            "editar_cliente_grauLat"
          ).value;
          var form_cliente_grauLong = document.getElementById(
            "editar_cliente_grauLong"
          ).value;
          var form_cliente_minLat = document.getElementById(
            "editar_cliente_minLat"
          ).value;
          var form_cliente_minLong = document.getElementById(
            "editar_cliente_minLong"
          ).value;
          var form_cliente_segLat = document.getElementById(
            "editar_cliente_segLat"
          ).value;
          var form_cliente_segLong = document.getElementById(
            "editar_cliente_segLong"
          ).value;
          var form_cliente_uf = document.getElementById("form_editar_site_uf");
          var form_cliente_ufValue =
            form_cliente_uf.options[form_cliente_uf.selectedIndex].value;
          var form_cliente_municipio = document.getElementById(
            "form_editar_site_municipio"
          );
          var form_cliente_municipioValue =
            form_cliente_municipio.options[form_cliente_municipio.selectedIndex]
              .value;
          var form_cliente_dataAcionamento = document.getElementById(
            "editar_cliente_dataAcionamento"
          ).value;
          var form_cliente_targetAluguel2 = form_cliente_targetAluguel.replace(
            "R$",
            ""
          );
          var valorFinal1 = form_cliente_targetAluguel2.replaceAll(".", "");
          var valorFinal2 = valorFinal1.replace(",", ".").trim();
          var idUpdate = document.getElementById("idUpdate").value;
          const meses = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          let dataInicioAnterior = new Date(form_cliente_dataAcionamento);
          let dataInicioAFormatada =
            adicionaZero(dataInicioAnterior.getDate() + 1) +
            "-" +
            meses[dataInicioAnterior.getMonth()] +
            "-" +
            dataInicioAnterior.getFullYear().toString().replace("-", "");
          console.log(dataInicioAFormatada);
          var LatFormatado = parseInt(form_cliente_latitude);
          var LongFormatado = parseInt(form_cliente_longitude);
          var formData = {
            data: {
              Projeto: form_cliente_projeto,
              UF: form_cliente_ufValue,
              Municipio2: form_cliente_municipioValue,
              Tipo_Site: form_cliente_tipoSiteValue,
              Etapa: form_cliente_etapaValue,
              ID_Site_Mobilize: form_cliente_IdsiteMobilize,
              Longitude: LongFormatado,
              Latitude: LatFormatado,
              Operadora: form_cliente_operadoraValue,
              ID_Site_Operadora: form_cliente_idSiteOperadora,
              ID_Site_Sharing: form_cliente_Idsharing,
              client: form_cliente_siteValue,
              regional: form_cliente_regionalValue,
              Altura_Prevista_M: form_cliente_alturaPrevistaValue,
              RAIO_DE_BUSCA_M: form_cliente_raioBuscaValue,
              Target_do_Aluguel: valorFinal2,
              GrauLAT: form_cliente_grauLat,
              GrauLONG: form_cliente_grauLong,
              MinutoLAT: form_cliente_minLat,
              MinutoLONG: form_cliente_minLong,
              SegundosLAT: form_cliente_segLat,
              SegundosLONG: form_cliente_segLong,
              PontoCardealLAT: form_cliente_pontoCardealLatValue,
              PontoCardealLONG: form_cliente_pontoCardealLongValue,
              Coordenador_Mobilize: form_cliente_coordenadorMobilizeValue,
              Sub_Projeto: form_cliente_subProjeto,
              Contato: form_cliente_coordenadorClienteValue,
              Opcao: form_cliente_opcao,
            },
          };
          var config = {
            appName: "mobilize",
            reportName: "widget_sites_full",
            id: idUpdate,
            data: formData,
          };
          console.log(formData, "form");
          ZOHO.CREATOR.API.updateRecord(config).then(function (response) {
            if (response.code == 3000) {
              console.log("sucess");
              swal({
                title: "Site Atualizado com sucesso!",
                type: "success",
                showConfirmButton: false,
              });
              setTimeout(() => {
                document.location.reload(true);
              }, 2000);
            } else {
              var v_erro = "";
              $.each(response.error, function (key, val) {
                v_erro = v_erro + val + ". ";
              });
              swal({
                title: "Atualize a Pagina e tente novamente! (" + v_erro + ")",
                type: "error",
                showConfirmButton: true,
              });
            }
          });
        });
      } else {
        swal("Cancelado", "O site não foi atualizado", "error");
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
