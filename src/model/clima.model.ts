import mongoose from "mongoose";

const climaSchema = new mongoose.Schema({
    temperatura: { type: Number, required: true },
    umidade: { type: Number, required: true },
    pressao: { type: Number, required: true },
    chuva: { type: Boolean, required: true },
    co: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
})

const Clima = mongoose.model('clima', climaSchema);

export default Clima;