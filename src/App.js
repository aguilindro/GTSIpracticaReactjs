import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';  // Importar SweetAlert2

const data = [
  { id: 1, name: "Adriana Guilindro", email: "aguilind@espol.edu.ec", phone: 9895965431, address: "Calle falsa 123" },
  { id: 2, name: "Pedro Pascal", email: "pedrop@espol.edu.ec", phone: 9831234567, address: "Calle principal 345" },
  { id: 3, name: "Oscar Hernandez", email: "oscarerd@espol.edu.ec", phone: 982345678, address: "Calle lineal 567" },
  { id: 4, name: "Miguel O'Hara", email: "miguelha@espol.edu.ec", phone: 983456789, address: "Calle esperanza 897" },
  { id: 5, name: "Julieta Joven", email: "julietajo@espol.edu.ec", phone: 985678934, address: "Calle global 986" },
];

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: "",
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    errors: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    modalInsertar: false,
    modalEditar: false,
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      }
    });
  }

  validateForm = () => {
    let valid = true;
    let errors = { ...this.state.errors };

    // Validación del nombre
    if (!/^[a-zA-Z\s]+$/.test(this.state.form.name)) {
      errors.name = 'El nombre solo debe contener letras y espacios.';
      valid = false;
    } else {
      errors.name = '';
    }

    // Validación del correo electrónico
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.form.email)) {
      errors.email = 'Debe ser un correo electrónico válido.';
      valid = false;
    } else {
      errors.email = '';
    }

    // Validación del teléfono
    if (!/^\d+$/.test(this.state.form.phone)) {
      errors.phone = 'El teléfono solo debe contener números.';
      valid = false;
    } else if (this.state.form.phone.length > 9) {
      errors.phone = 'El teléfono no debe tener más de 9 caracteres.';
      valid = false;
    } else {
      errors.phone = '';
    }

    // Validación de la dirección
    if (!/^[a-zA-Z0-9\s-]+$/.test(this.state.form.address)) {
      errors.address = 'La dirección solo debe contener letras, números, espacios y guiones.';
      valid = false;
    } else {
      errors.address = '';
    }

    this.setState({ errors });
    return valid;
  }

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  }

  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  }

  insertar = () => {
    if (this.validateForm()) {
      var newValue = { ...this.state.form };
      newValue.id = this.state.data.length + 1;
      var lista = this.state.data;
      lista.push(newValue);
      this.setState({ data: lista, modalInsertar: false });
      Swal.fire('¡Insertado!', 'El usuario ha sido insertado correctamente.', 'success');  // Alerta de éxito
    }
  }

  mostrarModalEditar = (registro) => {
    this.setState({ modalEditar: true, form: registro });
  }

  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  }

  editar = (dato) => {
    if (this.validateForm()) {
      var count = 0;
      var lista = this.state.data;
      lista.map((registro) => {
        if (dato.id === registro.id) {
          lista[count].name = dato.name;
          lista[count].email = dato.email;
          lista[count].phone = dato.phone;
          lista[count].address = dato.address;
        }
        count++;
      });
      this.setState({ data: lista, modalEditar: false });
      Swal.fire('¡Editado!', 'El usuario ha sido editado correctamente.', 'success');  // Alerta de éxito
    }
  }

  eliminar = (dato) => {
    var opcion = window.confirm("Desea eliminar el registro " + dato.id);
    if (opcion) {
      var count = 0;
      var lista = this.state.data;
      lista.map((registro) => {
        if (registro.id === dato.id) {
          lista.splice(count, 1);
        }
        count++;
      });
      this.setState({ data: lista });
      Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado correctamente.', 'success');  // Alerta de éxito
    }
  }

  render() {
    return (
      <>
        <Container>
          <br />
          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Insertar nuevo usuario</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Direccion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((element) => (
                <tr key={element.id}>
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.email}</td>
                  <td>{element.phone}</td>
                  <td>{element.address}</td>
                  <td><Button color="primary" onClick={() => this.mostrarModalEditar(element)}>Editar</Button></td>
                  <td><Button color="danger" onClick={() => this.eliminar(element)}>Eliminar</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div><h3>Editar Registro</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.name}
              />
              {this.state.errors.name && <p className="text-danger">{this.state.errors.name}</p>}
            </FormGroup>
            <FormGroup>
              <label>Correo:</label>
              <input
                className="form-control"
                name="email"
                type="email"
                onChange={this.handleChange}
                value={this.state.form.email}
              />
              {this.state.errors.email && <p className="text-danger">{this.state.errors.email}</p>}
            </FormGroup>
            <FormGroup>
              <label>Telefono:</label>
              <input
                className="form-control"
                name="phone"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.phone}
              />
              {this.state.errors.phone && <p className="text-danger">{this.state.errors.phone}</p>}
            </FormGroup>
            <FormGroup>
              <label>Direccion:</label>
              <input
                className="form-control"
                name="address"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.address}
              />
              {this.state.errors.address && <p className="text-danger">{this.state.errors.address}</p>}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={() => this.ocultarModalEditar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Insertar Nuevo Usuario</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length + 1}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={this.handleChange}
              />
              {this.state.errors.name && <p className="text-danger">{this.state.errors.name}</p>}
            </FormGroup>
            <FormGroup>
              <label>Correo:</label>
              <input
                className="form-control"
                name="email"
                type="email"
                onChange={this.handleChange}
              />
              {this.state.errors.email && <p className="text-danger">{this.state.errors.email}</p>}
            </FormGroup>
            <FormGroup>
              <label>Telefono:</label>
              <input
                className="form-control"
                name="phone"
                type="text"
                onChange={this.handleChange}
              />
              {this.state.errors.phone && <p className="text-danger">{this.state.errors.phone}</p>}
            </FormGroup>
            <FormGroup>
              <label>Direccion:</label>
              <input
                className="form-control"
                name="address"
                type="text"
                onChange={this.handleChange}
              />
              {this.state.errors.address && <p className="text-danger">{this.state.errors.address}</p>}
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()}>Insertar</Button>
            <Button className="btn btn-danger" onClick={() => this.ocultarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
