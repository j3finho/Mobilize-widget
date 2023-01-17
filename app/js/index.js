import getApizohoCandidatos from "./functions/getcandidatos.js";
import addTask from "./functions/forms/addAtividade.js";
import {
    getSelectSite,
    capturarDados,
    getSelectUf,
    getSelectMunicipio,
    getSelectResponsavel,
    getSelectTarefas,
    getSelectStatus,
    getSelectClientes,
    getSelectOperadoras,
    getSelectTipoSite,
    getSelectContatos,
    getSelectPropietario,
    getEtapas
} from "./functions/forms/getSelects.js";
import adicionaZero from "./functions/ultilitys.js";

function runSelects(){
    getSelectResponsavel();
    // getSelectUf('form_site_uf');
    // getSelectUf('form_editar_site_uf');
    getSelectSite();
    getSelectStatus();
    // getSelectTarefas();
    capturarDados();
    // getSelectClientes();
    // getSelectOperadoras();
    // getSelectTipoSite();
    // getSelectContatos();
    // getSelectPropietario();
    // getEtapas("editar_cliente_etapa");
    // getEtapas("form_cliente_etapa");
}

runSelects();

function escolhaRegional(id, local) {
    valor = $('#'+id+' option:selected').html();
    if(local == 1){
        if (valor == "AC" || valor == "AM" || valor == "RO" || valor == "RR" || valor == "PA" || valor == "TO" || valor == "AP" ) {
            $('#form_cliente_regional').val('Norte');
        } else if (valor == "MA" || valor == "PI" || valor == "CE" || valor == "RN" || valor == "PB" || valor == "PE" || valor == "AL" || valor == "SE" || valor == "BA") {
            $('#form_cliente_regional').val('Nordeste');
        }else if (valor == "MT" || valor == "MS" || valor == "GO" || valor == "DF") {
            $('#form_cliente_regional').val('Centro Oeste');
        }else if (valor == "MG" || valor == "ES" || valor == "SP" || valor == "RJ") {
            $('#form_cliente_regional').val('Sudeste');
        }else if (valor == "RS" || valor == "PR" || valor == "SC") {
            $('#form_cliente_regional').val('Sul');
        }else{
            $('#form_cliente_regional').val('');
        }
    }else if(local == 2){
        if (valor == "AC" || valor == "AM" || valor == "RO" || valor == "RR" || valor == "PA" || valor == "TO" || valor == "AP" ) {
            $('#editar_cliente_regional').val('Norte');
        } else if (valor == "MA" || valor == "PI" || valor == "CE" || valor == "RN" || valor == "PB" || valor == "PE" || valor == "AL" || valor == "SE" || valor == "BA") {
            $('#editar_cliente_regional').val('Nordeste');
        }else if (valor == "MT" || valor == "MS" || valor == "GO" || valor == "DF") {
            $('#editar_cliente_regional').val('Centro Oeste');
        }else if (valor == "MG" || valor == "ES" || valor == "SP" || valor == "RJ") {
            $('#editar_cliente_regional').val('Sudeste');
        }else if (valor == "RS" || valor == "PR" || valor == "SC") {
            $('#editar_cliente_regional').val('Sul');
        }else{
            $('#editar_cliente_regional').val('');
        }
    }else{
        $('#form_cliente_regional').val('');
        $('#editar_cliente_regional').val('');
    }
}

function escolhaEstado(local) {
    console.log('escolhaEstado: ' + local);
    if(local == 1){
        escolhaRegional('form_site_uf',1);
        var form_site_municipio = document.getElementById('form_site_municipio');
        var form_site_municipio_valor = $('#form_site_uf option:selected').val();
        console.log('Seleção estado',form_site_municipio_valor);
        var limparmunicipio = document.querySelectorAll('#form_site_municipio option');
        limparmunicipio.forEach(limparmunicipioreg => limparmunicipioreg.remove());
        form_site_municipio.appendChild(new Option("Selecione...",""));
        if(form_site_municipio_valor != ""){
            console.log('Seleção estado Dif 0',form_site_municipio_valor);
            getSelectMunicipio(form_site_municipio_valor, 1, 'form_site_municipio');
            console.log('Seleção estado Fim',form_site_municipio_valor);
        }
    }else if(local == 2){
        escolhaRegional('form_editar_site_uf',2);
        var form_site_municipio = document.getElementById('form_editar_site_municipio');
        var form_site_municipio_old = $('#form_editar_site_municipio option:selected').val();
        var form_site_municipio_valor = $('#form_editar_site_uf option:selected').val();
        console.log('Seleção estado',form_site_municipio_valor);
        var limparmunicipio = document.querySelectorAll('#form_editar_site_municipio option');
        limparmunicipio.forEach(limparmunicipioreg => limparmunicipioreg.remove());
        form_site_municipio.appendChild(new Option("Selecione...",""));
        if(form_site_municipio_valor != ""){
            console.log('Seleção estado Dif 0',form_site_municipio_valor);
            getSelectMunicipio(form_site_municipio_valor, 1, 'form_editar_site_municipio');
            console.log('Seleção estado Fim',form_site_municipio_valor);
        }
    } else {
        escolhaRegional(0,0);
        console.log('Seleção estado','www');
        var limparmunicipio1 = document.querySelectorAll('#form_editar_site_municipio option');
        limparmunicipio1.forEach(limparmunicipioreg => limparmunicipioreg.remove());
        form_site_municipio1.appendChild(new Option("Selecione...","0"));
        var limparmunicipio2 = document.querySelectorAll('#form_site_municipio option');
        limparmunicipio2.forEach(limparmunicipioreg => limparmunicipioreg.remove());
        form_site_municipio2.appendChild(new Option("Selecione...","0"));

    }
};

function calculoarea(){
    var v_largura_area_normal = $('#form_candidato_largura_area_normal').val();
    var v_profundidade_normal = $('#form_candidato_profundidade_normal').val();
    var v_corredor = $('#form_candidato_corredor').val();
    var v_profundidade = $('#form_candidato_profundidade').val();
    var v_area_locada = $('#form_candidato_largura_area').val();

    if(v_largura_area_normal != null ){
        v_largura_area_normal = v_largura_area_normal.replace(/[^0-9]/g,'');
        if(isNaN(v_largura_area_normal)){
            v_largura_area_normal = 0;
        }
    }else{
        v_largura_area_normal = 0;
    }
    if(v_profundidade_normal != null ){
        v_profundidade_normal = v_profundidade_normal.replace(/[^0-9]/g,'');
        if(isNaN(v_profundidade_normal)){
            v_profundidade_normal = 0;
        }
    }else{
        v_profundidade_normal = 0;
    }
    if(v_corredor == "Sim"){
        if(v_profundidade != null ){
            v_profundidade = v_profundidade.replace(/[^0-9]/g,'');
            if(isNaN(v_profundidade)){
                v_profundidade = 0;
            }
        }else{
            v_profundidade = 0;
        }
        if(v_area_locada != null ){
            v_area_locada = v_area_locada.replace(/[^0-9]/g,'');
            if(isNaN(v_area_locada)){
                v_area_locada = 0;
            }
        }else{
            v_area_locada = 0;
        }
    }else{
        v_profundidade = 0;
        v_area_locada = 0;
    }
    v_area_total = ((v_profundidade * v_area_locada) + (v_profundidade_normal * v_largura_area_normal));
    $('#form_candidato_area_locada').val(v_area_total);
}

const btnAddAtividade = document.getElementById('addtask');
btnAddAtividade.addEventListener('click', () => addTask());

// const btnAddSite = document.getElementById('addSite');
// btnAddSite.addEventListener('click', () => addSite());

const campoAddSiteEstado = document.getElementById('form_site_uf');
campoAddSiteEstado.addEventListener('change', () => escolhaEstado(1));

const campoEdtSiteEstado = document.getElementById('form_editar_site_uf');
campoEdtSiteEstado.addEventListener('change', () => escolhaEstado(2));


// Colocando a data de hoje
let dataDeHoje = new Date()
let dataFormatada = dataDeHoje.toISOString().slice(0,10)
document.querySelector('#form_cliente_dataAcionamento').setAttribute('value', dataFormatada)

// Selecionando campos de latitude e longitude
// let opcao = document.querySelector("#form_cliente_opcao").options[form_cliente_opcao.selectedIndex].value
/*
var latLongContent = '<div class="col-lg-6"><label class="col-form-label">Latitude <span class="text-danger">*</span></label><input id="form_cliente_latitude" maxlength="11" name="taskbudget" type="text"placeholder="Informe a Latitude" class="form-control"></div><div class="col-lg-6"><label class="col-form-label">Longitude <span class="text-danger">*</span></label><input id="form_cliente_longitude" maxlength="11" name="taskbudget" type="text" placeholder="Informe a Longitude" class="form-control"></div>'
var umtContent = '<div class="row"><div class="col-lg-6"><label class="col-form-label">Grau LAT<span class="text-danger">*</span></label><input id="form_cliente_grauLat" name="taskbudget" type="text" placeholder="Informe a Largura o Grau Latitudinal" class="form-control"></div><div class="col-lg-6"><label class="col-form-label">Grau LONG<span class="text-danger">*</span></label><input id="form_cliente_grauLong" name="taskbudget" type="text" placeholder="Informe o Grau Longitudinal" class="form-control"></div></div><div class="row"><div class="col-lg-6"><label class="col-form-label">Minuto LAT<span class="text-danger">*</span></label><input id="form_cliente_minLat" name="taskbudget" type="text" placeholder="Informe o  minuto Latitudinal" class="form-control"></div><div class="col-lg-6"><label class="col-form-label">Minut LONG <span class="text-danger">*</span></label><input id="form_cliente_minLong" name="taskbudget" type="text" placeholder="Informe o minuto Longitudinal" class="form-control"></div></div><div class="row"><div class="col-lg-6"><label class="col-form-label">Segundo LAT <span class="text-danger">*</span></label><input id="form_cliente_segLat" name="taskbudget" type="text" placeholder="Informe o segundo Longitudinal" class="form-control"></div><div class="col-lg-6"><label class="col-form-label">Segundo LONG<span class="text-danger">*</span></label><input id="form_cliente_segLong" name="taskbudget" type="text" placeholder="Informe o segundo Longitudinal" class="form-control"></div></div><div class="row"><div class="col-lg-6"><label class="col-form-label">Ponto Cardeal LAT<span class="text-danger">*</span></label><select class="form-select validate" id="form_cliente_pontoCardealLat" required><option value="" selected>Selecione..</option><option value="N">N</option><option value="S">S</option></select></div><div class="col-lg-6"><label class="col-form-label">PONTO Cardeal LONG<span class="text-danger">*</span></label><select class="form-select validate" id="form_cliente_pontoCardealLong" required><option value="" selected>Selecione..</option><option value="E">E</option><option value="W">W</option></select></div></div>'
let latLongElement = document.querySelector('#lat_long');
let utmElement = document.querySelector('#utm_element');



document.querySelector('#form_cliente_opcao').addEventListener('click', function(){
    let opcao = document.querySelector("#form_cliente_opcao").options[form_cliente_opcao.selectedIndex].value;

    if(opcao == 'UTM'){
        latLongElement.innerHTML = '';
        utmElement.innerHTML = umtContent;
        document.getElementById("form_cliente_latitude").disabled = true;
    } else {
        if(opcao == 'Decimal'){
            latLongElement.innerHTML = latLongContent;
            utmElement.innerHTML = '';
        }
    }
})*/
