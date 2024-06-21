import React from 'react';
import './index.css';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            showModal: false,
            newNoteTitle: '',
            newNoteImage: '',
            titleError: false,
            titleErrorList: false,
            titleErrorEl: false,
            showAddElement: false,
            openElementNoteId: null,
            newElementTitle: '',
            newElementBody: '',
            newElementImage: '',
            showListElement: false,
            openListElementIndex: null,
            newListElementTitle: '',
            newListElementBody: '',
            newListElementImage: '',
            maxNotesReached: false,
            showElement: false,
            editingElementId: null,
            editingListElementId: null,
            activeNoteId: null,
            categoryEl: ['Nabiał', 'Mięso', 'Produkty Suche', 'Owoce', 'Warzywa', 'Napoje', 'Srodki Czystości', 'Słodycze', 'Inne'],
            shopsList: ['Biedronka', 'Lidl', 'Carrefour', 'Kaufland', 'Leroy Merlin', 'OBI', 'Netto', 'Auchan'],
            shopsImg: [
                { name: 'Biedronka', url: 'https://seeklogo.com/images/B/biedronka-logo-CFE5AB5685-seeklogo.com.png' },
                { name: 'Lidl', url: 'https://seeklogo.com/images/L/Lidl-logo-3412C5F791-seeklogo.com.png' },
                { name: 'Carrefour', url: 'https://logospng.org/download/carrefour/logo-carrefour-4096.png' },
                { name: 'Kaufland', url: 'https://seeklogo.com/images/K/kaufland-logo-3D479A27FF-seeklogo.com.png' },
                { name: 'Leroy Merlin', url: 'https://seeklogo.com/images/L/Leroy_Merlin-logo-E2888B94BB-seeklogo.com.png' },
                { name: 'OBI', url: 'https://seeklogo.com/images/O/obi-logo-CC24F2AC0A-seeklogo.com.png' },
                { name: 'Netto', url: 'https://seeklogo.com/images/N/netto-logo-5816011C33-seeklogo.com.png' },
                { name: 'Auchan', url: 'https://seeklogo.com/images/A/Auchan-logo-FE02C82069-seeklogo.com.png' }
            ],
            productsList: ['Pomidory', 'Papryka', 'Grószki', 'Ogórki', 'Banany', 'Marchew', 'Kapusta Swieża',
                'Brokuł', 'Bakłażan', 'Żeberka', 'Szynka', 'Stek', 'Ziemniaki', 'Ser', 'Indyk', 'Jogurt', 'Jajka', 'Płyn do naczyń'],
            productsImg: [
                { name: 'Pomidory', url: 'https://cdn.pixabay.com/photo/2024/03/26/03/45/tomato-8655799_1280.png' },
                { name: 'Papryka', url: 'https://cdn.pixabay.com/photo/2013/07/13/11/41/pepper-158476_1280.png' },
                { name: 'Grószki', url: 'https://cdn.pixabay.com/photo/2012/04/26/19/35/pears-42897_1280.png' },
                { name: 'Ogórki', url: 'https://cdn.pixabay.com/photo/2022/07/06/14/04/cucumber-7305231_1280.png' },
                { name: 'Banany', url: 'https://cdn.pixabay.com/photo/2014/12/21/23/39/bananas-575773_1280.png' },
                { name: 'Marchew', url: 'https://cdn.pixabay.com/photo/2021/01/27/13/51/carrot-5954989_960_720.png' },
                { name: 'Kapusta Swieża', url: 'https://cdn.pixabay.com/photo/2016/04/01/09/05/cabbage-1299145_1280.png' },
                { name: 'Brokuł', url: 'https://cdn.pixabay.com/photo/2012/04/24/16/15/broccoli-40295_1280.png' },
                { name: 'Bakłażan', url: 'https://cdn.pixabay.com/photo/2014/04/03/09/58/eggplant-309459_1280.png' },
                { name: 'Żeberka', url: 'https://cdn.pixabay.com/photo/2014/12/21/23/24/spare-ribs-575310_1280.png' },
                { name: 'Szynka', url: 'https://cdn.pixabay.com/photo/2013/07/13/10/22/sausage-157091_960_720.png' },
                { name: 'Stek', url: 'https://cdn.pixabay.com/photo/2014/12/21/23/40/steak-575806_1280.png' },
                { name: 'Ziemniaki', url: 'VectorsExploreLog inJoinUploadFree potato vegetable raw vector' },
                { name: 'Ser', url: 'https://cdn.pixabay.com/photo/2013/07/12/14/30/cheese-148351_1280.png' },
                { name: 'Indyk', url: 'https://cdn.pixabay.com/photo/2013/07/12/17/11/turkey-151756_1280.png' },
                { name: 'Jogurt', url: 'https://cdn.pixabay.com/photo/2016/09/28/02/17/yogurt-1699648_1280.png' },
                { name: 'Jajka', url: 'https://cdn.pixabay.com/photo/2014/04/02/17/08/box-308052_1280.png' },
                { name: 'Płyn do naczyń', url: 'https://cdn.pixabay.com/photo/2013/07/12/18/58/dishwashing-detergent-154103_1280.png' },
            ],
            numberElement:'',
            measureList:['kg', 'szt.'],
            unitMeasure:''



        };
    }


    clouseEl = () => ({
        showAddElement: false,
        openElementNoteId: null,
        editingElementId: null,
        newElementTitle: '',
        newElementBody: '',
        newElementImage: '',
        showListElement: false,
        openListElementIndex: null,
        editingListElementId: null,
        newListElementTitle: '',
        newListElementBody: '',
        numberElement:'',
        unitMeasure:'',
        newListElementImage: ''
    });



    componentDidMount() {
        this.fetchNotes();
    }

    fetchNotes = () => {
        fetch('http://localhost:4000/notes')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    notes: data,
                    // Ustawienie aktywnej notatki na pierwszą notatkę, jeśli nie ma jeszcze ustawionej aktywnej notatki
                    activeNoteId: this.state.activeNoteId || (data.length > 0 ? data[0]._id : null)
                }, () => {
                    // Po ustawieniu notatek, przewiń do aktywnej notatki
                    this.scrollToActiveNote();
                });
            })
            .catch(error => {
                console.error('Błąd podczas pobierania notatek:', error);
            });
    }

    scrollToActiveNote = () => {
        const { activeNoteId } = this.state;
        if (activeNoteId) {
            const activeNoteElement = document.getElementById(activeNoteId);
            if (activeNoteElement) {
                activeNoteElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }


    // ============================== DELELE ===================================//


    handleDelete = (id) => {
        const { notes, activeNoteId } = this.state;

        // Znajdź indeks notatki do usunięcia
        const noteIndex = notes.findIndex(note => note._id === id);

        // Jeśli notatka do usunięcia jest aktywna, ustal nową aktywną notatkę
        let newActiveNoteId = activeNoteId;
        if (activeNoteId === id) {
            // Jeśli usuwana notatka jest pierwszą, przenieś się do poprzedniej
            if (noteIndex === notes.length - 1 || notes.length === 1) {
                newActiveNoteId = notes.length > 1 ? notes[notes.length - 2]._id : null;
            }
            // W innym przypadku przenieś się do poprzedniej notatki
            else if (noteIndex >= 0 && noteIndex < notes.length - 1) {
                newActiveNoteId = notes[noteIndex + 1]._id;
            }
        }

        fetch(`http://localhost:4000/notes/${id}`, {
            method: 'DELETE',
        }).then(() => {
            // Ustaw nową aktywną notatkę
            this.setState({
                activeNoteId: newActiveNoteId
            }, () => {
                // Jeśli nowy activeNoteId nie jest null, przewiń do niego
                if (newActiveNoteId) {
                    this.scrollToActiveNote();
                }
            });

            // Pobierz ponownie notatki
            this.fetchNotes();
        }).catch(error => {
            console.error('Błąd podczas usuwania notatki:', error);
        });
    }



    handleDeleteElement = (noteId, elementIndex) => {
        const updatedNotes = this.state.notes.map(note => {
            if (note._id === noteId) {
                return {
                    ...note,
                    body: note.body.filter((_, index) => index !== elementIndex)
                };
            }
            return note;
        });

        this.setState({ notes: updatedNotes, showAddElement: false, newElementTitle: '', newElementBody: '', newElementImage: '', titleErrorList: false, editingElementId: null }, () => {
            fetch(`http://localhost:4000/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedNotes.find(note => note._id === noteId)),
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Błąd podczas usuwania elementu');
                }
                return response.json();
            }).then(() => {
                this.fetchNotes();
            }).catch(error => {
                console.error('Błąd podczas usuwania elementu:', error);
            });
        });
    }



    handleDeleteListElement = (noteId, elementIndex, listElementIndex) => {
        const updatedNotes = this.state.notes.map(note => {
            if (note._id === noteId) {
                return {
                    ...note,
                    body: note.body.map((element, index) => {
                        if (index === elementIndex) {
                            return {
                                ...element,
                                new: element.new.filter((el, idx) => idx !== listElementIndex)
                            };
                        }
                        return element;
                    })
                };
            }
            return note;
        });

        this.setState({ notes: updatedNotes, showListElement: false, newListElementTitle: '', newListElementBody: '', newListElementImage: '', titleErrorEl: false, editingListElementId: null }, () => {
            fetch(`http://localhost:4000/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedNotes.find(note => note._id === noteId)),
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Błąd podczas usuwania elementu listy');
                }
                return response.json();
            }).then(() => {
                this.fetchNotes();
            }).catch(error => {
                console.error('Błąd podczas usuwania elementu listy:', error);
            });
        });
    }

    // ==========================================================================================//



    // ========================================= EDIT =============================================//


    handleEditElement = (noteId, elementIndex) => {
        const { notes } = this.state;
        const note = notes.find(note => note._id === noteId);
        const element = note.body[elementIndex];

        this.setState({
            editingElementId: {
                noteId: noteId,
                elementIndex: elementIndex
            },
            newElementTitle: element.title,
            newElementBody: element.body,
            newElementImage: element.image,
            showAddElement: true,
            openElementNoteId: noteId
        });
    }


    handleEditListElement = (noteId, elementIndex, listElementIndex) => {
        const { notes } = this.state;
        const note = notes.find(note => note._id === noteId);
        const listElement = note.body[elementIndex].new[listElementIndex];

        this.setState({
            editingListElementId: {

                noteId: noteId,
                elementIndex: elementIndex,
                listElementIndex: listElementIndex
            },
            newListElementTitle: listElement.title,
            newListElementBody: listElement.body,
            numberElement:listElement.number,
            unitMeasure:listElement.unit,
            newListElementImage: listElement.image,
            showListElement: true,
            openElementNoteId: noteId,
            showAddElement: false,
            editingElementId: null,
            newElementTitle: '',
            newElementBody: '',
            newElementImage: '',
            openListElementIndex: elementIndex

        });
    }



    // ==========================================================================================//


    // ===================================  ADD  ==========================================//


    handleAdd = () => {
        if (this.state.notes.length >= 10) {
            this.setState({ maxNotesReached: true });
            setTimeout(() => {
                this.setState({ maxNotesReached: false });
            }, 1500);
        } else {
            this.setState({ ...this.clouseEl(), showModal: true });
        }
    }

    // ==========================================================================================//

    // ===================================== SAVE ============================================//

    handleSave = () => {
        const { newNoteTitle, newNoteImage } = this.state;

        if (!newNoteTitle.trim()) {
            this.setState({ titleError: true });
            return;
        }

        const newNote = {
            title: newNoteTitle,
            image: newNoteImage,
            body: []
        };

        fetch('http://localhost:4000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newNote),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Błąd podczas dodawania notatki');
            }
            return response.json();
        }).then(data => {
            // Ustaw nową notatkę jako aktywną
            this.setState({
                showModal: false,
                newNoteTitle: '',
                newNoteImage: '',
                titleError: false,
                activeNoteId: data._id  // Ustawienie nowo dodanej notatki jako aktywnej
            }, () => {
                // Po ustawieniu notatki, przewiń do niej
                this.scrollToActiveNote();
            });
            this.fetchNotes();
        }).catch(error => {
            console.error('Błąd podczas dodawania notatki:', error);
        });
    }





    handleSaveElement = (noteId) => {
        const { newElementTitle, newElementBody, newElementImage, editingElementId, notes } = this.state;

        if (!newElementTitle.trim()) {
            this.setState({ titleErrorList: true });
            return;
        }

        const newNote = notes.find(note => note._id === noteId);

        if (editingElementId && editingElementId.noteId === noteId) {
            // Edytowanie istniejącego elementu
            const elementIndex = editingElementId.elementIndex;

            newNote.body[elementIndex] = {
                ...newNote.body[elementIndex],
                title: newElementTitle,
                body: newElementBody,
                image: newElementImage
            };

            fetch(`http://localhost:4000/notes/${noteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNote),
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Błąd podczas aktualizacji elementu');
                }
                return response.json();
            }).then(() => {
                this.setState({
                    showAddElement: false,
                    newElementTitle: '',
                    newElementBody: '',
                    newElementImage: '',
                    titleErrorList: false,
                    editingElementId: null
                });
                this.fetchNotes();
            }).catch(error => {
                console.error('Błąd podczas aktualizacji elementu:', error);
            });
        } else {
            // Dodawanie nowego elementu
            const newElement = {
                title: newElementTitle,
                body: newElementBody,
                image: newElementImage,
                new: []
            };

            if (Array.isArray(newNote.body)) {
                newNote.body.push(newElement);
            } else {
                newNote.body = [newElement];
            }

            fetch(`http://localhost:4000/notes/${newNote._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNote),
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Błąd podczas dodawania nowego elementu');
                }
                return response.json();
            }).then(() => {
                this.setState({ showAddElement: false, newElementTitle: '', newElementBody: '', newElementImage: '', titleErrorList: false });
                this.fetchNotes();
            }).catch(error => {
                console.error('Błąd podczas dodawania nowego elementu:', error);
            });
        }
    }



    handleSaveListElement = (noteId, elementIndex) => {
        const { newListElementTitle, newListElementBody, numberElement, newListElementImage, 
            editingListElementId, unitMeasure, notes } = this.state;

        if (!newListElementTitle.trim()) {
            this.setState({ titleErrorEl: true });
            return;
        }

        const updatedNotes = notes.map(note => {
            if (note._id === noteId) {
                return {
                    ...note,
                    body: note.body.map((element, index) => {
                        if (index === elementIndex) {
                            let newList = [...(element.new || [])];
                            if (editingListElementId && editingListElementId.noteId === noteId && editingListElementId.elementIndex === elementIndex) {
                                newList[editingListElementId.listElementIndex] = {
                                    title: newListElementTitle,
                                    body: newListElementBody,
                                    number: numberElement,
                                    unit:unitMeasure,
                                    image: newListElementImage
                                };
                            } else {
                                newList.push({
                                    title: newListElementTitle,
                                    body: newListElementBody,
                                    number: numberElement,
                                    unit:unitMeasure,
                                    image: newListElementImage
                                });
                            }
                            return {
                                ...element,
                                new: newList
                            };
                        }
                        return element;
                    })
                };
            }
            return note;
        });

        fetch(`http://localhost:4000/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedNotes.find(note => note._id === noteId)),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Błąd podczas dodawania nowego elementu listy');
            }
            return response.json();
        }).then(() => {
            this.setState({
                showListElement: false,
                newListElementTitle: '',
                numberElement:'',
                unitMeasure:'',
                newListElementBody: '',
                newListElementImage: '',
                titleErrorEl: false,
                editingListElementId: null
            });
            this.fetchNotes();
        }).catch(error => {
            console.error('Błąd podczas dodawania nowego elementu listy:', error);
        });
    }



    // ==========================================================================================//


    // ======================================== CANCEL ============================================//

    handleCancel = () => {
        this.setState({
            showModal: false,
            newNoteTitle: '',
            newNoteImage: '',
            titleError: false

        });
    }

    handleCancelElement = () => {
        this.setState({
            showAddElement: false,
            newElementTitle: '',
            newElementBody: '',
            newElementImage: '',
            titleErrorList: false,
            editingElementId: null
        });
    }

    handleCancelListElement = () => {
        this.setState({
            showListElement: false,
            newListElementTitle: '',
            numberElement:'',
            unitMeasure:'',
            newListElementBody: '',
            newListElementImage: '',
            openListElementIndex: null,
            titleErrorEl: false,
            editingListElementId: null

        });
    }


    // ==========================================================================================//


    // ============================================== HANDLECHANGE ===================================//
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,

        });
    }


    handleChangeTitle = (e) => {
        this.setState({ newNoteTitle: e.target.value });
    }

    handleChangeImage = (e) => {
        this.setState({ newNoteImage: e.target.value });
    }

    handleChangeCategory = (e) => {
        this.setState({ newElementTitle: e.target.value });
    }

    handleProduct = (e) => {
        this.setState({ newListElementTitle: e.target.value });
    }

    handleProductImg = (e) => {
        this.setState({ newListElementImage: e.target.value });
    } 
    
    handleNumber = (e) => {
        this.setState({ numberElement: e.target.value });
    } 

    handleUnitMeasure = (e) => {
        this.setState({ unitMeasure: e.target.value });
    } 
    
    
    //=================================================================================//


    handleAddElement = (noteId) => {
        this.setState({ showAddElement: true, openElementNoteId: noteId });
    }

    handleAddListElement = (noteId, elementIndex) => {
        this.setState({
            showListElement: true,
            showAddElement: false,
            editingElementId: null,
            newElementTitle: '',
            newElementBody: '',
            newElementImage: '',
            editingListElementId: null,
            newListElementTitle: '',
            numberElement:'',
            unitMeasure:'',
            newListElementBody: '',
            newListElementImage: '',
            openElementNoteId: noteId,
            openListElementIndex: elementIndex
        });
    }




    nextElement = (noteId) => {
        this.setState({ ...this.clouseEl(), activeNoteId: noteId },
            () => {
                // Po zmianie aktywnej notatki, przewiń do niej
                this.scrollToActiveNote();

            });
    }





    render() {
        const { notes, showModal, newNoteTitle, newNoteImage, maxNotesReached, titleError,
            titleErrorList, titleErrorEl, showAddElement, newElementTitle, showListElement,
            newListElementTitle, newListElementBody, newListElementImage, activeNoteId,
            shopsList, shopsImg, categoryEl, productsList, productsImg, numberElement, unitMeasure, measureList
        } = this.state;

        return (
            <div className='mainApp'>

                <div>
                    <h1>Lista zakupów</h1>
                    <button className="bottomStyle" onClick={this.handleAdd}>&#43; <span>NOWA LISTA</span></button>
                </div>

                <div className='mainForm'>
                    <div className='error-box'>
                        {maxNotesReached && (<p>Nie możesz dodać więcej niż 10 notatek.</p>)}
                    </div>
                    {showModal && (
                        <div className="modal">
                            <h2>Nazwa Sklepu</h2>
                            <div className='modal-box'>
                                <button className="formBottom" onClick={this.handleSave}>&#43;</button>
                                <div>
                                    <label className="lableForm">Nazwa: </label>
                                    <input
                                        className="inputForm"
                                        type="text"
                                        name="newNoteTitle"
                                        value={newNoteTitle}
                                        onChange={this.handleChangeTitle}
                                        placeholder="Tytle"
                                    /></div>
                                <div>
                                    <label className="lableForm">Logo: </label>
                                    <input
                                        className="inputForm"
                                        type="text"
                                        name="newNoteImage"
                                        value={newNoteImage}
                                        onChange={this.handleChangeImage}
                                        placeholder="URL"
                                    /></div>
                                <button className="formBottom" onClick={this.handleCancel}>&crarr;</button>
                            </div>
                            <div className='error-box'>
                                {titleError && <p className='errorText'>Proszę wprowadzić tytuł notatki.</p>}
                            </div>
                            <div className='modal-box'>

                                <div className='shopsList'>
                                    <label htmlFor="shopsListSelect">Lista Sklepów</label>
                                    <select
                                        id="shopsListSelect"
                                        value={newNoteTitle}
                                        onChange={this.handleChangeTitle}>
                                        <option value=""></option>
                                        {shopsList.map((name, index) => (
                                            <option key={index} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='shopsImage'>
                                    <label htmlFor="shopsImgSelect">Logo Sklepów</label>
                                    <select
                                        id="shopsImgSelect"
                                        value={newNoteImage}
                                        onChange={this.handleChangeImage}>
                                        <option value=""></option>
                                        {shopsImg.map((img, index) => (
                                            <option key={index} value={img.url}>{img.name}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                        </div>

                    )}
                </div>

                <div className='appWraper'>
                    {notes.map(note => (
                        <div key={note._id} className='mainEl'>
                            <div className={`mainLogo ${activeNoteId === note._id ? 'active' : ''}`}
                                onClick={() => this.nextElement(note._id)}>



                                <div className='logoContent'>
                                    {note.image && <img src={note.image} alt={note.image}
                                        className='mainImage' />}
                                    <h4 className='mainTitle'>{note.title}</h4>
                                </div>
                                {activeNoteId === note._id && (
                                    <button className="deleteBottom" onClick={() => this.handleDelete(note._id)}>&#128465;</button>
                                )}
                            </div>

                            <div className={activeNoteId === note._id ? 'mainBody' : 'mainBody hidden'}>
                                <div className='bodyClass' onClick={() => this.handleAddElement(note._id)}>
                                    <button className="formBottom">&#43;</button>
                                    <h3>Dodaj kategorie</h3>
                                </div>
                                <div className='categoryForm'>
                                    {showAddElement && this.state.openElementNoteId === note._id && (
                                        <div className='modal'>
                                            <h3>Kategoria</h3>
                                            <div className='modal-box'>
                                                <button className="classBottom" onClick={() => this.handleSaveElement(note._id)}>&#43;</button>
                                                <div>
                                                    <label className="lableForm">Nazwa:</label>
                                                    <input className="inputForm"
                                                        type="text"
                                                        name="newElementTitle"
                                                        value={newElementTitle}
                                                        onChange={this.handleChange}
                                                        placeholder="Title" />
                                                </div>
                                                <div className='shopsList'>
                                                    <label htmlFor="categoryElSelect">Kategoria</label>
                                                    <select
                                                        id="categoryElSelect"
                                                        value={newElementTitle}
                                                        onChange={this.handleChangeCategory}>
                                                        <option value=""></option>
                                                        {categoryEl.map((name, index) => (
                                                            <option key={index} value={name}>{name}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <button className="classBottom" onClick={this.handleCancelElement}>&crarr;</button>

                                            </div>

                                            <div className='error-box'>
                                                {titleErrorList && <p className='errorText'>Proszę wprowadzić tytuł notatki.</p>}
                                            </div>
                                            <button className="classBottomDelete" onClick={() => this.handleDeleteElement(
                                                note._id, this.state.editingElementId ?
                                                this.state.editingElementId.elementIndex : -1)}>&#128465; <span>Usuń</span></button>
                                        </div>
                                    )}

                                </div>
                                <div className='grid-conteiner'>
                                    {Array.isArray(note.body) && note.body.map((element, index) => (
                                        <div key={index} className='grid-item'>
                                            <div className='grid-Title'>
                                                <button className="classBottom" onClick={() => this.handleAddListElement(note._id, index)}>&#43;</button>
                                                <div onClick={() => this.handleEditElement(note._id, index)}><h4>{element.title}</h4></div>
                                                {/* <button className="classBottom" onClick={() => this.handleDeleteElement(note._id, index)}>&#128465;</button> */}
                                            </div>


                                            <div className='grid-form'>
                                                {showListElement && this.state.openElementNoteId === note._id && this.state.openListElementIndex === index && (
                                                    <div className="modal">
                                                        <h4>Dodaj produkt</h4>

                                                        <div className="modal-box">
                                                            <label className="lableForm">Nazwa: </label>
                                                            <div className='productsList'>
                                                                <label htmlFor="productsListSelect">Produkty</label>
                                                                <select
                                                                    id="productsListSelect"
                                                                    value={newListElementTitle}
                                                                    onChange={this.handleProduct}>
                                                                    <option value=""></option>
                                                                    {productsList.map((name, index) => (
                                                                        <option key={index} value={name}>{name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <input
                                                                className="inputForm"
                                                                type="text"
                                                                name="newListElementTitle"
                                                                value={newListElementTitle}
                                                                onChange={this.handleProduct}
                                                                placeholder="Title"
                                                            />
                                                        </div>

                                                        <div className="modal-box">
                                                            <label className="lableForm">Zdjęcie: </label>
                                                            <div className='productsImg'>
                                                                <label htmlFor="productsImgSelect">Zdjęcia Produktów</label>
                                                                <select
                                                                    id="productsImgSelect"
                                                                    value={newListElementImage}
                                                                    onChange={this.handleProductImg}>
                                                                    <option value=""></option>
                                                                    {productsImg.map((img, index) => (
                                                                        <option key={index} value={img.url}>{img.name}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <input
                                                                className="inputForm"
                                                                type="text"
                                                                name="newListElementImage"
                                                                value={newListElementImage}
                                                                onChange={this.handleProductImg}
                                                                placeholder="URL"
                                                            />
                                                        </div>

                                                        <div className="modal-box">
                                                            <div className="modal-box">
                                                                <label className="lableForm">Liczba Artykułów: </label>
                                                                <input
                                                                    className="nrForm"
                                                                    type="number"
                                                                    name="numberElement"
                                                                    value={numberElement}
                                                                    onChange={this.handleNumber}
                                                                    placeholder="0"
                                                                    step="0.1" 
                                                                    min="0" 
                                                                    max="100"
                                                                                                                                     
                                                                />
                                                                <div className='unitSelect'>
                                                                    <label>Jednostkę Miary</label>
                                                                    <select
                                                                        id="unitMeasureListSelect"
                                                                        value={unitMeasure}
                                                                        onChange={this.handleUnitMeasure}>
                                                                        <option value=""></option>
                                                                        {measureList.map((name, index) => (
                                                                            <option key={index} value={name}>{name}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <label className="lableForm">Notatka: </label>
                                                            <textarea
                                                                className="textForm"
                                                                type="text"
                                                                name="newListElementBody"
                                                                value={newListElementBody}
                                                                onChange={this.handleChange}
                                                                placeholder="Text"
                                                            />
                                                        </div>

                                                        <div className='formElBottoms'>
                                                            <button className="classBottom" onClick={() => this.handleSaveListElement(note._id, index)}>&#43;</button>
                                                            <button className="classBottom" onClick={() => this.handleDeleteListElement(note._id, index, this.state.editingListElementId ? this.state.editingListElementId.listElementIndex : -1)}>&#128465;</button>
                                                            <button className="classBottom" onClick={this.handleCancelListElement}>&crarr;</button>
                                                        </div>

                                                        {titleErrorEl && <p className='errorText'>Proszę wprowadzić tytuł notatki.</p>}
                                                    </div>
                                                )}
                                            </div>
                                            <div className='grid-content'>
                                                {Array.isArray(element.new) && element.new.map((el, newIndex) => (
                                                    <div className="grid-elements-box" key={newIndex}>
                                                        <div className='grid-element'>
                                                            {/* <button className = "classBottom" onClick={() => this.handleDeleteListElement(note._id, index, newIndex)}>&#128465;</button> */}
                                                            <div>{el.image && <img className='mainImage' src={el.image} alt={el.image} />}</div>
                                                            <div onClick={() => this.handleEditListElement(note._id, index, newIndex)}>{el.title}</div>

                                                            <p className='number'>{el.number}</p>
                                                            <p className='unit'>{el.unit}</p>
                                                            <input
                                                                type="checkbox"
                                                                name="newListElementImage"
                                                                placeholder="URL"
                                                            />
                                                        
                                                        </div>
                                                        <p className='bodyText'>{el.body}</p>
                                                        
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    ))}

                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Notes;


