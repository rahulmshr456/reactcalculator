import React from 'react';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ansDisabled: true,
      expression: ''
    }
  }

  handleClick = (e) => {
    e.persist()
    switch (e.target.dataset.value) {
      case 'C':
        this.setState({ expression: '' })
        break;
      case 'DEL':
        if (this.state.expression.length > 0) {
          this.setState(prev => ({ expression: prev.expression.substring(0, -1) }))
        }
        break;
      case '=':
        this.setState({ expression: eval(this.state.expression) });
        break;
      default:
        this.setState(prev => ({ expression: prev.expression + e.target.dataset.value }))
        break;
    }
  }
  handleChange = (e) => {

  }
  render() {
    return (
      <Container>
        <Row>
          <Col xs={5} className={'mx-auto'}>
            <div className="fullHeight d-flex justify-content-center align-items-center">
              <div className={'border rounded shadow p-2'}>
                <Input bsSize="lg" onChange={this.handleChange} value={this.state.expression} className={'text-right border'} />
                <div className="d-flex justify-content-between width-25 mt-2">
                  <Button color='danger' onClick={this.handleClick} data-value={'C'} className={'mx-auto border'}>C</Button>
                  <Button color='white' onClick={this.handleClick} data-value={'DEL'} className={'mx-auto border'}>Del</Button>
                  <Button color='white' onClick={this.handleClick} data-value={'%'} className={'mx-auto border'}>%</Button>
                  <Button color='white' onClick={this.handleClick} data-value={'/'} className={'mx-auto border'}>/</Button>
                </div>
                <div className="d-flex justify-content-between width-25 mt-2">
                  <Button color='white' onClick={this.handleClick} data-value={7} className={'mx-auto border'}>7</Button>
                  <Button color='white' onClick={this.handleClick} data-value={8} className={'mx-auto border'}>8</Button>
                  <Button color='white' onClick={this.handleClick} data-value={9} className={'mx-auto border'}>9</Button>
                  <Button color='white' onClick={this.handleClick} data-value={'*'} className={'mx-auto border'}>*</Button>
                </div>
                <div className="d-flex justify-content-between width-25 mt-2">
                  <Button color='white' onClick={this.handleClick} data-value={4} className={'mx-auto border'}>4</Button>
                  <Button color='white' onClick={this.handleClick} data-value={5} className={'mx-auto border'}>5</Button>
                  <Button color='white' onClick={this.handleClick} data-value={6} className={'mx-auto border'}>6</Button>
                  <Button color='white' onClick={this.handleClick} data-value={'-'} className={'mx-auto border'}>-</Button>
                </div>
                <div className="d-flex justify-content-between width-25 mt-2">
                  <Button color='white' onClick={this.handleClick} data-value={1} className={'mx-auto border'}>1</Button>
                  <Button color='white' onClick={this.handleClick} data-value={2} className={'mx-auto border'}>2</Button>
                  <Button color='white' onClick={this.handleClick} data-value={3} className={'mx-auto border'}>3</Button>
                  <Button color='white' onClick={this.handleClick} data-value={'+'} className={'mx-auto border'}>+</Button>
                </div>
                <div className="d-flex justify-content-between width-25 mt-2">
                  <Button color='white' onClick={this.handleClick} data-value={0} className={'mx-auto border'}>0</Button>
                  <Button color='white' onClick={this.handleClick} data-value={'.'} className={'mx-auto border'}>.</Button>
                  <Button color='white' onClick={this.handleClick} data-value={'ANS'} disabled={this.state.ansDisabled} className={'mx-auto border'}>ANS</Button>
                  <Button color='primary' onClick={this.handleClick} data-value={'='} className={'mx-auto border'}>=</Button>
                </div>
              </div>
            </div>
            <div>


            </div>

          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
