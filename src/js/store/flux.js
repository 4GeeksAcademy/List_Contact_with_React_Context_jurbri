const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: []
        },
        actions: {
            getContacts: () => {
                fetch("https://playground.4geeks.com/contact/agendas/jurbri/contacts")
                    .then(response => response.json())
                    .then(data => {
                        setStore({ contacts: data.contacts });
                    })
                    .catch(error => console.error("Error fetching contacts:", error));
            },

            addContact: async (contact) => {
                try {
                    let response = await fetch("https://playground.4geeks.com/contact/agendas/jurbri/contacts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(contact)
                    });
                    if (response.ok) {
                        getActions().getContacts();
                    }
                } catch (error) {
                    console.error("Error adding contact:", error);
                }
            },

            editContact: async (contact, id) => {
                try {
                    let response = await fetch(`https://playground.4geeks.com/contact/agendas/jurbri/contacts/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(contact)
                    });
                    if (response.ok) {
                        getActions().getContacts();
                    }
                } catch (error) {
                    console.error("Error editing contact:", error);
                }
            },

            deleteContact: async (id) => {
                try {
                    let response = await fetch(`https://playground.4geeks.com/contact/agendas/jurbri/contacts/${id}`, {
                        method: "DELETE"
                    });
                    if (response.ok) {
                        getActions().getContacts();
                    } else {
                        console.error("Error deleting contact:", response.status);
                    }
                } catch (error) {
                    console.error("Error deleting contact:", error);
                }
            },

            createUser: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/jurbri", {
                        method: "POST",
                        body: JSON.stringify({ name: "Ocampo81" }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    if (!response.ok) {
                        if (response.status === 400) {
                            console.log("Agenda ya existe");
                        } else {
                            throw new Error("Error creando la agenda");
                        }
                    } else {
                        console.log("Agenda creada exitosamente");
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    };
};

export default getState;
