import React from 'react';
import Select from 'react-select';
const customStyles = {
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#ef5350' : state.isFocused ? '#ef9a9a' : null,
    borderRadius: state.isSelected ? 4 : null,
    color: state.isFocused ? 'white' : state.isSelected ? 'white' : null
  }),
  menu: (base, state) => ({
    ...base,
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: 'red'
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: 'white',
    borderColor: state.isDisabled
      ? 'hsl(0, 0%, 90%)' :
      state.isFocused ? '#ef5350' : 'hsl(0, 0%, 80%)',
    boxShadow: state.isFocused ? `0 0 0 1px #ef9a9a` : 'hsl(0, 0%, 80%)',
    '&:hover': {
      borderColor: '#ef9a9a' ,
      boxShadow: '0 0 0 1px #ef9a9a'
    },
    height: 65
  })

}


class TokenSelector extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      options: [],
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(selectedOption) {
    const currency = selectedOption.label
    const tokenAddress = selectedOption.value.toString()
    this.props.handleUpdateState({currency, tokenAddress})
  }

  componentDidMount() {
      return fetch("https://app.bitlat.com/api/get_tokens")
        .then((response) => {
          return response.json();
        }).then((json) => {
          const options = Object.keys(json).map((e) => {return {value: json[e].tokenAddress, label: e }})
          this.setState({options})
          console.log(options)
        });
    }

  render() {
    return (
      <Select
        placeholder="Escoge un Token..."
        name=""
        value={this.props.currency}
        onChange={this.handleChange}
        options= {this.state.options}
        styles= {customStyles}
      />
    );
  }
}

export default TokenSelector
