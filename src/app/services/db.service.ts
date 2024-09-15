import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  public database?: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform) { 
    this.platform.ready().then(() => {
      this.createDb();
    });
  }

  async createDb() {
    await this.sqlite.create({
      name: 'notas.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      this.database = db;
      this.createTable();
    })
    .catch((error) => {
      console.log('Erro ao criar o banco de dados', error);
    });

  }

  async createTable() {
    const sqlTable = 'CREATE TABLE IF NOT EXISTS notas (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT)';
    await this.database?.executeSql(sqlTable, [])
    .then(() => {
      console.log('Tabela creada con exito');
    })
    .catch((error) => {
      console.log('Error al crear tabla', error);
    });
  }
  
}
