<template>
  <!-- <div class="container-fluid text-center"> -->
  <div class="container-fluid" id="contenido-global">
  <div class="row">
    <div class="mb-3 fw-bold">       

            <div class="mb-3 fs-4 text-center">                 
             LISTA DE ESTUDIANTES HABILITADOS PARA LA INSCRIPCION:
            </div>

            <!-- <div class=" mb-3">                 
              APELLIDOS Y NOMBRES:    {{`${apellidoP} ${apellidoM} ${nombres}`}}
            </div>
            
            <div class=" mb-3">                 
              CEDULA DE IDENTIDAD:     {{`${ci_estudiante}`}}
            </div>

            <div class=" mb-3">                 
              NRO DE REGISTRO:       {{`${numero_registro}`}}
            </div>

            <div class=" mb-3">                 
              CARRERA:         {{`${nombre_carrera}`}}
            </div>

            <div class=" mb-3">                 
              APELLIDOS Y NOMBRES:      {{`${apellidoP} ${apellidoM} ${nombres}`}}
            </div>

            <div class=" mb-3">                 
              FECHA DE EMISION :         {{`${fecha_emision}`}}
            </div> -->

     </div>
  </div>


   <div class="row">
      <!-- <div class="col-lg-12 col-sm-12 offset-lg-2 align-center"> -->
        <!-- <div class="col-lg-12 col-sm-12 align-center"> -->
          <div class="table-responsive text-center">
              <table class="table table-bordered table-hover table-striped col-12">
                  <thead class="pb-4 table-light" v-if="estudiantes">
                    <tr>
                      <th>
                        #
                      </th>
                      <th>
                        C.I. 
                      </th>
                      <th>
                        NOMBRES
                      </th> 
                   
                      <th>
                        APELLIDO P.
                      </th>
                      <th >
                        APELLIDO M.
                      </th>
                      
                      <th>
                        CODIGO CARRERA
                      </th> 
                      <th>
                        NOMBRE CARRERA
                      </th>                 
                      <th>
                        AÑO CURSADO
                      </th>                                                                   
                      <th>
                        ACCIONES
                      </th>
                    </tr></thead>
                    <!-- <div v-else>
                      <img src="loading.gif" alt="iamgen">
                    </div> -->
                  <tbody class="table-group-divider" id="contenido">
                    <tr v-for="estudiante,i  in estudiantes" :key="estudiante.ci_estudiante">
                        <td>{{ i+1 }}</td>
                        <td>{{ estudiante.ci_estudiante }}</td>
                        <td>{{ estudiante.nombres }}</td>
                        <td>{{ estudiante.apellidoP }}</td>
                        <td>{{ estudiante.apellidoM }}</td>
                        <td>{{ estudiante.codigo_carrera }}</td>
                        <td>{{ estudiante.nombre_carrera }}</td>
                        <td>{{ estudiante.anio_cursado }}</td>                        
                        <!-- <td>{{ estudiante.nombre_asignatura }}</td> -->
                        <!-- <td >{{ estudiante.id_docente }}</td> -->

                        <!-- <td >{{ estudiante.estado_gestion_espaniol }}</td> -->
                          <!--  <td>{{ getCarrera(estudiante.id_carrera) }}</td> -->
                        <!-- <td>{{ estudiante.nota_num_final }}</td> -->

                        
                        <td>                                                                                 
                            <!-- <button   class="btn btn-warning" >
                              INCRIBIR
                              <i class="fa-solid fa-school"></i>
                            </button>     -->
                            <router-link :to="{path:'/estudiante/ofertas/'+estudiante.ci_estudiante}" class="btn btn-warning" v-if="estudiante.inscrito_gestion=='no'">
                                INSCRIBIR<i class="fa-solid fa-school"></i>
                            </router-link>
                            <button   class="btn btn-success disabled" v-else >
                              INSCRITO
                              <i class="fa-solid fa-school"></i>
                            </button>
                             <!-- <router-link :to="{path:'/estudiante/ofertas/'+estudiante.ci_estudiante}" class="btn btn-success disabled" v-else>
                                INSCRITO <i class="fa-solid fa-school"></i>
                            </router-link>                        -->
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
import {show_alerta} from '../../funciones';

//import html2pdf from "html2pdf.js";
//import {ref} from 'vue';
// const provincias = computed(()=>{
//         return this.provincias = this.getProvincias()
// })
//const provincias = ref([]);
 //const contador =ref(0);
export default {
  name: 'AprobadasEstudianteView',
  data(){
    return {estudiantes:null,carreras:[],principal:'',
    ci_estudiante:'',nombres:'',apellidoP:'',apellidoM:'',codigo_carrera:'',nombre_carrera:'',anio_cursado:'',inscrito_gestion:'',
    materias:null,
    url:'http://127.0.0.1:8000/administracion/obtenerEstudiantesInscripcion/'
  }
  },
  mounted(){
   //devuelve los estudiantes habilitados para inscribirse
    this.getEstudiantesHabilitados();
    //ruta de navegacion despues de la accion eliminar
    this.principal='/estudiantes';
  },
  methods:{       
    getEstudiantesHabilitados(){
          axios.get(this.url)
            .then(            
                response =>(                    

                    this.estudiantes=response.data
                    //this.materias = response.data['datos']
                    
                )
            ).catch(error => { 
          console.log(error)
          show_alerta(error,'error')
        });
        //console.log('s'+this.estudiantes);
            
    }
  }
}
</script>