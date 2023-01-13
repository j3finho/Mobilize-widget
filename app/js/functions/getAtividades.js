function adicionaZero(numero) {
    if (numero <= 9)
        return "0" + numero;
    else
        return numero;
}

$('#btn_atividades').one('click', function (e) {
    getApizohoAtividaes();
});

function getApizohoAtividaes() {
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

                $('#datatable-Tarefas').DataTable({

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

function concluirAtividade(n) {
    ZOHO.CREATOR.init().then(function (data) {
        var idAtividade = n.id;
        var novaData = new Date();
        var meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var novaDataFormatada = (adicionaZero(novaData.getDate().toString()) + "-" + meses[(novaData.getMonth())] + "-" + novaData.getFullYear().toString().replace('-', '') + " " + adicionaZero(novaData.getHours().toString()) + ":" + adicionaZero(novaData.getMinutes().toString()) + ":" + adicionaZero(novaData.getSeconds().toString()) );
        var formData = { "data": { 'Data_Hora_Termino': novaDataFormatada, 'finishedIn': novaDataFormatada } }
        console.log(novaDataFormatada)
        console.log(idAtividade)
        var config = {
            appName: "mobilize",
            reportName: "Lista_de_Atividades",
            id: idAtividade,
            data: formData
        }
        console.log(formData)
        ZOHO.CREATOR.API.updateRecord(config).then(function (response) {
            if (response.code == 3000) {
                swal({
                    title: "Atividade Concluída com Sucesso !",
                    type: "success",
                    showConfirmButton: false
                });
                setTimeout(() => {
                    document.location.reload(true);
                }, 2000)
            } else {
                swal({
                    title: "Atualize a Pagina e tente novamente!",
                    type: "error",
                    showConfirmButton: true
                });
            }
        });
    });
}

function iniciarAtividade(n) {
    ZOHO.CREATOR.init().then(function (data) {
        var idAtividade = n.id;
        var novaData = new Date();
        var meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var novaDataFormatada = (adicionaZero(novaData.getDate().toString()) + "-" + meses[(novaData.getMonth())] + "-" + novaData.getFullYear().toString().replace('-', '') + " " + adicionaZero(novaData.getHours().toString()) + ":" + adicionaZero(novaData.getMinutes().toString()) + ":" + adicionaZero(novaData.getSeconds().toString()));
        var formData = { "data": { 'Data_Hora_Inicio': novaDataFormatada } }
        var config = {
            appName: "mobilize",
            reportName: "Lista_de_Atividades",
            id: idAtividade,
            data: formData
        }
        console.log(formData)
        ZOHO.CREATOR.API.updateRecord(config).then(function (response) {
            if (response.code == 3000) {
                swal({
                    title: "Atividade Iniciada Com sucesso!",
                    type: "success",
                    showConfirmButton: false
                });
                setTimeout(() => {
                    document.location.reload(true);
                }, 2000)
            } else {
                swal({
                    title: "Atualize a Pagina e tente novamente!",
                    type: "error",
                    showConfirmButton: true
                });
            }
        });
    });

}
