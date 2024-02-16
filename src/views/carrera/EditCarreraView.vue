<template>
  <div class="row mt-3 justify-center">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-secondary text-white text-center">
          EDITAR CARRERA
        </div>
        <div class="card-body">
          <form @submit="guardar">                      
            
            <div class="input-group mb-3">
                <div class="input-group mb-3">   
                  CODIGO CARRERA:
               </div> 
              <div :value="codigo_carrera" id="codigo_carrera" class="input-group mb-3 d-inline p-2 bg-primary text-white rounded">{{ codigo_carrera }}</div> 
              <!-- <input type="text" v-model="codigo_carrera" id="codigo_carrera" class="form-control" maxlength="50" placeholder="Codigo Carrera" required>               -->
            </div>

            
            <div class="input-group mb-3">   
              <input type="text" v-model="nombre_carrera" id="nombre_carrera" class="form-control" maxlength="50" placeholder="Nombre Carrera" required>             
            </div>

            
                      

            <div class="input-group mb-3">
              <input type="text" v-model="descripcion" id="descripcion" class="form-control" maxlength="50" placeholder="Descripcion" required>
            </div>
                    
           
            <div class="input-group mb-3"> 
              <select class="form-select text-center" id="estado" required v-model="estado">
                <option value="" selected>---Estado---</option>
                <option value="habilitado">Habilitado</option>
                <option value="inhabilitado">Inhabilitado</option>
              </select>                 
            </div>
                                    
            <div class="d-grid col-6-mx-auto">
              <button class="btn btn-success">
                <i class="fa-solid fa-floppy-disk"></i> Guardar</button></div>            
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { show_alerta,sendRequest } from "../../funciones";
import { useRoute } from "vue-router";
//import {ref,computed} from 'vue';
import axios from 'axios';

export default {
  name: 'EditDocenteView',
  data(){
    return {
      id:0,codigo_carrera:'',nombre_carrera:'',descripcion:'',estado:'',
      url:'http://127.0.0.1:8000/parametros/carreras',
      principal:''
    }
  },
  mounted() {
     const route =useRoute();
     this.id = route.params.id;
      
     this.url = this.url + '/' +this.id+'/';
     this.getCarrera(); 
    this.principal ='/carreras';
  },
  methods:{
    getCarrera(){
      axios.get(this.url).then(
        response =>(
          console.log(response),
          //revisar lo de fernando de objects
          this.codigo_carrera = response.data['codigo_carrera'],                    

          this.nombre_carrera=response.data['nombre_carrera'],
          this.descripcion=response.data['descripcion'],
          this.estado=response.data['estado']                                                       
           
        )
      );
    }
    ,
    async guardar(){
      event.preventDefault();
      if(this.nombre_carrera.trim()==='')
      {
        show_alerta('El nombre no puede ser vacio','warning','nombre');
      }else{

        const parametros={
                          codigo_carrera:this.codigo_carrera,
                          nombre_carrera:this.nombre_carrera,
                          descripcion:this.descripcion,
                          
                          estado:this.estado,                          
                        };


       
        //const parametros={nombre_provincia:this.nombre.trim()};
        //const principal = '/carreras';
        await sendRequest('PUT',parametros,this.url,'Carrera Actualizada Exitosamente!',this.principal);
        this.$router.push('/materias')
      }
    }
  }
}
</script>
