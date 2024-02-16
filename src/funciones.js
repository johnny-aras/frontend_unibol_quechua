import Swal from "sweetalert2";
import axios from "axios";

let docentes_ = [];

export function show_alerta(mensaje, icono, foco = '') {
    if (foco !== '') {
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title: mensaje,
        icon: icono,
        customClass: { confirmButton: 'btn btn-primary', popup: 'animated zoomin' },
        buttonsStyling: false
    });
}
export function confirmar(id, nombre) {
    const url = 'http://127.0.0.1:8000/parametros/provincias/' + id + '/';

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: { confirmButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger' },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Esta seguro que sea Eliminar la provincia: ' + nombre,
        text: 'Se borrara la informacion de la provincia',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, Eliminar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i>Cancelar'
    }).then(result => {
        if (result.isConfirmed) {
            sendRequest('DELETE', { id: id }, url, 'Provincia: ' + nombre + 'Eliminada');
        } else {
            show_alerta('Operacion cancelada', 'info');
        }
    })
}
export function confirmar1(id, nombre, ruta, principal = '/') {
    const url = 'http://127.0.0.1:8000/' + ruta;
    let complemento_ruta = ruta.split('/')[0];
    if (complemento_ruta === 'parametros') {
        complemento_ruta = ruta.split('/')[1];
    }
    const resumido = complemento_ruta.charAt(0).toUpperCase() + complemento_ruta.slice(1);
    const nombre_ruta = resumido.substring(0, resumido.length - 1);



    const swalWithBootstrapButtons = Swal.mixin({
        customClass: { confirmButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger' },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Esta seguro que desea Eliminar ' + nombre_ruta + ' ' + nombre,
        text: 'Se borrara la informacion de ' + nombre_ruta,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, Eliminar',
        cancelButtonText: '<i class="fa-solid fa-ban"></i>Cancelar'
    }).then(result => {
        if (result.isConfirmed) {
            sendRequest('DELETE', { id: id }, url, nombre_ruta + ' : ' + nombre + ' Eliminado(a)', principal);
        } else {
            show_alerta('Operacion cancelada', 'info');
        }
    })
}
export async function confirmarRegistroP(ci_postulante, nombre) {
    const url = 'http://127.0.0.1:8000/administracion/registrarNueboEstudiante/' + ci_postulante + '/';
    // let complemento_ruta =ruta.split('/')[0];
    // if(complemento_ruta==='parametros')
    // {   
    //     complemento_ruta =ruta.split('/')[1];
    // }
    // const resumido = complemento_ruta.charAt(0).toUpperCase()+complemento_ruta.slice(1);
    // const nombre_ruta= resumido.substring(0,resumido.length -1);



    const swalWithBootstrapButtons = Swal.mixin({
        customClass: { confirmButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger' },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Esta seguro que desea inscribir al Estudiante: ' + nombre,
        text: 'Se inscribira al estudiante ',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, Inscribir',
        cancelButtonText: '<i class="fa-solid fa-ban"></i>Cancelar'
    }).then(result => {
        if (result.isConfirmed) {
            sendRequest('GET', { id: ci_postulante }, url, 'Estudiante inscrito Satisfactoriamente!', 'estudiantes-preparatorio');
        } else {
            show_alerta('Operacion cancelada', 'info');
        }
    })
}
export async function inscripcionDirectaN(ci_estudiante, nombres) {
    const url = 'http://127.0.0.1:8000/administracion/inscribirEstudiantePrimerAnio/' + ci_estudiante + '/';
    // let complemento_ruta =ruta.split('/')[0];
    // if(complemento_ruta==='parametros')
    // {   
    //     complemento_ruta =ruta.split('/')[1];
    // }
    // const resumido = complemento_ruta.charAt(0).toUpperCase()+complemento_ruta.slice(1);
    // const nombre_ruta= resumido.substring(0,resumido.length -1);



    const swalWithBootstrapButtons = Swal.mixin({
        customClass: { confirmButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger' },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: 'Esta seguro que desea inscribir al Estudiante: ' + nombres,
        text: 'Se inscribira al estudiante ',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-check"></i> Si, Inscribir',
        cancelButtonText: '<i class="fa-solid fa-ban"></i>Cancelar'
    }).then(result => {
        if (result.isConfirmed) {
            sendRequest('GET', { id: ci_estudiante }, url, 'Estudiante inscrito Satisfactoriamente!', 'estudiante-primer-anio');
        } else {
            show_alerta('Operacion cancelada', 'info');
        }
    })
}
export async function sendRequest(metodo, parametros, url, mensaje, principal = '/') {
    await axios({ method: metodo, url: url, data: parametros }).then(resultado => {
        console.log(principal);
        const status = resultado.status;
        //const datos =resultado.data.asignaturas_inscritas
        //console.log(datos);
        // if(status ==='success')
        //CUANDO SE ELIMINAR
        if (status === 204) {
            show_alerta(mensaje, 'success')
            // window.setTimeout(()=>{
            //     window.location.href='/'
            // ,3000});
            setTimeout(() => window.location.href = principal, 1000);
        }
        //CUANDO SE CREA
        else if (status === 201) {
            show_alerta(mensaje, 'success');

            // window.setTimeout(()=>{
            //     window.location.href='/'
            // ,3000});
            //setTimeout(() => window.location.href=principal, 20000);
        }
        //CUANDO SE ACTUALIZA
        else if (status === 200) {
            show_alerta(mensaje, 'success')
            // window.setTimeout(()=>{
            //     window.location.href='/'
            // ,3000});
            if (principal === 'estudiantes-preparatorio' || principal === 'estudiante-primer-anio') {

                //setTimeout(() => window.location.href = '/estudiantes', 1000);
                setTimeout(() => window.location.href = '/estudiante/curso-preparatorio', 1000);
            }
            //setTimeout(() => window.location.href=principal, 1000);
        }
        else {
            let listado = '';
            const errores = resultado.data[1]['errors'];
            Object.keys(errores).forEach(
                key => listado += errores[key][0] + '.'
            );
            show_alerta(listado, 'error');
        }

    }).catch(error => {
        //const {data} =error.data
        console.log(error)
        console.log(error.response.data)
        //show_alerta(error,'error')
        show_alerta('No se pudo completar la Accion', 'error')
    });
}

export function getDocs() {
    axios.get('http://127.0.0.1:8000/docentes/docentes/')
        .then(
            response => (
                docentes_ = response.data
            )
        );
    return docentes_;
}