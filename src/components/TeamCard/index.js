// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, teamImageUrl} = teamDetails
  return (
    <li className="team-item-card">
      <Link to={`/team-matches/${id}`} className="team-item-link">
        <img src={teamImageUrl} alt={name} className="ipl-team-logo" />
        <p className="team-name-heading">{name}</p>
      </Link>
    </li>
  )
}

export default TeamCard
