const { nanoid } = require("nanoid");
const idLength = 8;

exports.createBook = async (req, res) => {
  try {
    const book = {
      id: nanoid(idLength),
      ...req.body,
    };
    await req.app.db.get("books").push(book).write();
    res.status(201).json(book);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

exports.getBooks = async (req, res) => {
  const books = await req.app.db.get("books");
  res.status(200).json(books);
};

exports.getBookbyId = async (req, res) => {
  const book = await req.app.db
    .get("books")
    .find({ id: req.params.id })
    .value();
  if (!book) {
    res.status(404).json({ message: "Not found" });
  }
  res.send(book);
};
exports.updateBookbyId = async (req, res) => {
  try {
    req.app.db
      .get("books")
      .find({ id: req.params.id })
      .assign(req.body)
      .write();
    res.send(req.app.db.get("books").find({ id: req.params.id }));
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.deleteBookbyId = async (req, res) => {
  try {
    const book = await req.app.db.get("books").remove({ id: req.params.id }).write();
    if (!book.length) {
      res.status(404).json({ "message": "Not found" });
    } else { 
      res.status(204).send({ "message": "Deleted succesfully" });
    }
  }
  catch(error){
    res.status(500).json({ "message": "database error" });
  }
};
