import path from "node:path";
import { pool } from "../config/db.js";
import { IncidentModel } from "../models/incidentModel.js";
import fs from 'node:fs/promises'

export const incidentId = async (req, res) => {
    try {
        const { id } = req.params
        const incId = await IncidentModel.incdId(id)
        if (incId.length === 0) return res.status(400).json({ message: 'No se encontro incidente' })
        res.status(200).json(incId);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const incidentAll = async (req, res) => {
    try {
        const inci = await IncidentModel.incdAll()
        if (inci.length === 0) return res.status(400).json({ message: 'No hay incidentes' })
        res.status(200).json(inci);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
export const incidentCreate = async (req, res) => {
    try {
        const { usuario_id, asunto, descripcion, tipo, estado, fecha_programada, hora_programada, presupuesto } = req.body;
        const image = req.file ? req.file.filename : '';

        console.log({ photo: image }); // Referenciando photo con image.

        // Verificar que todos los campos requeridos estén presentes
        if (usuario_id && asunto && descripcion && tipo && estado && fecha_programada && hora_programada && presupuesto) {
            const incinew = await IncidentModel.incdCreate({
                usuario_id,
                asunto,
                descripcion,
                tipo,
                estado,
                fecha_programada,
                hora_programada,
                presupuesto,
                image
            });

            if (incinew.affectedRows === 1) {
                return res.status(200).json({ message: 'Se ha creado el incidente' });
            }
            return res.status(400).json({ message: 'Error al crear el incidente' });
        }

        res.status(400).json({ message: 'Faltan datos para notificar el incidente' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const incidentUpdate = async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body); // Debugging

        const { asunto, descripcion, tipo, estado, fecha_creacion, fecha_programada, hora_programada, presupuesto } = req.body;
        const { id } = req.params;
        const image = req.file ? req.file.filename : null; // Si hay imagen, la toma; si no, deja `null`.

        // Validar que el ID esté presente y al menos uno de los otros campos tenga valor
        if (!id) {
            return res.status(400).json({ message: 'El ID del incidente es obligatorio' });
        }

        if (!asunto && !descripcion && !tipo && !estado && !fecha_creacion && !fecha_programada && !hora_programada && !presupuesto && !image) {
            return res.status(400).json({ message: 'Debe proporcionar al menos un campo para actualizar' });
        }

        const incidentUpdated = await IncidentModel.incdUpdate({
            id,
            asunto,
            descripcion,
            tipo,
            estado,
            fecha_creacion,
            fecha_programada,
            hora_programada,
            presupuesto,
            image
        });

        if (incidentUpdated.affectedRows === 1) {
            return res.status(200).json({ message: 'Incidente actualizado con éxito' });
        }

        return res.status(400).json({ message: 'No se pudo actualizar el incidente o no hubo cambios' });

    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: error.message });
    }
};


// estaba manejando la data como form pero cambie a jason// 
// export const incidenUpdate = async (req, res) => {
//     try {
//         const { asunto, descripcion, tipo, estado, fecha_creacion } = req.body
//         const { id } = req.params

//         if (asunto || descripcion || tipo || estado || fecha_creacion || id) {
//             const incinew = await IncidentModel.incdUpdate({ asunto, descripcion, tipo, estado, fecha_creacion, id })
//             if (incinew.affectedRows === 1) return res.status(200).json({ message: 'Incidente actualizado con exito' })
//             if (incinew.affectedRows === 0) return res.status(400).json({ message: 'Error al actualizar el incidente' })
//         }

//         res.status(400).json({ message: 'Faltan datos relevantes' })

//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }

// }
export const incidentFromUs = async (req, res) => {
    try {
        const { id } = req.params
        const incfrUs = await IncidentModel.incdFrUs(id)
        if (incfrUs.length === 0) return res.status(400).json({ message: 'No hay incidentes para este usuario' })
        res.status(200).json(incfrUs);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const incidentDelete = async (req, res) => {
    try {
        const { id } = req.params
        const incIdDel = await IncidentModel.incdDel(id)
        if (incIdDel.affectedRows === 1) return res.status(200).json({ message: 'Incidente eliminado con exito' })
        if (incIdDel.affectedRows === 0) return res.status(400).json({ message: 'Error al eliminar el incidente' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
