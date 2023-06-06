import TopRatedMovie from './TopRatedMovie'
import TopRatedTv from './TopRatedTv'
import TopUpcomingMovie from './Upcoming'

const Others = () => {
  return (
    <div>
      <TopRatedTv />
      <TopRatedMovie />
      <TopUpcomingMovie />
    </div>
  )
}

export default Others
