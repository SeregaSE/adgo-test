export default function handleSelectChange(e) {
    if (!e.target.multiple) {
      this.setState({
        [e.target.name] : e.target.value,
        needToUpdate: true,
      })
    } else {
      const values = [...e.target.options].filter(option => option.selected).map(option => option.value).filter(option => option !== "0")
        this.setState({
            [e.target.name] : values,
            needToUpdate: true,
        })
    }
}