const VegetableModel = require("../models/vegetablesModel");

module.exports.createVegetable = async(req,res)=>{
    try {
        const data = req.body;
        const newVegetable = await VegetableModel(data);
        newVegetable.save();
         res.status(200).json({message:"Fruit is uploded successfully",newVegetable});
    } catch (error) {
        res.status(500).json({message:"fruit is not uploded"})
    }
};


module.exports.getVegetable = async (req,res)=>{
    try {
        const getVegetableData = await VegetableModel.find();
        res.status(200).json({message:"All fruits data ",getVegetableData});
    } catch (error) {
        res.status(500).json({message:"fruits not found",details:error.message});
        return
    }
};

module.exports.updateVegetable = async (req,res)=>{
    try {
        const id=req.body.id;
        const query = req.body;
        const updatedVegetable = new VegetableModel.findByIdAndUpdate(id,query,{
            new:true,
            runValidators:true
        })
        res.status(200).json({message:"Fruit is updated successfully",updatedVegetable});
    } catch (error) {
        res.status(500).json({message:"fruits not found",details:error.message});

    }
};

module.exports.deleteVegetable = async (req,res)=>{
    try {
        const id = req.params.id;
        const deletedVEgetable = await VegetableModel.findByIdAndDelete(id);
        res.status(200).json({message:"Fruti is deleted",deletedVEgetable});
    } catch (error) {
        res.status(500).json({message:"Fruit is not deleted",details:error.message})
    }
}
