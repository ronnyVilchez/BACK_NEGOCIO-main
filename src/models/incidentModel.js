import { pool } from "../config/db.js";

export class IncidentModel {

    static async incdAll() {
        const [rows] = await pool.execute('SELECT * FROM incidencia');
        return rows;
    }
    
    static async incdId(id) {
        const [rows] = await pool.execute('SELECT * FROM incidencia WHERE id = ?', [id]);
        return rows[0];
    }
    // añadi el campo de image en la primera ysegunda linea, y en el campo de ? añadi un ?.
    static async incdCreate({ usuario_id, asunto, descripcion, tipo, estado, image, presupuesto, fecha_programada, hora_programada }) {
        const sql = `
            INSERT INTO incidencia (usuario_id, asunto, descripcion, tipo, estado, image, presupuesto, fecha_programada, hora_programada) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [usuario_id, asunto, descripcion, tipo, estado, image, presupuesto, fecha_programada, hora_programada];
    
        const [result] = await pool.execute(sql, values);
        return result;
    }
    

    // static async incdUpdate({ asunto, descripcion, tipo, estado, id, fecha_creacion }) {
    //     const updates = [];
    //     const values = [];

    //     if (asunto) {
    //         updates.push('asunto = ?');
    //         values.push(asunto);
    //     }

    //     if (descripcion) {
    //         updates.push('descripcion = ?');
    //         values.push(descripcion);
    //     }

    //     if (tipo) {
    //         updates.push('tipo = ?');
    //         values.push(tipo);
    //     }

    //     if (estado) {
    //         updates.push('estado = ?');
    //         values.push(estado);
    //     }

    //     if (id) {
    //         values.push(id);
    //     }

    //     if (fecha_creacion) {
    //         values.push(fecha_creacion);
    //     }

    //     const sql = `UPDATE incidencia SET ${updates.join(', ')} WHERE id = ?`;
    //     const [result] = await pool.execute(sql, values);
    //     return result;
    // }

    static async incdUpdate({ asunto, descripcion, tipo, estado, presupuesto, fecha_programada, hora_programada, id }) {
        const updates = [];
        const values = [];
    
        if (asunto) {
            updates.push('asunto = ?');
            values.push(asunto);
        }
    
        if (descripcion) {
            updates.push('descripcion = ?');
            values.push(descripcion);
        }
    
        if (tipo) {
            updates.push('tipo = ?');
            values.push(tipo);
        }
    
        if (estado) {
            updates.push('estado = ?');
            values.push(estado);
        }
    
        if (presupuesto) {
            updates.push('presupuesto = ?');
            values.push(presupuesto);
        }
    
        if (fecha_programada) {
            updates.push('fecha_programada = ?');
            values.push(fecha_programada);
        }
    
        if (hora_programada) {
            updates.push('hora_programada = ?');
            values.push(hora_programada);
        }
    
        // Actualizar siempre la fecha de actualización con NOW()
        updates.push('fecha_actualizacion = NOW()');
    
        // Asegurarse de que hay al menos un campo para actualizar
        if (updates.length === 0) {
            throw new Error('No hay campos para actualizar');
        }
    
        // Asegurar que el ID esté presente
        values.push(id);
    
        const sql = `UPDATE incidencia SET ${updates.join(', ')} WHERE id = ?`;
        const [result] = await pool.execute(sql, values);
        return result;
    }
    

    static async incdFrUs(id) {
        const [rows] = await pool.execute('SELECT * FROM incidencia WHERE usuario_id = ?', [id]);
        return rows;
    }

    static async incdDel(id) {
        const [result] = await pool.execute('DELETE FROM incidencia WHERE id = ?', [id]);
        return result;
    }
}
