
function getApizohoUsuarios() {
    var creatorSdkPromise = ZOHO.CREATOR.init();
    creatorSdkPromise.then(function (data) {
        var recordOps = ZOHO.CREATOR.API;
        // var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();

        var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
        userEmail = queryParams.email;
        dadosUrl = queryParams.infoUrl;
        $('#dadosurlzoho').val(dadosUrl);
        $('#useremailzoho').val(userEmail);

        var userEmail = queryParams.email;
        var config = {
            appName: "mobilize",
            reportName: "widget_responsaveis_full",
        }
        var getRecords = recordOps.getAllRecords(config);
        getRecords.then(function (response) {
            var recordArr = response.data;
            var v_usuarios = [];
            recordArr.forEach(function (data, inicio) {
                if (userEmail == data.Email) {
                    $('#logado_usuario_id').val(data.ID);
                    $('#logado_usuario').html(data.Nome.display_value);
                    $('#logado_funcao').html(data.Funcao);
                }
                v_usuarios.push(
                    {
                        id: data.ID,
                        codigo: data.Codigo,
                        nome: data.Nome.display_value,
                        email: data.Email,
                        telefone: data.Telefone,
                        funcao: data.Funcao,
                        ativo: data.Ativo
                    }
                );
            });
        });
    });
}

$(document).ready(function () {
    getApizohoUsuarios();
});
