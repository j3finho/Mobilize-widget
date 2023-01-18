export function getSelectSite() {
    var creatorSdkPromise = ZOHO.CREATOR.init();
    creatorSdkPromise.then(function (data) {
        var recordOps = ZOHO.CREATOR.API;
        var config = {
            appName: "mobilize",
            reportName: "widget_sites_full",
        };
        var getRecords = recordOps.getAllRecords(config);
        getRecords.then(function (response) {
            var v_sitesSelectOptions = []
            var recordArr = response.data;
            console.log(recordArr, 'SITES')
            recordArr.forEach(function (data, inicio) {
                v_sitesSelectOptions.push(
                    {
                        id: data.ID,
                        nome: data.ID_Site_Mobilize,
                    }
                );
            });
            const codigoSelect = document.getElementById("AtividadeSites");
            v_sitesSelectOptions.forEach((cod, cod2) => {
                var option = new Option(cod.nome);
                codigoSelect.options[codigoSelect.options.length] = option;
                $(option).val(cod.id)
            });
            const candidatoSiteSelect = document.getElementById("form_candidato_site");
            v_sitesSelectOptions.forEach((cod, cod2) => {
                var option = new Option(cod.nome);
                candidatoSiteSelect.options[candidatoSiteSelect.options.length] = option;
                $(option).val(cod.id)
            });
            $("option").attr("text-truncate");
        });
    });
}


export function capturarDados() {
    var creatorSdkPromise = ZOHO.CREATOR.init();
    creatorSdkPromise.then(function (data) {
        var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
        userEmail = queryParams.email;
        dadosUrl = queryParams.infoUrl;
        $('#dadosurlzoho').val(dadosUrl);
        $('#useremailzoho').val(userEmail);

    });
}

// export function getSelectTipoSite() {
//     var creatorSdkPromise = ZOHO.CREATOR.init();
//     creatorSdkPromise.then(function (data) {
//         var recordOps = ZOHO.CREATOR.API;
//         var config = {
//             appName: "mobilize",
//             reportName: "widget_sitetipos_full",
//         };
//         var getRecords = recordOps.getAllRecords(config);
//         getRecords.then(function (response) {
//             var v_sitesSelectOptions = []
//             var recordArr = response.data;
//             console.log(recordArr, 'TIPO SITES')
//             recordArr.forEach(function (data, inicio) {
//                 v_sitesSelectOptions.push(
//                     {
//                         tipoSiteID: data.ID,
//                         tipoSiteName: data.Tipo_Site
//                     }
//                 );
//             });
//             const codigoSelectSites = document.getElementById("form_cliente_tipoSite");
//             v_sitesSelectOptions.forEach((cod, cod2) => {
//                 var option = new Option(cod.tipoSiteName);
//                 codigoSelectSites.options[codigoSelectSites.options.length] = option;
//                 $(option).val(cod.tipoSiteID)
//             });
//             $("option").attr("text-truncate");
//             const tipoSelectSites = document.getElementById("editar_cliente_tipoSite");
//             v_sitesSelectOptions.forEach((cod, cod2) => {
//                 var option = new Option(cod.tipoSiteName);
//                 tipoSelectSites.options[tipoSelectSites.options.length] = option;
//                 $(option).val(cod.tipoSiteID)
//             });
//             $("option").attr("text-truncate");
//             const candidatosTipoSelectSites = document.getElementById("form_candidato_tipo_site");
//             v_sitesSelectOptions.forEach((cod, cod2) => {
//                 var option = new Option(cod.tipoSiteName);
//                 candidatosTipoSelectSites.options[candidatosTipoSelectSites.options.length] = option;
//                 $(option).val(cod.tipoSiteID)
//             });
//             $("option").attr("text-truncate");
//         });
//     });
// }

// export function getSelectClientes() {
//     var creatorSdkPromise = ZOHO.CREATOR.init();
//     creatorSdkPromise.then(function (data) {
//         var recordOps = ZOHO.CREATOR.API;
//         var config = {
//             appName: "mobilize",
//             reportName: "widget_clientes_full",
//         };
//         var getRecords = recordOps.getAllRecords(config);
//         getRecords.then(function (response) {
//             var v_clientesSelectOptions = []
//             var recordArr = response.data;
//             console.log(recordArr, 'clientes')
//             recordArr.forEach(function (data, inicio) {
//                 v_clientesSelectOptions.push(
//                     {
//                         id: data.ID,
//                         nome: data.nameClient
//                     }
//                 );
//             });
//             const codigoSelect = document.getElementById("form_cliente_site");
//             v_clientesSelectOptions.forEach((cod, cod2) => {
//                 var option = new Option(cod.nome);
//                 codigoSelect.options[codigoSelect.options.length] = option;
//                 $(option).val(cod.id)
//             });
//             const editarClienteSelect = document.getElementById("editar_cliente_site");
//             v_clientesSelectOptions.forEach((cod, cod2) => {
//                 var option = new Option(cod.nome);
//                 editarClienteSelect.options[editarClienteSelect.options.length] = option;
//                 $(option).val(cod.id)
//             });
//         });
//     });
// }

// export function getSelectOperadoras() {
//     var creatorSdkPromise = ZOHO.CREATOR.init();
//     creatorSdkPromise.then(function (data) {
//         var recordOps = ZOHO.CREATOR.API;
//         var config = {
//             appName: "mobilize",
//             reportName: "widget_operadoras_full",
//         };
//         var getRecords = recordOps.getAllRecords(config);
//         getRecords.then(function (response) {
//             var v_clientesSelectOptions = []
//             var recordArr = response.data;
//             console.log(recordArr, 'Operadoras')
//             recordArr.forEach(function (data, inicio) {
//                 v_clientesSelectOptions.push(
//                     {
//                         id: data.ID,
//                         nome: data.Nome_Operadora1
//                     }
//                 );
//             });
//             const codigoSelect = document.getElementById("form_cliente_operadora");
//             v_clientesSelectOptions.forEach((cod, cod2) => {
//                 var option = new Option(cod.nome);
//                 codigoSelect.options[codigoSelect.options.length] = option;
//                 $(option).val(cod.id)
//             });
//             const editarOperadoraSelect = document.getElementById("editar_cliente_operadora");
//             v_clientesSelectOptions.forEach((cod, cod2) => {
//                 var option = new Option(cod.nome);
//                 editarOperadoraSelect.options[editarOperadoraSelect.options.length] = option;
//                 $(option).val(cod.id)
//             });
//         });
//     });
// }

// export function getSelectTarefas() {
//     var creatorSdkPromise = ZOHO.CREATOR.init();
//     creatorSdkPromise.then(function (data) {
//         var recordOps = ZOHO.CREATOR.API;
//         var config = {
//             appName: "mobilize",
//             reportName: "widget_tarefas_full",
//         };
//         var getRecords = recordOps.getAllRecords(config);
//         getRecords.then(function (response) {
//             var v_tarefasSelectOptions = []
//             var recordArr = response.data;
//             recordArr.forEach(function (data, inicio) {
//                 v_tarefasSelectOptions.push(
//                     {
//                         id: data.ID,
//                         nome: data.Ordem + ' - ' + data.Nome_da_Tarefa
//                     }
//                 );
//             });
//             const codigoSelect = document.getElementById("tarefaSelect");
//             v_tarefasSelectOptions.forEach((cod, cod2) => {
//                 var option = new Option(cod.nome);
//                 codigoSelect.options[codigoSelect.options.length] = option;
//                 $(option).val(cod.id)
//             });
//             $("option").attr("text-truncate");
//         });
//     });
}


export function getSelectResponsavel() {
    var creatorSdkPromise = ZOHO.CREATOR.init();
    creatorSdkPromise.then(function (data) {
        var recordOps = ZOHO.CREATOR.API;
        var config = {
            appName: "mobilize",
            reportName: "widget_responsaveis_full",
        };
        var getRecords = recordOps.getAllRecords(config);
        getRecords.then(function (response) {
            var v_responsavelSelectOptions = []
            var recordArr = response.data;
            recordArr.forEach(function (data, inicio) {
                v_responsavelSelectOptions.push(
                    {
                        id: data.ID,
                        nome: data.Nome.display_value
                    }
                );
            });
            const codigoSelect = document.getElementById("selectResponsavel");
            const codigoSelectSiteResponsavelMobilize = document.getElementById("form_cliente_coordenadorMobilize");
            const editarCoodMobMobilize = document.getElementById("editar_cliente_coordenadorMobilize");
            v_responsavelSelectOptions.forEach((cod, cod2) => {
                var option = new Option(cod.nome);
                codigoSelect.options[codigoSelect.options.length] = option;
                $(option).val(cod.id)

            });
            v_responsavelSelectOptions.forEach((cod, cod2) => {
                var option = new Option(cod.nome);
                codigoSelectSiteResponsavelMobilize.options[codigoSelectSiteResponsavelMobilize.options.length] = option;
                $(option).val(cod.id)
            });
            v_responsavelSelectOptions.forEach((cod, cod2) => {
                var option = new Option(cod.nome);
                editarCoodMobMobilize.options[editarCoodMobMobilize.options.length] = option;
                $(option).val(cod.id)
            });
            $("option").attr("text-truncate");
        });
    });
}

export function getSelectStatus() {
    var creatorSdkPromise = ZOHO.CREATOR.init();
    creatorSdkPromise.then(function (data) {
        var recordOps = ZOHO.CREATOR.API;
        var config = {
            appName: "mobilize",
            reportName: "All_Status",
        };
        var getRecords = recordOps.getAllRecords(config);
        getRecords.then(function (response) {
            var v_responsavelSelectOptions = []
            var recordArr = response.data;
            recordArr.forEach(function (data, inicio) {
                v_responsavelSelectOptions.push(
                    {
                        id: data.ID,
                        nome: data.Nome
                    }
                );
            });
            const codigoSelect = document.getElementById("statusSelect");
            v_responsavelSelectOptions.forEach((cod, cod2) => {
                var option = new Option(cod.nome);
                codigoSelect.options[codigoSelect.options.length] = option;
                $(option).val(cod.id)
            });
            $("option").attr("text-truncate");
        });
    });
}

// export function getSelectContatos() {
//     var creatorSdkPromise = ZOHO.CREATOR.init();
//     creatorSdkPromise.then(function (data) {
//         var recordOps = ZOHO.CREATOR.API;
//         var config = {
//             appName: "mobilize",
//             reportName: "widget_contatos_full",
//         };
//         var getRecords = recordOps.getAllRecords(config);
//         getRecords.then(function (response) {
//             var v_contatosSelectOptions = []
//             var recordArr = response.data;
//             console.log(recordArr, 'Contatos')
//             recordArr.forEach(function (data, inicio) {
//                 v_contatosSelectOptions.push(
//                     {
//                         id: data.ID,
//                         nome: data.Nome
//                     }
//                 );
//             });
//             const codigoSelect = document.getElementById("form_cliente_coordenadorCliente");
//             const editarCodClienteSelect = document.getElementById("editar_cliente_coordenadorCliente");
//             v_contatosSelectOptions.forEach((cod, cod2) => {
//                 var option = new Option(cod.nome);
//                 codigoSelect.options[codigoSelect.options.length] = option;
//                 $(option).val(cod.id)
//             });
//             v_contatosSelectOptions.forEach((cod, cod2) => {
//                 var option = new Option(cod.nome);
//                 editarCodClienteSelect.options[editarCodClienteSelect.options.length] = option;
//                 $(option).val(cod.id)
//             });
//         });
//     });
// }

// export function getSelectPropietario() {
//     var creatorSdkPromise = ZOHO.CREATOR.init();
//     creatorSdkPromise.then(function (data) {
//         var recordOps = ZOHO.CREATOR.API;
//         var config = {
//             appName: "mobilize",
//             reportName: "Propriet_rio_Report",
//         };
//         var getRecords = recordOps.getAllRecords(config);
//         getRecords.then(function (response) {
//             var v_contatosSelectOptions = []
//             var recordArr = response.data;
//             console.log(recordArr, 'Proprietario')
//             recordArr.forEach(function (data, inicio) {
//                 v_contatosSelectOptions.push(
//                     {
//                         id: data.ID,
//                         nome: data.Nome.display_value
//                     }
//                 );
//             });
//             const form_candidato_proprietario = document.getElementById("form_candidato_proprietario");
//             v_contatosSelectOptions.forEach((cod, cod2) => {
//                 var option = new Option(cod.nome);
//                 form_candidato_proprietario.options[form_candidato_proprietario.options.length] = option;
//                 $(option).val(cod.id)
//             });
//         });
//     });
// }


// export function getSelectUf(campo) {
//     var creatorSdkPromise = ZOHO.CREATOR.init();
//     creatorSdkPromise.then(function (data) {
//         var recordOps = ZOHO.CREATOR.API;
//         var config = {
//             appName: "mobilize",
//             reportName: "widget_estados_full",
//         };
//         var getRecords = recordOps.getAllRecords(config);
//         getRecords.then(function (response) {
//             var v_estadosSelectOptions = []
//             var recordArr = response.data;
//             console.log(recordArr, 'Estados');
//             recordArr.forEach(function (data, inicio) {
//                 v_estadosSelectOptions.push(
//                     {
//                         id: data.ID,
//                         nome: data.Sigla
//                     }
//                 );
//             });
//             const form_site_uf = document.getElementById(campo);
//             v_estadosSelectOptions.forEach((cod, cod2) => {
//                 var option = new Option(cod.nome);
//                 form_site_uf.options[form_site_uf.options.length] = option;
//                 $(option).val(cod.id)
//             });
//         });
//     });
// }

export function getSelectMunicipio(estadouf, pagina, campo) {
    var creatorSdkPromise = ZOHO.CREATOR.init();
    creatorSdkPromise.then(function (data) {
        var recordOps = ZOHO.CREATOR.API;
        var config = {
            appName: "mobilize",
            reportName: "widget_municipios_full",
            criteria: "(uf1.ID==" + estadouf + ")",
            page: pagina,
            pageSize: 200
        };
        var getRecords = recordOps.getAllRecords(config);
        getRecords.then(function (response) {
            var v_municipiosSelectOptions = []
            var recordArr = response.data;
            console.log(recordArr, 'Municipios');
            recordArr.forEach(function (data, inicio) {
                v_municipiosSelectOptions.push(
                    {
                        id: data.ID,
                        nome: data.name
                    }
                );
            });
            const form_site_municipio = document.getElementById(campo);
            v_municipiosSelectOptions.forEach((cod, cod2) => {
                var option = new Option(cod.nome);
                form_site_municipio.options[form_site_municipio.options.length] = option;
                $(option).val(cod.id)
            });
            if (v_municipiosSelectOptions.length >= 199) {
                getSelectMunicipio(estadouf, (pagina + 1), campo);
            }
        });
    });
}

// export function getEtapas(campo) {
//     var creatorSdkPromise = ZOHO.CREATOR.init();
//     creatorSdkPromise.then(function (data) {
//         var recordOps = ZOHO.CREATOR.API;
//         var config = {
//             appName: "mobilize",
//             reportName: "widget_etapas_full",
//         };
//         var getRecords = recordOps.getAllRecords(config);
//         getRecords.then(function (response) {
//             var v_etapasSelectOptions = []
//             var recordArr = response.data;
//             recordArr
//             .forEach((data) => {
//                 v_etapasSelectOptions.push (
//                       {
//                           id: data.ID,
//                           ordem: data.Ordem,
//                           nomeEtapa: data.Nome_da_Etapa
//                       }
//                 )
//             });
//             v_etapasSelectOptions
//             .sort()
//             .forEach((etapa) => {
//                 var etapasOptions = document.getElementById(campo);
//                 var option = document.createElement("option");
//                 option.value = etapa.id;
//                 option.text = etapa.ordem + " - " + etapa.nomeEtapa;
//                 etapasOptions.appendChild(option)
//             });

//         });
//     });
// }