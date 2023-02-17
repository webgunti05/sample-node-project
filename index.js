import express from 'express';
import mongoose from 'mongoose';
import getUserRoutes from "./routes/userRoutes.js";
import getProductRoutes from "./routes/productRoutes.js"
import { dbUri } from './Config/config.js'


const PORT = process.env.PORT || 9000;

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(dbUri.MONGO_URI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => {
    console.log("MongoDb Connected")
})
.catch(err => {
    console.log(err)
})

app.use(express.json());
app.use('/api/users', getUserRoutes);
app.use('/api/products', getProductRoutes);
app.listen(9000, () => {
    console.log(`Server running at ${PORT}`)
});