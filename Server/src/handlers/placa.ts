import { Request, Response } from 'express';
import Placa from '../models/Placa.model';

export const createPlaca = async (req: Request, res: Response) => {
  try {
    const placa = await Placa.create(req.body);
    res.status(201).json({ data: placa });
  } catch (error) {
    res.status(500).json({ error: 'Error creating placa' });
  }
};

export const getAllPlacas = async (_req: Request, res: Response) => {
  try {
    const placas = await Placa.findAll();
    res.json({ data: placas });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching placas' });
  }
};

export const getPlacaById = async (req: Request, res: Response) => {
  try {
    const placa = await Placa.findByPk(req.params.id);
    if (!placa) return res.status(404).json({ error: 'Placa not found' });
    res.json({ data: placa });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching placa' });
  }
};

export const updatePlaca = async (req: Request, res: Response) => {
  try {
    const placa = await Placa.findByPk(req.params.id);
    if (!placa) return res.status(404).json({ error: 'Placa not found' });
    await placa.update(req.body);
    res.json({ data: placa });
  } catch (error) {
    res.status(500).json({ error: 'Error updating placa' });
  }
};

export const deletePlaca = async (req: Request, res: Response) => {
  try {
    const placa = await Placa.findByPk(req.params.id);
    if (!placa) return res.status(404).json({ error: 'Placa not found' });
    await placa.destroy();
    res.json({ message: 'Placa deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting placa' });
  }
};