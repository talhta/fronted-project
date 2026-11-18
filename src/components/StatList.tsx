type Props = {
  stats: { name: string; value: number }[]
}

// 255 is the highest base stat any Pokémon can have, so a full bar means 255.
const MAX_STAT = 255

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
}

// A list of stats, each with its name, value and a bar showing the value.
function StatList({ stats }: Props) {
  return (
    <dl className="stat-list">
      {stats.map((stat) => (
        <div key={stat.name} className="stat-row">
          <dt>{STAT_LABELS[stat.name] ?? stat.name}</dt>
          <dd>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-bar" aria-hidden="true">
              <span
                className="stat-bar-fill"
                style={{ width: `${Math.min(100, (stat.value / MAX_STAT) * 100)}%` }}
              />
            </span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default StatList
