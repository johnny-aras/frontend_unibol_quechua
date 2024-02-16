<template :key="keycon">
  <!-- <div class="container-fluid text-center"> -->
  <div class="container-fluid" id="contenido-global">
  <div class="row">
    <div class="mb-3 fw-bold">       

            <div class="mb-3 fs-4 text-center">                 
             LISTA DE ESTUDIANTES HABILITADOS PARA LA INSCRIPCION:
            </div>

            <!-- <div class=" mb-3">                 
              APELLIDOS Y NOMBRES:    {{`${apellidoP} ${apellidoM} ${nombres}`}}
            </div>
            
            <div class=" mb-3">                 
              CEDULA DE IDENTIDAD:     {{`${ci_estudiante}`}}
            </div>

            <div class=" mb-3">                 
              NRO DE REGISTRO:       {{`${numero_registro}`}}
            </div>

            <div class=" mb-3">                 
              CARRERA:         {{`${nombre_carrera}`}}
            </div>

            <div class=" mb-3">                 
              APELLIDOS Y NOMBRES:      {{`${apellidoP} ${apellidoM} ${nombres}`}}
            </div>

            <div class=" mb-3">                 
              FECHA DE EMISION :         {{`${fecha_emision}`}}
            </div> -->

     </div>
  </div>


   <div class="row">
      <!-- <div class="col-lg-12 col-sm-12 offset-lg-2 align-center"> -->
        <!-- <div class="col-lg-12 col-sm-12 align-center"> -->
        <div class="col-lg-10 offset-lg-1">
          <div class="table-responsive text-center">
              <table class="table table-bordered table-hover table-striped col-12 small" :key="keycon" v-if="keycon>=0">
                  <thead class="pb-4 table-light" v-if="estudiantes">
                    <tr>
                      <th>
                        #
                      </th>
                      <th>
                        C.I. 
                      </th>
                      <th>
                        NOMBRES
                      </th> 
                   
                      <th>
                        APELLIDO P.
                      </th>
                      <th >
                        APELLIDO M.
                      </th>
                      
                      <th>
                        CODIGO CARRERA
                      </th> 
                      <th>
                        NOMBRE CARRERA
                      </th>                 
                      <th>
                        AÑO CURSADO
                      </th>                                                                   
                      <th>
                        ACCIONES
                      </th>
                    </tr></thead>
                    <div v-else>
                      <img :src="ruta" alt="iamgen">
                    </div>
                  <tbody class="table-group-divider" id="contenido" :key="keycon">
                    <tr v-for="estudiante,i  in estudiantes" :key="i" :id="estudiante.ci_estudiante">
                        <td>{{ i+1 }}</td>
                        <td>{{ estudiante.ci_estudiante }}</td>
                        <td>{{ estudiante.nombres }}</td>
                        <td>{{ estudiante.apellidoP }}</td>
                        <td>{{ estudiante.apellidoM }}</td>
                        <td>{{ estudiante.codigo_carrera }}</td>
                        <td>{{ estudiante.nombre_carrera }}</td>
                        <td>{{ estudiante.anio_cursado }}</td>                        
                        <!-- <td>{{ estudiante.nombre_asignatura }}</td> -->
                        <!-- <td >{{ estudiante.id_docente }}</td> -->

                        <!-- <td >{{ estudiante.estado_gestion_espaniol }}</td> -->
                          <!--  <td>{{ getCarrera(estudiante.id_carrera) }}</td> -->
                        <!-- <td>{{ estudiante.nota_num_final }}</td> -->

                        
                        <td>                                                                                 
                            <!-- <button   class="btn btn-warning" >
                              INCRIBIR
                              <i class="fa-solid fa-school"></i>
                            </button>     -->
                            <router-link :to="{path:'/estudiante/ofertas/'+estudiante.ci_estudiante}" class="btn btn-warning" v-if="estudiante.inscrito_gestion=='no'" :key="keycon">
                                INSCRIBIR
                                <!-- <i class="fa-solid fa-school"></i> -->
                            </router-link>&nbsp;
                            <button   class="btn btn-success disabled" v-else >
                              INSCRITO
                              <!-- <i class="fa-solid fa-school"></i> -->
                            </button>&nbsp;
                            
                            <button   class="btn btn-success" v-if="estudiante.anio_ingreso===this.anio_actual&&estudiante.inscrito_gestion=='no'" @click="inscribirPrimerAnio(estudiante.ci_estudiante, `${estudiante.nombres} ${estudiante.apellidoP} ${estudiante.apellidoM}`)">
                              INS-DIRECTA
                              <!-- <i class="fa-solid fa-school"></i> -->
                            </button>
                             <!-- <router-link :to="{path:'/estudiante/ofertas/'+estudiante.ci_estudiante}" class="btn btn-success disabled" v-else>
                                INSCRITO <i class="fa-solid fa-school"></i>
                            </router-link>                        -->
                        </td>
                    </tr>                    
                  </tbody>
              </table>
          <!-- </div> -->
         </div>
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
//import {ref} from 'vue';
//import { getCurrentInstance } from 'vue';
import axios from "axios";
import {show_alerta} from '../../funciones';
import Swal from "sweetalert2";
//librerias para la exportacion en pdf
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


//import html2pdf from "html2pdf.js";
//import {ref} from 'vue';
// const provincias = computed(()=>{
//         return this.provincias = this.getProvincias()
// })
//const provincias = ref([]);
 //const contador =ref(0);



export default {
  name: 'AprobadasEstudianteView',
  data(){
    return {estudiantes:null,carreras:[],principal:'',
    ci_estudiante:'',nombres:'',apellidoP:'',apellidoM:'',codigo_carrera:'',nombre_carrera:'',anio_cursado:'',inscrito_gestion:'',anio_ingreso:'',
    anio_actual:0,
    materias:null,keycon: 0,
    url:'http://127.0.0.1:8000/administracion/obtenerEstudiantesInscripcion/',
    //url:'http://192.168.30.9:8000/administracion/obtenerEstudiantesInscripcion/',
    ruta:'../loading.gif'
  }
  },
  mounted(){
   //devuelve los estudiantes habilitados para inscribirse
    this.getEstudiantesHabilitados();
    //ruta de navegacion despues de la accion eliminar
    this.principal='/estudiantes';
  },
  methods:{       
    methodThatForcesUpdate() {
      // const instance = getCurrentInstance();
      // instance.ctx.forceUpdate();            
      this.keycon++;
      console.log('estmos forznado update'+this.keycon);
    },
    inscribirPrimerAnio(ci_estudiante,nombres)
    {
     this.inscripcionDirecta(ci_estudiante,nombres)
    },
    async inscripcionDirecta(ci_estudiante,nombres)
    {
      event.preventDefault();      
      
    const url = 'http://127.0.0.1:8000/administracion/inscribirEstudiantePrimerAnio/' + ci_estudiante + '/';
    
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: { confirmButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger' },
        buttonsStyling: false
    });

     swalWithBootstrapButtons.fire({
        title: 'Esta seguro que desea inscribir al Estudiante: ' + nombres,
        text: 'Se inscribira al estudiante ',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, Inscribir',
        cancelButtonText: '<i class="fa-solid fa-ban"></i>Cancelar'
    }).then(result => {
        if (result.isConfirmed) {
           // sendRequest('GET', { id: ci_estudiante }, url, 'Estudiante inscrito Satisfactoriamente!', 'estudiante-primer-anio');
          this.registrarEstudianteNuevo(url);
        } else {
            show_alerta('Operacion cancelada', 'info');
        }
    })
    },
    async registrarEstudianteNuevo(url){
      await axios.get(url).then(resultado=>{        
              const status = resultado.status;
              console.log('este es el status'+status);
              
              const datos =resultado.data['asignaturas_inscritas'];
              const datos_estudiante =resultado.data['estudiante'];
              const fecha_emision=resultado.data['fecha_emision'];
              const numero_boleta=resultado.data['numero_boleta'];
              let asignaturas_tabla=[];        
              for (let index = 0; index < datos.length; index++) {
                //asignaturas_tabla.push([index+1,datos[index].anio_asignado ,datos[index].codigo_asignatura,datos[index].nombre_asignatura])          
                asignaturas_tabla.push([index+1,datos[index].codigo_asignatura,datos[index].nombre_asignatura])
              }    
               this.methodThatForcesUpdate();    
              //console.log(asignaturas_tabla);
              //aqui estaba ggenerar reporte oficial
              //this.generarReporteInscripcion(asignaturas_tabla,datos_estudiante,fecha_emision,numero_boleta);
              //this.$router.push('/estudiantes');
              //this.$router.push('/estudiante/habilitados');
              
              //console.log(datos);          
              const mensaje = 'Estudiante inscrito Exitosamente!';
              if(status ===200)
              {      
                //console.log('se isncribio al estudiantes');      
                  show_alerta(mensaje,'success'); 
                    //setTimeout(() => window.location.href = '/estudiante/habilitados#'+datos_estudiante['ci_estudiante'], 1000);           
                  setTimeout(() => window.location.href = '/estudiante/habilitados', 1000);           
                  this.generarReporteInscripcion(asignaturas_tabla,datos_estudiante,fecha_emision,numero_boleta);
                  //optimizar este codigo que redirija a la la misma lista de habilitados
                  //this.$router.push('/estudiantes');
                  //this.methodThatForcesUpdate();
                  //console.log('oir aki'+datos);                      
              }        
            });
    },
    async generarReporteInscripcion(asignaturas_tabla,datos_estudiante,fecha_emision,numero_boleta)
    {
      //first try
                  //parameters:orientation,unit,format
                  // const doc = new jsPDF('p', 'pt', 'A4');
                  
                  
                  //   let pdfName = 'test';                     
                  //   doc.text(`Hello Students:
                    
                  //     ${this.estudiantes[0].nombre_carrera}                   
                      
                  //     `, 10, 100);
                  //   doc.save(pdfName + '.pdf');

                  //second try
                  //const doc = new jsPDF({unit: 'px'});
                  const doc = new jsPDF({orientation:'p',unit:'px',format:'letter'});
                  //const doc = new jsPDF('l','px,','letter');
                  doc.setFontSize(12); 
                  //let setY=15;

                  // this.estudiantes.forEach(element => {
                  //   doc.text(`
                  //     ${element.nombres}                                         
                  //     `, 10, setY);
                  //     setY+=15;
                  // });
                  
                  //EJEMPLO QUE ESTA AL FINAL DE COMO PASAR LOS HEADERS Y BODY
                  //const headers = [['NRO','PERIODO','CODIGO','ASIGNATURA PROGRAMADA', 'OBSERVACION']];
                  const headers = [['NRO','CODIGO','ASIGNATURA PROGRAMADA', 'OBSERVACION']];
                  //const headers1 = [['Nro','nombres', 'apellidoP', 'apellidoM','celular','nombre_carrera','estado']];  // 注意有兩層[]
                  // const body = [
                  //     ['David', 'david@example.com', 'Sweden'],
                  //     ['Castille', 'castille@example.com', 'Spain']
                  // ]

                  //SEGUNDA FORMA CON EL RELLENADO DE UN FORMATO SOLICITADO ATRAVES DE ESTRUCTURAS DE DATOS, LA PRIMERA A TRAVES DE UN TAG HTML
                  // const resultado = [];
                  // const encabezado = [];

                  // for (var i = 0; i < this.estudiantes.length; i += 1) {
                  //   console.log(this.estudiantes[i]);
                  //   //resultado.push(this.estudiantes[i])
                  //    if(i==0)
                  //    {
                  //      encabezado.push({nombres:`${this.estudiantes[i].apellidoP} ${this.estudiantes[i].apellidoM} ${this.estudiantes[i].nombres} `,ci_estudiante:this.estudiantes[i].ci_estudiante,
                  //                      nombre_carrera:this.estudiantes[i].nombre_carrera});
                  //       console.log(encabezado);
                  //    }
                  //   resultado.push([i+1,this.estudiantes[i].nombres,this.estudiantes[i].apellidoP,this.estudiantes[i].apellidoM,this.estudiantes[i].celular,
                  //   this.estudiantes[i].nombre_carrera,this.estudiantes[i].estado])
                    //result.push(Object.assign({}, data));
                  // }

                  //UNNECESARY PIECE OF CODE 
                  // let otro=[];
                  //   this.estudiantes.forEach(element => {
                  //     let jsonsito = {
                  //       nombre:element.nombres,
                  //       apellidoP:element.apellidoP,
                  //       apellidoM:element.apellidoM
                  //     }
                  //     otro.push(jsonsito);
                      
                  //   doc.text(`
                  //     ${element.nombres}                                         
                  //     `, 10, setY);
                  //     setY+=15;
                  // });


                   //numero de pagina
                  //  const pageNumber=3;
                  //  for (let i = 0; i < pageNumber; i++) {
                  //     doc.setPage(i);
                  //     let pageCurrent = doc.internal.getCurrentPageInfo().pageNumber; //現在這頁
                  //     doc.setFontSize(12); //設定字體大小(optional)
                  //     doc.text(
                  //       `${pageCurrent} / ${pageNumber}`,
                  //       190,
                  //       doc.internal.pageSize.height - 10,
                  //       {align: 'left'}
                  //     );
                  //   } 

                    //<!--  -->
                    //RELLENADO DE FORMA INICIAL()
                    //RELLENADO DE DATOS DEL ESTUDIANTE:
                    //INICIO PRIMERA FORMA

                    doc.setTextColor(10);
                    doc.setFontSize(15);

                    // doc.text(`
                    //   Primer comentario                                        
                    //    `, 10, setY);
                       
                    let finalY = doc.lastAutoTable.finalY || 10

                    //doc.addImage("https://picsum.photos/200", "JPEG", doc.internal.pageSize.width-80, finalY+20, 50, 50);

                    //await doc.addImage("../../logotipo-unibol-quechua.png", "PNG", doc.internal.pageSize.width-80, finalY+20, 50, 50);
                    //await doc.addImage("../../caracteristicas-bosques-tropicales.jpg", "JPG", 30, finalY+20, 50, 50);
                    
                    //<!-- -->
                    //PRIMER EJEMPLO DE PRUEBA EXITOSO
                    // doc.text(`
                    //    HISTORIAL ACADEMICO DE AVANCE GENERAL                                                      
                    //    `, 20, finalY);
                    //                   //finalY+=25;    
                    //    finalY+=20;    
                    // //SETEAMOS EL TAMAÑO DE LETRA PARA COLOCAR LOS DATOS
                    // doc.setFontSize(10);
                    // doc.text(`                            
                    //    APELLIDOS Y NOMBRES: ${this.apellidoP} ${this.apellidoM} ${this.nombres}                                  
                    //    CEDULA DE IDENTIDAD: ${this.ci_estudiante}
                    //    NRO DE REGISTRO: ${this.numero_registro}
                    //    CARRERA: ${this.nombre_carrera}
                    //    FECHA DE EMISION: ${this.fecha_emision}
                    //    NIVEL DE FORMACION: ${this.grado}
                    //    `,80, finalY);
                    //    finalY+=35;     
                    
                    //INICIANDO LOS ENCABEZADOS Y FORMATO DE PRESENTACION
                    await doc.addImage("../../ministerio.jpg", "JPG",  doc.internal.pageSize.width-65, finalY+5, 60, 60);                    
                    await doc.addImage("../../logotipo-unibol-quechua.png", "PNG", 15, finalY+5 , 50, 50);
                    
                    doc.setTextColor(10);
                    doc.setFontSize(10).setFont(undefined, 'bold');
                    doc.setTextColor(18, 73, 39);
                    doc.text(`
                       UNIVERSIDAD INDÍGENA BOLIVIANA COMUNITARIA INTERCULTURAL PRODUCTIVA
                       UNIBOL QUECHUA "CASIMIRO HUANCA"
                       `, (doc.internal.pageSize.getWidth()/2)-20, finalY,null,null,"center");
                       //finalY+=25;    
                       //añadimos 20+50 por el tamaño de las imagenes
                       finalY+=20;    

                    doc.setTextColor(100);
                    doc.setFontSize(8).setFont(undefined, 'normal');
                    doc.text(`
                       Decreto Supremo N° 29664 de 2 de agosto de 2008 - Decreto Supremo N° 3079 del 8 de febrero 2017
                       R.M. 505/2013 - R.M. 1300/2018"
                       `, (doc.internal.pageSize.getWidth()/2)-20, finalY,null,null,"center");
                       //finalY+=25;    
                       //añadimos 20+50 por el tamaño de las imagenes
                       finalY+=20; 

                    doc.setTextColor(10);
                    doc.setFontSize(8);
                    doc.text(`
                       Tukuy sunquwan yahcyaninchikta, ruwayninchikta, yuyayninchikta kallpachaspa sumaq kawsayman kutina                       
                       `, (doc.internal.pageSize.getWidth()/2)-5, finalY,null,null,"center");
                       //finalY+=25;    
                       //añadimos 20+50 por el tamaño de las imagenes
                       finalY+=15; 


                      doc.setTextColor(10);
                      doc.setFontSize(10).setFont(undefined, 'bold');                      
                      doc.text(`
                        BOLETA DE INSCRIPCIÓN 2024
                        `, (doc.internal.pageSize.getWidth()/2)-20, finalY,null,null,"center");
                        //finalY+=25;    
                        //añadimos 20+50 por el tamaño de las imagenes
                        finalY+=10;    

                      doc.setTextColor(10);
                      doc.setFontSize(10).setFont(undefined, 'bold');                      
                      doc.text(`
                        N° ${numero_boleta}
                        `, (doc.internal.pageSize.getWidth()/2)+120, finalY,null,null,"center");
                        //finalY+=25;    
                        //añadimos 20+50 por el tamaño de las imagenes
                        finalY+=10;  
                    
                      doc.setTextColor(10);
                      doc.setFontSize(8).setFont(undefined, 'bold');
                      doc.text(`
                      APELLIDOS Y NOMBRES:                                  
                      CÉDULA DE IDENTIDAD:                                   
                      NÚMERO DE REGISTRO:                                   
                      CARRERA:                                   
                      FECHA DE EMISIÓN:                                   
                        
                        `, -10, finalY);


                    
                      
                      //  NRO DE REGISTRO: ${this.numero_registro}

                      //  FECHA DE EMISION: ${this.fecha_emision}
                      //  NIVEL DE FORMACION: ${this.grado}
                       //finalY+=25;    
                       //añadimos 20+50 por el tamaño de las imagenes

                       //datos_estudiante,fecha_emision,numero_boleta
                       doc.setTextColor(100);
                       doc.text(`
                       ${datos_estudiante.apellidoP} ${datos_estudiante.apellidoM} ${datos_estudiante.nombres}                        
                       ${datos_estudiante.ci_estudiante}                       
                       ${datos_estudiante.numero_registro}                                 
                       ${datos_estudiante.nombre_carrera}
                       ${fecha_emision}
                       
                       `, (doc.internal.pageSize.getWidth()/2)-150, finalY);



                       finalY+=45; 
                    //SETEAMOS EL TAMAÑO DE LETRA PARA COLOCAR LOS DATOS
                    //doc.setFontSize(9);
                    
                    
                    doc.setTextColor(10);
                      doc.setFontSize(10).setFont(undefined, 'bold');                      
                      doc.text(`
                        PROGRAMACIÓN DE ASIGNATURAS GESTIÓN 2024
                        `, (doc.internal.pageSize.getWidth()/2)-20, finalY,null,null,"center");
                        //finalY+=25;    
                        //añadimos 20+50 por el tamaño de las imagenes
                        //finalY+=10; 
                        //COMENTADO POR MUCHJO ESPACIO   
                        //finalY+=10;    

                    //PRIMERA FORMA FINALIZADA 
                    // autoTable(doc, { 
                    //   startY: finalY + 20,
                    //   html: '#materias_cursadas' ,
                    //               //styles: {font: 'arial',fontSize:9}
                    //   styles: {fontSize:9,halign: 'left'}
                      
                    // })

                      


                    //doc.addImage("https://picsum.photos/200", "JPEG", 15, finalY+20, 10, 10);
                  
                  //const body = this.estudiantes;
                   //const body =otro;

                    //SEGUNDA FORMA FINALIZADA
                    autoTable(doc, {       
                      //QUITANDO ESPACIO
                      //startY: finalY + 20,               
                      startY: finalY + 10,               
                      head: headers,
                      body:asignaturas_tabla,
                      //theme:'grid',theme:'striped',theme:'plain'
                      theme:'plain',
                      tableLineColor:[0,0,0],tableLineWidth:0.2,
                      styles: {fontSize:5,cellWidth:'wrap',halign: 'center'},
                      bodyStyles:{lineWidth:0.2,lineColor:[0,0,0]},
                      //columnStyles:{color}
                      
                    });
                    finalY = doc.lastAutoTable.finalY
                    finalY+=30; 

                    doc.setTextColor(10);
                      doc.setFontSize(8).setFont(undefined, 'normal');                      
                      doc.text(`
                        FIRMA ESTUDIANTE
                        `, -10, finalY);
                        //finalY+=25;    
                        //añadimos 20+50 por el tamaño de las imagenes
                        //finalY+=10; 
                        
                        doc.setTextColor(10);
                      doc.setFontSize(8).setFont(undefined, 'normal');                      
                      doc.text(`
                        RESP. INSCRIPCIÓN
                        `,(doc.internal.pageSize.getWidth()/2)-20, finalY,null,null,"center");
                        //finalY+=25;    
                        //añadimos 20+50 por el tamaño de las imagenes
                        //finalY+=10;   

                        doc.setTextColor(10);
                      doc.setFontSize(8).setFont(undefined, 'normal');                      
                      doc.text(`
                      FIRMA DIRECTOR
                        `, (doc.internal.pageSize.getWidth()/2)+120, finalY,null,null,"center");
                        //finalY+=25;    
                        //añadimos 20+50 por el tamaño de las imagenes
                        finalY+=15;  

                        

                    //INICIO REIMPRESION DE DOCUMENTO DE INSCRIPCION
                    //INICIANDO LOS ENCABEZADOS Y FORMATO DE PRESENTACION                    
                    await doc.addImage("../../ministerio.jpg", "JPG", doc.internal.pageSize.width-65, finalY+5, 60, 60);
                    await doc.addImage("../../logotipo-unibol-quechua.png", "PNG", 15, finalY+5 , 50, 50);
                    
                    doc.setTextColor(10);
                    doc.setFontSize(10).setFont(undefined, 'bold');
                    doc.setTextColor(18, 73, 39);
                    doc.text(`
                       UNIVERSIDAD INDÍGENA BOLIVIANA COMUNITARIA INTERCULTURAL PRODUCTIVA
                       UNIBOL QUECHUA "CASIMIRO HUANCA"
                       `, (doc.internal.pageSize.getWidth()/2)-20, finalY,null,null,"center");
                       //finalY+=25;    
                       //añadimos 20+50 por el tamaño de las imagenes
                       finalY+=20;    

                    doc.setTextColor(100);
                    doc.setFontSize(8).setFont(undefined, 'normal');
                    doc.text(`
                       Decreto Supremo N° 29664 de 2 de agosto de 2008 - Decreto Supremo N° 3079 del 8 de febrero 2017
                       R.M. 505/2013 - R.M. 1300/2018"
                       `, (doc.internal.pageSize.getWidth()/2)-20, finalY,null,null,"center");
                       //finalY+=25;    
                       //añadimos 20+50 por el tamaño de las imagenes
                       finalY+=20; 

                    doc.setTextColor(10);
                    doc.setFontSize(8);
                    doc.text(`
                       Tukuy sunquwan yahcyaninchikta, ruwayninchikta, yuyayninchikta kallpachaspa sumaq kawsayman kutina                       
                       `, (doc.internal.pageSize.getWidth()/2)-5, finalY,null,null,"center");
                       //finalY+=25;    
                       //añadimos 20+50 por el tamaño de las imagenes
                       finalY+=15;


                       doc.setTextColor(10);
                      doc.setFontSize(10).setFont(undefined, 'bold');                      
                      doc.text(`
                        BOLETA DE INSCRIPCIÓN 2024
                        `, (doc.internal.pageSize.getWidth()/2)-20, finalY,null,null,"center");
                        //finalY+=25;    
                        //añadimos 20+50 por el tamaño de las imagenes
                        finalY+=10;    

                      doc.setTextColor(10);
                      doc.setFontSize(10).setFont(undefined, 'bold');                      
                      doc.text(`
                        N° ${numero_boleta}
                        `, (doc.internal.pageSize.getWidth()/2)+120, finalY,null,null,"center");
                        //finalY+=25;    
                        //añadimos 20+50 por el tamaño de las imagenes
                        finalY+=10;  
                    
                      doc.setTextColor(10);
                      doc.setFontSize(8).setFont(undefined, 'bold');
                      doc.text(`
                      APELLIDOS Y NOMBRES:                                  
                      CÉDULA DE IDENTIDAD:                                   
                      NÚMERO DE REGISTRO:                                   
                      CARRERA:                                   
                      FECHA DE EMISIÓN:                                   
                          
                          `, -10, finalY);
                      //  NRO DE REGISTRO: ${this.numero_registro}

                      //  FECHA DE EMISION: ${this.fecha_emision}
                      //  NIVEL DE FORMACION: ${this.grado}
                       //finalY+=25;    
                       //añadimos 20+50 por el tamaño de las imagenes

                       //datos_estudiante,fecha_emision,numero_boleta
                       doc.setTextColor(100);
                       doc.text(`
                       ${datos_estudiante.apellidoP} ${datos_estudiante.apellidoM} ${datos_estudiante.nombres}                        
                       ${datos_estudiante.ci_estudiante}                       
                       ${datos_estudiante.numero_registro}                                 
                       ${datos_estudiante.nombre_carrera}
                       ${fecha_emision}
                       
                       `, (doc.internal.pageSize.getWidth()/2)-150, finalY);



                       finalY+=45; 
                    //SETEAMOS EL TAMAÑO DE LETRA PARA COLOCAR LOS DATOS
                    //doc.setFontSize(9);
                    
                    
                    doc.setTextColor(10);
                      doc.setFontSize(10).setFont(undefined, 'bold');                      
                      doc.text(`
                        PROGRAMACIÓN DE ASIGNATURAS GESTIÓN 2024
                        `, (doc.internal.pageSize.getWidth()/2)-20, finalY,null,null,"center");
                        //finalY+=25;    
                        //añadimos 20+50 por el tamaño de las imagenes
                        //QUITANDO ESPACIO
                        //finalY+=20;    

                    

                    //SEGUNDA FORMA FINALIZADA
                    autoTable(doc, {      
                      //QUITANDO ESPACIO
                      //startY: finalY + 20,               
                      startY: finalY + 10,                                      
                      head: headers,
                      body:asignaturas_tabla,
                      //theme:'grid',theme:'striped',theme:'plain'
                      theme:'plain',
                      tableLineColor:[0,0,0],tableLineWidth:0.5,
                      styles: {fontSize:5,cellWidth:'wrap',halign: 'center'},
                      bodyStyles:{lineWidth:0.2,lineColor:[0,0,0]},
                      //columnStyles:{color}
                      
                    });
                    finalY = doc.lastAutoTable.finalY
                    finalY+=30; 

                    doc.setTextColor(10);
                      doc.setFontSize(8).setFont(undefined, 'normal');                      
                      doc.text(`
                        FIRMA ESTUDIANTE
                        `, -10, finalY);
                        //finalY+=25;    
                        //añadimos 20+50 por el tamaño de las imagenes
                        //finalY+=10; 
                        
                        doc.setTextColor(10);
                      doc.setFontSize(8).setFont(undefined, 'normal');                      
                      doc.text(`
                        RESP. INSCRIPCIÓN
                        `,(doc.internal.pageSize.getWidth()/2)-20, finalY,null,null,"center");
                        //finalY+=25;    
                        //añadimos 20+50 por el tamaño de las imagenes
                        //finalY+=10;   

                        doc.setTextColor(10);
                      doc.setFontSize(8).setFont(undefined, 'normal');                      
                      doc.text(`
                      FIRMA DIRECTOR
                        `, (doc.internal.pageSize.getWidth()/2)+120, finalY,null,null,"center");
                        //finalY+=25;    
                        //añadimos 20+50 por el tamaño de las imagenes
                        finalY+=20;  

                    //FIN DOCUMENTO DE REGISTRO DE INSCRIPCION

                    //doc.table(1, 1, this.generateData(100), headers1, { autoSize: true });
                    //await doc.save('inscripcion.pdf');  

                    // var blobPDF =  new Blob([ doc.output('blob') ], { type : 'application/pdf'});
                    // var blobUrl = URL.createObjectURL(blobPDF);  //<--- THE ERROR APPEARS HERE
                    // window.open(blobUrl);  

                    //doc.output('dataurlnewwindow');

                     await window.open(doc.output('bloburl'), '_blank');
                    

                                  
                    

                  //var doc = new jsPDF('p', 'pt', 'A4');
                    // margins = {
                    //     top: 80,
                    //     bottom: 60,
                    //     left: 40,
                    //     width: 522
                    // };       
    },
    getEstudiantesHabilitados(){
          axios.get(this.url)
            .then(            
                response =>(                    

                    this.estudiantes=response.data['estudiantes'],
                    this.anio_actual=response.data['anio_actual']
                    //this.materias = response.data['datos']
                    
                )
            ).catch(error => { 
          console.log(error)
          show_alerta(error,'error')
        });
        //console.log('s'+this.estudiantes);
            
    }
  }
}
</script>
<style>
/* body {
    font-size: .875rem;
    line-height: 1.25rem;
} */
</style>