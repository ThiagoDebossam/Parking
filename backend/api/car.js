module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const save = async (req, res) => {
        const car = {...req.body}
        try {
            existsOrError(car.model, 'Modelo não informado.')
            existsOrError(car.score, 'Placa não informada.')
            existsOrError(car.dateAndHour, 'Hora não informada')
            existsOrError(car.userId, 'Usuário não informado')

            const carFromDb = await app.db('cars')
                .where({score: car.score}).first()
                .whereNull('deletedAt')
            notExistsOrError(carFromDb, 'Placa já cadastrada.')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        app.db('cars')
            .insert(car)
            .then(_ => res.status(204).send(true))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('cars')
                                .update({deletedAt: new Date()})
                                .where({id: req.params.id})
            try {
                existsOrError(rowsDeleted, 'Carro não encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }
            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const getRemoved = async (req, res) => {
        app.db('cars')
            .where({userId: req.params.id})
            .whereNotNull('deletedAt')
            .then(cars => res.json(cars))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        app.db('cars')
            .where({ userId: req.params.id})
            .whereNull('deletedAt')
            .then(cars => res.json(cars))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, getById, getRemoved}
}