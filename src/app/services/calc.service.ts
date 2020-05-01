import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from "jquery";

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  pre_c : any;
	pre_v: any;
  list_changemoney;

  constructor(public http: HttpClient) { }

  calculadora(pre_c?,pre_v?){
    $(function(){ 
      $('#btnCambiar').addClass('fisico');
      $('#campoArriba').val(100);
      evaluarQueEstado(true);

      function evaluarQueEstado(queLado) {
        if ($('#btnCambiar').hasClass('fisico')) { //Arriba estan las monedas fisicas
          calculoArriba(queLado);
        //  $('#change_hidden')
        } else { //monedas digitales
          calculoAbajo(queLado);
        }
      }
  
      function calculoArriba(queLado){
        var cantidad = 0, respu = 0, precioMonedaCompra=0, precioMonedaVenta=0;
        if ($.isNumeric($('#campoArriba').val())) {
          cantidad = parseFloat((<HTMLInputElement>document.getElementById("campoArriba")).value);
        }
  
          precioMonedaCompra = pre_c;
          precioMonedaVenta = pre_v;

        if (queLado) {
          cantidad = Number($('#campoArriba').val());
          respu = parseFloat(String(cantidad / precioMonedaVenta));
          
          if ($('#selectCriptoMonedas').val() == 'dolares') {
            $('#campoAbajo').val(parseFloat(String(respu)).toFixed(2));
          } else {
            $('#campoAbajo').val(parseFloat(String(respu)).toFixed(6));
          }
  
        } else {
          cantidad = Number($('#campoAbajo').val());
          respu = parseFloat(String(cantidad * precioMonedaVenta));
          if ($('#selectCriptoMonedas').val() == 'dolares') {
            $('#campoArriba').val(parseFloat(String(respu)).toFixed(2));
          } else {
            $('#campoArriba').val(parseFloat(String(respu)).toFixed(2));
          }
        }
  
        $('#spanMonedaLtr').text(String($('#selectCriptoMonedas').val()));
        $('#spanPrecioVentaPub').text('S/. ' + parseFloat(String(precioMonedaVenta)).toFixed(3));
        $('#spanPrecioCompraPub').text('S/. ' + parseFloat(String(precioMonedaCompra)).toFixed(3));
        $('#spanTipCambio').text(parseFloat(String(precioMonedaVenta)).toFixed(3));
  
      }
  
      function calculoAbajo(queLado) {
      var cantidad=0, respu=0, precioMonedaCompra=0, precioMonedaVenta=0;

      if( $.isNumeric($('#campoArriba').val()) ){cantidad=parseFloat(String($('#campoArriba').val()));}

        precioMonedaCompra = pre_c;
        precioMonedaVenta = pre_v;
        
      if(queLado){
        cantidad= Number($('#campoArriba').val());
        if( $('#selectCriptoMonedas').val()=='dolares' ){
          respu=parseFloat(String(cantidad*precioMonedaCompra));
        }else{
          respu=parseFloat(String(precioMonedaCompra*cantidad));
        }
  
        $('#campoAbajo').val(parseFloat(String(respu)).toFixed(2));
      }else{
        cantidad= Number($('#campoAbajo').val());
        if( $('#selectCriptoMonedas').val()=='dolares' ){
          respu=parseFloat(String(cantidad/precioMonedaCompra));
          $('#campoArriba').val(parseFloat(String(respu)).toFixed(2));
        }else{
          respu=parseFloat(String(cantidad/precioMonedaCompra));
          $('#campoArriba').val(parseFloat(String(respu)).toFixed(6));
        }
  
      }
      $('#spanMonedaLtr').text(String($('#selectCriptoMonedas').val()));
      $('#spanPrecioVentaPub').text('S/. '+ parseFloat(String(precioMonedaVenta)).toFixed(3));
      $('#spanPrecioCompraPub').text('S/. '+ parseFloat(String(precioMonedaCompra)).toFixed(3));
      $('#spanTipCambio').text(parseFloat(String(precioMonedaCompra)).toFixed(3));

    }

      $('#campoArriba').keyup(function(e) {
        var code = e.keyCode || e.which;
        if (String(code) != '9') {
          evaluarQueEstado(true);
        }
      });
      $('#campoAbajo').keyup(function(e) {
        var code = e.keyCode || e.which;
        if (String(code) != '9') {
          evaluarQueEstado(false);
        }
      });
  
      
  
    $(document).off('click', '#btnCambiar');
    $(document).on('click', '#btnCambiar', function () {
        var estadoAnt = $('#selectCriptoMonedas').val();
        $('#btnCambiar').toggleClass('fisico');
        var divArriba= $('#divTop').html();
        var divAbajo= $('#divBottom').html();
        $('#divTop').empty().html(divAbajo);
        $('#divBottom').empty().html(divArriba);
        $('#selectCriptoMonedas').val(estadoAnt);
        $('#divTop #selectMonedas').css("background-color", "#1b4142");
        $('#divTop #selectCriptoMonedas').css("background-color", "#1b4142");
        $('#divBottom #selectMonedas').css("background-color", "#415b5c");
        $('#divBottom #selectCriptoMonedas').css("background-color", "#415b5c");
    
        evaluarQueEstado(true);
      });
      $('.contenedorLabels').on('change', '#selectCriptoMonedas', function () {
        evaluarQueEstado(true);
      });
      
      $("#campoArriba,#campoAbajo").keypress(function(event) {
        var expresion = /[\d.]+/;
        return expresion.test(String.fromCharCode(event.keyCode));
      });	
    });  
  }

  all_changemoney(){
		this.http.get("https://cambista.com/api-rest/js/calc.json").subscribe(data=>{
    this.list_changemoney = data;
    this.calculadora(this.list_changemoney['site'].pre_c,this.list_changemoney['site'].pre_v);
		});
		} 
}
