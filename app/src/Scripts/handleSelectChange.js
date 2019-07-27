export default function handleSelectChange(e) {
    if (!e.target.multiple) {
      this.setState({
        [e.target.name] : e.target.value,
      })
    } else {
        this.setState({
            [e.target.name] :[...e.target.options].filter(option => option.selected).map(option => option.value),
        })
    }
}