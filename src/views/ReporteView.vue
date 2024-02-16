<template>
    <div class="row">
        <!-- <div class="col-lg-8 col-lg-2">
            <div class="table-responsive">
                <Datatable :data="estudiantes" :columns="columns" class="table table-bordered table-striped display"
                 :options="{responsive:true,autoWidth:false,dom:'Bfrtip', language:{
                    search:'Buscar',zeroRecord:'No hay registros que mostrar',
                    info:'Mostrando desde _START_ a _END_ de _TOTAL_ registros',
                    infoFiltered:'(Filtrados de _MAX_ registros)',
                    paginate:{first:'Primero',previous:'Anterior',next:'Siguiente',last:'Ultimo'}
                 }}">
                    <thead>
                    <tr>
                      <th>
                        #
                      </th>
                      <th class="d-none d-sm-block pb-4">
                        C.I.
                      </th>
                      <th >
                        NOMBRES
                      </th>
                      <th class="d-none d-sm-block">
                        APELLIDO-P.
                      </th>
                      <th>
                        APELLIDO-M.
                      </th> 
                      <th>
                        CELULAR
                      </th> 
                      <th>
                        CARRERA
                      </th>
                      <th>
                        AÑO DE INGRESO
                      </th>
                      <th>
                        AÑO CURSADO
                      </th>                                         
                      <th>
                        ESTADO
                      </th>
                      <th>
                        ACCIONES
                      </th>
                    </tr>
                    </thead>
                </Datatable>  
            </div>
        </div> -->
    </div>
</template>

<script>
// import axios from 'axios';
// //import { useRoute } from "vue-router";
// //import DataTable from 'datatables.net-vue3';
// //import DataTablesCore from 'datatables.net';
// //import DataTableLib from 'datatables.net-bs5';
// //import Buttons from 'datatables.net-buttons-bs5';
// //import ButtonsHtml5 from 'datatables.net-buttons/js/buttons.html5';
// //import print from 'datatables.net-buttons/js/buttons.print'
// //import pdfmake from 'pdfmake';
// //import pdfFonts from 'pdfmake/build/vfs_fonts';
// //import 'datatables.net-responsive-bs5';
// //import JsZip from 'jszip';
// //window.JsZip= JsZip;
// //DataTable.use(DataTableLib);
// //DataTable.use(pdfmake);
// //DataTable.use(ButtonsHtml5);
// //DataTable.use(DataTablesCore);

// export default {
// name:'ReporteView',
// //components:{DataTable},
//   data(){
//     return {
//     ci_estudiante:'',nombres:'',apellidoP:'',apellidoM:'',numero_registro:'',nombre_carrera:'',fecha_emision:'',
//     estudiantes:null,materias:null,    
//     url:'http://127.0.0.1:8000/estudiantes/obtenerAsignaturasCursadas',
//     columns:[
//       {data:null,render:function(data,type,row,meta)
//       {return `${meta.row+1}`}},
//       {data:'ci_estudiante'},
//       {data:'apellidoP'},
//       {data:'apellidoM'},
//       {data:'celular'},
//       {data:'nombre_carrera'},
//       {data:'anio_ingreso'},
//       {data:'anio_cursado'},
//       {data:'estado'}
//     ]
//     }
//   },
//   mounted(){
//      //const route =useRoute();
//      //this.id = route.params.id;
      
//      //this.url = this.url + '/' +this.id+'/';
//     //this.getMateriasCursadas();
//     //ruta de navegacion despues de la accion eliminar
//     //this.principal='/estudiantes';

//       //this.getMateriasCursadas();

//       this.getEstudiantes();
//   },methods:{
//       getEstudiantes(){
//             axios.get('http://127.0.0.1:8000/estudiantes/estudiantes/')
//             .then(            
//                 response =>(
//                     this.estudiantes = response.data                        
//                 )
//             );
//             console.log(this.estudiantes);
//     },
//       getMateriasCursadas(){
//          axios.get(this.url)
//             .then(            
//                 response =>(                  
//                     this.ci_estudiante=response.data['estudiante']['ci_estudiante'],
//                     this.nombres=response.data['estudiante']['nombres'],
//                     this.apellidoP=response.data['estudiante']['apellidoP'],
//                     this.apellidoM=response.data['estudiante']['apellidoM'],
//                     this.numero_registro=response.data['estudiante']['numero_registro'],
//                     this.nombre_carrera=response.data['estudiante']['nombre_carrera'],

//                     this.fecha_emision=response.data['fecha_emision'],

//                     //this.materias = this.sortGestion(response.data['datos'])
//                     this.materias = response.data['datos']
                    
//                 )
//             ).catch(error => { 
//           console.log(error)
//           //show_alerta(error,'error')
//         });
//         console.log(this.materias+'sss');            
//       }
//   }
// }
</script>