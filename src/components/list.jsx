import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import React, { useRef } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Modal} from 'react-modal';
import Swal from 'sweetalert2';
import '/src/Style.css';
import { useNavigate } from 'react-router-dom'



export default function list() {

  const dialogRef = useRef(null);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };


 


  const navigate = useNavigate();

  const [tableInfo, setTableInfo] = useState([])

  const [selectedOption, setSelectedOption] = useState('');

  let [mergeArray, setMergeArray] = useState([]);

  const [modalValue, setModalValue] = useState(null);
  const [question, setQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [answer1, setAnswer1] = useState(null);
  const [answer2, setAnswer2] = useState(null);
  const [answer3, setAnswer3] = useState(null);
  const [answer4, setAnswer4] = useState(null);
  const [category, setCategory] = useState(null)


  const [verse_no, setVerseNo] = useState([]);
  const [quiz_tense, setQuiz_tense] = useState([]);


  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [formData, setFormData] = useState({
      qId:'',
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      verseNo: '',
      correctAnswer:'',
      category:'',
    });


     useEffect(() => {

    const fetchData = async () => {

      try {

       // const resAnswer = await axios.post('http://localhost:8000/mapi/catList');

       const resAnswer = await axios.post('https://lara-project-mocha.vercel.app/mapi/catList');

    //   const surah_no = { id : '89' };

     //  const resAnswer = await axios.post('https://lara-project-mocha.vercel.app/mapi/chapterList');

        
        
      //  https://lara-project-mocha.vercel.app/mapi/chapterList
        
        // console.log(resAnswer.data.title);

        setVerseNo(resAnswer.data.chapter);
        setQuiz_tense(resAnswer.data.title);

  //       axios.post('https://lara-project-mocha.vercel.app/mapi/chapterList', { id : '106' })
  // .then(({ data }) => {
  //   console.log(data.data);
  // })
  // .catch(err => {
  //   console.error(err);
  // });





      //  console.log('working'+data);

// axios.post('https://lara-project-mocha.vercel.app/mapi/search', { id : '106' })
//   .then(({ data }) => {
//     console.log(data.data);
//   })
//   .catch(err => {
//     console.error(err);
//   });


      //  const resAnswer1 = await axios.post(`https://lara-project-mocha.vercel.app/mapi/search`, surah_no)

        
     //   console.log(resAnswer1.data);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



    const handleChange = (event) => {
      const value = event.target.value;
      setSelectedOption(value);

      console.log('Selected option:', value);

      const surah_no = { id : value };

     

       //   axios.post(`http://localhost:8000/mapi/searchEng`, surah_no).then(({ data }) => {


        axios.post(`https://lara-project-mocha.vercel.app/mapi/searchEng`, surah_no).then(({ data }) => {
         
        console.log(data);
        
         setTableInfo(data.data)

        })

        console.log('combo box is working');
      
    };
  
    let stringWithoutBraces = null;
    let arrayValues = null;


    // const handleRowClick = (qId,question,answer,verseNo,correctAnswer,category) => {
  


    //     console.log(category);

    //     console.log(answer);


    //   stringWithoutBraces = answer.slice(1, -1); // Remove curly braces
    //   arrayValues = stringWithoutBraces.split(','); 
    //    console.log(arrayValues);

    //     setFormData({
    //         qId: qId,
    //         question: question,
    //         answer1: arrayValues[0].replace(/["']/g, ''),
    //         answer2: arrayValues[1].replace(/["']/g, ''),
    //         answer3: arrayValues[2].replace(/["']/g, ''),
    //         answer4: arrayValues[3].replace(/["']/g, ''),
    //         verseNo: verseNo,
    //         correctAnswer: correctAnswer,
    //         category:category
    //       });

    // };


const handleRowClick = (
  qId,
  question,
  answer,
  verseNo,
  correctAnswer,
  category
) => {
  console.log("Category:", category);
  console.log("Answer:", answer);

  // Remove { } from the answer string
  const stringWithoutBraces = answer.slice(1, -1);

  // Convert answers into an array
  const arrayValues = stringWithoutBraces.split(",");

  console.log("Answers:", arrayValues);

  setFormData({
    qId: qId,
    question: question, 
    answer1: arrayValues[0]?.replace(/["']/g, "").trim(),
    answer2: arrayValues[1]?.replace(/["']/g, "").trim(),
    answer3: arrayValues[2]?.replace(/["']/g, "").trim(),
    answer4: arrayValues[3]?.replace(/["']/g, "").trim(),
    verseNo: verseNo,
    correctAnswer: correctAnswer,
    category: category
  });

  // Open the dialog here if you want row click to open it
  dialogRef.current?.showModal();
};


    const handleChange1 = (e) => {
      

        const { name, value } = e.target;

        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));

        console.log('handleChange1 working');
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);


        //  await axios.post(`http://localhost:8000/mapi/engUpdate`, formData).then(({ data }) => {

        await axios.post(`https://lara-project-mocha.vercel.app/mapi/engUpdate`, formData).then(({ data }) => {

        console.log(data.status);

     
        if (data.status == false) {
          Swal.fire({
            icon: "error",
            text: "Error"
          })
        } else {
          Swal.fire({
            icon: "success",
            text: "Success",
            target: dialogRef.current
          })
        //  navigate('/create')
       //  window.location.reload();

       const timer = setTimeout(() => {
      //  navigate('/')
        window.location.reload();
       }, 2000); // Time in milliseconds (5000ms = 5 seconds)

        }
      }).catch(({ response }) => {
        console.log(response);
  
     //  setValidationError(response);
  
        if (response === 422) {
         // setValidationError(response.data.errors)
        } else {
  
        }
      })
    }



    // const handleCloseModal = () => {
    //     setShowModal(false);
    // };
   

    const fetch = async () => {

  
     
        // axios.post(`http://localhost:8000/mapi/search`, article).then(({ data }) => {
        //     setPatient(data.data)
        // })

    }

    const getInputValue = (event) => {

        console.log('working');
        const userValue = event.target.value;

        const article = { title: userValue };

        console.log(tableInfo);
    }


     const options = verse_no.map((item, index) => ({

    value: `${item}`, // Use both values combined
    label: `${item} ${quiz_tense[index]}`, // Label shown in the dropdown
      
  }));

    // const fetchPatients = async () => {
    //     await axios.get(`http://localhost:8000/mapi/listSurah`).then(({ data }) => {
    //         setPatient(data.data)
    //         console.log(data)
    //     })
    // }

       const logout = async () => {

        const response = await axios.post("http://localhost:8000/mapi/login",
        {},
        {
          headers: {
            Authorization: 'Bearer ${token}'
          }
        }
      );

      console.log(response.data);
      localStorage.removeItem("token");
      console.log(response.data);

       }

    useEffect(() => {
        fetch();
       }, [])

       return (
        <div className="container">
          <div className="row">
    
            <div className="col-12">
    
              {/* =========================
                  UPDATE DIALOG
              ========================== */}
              <dialog
                ref={dialogRef}
                className="update-dialog"
              >
                <div className="dialog-header">
                  <h5>Update</h5>
    
                  <button
                    type="button"
                    className="dialog-close"
                    onClick={closeDialog}
                  >
                    &times;
                  </button>
                </div>
    
                <div className="dialog-body">
    
                  <p>{modalValue}</p>
    
                  <form onSubmit={handleSubmit} className="form-container">
    
                    <Row>
    
                    <Col md={6}>
                        <div className="form-group mb-3">
                          <label
                            htmlFor="question"
                            className="form-label"
                          >
                            Question:
                          </label>
    
                          <input
                            type="text"
                            id="question"
                            name="question"
                            value={formData.question}
                            onChange={handleChange1}
                            className="form-input form-control"
                          />
                        </div>
                      </Col>
                      {/* Answer 1 */}
                      <Col md={6}>
                        <div className="form-group mb-3">
                          <label
                            htmlFor="answer1"
                            className="form-label"
                          >
                            Answer 1:
                          </label>
    
                          <input
                            type="text"
                            id="answer1"
                            name="answer1"
                            value={formData.answer1}
                            onChange={handleChange1}
                            className="form-input form-control"
                          />
                        </div>
                      </Col>
    
                      {/* Answer 2 */}
                      <Col md={6}>
                        <div className="form-group mb-3">
                          <label
                            htmlFor="answer2"
                            className="form-label"
                          >
                            Answer 2:
                          </label>
    
                          <input
                            type="text"
                            id="answer2"
                            name="answer2"
                            value={formData.answer2}
                            onChange={handleChange1}
                            className="form-input form-control"
                          />
                        </div>
                      </Col>
    
                      {/* Answer 3 */}
                      <Col md={6}>
                        <div className="form-group mb-3">
                          <label
                            htmlFor="answer3"
                            className="form-label"
                          >
                            Answer 3:
                          </label>
    
                          <input
                            type="text"
                            id="answer3"
                            name="answer3"
                            value={formData.answer3}
                            onChange={handleChange1}
                            className="form-input form-control"
                          />
                        </div>
                      </Col>
    
                      {/* Answer 4 */}
                      <Col md={6}>
                        <div className="form-group mb-3">
                          <label
                            htmlFor="answer4"
                            className="form-label"
                          >
                            Answer 4:
                          </label>
    
                          <input
                            type="text"
                            id="answer4"
                            name="answer4"
                            value={formData.answer4}
                            onChange={handleChange1}
                            className="form-input form-control"
                          />
                        </div>
                      </Col>
    
                      {/* Correct Answer */}
                      <Col md={6}>
                        <div className="form-group mb-3">
                          <label
                            htmlFor="correct_answer"
                            className="form-label"
                          >
                            Correct Answer:
                          </label>
    
                          <input
                            type="text"
                            id="correct_answer"
                            name="correctAnswer"
                            value={formData.correctAnswer}
                            onChange={handleChange1}
                            className="form-input form-control"
                          />
                        </div>
                      </Col>
    
                      {/* Category */}
                      <Col md={6}>
                        <div className="form-group mb-3">
                          <label
                            htmlFor="category"
                            className="form-label"
                          >
                            Category:
                          </label>
    
                          <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange1}
                            className="form-input form-control"
                          >
                            {options.map((option, index) => (
                              <option
                                key={index}
                                value={option.value}
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </Col>
    
                    </Row>
    
                    {/* Dialog buttons */}
                    <div className="dialog-footer">
    
                      <button
                        type="button"
                        className="btn btn-secondary me-2"
                        onClick={closeDialog}
                      >
                        Cancel
                      </button>
    
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
    
                    </div>
    
                  </form>
                </div>
              </dialog>
    
    
              {/* =========================
                  SEARCH / FILTER / CREATE
              ========================== */}
              <div className="row align-items-center mb-3">
    
                <div className="col-md-4">
                  <select
                    value={selectedOption}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {options.map((option, index) => (
                      <option
                        key={index}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
    
                <div className="col-md-4">
                  <input
                    type="text"
                    onChange={getInputValue}
                    placeholder="Search here"
                    className="form-control"
                  />
                </div>
    
                <div className="col-md-4">
                  <Link
                    className="btn btn-primary mb-2 float-end"
                    to="/create"
                  >
                    Create Words
                  </Link>
                </div>
    
              </div>
    
    
              {/* =========================
                  TABLE
              ========================== */}
              <div className="col-12">
    
                <div className="card card-body">
    
                  <div className="table-responsive">
    
                    <table className="table table-bordered mb-0 text-center">
    
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Word</th>
                          <th>Verse No</th>
                          <th>Answers</th>
                          <th>Correct Answer</th>
                          <th>Category</th>
                          <th>Update</th>
                        </tr>
                      </thead>
    
                      <tbody>
    
                        {tableInfo.map((row, key) => (
    
                          <tr key={key}>
    
                            <td>{row.q_id}</td>
    
                            <td>{row.question}</td>
    
                            <td>{row.verse_no}</td>
    
                            <td>{row.answer}</td>
    
                            <td>{row.correct_answer}</td>
    
                            <td>{row.category}</td>
    
                            {/* <td>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openDialog();
                                }}
                              >
                                Update
                              </button>
                            </td>
     */}

<td>
  <button
    type="button"
    className="btn btn-primary"
    onClick={(e) => {
      e.stopPropagation();

      handleRowClick(
        row.q_id,
        row.question,
        row.answer,
        row.verse_no,
        row.correct_answer,
        row.category
      );
    }}
  >
    Update
  </button>
</td>
                          </tr>
    
                        ))}
    
                      </tbody>
    
                    </table>
    
                  </div>
    
                </div>
    
              </div>
    
            </div>
    
          </div>
        </div>
      );
}