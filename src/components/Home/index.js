// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teamsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getAllIplTeams()
  }

  getAllIplTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedList = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({teamsList: updatedList, isLoading: false})
  }

  render() {
    const {teamsList, isLoading} = this.state
    // testid="loader"
    return isLoading ? (
      <div>
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="ipl-logo"
          />
          <h1 className="heading">IPL Dashboard</h1>
        </div>
        <div className="teams-cards-container">
          <ul className="team-cards">
            {teamsList.map(eachTeam => (
              <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Home
