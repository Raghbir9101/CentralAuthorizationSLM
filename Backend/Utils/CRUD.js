class CRUD {
    constructor(model) {
        this.model = model;
    }

    async getAll(query = {}, projection = null, options = {}) {
        try {
            const data = await this.model.find(query);
            return data;
        } catch (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }
    }

    async getOneById(id, projection = null, options = {}) {
        try {
            const data = await this.model.findById(id, projection, options);
            return data;
        } catch (error) {
            throw new Error(`Error fetching data by ID: ${error.message}`);
        }
    }

    async create(data) {
        try {
            const newData = await this.model.create(data);
            return newData;
        } catch (error) {
            throw new Error(`Error creating data: ${error.message}`);
        }
    }

    async updateById(id, newData, options = { new: true }) {
        try {
            const updatedData = await this.model.findByIdAndUpdate(id, newData, options);
            return updatedData;
        } catch (error) {
            throw new Error(`Error updating data by ID: ${error.message}`);
        }
    }

    async deleteById(id) {
        try {
            const deletedData = await this.model.findByIdAndDelete(id);
            return deletedData;
        } catch (error) {
            throw new Error(`Error deleting data by ID: ${error.message}`);
        }
    }

    async countDocuments(query = {}) {
        try {
            const count = await this.model.countDocuments(query);
            return count;
        } catch (error) {
            throw new Error(`Error counting documents: ${error.message}`);
        }
    }

    async findAndUpdate(query, newData, options = { new: true }) {
        try {
            const updatedData = await this.model.findOneAndUpdate(query, newData, options);
            return updatedData;
        } catch (error) {
            throw new Error(`Error finding and updating data: ${error.message}`);
        }
    }

    async findAndDelete(query) {
        try {
            const deletedData = await this.model.findOneAndDelete(query);
            return deletedData;
        } catch (error) {
            throw new Error(`Error finding and deleting data: ${error.message}`);
        }
    }

    async aggregate(pipeline) {
        try {
            const result = await this.model.aggregate(pipeline);
            return result;
        } catch (error) {
            throw new Error(`Error aggregating data: ${error.message}`);
        }
    }

    async distinct(field, query = {}) {
        try {
            const values = await this.model.distinct(field, query);
            return values;
        } catch (error) {
            throw new Error(`Error getting distinct values: ${error.message}`);
        }
    }

    async bulkCreate(dataArray) {
        try {
            const result = await this.model.insertMany(dataArray);
            return result;
        } catch (error) {
            throw new Error(`Error bulk creating data: ${error.message}`);
        }
    }

    async bulkUpdate(filter, newData, options = { multi: true }) {
        try {
            const result = await this.model.updateMany(filter, newData, options);
            return result;
        } catch (error) {
            throw new Error(`Error bulk updating data: ${error.message}`);
        }
    }

    async bulkDelete(filter) {
        try {
            const result = await this.model.deleteMany(filter);
            return result;
        } catch (error) {
            throw new Error(`Error bulk deleting data: ${error.message}`);
        }
    }

    async paginate(query = {}, projection = null, options = {}, page = 1, pageSize = 10) {
        try {
            const skip = (page - 1) * pageSize;
            const data = await this.model.find(query, projection, options).skip(skip).limit(pageSize);
            return data;
        } catch (error) {
            throw new Error(`Error paginating data: ${error.message}`);
        }
    }

    async sort(query = {}, projection = null, options = {}, sortBy = 'createdAt', sortOrder = 'asc') {
        try {
            const sort = {};
            sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
            const data = await this.model.find(query, projection, options).sort(sort);
            return data;
        } catch (error) {
            throw new Error(`Error sorting data: ${error.message}`);
        }
    }

    async getRandom(query = {}, projection = null, options = {}) {
        try {
            const count = await this.countDocuments(query);
            const randomIndex = Math.floor(Math.random() * count);
            const randomData = await this.model.findOne(query, projection, options).skip(randomIndex);
            return randomData;
        } catch (error) {
            throw new Error(`Error getting random data: ${error.message}`);
        }
    }

    async updateOrCreate(query, newData) {
        try {
            const result = await this.model.findOneAndUpdate(query, newData, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true,
            });
            return result;
        } catch (error) {
            throw new Error(`Error updating or creating data: ${error.message}`);
        }
    }
}

export default CRUD;



// // Example usage:
// const userModel = mongoose.model('User', userSchema);
// const userCRUD = new CRUD(userModel);

// // Example: getAll
// const allUsers = await userCRUD.getAll();
// console.log('All Users:', allUsers);

// // Example: getOneById
// const specificUser = await userCRUD.getOneById('someUserId');
// console.log('Specific User:', specificUser);

// // Example: create
// const newUser = await userCRUD.create({ name: 'John Doe', age: 25 });
// console.log('New User:', newUser);

// // Example: updateById
// const updatedUser = await userCRUD.updateById('someUserId', { age: 26 });
// console.log('Updated User:', updatedUser);

// // Example: deleteById
// const deletedUser = await userCRUD.deleteById('someUserId');
// console.log('Deleted User:', deletedUser);

// // Example: countDocuments
// const userCount = await userCRUD.countDocuments({ age: { $gt: 21 } });
// console.log('User Count:', userCount);

// // Example: findAndUpdate
// const foundAndUpdate = await userCRUD.findAndUpdate({ name: 'John Doe' }, { age: 27 });
// console.log('Found and Updated User:', foundAndUpdate);

// // Example: findAndDelete
// const foundAndDelete = await userCRUD.findAndDelete({ name: 'John Doe' });
// console.log('Found and Deleted User:', foundAndDelete);

// // Example: aggregate
// const aggregationResult = await userCRUD.aggregate([
//     { $match: { age: { $gt: 25 } } },
//     { $group: { _id: '$name', total: { $sum: 1 } } },
// ]);
// console.log('Aggregation Result:', aggregationResult);

// // Example: distinct
// const distinctValues = await userCRUD.distinct('fieldName', { age: { $gt: 21 } });
// console.log('Distinct Values:', distinctValues);

// // Example: bulkCreate
// const bulkCreateResult = await userCRUD.bulkCreate([{ name: 'Alice', age: 30 }, { name: 'Bob', age: 35 }]);
// console.log('Bulk Create Result:', bulkCreateResult);

// // Example: bulkUpdate
// const bulkUpdateResult = await userCRUD.bulkUpdate({ age: { $gte: 30 } }, { $inc: { age: 1 } });
// console.log('Bulk Update Result:', bulkUpdateResult);

// // Example: bulkDelete
// const bulkDeleteResult = await userCRUD.bulkDelete({ age: { $lt: 30 } });
// console.log('Bulk Delete Result:', bulkDeleteResult);

// // Example: paginate
// const paginatedUsers = await userCRUD.paginate({}, null, {}, 2, 5);
// console.log('Paginated Users (Page 2, PageSize 5):', paginatedUsers);

// // Example: sort
// const sortedUsers = await userCRUD.sort({}, null, {}, 'age', 'desc');
// console.log('Sorted Users (Descending Order):', sortedUsers);

// // Example: getRandom
// const randomUser = await userCRUD.getRandom({}, null, {});
// console.log('Random User:', randomUser);

// // Example: updateOrCreate
// const updateOrCreateResult = await userCRUD.updateOrCreate({ name: 'Jane Doe' }, { name: 'Jane Doe', age: 28 });
// console.log('Update or Create Result:', updateOrCreateResult);
