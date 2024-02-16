<template>
          <!-- <nav class="navbar navbar-expand-lg bg-body-tertiary bg-primary"> -->
          <nav class="navbar navbar-expand-lg navbar-dark bg-success">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Menu Principal</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
              </button>
               

              <div class="collapse navbar-collapse" id="navbarNavDarkDropdown">
                <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Estudiantes
                     </a>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                      <li>
                        <router-link to="/estudiantes" class="nav-link active" aria-current="page" href="#">Mostrar Estudiantes</router-link>                        
                      </li>
                      <li>
                        <router-link to="/estudiante/create" class="nav-link active" href="#">Crear Estudiante</router-link>                        
                      </li> 
                      <li>
                        <router-link to="/estudiante/habilitados" class="nav-link active" href="#">HabilitadosInscripcion</router-link>                        
                      </li>                      
                    </ul>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Docentes
                     </a>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                      <li>
                        <router-link to="/docentes" class="nav-link active" aria-current="page" href="#">Mostrar Docentes</router-link>                        
                      </li>
                      <li>
                        <router-link to="/docente/create" class="nav-link active" href="#">Crear Docente</router-link>                        
                      </li>                      
                    </ul>
                  </li>

                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Asignaturas
                     </a>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                      <li>
                        <router-link to="/asignaturas" class="nav-link active" aria-current="page" href="#">MostrarAsignaturas</router-link>                        
                      </li>
                      <li>
                        <router-link to="/asignatura/create" class="nav-link active" href="#">Crear Asignaturas</router-link>                        
                      </li>                      
                    </ul>
                  </li>

                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Carreras
                     </a>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                      <li>
                        <router-link to="/carreras" class="nav-link active" aria-current="page" href="#">Mostrar Carreras</router-link>                        
                      </li>
                      <li>
                        <router-link to="/carrera/create" class="nav-link active" href="#">Crear Carrera</router-link>                        
                      </li>                      
                    </ul>
                  </li>

                   <!-- <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Reportes
                     </a>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                      <li>
                        <router-link to="/reportes" class="nav-link active" aria-current="page" href="#">Mostrar Reporte</router-link>                        
                      </li> -->
                    
                      <!-- not necessary -->
                      <!-- <li>
                        <router-link to="/carrera/create" class="nav-link active" href="#">Crear Carrera</router-link>                        
                      </li>  
                    
                    -->
                    <!-- </ul>
                  </li> -->

                </ul>
              </div>

              <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <router-link to="/estudiantes" class="nav-link active" aria-current="page" href="#">Mostrar</router-link>
                  </li>
                |  <li class="nav-item">
                    <router-link to="estudiante/create" class="nav-link active" href="#">Crear</router-link>
                  </li>                              
                </ul>             
              </div> -->

             

            </div>
          </nav>
      
  <div class="container-fluid mt-3">
    <router-view /> 
    <!-- <upload-files></upload-files> -->
  </div>




 <!-- <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-4">Sidebar</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
          Home
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
          Dashboard
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"></use></svg>
          Orders
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid"></use></svg>
          Products
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"></use></svg>
          Customers
        </a>
      </li>
    </ul>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>mdo</strong>
      </a>
      <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2" style="">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div> -->


</template>
<style>
/* body {
    font-size: .875rem;
    line-height: 1.25rem;
} */
</style>

