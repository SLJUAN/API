import { Request, Response } from 'express';
import Servicio from '../models/Servicio.model';

export const createServicio = async (req: Request, res: Response) => {
  try {
    const servicio = await Servicio.create(req.body);
    res.status(201).json({ data: servicio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating servicio' });
  }
};

export const getAllServicios = async (_req: Request, res: Response) => {
  try {
    const servicios = await Servicio.findAll();
    res.json({ data: servicios });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching servicios' });
  }
};

export const getServicioById = async (req: Request, res: Response) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (!servicio) return res.status(404).json({ error: 'Servicio not found' });
    res.json({ data: servicio });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching servicio' });
  }
};

export const updateServicio = async (req: Request, res: Response) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (!servicio) return res.status(404).json({ error: 'Servicio not found' });

    await servicio.update(req.body);
    res.json({ data: servicio });
  } catch (error) {
    res.status(500).json({ error: 'Error updating servicio' });
  }
};

export const deleteServicio = async (req: Request, res: Response) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);
    if (!servicio) return res.status(404).json({ error: 'Servicio not found' });

    await servicio.destroy();
    res.json({ message: 'Servicio deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting servicio' });
  }
};
