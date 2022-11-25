import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/Index.module.css";
import axios from "axios";
import convertir from "../helpers/Categorias";
import Nav from "../helpers/Nav";

const index = () => {
  const [data, setData] = useState([]);
  console.log(data);
  const [editMode, setEditMode] = useState(false);
  const [inputdata, setInputdata] = useState({
    title: "",
    content: "",
    categoryId: "0",
  });

  const [filtrar, setFiltrar] = useState({
    id: "0",
  });

  const fechData = async () => {
    const respuesta = await axios.get("//localhost:3006/hola");
    console.log(respuesta.data);
    setData(respuesta.data);
  };

  const handleCreateData = async (e) => {
    e.preventDefault();
    if (editMode) {
      handleUpdateData();
    } else {
      const baseUrl = "//localhost:3006/crear";
      console.log(inputdata);
      await axios
        .post(baseUrl, {
          title: inputdata.title,
          content: inputdata.content,
          categoryId: inputdata.categoryId,
        })
        .then((response) => {
          console.log(response);
        });
      setInputdata({ title: "", content: "", categoryId: 1 });
      fechData();
    }
  };

  const handleDeleteData = async (id) => {
    const url = "//localhost:3006/deleteData";
    await axios.delete(url, { data: { id } }).then((response) => {
      console.log(response);
    });
    fechData();
  };

  const handleEditData = (id, title, content, categoryId) => {
    console.log(id, title, content, categoryId);
    setInputdata({ id, title, content, categoryId });
    setEditMode(true);
  };

  const handleUpdateData = async () => {
    const url = "//localhost:3006/updateDate";
    const update = await axios.post(url, {
      id: inputdata.id,
      title: inputdata.title,
      content: inputdata.content,
      categoryId: inputdata.categoryId,
    });
    console.log(update);
    setInputdata({ title: "", content: "", categoryId: 1 }), setEditMode(false);
    fechData();
  };

  const filtrarData = async (dato) => {
    const url = "//localhost:3006/filtrar";
    const filtrar = await axios.post(url, {
      dato,
    });
    console.log(filtrar.data);
    setData(filtrar.data);
  };

  useEffect(() => {
    fechData();
  }, []);

  return (

    <div className={styles.index}>
      <Nav/>
      <h1>Crear</h1>
      <form onSubmit={handleCreateData} className={styles.formSubmit}>
        <input
          value={inputdata.title || ""}
          type="text"
          placeholder="titulo"
          onChange={(e) =>
            setInputdata({ ...inputdata, title: e.target.value } || "")
          }
        ></input>
        <input
          value={inputdata.content || ""}
          type="text"
          placeholder="contenido"
          onChange={(e) =>
            setInputdata({ ...inputdata, content: e.target.value } || "")
          }
        ></input>
        <select
          value={inputdata.categoryId}
          onChange={(e) =>
            setInputdata({ ...inputdata, categoryId: e.target.value })
          }
        >
          <option value="1">Por hacer</option>
          <option value="2">En proceso</option>
          <option value="3">Finalizado</option>
        </select>
        <button type="submit">{editMode ? "Editar" : "Submit"} </button>
      </form>
      <div className={styles.filtrar}>
        <h1>filtrar</h1>
        <select
          value={filtrar.id || "0"}
          onChange={(e) => {
            setFiltrar({ ...filtrar, id: e.target.value }),
              filtrarData(e.target.value);
          }}
        >
          <option value="0">TODOS</option>
          <option value="1">Por hacer</option>
          <option value="2">En proceso</option>
          <option value="3">Finalizado</option>
        </select>
      </div>
      <div className={styles.resultadoP}>
        {data?.map(({ id, title, content, categoryId }) => (
          <div key={id} className={styles.resultado}>
            <h1>{title} </h1>
            <p>{content} </p>
            <p>{convertir(categoryId)} </p>
            <button onClick={() => handleDeleteData(id)}>delete</button>
            <button
              onClick={() => handleEditData(id, title, content, categoryId)}
            >
              edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;




