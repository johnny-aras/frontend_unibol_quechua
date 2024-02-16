<template>
  <div class="row mt-3 justify-center">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-secondary text-white text-center">
          EDITAR ASIGNATURA
        </div>
        <div class="card-body">
          <form @submit="guardar">                               
            

            <div class="input-group mb-3">
                <div class="input-group mb-3">   
                  CODIGO MATERIA:
               </div> 
              <div :value="codigo_asignatura" id="codigo_asignatura" class="input-group mb-3 d-inline p-2 bg-primary text-white rounded">{{ codigo_asignatura }}</div> 
              <!-- <input type="text" v-model="codigo_carrera" id="codigo_carrera" class="form-control" maxlength="50" placeholder="Codigo Carrera" required>               -->
            </div>

            <!-- <div class="input-group mb-3">     
              <input type="text" v-model="codigo_asignatura" id="nombres" class="form-control" maxlength="50" placeholder="Codigo Materia" required>              
            </div> -->

            <div class="input-group mb-3">     
              <input type="text" v-model="nombre_asignatura" id="nombre_asignatura" class="form-control" maxlength="50" placeholder="Nombre Materia" required>              
            </div>

            <div class="input-group mb-3">     
              <input type="text" v-model="descripcion" id="descripcion" class="form-control" maxlength="100" placeholder="Descripcion" required>              
            </div>

            <!-- <div class="input-group mb-3"> 
              <select class="form-select text-center" id="estado" required v-model="id_docente">              
                <option value="" selected disabled>
                ----------------Docente----------------
                </option>
                <option  v-for="docente in docentes" v-bind:value="docente.id" :key="docente.id">
                    {{`${docente.nombres} ${docente.apellidop} ${docente.apellidom}`}}
                </option>
              </select>                 
            </div> -->

          

            <div class="input-group mb-3">   
              <input type="number" v-model="horas_practicas" id="horas_practicas" class="form-control" maxlength="50" placeholder="Horas Practicas" required>
              <input type="number" v-model="horas_teoricas" id="horas_teoricas" class="form-control" maxlength="50" placeholder="Horas Teoricas" required>
            </div>


            <div class="input-group mb-3 ">
              <span class="input-group-text"><i class="fa-solid fa-helmet-safety"></i>
              </span>
              <input type="number" v-model="total_horas" id="total_horas" class="form-control col-md-4" maxlength="50" placeholder="total_horas" required>                 
            </div>
            
            

            <div class="input-group mb-3">
              <input type="text" v-model="pre_requisito1" id="pre_requisito1" class="form-control" maxlength="50" placeholder="Pre Requisito1" required>
            </div>

            <div class="input-group mb-3">
              <input type="text" v-model="pre_requisito2" id="pre_requisito2" class="form-control" maxlength="50" placeholder="Pre Requisito2" required>
            </div>

            <div class="input-group mb-3">
              <!-- <input type="text" v-model="anio_asignado" id="anio_asignado" class="form-control" maxlength="50" placeholder="Año Asignado" required> -->

              <select class="form-select text-center" id="anio_asignado" required v-model="anio_asignado">              
                <option value="" selected disabled>
                ---AÑO ASIGNADO---
                </option>
                <option  v-for="anios in anios_asignados" v-bind:value="anios.nombre_anio" :key="anios.nombre_anio">
                    {{`${anios.nombre_anio}`}}
                </option>
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
  name: 'EditMateriaView',
  data(){
        return {
          id:0,codigo_asignatura:'',nombre_asignatura:'',descripcion:'',id_docente:'',horas_practicas:'',horas_teoricas:'',total_horas:'',
          pre_requisito1:'',pre_requisito2:'',anio_asignado:'',docentes:null,anios_asignados:null,principal:'',
          url:'http://127.0.0.1:8000/parametros/asignaturas'
        }
  },
  mounted() {
     const route =useRoute();
     this.id = route.params.id;
      
     this.url = this.url + '/' +this.id+'/';
     this.getMateria(); 
     this.getDocentes();     
     this.getAniosAsignados();
     this.principal='/materias';
  },
  methods:{
    getMateria(){
      axios.get(this.url).then(
        response =>(                 
          //revisar lo de fernando de objects
          this.codigo_asignatura = response.data['codigo_asignatura'],                    

          this.nombre_asignatura=response.data['nombre_asignatura'],
          this.descripcion=response.data['descripcion'],
          this.id_docente=response.data['id_docente'],
          this.horas_practicas=response.data['horas_practicas'],
          this.horas_teoricas=response.data['horas_teoricas'],
          this.total_horas=response.data['total_horas'],          
          this.pre_requisito1=response.data['pre_requisito1'],
          this.pre_requisito2=response.data['pre_requisito2'],                              
          this.anio_asignado=response.data['anio_asignado']
        )
      ).catch(error => { 
          console.log(error)
          show_alerta(error,'error')
        });
        console.log('esto es:'+this.anio_asignado);
    },
    getDocentes()
    {
      axios.get('http://127.0.0.1:8000/docentes/docentes/')
            .then(            
                response =>(
                    this.docentes = response.data                        
                )
            ).catch(error => { 
          console.log(error)
          show_alerta(error,'error')
        });           
    },
    getAniosAsignados()
    {
      axios.get('http://127.0.0.1:8000/parametros/aniosCarreras/')
            .then(            
                response =>(
                    this.anios_asignados = response.data                        
                )
            )             
    },
    async guardar(){
      event.preventDefault();
      if(this.nombre_asignatura.trim()==='')
      {
        show_alerta('El nombre no puede ser vacio','warning','nombre_asignatura');
      }else{
        const parametros={codigo_asignatura:this.codigo_asignatura,
                          nombre_asignatura:this.nombre_asignatura,
                          descripcion:this.descripcion,
                          id_docente:this.id_docente,
                          horas_practicas:this.horas_practicas,
                          horas_teoricas:this.horas_teoricas,
                          total_horas:this.total_horas,

                          pre_requisito1:this.pre_requisito1,
                          pre_requisito2:this.pre_requisito2,
                          anio_asignado:this.anio_asignado,
                        }


       
        //const parametros={nombre_provincia:this.nombre.trim()};
       await sendRequest('PUT',parametros,this.url,'Materia Actualizada Exitosamente!',this.principal);
        this.$router.push('/materias')
      }
    }
  }
}
</script>
