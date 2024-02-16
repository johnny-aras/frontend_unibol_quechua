import { createRouter, createWebHistory } from 'vue-router';

// import HomeView from '../views/HomeView.vue';
// import CreateView from '../views/CreateView.vue';
// import EditView from "../views/EditView.vue";

import EstudianteView from "../views/estudiante2500/EstudianteView.vue";
import CreateEstudianteView from '../views/estudiante/CreateEstudianteView.vue';
import EditEstudianteView from "../views/estudiante/EditEstudianteView.vue";
import CursadasEstudianteView from "../views/estudiante/CursadasEstudianteView.vue";
import HabilitadosEstudianteView from "../views/estudiante/HabilitadosEstudianteView.vue";
import OfertaMateriasEstudianteView from "../views/estudiante/OfertaMateriasEstudianteView.vue";
import EstudianteCursoPreparatorioView from "../views/estudiante/EstudianteCursoPreparatorioView.vue";


//import DocenteView from "../views/docente/DocenteView.vue";
import CreateDocenteView from '../views/docente/CreateDocenteView.vue';
import EditDocenteView from "../views/docente/EditDocenteView.vue";

import MateriaView from "../views/materia/MateriaView.vue";
import CreateMateriaView from '../views/materia/CreateMateriaView.vue';
import EditMateriaView from "../views/materia/EditMateriaView.vue";

import CarreraView from "../views/carrera/CarreraView.vue";
import CreateCarreraView from '../views/carrera/CreateCarreraView.vue';
import EditCarreraView from "../views/carrera/EditCarreraView.vue";

import ReporteView from "../views/ReporteView.vue"


const routes = [
  {
    path: '/',
    redirect: '/estudiantes'
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/UploadFile.vue')
  },
  // {
  //   path: '/create',
  //   name: 'create',
  //   component: CreateView
  // },
  // {
  //   path: '/edit/:id',
  //   name: 'edit',
  //   component: EditView
  // },
  {
    path: '/estudiantes',
    name: 'estudiantes',
    //component: EstudianteView
    component: () => import(/* webpackChunkName: "about" */ '../views/estudiante/EstudianteView.vue')
  },
  {
    path: '/estudiante/create',
    name: 'crearestudiante',
    component: CreateEstudianteView
  },
  {
    path: '/estudiante/edit/:id',
    name: 'editarestudiante',
    component: EditEstudianteView
  },
  {
    path: '/estudiante/materias-cursadas/:id',
    name: 'materiascursadas',
    component: CursadasEstudianteView
  },
  {
    path: '/estudiante/habilitados',
    name: 'estudianteshabilitados',
    component: HabilitadosEstudianteView
  },
  {
    path: '/estudiante/ofertas/:id',
    name: 'estudianteofertas',
    component: OfertaMateriasEstudianteView
  },
  {
    path: '/estudiante/curso-preparatorio',
    name: 'estudiantespreparatorio',
    //component: EstudianteView
    component: EstudianteCursoPreparatorioView
  },
  {
    path: '/estudiante/datatable',
    name: 'estudiantesdatatable',
    component: EstudianteView

  },
  {
    path: '/docentes',
    name: 'docentes',
    //component: DocenteView
    component: () => import(/* webpackChunkName: "about" */ '../views/docente/DocenteView.vue')
  },
  {
    path: '/docente/create',
    name: 'creardocente',
    component: CreateDocenteView
  },
  {
    path: '/docente/edit/:id',
    name: 'editardocente',
    component: EditDocenteView
  },
  {
    path: '/asignaturas',
    name: 'asignaturas',
    component: MateriaView
  },
  {
    path: '/asignatura/create',
    name: 'crearasignatura',
    component: CreateMateriaView
  },
  {
    path: '/asignatura/edit/:id',
    name: 'editarasignatura',
    component: EditMateriaView
  },
  {
    path: '/carreras',
    name: 'carreras',
    component: CarreraView
  },
  {
    path: '/carrera/create',
    name: 'crearcarrera',
    component: CreateCarreraView
  },
  {
    path: '/carrera/edit/:id',
    name: 'editarcarrera',
    component: EditCarreraView
  },
  {
    path: '/carrera/mostrarmalla/:id',
    name: 'mostrarmall',
    component: () => import(/* webpackChunkName: "about" */ '../views/carrera/MostrarMallaCarreraView.vue')
  },
  {
    path: '/reportes',
    name: 'reportes',
    component: ReporteView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/estudiantes'
  },


  // {
  //   path: '/departamentos',
  //   name: 'departamentos',
  //   component: MateriaView
  // },
  // {
  //   path: '/departamento/create',
  //   name: 'creardepartamento',
  //   component: CreateMateriaView
  // },
  // {
  //   path: '/departamento/edit/:id',
  //   name: 'editardepartamento',
  //   component: EditMateriaView
  // },

  // {
  //   path: '/reportes',
  //   name: 'reportes',
  //   //component: DocenteView
  //   component: ReporteView
  // },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
