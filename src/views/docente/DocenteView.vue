<template>
  <div class="container text-center">
  <div class="row">
    <div class="mb-3">
      <div class="d-grid col-6-mx-auto offset-md-9">
              <button class="btn btn-success">                
                <router-link to="/docente/create" class="nav-link active" href="#">Nuevo Docente</router-link> &nbsp;<i class="fa-solid fa-graduation-cap"></i>  
              </button></div>   
                 
     </div>
  </div>
   <div class="row">
      <!-- <div class="col-lg-12 col-sm-12 offset-lg-2 align-center"> -->
        <!-- <div class="col-lg-12 col-sm-12 align-center"> -->
          <div class="table-responsive">
              <table class="table table-bordered table-hover table-striped col-12">
                  <thead class="table-light" v-if="docentes">
                    <tr>                     
                      <th >
                        NOMBRES
                      </th>
                      <th>
                        APELLIDO-P.
                      </th>
                      <th>
                        APELLIDO-M.
                      </th> 
                      <th >
                        C.I.
                      </th>
                      <th>
                        CELULAR
                      </th> 
                      <th >
                        DIRECCION
                      </th>
                      <th>
                        PROFESION
                      </th>
                      <th >
                        ESTADO
                      </th>
                      <th>
                        ACCIONES
                      </th>
                    </tr></thead>
                    <div v-else>
                      <img :src="ruta" alt="iamgen">
                    </div>
                  <tbody class="table-group-divider" id="contenido">
                    <tr v-for="docente in docentes" :key="docente.id">
                      
                        <td>{{ docente.nombres }}</td>
                        <td>{{ docente.apellidop }}</td>
                        <td >{{ docente.apellidom }}</td>

                        <td >{{ docente.ci }}</td>

                        <td >{{ docente.celular }}</td>
                        <td >{{ docente.direccion }}</td>
                        <td >{{ docente.profesion  }}</td>
                        <td >{{ docente.estado  }}</td>
                        <td>
                            <router-link :to="{path:'/docente/edit/'+docente.id}" class="btn btn-outline-warning">
                                <i class="fa-solid fa-edit"></i>
                            </router-link> &nbsp;
                            <button   class="btn btn-outline-danger" v-on:click="eliminar(docente.id,docente.nombres)">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>                    
                  </tbody>
              </table>
          <!-- </div> -->
      </div>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
//import {ref} from 'vue';
import axios from "axios";
import {confirmar1} from '../../funciones';
//import {ref} from 'vue';
// const provincias = computed(()=>{
//         return this.provincias = this.getProvincias()
// })
//const provincias = ref([]);
 //const contador =ref(0);
export default {
  name: 'DocenteView',
  data(){
    return {docentes:null,ruta:'../loading.gif'}
  },
  mounted(){
    this.getDocentes();      
  },
  methods:{
    getDocentes(){
            axios.get('http://127.0.0.1:8000/docentes/docentes/')
            .then(            
                response =>(
                    this.docentes = response.data                        
                )
            );
            
    },eliminar(id,nombre){
    //   for (let index = 0; index < 10; index++) {
    //     sendRequest('POST',{
    //     "id":999,
    //     "nombre_provincia": "TEST-PROVINCIAS",
    //     "id_departamento": null
    // },'http://127.0.0.1:8000/parametros/provincias/','ProvinciaS Eliminada');              
    //   }

    //linea adicional recientemente añadida
      const principal = '/docentes';
      const ruta = 'docentes/docentes/'+id+'/';
      confirmar1(id,nombre,ruta,principal);          
    },   
  }
}
</script>
