<template>
  <!-- <div class="container-fluid text-center"> -->
  <div class="container-fluid" id="contenido-global" v-if="ofertaMaterias.length>0">
  <div class="row">
    <div class="mb-3 fw-bold">       

            <div class="mb-3 fs-4 text-center">                 
             OFERTA DE MATERIAS PARA LA INSCRIPCION:
            </div>

            <div class=" mb-3">                 
              APELLIDOS Y NOMBRES:    {{`${apellidoP} ${apellidoM} ${nombres}`}}
            </div>
            
            <div class=" mb-3">                 
              CEDULA DE IDENTIDAD:     {{`${ci_estudiante}`}}
            </div>

            <div class=" mb-3">                 
              CODIGO DE CARRERA:       {{`${codigo_carrera}`}}
            </div>

            <div class=" mb-3">                 
              NOMBRE DE CARRERA:         {{`${nombre_carrera}`}}
            </div>

            <div class=" mb-3">                 
              AÑO CURSADO:      {{`${anio_cursado}`}}
            </div>

            <!-- <div class=" mb-3">                 
              FECHA DE EMISION :         {{`${fecha_emision}`}}
            </div> -->

            <!-- <div>
            <button   class="btn btn-warning" @click="clickMe">                           
              GENERAR PDF : <i class="fa-solid fa-file-pdf"></i>
              </button>
            </div> -->

     </div>
  </div>


   <div class="row">
      <!-- <div class="col-lg-12 col-sm-12 offset-lg-2 align-center"> -->
        <!-- <div class="col-lg-12 col-sm-12 align-center"> -->
          <div class="table-responsive text-center">
              <table class="table table-bordered table-hover table-striped col-12" >
                  <thead class="pb-4 table-light">
                    <tr>
                      <th>
                        #
                      </th>
                      <th>
                        CODIGO CARRERA
                      </th>
                      <th>
                        CODIGO ASIGNATURA
                      </th> 
                   
                      <th>
                        NOMBRE DE ASIGNATURA
                      </th>
                      <th >
                        AÑO ASIGNADO
                      </th>
                                            
                      <!-- <th>
                        INS. DE APR.
                      </th>         
                      <th>
                        OBSERVACION
                      </th>-->                                            
                      <th>
                        ACCIONES
                      </th>
                    </tr></thead>
                  <tbody class="table-group-divider" id="contenido">
                    <tr v-for="materia,i  in ofertaMaterias" :key="materia">
                        <td>{{ i+1 }}</td>
                        <td>{{ materia.codigo_carrera }}</td>
                        <td>{{ materia.codigo_asignatura }}</td>
                        <td>{{ materia.nombre_asignatura }}</td>
                        <td>{{ materia.anio_asignado }}</td>
                        <!-- <td><inputcheckbox text="one" v-model="estado1" /></td> -->
                        <td><div class="form-check noselect">
                            <!-- <input class="form-check-input" type="checkbox" :id="id" :checked="estado1" :value="materia.codigo_asignatura" v-model="asignaturas" @change="addAsignatura()" /> -->
                            <input class="form-check-input" type="checkbox" :id="id" :checked="estado1" :value="materia.id" v-model="asignaturas" @change="addAsignatura()" />
                            <label class="form-check-label" :for="id"><slot /></label>
                          </div>
                        </td>
                        <!-- <td></td>
                        <td></td> -->
                        <!-- <td>{{ estudiante.nombre_asignatura }}</td> -->
                        <!-- <td >{{ estudiante.id_docente }}</td> -->

                        <!-- <td >{{ estudiante.estado_gestion_espaniol }}</td> -->
                          <!--  <td>{{ getCarrera(estudiante.id_carrera) }}</td> -->
                        <!-- <td>{{ estudiante.nota_num_final }}</td> -->

                        
                        <!-- <td>                                                                                 
                            <button   class="btn btn-warning" @click="clickMe"> -->                              
                              <!-- <i class="fa-solid fa-file-pdf"></i> -->
                            <!-- </button>                         
                        </td> -->
                        <!-- <router-link :to="{path:'/estudiante/ofertas/'+estudiante.ci_estudiante}" class="btn btn-warning">
                                INSCRIBIR<i class="fa-solid fa-school"></i>
                            </router-link>   -->
                    </tr>                    
                  </tbody>
              </table>
              <div>
                
              </div>
              

          <!-- </div> -->
      </div>
    </div>

    <div class="row">
      <div class="mb-3 mt-3 pa-3">
        <div class="d-grid col-6-mx-auto offset-md-6">        
                <button class="btn btn-warning" @click="guardarInscripcion">
                  <!-- <i class="fa-solid fa-user-plus"></i> -->
                  INSCRIBIR
                </button></div>    
      </div>
    </div>

  </div>
  <div v-else>
    <button @click="this.$router.back()" class="btn btn-warning col auto"><i class="fa-solid fa-arrow-left"></i>
      ATRAS
    </button>
    &nbsp; 
    <button  class="btn btn-warning col-6 text-center">
                    NO HAY OFERTA DE MATERIAS PARA EL ESTUDIANTE: {{`${apellidoP} ${apellidoM} ${nombres}`}}
    </button> 
  </div>
  

</template>

<script>
// @ is an alias to /src
//import {ref} from 'vue';
import axios from "axios";
import {show_alerta} from '../../funciones';
//para usar navegacion en la vista
import {  useRoute } from "vue-router";

//librerias para la exportacion en pdf
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



//const router = useRouter(); 
//import {ref} from 'vue';
// const provincias = computed(()=>{
//         return this.provincias = this.getProvincias()
// })
//const provincias = ref([]);
 //const contador =ref(0);
export default {
  name: 'AprobadasEstudianteView',
  setup(){
    
  },
  data(){
    return {estudiantes:null,asignaturas:[],principal:'',
    ci_estudiante:'',nombres:'',apellidoP:'',apellidoM:'',codigo_carrera:'',nombre_carrera:'',anio_cursado:'',inscrito_gestion:'',

    ofertaMaterias:[],estado1:false,
    url:'http://127.0.0.1:8000/administracion/obtenerAsignaturasNoCursadas'
  }
  },
  mounted(){
    const route =useRoute();    
     this.id = route.params.id;
      
     this.url = this.url + '/' +this.id+'/';
    this.getAsignaturasNoCursadas();
    //ruta de navegacion despues de la accion eliminar
    this.principal='/estudiantes';
  },
  methods:{    
    async getAsignaturasNoCursadas(){
         await axios.get(this.url)
            .then(            
                response =>{

                    //this.inscrito_gestion=response.data['estudiante']['inscrito_gestion']
                    if(response.data['estudiante']['inscrito_gestion']==='no')
                    {
                    
                    this.ci_estudiante=response.data['estudiante']['ci_estudiante'],
                    this.nombres=response.data['estudiante']['nombres'],
                    this.apellidoP=response.data['estudiante']['apellidoP'],
                    this.apellidoM=response.data['estudiante']['apellidoM'],
                    this.codigo_carrera=response.data['estudiante']['codigo_carrera'],
                    this.nombre_carrera=response.data['estudiante']['nombre_carrera'],
                    this.anio_cursado=response.data['estudiante']['anio_cursado'],                   

                     //this.carreras=response.data['estudiante']
                     this.ofertaMaterias = response.data['oferta_materias']

                    //this.materias = response.data['datos']
                    }else{
                      show_alerta('El estudiante ya se encuentra inscrito','info');                      
                      this.$router.push('/estudiante/habilitados');
                    }
                    
                }
            ).catch(error => { 
          console.log(error)
          show_alerta(error,'error')
        });
        //console.log(this.materias+'sss');
        console.log(this.url);
        console.log('aki'+this.ofertaMaterias);
            
    },
    addAsignatura(){
      console.log(this.asignaturas);
      // const parametros = {ci_estudiante:this.ci_estudiante,
      //                     asignaturas:this.asignaturas};
      // console.log(parametros);
      //sendRequest('PUT',parametros,this.url,'Estudiante Actualizado Exitosamente!',this.principal);                          

    //soporta asunc and await
    },async guardarInscripcion()
    {
      
      const parametros = {ci_estudiante:this.ci_estudiante,
                          ids_mallas:this.asignaturas};
                          //asignaturas:this.asignaturas};
      //console.log(parametros);

       const ruta = 'http://127.0.0.1:8000/administracion/inscribirEstudiante/';

      //  axios({method:'POST',url:ruta,data:parametros}).then(resultado=>{
      //    console.log(resultado);
      //  }).catch(error => { 
      //   //const {data} =error.data
      //   console.log(error)
      //   console.log(error.response.data)
      //   show_alerta(error,'error')
      // });
      
      await axios({method:'POST',url:ruta,data:parametros}).then(resultado=>{        
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
        //console.log(asignaturas_tabla);
        this.generarReporteInscripcion(asignaturas_tabla,datos_estudiante,fecha_emision,numero_boleta);
        //console.log(datos);          
        const mensaje = 'Estudiante inscrito Exitosamente!';
        if(status ===200)
        {      
          //console.log('se isncribio al estudiantes');      
            show_alerta(mensaje,'success');            
            //console.log('oir aki'+datos);                      
        }        
      });
      // const materiasInscritas = await sendRequest('POST',parametros,ruta,'Estudiante inscrito Exitosamente!','cursadas');       
      // console.log('as'+materiasInscritas);

      //router.push({ path: '/estudiantes' })
      this.$router.push('/estudiante/habilitados');
    },async generarReporteInscripcion(asignaturas_tabla,datos_estudiante,fecha_emision,numero_boleta)
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
                    await doc.addImage("../../ministerio.jpg", "JPG", 15, finalY+5, 60, 60);
                    await doc.addImage("../../logotipo-unibol-quechua.png", "PNG", doc.internal.pageSize.width-65, finalY+5 , 50, 50);
                    
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
                        BOLETA DE INSCRIPCION 2024
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
                    doc.setFontSize(10).setFont(undefined, 'bold');
                    doc.text(`
                       APELLIDOS Y NOMBRES:                                  
                       CEDULA DE IDENTIDAD:
                        NUMERO DE REGISTRO: 
                                   CARRERA:
                          FECHA DE EMISION:
                       
                       `, -20, finalY);
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



                       finalY+=55; 
                    //SETEAMOS EL TAMAÑO DE LETRA PARA COLOCAR LOS DATOS
                    //doc.setFontSize(9);
                    
                    
                    doc.setTextColor(10);
                      doc.setFontSize(10).setFont(undefined, 'bold');                      
                      doc.text(`
                        PROGRAMACION DE ASIGNATURAS GESTION 2024
                        `, (doc.internal.pageSize.getWidth()/2)-20, finalY,null,null,"center");
                        //finalY+=25;    
                        //añadimos 20+50 por el tamaño de las imagenes
                        finalY+=20;    

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
                      startY: finalY + 20,               
                      head: headers,
                      body:asignaturas_tabla,
                      //theme:'grid',theme:'striped',theme:'plain'
                      theme:'plain',
                      tableLineColor:[0,0,0],tableLineWidth:0.5,
                      styles: {fontSize:9,cellWidth:'wrap',halign: 'center'},
                      bodyStyles:{lineWidth:0.2,lineColor:[0,0,0]},
                      //columnStyles:{color}
                      
                    });
                    finalY = doc.lastAutoTable.finalY
                    finalY+=20; 

                    //INICIO REIMPRESION DE DOCUMENTO DE INSCRIPCION
                    //INICIANDO LOS ENCABEZADOS Y FORMATO DE PRESENTACION
                    await doc.addImage("../../ministerio.jpg", "JPG", 15, finalY+5, 60, 60);
                    await doc.addImage("../../logotipo-unibol-quechua.png", "PNG", doc.internal.pageSize.width-65, finalY+5 , 50, 50);
                    
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
                        BOLETA DE INSCRIPCION 2024
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
                    doc.setFontSize(10).setFont(undefined, 'bold');
                    doc.text(`
                       APELLIDOS Y NOMBRES:                                  
                       CEDULA DE IDENTIDAD:
                        NUMERO DE REGISTRO: 
                                   CARRERA:
                          FECHA DE EMISION:
                       
                       `, -20, finalY);
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



                       finalY+=55; 
                    //SETEAMOS EL TAMAÑO DE LETRA PARA COLOCAR LOS DATOS
                    //doc.setFontSize(9);
                    
                    
                    doc.setTextColor(10);
                      doc.setFontSize(10).setFont(undefined, 'bold');                      
                      doc.text(`
                        PROGRAMACION DE ASIGNATURAS GESTION 2024
                        `, (doc.internal.pageSize.getWidth()/2)-20, finalY,null,null,"center");
                        //finalY+=25;    
                        //añadimos 20+50 por el tamaño de las imagenes
                        finalY+=20;    

                    //SEGUNDA FORMA FINALIZADA
                    autoTable(doc, {       
                      startY: finalY + 20,               
                      head: headers,
                      body:asignaturas_tabla,
                      //theme:'grid',theme:'striped',theme:'plain'
                      theme:'plain',
                      tableLineColor:[0,0,0],tableLineWidth:0.5,
                      styles: {fontSize:9,cellWidth:'wrap',halign: 'center'},
                      bodyStyles:{lineWidth:0.2,lineColor:[0,0,0]},
                      //columnStyles:{color}
                      
                    });
                    finalY = doc.lastAutoTable.finalY
                    finalY+=20; 

                    //FIN DOCUMENTO DE REGISTRO DE INSCRIPCION

                    //doc.table(1, 1, this.generateData(100), headers1, { autoSize: true });
                    await doc.save('inscripcion.pdf');                                
                  //var doc = new jsPDF('p', 'pt', 'A4');
                    // margins = {
                    //     top: 80,
                    //     bottom: 60,
                    //     left: 40,
                    //     width: 522
                    // };       
    }
  }
}
</script>
