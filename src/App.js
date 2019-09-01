import React from 'react';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ansDisabled: true,
      expression: []
    }
  }

  isOperator = (value) => {
    return ['+', '-', '%', '/', '*'].indexOf(value) === -1 ? false : true;
  }

  getResult = (result, operator, element) => {
    switch (operator) {
      case '+':
        return parseFloat(result) + parseFloat(element)
        break;
      case '-':
        return parseFloat(result) - parseFloat(element)
        break;
      case '*':
        return parseFloat(result) * parseFloat(element)
        break;
      case '/':
        return parseFloat(result) / parseFloat(element)
        break;
      case '%':
        return (parseFloat(element) / 100) * parseFloat(result)
        break;
      default:
        break;
    }
  }

  handleClick = (e) => {
    e.persist();
    let expression = this.state.expression;
    let value = e.target.dataset.value;
    let isOperator = this.isOperator(value);
    let lastValue = expression.length > 0 ? expression[expression.length - 1] : '';
    if (isOperator === true) {
      if (this.state.expression.length > 0 && this.isOperator(lastValue) === false) {
        let lastChar = lastValue[lastValue.length - 1];
        if (lastChar === '.') {
          lastValue += '0';
          expression[expression.length - 1] = lastValue;
          expression.push(value);
          this.setState({ expression: expression, ansDisabled: true });
        }
        else {
          expression.push(value);
          this.setState({ expression: expression, ansDisabled: true });
        }

      }

    }
    else {
      switch (value) {
        case 'C':
          this.setState({ expression: [], ansDisabled: true })
          break;
        case 'DEL':
          if (this.state.expression.length > 0 && expression[expression.length - 1] !== undefined && expression[expression.length - 1] !== null) {
            expression[expression.length - 1] = expression[expression.length - 1].slice(0, -1);
            if (expression[expression.length - 1].length > 0) {
              this.setState({ expression: expression, ansDisabled: true })
            }
            else {
              expression.pop();
              this.setState({ expression: expression, ansDisabled: true })
            }

          }
          break;
        case '=':
          if (this.isOperator(lastValue) === false) {
            let result = '';
            for (let index = 0; index < expression.length; index++) {
              if (index === 0) {
                result = expression[index];
              }
              else {
                if (this.isOperator(expression[index])) {
                  result = this.getResult(result, expression[index], expression[index + 1]);
                }
              }
            }
            this.setState({ expression: [result.toString()], ansDisabled: false })
          }
          break;
        case '.':
          if (this.isOperator(lastValue) === true) {
            expression.push('0.');
            this.setState({ expression: expression, ansDisabled: true });
          }
          else {
            if (expression.length > 0) {
              if (lastValue.indexOf('.') === -1 && lastValue.length) {
                lastValue += '.';
                expression[expression.length - 1] = lastValue;
                this.setState({ expression: expression, ansDisabled: true })
              }
              else {
                if (lastValue.length === 0) {
                  expression.push('0.');
                  this.setState({ expression: expression, ansDisabled: true })
                }
              }
            }
            else {
              expression.push('0.');
              this.setState({ expression: expression, ansDisabled: true })
            }
          }
          break;
        case 'ANS':
          expression[0] += parseInt(lastValue);
          this.setState({ expression: expression });
          break;
        default:
          if (expression.length > 0) {
            if (this.isOperator(lastValue) === true) {
              expression.push(value);
              this.setState({ expression: expression, ansDisabled: true })
            }
            else {
              lastValue += value;
              expression[expression.length - 1] = lastValue;
              this.setState({ expression: expression, ansDisabled: true })
            }

          }
          else {
            expression.push(value);
            this.setState({ expression: expression, ansDisabled: true })
          }

      }
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
                <Input bsSize="lg" onChange={this.handleChange} value={this.state.expression.join('')} className={'text-right border'} />
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
