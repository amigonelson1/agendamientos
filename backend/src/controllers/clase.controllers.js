const ClaseCtrl = {};

const Clase = require("../models/clase");

ClaseCtrl.getClases = async (req, res) => {
  try {
    const clase = await Clase.find(); //
    res.json(clase);
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};
ClaseCtrl.createClase = async (req, res) => {
  try {
    const {
      titulo,
      autor1,
      socio1,
      codigo,
      idHorario,
      dia,
      indice,
      solicita,
      horaSolicitud,
    } = req.body;
    const nuevaClase = new Clase({
      titulo,
      autor1,
      socio1,
      codigo,
      idHorario,
      dia,
      indice,
      solicita,
      horaSolicitud,
    });
    await nuevaClase.save();
    console.log(nuevaClase);
    res.json({ message: "clase guardada" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

ClaseCtrl.getClase = async (req, res) => {
  try {
    const clase = await nuevaClase.findById(req.params.id);
    res.json({ message: clase });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};
ClaseCtrl.updateClase = async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    const {
      titulo,
      autor1,
      socio1,
      codigo,
      idHorario,
      dia,
      indice,
      solicita,
      horaSolicitud,
    } = req.body;
    await Clase.findOneAndUpdate({ _id: req.params.id }, {
      titulo,
      autor1,
      socio1,
      codigo,
      idHorario,
      dia,
      indice,
      solicita,
      horaSolicitud,
    });
    res.json({ message: "clase actualizado" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

ClaseCtrl.deleteClase = async (req, res) => {
  try {
    const clase = await Clase.findByIdAndDelete(req.params.id);
    res.json({ title: "Clase eliminada" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

module.exports = ClaseCtrl;
