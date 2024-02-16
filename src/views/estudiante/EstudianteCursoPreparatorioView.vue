<template>
  <!-- <div class="container-fluid text-center"> -->
  <div v-if="estudiantesP" class="container-fluid" id="contenido-global">
    <div class="row">
      <div class="col-lg-10 offset-lg-1">
        <div class="mb-3 fw-bold ">

          <div class="mb-3 fs-5 text-center">
            ESTUDIANTES DEL CURSO PREPARATORIO
          </div>
          <!-- 
            <div class=" mb-3">                 
              APELLIDOS Y NOMBRES:    {{`${apellidoP} ${apellidoM} ${nombres}`}}
            </div>
            
            <div class=" mb-3">                 
              CEDULA DE IDENTIDAD:     {{`${ci_estudiante}`}}
            </div>

            <div class=" mb-3">                 
              NOTA FINAL:       {{`${numero_registro}`}}
            </div>

           

            <div class="d-flex justify-content-between ">
            <div class=" mb-3">                 
              FECHA DE EMISION :         {{`${fecha_emision}`}}
            </div>
            <div>
            <button   class="btn btn-warning " @click="exportPDF">                           
              GENERAR PDF : <i class="fa-solid fa-file-pdf"></i>
              </button>
            </div>
          </div> -->

        </div>
      </div>
    </div>


    <div class="row">
      <!-- <div class="col-lg-12 col-sm-12 offset-lg-2 align-center"> -->
      <!-- <div class="col-lg-12 col-sm-12 align-center"> -->
      <div class="col-lg-10 offset-lg-1">
        <div class="table-responsive text-center">
          <table id="materias_cursadas" class="table table-bordered table-hover table-striped col-12 small">
            <thead v-if="estudiantesP" class="pb-4 table-light">
              <tr>
                <th>
                  #
                </th>
                <th>
                  CEDULA DE IDENTIDAD
                </th>
                <th>
                  NOMBRES
                </th>

                <th>
                  APELLIDO PATERNO
                </th>
                <th>
                  APELLIDO MATERNO
                </th>

                <th>
                  NOTA FINAL
                </th>

                <!-- <th>
                        INS. DE APR.
                      </th>         
                      <th>
                        OBSERVACION
                      </th>                                             -->
                <th>
                  ACCIONES
                </th>
              </tr>
            </thead>
            <div v-else>
                      <img :src="ruta" alt="iamgen">
            </div>
            <tbody class="table-group-divider" id="contenido">
              <tr v-for="estudiante, i  in estudiantesP" :key="estudiante">
                <td>{{ i + 1 }}</td>
                <td>{{ estudiante.ci_postulante }}</td>
                <td>{{ estudiante.nombres_p }}</td>
                <td>{{ estudiante.apellido_paterno_p }}</td>
                <td>{{ estudiante.apellido_materno_p }}</td>
                <td>{{ estudiante.nota_final }}</td>

                <!-- <td></td>
                        <td></td> -->
                <!-- <td>{{ estudiante.nombre_asignatura }}</td> -->
                <!-- <td >{{ estudiante.id_docente }}</td> -->

                <!-- <td >{{ estudiante.estado_gestion_espaniol }}</td> -->
                <!--  <td>{{ getCarrera(estudiante.id_carrera) }}</td> -->
                <!-- <td>{{ estudiante.nota_num_final }}</td> -->


                <td>
                  <button class="btn btn-warning"
                    @click="confirmarRegistro(estudiante.ci_postulante, `${estudiante.nombres_p} ${estudiante.apellido_paterno_p} ${estudiante.apellido_materno_p}`)"
                    v-if="estudiante.registrado == 'no'">
                    REGISTRAR 
                    <!-- <i class="fa-solid fa-school"></i> -->
                  </button>
                  <button class="btn btn-success disabled" v-else>
                    INSCRITO
                    <!-- <i class="fa-solid fa-school"></i> -->
                  </button>
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
import axios from "axios";
import { show_alerta, confirmar1, confirmarRegistroP } from '../../funciones';
//import { useRoute } from "vue-router";
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
  name: 'EstudianteCursoPreparatorioView',
  data() {
    return {
      estudiantesP: null, principal: '',
      ci_estudiante: '', nombres: '', apellidoP: '', apellidoM: '', nota_final: '', estado_inscrito: '',
      message: '',
      url: 'http://127.0.0.1:8000/administracion/obtenerPostulates/',
      ruta:'../loading.gif'
    }
  },
  mounted() {
    // const route =useRoute();
    //  this.id = route.params.id;

    //  this.url = this.url + '/' +this.id+'/';
    this.getPostulantes();
    //ruta de navegacion despues de la accion eliminar
    this.principal = '/estudiantes';
  },
  methods: {
    clickMe() {
      html2pdf(document.getElementById('contenido-global'), {
        margin: 1,
        filename: 'reporte.pdf',
        html2canvas: { scale: 3 }
      })
    },
    async confirmarRegistro(ci_postulante, nombres) {
      event.preventDefault();
      try {
        await confirmarRegistroP(ci_postulante, nombres);
      } catch (error) {
        console.log(error);
      }
      // this.estudiantesP = this.estudiantesP.filter(item => item.ci_postulante !== ci_postulante);
      // this.getPostulantes();
      //this.$router.push('/estudiantes');

    },
    async exportPDF() {
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
      const doc = new jsPDF({ orientation: 'p', unit: 'px', format: 'letter' });
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
      await doc.addImage("../../ministerio.jpg", "JPG", 15, finalY + 5, 60, 60);
      await doc.addImage("../../logotipo-unibol-quechua.png", "PNG", doc.internal.pageSize.width - 65, finalY + 5, 50, 50);

      doc.setTextColor(10);
      doc.setFontSize(10).setFont(undefined, 'bold');
      doc.setTextColor(18, 73, 39);
      doc.text(`
                       UNIVERSIDAD INDÍGENA BOLIVIANA COMUNITARIA INTERCULTURAL PRODUCTIVA
                       UNIBOL QUECHUA "CASIMIRO HUANCA"
                       `, (doc.internal.pageSize.getWidth() / 2) - 20, finalY, null, null, "center");
      //finalY+=25;    
      //añadimos 20+50 por el tamaño de las imagenes
      finalY += 20;

      doc.setTextColor(100);
      doc.setFontSize(8).setFont(undefined, 'normal');
      doc.text(`
                       Decreto Supremo N° 29664 de 2 de agosto de 2008 - Decreto Supremo N° 3079 del 8 de febrero 2017
                       R.M. 505/2013 - R.M. 1300/2018"
                       `, (doc.internal.pageSize.getWidth() / 2) - 20, finalY, null, null, "center");
      //finalY+=25;    
      //añadimos 20+50 por el tamaño de las imagenes
      finalY += 20;

      doc.setTextColor(10);
      doc.setFontSize(8);
      doc.text(`
                       Tukuy sunquwan yahcyaninchikta, ruwayninchikta, yuyayninchikta kallpachaspa sumaq kawsayman kutina                       
                       `, (doc.internal.pageSize.getWidth() / 2) - 5, finalY, null, null, "center");
      //finalY+=25;    
      //añadimos 20+50 por el tamaño de las imagenes
      finalY += 15;

      doc.setTextColor(10);
      doc.setFontSize(10);
      doc.text(`
                       APELLIDOS Y NOMBRES: ${this.apellidoP} ${this.apellidoM} ${this.nombres}                                  
                       CEDULA DE IDENTIDAD: ${this.ci_estudiante}
                       NRO DE REGISTRO: ${this.numero_registro}
                       CARRERA: ${this.nombre_carrera}
                       FECHA DE EMISION: ${this.fecha_emision}
                       NIVEL DE FORMACION: ${this.grado}
                       `, 30, finalY);
      //finalY+=25;    
      //añadimos 20+50 por el tamaño de las imagenes
      finalY += 35;
      //SETEAMOS EL TAMAÑO DE LETRA PARA COLOCAR LOS DATOS
      doc.setFontSize(9);


      //PRIMERA FORMA FINALIZADA 
      autoTable(doc, {
        startY: finalY + 20,
        html: '#materias_cursadas',
        //styles: {font: 'arial',fontSize:9}
        styles: { fontSize: 9, halign: 'left' }

      })

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
    sortGestion(data) {
      data = data.sort((a, b) => {
        if (a.anio_cursado < b.anio_cursado) {
          return -1;
        }
      });
      console.log(data);
      return data;
    },
    getMateriasCursadas() {
      axios.get(this.url)
        .then(
          response => {

            //if(!response.data.message){
            //console.log('psando normal');
            this.message = response.data.message,
              this.ci_estudiante = response.data['estudiante']['ci_estudiante'],
              this.nombres = response.data['estudiante']['nombres'],
              this.apellidoP = response.data['estudiante']['apellidoP'],
              this.apellidoM = response.data['estudiante']['apellidoM'],
              this.numero_registro = response.data['estudiante']['numero_registro'],
              this.nombre_carrera = response.data['estudiante']['nombre_carrera'],

              this.fecha_emision = response.data['fecha_emision'],
              this.grado = response.data['grado'],

              this.materias = this.sortGestion(response.data['datos'])

            //this.materias = response.data['datos']
            // }else{
            // console.log('aki esta el error'+response.data.message);
            // }



          }
        ).catch(error => {
          console.log(error)
          show_alerta(this.message, 'error')
          this.$router.push('/estudiantes')
        });
      //console.log(this.materias+'sss');        

    }, eliminar(id, nombre) {
      //   for (let index = 0; index < 10; index++) {
      //     sendRequest('POST',{
      //     "id":999,
      //     "nombre_provincia": "TEST-PROVINCIAS",
      //     "id_departamento": null
      // },'http://127.0.0.1:8000/parametros/provincias/','ProvinciaS Eliminada');              
      //   }
      const ruta = 'estudiantes/estudiantes/' + id + '/';
      confirmar1(id, nombre, ruta, this.principal);
      this.$router.push('/estudiantes')
    },
    getPostulantes() {
      axios.get(this.url)
        .then(
          response => (
            //this.carreras[id] = response.data['nombre_carrera']
            this.estudiantesP = response.data
          )
        );
      //return this.carreras[id]
    },

  }
}
</script>
<style>
body {
    font-size: .875rem;
    line-height: 1.25rem;
}
</style>