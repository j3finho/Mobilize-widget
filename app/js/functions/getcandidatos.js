import adicionaZero from "./ultilitys.js";


/*
$('#btn_candidatos').one('click', function(e) {
    getApizohoCandidatos();
});

function getApizohoCandidatos() {
    var creatorSdkPromise = ZOHO.CREATOR.init();
    creatorSdkPromise.then(function(data) {
        var recordOps = ZOHO.CREATOR.API;
        var config = {
            appName: "mobilize",
            reportName: "widget_candidatos_full",
        }
        var getRecords = recordOps.getAllRecords(config);
        getRecords.then(function(response) {
            var recordArr = response.data;
            var v_candidatos = [];
            recordArr.forEach(function(data, inicio) {
                v_candidatos.push({
                    id: data.ID,
                    age: data.AGE,
                    altitude: data.altitude,
                    larguraArea: data.largura_Area_Locada,
                    latitude: data.Latitude,
                    longitude: data.Longitude,
                    proprietario: ((data.Proprietario.length != '') ? data.Proprietario.display_value : ''),
                    proprietarioid: ((data.Proprietario.length != '') ? data.Proprietario.ID : ''),
                    qualificacaoid: ((data.Qualifica_o_do_Candadito_ID.length != '') ? data.Qualifica_o_do_Candadito_ID.ID : ''),
                    siglaCandidato: data.Sigla_do_Candidato,
                    pontuacao: data.pontuacaoCandidato,
                    tipoSite: data.Tipo_Site,
                    status: data.Status_do_Candidato,
                    endereco: data.Endereco,
                    bairro: data.Bairro,
                    cep: data.CEP,
                    cuos: data.CUOS,
                    site: ((data.Site.length != '') ? data.Site.display_value : ''),
                    docsLicenciamentoId: (data.Docs_e_Licenciamento.length > 0 ? data.Docs_e_Licenciamento[0].ID : ''),
                    infraestruturaId: (data.Infraestrutura.length > 0 ? data.Infraestrutura[0].ID : ''),
                    protocoloCuosId: (data.Protocolo_ou_CUOS.length > 0 ? data.Protocolo_ou_CUOS[0].ID : ''),
                    siteId: data.Site.ID,
                    relatorioCriticoId: ((data.Relatorio_critico.length != '') ? data.Relatorio_critico.ID : '')
                });
            });

            // KPIS
            var filtrodeCandidatos = v_candidatos.filter(candi => candi.cuos == "Em Análise")
            var totalFinalizados = adicionaZero(filtrodeCandidatos.length);
            document.querySelector('#cuosEmAnalise').innerText = totalFinalizados;

            var filtrodeCandidatosEA = v_candidatos.filter(candi => candi.cuos == "Indeferido")
            var totalEmAndamentos = adicionaZero(filtrodeCandidatosEA.length);
            document.querySelector('#cuosIndeferido').innerText = totalEmAndamentos;

            var filtrodeCandidatosNI = v_candidatos.filter(candi => candi.cuos == "Deferido")
            var totalNaoIniciadas = adicionaZero(filtrodeCandidatosNI.length);
            document.querySelector('#cuosDeferido').innerText = totalNaoIniciadas;
            $(document).ready(function() {
                var idioma = {
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

                $('#datatable-buttons').DataTable({
                    data: v_candidatos,
                    "order": [
                        [1, 'desc']
                    ],
                    "paging": true,
                    "lengthChange": !1,
                    "buttons": ["copy", "excel", "pdf"],
                    "dom": "<'row'<'col-sm-6 toolbarcandidato'><'col-sm-6'B>>" +
                        "<'row'<'col-sm-6'><'col-sm-6'f>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-5'i><'col-sm-7'p>>",
                    "searching": true,
                    "ordering": true,
                    "info": true,
                    "autoWidth": true,
                    "language": idioma,

                    columns: [
                        {
                            data: null,
                            defaultContent: '',
                            render: function (data, type, row) {
                                return `
                                <button id="${data['id']}"  type="button" onclick="viewCandidato(this)" class="btn_view_site btn btn-outline-secondary btn-sm edit" title="Visualizar">
                                    <i class="far fa-eye"></i>
                                </button>
                                <button id="${data['id']}"  type="button" onclick="" class="btn_view_site btn btn-outline-secondary btn-sm edit" title="Editar">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button id="${data['id']}"  type="button" onclick="" class="btn_view_site btn btn-outline-secondary btn-sm edit" title="Excluir">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            `;
                            },
                            title: "Ações"  
                        },
                        {
                            data: 'status',
                            title: "Status",
                        },
                        {
                            data: 'siglaCandidato',
                            title: "Sigla",
                        },
                        {
                            data: 'site',
                            title: "Site"
                        },
                        {
                            data: 'pontuacao',
                            title: "Pontuação"
                        },
                        {
                            data: 'latitude',
                            title: "Latitude"
                        },
                        {
                            data: 'longitude',
                            title: "Longitude"
                        },
                        {
                            className: 'details-control',
                            orderable: true,
                            data: 'cuos',
                            defaultContent: '',
                            render: function(data, type, row) {
                                if (row.cuos === 'Em Análise')
                                    return '<span class="badge rounded-pill badge-soft-warning font-size-12">Em Análise</span>';
                                else if (row.cuos === "A Protocolar") {
                                    return '<span class="badge rounded-pill badge-soft-warning font-size-12">A protocolar</span>';
                                } else if (row.cuos === "Sem Informação") {
                                    return '<span class="badge rounded-pill badge-soft-danger font-size-12">Sem Informação</span>';
                                } else if (row.cuos === "Indeferido") {
                                    return '<span class="badge rounded-pill badge-soft-danger font-size-12">Indeferido</span>';
                                } else if (row.cuos === 'N/A') {
                                    return '<span class="badge rounded-pill badge-soft-secondary font-size-12">N/A</span>';
                                } else if (row.cuos === "Deferido") {
                                    return '<span class="badge badge-soft-success font-size-12" > Deferido </span>';
                                }
                            },
                            width: 'auto',
                            title: "CUOS",
                        },
                        {
                            className: 'details-control',
                            orderable: true,
                            defaultContent: '',
                            render: function(data, type, row) {
                                var disabledButton = row.relatorioCriticoId.length > 0 ? 'disabled' : '';
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
                                `
                            },
                            width: 'auto',
                            title: "Ações",
                        }
                    ],
                }).buttons().container().appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)");
                $('div.toolbarcandidato').html('<button class="btn btn-primary  p-2" data-bs-toggle="modal" data-bs-target=".modalAdicionarCandidato" onclick="escolhalatlongCand(``, 1),corredorAcessoCand(``, 1),habilitarAlturaCand(`form_candidato_tipo_site`,1)"><i class="mdi mdi-plus me-1"></i>Criar Candidato</button>');
            });
        });
    });
}
*/

function viewCandidato(obj) {
    console.log("recebendo os valores da API referente ao candidato em questao");

    $('#modalViewCandidato').modal('show');
    ZOHO.CREATOR.API.init().then((data) => {
        var config = {
            appName: "mobilize",
            reportName: "widget_candidatos_full",
            id: obj.id
        };
        ZOHO.CREATOR.API.getRecordById(config).then((responseCandidato) => {
            var siglaCandidato = responseCandidato.data.Sigla_do_Candidato;
            var site = responseCandidato.data.Site.display_value;
            var tipoSite = responseCandidato.data.Tipo_Site.display_value;
            var aluguel = responseCandidato.data.Valor_do_Aluguel;
            var tipoNegociacao = responseCandidato.data.Tipo_de_Negocia_o;


            $("#form_candidato_editar_sigla").val(siglaCandidato)
            $("#form_candidato_editar_site").val(site)
            $("#form_candidato_tipo_editar_site").val(tipoSite)
            $("#form_candidato_editar_aluguel").val(aluguel)
            $("input[name='tipo_propriedade_editar']").val(tipoNegociacao)
        })
    })
}

// export default getApizohoCandidatos;