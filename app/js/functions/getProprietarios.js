
/*
$(document).ready(function () {
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
});
*/


getProprietarios()

function getProprietarios() {
    const proprietariosField = document.getElementById('form_candidato_proprietario')

    var config = {
        appName: "mobilize",
        reportName: "Widget_Proprietario"
    }

    ZOHO.CREATOR.init().then((data) => {
        ZOHO.CREATOR.API.getAllRecords(config).then((response) => {
            if(response.code != 3000) {
                console.log("Não foi possível carregar os proprietários - Erro: " + response.code);
                return
            }

            response.data.forEach((proprietario, inicio) => {
            //console.log("nome dos proprietarios " + proprietario.Nome);
                const nome = proprietario.Nome
                if(nome != '') {
                    var option = new Option(nome, proprietario.ID)
                    proprietariosField.add(option)
                }
            })
            console.log("Adicionado a lista os proprietários");
        })
    })
}