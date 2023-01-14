
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