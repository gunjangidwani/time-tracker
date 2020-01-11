import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { getAllTask, createTask } from '../action/task.action'
import { ApiConstant } from '../constant'
import "./style.css";

const apiConst = new ApiConstant();


const styles = {

}
class LandingPage extends React.Component {
    constructor() {
        super()
        this.state = {
            project: ["abc", "jhj", "yyuy"],
            start: '',
            startTime: null,
            endTime: null,
            startBtnEnable: true,
            stopBtnEnable: false,
            currentTime: null,
            selectedProject: '',
            taskName:'',
            taskList: []
        }

    }
    componentDidMount() {
        this.props.getAllTask(apiConst.BASE_URL + apiConst.TASK)
        
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if(nextProps.taskReducer.status && nextProps.taskReducer.value.length > 0) {
            this.setState({
                taskList: nextProps.taskReducer.value
            })
        }
    }
    addTask = () => {
        const obj = {
            body: {
                task_name: this.state.taskName,
            project: this.state.selectedProject,
            start_time: this.state.startTime,
            end_time: this.state.endTime
            },
            url: apiConst.BASE_URL + apiConst.TASK
        }
        this.props.createTask(obj);
    }


    startTimer = () => {
        this.setState({
            ...this.state,
            startBtnEnable: false,
            stopBtnEnable: true,
            startTime: new Date()
        })
        let now = new Date()
        if(this.state.endTime === null) {
            setInterval(()=>{
                now = new Date()
                this.setState({
                    ...this.state,
                    currentTime: now 
                })
            }, 1000)
        }
        // console.log(startTime, "started");
    }
    stopTimer = () => {
        this.setState({
            ...this.state,
            startBtnEnable: false,
            stopBtnEnable: false,
            endTime: new Date()
        })
    }

    addProject = (value) => {
        console.log(value)
        this.setState({
            selectedProject: value
        })

    }


    render() {
        const { project, startTime, endTime, startBtnEnable, stopBtnEnable, currentTime, taskList, selectedProject} = this.state

        return (
            <React.Fragment>
                <div class="landingParent">
                    <div class="addTask">
                        <h3>Add Task</h3>
                        <input onChange={(e) => {this.setState({...this.state, taskName: e.target.value})}} type="text" placeholder="Task name" />
                        <div>
                            <select value={selectedProject} onChange={(e)=>{this.addProject(e.target.value)}} placeholder="select project">
                                {project.map((m,i) => (
                                    <option key={i} value={m}> {m} </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button disabled={!startBtnEnable} type="button" onClick={() => {this.startTimer()}}>start</button>
                            <button disabled={!stopBtnEnable} type="button" onClick={() => {this.stopTimer()}}>
                            Stop 
                        </button>
                        </div>
                        
                        <div  >
                                    {startTime && moment(startTime).format('LTS')}
                        </div>
                                <div>{startTime && currentTime && moment(currentTime).diff(moment(startTime, 'seconds'))}</div>
                        <div  >
                            {endTime && moment(endTime).format('LTS')}
                        </div> 
                        <button type="button" onClick={() => {this.addTask()}} > Add Task</button>

                        
                    </div>
                    <div class="divTable">
                        <table>
                            <tr>
                                <th>
                                    Task
                                </th>
                                <th>Project</th>
                                <th>start time</th>
                                <th>End time</th>
                                
                            </tr>
                            {taskList.length > 0 && taskList.map((m, i) => (
                                    <tr key={i}> 
                                    <td> {m.task_name} </td>
                                    <td> {m.project} </td>
                                    <td> {moment(m.start_time).format('LTS')} </td>
                                    <td> {moment(m.end_time).format('LTS')} </td>
                                    </tr>
                                ))}
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {taskReducer: state.taskReducer}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTask: (url) => dispatch(getAllTask(url)),
        createTask: (obj) => dispatch(createTask(obj))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)