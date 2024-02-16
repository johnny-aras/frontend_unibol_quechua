<template>
  <div class="container-fluid text-center">
    <div class="row">
      <div class="mb-3">
        <!-- <div class="d-flex justify-content-around">         -->
        <button class="btn btn-outline-success col-2">
          <i class="fa-solid fa-table"></i> <router-link to="/estudiante/curso-preparatorio" class="nav-link active"
            >ESTUDIANTES-PREPARATORIO</router-link>
        </button> &nbsp;
        <button class="btn btn-outline-success col-2 ">
          <i class="fa-solid fa-user-plus"></i> <router-link to="/estudiante/create" class="nav-link active"
            >NUEVO ESTUDIANTE</router-link>
        </button>

        <!-- </div>     -->
      </div>
    </div>
    <div class="row">
      <!-- <div class="col-lg-12 col-sm-12 offset-lg-2 align-center"> -->
      <!-- <div class="col-lg-12 col-sm-12 align-center"> -->
      <div class="col-lg-10 offset-lg-1">
        <div class="table-responsive">
          <table class="table table-bordered table-hover table-striped fixed small responsive">
            <thead class="pb-4 table-light" v-if="estudiantes">
              <tr>
                <th class="col">
                  #
                </th>
                <!-- <th class="d-none d-sm-block pb-4 col"> -->
                <th>
                  C.I.
                </th>
                <th class="col-1">
                  NOMBRES
                </th>
                <th>
                  APELLIDO-P.
                </th>
                <th class="col">
                  APELLIDO-M.
                </th>
                <th class="col">
                  CELULAR
                </th>
                <th class="col-2">
                  CARRERA
                </th>
                <th class="col-1">
                  AÑO DE INGRESO
                </th>
                <th class="col-1">
                  AÑO CURSADO
                </th>
                <!-- <th class="col-1">
                        OBS.1
                      </th>
                      <th class="col-1">
                        OBS.2
                      </th>                       -->
                <th class="col-1">
                  ESTADO
                </th>
                <th class="col-2">
                  ACCIONES
                </th>
              </tr>
            </thead>

            <div v-else>
              <img src="loading.gif" alt="iamgen">
            </div>

            <tbody class="table-group-divider" id="contenido">
              <tr v-for="estudiante, i  in estudiantes" :key="estudiante.ci_estudiante">
                <td>{{ i + 1 }}</td>
                <!-- <td class="d-none d-sm-block pb-4">{{ estudiante.ci_estudiante }}</td> -->
                <td>{{ estudiante.ci_estudiante }}</td>

                <td>{{ estudiante.nombres }}</td>
                <td>{{ estudiante.apellidoP }}</td>
                <td>{{ estudiante.apellidoM }}</td>

                <td>{{ estudiante.celular }}</td>
                <!--  <td>{{ getCarrera(estudiante.id_carrera) }}</td> -->
                <td>{{ estudiante.nombre_carrera }}</td>
                <td>{{ estudiante.anio_ingreso }}</td>
                <td>{{ estudiante.anio_cursado }}</td>
                <!-- <td>{{ estudiante.obs1 }}</td>
                        <td>{{ estudiante.obs2 }}</td> -->
                <!-- <td>{{ estudiante.id_carrera }}</td> -->
                <td>{{ estudiante.estado }}</td>
                <td>

                  <router-link :to="{ path: '/estudiante/materias-cursadas/' + estudiante.ci_estudiante }"
                    class="btn btn-outline-success" 
                    >
                    <!-- data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Historial Academico" -->
                    <i class="fa-solid fa-user-graduate"></i>
                  </router-link> &nbsp;
                  <router-link :to="{ path: '/estudiante/edit/' + estudiante.ci_estudiante }" class="btn btn-outline-warning"  
                    >
                    <!-- data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Editar" -->
                    <i class="fa-solid fa-edit"></i>
                  </router-link> &nbsp;
                  <button class="btn btn-outline-danger" v-on:click="eliminar(estudiante.ci_estudiante, estudiante.nombres)" >
                    <!-- data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Eliminar" -->
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  <!-- FUNCIONA PERO NO ESTA ESTILIZADO -->
                  <!-- <b-button v-b-tooltip.hover title="Tooltip directive content">
                              Hover Me
                            </b-button> -->
                </td>
              </tr>
            </tbody>
          </table>

          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import {ref} from 'vue';
import axios from "axios";
import { confirmar1, show_alerta } from '../../funciones';
//import {ref} from 'vue';
// const provincias = computed(()=>{
//         return this.provincias = this.getProvincias()
// })
//const provincias = ref([]);
//const contador =ref(0);
import { Tooltip } from 'bootstrap'
export default {
  name: 'EstudianteView',
  data() {
    return { estudiantes: null, carreras: [], principal: '', message: '' }
  },
  mounted() {
    this.getEstudiantes();
    //this.getMateriasCursadas();
    //ruta de navegacion despues de la accion eliminar
    this.principal = '/estudiantes';
    new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']",
    })
  },
  methods: {
    async getEstudiantes() {
      await axios.get('http://127.0.0.1:8000/estudiantes/estudiantes/')
        .then(
          response => (
            this.estudiantes = response.data
          )
        );
      console.log(this.estudiantes);
    }, eliminar(id, nombre) {
      //   for (let index = 0; index < 10; index++) {
      //     sendRequest('POST',{
      //     "id":999,
      //     "nombre_provincia": "TEST-PROVINCIAS",
      //     "id_departamento": null
      // },'http://127.0.0.1:8000/parametros/provincias/','ProvinciaS Eliminada');              
      //   }
      const ruta = 'estudiantes/estudiantes/' + id + '/';
      confirmar1(id, nombre, ruta, this.principal);
      //this.$router.push('/estudiantes')    
    },
    getCarrera(id) {
      axios.get('http://127.0.0.1:8000/parametros/carreras/' + id + '/')
        .then(
          response => (
            this.carreras[id] = response.data['nombre_carrera']
          )
        );
      return this.carreras[id]
    }, getMateriasCursadas(id) {
      axios.get('http://127.0.0.1:8000/estudiantes/obtenerAsignaturasCursadas/' + id)
        .then(
          response => {

            if (!response.data.message) {
              console.log('psando normal');
              //this.message = response.data.message,
              this.ci_estudiante = response.data['estudiante']['ci_estudiante'],
                this.nombres = response.data['estudiante']['nombres'],
                this.apellidoP = response.data['estudiante']['apellidoP'],
                this.apellidoM = response.data['estudiante']['apellidoM'],
                this.numero_registro = response.data['estudiante']['numero_registro'],
                this.nombre_carrera = response.data['estudiante']['nombre_carrera'],

                this.fecha_emision = response.data['fecha_emision'],

                this.materias = this.sortGestion(response.data['datos'])

              //this.materias = response.data['datos']
            } else {
              this.message = response.data.message
              console.log('aki esta el error' + response.data.message);
            }



          }
        ).catch(error => {
          console.log(error)
          show_alerta(error, 'error')
        });
    }
  }
}
</script>
<style>
/* body {
    font-size: .875rem;
    line-height: 1.25rem;
} */
</style>