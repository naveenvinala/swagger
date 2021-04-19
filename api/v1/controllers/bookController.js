const { nanoid } = require("nanoid");
const idLength = 8;

exports.createBook = async (req, res) => {
  try {
    const book = {
      id: nanoid(idLength),
      ...req.body,
    };
    await req.app.db.get("books").push(book).write();
    res.send(book);
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.getBooks = async (req, res) => {
  const books = await req.app.db.get("books");
  res.status(200).json(books)
};

exports.getBookbyId = async (req, res) => {
  const book = await req.app.db
    .get("books")
    .find({ id: req.params.id })
    .value();
  if (!book) {
    res.sendStatus(404);
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
	req.app.db.get("books").remove({ id: req.params.id }).write();
	res.sendStatus(200);
}