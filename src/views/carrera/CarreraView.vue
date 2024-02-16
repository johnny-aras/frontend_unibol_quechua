<template>
  <div class="container text-center">
  <div class="row">
    <div class="mb-3">
      <div class="d-grid col-3-mx-auto offset-md-9">
              <button class="btn btn-success">                
                  <router-link to="/carrera/create" class="nav-link active">Nueva Carrera</router-link><i class="fa-solid fa-building-columns"></i>
              </button></div>   
                 
     </div>
  </div>
   <div class="row">
      <!-- <div class="col-lg-12 col-sm-12 offset-lg-2 align-center"> -->
        <!-- <div class="col-lg-12 col-sm-12 align-center"> -->
          <div class="table-responsive">
              <table class="table table-bordered table-hover table-striped col-12">
                  <thead class="table-light" v-if="carreras">
                    <tr>                     
                      <th >
                        CODIGO CARRERA
                      </th>
                      <th>
                        NOMBRE CARRERA
                      </th>
                      <th>
                        DESCRIPCION
                      </th> 
                      <th>
                        ESTADO
                      </th>                      
                      <th class="col-2">
                        ACCIONES
                      </th >
                    </tr></thead>
                    <div v-else>
                      <img :src="ruta" alt="iamgen">
                    </div>
                  <tbody class="table-group-divider" id="contenido">
                    <tr v-for="carrera in carreras" :key="carrera.codigo_carrera">
                      
                        <td>{{ carrera.codigo_carrera }}</td>
                        <td>{{ carrera.nombre_carrera }}</td>
                        <td >{{ carrera.descripcion }}</td>

                        <td >{{ carrera.estado }}</td>                        
                        <td>
                            <router-link :to="{path:'/carrera/edit/'+carrera.codigo_carrera}" class="btn btn-outline-warning">
                                <i class="fa-solid fa-edit"></i>
                            </router-link> &nbsp;
                            <router-link :to="{path:'/carrera/mostrarmalla/'+carrera.codigo_carrera}" class="btn btn-outline-warning">
                                <i class="fa-solid fa-table"></i>
                            </router-link> &nbsp;
                            <button   class="btn btn-outline-danger" v-on:click="eliminar(carrera.codigo_carrera,carrera.nombre_carrera)">
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
    return {carreras:null,url:'http://127.0.0.1:8000/parametros/carreras/',principal:'',ruta:'../loading.gif'}
  },
  mounted(){
    this.getCarreras();
    this.principal='/carreras';   
  },
  methods:{
    getCarreras(){
            axios.get(this.url)
            .then(            
                response =>(
                    this.carreras = response.data                        
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
    //const principal = '/docentes';
      const ruta = 'parametros/carreras/'+id+'/';
      confirmar1(id,nombre,ruta,this.principal);      
    },   
  }
}
</script>
