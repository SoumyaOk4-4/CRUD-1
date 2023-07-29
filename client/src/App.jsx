import { useEffect, useState } from 'react';
import './App.css';
import { MdClose, MdOutlineSettingsSuggest } from 'react-icons/md';
import Axios from 'axios';

Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.baseURL = "http://localhost:5000/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: ""
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: ""
  });
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((event) => {
      return {
        ...event,
        [name]: value // this is targeting the name attribute
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await Axios.post("/create", formData);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
    }
  }

  const getFetchData = async () => {
    const data = await Axios.get("/");
    if (data.data.success) {
      setDataList(data.data.data);
    }
  }

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await Axios.delete(`/delete/${id}`);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await Axios.put('/update',formDataEdit);
    if (data.data.success) {
      getFetchData()
      alert(data.data.message);
      setEditSection(false);
    }
  }

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((event) => {
      return {
        ...event,
        [name]: value // this is targeting the name attribute
      }
    });
  }

  const handleEdit = (e) => {
    setFormDataEdit(e);
    setEditSection(true);
  }

  return (
    <>
      <div className='container'>
        <button
          className='btn btn-gen'
          title='click here to add new user'
          onClick={() => setAddSection(true)}>
          Add
        </button>
        <br />
        {
          addSection && (
            <>
              <br /><br />
              <div className="addContainer">
                <form onSubmit={handleSubmit}>
                  <div
                    className="close-btn"
                    onClick={() => setAddSection(false)}
                    title='click to close'>
                    <MdClose />
                  </div>
                  <label htmlFor="name">Name: </label>
                  <br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder='Enter Name'
                    required
                    onChange={handleOnChange} />
                  <br />
                  <br />
                  <label htmlFor="email">Email: </label>
                  <br />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Enter E-Mail'
                    required
                    onChange={handleOnChange} />
                  <br />
                  <br />
                  <label htmlFor="mobile">Ph.No.: </label>
                  <br />
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    placeholder='Enter Ph.No'
                    required
                    onChange={handleOnChange} />
                  <br />
                  <br />
                  <div style={{ textAlign: 'right' }}>
                    <input
                      className='inp-submit'
                      title='click to submit form'
                      type='submit' value='submit' />
                  </div>
                </form>
              </div>
            </>
          )
        }
        {
          editSection && (
            <>
              <div className="addContainer">
                <form onSubmit={handleUpdate}>
                  <div
                    className="close-btn"
                    onClick={() => setEditSection(false)}
                    title='click to close'>
                    <MdClose />
                  </div>
                  <label htmlFor="name">Name: </label>
                  <br />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder='Enter Name'
                    required
                    onChange={handleEditOnChange}
                    value={formDataEdit.name} />
                  <br />
                  <br />
                  <label htmlFor="email">Email: </label>
                  <br />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Enter E-Mail'
                    required
                    onChange={handleEditOnChange}
                    value={formDataEdit.email} />
                  <br />
                  <br />
                  <label htmlFor="mobile">Ph.No.: </label>
                  <br />
                  <input
                    type="tel"
                    name="mobile"
                    id="mobile"
                    placeholder='Enter Ph.No'
                    required
                    onChange={handleEditOnChange}
                    value={formDataEdit.mobile} />
                  <br />
                  <br />
                  <div style={{ textAlign: 'right' }}>
                    <input
                      className='inp-submit'
                      title='click to submit form'
                      type='submit' value='submit' />
                  </div>
                </form>
              </div>
            </>
          )
        }
        <br />
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>E-Mail</th>
                <th>Ph.No.</th>
                <th><MdOutlineSettingsSuggest /></th>
              </tr>
            </thead>
            <tbody>
              {
                dataList[0] ? (
                  dataList.map((e) => {
                    return (
                      <>
                        <tr>
                          <td>{e.name}</td>
                          <td>{e.email}</td>
                          <td>{e.mobile}</td>
                          <td>
                            <button
                              className="btn btn-gen2"
                              title='click to edit'
                              onClick={() => handleEdit(e)}>
                              Edit
                            </button>
                            <button
                              className="btn btn-gen2 del"
                              title='click to delete'
                              onClick={() => handleDelete(e._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    )
                  }))// when data available
                  : (
                    <p className='no-data'>
                      No Data
                    </p>
                  )//when no data
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default App;
