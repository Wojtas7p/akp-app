// const mongoose = require('mongoose');

// const Note = mongoose.model('Note', {
//     title: String,
//     body: String,
//     image: String
// });

// module.exports = Note;








// const mongoose = require('mongoose');

// const listElement = {
//     title: String,
//     image: String,
//     body: String,
// };

// const typeElements = {
//     title: String, // Typ elementu, na przykład: tekst, obraz itp.
//     body: listElement, // Zawartość elementu
// };

// const NoteSchema = {
//     title: String,
//     body: typeElements,
//     image: String,
// };


// const Note = mongoose.model('Note', NoteSchema);

// module.exports = Note;







// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const listElement = new Schema({
//     title: String,
//     image: String,
//     body: String,
// }, { _id: false });

// const typeElements = new Schema({
//     title: String,
//     body: [listElement],
// }, { _id: false });

// const NoteSchema = new Schema({
//     title: String,
//     body: [typeElements],
//     image: String,
// });

// const Note = mongoose.model('Note', NoteSchema);

// module.exports = Note;






const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    image: String,
    body: Schema.Types.Mixed, // Zmiana typu pola body
});
const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;








// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const NoteSchema = new Schema({
//     title: String,
//     image: {
//         data: Buffer, // Pole 'data' będzie przechowywać dane binarne obrazu
//         contentType: String // Typ zawartości obrazu (np. 'image/jpeg', 'image/png')
//     },
//     body: Schema.Types.Mixed
// });

// const Note = mongoose.model('Note', NoteSchema);

// module.exports = Note;