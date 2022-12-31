// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {
    id,
    competingTeamLogo,
    competingTeam,
    result,
    matchStatus,
  } = matchDetails
  const matchStatusClassName =
    matchStatus === 'Won' ? 'match-won' : 'match-loss'

  return (
    <li key={id} className="recent-match-card">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-team-logo"
      />
      <p className="competing-team-name">{competingTeam}</p>
      <p className="match-result">{result}</p>
      <p className={matchStatusClassName}>{matchStatus}</p>
    </li>
  )
}
export default MatchCard
