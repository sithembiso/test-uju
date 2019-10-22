handleUpdateStream = () => {
  this.setState({ loading: true })
  const { repoName, ownerId } = this.props.match.params
  const path = getStreamName(this.props.match.params)
  const slug = `${ownerId}/${repoName}`
  const obj = {
    path,
    slug
  }
  StreamUpdateMutation(obj, (err, resp) => {
    let errorMsg = ''
    if (err) {
      errorMsg = err[0]['message']
      ShowNotification('error', 'Stream Update', errorMsg)
      this.setState({ loading: false })
      this.props.handleCancel()
    } else if (resp && resp.streamUpdate && resp.streamUpdate.ok) {
      this.setState({
        loading: false
      })
      ShowNotification('success', 'Stream Update', resp.streamUpdate.message)
      this.props.handleStreamUpdated()
    } else {
      this.setState({ loading: false })
      ShowNotification('error', 'Stream Update', resp.streamUpdate.message)
      this.props.handleCancel()
    }
  })
}