<template>
  <div class="row mt-3 justify-center">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-secondary text-white text-center">
          EDITAR DOCENTE
        </div>
        <div class="card-body">
          <form @submit="guardar">                      
            
            <div class="input-group mb-3">     
              <input type="text" v-model="nombres" id="nombres" class="form-control" maxlength="50" placeholder="Nombres" required>              
            </div>

            
            <div class="input-group mb-3">   
              <input type="text" v-model="apellidop" id="apellidop" class="form-control" maxlength="50" placeholder="Apellido Paterno" required>
              <input type="text" v-model="apellidom" id="apellidom" class="form-control" maxlength="50" placeholder="Apellido Materno" required>
            </div>


            <div class="input-group mb-3 ">
              <span class="input-group-text"><i class="fa-solid fa-user"></i>
              </span>
              <input type="number" v-model="ci" id="ci" class="form-control col-md-4" maxlength="50" placeholder="C.I." required>                 
            </div>
            
            <div class="input-group mb-3">  
              <span class="input-group-text"><i class="fa-solid fa-phone"></i>
              </span> 
              <input type="number" v-model="celular" id="celular" class="form-control" maxlength="50" placeholder="Celular" required>
              <span class="input-group-text"><i class="fa-solid fa-location-dot"></i>
              </span> 
              <input type="text" v-model="direccion" id="direccion" class="form-control" maxlength="50" placeholder="Direccion" required>              
            </div>
                      

            <div class="input-group mb-3">
              <input type="text" v-model="profesion" id="profesion" class="form-control" maxlength="50" placeholder="Profesion" required>
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
      id:0,nombres:'',apellidop:'',apellidom:'',ci:'',celular:0,direccion:'',profesion:'',estado:'',
      url:'http://127.0.0.1:8000/docentes/docentes'
    }
  },
  mounted() {
     const route =useRoute();
     this.id = route.params.id;
      
     this.url = this.url + '/' +this.id+'/';
     this.getDocente(); 
  },
  methods:{
    getDocente(){
      axios.get(this.url).then(
        response =>(
          console.log(response),
          //revisar lo de fernando de objects
          this.nombres = response.data['nombres'],                    

          this.apellidop=response.data['apellidop'],
          this.apellidom=response.data['apellidom'],
          this.ci=response.data['ci'],
          this.celular=response.data['celular'],
          this.direccion=response.data['direccion'],
          

          this.profesion=response.data['profesion'],
                              
          this.estado=response.data['estado']          
           
        )
      );
    }
    ,
    async guardar(){
      event.preventDefault();
      if(this.nombres.trim()==='')
      {
        show_alerta('El nombre no puede ser vacio','warning','nombre');
      }else{

        const parametros={nombres:this.nombres,
                          apellidop:this.apellidop,
                          apellidom:this.apellidom,
                          ci:this.ci,
                          celular:this.celular,
                          direccion:this.direccion,
                          profesion:this.profesion,
                          estado:this.estado,                          
                        };


       
        //const parametros={nombre_provincia:this.nombre.trim()};
        const principal = '/docentes';
        await sendRequest('PUT',parametros,this.url,'Docente Actualizado Exitosamente!',principal);
        this.$router.push('/docentes')
        
      }
    }
  }
}
</script>
