const citasCtrl = {};

const Cita = require("../models/Cita");

citasCtrl.getCitas = async (req, res) => {
  try {
    const citas = await Cita.find(); //
    res.json(citas);
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};
citasCtrl.createCita = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const nuevaCita = new Cita({
      title,
      content,
      //number,
      //date,
      author,
    });
    await nuevaCita.save();
    console.log(nuevaCita);
    //res.json({message:nuevaCita});
    res.json({ message: "cita guardada" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

citasCtrl.getCita = async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id);
    res.json({ message: cita });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

citasCtrl.updateCita = async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    const { title, content, author } = req.body;
    await Cita.findOneAndUpdate(req.params.id, {
      title,
      author,
      content,
    });
    res.json({ message: "cita actualizado" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

citasCtrl.deleteCita = async (req, res) => {
  try {
    const cita = await Cita.findByIdAndDelete(req.params.id);
    res.json({ title: "Cita eliminada" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

module.exports = citasCtrl;
