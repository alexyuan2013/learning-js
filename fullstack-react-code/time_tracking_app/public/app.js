const TimersDashboard = React.createClass({
  getInitialState: function(){
    return {
      timers: []
    }
  },
  componentDidMount: function(){
    this.loadTimersFromServer()
    this.loadTimersInterval = setInterval(this.loadTimersFromServer, 5000)
  },
  loadTimersFromServer: function(){
    client.getTimers((serverTimers) => (
      this.setState({timers: serverTimers})
    ))
  },
  componentWillUmmount: function(){
    clearInterval(this.loadTimersInterval)
  },
  handleCreateFromSubmit: function(timer){
    this.createTimer(timer)
  },
  createTimer: function(timer){
    const t = helpers.newTimer(timer)
    this.setState({
      timers: this.state.timers.concat(t)
    })
    client.createTimer(t)
  },
  handleEditFormSubmit: function(attrs){
    this.updateTimer(attrs)
  },
  updateTimer: function(attrs) {
    this.setState({
      timers: this.state.timers.map( (timer) => {
        if (timer.id === attrs.id){
          return {...timer, title: attrs.title, project: attrs.project}
        } else {
          return timer
        }
      })
    })
    client.updateTimer(attrs)
  },
  handleStartClick: function(timerId){
    this.startTimer(timerId)
  },
  handleStopClick: function(timerId){
    this.stopTimer(timerId)
  },
  handleTrashClick: function(timerId){
    this.deleteTimer(timerId)
  },
  startTimer: function(timerId){
    const now = Date.now()
    this.setState({
      timers: this.state.timers.map((timer)=>{
        if(timer.id === timerId){
          return {...timer, runningSince: now}
        } else {
          return timer
        }
      })
    })
    client.startTimer({
      id: timerId,
      start: now
    })
  },
  stopTimer: function(timerId){
    const now = Date.now()
    this.setState({
      timers: this.state.timers.map((timer)=>{
        if(timer.id === timerId){
          const lastElapsed = now - timer.runningSince
          return {...timer, elapsed: timer.elapsed + lastElapsed, runningSince: null}
        } else {
          return timer
        }
      })
    })
    client.stopTimer({
      id: timerId,
      stop: now
    })
  },
  deleteTimer: function(timerId){
    this.setState({
      timers: this.state.timers.filter( t => t.id !== timerId )
    })
    client.deleteTimer({ id: timerId})
  },
  render: function(){
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList 
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />
          <ToggleableTimerForm 
            isOpen={true}
            onFormSubmit={this.handleCreateFromSubmit}
          />
        </div>
      </div>
    )
  }
})

const EditableTimerList = React.createClass({
  render: function(){
    const editableTimes = this.props.timers.map((timer)=>(
      <EditableTimer
        key={timer.id}
        id={timer.id} 
        title={timer.title}
        project={timer.project}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
        onStartClick={this.props.onStartClick}
        onStopClick={this.props.onStopClick}
      />
    ))
    return (
      <div className='items'>
        {editableTimes}
      </div>
    )
  }
})

const ToggleableTimerForm = React.createClass({
  getInitialState: function(){
    return {
      isOpen: false
    }
  },
  handleFormOpen: function(){
    this.setState({ isOpen: true })
  },
  handleFormClose: function(){
    this.setState({ isOpen: false })
  },
  handleFormSubmit: function(timer){
    this.props.onFormSubmit(timer)
    this.setState({ isOpen: false })
  },
  render: function(){
    if(this.state.isOpen){
      return (
        <TimerForm 
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleFormSubmit}
        />
      )
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button className='ui basic button icon' onClick={this.handleFormOpen}>
            <i className='plus icon'></i>
          </button>
        </div>
      )
      
    }
    
  }
})

const EditableTimer = React.createClass({
  getInitialState: function(){
    return {
      editFormOpen: false
    }
  },
  handleFormClose: function(){
    this.closeForm()
  },
  handleFormSubmit: function(timer){
    this.props.onFormSubmit(timer)
    this.closeForm()
  },
  handleEditClick: function(){
    this.openForm()
  },
  openForm: function(){
    this.setState({ editFormOpen: true })
  },
  closeForm: function() {
    this.setState({ editFormOpen: false })
  },
  render: function(){
    if(this.state.editFormOpen){
      return(
        <TimerForm
          id={this.props.id} 
          title={this.props.title} 
          project={this.props.project} 
          onFormClose={this.handleFormClose}
          onFormSubmit={this.handleFormSubmit}
        />
      )
    } else {
      return (
        <Timer 
          id={this.props.id}
          title={this.props.title} 
          project={this.props.project} 
          elapsed={this.props.elapsed} 
          runningSince={this.props.runningSince}
          onEditClick={this.handleEditClick}
          onTrashClick={this.props.onTrashClick}
          onStartClick={this.props.onStartClick}
          onStopClick={this.props.onStopClick}
        />
      )
    }
  }
})

const Timer = React.createClass({
  getInitialState: function() {
    return {
      elapsedString: helpers.renderElapsedString(this.props.elapsed, this.props.runningSince)
    }
  },
  handleTrashClick: function(){
    this.props.onTrashClick(this.props.id)
  },
  componentWillMount: function(){
    //forceUpdata为Component提供的强制执行render的方法，不提倡使用，尽量使用setState的方式
    this.forceUpdateInterval = setInterval( () => {
      const elapsedString = helpers.renderElapsedString(this.props.elapsed, this.props.runningSince)
      this.setState({elapsedString: elapsedString})}, 1000)
  },
  componentWillUmmount: function(){
    clearInterval( this.forceUpdateInterval )
  },
  handleStartClick: function(){
    this.props.onStartClick(this.props.id)
  },
  handleStopClick: function(){
    this.props.onStopClick(this.props.id)
  },
  render: function(){
    //const elapsedString = helpers.renderElapsedString(this.props.elapsed, this.props.runningSince)
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.project}
          </div>
          <div className='center aligned description'>
            <h2>{this.state.elapsedString}</h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon' onClick={this.props.onEditClick}>
              <i className='edit icon'></i>
            </span>
            <span className='right floated trash icon' onClick={this.handleTrashClick}>
              <i className='trash icon'></i>
            </span>
          </div>
        </div>
        <TimerActionButton 
          timerIsRunning={!!this.props.runningSince}
          onStartClick={this.handleStartClick}
          onStopClick={this.handleStopClick}
        />
      </div>
    )
  }
})

const TimerActionButton = React.createClass({
  render: function() {
    if ( this.props.timerIsRunning){
      return (
        <div 
          className='ui bottom attached blue basic button'
          onClick={this.props.onStopClick}>
          Stop
        </div>
      )
    } else {
      return (
        <div 
          className='ui bottom attached blue basic button'
          onClick={this.props.onStartClick}>
          Start
        </div>
      )
    }
    
  }
})

const TimerForm = React.createClass({
  handleSubmit: function(){
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.refs.title.value,
      project: this.refs.project.value
    })
  },
  render: function() {
    const submitText = this.props.title ? 'Update' : 'Create'
    return(
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input type='text' ref='title' defaultValue={this.props.title} />
            </div>
            <div className='field'>
              <label>Project</label>
              <input type='text' ref='project' defaultValue={this.props.project} />
            </div>
            <div className='ui twor bottom attached buttons'>
              <button className='ui basic blue button' onClick={this.handleSubmit}>
                {submitText}
              </button>
              <button className='ui basic red button' onClick={this.props.onFormClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

ReactDOM.render(<TimersDashboard />, document.getElementById('content'))