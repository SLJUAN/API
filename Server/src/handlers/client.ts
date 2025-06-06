import { Request, Response } from 'express';
import Client from '../models/Client.model';
export const createClient = async (req: Request, res: Response) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json({ data: client });
    } catch (error) {
        res.status(500).json({ error: 'Error creating client' });
    }
};

export const getAllClients = async (req: Request, res: Response) => {
    try {
        const clients = await Client.findAll();
        res.json({ data: clients });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching clients' });
    }
};

export const getClientById = async (req: Request, res: Response) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json({ data: client });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching client' });
    }
};

export const updateClient = async (req: Request, res: Response) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        await client.update(req.body);
        res.json({ data: client });
    } catch (error) {
        res.status(500).json({ error: 'Error updating client' });
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    try {
        const client = await Client.findByPk(req.params.id);
        if (!client) {
            return res.status(404).json({ error: 'Client not found' });
        }
        await client.destroy();
        res.json({ message: 'Client deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting client' });
    }
};