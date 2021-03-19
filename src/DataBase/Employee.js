import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
    name: String,
    idMavel: String,
    description: String,
});

mongoose.model("hero", EmployeeSchema);