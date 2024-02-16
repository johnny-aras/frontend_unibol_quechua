<template>
<div class="container-fluid my-5" >
  <div class="row">
    <div class="mb-3">
      <!-- <div class="offset-7">         -->
              <button class="btn btn-success col-4 offset-8 ">                 
                <router-link to="/estudiante/create" class="nav-link active" href="#">Nuevo Estudiante</router-link>  <i class="fa-solid fa-user-plus"></i> 
               </button>
      <!-- </div>     -->
     </div>
  </div>
   <div  class="row" >
      <!-- <div class="col-lg-12 col-sm-12 offset-lg-2 align-center"> -->
        <!-- <div class="col-lg-12 col-sm-12 align-center"> -->
        <div class="col-lg-12 offset-lg-0">
          <div class="table-responsive">
            <DataTable  ref="table" id="datatable"  :data="estudiantes" :columns="columns" class="table table-bordered table-striped display fixed small" :options="{ select: true ,responsive: true,autoWidth:false,dom:'Bfrtip',
                            buttons : [{
                              extend : 'selected',
                              text : 'Edit',
                              name : 'edit'
                          }],pageLength:5,
                          //responsivePriority: 1,                                                   
                            columnDefs:[{
                               width:'40%',target:[6],
                              width:'10%',target:[7],
                            }],
                            language:{
                                      search:'Buscar',zeroRecord:'No hay registros que mostrar',
                                      info:'Mostrando desde _START_ a _END_ de _TOTAL_ registros',
                                      infoFiltered:'(Filtrados de _MAX_ registros)',
                                      paginate:{first:'Primero',previous:'Anterior',next:'Siguiente',last:'Ultimo'}
                            }}" :key="columns.length" >
                  <thead class="pb-4 table-light">
                    <!-- v-if="estudiantes" -->
                    <tr>
                      <th class="col">
                        #
                      </th>
                      <!-- <th class="d-none d-sm-block pb-4 col"> -->
                      <th>
                        C.I.
                      </th>
                      <th class="col-">
                        NOMBRES
                      </th>
                      <th>
                        APELLIDO-P.
                      </th>
                      <th class="col">
                        APELLIDO-M.
                      </th> 
                      <th class="col">
                        CELULAR
                      </th> 
                      <th class="col">
                        CARRERA
                      </th>
                      <th class="col">
                        AÑO DE INGRESO
                      </th>
                      <th class="col">
                        AÑO CURSADO
                      </th>
                      <!-- <th class="col-1">
                        OBS.1
                      </th>
                      <th class="col-1">
                        OBS.2
                      </th>                       -->
                      <th class="col">
                        ESTADO
                      </th>
                      <th class="col">
                        ACCIONES
                      </th>
                    </tr></thead>
                    <tbody>                      
                    </tbody>
                      
                    <!-- <div v-else>
                      <img src="loading.gif" alt="iamgen">
                    </div>                                 -->
              </DataTable>            
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
import {confirmar1, show_alerta} from '../../funciones';

import DataTable from 'datatables.net-vue3';
import DataTableLib from 'datatables.net-bs5';
import 'datatables.net-responsive-bs5';
DataTable.use(DataTableLib);

//import {ref} from 'vue';
// const provincias = computed(()=>{
//         return this.provincias = this.getProvincias()
// })
//const provincias = ref([]);
 //const contador =ref(0);
export default {
  components: {DataTable},
  name: 'EstudianteView',
  data(){
    return {
      estudiantes:null,carreras:[],principal:'',message:'',dt: null, 
      columns:[
       {data:null,render:function(data,type,row,meta)
       {return `${meta.row+1}`}},
       {data:'ci_estudiante'},
       {data:'nombres'},

       {data:'apellidoP'},
       {data:'apellidoM'},
       {data:'celular'},
       {data:'nombre_carrera'},
       {data:'anio_ingreso'},
       {data:'anio_cursado'},
       {data:'estado'},
       {
        data:'ci_estudiante',
        render:function(data){
          return `<button   data-id=${data} class="btn btn-danger" id="edit" @click="eliminar(${data.ci_estudiante},${data.nombres})">
                                <i class="fa-solid fa-trash"></i>
                  </button> &nbsp;
                  <router-link data-id=${data} :to="{path:'/estudiante/edit/'+ci_estudiante}" class="btn btn-warning">
                                <i class="fa-solid fa-edit"></i>
                            </router-link>
                  
                  `
        }
       },       
     ]     
    }
  },
  mounted(){
    this.getEstudiantes();
    //this.getMateriasCursadas();
    //ruta de navegacion despues de la accion eliminar
    this.principal='/estudiantes';
  },
  methods:{
    async getEstudiantes(){
           await axios.get('http://127.0.0.1:8000/estudiantes/estudiantes/')
            .then(            
                response =>(
                    this.estudiantes = response.data                        
                )
            );
        console.log(this.estudiantes);
    },eliminar(id,nombre=''){
    //   for (let index = 0; index < 10; index++) {
    //     sendRequest('POST',{
    //     "id":999,
    //     "nombre_provincia": "TEST-PROVINCIAS",
    //     "id_departamento": null
    // },'http://127.0.0.1:8000/parametros/provincias/','ProvinciaS Eliminada');              
    //   }
      const ruta = 'estudiantes/estudiantes/'+id+'/';
      confirmar1(id,nombre,ruta,this.principal);  
      //this.$router.push('/estudiantes')    
    },
    getCarrera(id){      
      axios.get('http://127.0.0.1:8000/parametros/carreras/'+id+'/')
            .then(            
                response =>(
                    this.carreras[id] = response.data['nombre_carrera']
                )
            );
          return this.carreras[id]
    },getMateriasCursadas(id){
          axios.get('http://127.0.0.1:8000/estudiantes/obtenerAsignaturasCursadas/'+id)
            .then(            
                response =>{
                    
                    if(!response.data.message){
                      console.log('psando normal');
                    //this.message = response.data.message,
                    this.ci_estudiante=response.data['estudiante']['ci_estudiante'],
                    this.nombres=response.data['estudiante']['nombres'],
                    this.apellidoP=response.data['estudiante']['apellidoP'],
                    this.apellidoM=response.data['estudiante']['apellidoM'],
                    this.numero_registro=response.data['estudiante']['numero_registro'],
                    this.nombre_carrera=response.data['estudiante']['nombre_carrera'],

                    this.fecha_emision=response.data['fecha_emision'],

                    this.materias = this.sortGestion(response.data['datos'])
                    
                    //this.materias = response.data['datos']
                     }else{
                      this.message = response.data.message
                      console.log('aki esta el error'+response.data.message);
                    }

                  
                    
                }
            ).catch(error => { 
          console.log(error)
          show_alerta(error,'error')
        });                         
    }
  }
}
</script>

<style>
/*@import 'bootstrap';*/
@import 'datatables.net-bs5';

/*@import 'datatables.net-dt';*/
@import 'datatables.net-responsive-dt'; 

table.dtr-inline.collapsed>tbody>tr>td.dtr-control, table.dataTable.dtr-inline.collapsed>tbody>tr>th.dtr-control {
    position: relative;
    padding-left: 30px;
    cursor: pointer;
}
table.dataTable.dtr-inline.collapsed>tbody>tr.parent>td.dtr-control:before, table.dataTable.dtr-inline.collapsed>tbody>tr.parent>th.dtr-control:before {
    content: "-";
    background-color: #d33333;
}
table.dataTable.dtr-inline.collapsed>tbody>tr>td.dtr-control:before, table.dataTable.dtr-inline.collapsed>tbody>tr>th.dtr-control:before {
    top: 33%;
    left: 5px;
    height: 1em;
    width: 1em;
    margin-top: -5px;
    display: block;
    position: absolute;
    color: white;
    border: .15em solid white;
    border-radius: 1em;
    box-shadow: 0 0 0.2em #444;
    box-sizing: content-box;
    text-align: center;
    text-indent: 0 !important;
    font-family: "Courier New",Courier,monospace;
    line-height: 1em;
    content: "+";
    background-color: #31b131;
    background-color: #74a2ff;
    
}

</style>
