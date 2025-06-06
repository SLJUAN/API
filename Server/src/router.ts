import { Router } from 'express';
import { body, param } from 'express-validator';
import { handleInputErrors } from './middleware';
import * as clientHandlers from './handlers/client';
import * as servicioHandlers from './handlers/servicio';
import * as placaHandlers from './handlers/placa';

const router = Router();

// Helper para las rutas con validación
const validateRequest = (validations: any[], handler: any) => {
  return [...validations, handleInputErrors, handler];
};

// Clients Routes
router.post('/clients', validateRequest([
  body('nombre').notEmpty().withMessage('Nombre is required'),
  body('apellido').notEmpty().withMessage('Apellido is required'),
  body('telefono')
    .notEmpty().withMessage('Telefono is required')
    .isLength({ min: 8, max: 15 }).withMessage('Must be 8-15 characters')
], clientHandlers.createClient));

router.get('/clients', clientHandlers.getAllClients);

router.get('/clients/:id', validateRequest([
  param('id').isInt().withMessage('ID must be an integer')
], clientHandlers.getClientById));

router.put('/clients/:id', validateRequest([
  param('id').isInt().withMessage('ID must be an integer'),
  body('nombre').optional().notEmpty().withMessage('Nombre is required'),
  body('apellido').optional().notEmpty().withMessage('Apellido is required'),
  body('telefono')
    .optional()
    .isLength({ min: 8, max: 15 }).withMessage('Must be 8-15 characters')
], clientHandlers.updateClient));

router.delete('/clients/:id', validateRequest([
  param('id').isInt().withMessage('ID must be an integer')
], clientHandlers.deleteClient));

// Servicios Routes
router.post('/servicios', validateRequest([
  body('nombre').notEmpty().withMessage('Nombre es requerido'),
  body('precio')
    .isNumeric().withMessage('Precio debe ser numérico')
    .custom(value => value > 0).withMessage('Precio debe ser mayor a 0'),
  body('disponibilidad')
    .toBoolean()
    .isBoolean().withMessage('Disponibilidad debe ser true o false')
], servicioHandlers.createServicio));

router.get('/servicios', servicioHandlers.getAllServicios);

router.get('/servicios/:id', validateRequest([
  param('id').isInt().withMessage('ID debe ser un entero')
], servicioHandlers.getServicioById));

router.put('/servicios/:id', validateRequest([
  param('id').isInt().withMessage('ID debe ser un entero'),
  body('nombre').optional().notEmpty().withMessage('Nombre es requerido'),
  body('precio')
    .optional()
    .isNumeric().withMessage('Precio debe ser numérico')
    .custom(value => value > 0).withMessage('Precio debe ser mayor a 0'),
  body('disponibilidad')
    .optional()
    .toBoolean()
    .isBoolean().withMessage('Disponibilidad debe ser true o false')
], servicioHandlers.updateServicio));

router.delete('/servicios/:id', validateRequest([
  param('id').isInt().withMessage('ID debe ser un entero')
], servicioHandlers.deleteServicio));

// Placas Routes
router.post('/placas', validateRequest([
  body('placa')
    .notEmpty().withMessage('Placa es requerida')
    .isAlphanumeric().withMessage('Placa debe tener letras y números'),
  body('modelo_carro')
    .notEmpty().withMessage('Modelo del carro es requerido')
], placaHandlers.createPlaca));

router.get('/placas', placaHandlers.getAllPlacas);

router.get('/placas/:id', validateRequest([
  param('id').isInt().withMessage('ID debe ser un entero')
], placaHandlers.getPlacaById));

router.put('/placas/:id', validateRequest([
  param('id').isInt().withMessage('ID debe ser un entero'),
  body('placa')
    .optional()
    .isAlphanumeric().withMessage('Placa debe tener letras y números'),
  body('modelo_carro')
    .optional()
    .notEmpty().withMessage('Modelo del carro es requerido')
], placaHandlers.updatePlaca));

router.delete('/placas/:id', validateRequest([
  param('id').isInt().withMessage('ID debe ser un entero')
], placaHandlers.deletePlaca));

export default router;
