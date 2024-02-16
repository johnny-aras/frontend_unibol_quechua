<template>
  <div class="row mt-3 justify-center">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-secondary text-white text-center">
          CREAR ASIGNATURA
        </div>
        <div class="card-body">
          <form @submit="guardar">                      
            
            <div class="input-group mb-3">     
              <input type="text" v-model="codigo_asignatura" id="nombres" class="form-control" maxlength="30" placeholder="Codigo Materia" required>              
            </div>

            
            <div class="input-group mb-3">     
              <input type="text" v-model="nombre_asignatura" id="nombre_asignatura" class="form-control" maxlength="50" placeholder="Nombre Materia" required>              
            </div>


            <div class="input-group mb-3">     
              <input type="text" v-model="descripcion" id="descripcion" class="form-control" maxlength="100" placeholder="Descripcion" required>              
            </div>
            
            <div class="input-group mb-3"> 
              <select class="form-select text-center" id="id_docente" required v-model="id_docente">              
                <option value="" selected disabled>
                ----------------Docente----------------
                </option>
                <option  v-for="docente in docentes" v-bind:value="docente.id" :key="docente.id">
                    {{`${docente.nombres} ${docente.apellidop} ${docente.apellidom}`}}
                </option>
              </select>                 
            </div>
                      

            <div class="input-group mb-3">   
              <input type="number" v-model="horas_practicas" id="horas_practicas" class="form-control" maxlength="50" placeholder="Horas Practicas" required>
              <input type="number" v-model="horas_teoricas" id="horas_teoricas" class="form-control" maxlength="50" placeholder="Horas Teoricas" required>
            </div>
                    
           
            <div class="input-group mb-3 ">
              <span class="input-group-text"><i class="fa-solid fa-helmet-safety"></i>
              </span>
              <input type="number"  v-model="total_horas"  id="total_horas" class="form-control col-md-4" maxlength="50" placeholder="Total Horas" required>                 
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
import axios from 'axios';
export default {
  name: 'CreateMateriaView',
  data(){
    return {      
      id:0,codigo_asignatura:'',nombre_asignatura:'',descripcion:'',id_docente:'',horas_practicas:'',horas_teoricas:'',total_horas:'',
      pre_requisito1:'',pre_requisito2:'',anio_asignado:'',docentes:null,anios_asignados:null,principal:'',
      url:'http://127.0.0.1:8000/parametros/asignaturas/'
      //nombre:'',url:'http://127.0.0.1:8000/estudiantes/estudiantes/'
    }
  },
  mounted() {     
     this.getDocentes();    
     this.getAniosAsignados();
     this.principal='/materias';
  }
  ,methods:
  {
    getDocentes()
    {
      axios.get('http://127.0.0.1:8000/docentes/docentes/')
            .then(            
                response =>(
                    this.docentes = response.data                        
                )
            );            
    },
    getAniosAsignados()
    {
      axios.get('http://127.0.0.1:8000/parametros/aniosCarreras/')
            .then(            
                response =>(
                    this.anios_asignados = response.data                        
                )
            );            
    },
    async guardar(){
      
      event.preventDefault();
      if(this.nombre_asignatura.trim()==='')
      {
        show_alerta('El nombre de la asignatura no puede ser vacio','warning','nombres');
      }
      // else if(this.nombres.trim()==='')
      // {
      //   show_alerta('Los nombres no puede ser vacio','warning','nombres');
      // }else if(this.apellidop.trim()==='')
      // {
      //   show_alerta('EL apellidop no puede ser vacio','warning','apellidop');
      // }else if(this.apellidom.trim()==='')
      // {
      //   show_alerta('EL apellidom no puede ser vacio','warning','apellidom');
      // }
      // else if(this.direccion.trim()==='')
      // {
      //   show_alerta('La direccion  no puede ser vacio','warning','direccion');
      // }          
      // else if(this.fecha_nacimiento.trim()==='')
      // {
      //   show_alerta('La fecha de nacimiento no puede ser vacio','warning','fecha_nacimiento');
      // }
      // else if(this.depa_nacimiento.trim()==='')
      // {
      //   show_alerta('El departamento de nacimiento no puede ser vacio','warning','depa_nacimiento');
      // }
      // else if(this.fotografia.trim()==='')
      // {
      //   show_alerta('La fotografia no puede ser vacio','warning','fotografia');
      // }
     
      // else if(this.idioma_nativo.trim()==='')
      // {
      //   show_alerta('El idioma_nativo no puede ser vacio','warning','idioma_nativo');
      // }
      // else if(this.idioma_regular.trim()==='')
      // {
      //   show_alerta('El idioma regular no puede ser vacio','warning','idioma_regular');
      // }
      // else if(this.email.trim()==='')
      // {
      //   show_alerta('El email no puede ser vacio','warning','email');
      // }
      // else if(this.nacionalidad.trim()==='')
      // {
      //   show_alerta('La nacionalidad  no puede ser vacio','warning','nacionalidad');
      // }
      
      // else if(this.descripcion.trim()==='')
      // {
      //   show_alerta('La descripcion estado  no puede ser vacio','warning','descripcion_estado');
      // }
      else{
                    const parametros={                          
                          codigo_asignatura:this.codigo_asignatura,
                          nombre_asignatura:this.nombre_asignatura,
                          descripcion:this.descripcion,
                          id_docente:this.id_docente,
                          horas_practicas:this.horas_practicas,
                          horas_teoricas:this.horas_teoricas,
                          total_horas:parseInt(this.horas_practicas)+ parseInt(this.horas_teoricas),

                          pre_requisito1:this.pre_requisito1,
                          pre_requisito2:this.pre_requisito2,
                          anio_asignado:this.anio_asignado
                          };        
       await sendRequest('POST',parametros,this.url,'Asignatura Guardada Exitosamente!',this.principal);
        this.$router.push('/asignaturas')
      }
    }
  }
}
</script>
