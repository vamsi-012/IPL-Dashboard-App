// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamMatchesData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatchesData()
  }

  getFormattedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamMatchesData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatch: this.getFormattedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }
    console.log(formattedData)
    this.setState({teamMatchesData: formattedData, isLoading: false})
  }

  renderRecentMatches = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData
    return (
      <ul className="recent-matches-list">
        {recentMatches.map(eachMatch => (
          <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerUrl, latestMatch} = teamMatchesData
    return (
      <div className="team-matches-list">
        <img
          src={teamBannerUrl}
          className="team-banner-img"
          alt="team banner"
        />
        <LatestMatch key={latestMatch.id} latestMatchDetails={latestMatch} />
        {this.renderRecentMatches()}
      </div>
    )
  }

  // testid="loader"

  renderLoader = () => (
    <div>
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className={`team-matches-container ${id.toLowerCase()}`}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
