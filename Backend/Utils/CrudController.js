import CRUD from "./CRUD.js";

class CrudApi {
    constructor(path, model, router) {
        const crudInstance = new CRUD(model);

        router.get(path, async (req, res) => {
            try {
                const data = await crudInstance.getAll(req.query);
                res.status(200).json(data);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.get(`${path}/:id`, async (req, res) => {
            try {
                const { id } = req.params;
                const data = await crudInstance.getOneById(id);
                if (!data) {
                    res.status(404).json({ error: 'Resource not found' });
                } else {
                    res.status(200).json(data);
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.post(path, async (req, res) => {
            try {
                const newData = await crudInstance.create(req.body);
                console.log(req.body)
                res.status(201).json(newData);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.put(`${path}/:id`, async (req, res) => {
            try {
                const { id } = req.params;
                const updatedData = await crudInstance.updateById(id, req.body);
                if (!updatedData) {
                    res.status(404).json({ error: 'Resource not found' });
                } else {
                    res.status(200).json(updatedData);
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.delete(`${path}/:id`, async (req, res) => {
            try {
                const { id } = req.params;
                const deletedData = await crudInstance.deleteById(id);
                if (!deletedData) {
                    res.status(404).json({ error: 'Resource not found' });
                } else {
                    res.status(200).json(deletedData);
                }
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.get(`${path}/unique/count`, async (req, res) => {
            try {
                const count = await crudInstance.countDocuments(req.query);
                res.status(200).json({ count });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.put(`${path}/unique/update`, async (req, res) => {
            try {
                const updatedData = await crudInstance.findAndUpdate(req.body.query, req.body.newData);
                res.status(200).json(updatedData);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.delete(`${path}/unique/delete`, async (req, res) => {
            try {
                const deletedData = await crudInstance.findAndDelete(req.body.query);
                res.status(200).json(deletedData);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.get(`${path}/unique/aggregate`, async (req, res) => {
            try {
                const result = await crudInstance.aggregate(req.body.pipeline);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.get(`${path}/distinct/:field`, async (req, res) => {
            try {
                const { field } = req.params;
                const values = await crudInstance.distinct(field, req.query);
                res.status(200).json(values);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.post(`${path}/unique/bulkCreate`, async (req, res) => {
            try {
                const result = await crudInstance.bulkCreate(req.body.dataArray);
                res.status(201).json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.put(`${path}/unique/bulkUpdate`, async (req, res) => {
            try {
                const result = await crudInstance.bulkUpdate(req.body.filter, req.body.newData);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.post(`${path}/unique/bulkDelete`, async (req, res) => {
            try {
                const result = await crudInstance.bulkDelete(req.body.filter);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.get(`${path}/unique/paginate`, async (req, res) => {
            try {
                const { page = 1, pageSize = 10 } = req.query;
                console.log(page, pageSize)
                const paginatedData = await crudInstance.paginate({}, null, {}, page || 1, pageSize);
                res.status(200).json(paginatedData);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        

        router.get(`${path}/unique/sort`, async (req, res) => {
            try {
                const { sortBy = 'createdAt', sortOrder = 'asc' } = req.query;
                const sortedData = await crudInstance.sort({}, null, {}, sortBy, sortOrder);
                res.status(200).json(sortedData);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.get(`${path}/unique/getRandom`, async (req, res) => {
            try {
                const randomData = await crudInstance.getRandom({}, null, {});
                res.status(200).json(randomData);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        router.post(`${path}/unique/updateOrCreate`, async (req, res) => {
            try {
                const result = await crudInstance.updateOrCreate(req.body.query, req.body.newData);
                res.status(200).json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}

export default CrudApi;
