import { DbService } from "../services/db.service";

export class NotaBLL {
    public async selectAll(dbService: DbService) {
        if(!dbService.database){
            await dbService.createDb();
        }

        const sSelect = 'SELECT * FROM notas';
        return await dbService.database?.executeSql(sSelect, [])
        .catch((error) => {
            console.log('No se pudo seleccionar Notas', error);
        });
    }
    
    public async getNotaById(dbService: DbService, id: number) {
        if(!dbService.database){
            await dbService.createDb();
        }

        const sSelect = 'SELECT * FROM notas WHERE id = ?';
        return await dbService.database?.executeSql(sSelect, [id])
        .catch((error) => {
            console.log('No se pudo seleccionar Nota con ID', error);
        });
    }

    public async insertNota(dbService: DbService, texto: string, color: string) {
        if(!dbService.database){
            await dbService.createDb();
        }

        const sInsert = 'INSERT INTO notas (texto, color) VALUES (?, ?)';
        return await dbService.database?.executeSql(sInsert, [texto, color])
        .catch((error) => {
            console.log('No se pudo insertar Nota', error);
        });
    }

    public async updateNota(dbService: DbService, id: number, texto: string, color: string) {
        if(!dbService.database){
            await dbService.createDb();
        }

        const sUpdate = 'UPDATE notas SET texto = ?, color = ? WHERE id = ?';   
        return await dbService.database?.executeSql(sUpdate, [texto, color, id])
        .catch((error) => {
            console.log('No se pudo actualizar Nota', error);
        });
    }

    public async deleteNota(dbService: DbService, id: number) {
        if(!dbService.database){
            await dbService.createDb();
        }

        const sDelete = 'DELETE FROM notas WHERE id = ?';
        return await dbService.database?.executeSql(sDelete, [id])
        .catch((error) => {
            console.log('No se pudo eliminar Nota', error);
        });
    }


}
