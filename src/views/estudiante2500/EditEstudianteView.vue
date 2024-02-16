<template>
  <div class="row mt-3 justify-center">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-header bg-secondary text-white text-center">
          EDITAR ESTUDIANTE
        </div>
        <div class="card-body">
          <form @submit="guardar">

            <div class="input-group mb-3">   
              C.I. :
            </div>

            <div class="input-group mb-3 ">
              <!-- <span class="input-group-text"><i class="fa-solid fa-file-lines"></i> 
              </span>                -->
              
            
              <div v-if="ci_especial" :value="ci_especial" id="ci_especial" class="input-group mb-3 d-inline p-2 bg-primary text-white rounded">                                 
                  {{ ci_especial }}                               
              </div>
              <div v-else id="ci_estudiante" :value="ci_estudiante" class="input-group mb-3 d-inline p-2 bg-primary text-white rounded">                 
                {{ ci_estudiante }}
              </div>

              <!-- <input v-if="ci_especial" type="text" v-model="ci_especial" id="ci_especial" class="form-control col-md-4" maxlength="100" placeholder="C.I. Especial" required>   
              <input v-else type="text" v-model="ci_estudiante" id="ci_estudiante" class="form-control col-md-4" maxlength="100" placeholder="C.I." required>   -->
              
            </div>

            <div class="input-group mb-3">     
              <input type="text" v-model="extencion" id="extencion" class="form-control" maxlength="100" placeholder="Extencion">
            </div>
            
            <div class="input-group mb-3">     
              <input type="text" v-model="nombres" id="nombres" class="form-control" maxlength="100" placeholder="Nombres" required>              
            </div>

            
            <div class="input-group mb-3">   
              <input type="text" v-model="apellidoP" id="apellidoP" class="form-control" maxlength="100" placeholder="Apellido Paterno" required>
              <input type="text" v-model="apellidoM" id="apellidoM" class="form-control" maxlength="100" placeholder="Apellido Materno" required>
            </div>
           
            <div class="input-group mb-3">   
              <input type="text" v-model="direccion" id="direccion" class="form-control" maxlength="100" placeholder="Direccion" required>
              <input type="number" v-model="celular" id="celular" class="form-control" maxlength="100" placeholder="Celular" required>
            </div>
          
            <div class="input-group mb-3">                            
              <select class="form-select text-center" id="codigo_carrera" required v-model="codigo_carrera">              
                <option value="" selected disabled>
                ---Carrera---
                </option>
                <option  v-for="carrera in carreras" v-bind:value="carrera.codigo_carrera" :key="carrera.codigo_carrera">
                    {{`${carrera.nombre_carrera}`}}
                </option>
              </select>                             
            </div>

            <div class="input-group mb-3">   
              <input type="text" v-model="anio_ingreso" id="anio_ingreso" class="form-control" maxlength="100" placeholder="Año de Ingreso" required>
              <input type="text" v-model="anio_cursado" id="anio_cursado" class="form-control" maxlength="100" placeholder="Año Cursado" required>
            </div>

            <div class="input-group mb-3">
              <select class="form-select" id="genero" required v-model="genero">
                <option class="text-center" value="" selected>---Genero---</option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
              </select>  
            </div>

            <div class="input-group mb-3">
              <input type="date" v-model="fecha_nacimiento" id="fecha_nacimiento" class="form-control" maxlength="100" placeholder="Fecha Nacimiento" required>
            </div>
                    

            <div class="input-group mb-3"> 

              <select class="form-select text-center" @change="onChange($event)" id="depa_nacimiento" required v-model="depa_nacimiento">              
                <option :value="depa_nacimiento" selected >{{depa_nacimiento}}
                <!-- ---Departamento Nacimiento--- -->
                </option>
                <option  v-for="departamento in departamentos" v-bind:value="departamento.nombre_departamento" :key="departamento.id">
                    {{`${departamento.nombre_departamento}`}}
                </option>
              </select> 

              <!-- <input type="text" v-model="depa_nacimiento" id="depa_nacimiento" class="form-control" maxlength="100" placeholder="Departamento Nacimiento" required> -->
            </div>


            <!-- AÑADIDOS -->
            <div class="input-group mb-3"> 
              
              <select class="form-select text-center" id="prov_nacimiento" required v-model="prov_nacimiento">              
                <!-- ARREGLAR ESTA OPCION QUE  -->
                <option :value="prov_nacimiento" selected>{{prov_nacimiento}}
                </option>
                <option  v-for="provincia in provincias" v-bind:value="provincia.nombre_provincia" :key="provincia.id">
                    {{`${provincia.nombre_provincia}`}}
                </option>
              </select> 
              <!-- <input type="text" v-model="prov_nacimiento" id="prov_nacimiento" class="form-control" maxlength="55" placeholder="Provincia Nacimiento" required> -->
            </div>

            <!-- <div class="input-group mb-3"> 
              <input type="text" v-model="munic_nacimiento" id="munic_nacimiento" class="form-control" maxlength="55" placeholder="Municipio Nacimiento" required>
            </div> -->

            <div class="input-group mb-3"> 
              <input type="text" v-model="tipo_ingreso" id="tipo_ingreso" class="form-control" maxlength="55" placeholder="Tipo Ingreso" required>
            </div>
            <!-- AÑADIDOS -->

            <div class="input-group mb-3">  
              <!-- <span class="input-group-text"><i class="fa-solid fa-user"></i> Fotografia</span> &nbsp; -->
              <!-- <input ref="file" @change="cargar()"  type="file"> -->

            <input type="text" v-model="fotografia" id="fotografia" class="form-control" maxlength="300" placeholder="Fotografia" >
            </div>
            <div class="input-group mb-3">   
              <select class="form-select" id="estado_civil" required v-model="estado_civil">
                <option class="text-center" value=""  selected>---Estado Civil---</option>
                <option value="casado(a)">Casado(a)</option>
                <option value="soltero(a)">Soltero(a)</option>
              </select> 
              
            </div>
            <div class="input-group mb-3">                 
              <select class="form-select text-center" id="idioma_nativo" required v-model="idioma_nativo">              
                <option value="" selected disabled>
                ----------Idioma Nativo------------
                </option>
                <option  v-for="idioma in idiomas" v-bind:value="idioma.nombre_idioma" :key="idioma.nombre_idioma">
                    {{`${idioma.nombre_idioma}`}}
                </option>
              </select>     
              <input type="text" v-model="idioma_regular" id="idioma_regular" class="form-control" maxlength="100" placeholder="Idioma Regular" required>
            </div>
          
            <div class="input-group mb-3">   
              <input type="text" v-model="email" id="email" class="form-control" maxlength="100" placeholder="Email" required>
            </div>

            <div class="input-group mb-3">                 
              <select class="form-select" id="nacionalidad" v-model="nacionalidad">
                <option class="text-center" value=""  selected>---Nacionalidad---</option>
                <option value="Boliviano(a)">Boliviano(a)</option>
                <option value="Extranjero(a)">Extranjero(a)</option>
              </select>
            </div>

            <div class="input-group mb-3">   
              NUMERO DE REGISTRO:
            </div>

            <div class="input-group mb-3">   
              <input type="text" v-model="numero_registro" id="numero_registro" class="form-control" maxlength="100" placeholder="Numero de Registro" required>
            </div>

            <!-- AÑADIDOS -->
            <div class="input-group mb-3">   
              NUMERO DE ARCHIVO:
            </div>

            <div class="input-group mb-3">   
              <input type="number" v-model="numero_archivo" id="numero_archivo" class="form-control" maxlength="100" placeholder="Numero de Archivo" required>
            </div>            

            <!-- AÑADIDOS -->

            <div class="input-group mb-3">   
              <input type="text" v-model="homologacion" id="homologacion" class="form-control" maxlength="100" placeholder="Homologacion" data-bs-toggle="tooltip" data-bs-placement="top" title="Homologacion">
            </div>
            <div class="input-group mb-3">   
              <input type="text" v-model="estado_homologacion" id="estado_homologacion" class="form-control" maxlength="100" placeholder="Estado Homologacion" >
            </div>
            <div class="input-group mb-3">   
              <input type="text" v-model="convalidacion" id="convalidacion" class="form-control" maxlength="100" placeholder="Convalidacion" >
            </div>
            <div class="input-group mb-3">   
              <input type="text" v-model="estado_convalidacion" id="estado_convalidacion" class="form-control" maxlength="100" placeholder="Estado Convalidacion" >
            </div>
            <div class="input-group mb-3">   
              <input type="text" v-model="egresado" id="egresado" class="form-control" maxlength="100" placeholder="Egresado" >
            </div>
            <div class="input-group mb-3">   
              <input type="text" v-model="estado_egresado" id="estado_egresado" class="form-control" maxlength="100" placeholder="Estado Egresado" >
            </div>
            <div class="input-group mb-3">   
              <input type="text" v-model="titulado" id="titulado" class="form-control" maxlength="100" placeholder="Titulado" >
            </div>
            <div class="input-group mb-3">   
              <input type="text" v-model="descripcion_titulado" id="descripcion_titulado" class="form-control" maxlength="100" placeholder="Descripcion Titulado" >
            </div>


            <div class="input-group mb-3">   
              OBSERVACIONES:
            </div>

            <div class="input-group mb-3">   
              <input type="text" v-model="obs1" id="obs1" class="form-control" maxlength="100" placeholder="Obersvacion 1" >
            </div>

            <div class="input-group mb-3">   
              <input type="text" v-model="obs2" id="obs2" class="form-control" maxlength="100" placeholder="Observacion 2" >
            </div>

            <div class="input-group mb-3">   
              <input type="text" v-model="obs3" id="obs3" class="form-control" maxlength="100" placeholder="Observacion 3" >
            </div>

            <div class="input-group mb-3"> 
              <select class="form-select text-center" id="estado" required v-model="estado">
                <option value="" selected>---Estado---</option>
                <option value="habilitado">Habilitado</option>
                <option value="inhabilitado">Inhabilitado</option>
              </select>                 
            </div>
            <div class="input-group mb-3">   
              <input type="text" v-model="descripcion_estado" id="descripcion_estado" class="form-control" maxlength="100" placeholder="Descripcion Estado">
            </div>
            <div class="input-group mb-3">   
              <select class="form-select text-center" id="baja" required v-model="baja">
                <option value="" selected>---Baja---</option>
                <option value="si">Si</option>
                <option value="no">No</option>
              </select>    
              
            </div>
              

            <!-- </div> -->
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
//import {ref} from 'vue';
import axios from 'axios';

export default {
  name: 'EditEstudianteView',
  // setup(){
  //   const file = ref(null)
  //   const cargar = async() => {
  //          // debugger;
  //           console.log("selected file",file.value.files)
  //           //Upload to server
  //       }
  //       return {
  //         cargar,
  //         file
  //      }
  // },
  data(){
    return {
      ci_estudiante:0,extencion:'',nombres:'',apellidoP:'',apellidoM:'',direccion:'',celular:0,anio_ingreso:'',anio_cursado:'',genero:'',fecha_nacimiento:'',depa_nacimiento:'',prov_nacimiento:'',munic_nacimiento:'',tipo_ingreso:'',
      fotografia:'',estado_civil:'',idioma_nativo:'',idioma_regular:'',email:'',nacionalidad:'',numero_archivo:'',
      homologacion:'',estado_homologacion:'',convalidacion:'',estado_convalidacion:'',egresado:'',estado_egresado:'',titulado:'',descripcion_titulado:'',
      numero_registro:0,obs1:'',obs2:'',obs3:'',estado:'',descripcion_estado:'',baja:'',codigo_carrera:0,
      ci_especial:'',
      idiomas:null,carreras:null,principal:'',provincias:null,departamentos:null,noencontrado:true,
      url:'http://127.0.0.1:8000/estudiantes/estudiantes'
    }
  },
   mounted() {
     const route =useRoute();
     this.id = route.params.id;
      
     this.url = this.url + '/' +this.id+'/';
     this.getEstudiante();     
     this.getIdiomas();
     this.getCarreras();
     this.getProvincias();    
     this.getDepartamentos();
    //  this.provincias.forEach(element => {
    //   if(element===this.prov_nacimiento)
    //   {
    //     noencontrado=false;        
    //   }
    //  }); 


     this.principal='/estudiantes';
  },
  methods:{
    getEstudiante(){
      axios.get(this.url).then(
        response =>(
          console.log(response),
          //revisar lo de fernando de objects
          this.nombres = response.data['nombres'],
          this.ci_estudiante=response.data['ci_estudiante'],
          this.extencion=response.data['extencion'],

          this.apellidoP=response.data['apellidoP'],
          this.apellidoM=response.data['apellidoM'],
          this.direccion=response.data['direccion'],
          this.celular=response.data['celular'],

          this.anio_ingreso=response.data['anio_ingreso'],
          this.anio_cursado=response.data['anio_cursado'],

          this.genero=response.data['genero'],
          this.fecha_nacimiento=response.data['fecha_nacimiento'],
          this.depa_nacimiento= response.data['depa_nacimiento'].toUpperCase(),
          this.prov_nacimiento=response.data['prov_nacimiento'],

          //this.munic_nacimiento=response.data['munic_nacimiento'],

          this.tipo_ingreso=response.data['tipo_ingreso'],

          this.fotografia=response.data['fotografia'],
          this.estado_civil=response.data['estado_civil'],
          this.idioma_nativo=response.data['idioma_nativo'],
          this.idioma_regular=response.data['idioma_regular'],
          this.email=response.data['email'],

          this.nacionalidad=response.data['nacionalidad'],
          this.numero_archivo=response.data['numero_archivo'],
          
          this.homologacion=response.data['homologacion'],
          this.estado_homologacion=response.data['estado_homologacion'],
          this.convalidacion=response.data['convalidacion'],
          this.estado_convalidacion=response.data['estado_convalidacion'],
          this.egresado=response.data['egresado'],
          this.estado_egresado=response.data['estado_egresado'],
          this.titulado=response.data['titulado'],
          this.descripcion_titulado=response.data['descripcion_titulado'],

          this.numero_registro=response.data['numero_registro'],
          this.obs1=response.data['obs1'],
          this.obs2=response.data['obs2'],
          this.obs3=response.data['obs3'],


          this.estado=response.data['estado'],
          this.descripcion_estado=response.data['descripcion_estado'],
          this.baja=response.data['baja'],
          this.codigo_carrera=response.data['codigo_carrera'],
          this.ci_especial=response.data['ci_especial']
           
        )
      ).catch(error => { 
          console.log(error)
          show_alerta(error,'error')
        });
        
      console.log('esto es:'+typeof(this.estado_civil));      
    },
    verificarProvincia(){

    },
    getIdiomas()
    {
      axios.get('http://127.0.0.1:8000/parametros/idiomasOriginarios/')
            .then(            
                response =>(
                    this.idiomas = response.data                        
                )
            ).catch(error => { 
          console.log(error)
          show_alerta(error,'error')
        });           
    },
    getCarreras()
    {
      axios.get('http://127.0.0.1:8000/parametros/carreras/')
            .then(            
                response =>(
                    this.carreras = response.data                        
                )
            ).catch(error => { 
          console.log(error)
          show_alerta(error,'error')
        });           
    },
   async getProvincias()
    {
      await axios.get('http://127.0.0.1:8000/parametros/provincias/')
            .then(            
                response =>(
                    this.provincias = response.data                        
                )
            );            
    },
    async getDepartamentos()
    {
      await axios.get('http://127.0.0.1:8000/parametros/departamentos/')
            .then(            
                response =>(
                    this.departamentos = response.data                        
                )
            );            
    },
    async guardar(){
      event.preventDefault();
      
      // if(this.ci_especial!=='')
      // {
      //   const sin_complemento =this.ci_especial.split('-')[0];
      //   this.ci_estudiante=sin_complemento;
      //   console.log('sin_complemento:'+sin_complemento);    
      // }
      if(this.nombres.trim()==='')
      {
        show_alerta('El nombre no puede ser vacio','warning','nombre');
      }else{

        const parametros={ci_estudiante:this.ci_estudiante,
                          extencion:this.extencion,
                          nombres:this.nombres,
                          apellidoP:this.apellidoP,
                          apellidoM:this.apellidoM,
                          direccion:this.direccion,
                          celular:this.celular,
                          anio_ingreso:this.anio_ingreso,
                          anio_cursado:this.anio_cursado,

                          genero:this.genero,fecha_nacimiento:this.fecha_nacimiento,
                          depa_nacimiento:this.depa_nacimiento,
                          prov_nacimiento:this.prov_nacimiento,

                          //munic_nacimiento:this.munic_nacimiento,

                          tipo_ingreso:this.tipo_ingreso,
                          fotografia:this.fotografia,
                          estado_civil:this.estado_civil,
                          idioma_nativo:this.idioma_nativo,
                          idioma_regular:this.idioma_regular,
                          email:this.email,
                          nacionalidad:this.nacionalidad,

                          numero_archivo:this.numero_archivo,

                          homologacion:this.homologacion,
                          estado_homologacion:this.estado_homologacion,
                          convalidacion:this.convalidacion,
                          estado_convalidacion:this.convalidacion,
                          egresado:this.egresado,
                          estado_egresado:this.estado_egresado,
                          titulado:this.titulado,
                          descripcion_titulado:this.descripcion_titulado,

                          numero_registro:this.numero_registro,

                          obs1:this.obs1,
                          obs2:this.obs2,
                          obs3:this.obs3,

                          estado:this.estado,
                          descripcion_estado:this.descripcion_estado,
                          baja:this.baja,
                          //numero_registro:20202025,
                          codigo_carrera:this.codigo_carrera,
                          ci_especial:this.ci_especial
                        };


        //const parametros={nombre_provincia:this.nombre.trim()};
        console.log(parametros);
        await sendRequest('PUT',parametros,this.url,'Estudiante Actualizado Exitosamente!',this.principal);
        this.$router.push('/estudiantes')
      }
    }
  }
}
</script>
