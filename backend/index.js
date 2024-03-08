import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/myDaB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB successfully');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  })();
  const SECRET_KEY = "mani@125";


app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.send({ message: "User already registered" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      
      console.log("Hashed Password:", hashedPassword);
    
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      res.send({ message: "Successfully registered. Please log in." });
     
    }
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { _id: 0, password: 0 }); 
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Something went wrong!');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const PORT = 9002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
