const Plan = require('../models/planModel');

exports.getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.getAll();
        res.json(plans);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los planes.' });
    }
};

exports.getPlanById = async (req, res) => {
    try {
        const plan = await Plan.getById(req.params.id);
        if (!plan) return res.status(404).json({ error: 'Plan no encontrado.' });
        res.json(plan);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el plan.' });
    }
};

exports.createPlan = async (req, res) => {
    try {
        const newPlanId = await Plan.create(req.body);
        res.status(201).json({ message: 'Plan creado.', id: newPlanId });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el plan.' });
    }
};

exports.updatePlan = async (req, res) => {
    try {
        await Plan.update(req.params.id, req.body);
        res.json({ message: 'Plan actualizado.' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el plan.' });
    }
};

exports.deletePlan = async (req, res) => {
    try {
        await Plan.delete(req.params.id);
        res.json({ message: 'Plan eliminado.' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el plan.' });
    }
};
