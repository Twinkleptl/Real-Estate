console.log("Hello")
/*const {users}=require("./data/users.json");
const {books}=require("./data/books.json");*/

const express = require("express");
const dotenv=require("dotenv");
const mongoose = require("mongoose"); 
dotenv.config();

const app=express();
const DbConnection=require("./databaseConnection");
DbConnection();
const PORT = 8081;

app.use(express.json());

// http://localhost:8081/users/
http: app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :-)",
    data: "hey",
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesn't exits",
  });
});
// Locality Schema
const localitySchema = new mongoose.Schema({
    locality_name: String
  });
  
  const Locality = mongoose.model('Locality', localitySchema);
  
  // Property Schema
  const propertySchema = new mongoose.Schema({
    property_name: String,
    locality_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Locality' },
    owner_name: String
  });
  
  const Property = mongoose.model('Property', propertySchema);
  
  // Add new property
  app.post('/add_new_property', async (req, res) => {
    const { property_name, locality, owner_name } = req.body;
    
    // Find or create the locality
    let localityRecord = await Locality.findOne({ locality_name: locality });
    if (!localityRecord) {
      localityRecord = new Locality({ locality_name: locality });
      await localityRecord.save();
    }
  
    const property = new Property({
      property_name,
      locality_id: localityRecord._id,
      owner_name
    });
    
    await property.save();
    
    res.json({
      message: 'Property added successfully',
      property_id: property._id
    });
  });
  
  // Fetch all properties
    app.get('/fetch_all_properties', async (req, res) => {
        const { locality_name, locality_id } = req.query;
      
        let locality;
        if (locality_id) {
          locality = await Locality.findById(locality_id);
        } else if (locality_name) {
          locality = await Locality.findOne({ locality_name });
        }
      
  
    if (!locality) {
      return res.status(404).json({ message: 'Locality not found' });
    }
  
    const properties = await Property.find({ locality_id: locality._id });
  
    res.json(properties.map(property => ({
      property_id: property._id,
      property_name: property.property_name,
      owner_name: property.owner_name
    })));
  });
  
  // Update property details
  app.put('/update_property_details', async (req, res) => {
    const { property_id, locality_id, owner_name } = req.body;
  
    const property = await Property.findById(property_id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
  
    property.locality_id = locality_id || property.locality_id;
    property.owner_name = owner_name || property.owner_name;
    await property.save();
  
    res.json({
      message: 'Property updated successfully',
      property
    });
  });
  
  // Delete property record
  app.delete('/delete_property_record', async (req, res) => {
    const { property_id } = req.body;
  
    const property = await Property.findById(property_id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
  
    await property.remove();
  
    res.json({ message: 'Property deleted successfully' });
  });
  
  // Fetch all localities (Additional API)
  app.get('/fetch_all_localities', async (req, res) => {
    const localities = await Locality.find();
    res.json(localities);
  });


app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
