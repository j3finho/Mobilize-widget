import adicionaZero, { mostrarErro } from "../ultilitys.js";

function addCandidato() {
    ZOHO.CREATOR.init()
        .then(function (data) {
            //var form_candidato_status = document.getElementById("form_candidato_status");
            //var form_candidato_statusValue = form_candidato_status.options[form_candidato_status.selectedIndex].value;

            var form_candidato_sigla = document.getElementById("form_candidato_sigla").value;

            var form_candidato_site = document.getElementById("form_candidato_site");
            var form_candidato_siteValue = form_candidato_site.options[form_candidato_site.selectedIndex].value;

            var form_candidato_tipo_site = document.getElementById("form_candidato_tipo_site");
            var form_candidato_tipo_siteValue = form_candidato_tipo_site.options[form_candidato_tipo_site.selectedIndex].value;

            var form_candidato_aluguel = document.getElementById("form_candidato_aluguel").value;

            var form_candidato_proprietario = document.getElementById("form_candidato_proprietario");
            var form_candidato_proprietarioValue = form_candidato_proprietario.options[form_candidato_proprietario.selectedIndex].value;

            var form_candidato_corredor = document.getElementById("form_candidato_corredor");
            var form_candidato_corredorValue = form_candidato_corredor.options[form_candidato_corredor.selectedIndex].value;

            var form_candidato_pontoCardealLat = document.getElementById("form_candidato_pontoCardealLat");
            var form_candidato_pontoCardealLatValue = form_candidato_pontoCardealLat.options[form_candidato_pontoCardealLat.selectedIndex].value;

            var form_candidato_pontoCardealLong = document.getElementById("form_candidato_pontoCardealLong");
            var form_candidato_pontoCardealLongValue = form_candidato_pontoCardealLong.options[form_candidato_pontoCardealLong.selectedIndex].value;

            var form = document.querySelector('#form_candidato');
            var tipoDeNegociacao = form.form_tipo_propriedade.value
            var tipoDeOpcao = form.form_tipo_opcao.value
            var anelBusca = form.anelBusca.value
            var usoProposto = form.usoProposto.value
            var legislacaoLocal = form.legislacaoLocal.value
            var documentacao = form.documentacao.value
            var acesso = form.acesso.value
            var energia = form.energia.value
            var obstrucao = form.obstrucao.value

            var anelBuscajustificativa = document.getElementById("form_candidato_candidatolocalizado").value
            var usoPropostojustificativa = document.getElementById("form_candidato_proprietariointeressado").value
            var legislacaoLocaljustificativa = document.getElementById("form_candidato_arealocadaatende").value
            var documentacaojustificativa = document.getElementById("form_candidato_justifique_documentacaonecessaria").value
            var acessojustificativa = document.getElementById("form_candidato_justifique_acessodisponivel").value
            var energiajustificativa = document.getElementById("form_candidato_justifique_energiadisponivel").value
            var obstrucaojustificativa = document.getElementById("form_candidato_justifique_obstrucao").value

          //  var form_candidato_cuos = document.getElementById("form_candidato_cuos");
          //  var form_candidato_cuosValue = form_candidato_cuos.options[form_candidato_cuos.selectedIndex].value;
            var form_candidato_endereco = document.getElementById("form_candidato_endereco").value;
            var form_candidato_complemento = document.getElementById("form_candidato_complemento").value;
            var form_candidato_cep = document.getElementById("form_candidato_cep").value;
            var form_candidato_numero = document.getElementById("form_candidato_numero").value;
            var form_candidato_bairro = document.getElementById("form_candidato_bairro").value;
            var form_candidato_distancia_pn = document.getElementById("form_candidato_distancia_pn").value;
            var form_candidato_pre_comar = document.getElementById("form_candidato_pre_comar").value;
            var form_candidato_profundidade = document.getElementById("form_candidato_profundidade").value;
            var form_candidato_area_locada = document.getElementById("form_candidato_area_locada").value;
            var form_candidato_largura_area = document.getElementById("form_candidato_largura_area").value;
            var form_candidato_latitude = document.getElementById("form_candidato_latitude").value.replace(',', '.');
            var form_candidato_longitude = document.getElementById("form_candidato_longitude").value.replace(',', '.');
            var form_candidato_grauLat = document.getElementById("form_candidato_grauLat").value;
            var form_candidato_grauLong = document.getElementById("form_candidato_grauLong").value;
            var form_candidato_minutoLat = document.getElementById("form_candidato_minutoLat").value;
            var form_candidato_minutLong = document.getElementById("form_candidato_minutLong").value;
            var form_candidato_segundoLat = document.getElementById("form_candidato_segundoLat").value;
            var form_candidato_segundoLong = document.getElementById("form_candidato_segundoLong").value;
            var form_candidato_observacao = document.getElementById("form_candidato_observacao").value;
            var form_candidato_altitude = document.getElementById("form_candidato_altitude").value;
            var form_candidato_profundidadenormal = document.getElementById("form_candidato_profundidade_normal").value;
            var form_candidato_larguratotal = document.getElementById("form_candidato_largura_area_normal").value;
            var form_candidato_aluguel2 = form_candidato_aluguel.replace('R$', '')
            var valorFinal1 = form_candidato_aluguel2.replaceAll('.', '')
            var valorFinal2 = valorFinal1.replace(',', '.').trim();


            if(form_candidato_sigla == "") {
                mostrarErro("form_candidato_sigla", "Sigla do candidato não informada");
                return
            }
            var opcaoSite = form_candidato_site.options[form_candidato_site.selectedIndex].text;
            if(opcaoSite == "Selecione..") {
                mostrarErro("form_candidato_site", "Site não selecionado");
                return
            }
            var opcaoTipoSite = form_candidato_tipo_site.options[form_candidato_tipo_site.selectedIndex].text;
            if(opcaoTipoSite == "Selecione..") {
                mostrarErro("form_candidato_tipo_site", "Tipo de site não selecionado");
                return
            }
            if(form_candidato_aluguel == "") {
                mostrarErro("form_candidato_aluguel", "Valor do Aluguel não informado");
                return
            }
            if(tipoDeNegociacao == "") {
                mostrarErro("tipo_propriedade", "Tipo de propriedade não informada");
                return
            }
            /*
            var opcaoCuos = form_candidato_cuos.options[form_candidato_cuos.selectedIndex].text;
            if(opcaoCuos == "Selecione..") {
                mostrarErro("form_candidato_cuos", "CUOS não selecionada");
                return
            }
            */
            var opcaoProprietario = form_candidato_proprietario.options[form_candidato_proprietario.selectedIndex].text;
            if(opcaoProprietario == "Selecione..") {
                mostrarErro("form_candidato_proprietario", "Proprietário não selecionado");
                return 
            }
            //var opcaoStatusQualificacao = form_candidato_status.options[form_candidato_status.selectedIndex].text;
            //if(opcaoStatusQualificacao == "Selecione..") {
             //   mostrarErro("form_candidato_status", "Status do Candidato não selecionado");
              //  return 
            //}
            if(form_candidato_cep == "") {
                mostrarErro("form_candidato_cep", "CEP não informado");
                return 
            }
            // if(form_candidato_endereco == "") {
            //     mostrarErro("form_candidato_endereco", "Endereço não informado");
            //     return 
            // }
            // if(form_candidato_complemento == "") {
            //     mostrarErro("form_candidato_complemento", "Complemento não informado");
            //     return 
            // }
            // if(form_candidato_bairro == "") {
            //     mostrarErro("form_candidato_bairro", "Bairro não informado");
            //     return 
            // }
            if(form_candidato_distancia_pn == "") {
                mostrarErro("form_candidato_distancia_pn", "Distância PN não informado");
                return 
            }
            if(form_candidato_pre_comar == "") {
                mostrarErro("form_candidato_pre_comar", "Pré-Comar não informado");
                return 
            }
            if(form_candidato_larguratotal == "") {
                mostrarErro("form_candidato_largura_area_normal", "Área locada não informado");
                return 
            }
            if(form_candidato_profundidadenormal == "") {
                mostrarErro("form_candidato_profundidade_normal", "Profundidade da Área locada não informado");
                return 
            }
            var corredorAcesso = document.getElementById("form_candidato_corredor");
            var corredorAcessoValor = corredorAcesso.options[corredorAcesso.selectedIndex].text;
            if(corredorAcessoValor == "Selecione..") {
                mostrarErro("form_candidato_corredor", "Corredor de acesso não selecionado");
                return 
            }
            var opcaoPontoNominal = document.getElementById("form_tipo_opcao");
            var opcaoPontoNominalValor = opcaoPontoNominal.options[opcaoPontoNominal.selectedIndex].text;
            if(opcaoPontoNominalValor == "Selecione..") {
                mostrarErro("form_tipo_opcao", "Tipo de ponto cardinal não selecionado");
                return 
            }
            if(form_candidato_altitude == "") {
                mostrarErro("form_candidato_altitude", "Altitude não informada");
                return 
            }
            if(opcaoPontoNominalValor == "Decimal") {
                if(form_candidato_latitude == "") {
                  mostrarErro("form_candidato_latitude", "Latitude não informada")
                  return
                } else if(form_candidato_longitude == "") {
                  mostrarErro("form_candidato_longitude", "Longitude não informada")
                  return
                }
              }
              if(opcaoPontoNominalValor == "UTM") {
                var pontoCardealLAT = form_candidato_pontoCardealLat.options[form_candidato_pontoCardealLat.selectedIndex].text
                var pontoCardealLONG = form_candidato_pontoCardealLong.options[form_candidato_pontoCardealLong.selectedIndex].text
                var grauLat = document.getElementById("form_candidato_grauLat").value
                var grauLong = document.getElementById("form_candidato_grauLong").value
                var minLat = document.getElementById("form_candidato_minutoLat").value
                var minLong = document.getElementById("form_candidato_minutLong").value
                var segLat = document.getElementById("form_candidato_segundoLat").value
                var segLong = document.getElementById("form_candidato_segundoLong").value
          
                if(grauLat == "") {
                  mostrarErro("form_candidato_grauLat", "Grau LAT não informada")
                  return
                }
                else if(minLat == "") {
                  mostrarErro("form_candidato_minutoLat", "Minuto LAT não informada")
                  return
                }
                else if(segLat == "") {
                  mostrarErro("form_candidato_segundoLat", "Segundos LAT não informada")
                  return
                }
                else if(pontoCardealLAT == "Selecione..") {
                  mostrarErro("form_candidato_pontoCardealLat", "Ponto Cardeal LAT não selecionada")
                  return
                }
                else if(grauLong == "") {
                  mostrarErro("form_candidato_grauLong", "Grau LONG não informada")
                  return
                }
                else if(minLong == "") {
                  mostrarErro("form_candidato_minutLong", "Minuto LONG não informada")
                  return
                }
                else if(segLong == "") {
                  mostrarErro("form_candidato_segundoLong", "Segundos LONG não informada")
                  return
                }
                else if(pontoCardealLONG == "Selecione..") {
                  mostrarErro("form_candidato_pontoCardealLong", "Ponto Cardeal LONG não selecionada")
                  return
                }
              }
            if(anelBusca == "") {
                mostrarErro("", "Questão Anel de Busca não respondida");
                return 
            }
            if(anelBuscajustificativa == "" && anelBusca == "Não") {
                mostrarErro("", "Justificativa Anel de Busca não informada");
                return 
            }
            if(usoProposto == "") {
                mostrarErro("", "Questão Uso Proposto não respondida");
                return 
            }
            if(usoPropostojustificativa == "" && usoProposto == "Não") {
                mostrarErro("", "Justificativa Uso Proposto não informada");
                return 
            }
            if(legislacaoLocal == "") {
                mostrarErro("", "Questão Legislação Local não respondida");
                return 
            }
            if(legislacaoLocaljustificativa == "" && legislacaoLocal == "Não") {
                mostrarErro("", "Justificativa Legislação Local não respondida");
                return 
            }
            if(documentacao == "") {
                mostrarErro("", "Questão Documentação não respondida");
                return 
            }
            if(documentacaojustificativa == "" && documentacao == "Não") {
                mostrarErro("", "Justificativa Documentação Local não respondida");
                return 
            }
            if(acesso == "") {
                mostrarErro("", "Questão Acesso não respondida");
                return 
            }
            if(acessojustificativa == "" && acesso == "Não") {
                mostrarErro("", "Justificativa Acesso não respondida");
                return 
            }
            if(energia == "") {
                mostrarErro("", "Questão Energia não respondida");
                return 
            }
            if(energiajustificativa == "" && energia == "Não") {
                mostrarErro("", "Justificativa Energia não respondida");
                return 
            }
            if(obstrucao == "") {
                mostrarErro("", "Questão Obstrução não respondida");
                return 
            }
            if(obstrucaojustificativa == "" && obstrucao == "Sim") {
                mostrarErro("", "Justificativa Obstrução não respondida");
                return 
            }
            if(form_candidato_observacao == "") {
                mostrarErro("form_candidato_observacao", "Observação não respondida");
                return 
            }

            var formData = {
                "data": {
                    'Site': form_candidato_siteValue,
                    'Sigla_do_Candidato': form_candidato_sigla,
                    'Proprietario': form_candidato_proprietarioValue,
                    'Tipo_Site': form_candidato_tipo_siteValue,
                    'Valor_do_Aluguel': valorFinal2,
                    'Tipo_de_Negocia_o': tipoDeNegociacao,
                    'Endereco': form_candidato_endereco,
                    "Endere_o": form_candidato_numero,
                    'Complemento': form_candidato_complemento,
                    'Largura_area':form_candidato_larguratotal,
                    'Profundidade_area':form_candidato_profundidadenormal,
                    'CEP': form_candidato_cep,
                    'Bairro': form_candidato_bairro,
                    'Distancia_PN': form_candidato_distancia_pn,
                    'Profundidade_Area_Locada': form_candidato_profundidade,
                    'Pre_Comar_m': form_candidato_pre_comar,
                    'Distancia_PN': form_candidato_distancia_pn,
                    'Largura_Area_Locada': form_candidato_largura_area,
                    'Area_Locada_m': form_candidato_area_locada,
                    'Corredor_de_Acesso': form_candidato_corredorValue,
                    'Opcao': tipoDeOpcao,
                    'Latitude': form_candidato_latitude,
                    'Longitude': form_candidato_longitude,
                    'GrauLAT': form_candidato_grauLat,
                    'GrauLONG': form_candidato_grauLong,
                    'MinutoLAT': form_candidato_minutoLat,
                    'MinutoLONG': form_candidato_minutLong,
                    'SegundoLAT': form_candidato_segundoLat,
                    'SegundoLONG': form_candidato_segundoLong,
                    'Ponto_Cardeal_LAT': form_candidato_pontoCardealLatValue,
                    'PontoCardealLONG': form_candidato_pontoCardealLongValue,
                    'Altitude': form_candidato_altitude,
                    'anelBusca': anelBusca,
                    'usoProposto': usoProposto,
                    'legislacaoLocal': legislacaoLocal,
                    'documentacao': documentacao,
                    'acesso': acesso,
                    'energia': energia,
                    'obstrucao': obstrucao,
                    'Coment_rios': form_candidato_observacao,
                    'Justificativa_Existe_energia_dispon_vel_no_site': energiajustificativa,
                    'Justificativa_A_documenta_o_necess_ria_est_dispon_vel': documentacaojustificativa,
                    'Justificativa_O_propriet_rio_est_interessado_no_uso_proposto': usoPropostojustificativa,
                    'Justificativa_Existe_alguma_obstru_o_ou_interfer_ncia_vis_vel': obstrucaojustificativa,
                    'Justificativa_O_acesso_ao_site_est_dispon_vel_24horas_dia_7dias_semana' : acessojustificativa,
                    'Justificativa_A_rea_locada_atende_os_requisitos_m_nimos_exigidos_pela_legisla_o_local': legislacaoLocaljustificativa,
                    'Justificativa_O_candidato_est_localizado_dentro_do_anel_de_busca': anelBuscajustificativa,
                }
            }
            var config = {
                appName: "mobilize",
                formName: "Candidato",
                data: formData
            }
            ZOHO.CREATOR.API.addRecord(config).then(function (responseCandidato) {
                if (responseCandidato.code == 3000) {
                    const candidatoID = responseCandidato.data.ID;
                    var fileObject = document.getElementById("form_candidato_anexo").files[0];
                    if(fileObject != null) {
                        const configAnexo = {
                            appName : "mobilize",
                            formName : "Anexos",
                            data: {
                                "data": {
                                    "Site": form_candidato_siteValue,
                                    "Candidato": candidatoID,
                                    "Tipo_do_Anexo": "SARF",
                                    "Descricao": "",
                                    'usuario' : 'samyr@mobilize-eng.com.br'
                                }
                            }
                        }
                        ZOHO.CREATOR.API.addRecord(configAnexo).then((responseAnexo) => {
                            if(responseAnexo.code == 3000) {
                                var anexoID = responseAnexo.data.ID
                                var fileObject = document.getElementById("form_candidato_anexo").files[0];
                                var configPdf = { 
                                    appName : "mobilize",
                                    reportName : "Anexos_Report", 
                                    id : anexoID,
                                    fieldName : "Anexos",
                                    file : fileObject
                                 }
                                ZOHO.CREATOR.API.uploadFile(configPdf).then((response) => {
                                    if(response.code == 3000) {
                                        swal({
                                            title: "Candidato adicionado com sucesso!",
                                            type: "success",
                                            showConfirmButton: false
                                        });
                                        setTimeout(() => { document.location.reload(true) }, 1000)
                                    }
                                })
                            }
                        })
                    } else {
                        swal({
                            title: "Candidato adicionado com sucesso!",
                            type: "success",
                            showConfirmButton: false
                        });
                        setTimeout(() => { document.location.reload(true) }, 1000)
                    }
                } else {
                    var v_erro = "";
                    $.each(responseCandidato.error, function(key,val) {             
                        v_erro = v_erro + val + ". ";
                    });
                    swal({
                        title: "Atualize a Pagina e tente novamente! ("+v_erro+")",
                        type: "error",
                        showConfirmButton: true
                    });
                }
            });
            
        });
}

$(document).ready(function () {
    $("#form_candidato_cep").focusout(function () {
        var valornovo = $(this).val();
        var valorantigo = $('#form_candidato_cep_antigo').val();
        if (valornovo != valorantigo && valornovo.length > 7) {
            $.ajax({
                url: 'https://viacep.com.br/ws/' + $(this).val() + '/json/',
                dataType: 'json',
                success: function (resposta) {
                    $('#form_candidato_cep_antigo').val(valornovo);
                    $("#form_candidato_endereco").val(resposta.logradouro);
                    $("#form_candidato_bairro").val(resposta.bairro);
                    $("#form_candidato_municipio").val(resposta.localidade);
                    $("#form_candidato_uf").val(resposta.uf);
                }
            });
        }
    });
    $("#form_proprietario_cep").focusout(function () {
        var valornovo = $(this).val();
        var valorantigo = $('#form_proprietario_cep_antigo').val();
        if (valornovo != valorantigo && valornovo.length > 7) {
            $.ajax({
                url: 'https://viacep.com.br/ws/' + $(this).val() + '/json/',
                dataType: 'json',
                success: function (resposta) {
                    $('#form_proprietario_cep_antigo').val(valornovo);
                    $("#form_proprietario_endereco").val(resposta.logradouro);
                    $("#form_proprietario_bairro").val(resposta.bairro);
                    $("#form_proprietario_municipio").val(resposta.localidade);
                    $("#form_proprietario_uf").val(resposta.uf);
                }
            });
        }
    });
    $("#form_contato_cep").focusout(function () {
        var valornovo = $(this).val();
        var valorantigo = $('#form_contato_cep_antigo').val();
        if (valornovo != valorantigo && valornovo.length > 7) {
            $.ajax({
                url: 'https://viacep.com.br/ws/' + $(this).val() + '/json/',
                dataType: 'json',
                success: function (resposta) {
                    $('#form_contato_cep_antigo').val(valornovo);
                    $("#form_contato_endereco").val(resposta.logradouro);
                    $("#form_contato_bairro").val(resposta.bairro);
                    $("#form_contato_municipio").val(resposta.localidade);
                    $("#form_contato_uf").val(resposta.uf);
                }
            });
        }
    });
});

export function adicionarProprietario() {
    console.log("Tentando adicionar o proprietário")
    ZOHO.CREATOR.init().then(function (data) {
        const siglaCandidato = document.getElementById("form_candidato_sigla").value;
        const nome = document.getElementById("form_proprietario_nome").value
        const cpfCNPJ = document.getElementById("form_proprietario_cpf_cnpj").value
        const razaoSocial = document.getElementById("form_proprietario_razao_social").value
        const email = document.getElementById("form_proprietario_email").value
        const telefone = document.getElementById("form_proprietario_telefone").value
        const cep = document.getElementById("form_proprietario_cep").value
        const endereco = document.getElementById("form_proprietario_endereco").value
        const numero = document.getElementById("form_proprietario_numero").value
        const complemento = document.getElementById("form_proprietario_complemento").value
        const bairro = document.getElementById("form_proprietario_bairro").value
        const mucinicipio = document.getElementById("form_proprietario_municipio").value
        const uf = document.getElementById("form_proprietario_uf").value
    
        const emailValid = validateEmail(email)

        if(nome == "") {
            mostrarErro("form_responsavel_nome", "O Nome não pode ficar em branco.")
            return
        } 
        else if(cpfCNPJ.length != 18 && cpfCNPJ.length != 14) {
            mostrarErro("form_proprietario_cpf_cnpj", "CPF/CNPJ inválido.")
            return
        }
        else if(cpfCNPJ.length == 18 && razaoSocial == '') {
            mostrarErro("form_proprietario_razao_social", "Razao social inválida.")
            return
        }
        else if(!emailValid) {
            mostrarErro("form_responsavel_email", "E-mail inválido.")
            return
        } 
        else if(telefone.length < 11) {
            mostrarErro("form_responsavel_telefone", "Telefone inválido.")
            return
        }
        else if(cep.length == 0) {
            mostrarErro("form_proprietario_cep", "CEP inválido.")
            return
        }
        else if(endereco.length == 0) {
            mostrarErro("form_proprietario_endereco", "Endereco inválido.")
            return
        }
        else if(numero.length == 0) {
            mostrarErro("form_proprietario_numero", "Numero inválido.")
            return
        }
        else if(complemento.length == 0) {
            mostrarErro("form_proprietario_complemento", "Complemento inválido.")
            return
        }
        else if(bairro.length == 0) {
            mostrarErro("form_proprietario_bairro", "Bairro inválido.")
            return
        }

        var configProprietario = {
            appName: "mobilize",
            formName: "Propriet_rio",
            data: {
                "data": {
                    "Nome": {
                        "first_name1": nome
                    }, 
                    "CPF_CNPJ": cpfCNPJ,
                    "Razao_Social": razaoSocial,
                    "CEP": cep,
                    "Endereco": endereco,
                    "Numero": numero,
                    "Bairro": bairro,
                    "Complemento": complemento,
                    "UF": uf,
                    "Municipio": mucinicipio,
                    "Email": email, 
                    "Phone_Number": telefone,
                    "Sigla_do_Candidato": siglaCandidato
                }
            }
        }

        ZOHO.CREATOR.API.addRecord(configProprietario).then((response) => {
            if(response.code == 3001) {
                $.each(responseCandidato.error, function(key,val) {             
                    v_erro = v_erro + val + ". ";
                });
                swal({
                    title: "Erro ao cadastrar proprietario. Tente mais tarde! ("+v_erro+")",
                    type: "error",
                    showConfirmButton: true
                });
                return
            }
            var proprietarios = document.getElementById("form_candidato_proprietario")
            var option = document.createElement("option")
            option.value = response.data.ID
            option.text = nome
            proprietarios.add(option)

            swal({
                title: "Proprietario adicionado com sucesso!",
                type: "success",
                showConfirmButton: true
            });
            $("#modalAdicionarProprietario").modal('hide')
            $("#modalAdicionarCandidato").css('z-index', '');
        })
    });
}

export function addContato() {
    ZOHO.CREATOR.init()
    .then(function (data) {
        const proprietarios = document.getElementById('form_candidato_proprietario')
        const proprietarioSelecionado = proprietarios.options[proprietarios.selectedIndex].value;

        const nome = document.getElementById("form_contato_nome").value
        const email = document.getElementById("form_contato_email").value
        const telefone = document.getElementById("form_contato_telefone").value.replace(/\D/g, '')

        const cep = document.getElementById("form_contato_cep").value
        const endereco = document.getElementById("form_contato_endereco").value
        const numero = document.getElementById("form_contato_numero").value
        const complemento = document.getElementById("form_contato_complemento").value
        const bairro = document.getElementById("form_contato_bairro").value
        const municipio = document.getElementById("form_contato_municipio").value
        const uf = document.getElementById("form_contato_uf").value

        var emailValid = validateEmail(email)

        if(nome == "") {
            mostrarErro("form_responsavel_nome", "O Nome não pode ficar em branco.")
            return
        } else if(!emailValid) {
            mostrarErro("form_responsavel_email", "E-mail inválido.")
            return
        } else if(telefone.length < 10) {
            mostrarErro("form_responsavel_telefone", "Telefone inválido.")
            return
        } else if(cep.length == 0) {
            mostrarErro("form_contato_cep", "CEP inválido.")
            return
        }
    
        var configContato = {
            appName: "mobilize",
            formName: "Contato_Cliente",
            data: {
                "data": {
                    "Proprietario": proprietarioSelecionado,
                    "Nome": nome, 
                    "Telefone": telefone,
                    "E_mail": email,
                    "Address": {
                        "address_line_1": endereco + " " + numero,
                        "address_line_2": complemento,
                        "district_city" : bairro,
                        "state_province" : municipio,
                        "postal_code" : uf,
                        "country" : cep
                    }
                }
            }
        }
    
        ZOHO.CREATOR.API.addRecord(configContato).then((response) => {
            if(response.code == 3001) {
                $.each(response.error, function(key,val) {             
                    v_erro = v_erro + val + ". ";
                });
                swal({
                    title: "Erro ao cadastrar o contato. Tente mais tarde! ("+v_erro+")",
                    type: "error",
                    showConfirmButton: true
                });
                return
            }
            var contatos = document.getElementById("form_candidato_contato")
            var option = document.createElement("option")
            option.value = response.data.ID
            option.text = nome
            contatos.add(option)
    
            swal({
                title: "Contato adicionado com sucesso!",
                type: "success",
                showConfirmButton: true
            });
            $("#modalAdicionarContato").modal('hide')
            $("#modalAdicionarCandidato").css('z-index', '');
        })
    })
}

export default addCandidato;