import { Component } from '@angular/core';
import { NotaBLL } from '../bll/nota-bll';
import { Nota } from '../models/nota';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  notaBLL: NotaBLL = new NotaBLL();
  notas: Nota[] = [];

  nuevoTexto: string = '';
  nuevoColor: string = 'light';
  editando: boolean = false;
  notaSeleccioaID: number | null = null;
  
  
  constructor(private dbService: DbService) {
    this.cargarNotas();
  }

  cargarNotas() {
    this.notaBLL.selectAll(this.dbService)
    .then((result) => {
      for(let i = 0; i < result.rows.length; i++) {
        const element = result.rows.item(i);
        this.notas.push(element);
      }
    })
    .catch((error) => {
      console.log('Error al cargar notas', error);
    });
  }

  crearNota() {
    if(this.editando){
      this.editarNota(this.notaSeleccioaID!, this.nuevoTexto, this.nuevoColor);
    }else{
      this.notaBLL.insertNota(this.dbService, this.nuevoTexto, this.nuevoColor)
      .then(() => {
        this.notas = [];
        this.cargarNotas();
        this.limpiarFormulario();
      })
      .catch((error) => {
        console.log('Error al crear nota', error);
      });
    }
  }

  editarColor(id: number, color: string) {
    this.notaBLL.updateColor(this.dbService, id, color)
    .then(() => {
      this.notas = [];
      this.cargarNotas();
    })
    .catch((error) => {
      console.log('Error al editar color', error);
    });
  }

  editarTexto(id: number, texto: string) {
    this.notaBLL.updateTexto(this.dbService, id, texto)
    .then(() => {
      this.notas = [];
      this.cargarNotas();
      this.limpiarFormulario();
    })
    .catch((error) => {
      console.log('Error al editar texto', error);
    });
  }

  editarNota(id: number, texto: string, color: string) {
    this.notaBLL.updateNota(this.dbService, id, texto, color)
    .then(() => {
      this.notas = [];
      this.cargarNotas();
      this.limpiarFormulario();
    })
    .catch((error) => {
      console.log('Error al editar nota', error);
    });
  }

  eliminarNota(id: number) {
    this.notaBLL.deleteNota(this.dbService, id)
    .then(() => {
      this.notas = [];
      this.cargarNotas();
    })
    .catch((error) => {
      console.log('Error al eliminar nota', error);
    });
  }

  selecionarNota(nota: any) {
    this.nuevoTexto = nota.texto!;
    this.nuevoColor = nota.color!;
    this.editando = true;
    this.notaSeleccioaID = nota.id;
  }

  limpiarFormulario(){
    this.nuevoTexto = '';
    this.nuevoColor = 'light';
    this.editando = false;
    this.notaSeleccioaID = null;
  }

}
