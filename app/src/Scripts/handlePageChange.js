export default function handlePageChange(offset) {
    this.setState({
        offset: offset,
        needToUpdate: true,
    })
}