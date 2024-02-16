<template>
  <!-- <div class="container-fluid text-center"> -->
  <div v-if="asignaturas" class="container-fluid" id="contenido-global">
  <div class="row">
    <div class="mb-3 fw-bold ">       

            <div class="mb-3 fs-4 text-center">                 
             MALLA CURRICULAR : {{ `${id}`}}
            </div>
            
            <button   class="btn btn-warning offset-1" @click="exportPDF">                           
              GENERAR PDF : <i class="fa-solid fa-file-pdf"></i>
              </button>
      <!-- </div> -->

     </div>
  </div>


   <div class="row">
      <!-- <div class="col-lg-12 col-sm-12 offset-lg-2 align-center"> -->
        <!-- <div class="col-lg-12 col-sm-12 align-center"> -->
        <div class="col-lg-10 offset-lg-1">
          <div class="table-responsive text-center">
              <table id="malla_curricular" class="table table-striped table-bordered table-hover col-12">
                  <thead v-if="asignaturas" class="pb-4 table-light align-middle">
                    <tr>
                      <th>
                        #
                      </th>
                      <th>
                        CODIGO CARRERA
                      </th>
                      <th>
                        NOMBRE CARRERA
                      </th>                    
                      <th>
                        CODIGO ASIGNATURA
                      </th>
                      <th >
                        NOMBRE ASIGNATURA
                      </th>                      
                      <th>
                        DESCRIPCION
                      </th>                       
                      <th>
                        ESTADO
                      </th>   
                      <!-- <th>
                        INS. DE APR.
                      </th>         
                      <th>
                        OBSERVACION
                      </th>                                            
                      <th>
                        ACCIONES
                      </th> -->
                    </tr></thead>
                  <tbody class="table-group-divider" id="contenido">
                    <tr v-for="asignatura,i  in asignaturas" :key="asignatura">
                        <td>{{ i+1 }}</td>
                        <td>{{ asignatura.codigo_carrera }}</td>
                        <td>{{ asignatura.nombre_carrera }}</td>
                        <td>{{ asignatura.codigo_asignatura }}</td>
                        <td>{{ asignatura.nombre_asignatura }}</td>
                        <td>{{ asignatura.descripcion }}</td>
                        <td>{{ asignatura.estado }}</td>
                        
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
import axios from "axios";
import {show_alerta,confirmar1} from '../../funciones';
import { useRoute } from "vue-router";
import html2pdf from "html2pdf.js";

//librerias para la exportacion en pdf
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


//import {ref} from 'vue';
// const provincias = computed(()=>{
//         return this.provincias = this.getProvincias()
// })
//const provincias = ref([]);
 //const contador =ref(0);
export default {
  name: 'MOstrarMallaCarreraView',
  data(){
    return {principal:'',
    id:0,codigo_carrera:'',nombre_carrera:'',codigo_asignatura:'',nombre_asignatura:'',descripcion:'',estado:'',
    message:'',asignaturas:null,
    url:'http://127.0.0.1:8000/parametros/mallaAcademica'
  }
  },
  mounted(){
    const route =useRoute();
     this.id = route.params.id;
      
     this.url = this.url + '/' +this.id+'/';
    this.getMallaAcademica();
    //ruta de navegacion despues de la accion eliminar
    this.principal='/estudiantes';    
  },
  methods:{
    clickMe(){
      html2pdf(document.getElementById('contenido-global'),{
        margin:1,
        filename:'reporte.pdf',
        html2canvas:{scale:3}
      })
    },
    async exportPDF() {
                  //first try
                  // const doc = new jsPDF('p', 'pt', 'A4');
                  
                  
                  //   let pdfName = 'test';                     
                  //   doc.text(`Hello Students:
                    
                  //     ${this.estudiantes[0].nombre_carrera}                   
                      
                  //     `, 10, 100);
                  //   doc.save(pdfName + '.pdf');

                  //second try
                  const doc = new jsPDF({unit: 'px'});
                  doc.setFontSize(12); 
                  //let setY=15;

                  // this.estudiantes.forEach(element => {
                  //   doc.text(`
                  //     ${element.nombres}                                         
                  //     `, 10, setY);
                  //     setY+=15;
                  // });
                  
                  //EJEMPLO QUE ESTA AL FINAL DE COMO PASAR LOS HEADERS Y BODY
                  //const headers = [['Name', 'Email', 'Country']];
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

                    //RELLENADO DE DATOS DEL ESTUDIANTE:
                    //INICIO PRIMERA FORMA
                    doc.setTextColor(100);
                    doc.setFontSize(15);
                    // doc.text(`
                    //   Primer comentario                                        
                    //    `, 10, setY);
                       
                    let finalY = doc.lastAutoTable.finalY || 10

                    //doc.addImage("https://picsum.photos/200", "JPEG", doc.internal.pageSize.width-80, finalY+20, 50, 50);
                  
                    //DEFINICION GENERAL
                    // await doc.addImage("../../ministerio.jpg", "JPG", 30, finalY+20, 60, 60);
                    // await doc.addImage("../../logotipo-unibol-quechua.png", "PNG", doc.internal.pageSize.width-80, finalY+20, 50, 50);
                    //RESTA GENERAL A TODO DE 15PX
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
                       finalY+=20; 

                    doc.setTextColor(10);
                    doc.setFontSize(10);
                    doc.text(`
                       MALLA CURRICULAR  : ${this.id}  
                       ${this.asignaturas[0].nombre_carrera}  

                       `, (doc.internal.pageSize.getWidth()/2)-20, finalY,null,null,"center");
                       //finalY+=25;    
                       //añadimos 20+50 por el tamaño de las imagenes
                       finalY+=15;    
                    //SETEAMOS EL TAMAÑO DE LETRA PARA COLOCAR LOS DATOS
                    doc.setFontSize(10);
                    
                    // doc.text(`                            
                    //    APELLIDOS Y NOMBRES: ${this.apellidoP} ${this.apellidoM} ${this.nombres}                                  
                    //    CEDULA DE IDENTIDAD: ${this.ci_estudiante}
                    //    NRO DE REGISTRO: ${this.numero_registro}
                    //    CARRERA: ${this.nombre_carrera}
                    //    FECHA DE EMISION: ${this.fecha_emision}
                    //    NIVEL DE FORMACION: ${this.grado}
                    //    `,80, finalY);
                    //    finalY+=35;                   
                    
                    //PRIMERA FORMA FINALIZADA 
                    autoTable(doc, { 
                      startY: finalY + 20,
                      html: '#malla_curricular' })

                      finalY = doc.lastAutoTable.finalY


                    //doc.addImage("https://picsum.photos/200", "JPEG", 15, finalY+20, 10, 10);
                  
                  //const body = this.estudiantes;
                   //const body =otro;

                    //SEGUNDA FORMA FINALIZADA
                    // autoTable(doc, {
                    //   head: headers1,
                    //   body:resultado,
                    // });

                    //doc.table(1, 1, this.generateData(100), headers1, { autoSize: true });
                    await doc.save('example.pdf');                                
                  //var doc = new jsPDF('p', 'pt', 'A4');
                    // margins = {
                    //     top: 80,
                    //     bottom: 60,
                    //     left: 40,
                    //     width: 522
                    // };                                                                                                     
     }
    ,
    sortGestion(data){
        data = data.sort((a, b) => {
        if (a.anio_cursado < b.anio_cursado) {
          return -1;
        }
      });
      console.log(data);
      return data;
    },
    getMallaAcademicas(){
          axios.get(this.url)
            .then(            
                response =>{
                    
                    //if(!response.data.message){
                      //console.log('psando normal');
                    this.message = response.data.message,

                    this.codigo_carrera=response.data['codigo_carrera'],
                    this.nombre_carrera=response.data['nombre_carrera'],
                    this.codigo_asignatura=response.data['codigo_asignatura'],
                    this.nombre_asignatura=response.data['nombre_asignatura'],
                    this.descripcion=response.data['descripcion'],
                    this.estado=response.data['estado']
                                        
                    //this.materias = this.sortGestion(response.data['datos'])
                    
                    //this.materias = response.data['datos']
                    // }else{
                      // console.log('aki esta el error'+response.data.message);
                    // }

                  
                    
                }
            ).catch(error => { 
          console.log(error)
          show_alerta(this.message,'error')
          this.$router.push('/carreras')
        });              
            
    },eliminar(id,nombre){
    //   for (let index = 0; index < 10; index++) {
    //     sendRequest('POST',{
    //     "id":999,
    //     "nombre_provincia": "TEST-PROVINCIAS",
    //     "id_departamento": null
    // },'http://127.0.0.1:8000/parametros/provincias/','ProvinciaS Eliminada');              
    //   }
      const ruta = 'estudiantes/estudiantes/'+id+'/';
      confirmar1(id,nombre,ruta,this.principal);      
    },
    getMallaAcademica(){      
      axios.get(this.url)
            .then(            
                response =>(                    
                    this.asignaturas = response.data
                )
            );
          return this.asignaturas;
    },

  }
}
</script>