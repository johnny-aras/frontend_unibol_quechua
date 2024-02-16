<template>
  <div class="row mt-3 justify-center">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-secondary text-white text-center">
          CREAR DOCENTE
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
export default {
  name: 'CreateEstudianteView',
  data(){
    return {
      id:0,nombres:'',apellidop:'',apellidom:'',ci:'',celular:0,direccion:'',profesion:'',estado:'',principal:'',
      url:'http://127.0.0.1:8000/docentes/docentes/'
      //nombre:'',url:'http://127.0.0.1:8000/estudiantes/estudiantes/'
    }
  },mounted(){
    
    this.principal='/docentes';
  }
  ,methods:
  {
    async guardar(){
      
      event.preventDefault();
      if(this.nombres.trim()==='')
      {
        show_alerta('Los nombres no puede ser vacio','warning','nombres');
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
                          nombres:this.nombres,
                          apellidop:this.apellidop,
                          apellidom:this.apellidom,
                          ci:this.ci,
                          celular:this.celular,
                          direccion:this.direccion,
                          profesion:this.profesion,
                                                    
                          estado:this.estado,
                          };
        //console.log(parametros);
        
       await sendRequest('POST',parametros,this.url,'Docente Guardado Exitosamente!',this.principal);
        this.$router.push('/docentes')
      }
    }
  }
}
</script>
