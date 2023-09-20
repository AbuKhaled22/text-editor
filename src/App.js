import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import ReactMarkdown from "react-markdown";
import html2pdf from 'html2pdf.js';


//This class is the one that will be rendered
class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      head:'',
      text:'',
      color:''

    }
    this.handelChange = this.handelChange.bind(this);
    this.colorChange = this.colorChange.bind(this);
    
  }
  //It used to target user input
  handelChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value, 
    });
  }

  colorChange(event){
    this.setState({
      color:event.target.value
    })
  }
  render(){
  return (
    //it used row className and colmun className to display instruction function and edit, review on the same column
    <div className="row">
      <div className='col-xs-2'><Instruction /></div>
      <div>
        {
          //here it pass the text and handelChange to edit to target user input and to review to dispaly the text after the changes
        }
        <Edit value1={this.state.text} value2={this.state.head} change={this.handelChange}/>
        <Review value1={this.state.text} value2={this.state.head} value3={this.state.color} change={this.colorChange}/>
      </div>
    </div>
  );
}
}
//Edit function that will read user input and pass it back to handelChange and text
function Edit(props){
  return(
    <div>
      <fieldset className='box'>
        <fieldset className='Eintro'>
          <h2 className='text-center'>Edit</h2>
        </fieldset>
        <fieldset className='Ebody'>
          <input className='EbodyInput' name='head' value2={props.value2} onChange={props.change} placeholder='Heading'></input>
          <textarea name='text' value1={props.value1} onChange={props.change} placeholder='text'></textarea>
        </fieldset>
      </fieldset>
    </div>
  )
}

//review function that will display the user input after the changes
function Review(props) {
  // Replace single line breaks with double line breaks
  const textWithDoubleLineBreaks = props.value1.replace(/\n/g, '\n\n');

  function gneratePdf(){

    var element = document.querySelector('.Rbody');
    html2pdf(element);
  }
  const RbodyColor=props.value3;

  return (
    <div>
      <fieldset className='box'>
        <div className='row'>
          <div className='col-xs-8'><button onClick={gneratePdf}>Download as PDF</button></div>
          <div className='col-xs-3'><input value={props.value3} onChange={props.change} placeholder='write the review color'></input></div>
        </div>
        <fieldset className='Rintro'>
          <h2 className='text-center'>Review</h2>
        </fieldset>
        <fieldset className='Rbody' style={{backgroundColor: RbodyColor }}>
          <ReactMarkdown className='text-center'>{props.value2}</ReactMarkdown>
          <ReactMarkdown>{textWithDoubleLineBreaks}</ReactMarkdown>
        </fieldset>
        <button onClick={gneratePdf}>Download as PDF</button>
      </fieldset>
    </div>
  );
}

//instruction function for display a list of instructons 
function Instruction(){
  return(
    <div className='instruction'>
      <ul>
        <li>(#) The number of hash symbols determines the size of header level</li>
        <li>Text Formatting:
          <ul>
            <li>Italic: Wrap text with asterisks or underscores, like *italic* or _italic_</li>
            <li>Bold: Use double asterisks or underscores, like **bold** or __bold__</li>
            <li>Bold and Italic: Combine both, like ***bold and italic***</li>
          </ul>
        </li>
        <li>Lists: 
          <ul>
            <li>Unordered Lists: Start lines with asterisks (*), plus (+), or minus (-)</li>
            <li>Ordered Lists: Start lines with numbers followed by a period (1., 2., 3.)</li>
          </ul>
        </li>
        <li>Create links using: [Link Text](URL)</li>
        <li>Insert images using: ![Alt Text](Image URL)</li>
        <li>Create horizontal lines with three or more dashes (---), asterisks (***), or underscores (___).</li>
        <li>Types of colors: 
          <ul>
            <li>rgb(223, 230, 243)</li>
            <li>rgb(174, 239, 223)</li>
            <li>rgb(236, 239, 174)</li>
            <li>rgb(239, 199, 174)</li>
            <li>And any other color you would like</li>
          </ul>
        </li>
      </ul>

    </div>
  )
}


export default App;
