const leccionCtrl = {};

const Leccion = require("../models/Leccion");

leccionCtrl.getLecciones = async (req, res) => {
  try {
    const leccion = await Leccion.find(); //
    res.json(leccion);
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};
leccionCtrl.createLeccion = async (req, res) => {
  try {
    const {
      Título,
      Jugador,
      Código,
      Cantidad,
      Clase,
      Hora,
      Entrenador,
      Clase1,
      Hora1,
      Entrenador1,
      Clase2,
      Hora2,
      Entrenador2,
    } = req.body;
    const nuevaLeccion = new Leccion({
      Título,
      Jugador,
      Código,
      Cantidad,
      Clase,
      Hora,
      Entrenador,
      Clase1,
      Hora1,
      Entrenador1,
      Clase2,
      Hora2,
      Entrenador2,
    });
    await nuevaLeccion.save();
    console.log(nuevaLeccion);
    //res.json({message:nuevaCita});
    res.json({ message: "leccion guardada" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

leccionCtrl.getLeccion = async (req, res) => {
  try {
    const leccion = await Leccion.findById(req.params.id);
    res.json({ message: leccion });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};
leccionCtrl.updateLeccion = async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    const {
      Título,
      Jugador,
      Código,
      Cantidad,
      Clase1,
      Hora1,
      Entrenador1,
      Clase2,
      Hora2,
      Entrenador2,
    } = req.body;
    await Leccion.findOneAndUpdate({ _id: req.params.id }, {
      Título,
      Jugador,
      Código,
      Cantidad,
      Clase1,
      Hora1,
      Entrenador1,
      Clase2,
      Hora2,
      Entrenador2,
    });
    res.json({ message: "leccion actualizado" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

leccionCtrl.deleteLeccion = async (req, res) => {
  try {
    const leccion = await Leccion.findByIdAndDelete(req.params.id);
    res.json({ title: "Leccion eliminada" });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message: "error en la solicitud"})
  }
};

module.exports = leccionCtrl;
