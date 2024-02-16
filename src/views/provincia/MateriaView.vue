<template>
  <div class="container text-center">
  <div class="row">
    <div class="mb-3">
      <div class="d-grid col-6-mx-auto offset-md-9">
              <button class="btn btn-success">                
                <router-link to="/asignatura/create" class="nav-link active" >Nueva Asignatura</router-link> <i class="fa-solid fa-graduation-cap"></i> 
              </button>
      </div>
     </div>
  </div>
   <div class="row">
      <!-- <div class="col-lg-12 col-sm-12 offset-lg-2 align-center"> -->
        <!-- <div class="col-lg-12 col-sm-12 align-center"> -->
          <div class="table-responsive">
              <table class="table table-bordered table-hover table-striped">
                  <thead class="table-light">
                    <tr>                     
                      <th>
                        #
                      </th>
                      <th>
                        CODIGO
                      </th>
                      <th>
                        NOMBRE
                      </th>
                      <th>
                        DESCRIPCION
                      </th>
                      <th>
                        DOCENTE
                      </th>                      
                      <th>
                        HORAS PRACTICAS
                      </th> 
                      <th>
                        HORAS TEORICAS
                      </th>
                      <th>
                        TOTAL HORAS
                      </th> 
                      <th>
                        PRE-REQUISITO1
                      </th>
                      <th>
                        PRE-REQUISITO2
                      </th>
                      <th>
                        AÑO ASIGNADO
                      </th>
                      <th class="col-2">
                        ACCIONES
                      </th>
                    </tr></thead>
                  <tbody class="table-group-divider" id="contenido">
                    <tr v-for="materia,i in materias" :key="materia.id">
                        <td>{{ i+1 }}</td>
                        <td>{{ materia.codigo_asignatura }}</td>
                        <td>{{ materia.nombre_asignatura }}</td>
                        <td>{{ materia.descripcion }}</td>

                        <td>{{ getDocentess(materia.id_docente,materia.codigo_asignatura) }}</td>

                        <td>{{ materia.horas_practicas }}</td>
                        <td>{{ materia.horas_teoricas }}</td>
                        <td >{{ materia.total_horas  }}</td>
                        <td>{{ materia.pre_requisito1  }}</td>
                        <td >{{ materia.pre_requisito2  }}</td>
                        <td >{{ materia.anio_asignado  }}</td>
                        <td>
                            <router-link :to="{path:'/asignatura/edit/'+materia.codigo_asignatura}" class="btn btn-warning">
                                <i class="fa-solid fa-edit"></i>
                            </router-link> &nbsp;
                            <button class="btn btn-danger" @:click="eliminar(materia.codigo_asignatura,materia.nombre_asignatura)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>                    
                  </tbody>
              </table>       
      </div>
    </div>
  </div>

</template>

<script>

import axios from "axios";
import {confirmar1, show_alerta} from '../../funciones';
//import {ref} from 'vue';
// const provincias = computed(()=>{
//         return this.provincias = this.getProvincias()
// })
//const provincias = ref([]);
 //const contador =ref(0);
export default {
  name: 'MateriaView',
  data(){
    return {materias:null,docente:'',docs:[],principal:''}
  },
  mounted(){
    this.getMaterias();
    this.principal='/asignaturas';
  },
  methods:{
    getMaterias(){
            axios.get('http://127.0.0.1:8000/parametros/asignaturas/')
            .then(            
                response =>(
                    this.materias = response.data                        
                )
            );            
    },
    getDocentess(id_doc,codigo_asignatura){
      
      //console.log('aver'+id_doc);
      if(id_doc===null)
      {
        return;
      }else
      if(id_doc!==null||id_doc!=='undefined'||id_doc!=='')
      {      
        console.log(id_doc + codigo_asignatura);
      axios.get('http://127.0.0.1:8000/docentes/docentes/'+id_doc+'/').then(
        response =>(                 
          //revisar lo de fernando de objects
          //this.docente = `${response.data['nombres']} ${response.data['apellidop']} ${response.data['apellidom']}`
          this.docs[codigo_asignatura] = `${response.data['nombres']} ${response.data['apellidop']} ${response.data['apellidom']}`
        )
      ).catch(error => { 
          console.log(error)
          show_alerta(error,'error')
        });
      //console.log('mas:'+docs);
      return this.docs[codigo_asignatura];
      }
    }
    ,eliminar(id,nombre){
    //   for (let index = 0; index < 10; index++) {
    //     sendRequest('POST',{
    //     "id":999,
    //     "nombre_provincia": "TEST-PROVINCIAS",
    //     "id_departamento": null
    // },'http://127.0.0.1:8000/parametros/provincias/','ProvinciaS Eliminada');              
    //   }
      
      const ruta = 'parametros/asignaturas/'+id+'/';
      confirmar1(id,nombre,ruta,this.principal);      
      //this.$router.push('/materias')
    }
  }
}
</script>
